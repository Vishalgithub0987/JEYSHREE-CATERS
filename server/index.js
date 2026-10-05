import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { WebSocketServer, WebSocket } from 'ws';
import { fileURLToPath } from 'url';

import { db } from './db.js';
import { generateToken, hashPassword, comparePassword, authenticate, requireAdmin } from './auth.js';
import { processCateringWhatsAppNotifications, generateWhatsAppLink, sanitizePhoneNumber, sendWhatsAppMessageViaApi } from './whatsapp.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Set up Multer for food images
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Setup WebSocket Server for Real-Time Updates
const wss = new WebSocketServer({ server, path: '/ws' });
const wsClients = new Set();

wss.on('connection', (ws) => {
  wsClients.add(ws);
  ws.send(JSON.stringify({ type: 'CONNECTED', message: 'Real-time catering stream established' }));

  ws.on('close', () => {
    wsClients.delete(ws);
  });
});

export function broadcastEvent(type, payload) {
  const message = JSON.stringify({ type, payload, timestamp: new Date().toISOString() });
  for (const client of wsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      whatsapp,
      password,
      confirmPassword,
      eventType,
      eventDate,
      guests,
      location
    } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Name, email, phone, and password are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existingEmail = db.findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const newUser = db.createUser({
      name,
      email: email.toLowerCase().trim(),
      phone,
      whatsapp: whatsapp || phone,
      password: hashPassword(password),
      role: 'customer',
      eventType: eventType || 'Wedding',
      eventDate: eventDate || '',
      guests: Number(guests) || 100,
      location: location || ''
    });

    const token = generateToken(newUser);
    const { password: _, ...userSafe } = newUser;

    broadcastEvent('NEW_CUSTOMER_REGISTERED', { id: newUser.id, name: newUser.name });

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed due to a server error.' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Please enter both email/phone and password.' });
    }

    const user = db.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const valid = comparePassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.json({
      message: 'Logged in successfully',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed due to a server error.' });
  }
});

// Get Current User Profile
app.get('/api/auth/me', authenticate, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password: _, ...userSafe } = user;
  res.json({ user: userSafe });
});

// Update Profile
app.put('/api/auth/profile', authenticate, (req, res) => {
  try {
    const { name, phone, whatsapp, eventType, eventDate, guests, location } = req.body;
    const updated = db.updateUser(req.user.id, {
      name,
      phone,
      whatsapp,
      eventType,
      eventDate,
      guests: guests ? Number(guests) : undefined,
      location
    });

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userSafe } = updated;
    res.json({ message: 'Profile updated successfully', user: userSafe });
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed' });
  }
});

// ==========================================
// 2. FOOD MENU ROUTES
// ==========================================

// Get all foods
app.get('/api/foods', (req, res) => {
  let foods = db.getFoods();
  const { category, type, search, availableOnly } = req.query;

  if (availableOnly === 'true') {
    foods = foods.filter(f => f.available !== false);
  }

  if (category && category !== 'All') {
    foods = foods.filter(f => f.category && f.category.toLowerCase() === category.toLowerCase());
  }

  if (type && type !== 'all') {
    foods = foods.filter(f => f.type && f.type.toLowerCase() === type.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase().trim();
    foods = foods.filter(f =>
      f.name.toLowerCase().includes(q) ||
      (f.description && f.description.toLowerCase().includes(q)) ||
      (f.category && f.category.toLowerCase().includes(q))
    );
  }

  res.json(foods);
});

// Get food by ID
app.get('/api/foods/:id', (req, res) => {
  const food = db.findFoodById(req.params.id);
  if (!food) {
    return res.status(404).json({ message: 'Food item not found' });
  }
  res.json(food);
});

// Admin Add Food
app.post('/api/foods', requireAdmin, (req, res) => {
  try {
    const { name, category, description, ingredients, type, price, image, available } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Food name and category are required' });
    }

    const newFood = db.createFood({
      name,
      category,
      description: description || '',
      ingredients: ingredients || '',
      type: type || 'veg',
      price: price ? Number(price) : 0,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      available: available !== undefined ? Boolean(available) : true
    });

    broadcastEvent('FOOD_UPDATED', { action: 'create', food: newFood });
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create food item' });
  }
});

