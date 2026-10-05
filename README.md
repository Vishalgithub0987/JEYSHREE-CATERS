# Royal Feast Caterers — Catering Food Menu & Customer Selection Platform

A modern, production-grade **Catering Food Menu & Customer Selection Web Platform** featuring live menu curation, real-time cart synchronization, role-based customer & admin authentication, WebSocket live order streams, and comprehensive WhatsApp integration (Meta Cloud API & prefilled direct links).

---

## 🌟 Key Highlights & Features

### 🍽️ 1. Interactive Catering Food Menu & Live Selection
* **40+ Authentic Catering Dishes** spanning 7 categories:
  * **Starters** (Chicken 65, Chicken Lollipop, Chicken Tikka, Paneer Tikka, Gobi 65, Vegetable Cutlet, Crispy Corn, Fish Amritsari)
  * **Biryani / Rice** (Chicken Biryani, Mutton Biryani, Veg Biryani, Mutton Pulao, Jeera Rice, Fried Rice, Ghee Rice)
  * **Main Course** (Butter Chicken, Chicken Curry, Mutton Curry, Paneer Butter Masala, Mixed Vegetable Curry, Dal Tadka)
  * **Breads** (Naan, Butter Naan, Parotta, Chapati, Tandoori Roti)
  * **Side Dishes** (Onion Raita, Boondi Raita, Mixed Salad, Pickle & Papad)
  * **Desserts** (Gulab Jamun, Rasmalai, Artisanal Ice Cream, Gajar Halwa, Palada Payasam, Fresh Fruit Salad)
  * **Drinks** (Fresh Lime Soda, Mango Juice, Badam Milk, Welcome Drink Rose Milk & Mojito)
* **Live Selection UX**:
  * One-click "Select" turns immediately to "✓ Selected"; clicking again removes the dish.
  * **Desktop**: Sticky right-side panel displaying "Your Selection", live items counter, category tags, clear button, and "Review Selection" CTA.
  * **Mobile**: Floating bottom badge with slide-up selection drawer.
* **Instant Filtering & Search**:
  * Search by food name, description, and chef ingredients.
  * Filter by category tabs and dietary preferences (Pure Veg vs. Non-Veg).
* **Recipe & Chef Ingredients Modal**:
  * Clicking any food card opens an extensive modal showcasing high-resolution food photography, culinary notes, ingredients list, and catering highlights.

---

### 📲 2. Dual WhatsApp Integration (Admin + Customer)
* **Automatic Server-Side & Fallback Support**:
  * Formatted notification sent to **Admin WhatsApp Number** with customer name, phone, event type, date, guests, location, and full selected dishes checklist.
  * Formatted confirmation sent to **Customer's WhatsApp Number** with Request ID, selected menu items, and catering confirmation.
  * Built-in fallback links (`https://wa.me/...`) prefilled with encoded text so WhatsApp opens instantly on desktop web or mobile devices even when external Meta credentials are not configured.
  * Admin Settings panel to configure phone numbers, Meta Cloud API tokens, test notification dispatch, and inspect delivery logs.

---

### 🔐 3. Authentication & Roles
* **Secure JWT Authentication** with bcrypt password hashing.
* **Customer Role**:
  * Registration with event metadata (Event Type, Date, Expected Guests, City/Location).
  * Customer Dashboard with live draft counters and event date tracking.
  * "My Requests" history with status pills and details modals.
  * Profile management.
* **Admin Role**:
  * Secure Admin Dashboard with 5 live statistics cards.
  * Request Management (update statuses: *New*, *Contacted*, *Confirmed*, *Completed*, *Cancelled*).
  * Food Menu CRUD (Add, Edit, Delete, Toggle Live Availability, Upload Images).
  * Customer Directory with WhatsApp quick-chat buttons.
  * WhatsApp Configuration and Audit Logs.

---

## 👥 Demo Login Credentials

For quick evaluation, use the one-click demo fill buttons on the Login page:

| Role | Email / Identifier | Password | Dashboard Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@royalfeast.com` | `Admin@123` | Full Admin Operations, Requests & Settings |
| **Customer** | `vishal@example.com` | `User@123` | Customer Dashboard, Menu Selection & Orders |

*(You can also register any new customer account with your own custom phone & event dates)*

---

## 🛠️ Architecture & Tech Stack

```
Frontend (Vite + React 18 + Tailwind CSS + Lucide Icons + Canvas Confetti)
       │
       │ HTTP / JSON API & WebSocket Stream (/ws)
       ▼
Backend (Node.js + Express.js + WebSockets + JWT + Bcryptjs + Multer)
       │
       ├─► Persistent Transactional Database Engine (Atomic JSON Data Store)
       │     ├── server/data/foods.json
       │     ├── server/data/users.json
       │     ├── server/data/requests.json
       │     └── server/data/settings.json
       │
       └─► WhatsApp Integration Hub (server/whatsapp.js)
             ├── Meta WhatsApp Cloud API (Graph API v19.0)
             └── Direct wa.me Deep Links Fallback Generator
```

---

## 🚀 Running the Application

### 1. Unified Production Server (Recommended)
The server serves both the backend API and frontend client from a single command:
```bash
node server/index.js
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

### 2. Full Development Environment (with Hot-Reload)
Run both backend and Vite dev server concurrently:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5000
JWT_SECRET=royal_feast_super_secure_jwt_secret_catering_2026_key
ADMIN_WHATSAPP_NUMBER=+919876543210
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_API_ENABLED=false
COMPANY_NAME=Royal Feast Caterers
COMPANY_PHONE=+919876543210
COMPANY_EMAIL=contact@royalfeastcaterers.com
COMPANY_ADDRESS=No. 42, Heritage Boulevard, Alwarpet, Chennai, Tamil Nadu 600018
```

---

## 📄 License & Credits
&copy; 2026 Royal Feast Caterers. All Rights Reserved. Built for high-volume wedding buffets and corporate catering operations.
