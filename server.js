const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

// ===================== ملف التخزين =====================
const DATA_FILE = './projects.json';

// قراءة البيانات من الملف
function readProjects() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// كتابة البيانات في الملف
function writeProjects(projects) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
}

// ===================== API =====================

// 1. جلب كل المشاريع
app.get('/api/projects', (req, res) => {
    const projects = readProjects();
    res.json(projects);
});

// 2. إضافة مشروع جديد
app.post('/api/projects', (req, res) => {
    const projects = readProjects();
    const newProject = {
        id: Date.now(),
        ...req.body,
        created_at: new Date().toISOString()
    };
    projects.push(newProject);
    writeProjects(projects);
    res.status(201).json(newProject);
});

// 3. حذف مشروع
app.delete('/api/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let projects = readProjects();
    projects = projects.filter(p => p.id !== id);
    writeProjects(projects);
    res.json({ message: 'تم الحذف' });
});

// 4. Test route
app.get('/', (req, res) => {
    res.json({ message: '🚀 GIS-ERP API is running!' });
});

// ===================== تشغيل السيرفر =====================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:5000`);
});