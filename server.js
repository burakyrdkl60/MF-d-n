const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// uploads klasörü yoksa oluştur
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Public klasörünü sun
app.use(express.static('public'));

// Dosya yükleme endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.send(req.file.filename);
});

// Sunucu portu (Render NODE_ENV kullanır)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
