const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

const app = express();

// 1. الإعدادات الأساسية
app.use(cors()); 
app.use(express.json()); 

// 🚀 خدمة الملفات الفرعية (الصور، CSS، JavaScript) من مجلد public
app.use(express.static(path.join(__dirname, 'public'))); 

// 2. الاتصال بـ MongoDB Atlas
const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to Database"))
    .catch(err => console.log("❌ DB Error:", err));

// 3. تعريف الجداول (Schemas) - تأكدي أن الأسماء تطابق ما في Atlas
const Reference = mongoose.model('Reference', new mongoose.Schema({
    Category: String, title: String, authors: String, journal: String, doi: String, link: String
}));

const DataEntry = mongoose.model('DataEntry', new mongoose.Schema({
    dimension: String, value: String, description: String, date: { type: Date, default: Date.now }
}));

// 4. مسارات التنقل بين صفحات الموقع (بناءً على مكانها الجديد في المجلد الرئيسي)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // الصفحة الرئيسية
});

app.get('/ProjectOverview.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'ProjectOverview.html'));
});

// إذا كان لديكِ صفحات أخرى أخرجيها للمجلد الرئيسي وأضيفي مسارها هنا بنفس الطريقة
app.get('/:page.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.params.page + '.html'));
});

// 5. روابط جلب البيانات (APIs) لتظهر المصادر والرسوم البيانية
app.get('/get-references', async (req, res) => {
    try { res.json(await Reference.find()); } catch (err) { res.status(500).send(err); }
});

app.get('/get-chart-data', async (req, res) => {
    try { res.json(await DataEntry.find()); } catch (err) { res.status(500).send(err); }
});

// 6. تشغيل السيرفر ليعمل على Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Site live on port ${PORT}`));