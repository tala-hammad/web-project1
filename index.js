const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors()); 

app.use(express.json()); 


const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Error connecting to database:", err));


const dataSchema = new mongoose.Schema({
    dimension: String,   
    value: String,       
    description: String, 
    date: { type: Date, default: Date.now }
});
const DataEntry = mongoose.model('DataEntry', dataSchema);


const referenceSchema = new mongoose.Schema({
    category: String, 
    title: String,
    authors: String,
    journal: String,
    doi: String,
    link: String
});
const Reference = mongoose.model('Reference', referenceSchema);


app.get('/', (req, res) => {
    res.send("Backend Server is Running! 🚀");
});


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


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔗 Chart API: http://localhost:${PORT}/get-chart-data`);
    console.log(`🔗 References API: http://localhost:${PORT}/get-references`);
});