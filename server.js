const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ===== خدمة الملفات الثابتة (الواجهة) =====
app.use(express.static(path.join(__dirname, 'frontend')));

// ===== ملف التخزين =====
const DATA_FILE = './projects.json';

function readProjects() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeProjects(projects) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
}

// ===== API =====
app.get('/api/projects', (req, res) => {
    res.json(readProjects());
});

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

app.delete('/api/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let projects = readProjects();
    projects = projects.filter(p => p.id !== id);
    writeProjects(projects);
    res.json({ message: 'تم الحذف' });
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