// Admin Edit Food
app.put('/api/foods/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateFood(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Food not found' });
    }

    broadcastEvent('FOOD_UPDATED', { action: 'update', food: updated });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update food item' });
  }
});

// Admin Delete Food
app.delete('/api/foods/:id', requireAdmin, (req, res) => {
  try {
    const ok = db.deleteFood(req.params.id);
    if (!ok) {
      return res.status(404).json({ message: 'Food not found' });
    }

    broadcastEvent('FOOD_UPDATED', { action: 'delete', id: req.params.id });
    res.json({ message: 'Food item removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete food item' });
  }
});

// Admin Upload Food Image
app.post('/api/foods/upload', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ==========================================
// 3. CATERING REQUESTS & FOOD SELECTIONS
// ==========================================

// Submit a catering selection
app.post('/api/requests', async (req, res) => {
  try {
    const {
      userId,
      customerName,
      phone,
      whatsapp,
      eventType,
      eventDate,
      guests,
      location,
      selectedFoods,
      notes
    } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({ message: 'Customer name and phone number are required.' });
    }

    if (!selectedFoods || !Array.isArray(selectedFoods) || selectedFoods.length === 0) {
      return res.status(400).json({ message: 'Please select at least one food item.' });
    }

    const newRequest = db.createRequest({
      userId: userId || (req.user ? req.user.id : null),
      customerName,
      phone,
      whatsapp: whatsapp || phone,
      eventType: eventType || 'Wedding',
      eventDate: eventDate || new Date().toISOString().split('T')[0],
      guests: Number(guests) || 100,
      location: location || '',
      selectedFoods,
      notes: notes || '',
      whatsappAdminSent: false,
      whatsappCustomerSent: false
    });

    // WhatsApp notifications & Links preparation
    const waResults = await processCateringWhatsAppNotifications(newRequest);

    // Update sent status in request if api was triggered
    db.updateRequest(newRequest.id, {
      whatsappAdminSent: waResults.adminApiResult?.success || true,
      whatsappCustomerSent: waResults.customerApiResult?.success || true
    });

    // Real-time broadcast to Admin Dashboard
    broadcastEvent('NEW_REQUEST', {
      request: newRequest,
      message: `New catering selection received from ${newRequest.customerName} (${newRequest.id})`
    });

    res.status(201).json({
      message: 'Your Catering Request Has Been Submitted!',
      request: newRequest,
      whatsapp: {
        adminMessage: waResults.adminMessage,
        customerMessage: waResults.customerMessage,
        adminLink: waResults.adminLink,
        customerLink: waResults.customerLink,
        apiResult: {
          admin: waResults.adminApiResult,
          customer: waResults.customerApiResult
        }
      }
    });
  } catch (err) {
    console.error('Request submission error:', err);
    res.status(500).json({ message: 'Failed to submit catering request. Please try again.' });
  }
});

// Get Requests (Admin gets all, Customer gets theirs)
app.get('/api/requests', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    const requests = db.getRequests();
    return res.json(requests);
  } else {
    const requests = db.findRequestsByUserId(req.user.id);
    return res.json(requests);
  }
});

// Get Single Request
app.get('/api/requests/:id', (req, res) => {
  const request = db.findRequestById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: 'Catering request not found' });
  }
  res.json(request);
});

// Update Request Status (Admin)
app.put('/api/requests/:id/status', requireAdmin, (req, res) => {
  const { status, notes } = req.body;
  const validStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const updated = db.updateRequest(req.params.id, {
    status,
    ...(notes !== undefined ? { notes } : {})
  });

  if (!updated) {
    return res.status(404).json({ message: 'Request not found' });
  }

  broadcastEvent('REQUEST_STATUS_UPDATED', { id: updated.id, status: updated.status });
  res.json(updated);
});

// ==========================================
// 4. ADMIN DASHBOARD & SETTINGS
// ==========================================

