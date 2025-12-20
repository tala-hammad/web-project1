const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // لخدمة ملفات HTML و JS من المجلد الرئيسي

// الاتصال بـ MongoDB Atlas
const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to Database"))
    .catch(err => console.log("❌ DB Error:", err));

// تعريف الـ Schema - تأكدي أن الأسماء تطابق صورتك في Atlas (image_263eb5.png)
const referenceSchema = new mongoose.Schema({
    Category: String,
    Title: String,
    Authors: String,
    Jornal: String, // كما هي في قاعدة بياناتك (بدون u)
    "URL link": String
});

// ربط الموديل بجدول 'references' الصغير (image_262fed.png)
const Reference = mongoose.model('Reference', referenceSchema, 'references');

// مسار جلب البيانات
app.get('/get-references', async (req, res) => {
    try {
        const refs = await Reference.find({});
        res.status(200).json(refs); // إرسال البيانات بنجاح
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json([]); // إرسال مصفوفة فارغة في حال الخطأ لتجنب تعطل الواجهة
    }
});

// توجيه الصفحات
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/References.html', (req, res) => res.sendFile(path.join(__dirname, 'References.html')));
// هذا المسار خاص بالشارتات فقط ولا يؤثر على المراجع
app.get('/get-chart-data', async (req, res) => {
    try {
        const data = await DataEntry.find({}); 
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Site running on port ${PORT}`));