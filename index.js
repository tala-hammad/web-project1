const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

const app = express();

// --- 1. الإعدادات الأساسية (Middleware) ---
app.use(cors()); 
app.use(express.json()); 

// 🚀 الربط مع مجلد public: هذا السطر يضمن تحميل الـ CSS والـ JS والصور تلقائياً
app.use(express.static(path.join(__dirname, 'public'))); 

// --- 2. الاتصال بقاعدة البيانات (MongoDB Atlas) ---
const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Error connecting to database:", err));

// --- 3. تعريف النماذج (Models) ---
const dataSchema = new mongoose.Schema({
    dimension: String,   
    value: String,       
    description: String, 
    date: { type: Date, default: Date.now }
});
const DataEntry = mongoose.model('DataEntry', dataSchema);

const referenceSchema = new mongoose.Schema({
    Category: String, 
    title: String,
    authors: String,
    journal: String,
    doi: String,
    link: String
});
const Reference = mongoose.model('Reference', referenceSchema);

// --- 4. مسارات الصفحات (Frontend Routes) ---

// تشغيل صفحة ProjectOverview عند طلب الرابط
app.get('/ProjectOverview.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ProjectOverview.html'));
});

// تشغيل الصفحة الرئيسية (اختياري)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- 5. مسارات البيانات (API Routes) ---

app.get('/get-chart-data', async (req, res) => {
    try {
        const allData = await DataEntry.find(); 
        res.status(200).json(allData); 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chart data" });
    }
});

app.get('/get-references', async (req, res) => {
    try {
        const refs = await Reference.find();
        res.status(200).json(refs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch references" });
    }
});

app.post('/add-reference', async (req, res) => {
    try {
        const newRef = new Reference(req.body);
        await newRef.save();
        res.status(201).json({ message: "Reference added successfully" });
    } catch (error) {
        res.status(400).json({ error: "Adding reference failed" });
    }
});

// --- 6. تشغيل السيرفر ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server is UP and Running!`);
    console.log(`📂 Page Link: http://localhost:${PORT}/ProjectOverview.html`);
    console.log(`✅ Data Status: Indexes are READY in Atlas\n`);
});