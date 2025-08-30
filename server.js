const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// uploads klasörü yoksa oluştur
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// CORS ayarı (frontend farklı origin’den gelirse)
app.use(cors());

// Multer ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Public klasörünü sun
app.use(express.static('public'));

// Test endpoint
app.get('/ping', (req, res) => {
    res.send('Server çalışıyor ✅');
});

// Dosya yükleme endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('Dosya bulunamadı!');
    res.send(req.file.filename);
});

// Sunucu portu (Render otomatik PORT verir)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

// uploads klasörünü tarayıcıya aç
app.use('/uploads', express.static('uploads'));

