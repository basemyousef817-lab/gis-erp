const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ===== تقديم الملفات الثابتة =====
app.use(express.static(path.join(__dirname, 'frontend')));

// ===== API تجريبي =====
app.get('/api/projects', (req, res) => {
    res.json([
        { id: 1, name: 'مشروع تجريبي', description: 'من Vercel', location_lat: 30.0444, location_lng: 31.2357, status: 'قيد التنفيذ' }
    ]);
});

// ===== صفحة الواجهة =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ===== تشغيل السيرفر =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});