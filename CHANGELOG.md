# Changelog

## [1.2.0] — 2026-05-27

### Added
- Fitur **Teacher Mode (Ngajar)** — tab khusus buat guru merekam sesi ngajar
  - Flow **▶ Mulai Ngajar → ⬛ Selesai & Simpan** — tekan "Mulai" pas les mulai, timer otomatis jalan, tekan "Selesai" pas les selesai (60 menit)
  - **Last Session Context** — lihat otomatis sesi & PR sebelumnya sebelum mulai ngajar
  - **Quick Notes** — tombol-tombol catatan cepat (postur jari, tempo, dll.)
  - **Carry Homework** — centang buat bawa PR dari sesi sebelumnya
  - **Dashboard Guru** — jadwal hari ini dengan timeline, status ○/●, tombol "Mulai"/"Isi"
  - Tab "Ngajar" otomatis jadi tab pertama pas masuk profil murid

### Changed
- **Slider durasi dihapus** — les selalu 60 menit, gak perlu pilih durasi lagi
- **Timer otomatis** — mulai dari 00:00 ketika "Mulai Ngajar" ditekan
- **Tab "Ngajar" → "Sesi"** — lebih natural
- **Tab "Latihan" → "Materi"** — sesuai isinya (pemilih materi latihan)
- **Tab Metronom, Log, Progress dihapus** — fokus ke fitur utama
- **Tab Report diganti total** — jadi **Laporan per murid buat orang tua**

### Added
- **Laporan per Anak** — dashboard ringkasan buat dibagikan ke orang tua
  - Header nama, instrumen, jadwal les
  - Kartu statistik: Hadir, Izin, Libur, Total, durasi, periode
  - Materi yang diajarkan (tag dengan hitungan)
  - Tombol **📋 Salin Laporan** — copy formatted text ke clipboard (WhatsApp/email)
  - Riwayat semua sesi: tanggal, attendance, materi, catatan, PR (terbaru paling atas)

### Fixed
- **Timer Practice auto-start** — timer di tab Latihan gak langsung jalan lagi pas kebuka (running default false)

## [1.1.0] — 2026-05-27

### Added
- Fitur **Reschedule** — pindahkan jadwal les murid sementara ke hari/jam lain
  - Tombol ↻ di kartu profil murid di HomeScreen
  - Pilih hari & jam baru via modal dialog
  - Murid yang di-reschedule muncul di Today's Agenda dengan badge ↻
  - Tampilan reschedule di kartu profil, TrackerScreen, dan agenda grup
  - Otomatis kembali ke jadwal normal setelah sesi disimpan
  - Badge & teks warning color di semua tampilan

## [1.0.0] — 2026-05-27

### Added
- Manajemen murid (tambah, edit, hapus)
- 3 dashboard instrumen: Gitar 🎸, Piano 🎹, Drum 🥁
- Jadwal les per murid (hari + jam)
- Timer latihan dengan tracking durasi
- Metronome built-in dengan kontrol BPM dan ketukan
- Pencatatan materi latihan per instrumen
- Evaluasi dengan scoring (Timing, Technique, Reading, Expression)
- Absensi (Hadir, Izin, Libur, No-show, Reschedule)
- PR / latihan rumah
- Target musikal per sesi
- Progress tracker per murid
- Report bulanan dengan insight & cetak PDF
- Dark / Light theme
- Bahasa Indonesia & English
- Sync ke Supabase (online/offline detection)
- Draft sesi (localStorage) — aman jika terputus
