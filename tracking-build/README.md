# Praktikum AVR - Augmented Reality dengan MindAR dan Three.js

**Mata Kuliah:** Modul Praktikum AVR (ITIA730591)  
**Pertemuan:** 4  
**Materi:** Tracking AR dengan MindAR dan Three.js

## 1. Deskripsi Project

Project ini merupakan tugas praktikum yang menerapkan teknologi Augmented Reality (AR) menggunakan library MindAR dan Three.js. Project ini dibuat untuk mempelajari cara kerja pelacakan gambar dan wajah melalui kamera secara langsung.

Terdapat dua demonstrasi utama dalam project ini, yaitu Image Tracking dan Face Tracking.

## 2. Tujuan Project

1. Memahami penerapan Image Tracking menggunakan MindAR.
2. Memahami penerapan Face Tracking menggunakan MindAR.
3. Menampilkan objek 3D menggunakan Three.js.
4. Menghubungkan objek 3D dengan target gambar dan titik deteksi wajah.

## 3. Teknologi yang Digunakan

- HTML sebagai struktur halaman.
- CSS untuk mengatur tampilan halaman.
- JavaScript untuk menjalankan program.
- MindAR sebagai library Augmented Reality.
- Three.js untuk membuat dan menampilkan objek 3D.
- Visual Studio Code sebagai editor kode.
- Live Server untuk menjalankan project.

## 4. Hasil Demonstrasi

### Demo 1 - Image Tracking

Image Tracking merupakan proses mendeteksi gambar target menggunakan kamera. Ketika gambar target berhasil dikenali, sistem akan menampilkan objek 3D berbentuk hati berwarna pink yang melayang di atas gambar tersebut.

**Objek 3D:** Hati (Love)  
**Target:** Gambar `target-card.png` yang dikompilasi menjadi file `target-card.mind`.  
**Anchor:** `addAnchor(0)`.

### Demo 2 - Face Tracking

Face Tracking merupakan proses mendeteksi wajah pengguna menggunakan kamera depan. Ketika wajah terdeteksi, sistem akan menampilkan aksesori kacamata 3D berbentuk love yang mengikuti posisi wajah.

**Objek 3D:** Kacamata berbentuk love.  
**Target:** Wajah pengguna.  
**Anchor:** `addAnchor(168)`.

## 5. Struktur Folder Project

```text
tracking-build/
│
├── index.html
├── image-tracking.html
├── face-tracking.html
├── README.md
│
├── src/
│   ├── image-demo.js
│   ├── face-demo.js
│   ├── common.js
│   └── styles.css
│
├── targets/
│   └── target-card.mind
│
├── vendor/
│   ├── mindar/
│   └── three/
│
├── docs/
│   └── test-cases.md
│
└── screenshots/
    ├── image-tracking.png
    └── face-tracking.png
```

## 6. Cara Menjalankan Project

1. Download atau clone repository project dari GitHub.
2. Buka folder project menggunakan Visual Studio Code.
3. Pastikan Live Server sudah terpasang.
4. Jalankan file `index.html` menggunakan Live Server.
5. Pilih Demo 1 untuk menjalankan Image Tracking atau Demo 2 untuk menjalankan Face Tracking.
6. Izinkan browser mengakses kamera.
7. Untuk Demo 1, arahkan kamera ke gambar target.
8. Untuk Demo 2, arahkan wajah ke kamera depan.

**Catatan:** Kamera memerlukan izin akses dari browser. Pastikan project dijalankan melalui localhost atau HTTPS.

## 7. Pengujian (Functional Test)

Pengujian dilakukan untuk memastikan setiap fitur dapat berjalan sesuai fungsinya.

Beberapa bagian yang diuji meliputi:
- Membuka halaman utama.
- Mengaktifkan kamera.
- Mendeteksi gambar target.
- Menampilkan objek hati 3D.
- Mendeteksi wajah pengguna.
- Menampilkan aksesori kacamata 3D.

Hasil pengujian secara lengkap dicatat pada file `docs/test-cases.md`.

## 8. Kendala dan Penyelidikan

Salah satu kendala yang ditemukan selama pengerjaan adalah perubahan bentuk objek kacamata yang belum terlihat pada browser setelah kode JavaScript diperbarui.

Penyelidikan dilakukan dengan memeriksa pemanggilan file JavaScript pada halaman HTML, memastikan lokasi file yang diedit sudah benar, menyimpan perubahan, dan melakukan refresh browser.

## 9. Bukti Pengujian

Bukti pengujian berupa screenshot hasil demonstrasi Image Tracking dan Face Tracking disimpan pada folder `screenshots`.

- `image-tracking.png` merupakan bukti hasil Demo 1.
- `face-tracking.png` merupakan bukti hasil Demo 2.

## 10. Kesimpulan

Melalui praktikum ini, dapat dipelajari penerapan Augmented Reality menggunakan MindAR dan Three.js. Image Tracking digunakan untuk menampilkan objek 3D berdasarkan gambar target, sedangkan Face Tracking digunakan untuk menampilkan aksesori 3D berdasarkan deteksi wajah pengguna.

Kedua demonstrasi ini memberikan pemahaman mengenai penggunaan teknologi AR dalam menampilkan objek virtual yang dapat berinteraksi dengan lingkungan nyata melalui kamera.