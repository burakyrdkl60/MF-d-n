const form = document.querySelector('form');
const resultDiv = document.getElementById('result');

// Buraya Render linkini yaz: https://proje-adresin.onrender.com/upload
const UPLOAD_URL = 'http://localhost:3000/upload';

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = form.querySelector('input[type="file"]');
    if (!fileInput.files[0]) {
        resultDiv.innerText = "Lütfen bir dosya seçin!";
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    resultDiv.innerText = "Dosya yükleniyor...";
    fetch(UPLOAD_URL, { method: 'POST', body: formData })
        .then(res => res.text())
        .then(data => {
            resultDiv.innerText = "Başarılı: " + data;
            form.reset();
        })
        .catch(err => {
            resultDiv.innerText = "Hata oluştu: " + err;
        });
});