// Dashboard Statistics
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const requests = db.getRequests();
  const users = db.getUsers().filter(u => u.role !== 'admin');
  const foods = db.getFoods();

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'New' || r.status === 'Contacted').length;
  const confirmedRequests = requests.filter(r => r.status === 'Confirmed' || r.status === 'Completed').length;
  const totalCustomers = users.length;
  const totalFoodItems = foods.length;

  // Breakdown by event type
  const eventTypeCount = {};
  requests.forEach(r => {
    eventTypeCount[r.eventType] = (eventTypeCount[r.eventType] || 0) + 1;
  });

  // Most popular dishes selected
  const dishCounts = {};
  requests.forEach(r => {
    (r.selectedFoods || []).forEach(f => {
      dishCounts[f.name] = (dishCounts[f.name] || 0) + 1;
    });
  });

  const popularDishes = Object.entries(dishCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  res.json({
    totalCustomers,
    totalRequests,
    pendingRequests,
    confirmedRequests,
    totalFoodItems,
    eventTypeBreakdown: eventTypeCount,
    popularDishes,
    recentRequests: requests.slice(0, 6)
  });
});

// Admin Customer List
app.get('/api/admin/customers', requireAdmin, (req, res) => {
  const users = db.getUsers().filter(u => u.role !== 'admin');
  const requests = db.getRequests();

  const customerList = users.map(user => {
    const userReqs = requests.filter(r => r.userId === user.id || r.phone === user.phone);
    const { password: _, ...safeUser } = user;
    return {
      ...safeUser,
      totalRequests: userReqs.length,
      lastEvent: userReqs[0] ? userReqs[0].eventDate : user.eventDate,
      latestStatus: userReqs[0] ? userReqs[0].status : 'No Requests'
    };
  });

  res.json(customerList);
});

// Admin Settings
app.get('/api/admin/settings', requireAdmin, (req, res) => {
  const settings = db.getSettings();
  const masked = {
    ...settings,
    whatsappAccessToken: settings.whatsappAccessToken ? '••••••••••••••••' : ''
  };
  res.json(masked);
});

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const updates = { ...req.body };
  // If token is masked, do not overwrite existing token
  if (updates.whatsappAccessToken === '••••••••••••••••') {
    delete updates.whatsappAccessToken;
  }
  const updated = db.updateSettings(updates);
  res.json({ message: 'Settings saved successfully', settings: updated });
});

// WhatsApp Logs
app.get('/api/admin/whatsapp/logs', requireAdmin, (req, res) => {
  const logs = db.getWhatsAppLogs();
  res.json(logs);
});

// WhatsApp Test Message
app.post('/api/admin/whatsapp/test', requireAdmin, async (req, res) => {
  const { testPhone } = req.body;
  const settings = db.getSettings();
  const target = testPhone || settings.adminWhatsAppNumber;

  if (!target) {
    return res.status(400).json({ message: 'Target phone number is required.' });
  }

  const testMessage = `🔔 Test Notification from ${settings.companyName || 'Royal Feast Caterers'}\nTime: ${new Date().toLocaleString()}\nWhatsApp integration test is successful!`;

  if (settings.whatsappApiEnabled) {
    const result = await sendWhatsAppMessageViaApi(target, testMessage, settings);
    db.addWhatsAppLog({
      type: 'test_message',
      recipient: target,
      success: result.success,
      error: result.error || null,
      messageExcerpt: testMessage
    });
    return res.json({ result, message: result.success ? 'Message sent via Cloud API' : 'Failed to send via Cloud API' });
  } else {
    const link = generateWhatsAppLink(target, testMessage);
    db.addWhatsAppLog({
      type: 'test_message_link',
      recipient: target,
      success: true,
      messageExcerpt: testMessage
    });
    return res.json({ link, message: 'API disabled; prefilled wa.me link generated.' });
  }
});

// Contact message handler
app.post('/api/contact', (req, res) => {
  const { name, phone, email, eventType, message } = req.body;
  const settings = db.getSettings();
  const adminPhone = settings.adminWhatsAppNumber || '+919876543210';

  const waText = `👋 *NEW CATERING INQUIRY*\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'N/A'}\n*Event:* ${eventType || 'General'}\n*Message:* ${message || 'I would like to discuss catering packages.'}`;
  const link = generateWhatsAppLink(adminPhone, waText);

  res.json({
    message: 'Thank you for reaching out! We will contact you soon.',
    whatsappLink: link
  });
});

// Root Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Royal Feast Catering API',
    time: new Date().toISOString()
  });
});

// Serve frontend production build if available
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads') && !req.path.startsWith('/ws')) {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
  });
}

// Start Server
server.listen(PORT, () => {
  console.log(` Catering Server running on http://localhost:${PORT}`);
  console.log(` WebSocket server listening on ws://localhost:${PORT}/ws`);
});

