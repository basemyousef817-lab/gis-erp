const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ===== تقديم الملفات الثابتة =====
app.use(express.static(path.join(__dirname, 'frontend')));

// ===== API =====
app.get('/api/projects', (req, res) => {
    res.json([
        { id: 1, name: 'مشروع 1', description: 'وصف المشروع', location_lat: 30.0444, location_lng: 31.2357, status: 'قيد التنفيذ' },
        { id: 2, name: 'مشروع 2', description: 'وصف المشروع', location_lat: 30.0524, location_lng: 31.2412, status: 'منتهي' }
    ]);
});

// ===== صفحة الواجهة =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ===== تصدير التطبيق لـ Vercel =====
module.exports = app;