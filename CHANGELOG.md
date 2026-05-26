# Changelog

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
