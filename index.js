const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // استدعاء مكتبة CORS

const app = express();

// --- 1. الإعدادات الأساسية (Middleware) ---
// حل مشكلة "Blocked by CORS policy" للسماح للمتصفح بطلب البيانات
app.use(cors()); 
// السماح للسيرفر بفهم البيانات القادمة بصيغة JSON
app.use(express.json()); 

// --- 2. الاتصال بقاعدة البيانات (MongoDB Atlas) ---
const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Error connecting to database:", err));

// --- 3. تعريف نماذج البيانات (Models) ---

// نموذج بيانات الشارت
const dataSchema = new mongoose.Schema({
    dimension: String,   
    value: String,       
    description: String, 
    date: { type: Date, default: Date.now }
});
const DataEntry = mongoose.model('DataEntry', dataSchema);

// نموذج بيانات المراجع
const referenceSchema = new mongoose.Schema({
    category: String, // مثلاً: Economic, Psychological, Social
    title: String,
    authors: String,
    journal: String,
    doi: String,
    link: String
});
const Reference = mongoose.model('Reference', referenceSchema);

// --- 4. المسارات (Routes / APIs) ---

// مسار فحص السيرفر
app.get('/', (req, res) => {
    res.send("Backend Server is Running! 🚀");
});

// --- قسم الشارت (Charts) ---
app.get('/get-chart-data', async (req, res) => {
    try {
        const allData = await DataEntry.find(); 
        res.status(200).json(allData); // إرسال المصفوفة [] التي رأيتِها
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chart data" });
    }
});

// --- قسم المراجع (References) ---
app.get('/get-references', async (req, res) => {
    try {
        const refs = await Reference.find();
        res.status(200).json(refs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch references" });
    }
});

// مسار لإضافة مرجع جديد يدوياً (اختياري)
app.post('/add-reference', async (req, res) => {
    try {
        const newRef = new Reference(req.body);
        await newRef.save();
        res.status(201).json({ message: "Reference added successfully" });
    } catch (error) {
        res.status(400).json({ error: "Adding reference failed" });
    }
});

// --- 5. تشغيل السيرفر ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔗 Chart API: http://localhost:${PORT}/get-chart-data`);
    console.log(`🔗 References API: http://localhost:${PORT}/get-references`);
});