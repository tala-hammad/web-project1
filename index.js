const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());



app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname)); 

const dbURI = 'mongodb+srv://halaalmasri_db_user:BfZeh7L7UhNEBpM2@cluster0.9mhiny7.mongodb.net/NablusProject?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to Database"))
    .catch(err => console.log("❌ DB Error:", err));

const referenceSchema = new mongoose.Schema({
    Category: String,
    Title: String,
    Authors: String,
    Jornal: String, 
    "URL link": String
});

const Reference = mongoose.model('Reference', referenceSchema, 'references');

app.get('/get-references', async (req, res) => {
    try {
        const refs = await Reference.find({});
        res.status(200).json(refs); 
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json([]); 
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/References.html', (req, res) => res.sendFile(path.join(__dirname, 'References.html')));
app.get('/ProjectOverview.html', (req, res) => res.sendFile(path.join(__dirname, 'ProjectOverview.html')));


app.get('/public/ProjectOverview.html', (req, res) => {
    res.redirect('/ProjectOverview.html');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Site running on port ${PORT}`));