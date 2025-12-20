const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

const app = express();

// 1. الإعدادات الأساسية
app.use(cors()); 
app.use(express.json()); 

// خدمة الملفات من مجلد public والمجلد الرئيسي
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(__dirname)); 

// 2. الاتصال بـ MongoDB Atlas
const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to Database"))
    .catch(err => console.log("❌ DB Error:", err));

// 3. تعريف الجداول (Schemas) - مطابقة تماماً لصور Atlas الخاصة بكِ
const referenceSchema = new mongoose.Schema({
    Category: String, 
    Title: String, 
    Authors: String, 
    Jornal: String, // مكتوبة بدون u كما في صورتك (image_263eb5.png)
    "URL link": String
});

// ربط الموديل بالجدول 'references' (بحروف صغيرة كما في صورة image_262fed.png)
const Reference = mongoose.model('Reference', referenceSchema, 'references');

const dataEntrySchema = new mongoose.Schema({
    dimension: String, 
    value: String, 
    description: String, 
    date: { type: Date, default: Date.now }
});

// ربط الموديل بالجدول 'dataentries' (كما في صورة image_262fed.png)
const DataEntry = mongoose.model('DataEntry', dataEntrySchema, 'dataentries');

// 4. مسارات التنقل بين صفحات الموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// مسار عام لفتح أي صفحة HTML موجودة في المجلد الرئيسي
app.get('/:page.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.params.page + '.html'));
});

// 5. روابط جلب البيانات (APIs)
app.get('/get-references', async (req, res) => {
    try { 
        const refs = await Reference.find();
        res.json(refs); 
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

app.get('/get-chart-data', async (req, res) => {
    try { 
        const data = await DataEntry.find();
        res.json(data); 
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// 6. تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Site live on port ${PORT}`));