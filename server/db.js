import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readData(collection, defaultVal = []) {
  const filePath = getFilePath(collection);
  try {
    if (!fs.existsSync(filePath)) {
      writeData(collection, defaultVal);
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${collection}:`, err);
    return defaultVal;
  }
}

function writeData(collection, data) {
  const filePath = getFilePath(collection);
  try {
    const tmpPath = `${filePath}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpPath, filePath);
    return true;
  } catch (err) {
    console.error(`Error writing ${collection}:`, err);
    return false;
  }
}

export const db = {
  // Users
  getUsers: () => readData('users', []),
  findUserById: (id) => readData('users', []).find(u => u.id === id),
  findUserByEmail: (email) => {
    if (!email) return null;
    const users = readData('users', []);
    return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase().trim());
  },
  findUserByPhone: (phone) => {
    if (!phone) return null;
    const clean = phone.replace(/[^0-9]/g, '');
    const users = readData('users', []);
    return users.find(u => u.phone && u.phone.replace(/[^0-9]/g, '') === clean);
  },
  findUserByEmailOrPhone: (identifier) => {
    if (!identifier) return null;
    const cleanIdentifier = identifier.trim();
    const users = readData('users', []);
    return users.find(u => {
      const matchEmail = u.email && u.email.toLowerCase() === cleanIdentifier.toLowerCase();
      const matchPhone = u.phone && u.phone.replace(/[^0-9]/g, '') === cleanIdentifier.replace(/[^0-9]/g, '');
      return matchEmail || matchPhone;
    });
  },
  createUser: (userData) => {
    const users = readData('users', []);
    const newUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      role: 'customer',
      createdAt: new Date().toISOString(),
      ...userData
    };
    users.push(newUser);
    writeData('users', users);
    return newUser;
  },
  updateUser: (id, updates) => {
    const users = readData('users', []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates, updatedAt: new Date().toISOString() };
    writeData('users', users);
    return users[idx];
  },

  // Foods
  getFoods: () => readData('foods', []),
  findFoodById: (id) => readData('foods', []).find(f => f.id === id),
  createFood: (foodData) => {
    const foods = readData('foods', []);
    const newFood = {
      id: `food-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      available: true,
      createdAt: new Date().toISOString(),
      ...foodData
    };
    foods.push(newFood);
    writeData('foods', foods);
    return newFood;
  },
  updateFood: (id, updates) => {
    const foods = readData('foods', []);
    const idx = foods.findIndex(f => f.id === id);
    if (idx === -1) return null;
    foods[idx] = { ...foods[idx], ...updates, updatedAt: new Date().toISOString() };
    writeData('foods', foods);
    return foods[idx];
  },
  deleteFood: (id) => {
    const foods = readData('foods', []);
    const filtered = foods.filter(f => f.id !== id);
    if (filtered.length === foods.length) return false;
    writeData('foods', filtered);
    return true;
  },

  // Requests
  getRequests: () => readData('requests', []),
  findRequestById: (id) => readData('requests', []).find(r => r.id === id),
  findRequestsByUserId: (userId) => {
    const requests = readData('requests', []);
    return requests.filter(r => r.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  generateRequestId: () => {
    const requests = readData('requests', []);
    const year = new Date().getFullYear();
    const count = requests.length + 101;
    return `CAT-${year}-${String(count).padStart(5, '0')}`;
  },
  createRequest: (requestData) => {
    const requests = readData('requests', []);
    const newReq = {
      id: requestData.id || db.generateRequestId(),
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...requestData
    };
    requests.unshift(newReq);
    writeData('requests', requests);
    return newReq;
  },
  updateRequest: (id, updates) => {
    const requests = readData('requests', []);
    const idx = requests.findIndex(r => r.id === id);
    if (idx === -1) return null;
    requests[idx] = { ...requests[idx], ...updates, updatedAt: new Date().toISOString() };
    writeData('requests', requests);
    return requests[idx];
  },

  // Settings
  getSettings: () => readData('settings', {
    adminWhatsAppNumber: "+919876543210",
    whatsappApiEnabled: false,
    companyName: "Royal Feast Caterers"
  }),
  updateSettings: (updates) => {
    const current = readData('settings', {});
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    writeData('settings', updated);
    return updated;
  },

  // WhatsApp Logs
  getWhatsAppLogs: () => readData('whatsapp_logs', []),
  addWhatsAppLog: (log) => {
    const logs = readData('whatsapp_logs', []);
    const newLog = {
      id: `walog-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...log
    };
    logs.unshift(newLog);
    if (logs.length > 200) logs.pop(); // keep latest 200 logs
    writeData('whatsapp_logs', logs);
    return newLog;
  }
};
