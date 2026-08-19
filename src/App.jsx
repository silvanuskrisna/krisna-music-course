import { useState, useEffect, useRef, useCallback } from "react";
import { isSupabaseConfigured, supabase } from "./supabaseClient";
import { CURRICULUM } from "./curriculum";
import ProgressTab from "./ProgressTab";

const THEME_KEY = "mpt_theme";
const DRAFT_PREFIX = "mpt_draft_";
const INSTRUMENTS = ["Gitar Akustik", "Gitar Elektrik", "Piano", "Drum"];
const INST_ICON = { "Gitar Akustik": "🎸", "Gitar Elektrik": "🎸", Piano: "🎹", Drum: "🥁" };
const LESSON_DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const ATTENDANCE_STATUSES = ["Hadir", "Izin", "No-show"];
const SCORE_KEYS = ["timing", "technique", "reading", "expression"];
const SCORE_LABELS = {
  timing: "Timing",
  technique: "Technique",
  reading: "Reading",
  expression: "Expression",
};
let lessonScheduleColumnsAvailable = true;
let rescheduleColumnsAvailable = true;
let sessionExtraColumnsAvailable = true;
let cutiColumnAvailable = true;

const MATERI = {
  "Gitar Akustik": {
    "Teknik Dasar": ["Warm Up Session","Chord open","Strumming patterns","Fingerpicking","Fingerstyle picking","Scale mayor/minor","Travis picking"],
    "Repertoire": ["Lagu baru (belajar)","Lagu dihapal (review)","Lagu performa (polish)"],
    "Teori": ["Interval & harmoni","Progresi chord","Analisis lagu","Rhythm & time feel","Mode & skala lanjut"],
  },
  "Gitar Elektrik": {
    "Teknik Dasar": ["Warm Up Session","Chord barre","Power chord","Alternate picking","Palm mute","Legato & bending","Scale pentatonik","Sweep picking"],
    "Repertoire": ["Lagu baru (belajar)","Lagu dihapal (review)","Lagu performa (polish)"],
    "Teori": ["Interval & harmoni","Progresi chord","Analisis lagu","Rhythm & time feel","Mode & skala lanjut"],
  },
  Piano: {
    "Teknik Dasar": ["Warm Up Session","Posisi tangan & jari","Tangga nada (C, G, F)","Chord triad","Chord inversi","Arpegio","Hands together","Pedal teknik","Sight reading"],
    "Repertoire": ["Lagu baru (belajar)","Lagu dihapal (review)","Lagu performa (polish)"],
    "Teori": ["Interval","Progresi chord","Harmoni fungsional","Analisis partitur","Improvisasi"],
  },
  Drum: {
    "Teknik Dasar": ["Warm Up Session","Rudiment dasar (single stroke, double stroke)","Paradiddle","Hi-hat control","Bass drum teknik","Independence tangan-kaki","Groove & fill","Polyrhythm","Odd time signature"],
    "Repertoire": ["Lagu baru (belajar)","Lagu dihapal (review)","Lagu performa (polish)"],
    "Teori": ["Notasi drum","Time feel & groove","Dinamika","Gaya & genre (rock, jazz, funk)"],
  },
};

const APP_VERSION = "1.2.0";

const KAT_COLORS = {
  "Teknik Dasar": { bg:"var(--color-background-info)", text:"var(--color-text-info)", bar:"#378ADD" },
  "Repertoire":   { bg:"var(--color-background-success)", text:"var(--color-text-success)", bar:"#1D9E75" },
  "Teori":        { bg:"var(--color-background-warning)", text:"var(--color-text-warning)", bar:"#BA7517" },
};

const TABS = ["teach","progress","report"];

const STRINGS = {
  id: {
    practiceStudio: "Practice studio",
    synced: "Synced",
    syncing: "Syncing...",
    syncFailed: "Sync failed: ",
    noStudents: "Belum ada murid. Tambah profil dulu.",
    thisWeek: "Minggu ini",
    total: "Total",
    studentName: "Nama murid",
    namePlaceholder: "Masukkan nama...",
    mainInstrument: "Instrumen utama",
    lessonDay: "Hari les",
    lessonTime: "Jam les",
    lessonSchedule: "Jadwal les",
    noLessonSchedule: "Jadwal belum diatur",
    add: "Tambah",
    cancel: "Batal",
    addStudent: "+ Tambah murid",
    back: "Kembali",
    tabs: { teach:"Sesi", progress:"Progress", report:"Laporan" },
    chooseInstrument: "Pilih instrumen dulu.",
    practiceMaterial: "Materi latihan",
    songTitle: "Judul lagu",
    songTitlePlaceholder: "Masukkan judul lagu...",
    instrument: "Instrumen",
    studentMainInstrument: "Instrumen utama murid",
    chooseMaterialToTrack: "Pilih materi untuk mulai mencatat",
    start: "Mulai",
    stop: "Stop",
    changeMaterial: "Ganti Materi",
    reset: "Reset",
    chooseNextMaterial: "Pilih materi berikutnya",
    currentSession: "Sesi ini",
    running: "berjalan...",
    sessionNotes: "Catatan sesi",
    notesPlaceholder: "Progress, kendala...",
    attendance: "Kehadiran",
    homework: "PR / latihan rumah",
    homeworkPlaceholder: "Contoh: Latihan bar 1-8 tempo 70 bpm",
    lessonGoal: "Target musikal",
    lessonGoalPlaceholder: "Contoh: Chorus lagu X bersih di 80 bpm",
    evaluation: "Evaluasi",
    editSession: "Ubah sesi",
    saveChanges: "Simpan perubahan",
    draftRestored: "Draft sesi dipulihkan",
    saved: "Tersimpan!",
    saveSession: "Simpan Sesi",
    volume: "Volume",
    beats: "Ketukan:",
    noPracticeSessions: "Belum ada sesi latihan.",
    delete: "Hapus",
    today: "Hari ini",
    streak: "Streak",
    day: "hari",
    weeklyTarget: "Target mingguan",
    edit: "Ubah",
    minutes: "menit",
    save: "Simpan",
    from: "dari",
    practiceBreakdown: "Breakdown latihan",
    todayAgenda: "Agenda hari ini",
    noLessonsToday: "Tidak ada jadwal hari ini.",
    recentTargets: "Riwayat target",
    noTargets: "Belum ada target musikal.",
    selectMonth: "Pilih bulan",
    noReportSessions: "Belum ada sesi untuk di-report.",
    sessions: "sesi",
    vsLastMonth: "vs bulan lalu",
    reportSummary: "Ringkasan Bulanan",
    learningFocus: "Fokus Belajar",
    topMaterial: "Materi dominan",
    practiceNotes: "Catatan Latihan",
    nextLessonPlan: "Rencana Les Berikutnya",
    noNotesRecorded: "Belum ada catatan sesi.",
    continueMaterial: "Lanjutkan materi",
    reviewBasics: "Review teknik dasar dan target latihan minggu depan",
    weeklyDuration: "Durasi per minggu",
    dailyDuration: "Durasi per hari",
    printSavePdf: "Cetak / Simpan PDF",
    printExportPdf: "Cetak / Export PDF",
    reportTitle: "Laporan Latihan Musik",
    printed: "Dicetak",
    totalPractice: "Total latihan",
    sessionCount: "Jumlah sesi",
    previousMonth: "Bulan sebelumnya",
    sameAsPreviousMonth: "Sama dengan bulan sebelumnya",
    upFromPreviousMonth: "Naik",
    downFromPreviousMonth: "Turun",
    fromPreviousMonth: "dari bulan sebelumnya",
    noSessionsThisMonth: "Tidak ada sesi di bulan ini.",
    teacherNotes: "Catatan Guru",
    handwritten: "(Notes)",
    date: "Tanggal",
    category: "Kategori",
    material: "Materi",
    duration: "Durasi",
    notes: "Catatan",
    lastSession: "Sesi Sebelumnya",
    noPrevSession: "Belum ada sesi sebelumnya",
    checkHomework: "Cek PR",
    teachMaterial: "Materi diajarkan",
    sessionDuration: "Durasi les",
    minute: "menit",
    lessonSaved: "Sesi tersimpan!",
    lessonSave: "Simpan Sesi Ngajar",
    lessonStart: "Mulai Ngajar",
    newHomework: "PR baru",
    previousHomework: "PR sebelumnya",
    fromLastSession: "dari sesi lalu",
    quickNotes: "Catatan Cepat",
    attendanceLabel: "Kehadiran",
    log: "Riwayat",
  },
  en: {
    practiceStudio: "Practice studio",
    synced: "Synced",
    syncing: "Syncing...",
    syncFailed: "Sync failed: ",
    noStudents: "No students yet. Add a profile first.",
    thisWeek: "This week",
    total: "Total",
    studentName: "Student name",
    namePlaceholder: "Enter name...",
    mainInstrument: "Main instrument",
    lessonDay: "Lesson day",
    lessonTime: "Lesson time",
    lessonSchedule: "Lesson schedule",
    noLessonSchedule: "No lesson schedule",
    add: "Add",
    cancel: "Cancel",
    addStudent: "+ Add student",
    back: "Back",
    tabs: { teach:"Session", progress:"Progress", report:"Report" },
    chooseInstrument: "Choose an instrument first.",
    practiceMaterial: "Practice material",
    songTitle: "Song title",
    songTitlePlaceholder: "Enter song title...",
    instrument: "Instrument",
    studentMainInstrument: "Student main instrument",
    chooseMaterialToTrack: "Choose material to start tracking",
    start: "Start",
    stop: "Stop",
    changeMaterial: "Change Material",
    reset: "Reset",
    chooseNextMaterial: "Choose next material",
    currentSession: "Current session",
    running: "running...",
    sessionNotes: "Session notes",
    notesPlaceholder: "Progress, blockers...",
    attendance: "Attendance",
    homework: "Homework",
    homeworkPlaceholder: "Example: Practice bars 1-8 at 70 bpm",
    lessonGoal: "Musical target",
    lessonGoalPlaceholder: "Example: Clean chorus of song X at 80 bpm",
    evaluation: "Evaluation",
    editSession: "Edit session",
    saveChanges: "Save changes",
    draftRestored: "Session draft restored",
    saved: "Saved!",
    saveSession: "Save Session",
    volume: "Volume",
    beats: "Beats:",
    noPracticeSessions: "No practice sessions yet.",
    delete: "Delete",
    today: "Today",
    streak: "Streak",
    day: "days",
    weeklyTarget: "Weekly target",
    edit: "Edit",
    minutes: "minutes",
    save: "Save",
    from: "of",
    practiceBreakdown: "Practice breakdown",
    todayAgenda: "Today's Agenda",
    noLessonsToday: "No lessons scheduled today.",
    recentTargets: "Target history",
    noTargets: "No musical targets yet.",
    selectMonth: "Select month",
    noReportSessions: "No sessions to report yet.",
    sessions: "sessions",
    vsLastMonth: "vs last month",
    reportSummary: "Monthly Summary",
    learningFocus: "Learning Focus",
    topMaterial: "Main material",
    practiceNotes: "Practice Notes",
    nextLessonPlan: "Next Lesson Plan",
    noNotesRecorded: "No session notes recorded.",
    continueMaterial: "Continue material",
    reviewBasics: "Review fundamentals and next week's practice target",
    weeklyDuration: "Duration per week",
    dailyDuration: "Duration per day",
    printSavePdf: "Print / Save PDF",
    printExportPdf: "Print / Export PDF",
    reportTitle: "Music Practice Report",
    printed: "Printed",
    totalPractice: "Total practice",
    sessionCount: "Session count",
    previousMonth: "Previous month",
    sameAsPreviousMonth: "Same as previous month",
    upFromPreviousMonth: "Up",
    downFromPreviousMonth: "Down",
    fromPreviousMonth: "from previous month",
    noSessionsThisMonth: "No sessions this month.",
    teacherNotes: "Teacher Notes",
    handwritten: "(write by hand after printing)",
    date: "Date",
    category: "Category",
    material: "Material",
    duration: "Duration",
    notes: "Notes",
    lastSession: "Last Session",
    noPrevSession: "No previous session",
    checkHomework: "Check Homework",
    teachMaterial: "Material taught",
    sessionDuration: "Lesson duration",
    minute: "min",
    lessonSaved: "Lesson saved!",
    lessonSave: "Save Teaching Session",
    lessonStart: "Start Teaching",
    newHomework: "New homework",
    previousHomework: "Previous homework",
    fromLastSession: "from last session",
    quickNotes: "Quick Notes",
    attendanceLabel: "Attendance",
    log: "History",
  },
};

function defaultData() {
  return { profiles: [], activeId: null, activeIds: [] };
}

function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch(e) {}
  return "light";
}

function saveTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch(e) {}
}

function getDraftKey(profileId) {
  return DRAFT_PREFIX + String(profileId || "");
}

function loadSessionDraft(profileId) {
  try {
    const raw = localStorage.getItem(getDraftKey(profileId));
    return raw ? JSON.parse(raw) : null;
  } catch(e) {
    return null;
  }
}

function saveSessionDraft(profileId, draft) {
  try { localStorage.setItem(getDraftKey(profileId), JSON.stringify(draft)); } catch(e) {}
}

function clearSessionDraft(profileId) {
  try { localStorage.removeItem(getDraftKey(profileId)); } catch(e) {}
}

function makeTranslator(lang) {
  return function(key) {
    const strings = STRINGS[lang] || STRINGS.id;
    return strings[key] || STRINGS.id[key] || key;
  };
}

function getErrorMessage(error) {
  if (!error) return "Unknown error";
  if (error.message) return error.message;
  if (error.error_description) return error.error_description;
  if (error.details) return error.details;
  try { return JSON.stringify(error); } catch(e) { return String(error); }
}

function isMissingLessonScheduleColumn(error) {
  const message = getErrorMessage(error);
  return error && error.code === "42703"
    || message.indexOf("lesson_day") !== -1
    || message.indexOf("lesson_time") !== -1;
}

function isMissingSessionExtraColumn(error) {
  const message = getErrorMessage(error);
  return error && error.code === "42703"
    || message.indexOf("attendance_status") !== -1
    || message.indexOf("homework") !== -1
    || message.indexOf("lesson_goal") !== -1
    || message.indexOf("evaluation_scores") !== -1;
}

function withoutLessonScheduleFields(row) {
  const next = Object.assign({}, row);
  delete next.lesson_day;
  delete next.lesson_time;
  return next;
}

function withoutRescheduleFields(row) {
  const next = Object.assign({}, row);
  delete next.reschedule_day;
  delete next.reschedule_time;
  return next;
}

function withoutSessionExtraFields(row) {
  const next = Object.assign({}, row);
  delete next.attendance_status;
  delete next.homework;
  delete next.lesson_goal;
  delete next.evaluation_scores;
  return next;
}

function isMissingCutiColumn(error) {
  const message = getErrorMessage(error);
  return error && error.code === "42703"
    || message.indexOf("cuti") !== -1;
}

function withoutCutiField(row) {
  const next = Object.assign({}, row);
  delete next.cuti;
  return next;
}

function buildStudentRow(profile, includeId) {
  let row = {
    name: profile.name,
    default_instrument: profile.defaultInstrument || "Gitar",
    weekly_target_seconds: profile.weeklyTarget,
  };
  if (includeId) row.id = String(profile.id);
  if (lessonScheduleColumnsAvailable) {
    row.lesson_day = profile.lessonDay || null;
    row.lesson_time = profile.lessonTime || null;
  }
  if (rescheduleColumnsAvailable) {
    row.reschedule_day = profile.rescheduleDay || null;
    row.reschedule_time = profile.rescheduleTime || null;
  }
  if (cutiColumnAvailable) {
    row.cuti = profile.cuti || false;
  }
  return row;
}

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function parseDateStr(dateStr) {
  const parts = dateStr.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(ch) {
    return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch];
  });
}

function safeFileName(value) {
  const name = String(value || "murid").trim().replace(/[^\w.-]+/g, "_");
  return name || "murid";
}

function newId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
}

function formatMin(sec, lang) {
  return Math.round(sec / 60) + " " + (lang === "en" ? "minutes" : "menit");
}

function normalizeLessonTime(value) {
  return value ? String(value).slice(0, 5) : "";
}

function formatLessonSchedule(profile, t) {
  if (!profile.lessonDay && !profile.lessonTime) return t("noLessonSchedule");
  return [profile.lessonDay, normalizeLessonTime(profile.lessonTime)].filter(Boolean).join(" · ");
}

function defaultScores() {
  return SCORE_KEYS.reduce(function(acc, key) {
    acc[key] = 3;
    return acc;
  }, {});
}

function normalizeScores(scores) {
  const source = scores && typeof scores === "object" ? scores : {};
  return SCORE_KEYS.reduce(function(acc, key) {
    const value = parseInt(source[key], 10);
    acc[key] = value >= 1 && value <= 5 ? value : 3;
    return acc;
  }, {});
}

function averageScore(scores) {
  const normalized = normalizeScores(scores);
  const total = SCORE_KEYS.reduce(function(sum, key) { return sum + normalized[key]; }, 0);
  return Math.round((total / SCORE_KEYS.length) * 10) / 10;
}

function getTodayLessonProfiles(profiles) {
  //
  const today = new Date().toLocaleDateString("id-ID", { weekday:"long" });
  const normalizedToday = today.charAt(0).toUpperCase() + today.slice(1);
  const todayDate = todayStr();
  return profiles
      .filter(function(profile) {
        const hasTodaySession = profile.sessions.some(function(s) { return s.date === todayDate; });
        return (profile.lessonDay === normalizedToday || profile.rescheduleDay === normalizedToday)
          && !profile.cuti
          && !hasTodaySession;
      })
    .sort(function(a, b) {
      const timeA = normalizeLessonTime(a.rescheduleTime || a.lessonTime);
      const timeB = normalizeLessonTime(b.rescheduleTime || b.lessonTime);
      return timeA.localeCompare(timeB);
    });
}

function getLessonGroupKey(profile) {
  const day = profile.rescheduleDay || profile.lessonDay || "";
  const time = normalizeLessonTime(profile.rescheduleTime || profile.lessonTime);
  return [day, time].join("|");
}

function getTodayLessonGroups(profiles) {
  const groups = {};
  getTodayLessonProfiles(profiles).forEach(function(profile) {
    const key = getLessonGroupKey(profile);
    if (!groups[key]) groups[key] = [];
    groups[key].push(profile);
  });
  return Object.keys(groups).map(function(key) {
    const profilesInGroup = groups[key];
    return {
      key: key,
      time: normalizeLessonTime(profilesInGroup[0].rescheduleTime || profilesInGroup[0].lessonTime),
      profiles: profilesInGroup,
    };
  }).sort(function(a, b) { return a.time.localeCompare(b.time); });
}

function getDefaultLessonMaterial(instrument) {
  const inst = instrument || "Gitar";
  return MATERI[inst] && MATERI[inst]["Teknik Dasar"] && MATERI[inst]["Teknik Dasar"][0]
    ? MATERI[inst]["Teknik Dasar"][0]
    : "Warm Up Session";
}

function getTopEntry(entries) {
  return Object.entries(entries).sort(function(a, b) { return b[1] - a[1]; })[0] || null;
}

function getReportInsights(sessions, t) {
  const byCategory = {};
  const byMaterial = {};
  const attendance = {};
  const notes = [];
  const homework = [];
  const goals = [];
  let scoreTotal = 0;
  let scoreCount = 0;

  sessions.forEach(function(session) {
    const category = getKategori(session.instrument, session.materi) || "Lainnya";
    byCategory[category] = (byCategory[category] || 0) + session.duration;
    byMaterial[session.materi || "-"] = (byMaterial[session.materi || "-"] || 0) + session.duration;
    attendance[session.attendance || "Hadir"] = (attendance[session.attendance || "Hadir"] || 0) + 1;
    if (session.notes) notes.push(session.date + " - " + session.notes);
    if (session.homework) homework.push(session.date + " - " + session.homework);
    if (session.goal) goals.push(session.date + " - " + session.goal);
    if (session.scores) {
      scoreTotal += averageScore(session.scores);
      scoreCount += 1;
    }
  });

  const topCategory = getTopEntry(byCategory);
  const topMaterial = getTopEntry(byMaterial);
  const topAttendance = getTopEntry(attendance);
  return {
    topCategory: topCategory ? topCategory[0] : "-",
    topMaterial: topMaterial ? topMaterial[0] : "-",
    topMaterialDuration: topMaterial ? topMaterial[1] : 0,
    attendanceSummary: Object.entries(attendance).map(function(entry) { return entry[0] + ": " + entry[1]; }).join(", ") || "-",
    topAttendance: topAttendance ? topAttendance[0] : "-",
    averageScore: scoreCount ? Math.round((scoreTotal / scoreCount) * 10) / 10 : "-",
    notes: notes,
    homework: homework,
    goals: goals,
    nextPlan: topMaterial ? t("continueMaterial") + ": " + topMaterial[0] : t("reviewBasics"),
  };
}

function todayStr() {
  return toDateStr(new Date());
}

function getKategori(inst, materi) {
  if (!inst || !materi) return null;
  const m = MATERI[inst];
  if (!m) return null;
  for (const kat of Object.keys(m)) {
    if (m[kat].some(function(item) { return materi === item || materi.indexOf(item + " - ") === 0; })) return kat;
  }
  return null;
}

function getWeekKey(dateStr) {
  const d = parseDateStr(dateStr);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  d.setHours(0,0,0,0);
  return toDateStr(d);
}

function getWeekLabel(mondayStr, lang) {
  const mon = parseDateStr(mondayStr);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", { day:"numeric", month:"short" });
  return fmt(mon) + " – " + fmt(sun);
}

function sessionsInWeek(sessions, mondayStr) {
  const mon = parseDateStr(mondayStr);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  sun.setHours(23,59,59);
  return sessions.filter(function(s) {
    const d = parseDateStr(s.date);
    return d >= mon && d <= sun;
  });
}

function prevWeekStr(mondayStr) {
  const d = parseDateStr(mondayStr);
  d.setDate(d.getDate() - 7);
  return toDateStr(d);
}

function getWeeksWithSessions(sessions) {
  const keys = [];
  const seen = {};
  sessions.forEach(function(s) {
    const k = getWeekKey(s.date);
    if (!seen[k]) { seen[k] = true; keys.push(k); }
  });
  return keys.sort().reverse();
}

function getMonthKey(dateStr) {
  const d = parseDateStr(dateStr);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

function getMonthLabel(monthKey, lang) {
  const parts = monthKey.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, 1).toLocaleDateString(lang === "en" ? "en-US" : "id-ID", { month:"long", year:"numeric" });
}

function sessionsInMonth(sessions, monthKey) {
  return sessions.filter(function(s) { return getMonthKey(s.date) === monthKey; });
}

function prevMonthKey(monthKey) {
  const parts = monthKey.split("-").map(Number);
  const d = new Date(parts[0], parts[1] - 2, 1);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

function getMonthsWithSessions(sessions) {
  const keys = [];
  const seen = {};
  sessions.forEach(function(s) {
    const k = getMonthKey(s.date);
    if (!seen[k]) { seen[k] = true; keys.push(k); }
  });
  return keys.sort().reverse();
}

function getDaysInMonth(monthKey) {
  const parts = monthKey.split("-").map(Number);
  return new Date(parts[0], parts[1], 0).getDate();
}

function splitMaterial(instrument, materi) {
  const category = getKategori(instrument, materi) || "Teknik Dasar";
  const items = MATERI[instrument] && MATERI[instrument][category] ? MATERI[instrument][category] : [];
  let material = materi;
  let songTitle = null;

  for (const item of items) {
    if (materi === item) {
      material = item;
      break;
    }
    if (materi.indexOf(item + " - ") === 0) {
      material = item;
      songTitle = materi.slice(item.length + 3).trim() || null;
      break;
    }
  }

  return { category: category, material: material, songTitle: songTitle };
}

function toSupabaseSession(session, studentId) {
  const materialInfo = splitMaterial(session.instrument, session.materi || "");
  const row = {
    student_id: String(studentId),
    practice_date: session.date,
    instrument: session.instrument,
    category: materialInfo.category,
    material: materialInfo.material,
    song_title: materialInfo.songTitle,
    notes: session.notes || null,
    duration_seconds: session.duration,
  };
  if (sessionExtraColumnsAvailable) {
    row.attendance_status = session.attendance || "Hadir";
    row.homework = session.homework || null;
    row.lesson_goal = session.goal || null;
    row.evaluation_scores = normalizeScores(session.scores);
  }
  if (isUuid(session.id)) row.id = session.id;
  return row;
}

function fromSupabaseSession(row) {
  return {
    id: row.id,
    date: row.practice_date,
    instrument: row.instrument,
    materi: row.category === "Repertoire" && row.song_title ? row.material + " - " + row.song_title : row.material,
    notes: row.notes || "",
    duration: row.duration_seconds,
    attendance: row.attendance_status || "Hadir",
    homework: row.homework || "",
    goal: row.lesson_goal || "",
    scores: normalizeScores(row.evaluation_scores),
  };
}

function fromSupabaseStudent(row, sessions) {
  const studentSessions = sessions.filter(function(s) { return s.student_id === row.id; }).map(fromSupabaseSession);
  return {
    id: row.id,
    name: row.name,
    defaultInstrument: row.default_instrument || (studentSessions[0] ? studentSessions[0].instrument : "Gitar"),
    lessonDay: row.lesson_day || "",
    lessonTime: normalizeLessonTime(row.lesson_time),
    rescheduleDay: row.reschedule_day || null,
    rescheduleTime: row.reschedule_time ? String(row.reschedule_time).slice(0, 5) : null,
    weeklyTarget: row.weekly_target_seconds,
    cuti: row.cuti || false,
    sessions: studentSessions,
  };
}

async function fetchSupabaseData() {
  if (!isSupabaseConfigured) return null;

  const studentsResult = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: true });
  if (studentsResult.error) throw studentsResult.error;
  if (studentsResult.data && studentsResult.data.length > 0) {
    lessonScheduleColumnsAvailable = Object.prototype.hasOwnProperty.call(studentsResult.data[0], "lesson_day")
      && Object.prototype.hasOwnProperty.call(studentsResult.data[0], "lesson_time");
    rescheduleColumnsAvailable = Object.prototype.hasOwnProperty.call(studentsResult.data[0], "reschedule_day")
      && Object.prototype.hasOwnProperty.call(studentsResult.data[0], "reschedule_time");
    cutiColumnAvailable = Object.prototype.hasOwnProperty.call(studentsResult.data[0], "cuti");
  }

  const sessionsResult = await supabase
    .from("practice_sessions")
    .select("*")
    .order("practice_date", { ascending: true })
    .order("created_at", { ascending: true });
  if (sessionsResult.error) throw sessionsResult.error;
  if (sessionsResult.data && sessionsResult.data.length > 0) {
    sessionExtraColumnsAvailable = Object.prototype.hasOwnProperty.call(sessionsResult.data[0], "attendance_status")
      && Object.prototype.hasOwnProperty.call(sessionsResult.data[0], "homework")
      && Object.prototype.hasOwnProperty.call(sessionsResult.data[0], "lesson_goal")
      && Object.prototype.hasOwnProperty.call(sessionsResult.data[0], "evaluation_scores");
  }

  return {
    profiles: studentsResult.data.map(function(student) {
      return fromSupabaseStudent(student, sessionsResult.data || []);
    }),
    activeId: null,
  };
}

async function createSupabaseStudent(profile) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const row = buildStudentRow(profile, false);

  let result = await supabase
    .from("students")
    .insert(row)
    .select("*")
    .single();
  if (result.error && isMissingLessonScheduleColumn(result.error)) {
    lessonScheduleColumnsAvailable = false;
    rescheduleColumnsAvailable = false;
    result = await supabase
      .from("students")
      .insert(withoutRescheduleFields(withoutLessonScheduleFields(row)))
      .select("*")
      .single();
  }
  if (result.error && isMissingCutiColumn(result.error)) {
    cutiColumnAvailable = false;
    result = await supabase
      .from("students")
      .insert(withoutCutiField(row))
      .select("*")
      .single();
  }
  if (result.error) throw result.error;

  return Object.assign({}, profile, { id: result.data.id });
}

async function syncSupabaseProfile(profile) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const studentRow = buildStudentRow(profile, true);
  let studentResult = await supabase
    .from("students")
    .upsert(studentRow);
  if (studentResult.error && isMissingLessonScheduleColumn(studentResult.error)) {
    lessonScheduleColumnsAvailable = false;
    rescheduleColumnsAvailable = false;
    studentResult = await supabase
      .from("students")
      .upsert(withoutRescheduleFields(withoutLessonScheduleFields(studentRow)));
  }
  if (studentResult.error && isMissingCutiColumn(studentResult.error)) {
    cutiColumnAvailable = false;
    studentResult = await supabase
      .from("students")
      .upsert(withoutCutiField(studentRow));
  }
  if (studentResult.error) throw studentResult.error;

  if (profile.sessions.length > 0) {
    let upsertResult = await supabase
      .from("practice_sessions")
      .upsert(profile.sessions.map(function(session) { return toSupabaseSession(session, profile.id); }));
    if (upsertResult.error && isMissingSessionExtraColumn(upsertResult.error)) {
      sessionExtraColumnsAvailable = false;
      upsertResult = await supabase
        .from("practice_sessions")
        .upsert(profile.sessions.map(function(session) { return withoutSessionExtraFields(toSupabaseSession(session, profile.id)); }));
    }
    if (upsertResult.error) throw upsertResult.error;
  }
}

async function deleteSupabaseStudent(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
  const result = await supabase.from("students").delete().eq("id", String(id));
  if (result.error) throw result.error;
}

async function deleteSupabaseSession(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
  if (!isUuid(id)) return;
  const result = await supabase.from("practice_sessions").delete().eq("id", String(id));
  if (result.error) throw result.error;
}

// ─── HOME ───────────────────────────────────────────────────────────────────

function ThemeSwitch({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle-btn"
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={onToggle}
    >
      {isDark ? "☾" : "☀"}
    </button>
  );
}

function FloatingControls({ theme, onToggleTheme, lang, onChangeLang }) {
  return (
    <div className="floating-controls">
      <LanguageSwitch lang={lang} onChange={onChangeLang} />
      <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
    </div>
  );
}

function LanguageSwitch({ lang, onChange }) {
  return (
    <div className="language-switch" aria-label="Language">
      {["id", "en"].map(function(code) {
        return (
          <button
            key={code}
            type="button"
            className={lang === code ? "active" : ""}
            onClick={function() { onChange(code); }}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function HomeScreen({ data, onSelect, onSelectGroup, onAdd, onDelete, onReschedule, syncStatus, theme, onToggleTheme, lang, onChangeLang, t }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newInstrument, setNewInstrument] = useState("Gitar");
  const [newLessonDay, setNewLessonDay] = useState("Senin");
  const [newLessonTime, setNewLessonTime] = useState("16:00");
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDay, setRescheduleDay] = useState("Senin");
  const [rescheduleTime, setRescheduleTime] = useState("16:00");
  const todaysLessonGroups = getTodayLessonGroups(data.profiles);

  function handleAdd() {
    if (!newName.trim()) return;
    onAdd(newName.trim(), newInstrument, newLessonDay, newLessonTime);
    setNewName("");
    setNewInstrument("Gitar");
    setNewLessonDay("Senin");
    setNewLessonTime("16:00");
    setShowAdd(false);
  }

  return (
    <div className="app-shell" style={{ fontFamily:"var(--font-sans)", maxWidth:520, margin:"0 auto", padding:"1rem" }}>
      <div className="home-hero">
        <div>
          <div className="eyebrow">
            {t("practiceStudio")}
            <span style={{ marginLeft:8, fontSize:10, fontWeight:400, color:"var(--color-text-tertiary)" }}>v{APP_VERSION}</span>
          </div>
          <h1 style={{ fontSize:26, fontWeight:700, margin:"0.2rem 0 0", color:"var(--color-text-primary)" }}>Krisna Music Course</h1>
        </div>
        <div className="home-actions">
          <div className="sync-pill">{syncStatus}</div>
        </div>
      </div>

      {data.profiles.length === 0 && !showAdd && (
        <div className="empty-state" style={{ textAlign:"center", padding:"2.5rem 1.25rem", color:"var(--color-text-tertiary)", fontSize:14 }}>
          <div className="empty-icon">♪</div>
          {t("noStudents")}
        </div>
      )}

      {data.profiles.length > 0 && (
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", marginBottom:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:600, color:"var(--color-text-primary)" }}>{t("todayAgenda")}</div>
            <span style={{ fontSize:11, color:"var(--color-text-tertiary)" }}>
              {todaysLessonGroups.length} {todaysLessonGroups.length > 1 ? "sesi" : "sesi"}
            </span>
          </div>
            {todaysLessonGroups.length === 0 ? (
              <div style={{ fontSize:12, color:"var(--color-text-tertiary)", textAlign:"center", padding:"1rem 0" }}>{t("noLessonsToday")}</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {todaysLessonGroups.map(function(group, gi) {
                  const inst = group.profiles[0].defaultInstrument || "Gitar";
                  const names = group.profiles.map(function(profile) { return profile.name; }).join(", ");
                  const isReschedule = group.profiles.some(function(p) { return p.rescheduleDay; });
                  const isCuti = group.profiles.some(function(p) { return p.cuti; });
                  const now = new Date();
                  const currentHour = String(now.getHours()).padStart(2, "0");
                  const currentMin = String(now.getMinutes()).padStart(2, "0");
                  const timeStr = group.time || "00:00";
                  const isPast = timeStr < (currentHour + ":" + currentMin);
                  return (
                    <div key={group.key}
                      style={{ display:"flex", alignItems:"stretch", gap:0, background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden" }}>
                      {/* Time column */}
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minWidth:52, padding:"8px 6px", background: isPast ? "var(--color-background-tertiary)" : "var(--color-background-info)", borderRight:"0.5px solid var(--color-border-tertiary)" }}>
                        <div style={{ fontSize:11, fontWeight:700, color: isPast ? "var(--color-text-tertiary)" : "var(--color-text-info)", letterSpacing:"0.03em" }}>{group.time}</div>
                        <div style={{ fontSize:9, color: isPast ? "var(--color-text-tertiary)" : "var(--color-text-info)", marginTop:2, opacity:0.7 }}>{isPast ? "●" : "○"}</div>
                      </div>
                      {/* Content */}
                      <div style={{ flex:1, padding:"8px 10px", cursor:"pointer" }}
                        onClick={function() { onSelectGroup(group.profiles.map(function(profile) { return profile.id; })); }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:16 }}>{INST_ICON[inst] || "🎵"}</span>
                          <span style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)" }}>{names}</span>
                          {isReschedule && (
                            <span style={{ fontSize:10, fontWeight:600, color:"var(--color-text-warning)", background:"var(--color-background-warning)", padding:"1px 6px", borderRadius:999 }}>↻</span>
                          )}
                          {isCuti && (
                            <span style={{ fontSize:10, fontWeight:600, color:"var(--color-text-danger)", background:"var(--color-background-danger)", padding:"1px 6px", borderRadius:999 }}>❌ Cuti</span>
                          )}
                        </div>
                        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:3 }}>
                          {inst} · {group.profiles.length > 1 ? group.profiles.length + " murid" : "privat"}
                        </div>
                      </div>
                      {/* Action */}
                      <div style={{ display:"flex", alignItems:"center", padding:"0 6px" }}>
                        <button onClick={function(e) { e.stopPropagation(); onSelectGroup(group.profiles.map(function(profile) { return profile.id; })); }}
                          style={{ padding:"6px 12px", fontSize:11, fontWeight:600, background: isPast ? "var(--color-background-info)" : "#1D9E75", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", cursor:"pointer", whiteSpace:"nowrap" }}>
                          {isPast ? "Isi" : "Mulai"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:"1rem" }}>
        {data.profiles.slice().sort(function(a, b) {
          if (a.cuti && !b.cuti) return 1;
          if (!a.cuti && b.cuti) return -1;
          return 0;
        }).map(function(p) {
          const total = p.sessions.reduce(function(a,s) { return a + s.duration; }, 0);
          const week = sessionsInWeek(p.sessions, getWeekKey(todayStr())).reduce(function(a,s) { return a + s.duration; }, 0);
          const defaultInst = p.defaultInstrument || (p.sessions.length ? p.sessions[p.sessions.length - 1].instrument : "Gitar");
          return (
            <div className="profile-card" key={p.id} onClick={function() { onSelect(p.id); }}
              style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"0.9rem 1rem", cursor:"pointer", display:"flex", alignItems:"center", gap:12, opacity: p.cuti ? 0.55 : 1 }}>
              <div className="instrument-avatar" style={{ width:44, height:44, borderRadius:"50%", background:"var(--color-background-secondary)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                {INST_ICON[defaultInst] || "🎵"}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:15, color:"var(--color-text-primary)", display:"flex", alignItems:"center", gap:6 }}>
                  {p.name}
                  {p.cuti && (
                    <span style={{ fontSize:10, fontWeight:600, color:"var(--color-text-danger)", background:"var(--color-background-danger)", padding:"1px 6px", borderRadius:999, whiteSpace:"nowrap" }}>Cuti</span>
                  )}
                </div>
                <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>
                  {defaultInst} · {t("lessonSchedule")}: {formatLessonSchedule(p, t)}
                </div>
                <div style={{ fontSize:12, color:"var(--color-text-tertiary)", marginTop:2 }}>
                  {t("thisWeek")}: {formatTime(week)} · {t("total")}: {formatTime(total)}
                </div>
                {p.rescheduleDay && (
                  <div style={{ fontSize:11, color:"var(--color-text-warning)", marginTop:2 }}>
                    ↻ Reschedule: {p.rescheduleDay} {normalizeLessonTime(p.rescheduleTime || "")}
                  </div>
                )}
              </div>
              <button onClick={function(e) { e.stopPropagation(); setRescheduleId(p.id); setRescheduleDay(p.rescheduleDay || p.lessonDay || "Senin"); setRescheduleTime(p.rescheduleTime || p.lessonTime || "16:00"); }}
                style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", cursor:"pointer", color:"var(--color-text-tertiary)", fontSize:13, padding:"4px 8px", flexShrink:0 }}
                title="Reschedule">↻</button>
              <button onClick={function(e) { e.stopPropagation(); onDelete(p.id); }}
                style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-text-tertiary)", fontSize:18, padding:"4px" }}>×</button>
            </div>
          );
        })}
      </div>

      {showAdd ? (
        <div className="panel" style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ fontSize:13, fontWeight:500, color:"var(--color-text-primary)" }}>{t("studentName")}</div>
          <input value={newName} onChange={function(e) { setNewName(e.target.value); }}
            onKeyDown={function(e) { if (e.key === "Enter") handleAdd(); }}
            placeholder={t("namePlaceholder")} style={{ width:"100%", boxSizing:"border-box" }} autoFocus />
          <div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("mainInstrument")}</div>
            <div style={{ display:"flex", gap:8 }}>
              {INSTRUMENTS.map(function(inst) {
                return (
                  <button key={inst} onClick={function() { setNewInstrument(inst); }}
                    style={{ flex:1, padding:"8px 0", fontSize:12, background:newInstrument===inst?"var(--color-background-primary)":"transparent", border:"0.5px solid "+(newInstrument===inst?"var(--color-border-secondary)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:"pointer", color:newInstrument===inst?"var(--color-text-primary)":"var(--color-text-secondary)", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                    <span style={{ fontSize:18 }}>{INST_ICON[inst]}</span>
                    <span>{inst}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <div>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("lessonDay")}</div>
              <select value={newLessonDay} onChange={function(e) { setNewLessonDay(e.target.value); }} style={{ width:"100%" }}>
                {LESSON_DAYS.map(function(day) {
                  return <option key={day} value={day}>{day}</option>;
                })}
              </select>
            </div>
            <div>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("lessonTime")}</div>
              <input type="time" value={newLessonTime} onChange={function(e) { setNewLessonTime(e.target.value); }} style={{ width:"100%", boxSizing:"border-box" }} />
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={handleAdd} style={{ flex:1, padding:"9px", background:"#1D9E75", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", fontSize:13, cursor:"pointer" }}>{t("add")}</button>
            <button onClick={function() { setShowAdd(false); setNewName(""); setNewInstrument("Gitar"); setNewLessonDay("Senin"); setNewLessonTime("16:00"); }}
              style={{ flex:1, padding:"9px", background:"transparent", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", fontSize:13, color:"var(--color-text-secondary)", cursor:"pointer" }}>{t("cancel")}</button>
          </div>
        </div>
      ) : (
        <button className="add-profile-button" onClick={function() { setShowAdd(true); }}
          style={{ width:"100%", padding:"11px", background:"transparent", border:"0.5px dashed var(--color-border-secondary)", borderRadius:"var(--border-radius-lg)", fontSize:13, color:"var(--color-text-secondary)", cursor:"pointer" }}>
          {t("addStudent")}
        </button>
      )}

      {rescheduleId && (function() {
        var profile = data.profiles.find(function(p) { return p.id === rescheduleId; });
        if (!profile) return null;
        return (
          <div onClick={function() { setRescheduleId(null); }}
            style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
            <div onClick={function(e) { e.stopPropagation(); }}
              style={{ background:"var(--color-background-primary)", borderRadius:"var(--border-radius-lg)", padding:"1.25rem", width:"90%", maxWidth:360, display:"flex", flexDirection:"column", gap:10, boxShadow:"var(--shadow-md)" }}>
              <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)" }}>↻ Reschedule: {profile.name}</div>
              <div style={{ fontSize:12, color:"var(--color-text-tertiary)" }}>Jadwal tetap: {profile.lessonDay || "-"} {normalizeLessonTime(profile.lessonTime)}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <div>
                  <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>Pindah hari</div>
                  <select value={rescheduleDay} onChange={function(e) { setRescheduleDay(e.target.value); }} style={{ width:"100%" }}>
                    {LESSON_DAYS.map(function(day) {
                      return <option key={day} value={day}>{day}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>Jam baru</div>
                  <input type="time" value={rescheduleTime} onChange={function(e) { setRescheduleTime(e.target.value); }} style={{ width:"100%", boxSizing:"border-box" }} />
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={function() { onReschedule(rescheduleId, rescheduleDay, rescheduleTime); setRescheduleId(null); }}
                  style={{ flex:1, padding:"9px", background:"#378ADD", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", fontSize:13, cursor:"pointer" }}>Simpan</button>
                {profile.rescheduleDay && (
                  <button onClick={function() { onReschedule(rescheduleId, null, null); setRescheduleId(null); }}
                    style={{ padding:"9px 12px", background:"transparent", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", fontSize:13, color:"var(--color-text-danger)", cursor:"pointer" }}>Hapus</button>
                )}
                <button onClick={function() { setRescheduleId(null); }}
                  style={{ padding:"9px 12px", background:"transparent", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", fontSize:13, color:"var(--color-text-secondary)", cursor:"pointer" }}>{t("cancel")}</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── TRACKER ────────────────────────────────────────────────────────────────

function TrackerScreen({ profile, updateProfile, onBack, syncStatus, theme, onToggleTheme, lang, onChangeLang, t }) {
  const [tab, setTab] = useState(0);
  const [editSchedule, setEditSchedule] = useState(false);
  const [scheduleDay, setScheduleDay] = useState(profile.lessonDay || "Senin");
  const [scheduleTime, setScheduleTime] = useState(profile.lessonTime || "16:00");
  const tabs = STRINGS[lang].tabs;

  useEffect(function() {
    setScheduleDay(profile.lessonDay || "Senin");
    setScheduleTime(profile.lessonTime || "16:00");
  }, [profile.id, profile.lessonDay, profile.lessonTime]);

  function saveSchedule() {
    updateProfile(function(p) {
      return Object.assign({}, p, { lessonDay: scheduleDay, lessonTime: scheduleTime });
    });
    setEditSchedule(false);
  }

  return (
    <div className="app-shell" style={{ fontFamily:"var(--font-sans)", maxWidth:520, margin:"0 auto", padding:"1rem" }}>
      <div className="tracker-header" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
        <button aria-label={t("back")} onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-text-secondary)", fontSize:18, padding:0 }}>←</button>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:500, fontSize:16, color:"var(--color-text-primary)" }}>{profile.name}</div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>{t("lessonSchedule")}: {formatLessonSchedule(profile, t)}</div>
          <div className="tracker-sync-status" style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:2 }}>{syncStatus}</div>
        </div>
      </div>
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8 }}>
          <div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{t("lessonSchedule")}</div>
            <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)", marginTop:2 }}>{formatLessonSchedule(profile, t)}</div>
            {profile.rescheduleDay && (
              <div style={{ fontSize:12, color:"var(--color-text-warning)", marginTop:2 }}>
                ↻ Reschedule hari ini: {profile.rescheduleDay} {normalizeLessonTime(profile.rescheduleTime)}
              </div>
            )}
          </div>
          {!editSchedule && (
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={function() { setEditSchedule(true); }} style={{ fontSize:12, color:"var(--color-text-info)", background:"none", border:"none", cursor:"pointer" }}>{t("edit")}</button>
              <button onClick={function(e) { e.stopPropagation();
                updateProfile(function(p) {
                  return Object.assign({}, p, { cuti: !p.cuti });
                });
              }}
                style={{ fontSize:12, fontWeight:600, whiteSpace:"nowrap",
                  border:"none", borderRadius:"var(--border-radius-md)", cursor:"pointer",
                  background: profile.cuti ? "var(--color-background-danger)" : "transparent",
                  color: profile.cuti ? "var(--color-text-danger)" : "var(--color-text-tertiary)" }}>
                {profile.cuti ? "✕ Aktifkan" : "❌ Cuti"}
              </button>
            </div>
          )}
        </div>
        {editSchedule && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:8, alignItems:"end", marginTop:10 }}>
            <div>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("lessonDay")}</div>
              <select value={scheduleDay} onChange={function(e) { setScheduleDay(e.target.value); }} style={{ width:"100%" }}>
                {LESSON_DAYS.map(function(day) {
                  return <option key={day} value={day}>{day}</option>;
                })}
              </select>
            </div>
            <div>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("lessonTime")}</div>
              <input type="time" value={scheduleTime} onChange={function(e) { setScheduleTime(e.target.value); }} style={{ width:"100%", boxSizing:"border-box" }} />
            </div>
            <button onClick={saveSchedule} style={{ padding:"9px 10px", background:"#1D9E75", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", fontSize:12, cursor:"pointer" }}>{t("save")}</button>
          </div>
        )}
      </div>
      <div className="tabs" style={{ display:"flex", gap:4, marginBottom:"1.25rem", background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:4 }}>
        {TABS.map(function(t, i) {
          return (
            <button key={t} onClick={function() { setTab(i); }}
              style={{ flex:1, padding:"6px 2px", fontSize:11, fontWeight:tab===i?500:400, borderRadius:"var(--border-radius-md)", border:"none", cursor:"pointer", background:tab===i?"var(--color-background-primary)":"transparent", color:tab===i?"var(--color-text-primary)":"var(--color-text-secondary)", boxShadow:tab===i?"0 0.5px 2px rgba(0,0,0,0.08)":"none" }}>
              {tabs[t]}
            </button>
          );
        })}
      </div>
      <div style={{ display:tab === 0 ? "block" : "none" }} aria-hidden={tab !== 0}>
        <TeachTab profile={profile} updateProfile={updateProfile} onSaveSession={function() {}} t={t} lang={lang} />
      </div>
      <div style={{ display:tab === 1 ? "block" : "none" }} aria-hidden={tab !== 1}>
        <ProgressTab profile={profile} lang={lang} t={t} />
      </div>
      <div style={{ display:tab === 2 ? "block" : "none" }} aria-hidden={tab !== 2}>
        <ReportTab profile={profile} lang={lang} t={t} />
      </div>
    </div>
  );
}

function GroupTrackerScreen({ profiles, updateGroupProfiles, onBack, syncStatus, theme, onToggleTheme, lang, onChangeLang, t }) {
  const groupName = profiles.map(function(profile) { return profile.name; }).join(", ");
  const firstProfile = profiles[0];
  const sameInstrument = profiles.every(function(profile) { return profile.defaultInstrument === firstProfile.defaultInstrument; });
  const groupProfile = {
    id: "group-" + profiles.map(function(profile) { return profile.id; }).join("-"),
    name: groupName,
    defaultInstrument: sameInstrument ? firstProfile.defaultInstrument : (firstProfile.defaultInstrument || "Gitar"),
    lessonDay: firstProfile.lessonDay || "",
    lessonTime: firstProfile.lessonTime || "",
    weeklyTarget: firstProfile.weeklyTarget || 300,
    sessions: [],
  };

  function updateGroupProfile(fn) {
    const nextGroupProfile = fn(groupProfile);
    const newSessions = nextGroupProfile.sessions || [];
    if (newSessions.length === 0) return;
    updateGroupProfiles(function(profile) {
      return Object.assign({}, profile, {
        sessions: profile.sessions.concat(newSessions.map(function(session) {
          return Object.assign({}, session, {
            id: newId(),
            instrument: profile.defaultInstrument || session.instrument,
          });
        })),
      });
    });
  }

  return (
    <div className="app-shell" style={{ fontFamily:"var(--font-sans)", maxWidth:520, margin:"0 auto", padding:"1rem" }}>
      <div className="tracker-header" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
        <button aria-label={t("back")} onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-text-secondary)", fontSize:18, padding:0 }}>←</button>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:500, fontSize:16, color:"var(--color-text-primary)" }}>{groupName}</div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>{t("lessonSchedule")}: {formatLessonSchedule(firstProfile, t)}</div>
          <div className="tracker-sync-status" style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:2 }}>{syncStatus}</div>
        </div>
      </div>
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem", fontSize:12, color:"var(--color-text-secondary)" }}>
        Sesi grup: hasil `Simpan Sesi` akan masuk ke {profiles.length} murid.
      </div>
      <TimerTab profile={groupProfile} updateProfile={updateGroupProfile} t={t} />
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [data, setData] = useState(defaultData);
  const [theme, setTheme] = useState(loadTheme);
  const [lang, setLang] = useState("id");
  const t = makeTranslator(lang);
  const [syncStatus, setSyncStatus] = useState(t("syncing"));

  useEffect(function() {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  useEffect(function() {
    document.documentElement.lang = lang;
    setSyncStatus(function(current) {
      if (current === STRINGS.id.synced || current === STRINGS.en.synced) return t("synced");
      if (current === STRINGS.id.syncing || current === STRINGS.en.syncing) return t("syncing");
      return current;
    });
  }, [lang]);

  useEffect(function() {
    let alive = true;

    async function loadCloudData() {
      if (!isSupabaseConfigured) {
        setSyncStatus(t("syncFailed") + "Supabase is not configured");
        return;
      }
      try {
        const cloudData = await fetchSupabaseData();
        if (!alive || !cloudData) return;

        setData(cloudData);
        setSyncStatus(t("synced"));
      } catch (error) {
        console.error(error);
        if (alive) setSyncStatus(t("syncFailed") + getErrorMessage(error));
      }
    }

    loadCloudData();
    return function() { alive = false; };
  }, []);

  const update = useCallback(function(fn) {
    setData(function(prev) {
      return fn(prev);
    });
  }, []);

  function handleSelect(id) {
    update(function(prev) { return Object.assign({}, prev, { activeId: id, activeIds: [id] }); });
  }

  function handleSelectGroup(ids) {
    const nextIds = ids && ids.length ? ids : [];
    update(function(prev) { return Object.assign({}, prev, { activeId: nextIds[0] || null, activeIds: nextIds }); });
  }

  async function handleAdd(name, defaultInstrument, lessonDay, lessonTime) {
    const baseProfile = {
      id: newId(),
      name: name,
      defaultInstrument: defaultInstrument || "Gitar",
      lessonDay: lessonDay || "",
      lessonTime: lessonTime || "",
      rescheduleDay: null,
      rescheduleTime: null,
      sessions: [],
      weeklyTarget: 300,
    };
    let profile = baseProfile;
    try {
      profile = await createSupabaseStudent(baseProfile);
      setSyncStatus(t("synced"));
    } catch (error) {
      console.error(error);
      setSyncStatus(t("syncFailed") + getErrorMessage(error));
      return;
    }
    update(function(prev) {
      return {
        profiles: prev.profiles.concat([profile]),
        activeId: profile.id,
        activeIds: [profile.id],
      };
    });
  }

  async function handleDelete(id) {
    try {
      await deleteSupabaseStudent(id);
      setSyncStatus(t("synced"));
    } catch (error) {
      console.error(error);
      setSyncStatus(t("syncFailed") + getErrorMessage(error));
      return;
    }
    update(function(prev) {
      return {
        profiles: prev.profiles.filter(function(p) { return p.id !== id; }),
        activeId: prev.activeId === id ? null : prev.activeId,
        activeIds: (prev.activeIds || []).filter(function(activeId) { return activeId !== id; }),
      };
    });
  }

  function handleReschedule(id, day, time) {
    update(function(prev) {
      return Object.assign({}, prev, {
        profiles: prev.profiles.map(function(p) {
          if (p.id !== id) return p;
          return Object.assign({}, p, { rescheduleDay: day || null, rescheduleTime: time || null });
        }),
      });
    });
    // Sync to Supabase
    var profile = data.profiles.find(function(p) { return p.id === id; });
    if (profile) {
      var updated = Object.assign({}, profile, { rescheduleDay: day || null, rescheduleTime: time || null });
      syncSupabaseProfile(updated)
        .then(function() { setSyncStatus(t("synced")); })
        .catch(function(error) {
          console.error(error);
          setSyncStatus(t("syncFailed") + getErrorMessage(error));
        });
    }
  }

  const updateProfile = useCallback(function(fn) {
    let nextProfile = null;
    update(function(prev) {
      return Object.assign({}, prev, {
        profiles: prev.profiles.map(function(p) {
          if (p.id !== prev.activeId) return p;
          nextProfile = fn(p);
          return nextProfile;
        }),
      });
    });
    if (nextProfile) {
      syncSupabaseProfile(nextProfile)
        .then(function() { setSyncStatus(t("synced")); })
        .catch(function(error) {
          console.error(error);
          setSyncStatus(t("syncFailed") + getErrorMessage(error));
        });
    }
  }, [update, lang]);

  const updateGroupProfiles = useCallback(function(fn) {
    let nextProfiles = [];
    update(function(prev) {
      const activeIds = prev.activeIds || [];
      return Object.assign({}, prev, {
        profiles: prev.profiles.map(function(p) {
          if (activeIds.indexOf(p.id) === -1) return p;
          const nextProfile = fn(p);
          nextProfiles.push(nextProfile);
          return nextProfile;
        }),
      });
    });
    nextProfiles.forEach(function(profile) {
      syncSupabaseProfile(profile)
        .then(function() { setSyncStatus(t("synced")); })
        .catch(function(error) {
          console.error(error);
          setSyncStatus(t("syncFailed") + getErrorMessage(error));
        });
    });
  }, [update, lang]);

  const activeIds = data.activeIds && data.activeIds.length ? data.activeIds : (data.activeId ? [data.activeId] : []);
  const activeProfiles = activeIds.map(function(id) {
    return data.profiles.find(function(p) { return p.id === id; });
  }).filter(Boolean);
  const activeProfile = activeProfiles[0];

  if (activeProfiles.length > 1) {
    return (
      <>
        <GroupTrackerScreen
        profiles={activeProfiles}
        updateGroupProfiles={updateGroupProfiles}
        syncStatus={syncStatus}
        theme={theme}
        onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
        lang={lang}
        onChangeLang={setLang}
        t={t}
        onBack={function() { update(function(prev) { return Object.assign({}, prev, { activeId: null, activeIds: [] }); }); }}
      />
        <FloatingControls
          theme={theme}
          onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
          lang={lang}
          onChangeLang={setLang}
        />
      </>
    );
  }

  if (activeProfile) {
    return (
      <>
        <TrackerScreen
        profile={activeProfile}
        updateProfile={updateProfile}
        syncStatus={syncStatus}
        theme={theme}
        onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
        lang={lang}
        onChangeLang={setLang}
        t={t}
        onBack={function() { update(function(prev) { return Object.assign({}, prev, { activeId: null, activeIds: [] }); }); }}
      />
        <FloatingControls
          theme={theme}
          onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
          lang={lang}
          onChangeLang={setLang}
        />
      </>
    );
  }

  return (
    <>
      <HomeScreen
      data={data}
      onSelect={handleSelect}
      onSelectGroup={handleSelectGroup}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onReschedule={handleReschedule}
      syncStatus={syncStatus}
      theme={theme}
      onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
      lang={lang}
      onChangeLang={setLang}
      t={t}
    />
      <FloatingControls
        theme={theme}
        onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
        lang={lang}
        onChangeLang={setLang}
      />
    </>
  );
}

// ─── MATERI PICKER ──────────────────────────────────────────────────────────

function MateriPicker({ instrument, value, onChange, t }) {
  const [kategori, setKategori] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const materiMap = instrument ? MATERI[instrument] : null;

  if (!materiMap) {
    return <div style={{ fontSize:12, color:"var(--color-text-tertiary)", padding:"8px 0" }}>{t("chooseInstrument")}</div>;
  }

  return (
    <div>
      <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("practiceMaterial")}</div>
      {!kategori ? (
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {Object.keys(materiMap).map(function(kat) {
            const c = KAT_COLORS[kat] || {};
            const active = materiMap[kat].some(function(item) { return value === item || value.indexOf(item + " - ") === 0; });
            return (
              <button key={kat} onClick={function() { setKategori(kat); setSongTitle(""); }}
                style={{ textAlign:"left", padding:"9px 12px", fontSize:13, background:active?c.bg:"var(--color-background-secondary)", color:active?c.text:"var(--color-text-primary)", border:"0.5px solid " + (active?"transparent":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:"pointer", display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontWeight:500 }}>{kat}</span>
                {active && <span style={{ fontSize:11 }}>✓ {value}</span>}
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <button onClick={function() { setKategori(null); }}
            style={{ fontSize:12, color:"var(--color-text-secondary)", background:"none", border:"none", cursor:"pointer", padding:"0 0 8px" }}>
            ← {kategori}
          </button>
          {kategori === "Repertoire" && (
            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:4 }}>{t("songTitle")}</div>
              <input value={songTitle} onChange={function(e) { setSongTitle(e.target.value); }}
                placeholder={t("songTitlePlaceholder")} style={{ width:"100%" }} autoFocus />
            </div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {materiMap[kategori].map(function(item) {
              const selectedMateri = kategori === "Repertoire" && songTitle.trim()
                ? item + " - " + songTitle.trim()
                : item;
              const active = value === item || value.indexOf(item + " - ") === 0;
              const disabled = kategori === "Repertoire" && !songTitle.trim();
              return (
                <button key={item} onClick={function() { if (!disabled) { onChange(selectedMateri); setKategori(null); setSongTitle(""); } }}
                  disabled={disabled}
                  style={{ textAlign:"left", padding:"8px 12px", fontSize:13, background:active?"var(--color-background-info)":"var(--color-background-secondary)", color:disabled?"var(--color-text-tertiary)":active?"var(--color-text-info)":"var(--color-text-primary)", border:"0.5px solid " + (active?"var(--color-border-info)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:disabled?"not-allowed":"pointer" }}>
                  {kategori === "Repertoire" && songTitle.trim() ? selectedMateri : item}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TEACH TAB ───────────────────────────────────────────────────────────────
//
// Teacher Mode: tap "Mulai Ngajar" when the lesson starts → tap "Selesai"
// when the lesson ends. Duration auto-calculated (60 min default if skipped).
// All data saves to the same session format for reports & progress.

function TeachTab({ profile, updateProfile, onSaveSession, t, lang }) {
  const instrument = profile.defaultInstrument || "Gitar";
  const sessions = profile.sessions || [];
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const scheduleTime = profile.rescheduleTime || profile.lessonTime || "";

  const [teaching, setTeaching] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const tickRef = useRef(null);

  const [materi, setMateri] = useState(lastSession ? lastSession.materi : getDefaultLessonMaterial(instrument));
  const [attendance, setAttendance] = useState((profile.cuti ? "Libur" : "Hadir"));
  const [notes, setNotes] = useState("");
  const [homework, setHomework] = useState("");
  const [showMateriPicker, setShowMateriPicker] = useState(false);
  const [saved, setSaved] = useState(false);
  const [carryHomework, setCarryHomework] = useState(false);

  // Carry over homework from last session
  useEffect(function() {
    if (carryHomework && lastSession && lastSession.homework) {
      setHomework(lastSession.homework + "\n(Lanjutan)");
    } else if (!carryHomework) {
      setHomework("");
    }
  }, [carryHomework]);

  // Timer tick when teaching
  useEffect(function() {
    if (teaching && startedAt) {
      tickRef.current = setInterval(function() {
        setElapsed(Math.floor((Date.now() - startedAt) / 1000));
      }, 500);
    } else {
      clearInterval(tickRef.current);
    }
    return function() { clearInterval(tickRef.current); };
  }, [teaching, startedAt]);

  function handleStart() {
    setTeaching(true);
    setStartedAt(Date.now());
    setElapsed(0);
    setSaved(false);
  }

  function handleFinish() {
    const actualDuration = elapsed > 0 ? Math.max(60, elapsed) : 3600; // min 1 min, default 60 min
    if (!materi) return;

    const newSession = {
      id: newId(),
      date: todayStr(),
      instrument: instrument,
      materi: materi,
      notes: notes.trim(),
      duration: actualDuration,
      attendance: attendance,
      homework: homework.trim(),
      scores: defaultScores(),
      startTime: scheduleTime || null,
    };

    updateProfile(function(p) {
      return Object.assign({}, p, {
        sessions: p.sessions.concat([newSession]),
        rescheduleDay: null,
        rescheduleTime: null,
      });
    });
    if (onSaveSession) onSaveSession();
    setTeaching(false);
    setSaved(true);

    setTimeout(function() {
      setSaved(false);
      setElapsed(0);
      setStartedAt(null);
      setNotes("");
      setHomework("");
      setAttendance("Hadir");
      setMateri(lastSession ? lastSession.materi : getDefaultLessonMaterial(instrument));
      setCarryHomework(false);
    }, 2000);
  }

  function handleQuickSave() {
    const newSession = {
      id: newId(),
      date: todayStr(),
      instrument: instrument,
      materi: materi || "-",
      notes: notes.trim(),
      duration: 0,
      attendance: attendance,
      homework: homework.trim(),
      scores: defaultScores(),
      startTime: scheduleTime || null,
    };

    updateProfile(function(p) {
      return Object.assign({}, p, {
        sessions: p.sessions.concat([newSession]),
        rescheduleDay: null,
        rescheduleTime: null,
      });
    });
    if (onSaveSession) onSaveSession();
    setSaved(true);

    setTimeout(function() {
      setSaved(false);
      setNotes("");
      setHomework("");
      setAttendance("Hadir");
      setMateri(lastSession ? lastSession.materi : getDefaultLessonMaterial(instrument));
      setCarryHomework(false);
    }, 2000);
  }

  const QUIK_NOTES = [
    "Postur jari masih kaku",
    "Tempo belum stabil",
    "Transisi chord masih lambat",
    "Sudah bagus, lanjut materi",
    "Perlu latihan rhythm",
    "Teknik dasar perlu diperbaiki",
  ];

  function insertQuickNote(note) {
    setNotes(function(prev) { return prev ? prev + "\n" + note : note; });
  }

  const lastSessionInfo = lastSession ? (function() {
    return {
      date: lastSession.date || "",
      materi: lastSession.materi || "-",
      notes: lastSession.notes || "",
      homework: lastSession.homework || "",
    };
  })() : null;

  // Format elapsed time as HH:MM:SS
  function fmtElapsed(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return (h > 0 ? String(h).padStart(2, "0") + ":" : "") +
      String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  if (saved) {
    return (
      <div style={{ textAlign:"center", padding:"3rem 0" }}>
        <div style={{ fontSize:48, marginBottom:"1rem" }}>✅</div>
        <div style={{ fontSize:18, fontWeight:600, color:"var(--color-text-primary)" }}>{t("lessonSaved")}</div>
        <div style={{ fontSize:13, color:"var(--color-text-tertiary)", marginTop:6 }}>
          {t("attendanceLabel")}: {attendance} · {materi}
        </div>
      </div>
    );
  }

  if (teaching) {
    // ── TEACHING IN PROGRESS ──
    return (
      <div>
        {/* Timer */}
        <div style={{ textAlign:"center", padding:"1.5rem 0", marginBottom:"1rem" }}>
          <div style={{ fontSize:48, fontWeight:500, letterSpacing:3, color:"var(--color-text-primary)", fontVariantNumeric:"tabular-nums" }}>
            {fmtElapsed(elapsed)}
          </div>
          <div style={{ fontSize:13, color:"var(--color-text-success)", fontWeight:500, marginTop:6 }}>
            ⏳ Les berjalan
            {scheduleTime && <span style={{ color:"var(--color-text-tertiary)", fontWeight:400 }}> · mulai {scheduleTime}</span>}
          </div>
        </div>

        {/* Attendance (editable during lesson) */}
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:8 }}>{t("attendanceLabel")}</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {ATTENDANCE_STATUSES.map(function(s) {
              const active = attendance === s;
              const colorMap = {
                "Hadir": { bg:"var(--color-background-success)", text:"var(--color-text-success)" },
                "Izin": { bg:"var(--color-background-warning)", text:"var(--color-text-warning)" },
                "Libur": { bg:"var(--color-background-secondary)", text:"var(--color-text-tertiary)" },
                "No-show": { bg:"var(--color-background-danger)", text:"var(--color-text-danger)" },
                "Reschedule": { bg:"var(--color-background-info)", text:"var(--color-text-info)" },
              };
              const c = colorMap[s] || colorMap["Hadir"];
              return (
                <button key={s} onClick={function() { setAttendance(s); }}
                  style={{ padding:"6px 14px", fontSize:12, fontWeight:active?600:400, borderRadius:"999px", border:"0.5px solid " + (active?c.text:"transparent"), cursor:"pointer", background:active?c.bg:"transparent", color:active?c.text:"var(--color-text-secondary)" }}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("sessionNotes")}</div>
          <textarea value={notes} onChange={function(e) { setNotes(e.target.value); }}
            placeholder={t("notesPlaceholder")}
            style={{ width:"100%", minHeight:50, boxSizing:"border-box", font:"inherit", fontSize:13, padding:"8px 10px", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-md)", background:"var(--color-background-primary)", color:"var(--color-text-primary)", resize:"vertical" }} />
          <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:6 }}>
            {QUIK_NOTES.map(function(n) {
              return (
                <button key={n} onClick={function() { insertQuickNote(n); }}
                  style={{ fontSize:11, padding:"3px 8px", borderRadius:"999px", border:"0.5px solid var(--color-border-tertiary)", cursor:"pointer", background:"var(--color-background-primary)", color:"var(--color-text-secondary)" }}>
                  + {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Finish button */}
        <button onClick={handleFinish} disabled={!materi}
          style={{ width:"100%", padding:"16px", fontSize:16, fontWeight:700, border:"none", borderRadius:"var(--border-radius-lg)", cursor:materi?"pointer":"not-allowed", background:materi?"#a33a3a":"var(--color-background-secondary)", color:"#fff", boxShadow:materi?"0 4px 16px rgba(163,58,58,0.3)":"none" }}>
          ⬛ Selesai & Simpan
        </button>
      </div>
    );
  }

  // ── PRE-LESSON FORM (before "Mulai Ngajar") ──
  return (
    <div>
      {/* Last Session Context */}
      {lastSessionInfo ? (
        <div style={{ background:"var(--color-background-info)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem", border:"0.5px solid var(--color-border-info)" }}>
          <div style={{ fontSize:11, fontWeight:600, color:"var(--color-text-info)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>
            {t("lastSession")} · {lastSessionInfo.date}
          </div>
          <div style={{ fontSize:13, color:"var(--color-text-primary)", fontWeight:500 }}>{lastSessionInfo.materi}</div>
          {lastSessionInfo.notes && (
            <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:4, whiteSpace:"pre-wrap" }}>
              📝 {lastSessionInfo.notes}
            </div>
          )}
          {lastSessionInfo.homework && (
            <div style={{ fontSize:12, color:"var(--color-text-warning)", marginTop:4 }}>
              📋 PR: {lastSessionInfo.homework}
            </div>
          )}
        </div>
      ) : (
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem", fontSize:12, color:"var(--color-text-tertiary)", textAlign:"center" }}>
          {t("noPrevSession")}
        </div>
      )}

      {/* Cuti banner */}
      {profile.cuti && (
        <div style={{ background:"var(--color-background-danger)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem", display:"flex", alignItems:"center", gap:8, fontSize:14, fontWeight:600, color:"var(--color-text-danger)" }}>
          ❌ Sedang Cuti — sesi otomatis Libur
        </div>
      )}

      {/* Schedule info */}
      {scheduleTime && (
        <div style={{ background:"var(--color-background-success)", borderRadius:"var(--border-radius-lg)", padding:"0.7rem 1rem", marginBottom:"1rem", display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--color-text-success)", fontWeight:500 }}>
          🕐 Jadwal les: {scheduleTime} · {t("sessionDuration")}: 60 {t("minute")}
        </div>
      )}

      {/* Attendance */}
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:8 }}>{t("attendanceLabel")}</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {ATTENDANCE_STATUSES.map(function(s) {
            const active = attendance === s;
            const colorMap = {
              "Hadir": { bg:"var(--color-background-success)", text:"var(--color-text-success)" },
              "Izin": { bg:"var(--color-background-warning)", text:"var(--color-text-warning)" },
              "Libur": { bg:"var(--color-background-secondary)", text:"var(--color-text-tertiary)" },
              "No-show": { bg:"var(--color-background-danger)", text:"var(--color-text-danger)" },
              "Reschedule": { bg:"var(--color-background-info)", text:"var(--color-text-info)" },
            };
            const c = colorMap[s] || colorMap["Hadir"];
            return (
              <button key={s} onClick={function() { setAttendance(s); }}
                style={{ padding:"6px 14px", fontSize:12, fontWeight:active?600:400, borderRadius:"999px", border:"0.5px solid " + (active?c.text:"transparent"), cursor:"pointer", background:active?c.bg:"transparent", color:active?c.text:"var(--color-text-secondary)" }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Material */}
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:8 }}>{t("teachMaterial")}</div>
        <button onClick={function() { setShowMateriPicker(function(v) { return !v; }); }}
          style={{ width:"100%", textAlign:"left", padding:"9px 12px", fontSize:13, background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-md)", cursor:"pointer", color:"var(--color-text-primary)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span>{materi || t("chooseMaterialToTrack")}</span>
          <span style={{ fontSize:11, color:"var(--color-text-tertiary)" }}>▼</span>
        </button>
        {showMateriPicker && (
          <div style={{ marginTop:8 }}>
            <MateriPicker instrument={instrument} value={materi} onChange={function(val) { setMateri(val); setShowMateriPicker(false); }} t={t} />
          </div>
        )}
      </div>

      {/* Notes with Quick Notes */}
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("sessionNotes")}</div>
        <textarea value={notes} onChange={function(e) { setNotes(e.target.value); }}
          placeholder={t("notesPlaceholder")}
          style={{ width:"100%", minHeight:50, boxSizing:"border-box", font:"inherit", fontSize:13, padding:"8px 10px", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-md)", background:"var(--color-background-primary)", color:"var(--color-text-primary)", resize:"vertical" }} />
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:6, marginBottom:4 }}>{t("quickNotes")}</div>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {QUIK_NOTES.map(function(n) {
            return (
              <button key={n} onClick={function() { insertQuickNote(n); }}
                style={{ fontSize:11, padding:"3px 8px", borderRadius:"999px", border:"0.5px solid var(--color-border-tertiary)", cursor:"pointer", background:"var(--color-background-primary)", color:"var(--color-text-secondary)" }}>
                + {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Homework */}
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("homework")}</div>
        {lastSession && lastSession.homework && (
          <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--color-text-warning)", marginBottom:8, cursor:"pointer" }}>
            <input type="checkbox" checked={carryHomework} onChange={function(e) { setCarryHomework(e.target.checked); }} />
            📋 {t("checkHomework")}: {lastSession.homework.slice(0, 50)}{lastSession.homework.length > 50 ? "..." : ""}
          </label>
        )}
        <textarea value={homework} onChange={function(e) { setHomework(e.target.value); }}
          placeholder={t("homeworkPlaceholder")}
          style={{ width:"100%", minHeight:50, boxSizing:"border-box", font:"inherit", fontSize:13, padding:"8px 10px", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-md)", background:"var(--color-background-primary)", color:"var(--color-text-primary)", resize:"vertical" }} />
      </div>

      {/* Quick Save for Izin/Libur — simpan langsung tanpa timer */}
      {(attendance === "Izin" || attendance === "Libur") ? (
        <button onClick={handleQuickSave}
          style={{ width:"100%", padding:"16px", fontSize:16, fontWeight:700, border:"none", borderRadius:"var(--border-radius-lg)", cursor:"pointer", background:"#9B59B6", color:"#fff", boxShadow:"0 4px 16px rgba(155,89,182,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          📝 Simpan ({attendance})
        </button>
      ) : (
        <button onClick={handleStart}
          style={{ width:"100%", padding:"16px", fontSize:16, fontWeight:700, border:"none", borderRadius:"var(--border-radius-lg)", cursor:"pointer", background:"#1D9E75", color:"#fff", boxShadow:"0 4px 16px rgba(29,158,117,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          ▶ Mulai Ngajar
          {scheduleTime && <span style={{ fontSize:12, fontWeight:400, opacity:0.85 }}>({scheduleTime} · 60 menit)</span>}
        </button>
      )}
    </div>
  );
}

// ─── TIMER TAB ───────────────────────────────────────────────────────────────

function TimerTab({ profile, updateProfile, onSaveSession, t }) {
  const instrument = profile.defaultInstrument || "Gitar";
  const defaultMateri = getDefaultLessonMaterial(instrument);
  const draftRef = useRef(null);
  const initialDraft = loadSessionDraft(profile.id);
  const initialElapsed = initialDraft
    ? (initialDraft.elapsed || 0) + (initialDraft.running ? Math.max(0, Math.floor((Date.now() - (initialDraft.savedAt || Date.now())) / 1000)) : 0)
    : 0;
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(initialElapsed);
  const [currentMateri, setCurrentMateri] = useState(initialDraft && initialDraft.currentMateri ? initialDraft.currentMateri : defaultMateri);
  const [materiStart, setMateriStart] = useState(initialDraft ? (initialDraft.materiStart || 0) : 0);
  const [segments, setSegments] = useState(initialDraft && initialDraft.segments ? initialDraft.segments : []);
  const [notes, setNotes] = useState(initialDraft ? (initialDraft.notes || "") : "");
  const [attendance, setAttendance] = useState(initialDraft ? (initialDraft.attendance || "Hadir") : "Hadir");
  const [homework, setHomework] = useState(initialDraft ? (initialDraft.homework || "") : "");
  const [goal, setGoal] = useState(initialDraft ? (initialDraft.goal || "") : "");
  const [scores, setScores] = useState(initialDraft ? normalizeScores(initialDraft.scores) : defaultScores());
  const [saved, setSaved] = useState(false);
  const [showMateriPicker, setShowMateriPicker] = useState(false);
  const tickRef = useRef(null);
  const startRef = useRef(null);

  useEffect(function() {
    const draft = loadSessionDraft(profile.id);
    draftRef.current = draft;
    if (draft) {
      const restoredElapsed = (draft.elapsed || 0) + (draft.running ? Math.max(0, Math.floor((Date.now() - (draft.savedAt || Date.now())) / 1000)) : 0);
      setRunning(draft.running !== false);
      setElapsed(restoredElapsed);
      setCurrentMateri(draft.currentMateri || defaultMateri);
      setMateriStart(draft.materiStart || 0);
      setSegments(draft.segments || []);
      setNotes(draft.notes || "");
      setAttendance(draft.attendance || "Hadir");
      setHomework(draft.homework || "");
      setGoal(draft.goal || "");
      setScores(normalizeScores(draft.scores));
    } else {
      setRunning(false);
      setElapsed(0);
      setCurrentMateri(defaultMateri);
      setMateriStart(0);
      setSegments([]);
      setNotes("");
      setAttendance("Hadir");
      setHomework("");
      setGoal("");
      setScores(defaultScores());
    }
    setSaved(false);
    setShowMateriPicker(false);
  }, [profile.id, defaultMateri]);

  useEffect(function() {
    if (running) {
      startRef.current = Date.now() - elapsed * 1000;
      tickRef.current = setInterval(function() {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }, 500);
    } else {
      clearInterval(tickRef.current);
    }
    return function() { clearInterval(tickRef.current); };
  }, [running]);

  useEffect(function() {
    if (!running && elapsed === 0 && !currentMateri && segments.length === 0 && !notes && !homework && !goal) {
      clearSessionDraft(profile.id);
      return;
    }
    saveSessionDraft(profile.id, {
      elapsed: elapsed,
      running: running,
      currentMateri: currentMateri,
      materiStart: materiStart,
      segments: segments,
      notes: notes,
      attendance: attendance,
      homework: homework,
      goal: goal,
      scores: scores,
      savedAt: Date.now(),
    });
  }, [profile.id, elapsed, running, currentMateri, materiStart, segments, notes, attendance, homework, goal, scores]);

  function handleStart() {
    setSaved(false);
    setMateriStart(elapsed);
    setRunning(true);
  }

  function handleStop() {
    setRunning(false);
    if (currentMateri && elapsed > materiStart) {
      setSegments(function(prev) {
        return prev.concat([{ materi: currentMateri, duration: elapsed - materiStart }]);
      });
      setMateriStart(elapsed);
    }
  }

  function handleGantiMateri(newMateri) {
    if (currentMateri && elapsed > materiStart) {
      setSegments(function(prev) {
        return prev.concat([{ materi: currentMateri, duration: elapsed - materiStart }]);
      });
    }
    setCurrentMateri(newMateri);
    setMateriStart(elapsed);
    setShowMateriPicker(false);
  }

  function handleReset() {
    setRunning(false); setElapsed(0); setSegments([]);
    setCurrentMateri(""); setMateriStart(0); setSaved(false); setNotes("");
    setAttendance("Hadir"); setHomework(""); setGoal(""); setScores(defaultScores());
    clearSessionDraft(profile.id);
  }

  function getSegmentsToSave() {
    const activeSegment = currentMateri && elapsed > materiStart
      ? [{ materi: currentMateri, duration: elapsed - materiStart }]
      : [];
    return segments.concat(activeSegment);
  }

  function handleSave() {
    const segmentsToSave = getSegmentsToSave();
    if (!instrument || segmentsToSave.length === 0) return;
    setRunning(false);
    const newSessions = segmentsToSave.map(function(seg, i) {
      return {
        id: newId(), date: todayStr(), instrument: instrument,
        materi: seg.materi, notes: i === 0 ? notes.trim() : "",
        duration: seg.duration,
        attendance: attendance,
        homework: i === 0 ? homework.trim() : "",
        goal: i === 0 ? goal.trim() : "",
        scores: i === 0 ? normalizeScores(scores) : normalizeScores(scores),
      };
    });
    updateProfile(function(p) {
      return Object.assign({}, p, {
        sessions: p.sessions.concat(newSessions),
        rescheduleDay: null,
        rescheduleTime: null,
      });
    });
    if (onSaveSession) onSaveSession();
    clearSessionDraft(profile.id);
    setSaved(true);
    setTimeout(handleReset, 1200);
  }

  const kat = currentMateri ? getKategori(instrument, currentMateri) : null;
  const katColor = kat ? KAT_COLORS[kat] : null;
  const canSave = instrument && getSegmentsToSave().length > 0;

  function setScore(key, value) {
    setScores(function(prev) {
      return Object.assign({}, prev, { [key]: Number(value) });
    });
  }

  return (
    <div>
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("instrument")}</div>
        <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"10px 12px", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:20 }}>{INST_ICON[instrument]}</span>
          <div>
            <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)" }}>{instrument}</div>
            <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:1 }}>{t("studentMainInstrument")}</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign:"center", margin:"1.25rem 0" }}>
        <div style={{ fontSize:52, fontWeight:500, letterSpacing:2, color:"var(--color-text-primary)", fontVariantNumeric:"tabular-nums" }}>{formatTime(elapsed)}</div>
        {currentMateri && (
          <div style={{ marginTop:8, display:"inline-block", padding:"4px 12px", borderRadius:"var(--border-radius-md)", background:katColor?katColor.bg:"var(--color-background-secondary)", color:katColor?katColor.text:"var(--color-text-secondary)", fontSize:12 }}>
            {currentMateri}
          </div>
        )}
        {!currentMateri && running && (
          <div style={{ marginTop:8, fontSize:12, color:"var(--color-text-tertiary)" }}>{t("chooseMaterialToTrack")}</div>
        )}
      </div>

      <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:"1rem" }}>
        {!running ? (
          <button onClick={handleStart} disabled={!instrument}
            style={{ padding:"10px 28px", background:instrument?"#1D9E75":"var(--color-background-secondary)", color:instrument?"#fff":"var(--color-text-tertiary)", border:"none", borderRadius:"var(--border-radius-md)", fontSize:14, cursor:instrument?"pointer":"not-allowed" }}>{t("start")}</button>
        ) : (
          <button onClick={handleStop}
            style={{ padding:"10px 28px", background:"var(--color-background-danger)", color:"var(--color-text-danger)", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", fontSize:14, cursor:"pointer" }}>{t("stop")}</button>
        )}
        {running && (
          <button onClick={function() { setShowMateriPicker(function(v) { return !v; }); }}
            style={{ padding:"10px 16px", background:"#378ADD", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", fontSize:13, cursor:"pointer", fontWeight:500 }}>
            {t("changeMaterial")}
          </button>
        )}
        <button onClick={handleReset}
          style={{ padding:"10px 16px", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", background:"transparent", color:"var(--color-text-secondary)", fontSize:13, cursor:"pointer" }}>{t("reset")}</button>
      </div>

      {showMateriPicker && running && (
        <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:12, fontWeight:500, color:"var(--color-text-primary)", marginBottom:8 }}>{t("chooseNextMaterial")}</div>
          <MateriPicker instrument={instrument} value={currentMateri} onChange={handleGantiMateri} t={t} />
        </div>
      )}

      {segments.length > 0 && (
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:12, fontWeight:500, color:"var(--color-text-secondary)", marginBottom:8 }}>{t("currentSession")}</div>
          {segments.map(function(seg, i) {
            const k = getKategori(instrument, seg.materi);
            const c = k ? KAT_COLORS[k] : null;
            return (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom: i < segments.length-1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                <div>
                  {k && <span style={{ fontSize:10, padding:"2px 6px", borderRadius:"var(--border-radius-md)", background:c.bg, color:c.text, marginRight:6 }}>{k}</span>}
                  <span style={{ fontSize:13, color:"var(--color-text-primary)" }}>{seg.materi}</span>
                </div>
                <span style={{ fontSize:13, fontWeight:500, color:"#1D9E75", flexShrink:0, marginLeft:8 }}>{formatTime(seg.duration)}</span>
              </div>
            );
          })}
          {currentMateri && running && (
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", marginTop:4, opacity:0.6 }}>
              <span style={{ fontSize:12, color:"var(--color-text-secondary)", fontStyle:"italic" }}>{currentMateri} ({t("running")})</span>
              <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{formatTime(elapsed - materiStart)}</span>
            </div>
          )}
        </div>
      )}

      {!running && segments.length === 0 && instrument && (
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", marginBottom:"1rem" }}>
          <MateriPicker instrument={instrument} value={currentMateri} onChange={function(m) { setCurrentMateri(m); }} t={t} />
        </div>
      )}

      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", display:"flex", flexDirection:"column", gap:10 }}>
        <div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("attendance")}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:5 }}>
            {ATTENDANCE_STATUSES.map(function(status) {
              return (
                <button key={status} onClick={function() { setAttendance(status); }}
                  style={{ padding:"7px 4px", fontSize:11, background:attendance===status?"var(--color-background-info)":"var(--color-background-primary)", color:attendance===status?"var(--color-text-info)":"var(--color-text-secondary)", border:"0.5px solid " + (attendance===status?"var(--color-border-info)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:"pointer" }}>
                  {status}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:4 }}>{t("sessionNotes")}</div>
          <input value={notes} onChange={function(e) { setNotes(e.target.value); }} placeholder={t("notesPlaceholder")} style={{ width:"100%", boxSizing:"border-box" }} />
        </div>
        <div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:4 }}>{t("lessonGoal")}</div>
          <input value={goal} onChange={function(e) { setGoal(e.target.value); }} placeholder={t("lessonGoalPlaceholder")} style={{ width:"100%", boxSizing:"border-box" }} />
        </div>
        <div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:4 }}>{t("homework")}</div>
          <input value={homework} onChange={function(e) { setHomework(e.target.value); }} placeholder={t("homeworkPlaceholder")} style={{ width:"100%", boxSizing:"border-box" }} />
        </div>
        <div>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("evaluation")}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {SCORE_KEYS.map(function(key) {
              return (
                <label key={key} style={{ fontSize:11, color:"var(--color-text-secondary)" }}>
                  <span style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span>{SCORE_LABELS[key]}</span><span>{scores[key]}/5</span></span>
                  <input type="range" min="1" max="5" step="1" value={scores[key]} onChange={function(e) { setScore(key, e.target.value); }} style={{ width:"100%" }} />
                </label>
              );
            })}
          </div>
        </div>
        <button onClick={handleSave} disabled={!canSave}
          style={{ padding:"10px", fontSize:13, fontWeight:500, background:canSave?"#1D9E75":"var(--color-background-secondary)", color:canSave?"#fff":"var(--color-text-tertiary)", border:"none", borderRadius:"var(--border-radius-md)", cursor:canSave?"pointer":"not-allowed" }}>
          {saved ? t("saved") : t("saveSession")}
        </button>
      </div>
    </div>
  );
}
// ─── REPORT TAB (Rangkuman) ─────────────────────────────────────────────────
//
// Compact bulanan summary. Printable full report via Cetak/PDF.

function ReportTab({ profile, lang, t }) {
  const allSessions = profile.sessions || [];
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [payments, setPayments] = useState([]);
  const [showTopup, setShowTopup] = useState(false);
  const [topupDate, setTopupDate] = useState("");
  const [topupSessions, setTopupSessions] = useState(4);
  const [topupAmount, setTopupAmount] = useState("");
  const [topupNotes, setTopupNotes] = useState("");

  // Fetch payments for this student
  useEffect(function() {
    if (!supabase || !profile.id) return;
    setPayments([]);
    supabase.from("payments").select("*").eq("student_id", profile.id).order("topup_date", { ascending: false }).then(function(res) {
      if (res.data) setPayments(res.data);
    });
  }, [profile.id]);

  // Save a top-up
  async function saveTopup() {
    if (!supabase || !profile.id || !topupSessions) return;
    var date = topupDate || new Date().toISOString().split("T")[0];
    var res = await supabase.from("payments").insert({
      student_id: profile.id,
      topup_date: date,
      sessions_count: parseInt(topupSessions),
      amount: topupAmount ? parseInt(topupAmount) : null,
      notes: topupNotes || null
    }).select();
    if (res.error) return;
    setPayments([res.data[0], ...payments]);
    setShowTopup(false);
    setTopupSessions(4);
    setTopupAmount("");
    setTopupNotes("");
  }

  // Month helpers
  const MONTHS = lang === "en"
    ? ["January","February","March","April","May","June","July","August","September","October","November","December"]
    : ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  function monthKey(dateStr) { return dateStr ? dateStr.substring(0, 7) : ""; }

  function monthLabel(yearMonth) {
    if (!yearMonth) return "";
    var parts = yearMonth.split("-");
    return MONTHS[parseInt(parts[1], 10) - 1] + " " + parts[0];
  }

  // Collect all available months from sessions (sorted) + always include current month
  var availableMonths = [];
  var seen = {};
  allSessions.slice().sort(function(a, b) { return a.date > b.date ? 1 : -1; }).forEach(function(s) {
    var mk = monthKey(s.date);
    if (mk && !seen[mk]) { seen[mk] = true; availableMonths.push(mk); }
  });
  // Always include the current month so it's navigable even with no sessions
  var currentMonth = monthKey(new Date().toISOString());
  if (currentMonth && !seen[currentMonth]) { seen[currentMonth] = true; availableMonths.push(currentMonth); }

  // Default to current month (not latest session month)
  var activeMonth = selectedMonth || currentMonth;

    // Filter sessions by selected month
    var sessions = allSessions.filter(function(s) { return monthKey(s.date) === activeMonth; });
    sessions.sort(function(a, b) { return a.date < b.date ? 1 : -1; });

    // Group sessions by unique date so multi-row dates count as 1 lesson
    var dateMap = {};
    sessions.forEach(function(s) {
      if (!dateMap[s.date]) dateMap[s.date] = { date: s.date, rows: [], attendance: s.attendance || "Hadir", duration: 0 };
      dateMap[s.date].rows.push(s);
      dateMap[s.date].duration += (s.duration || 0);
      // If any row is "Hadir", the session counts as Hadir
      if (s.attendance === "Hadir") dateMap[s.date].attendance = "Hadir";
    });
    var uniqueDates = Object.keys(dateMap).sort().reverse();

    // Stats for the month (counted by unique dates)
    var totalLessons = uniqueDates.length;
    var hadir = uniqueDates.filter(function(d) { return dateMap[d].attendance === "Hadir"; }).length;
    var izin = uniqueDates.filter(function(d) { return dateMap[d].attendance === "Izin"; }).length;
    var libur = uniqueDates.filter(function(d) { return dateMap[d].attendance === "Libur" || dateMap[d].attendance === "No-show"; }).length;
    var totalDurasi = uniqueDates.reduce(function(sum, d) { return sum + dateMap[d].duration; }, 0);

    // Materials covered (deduplicated per date)
    var materiSet = {};
    uniqueDates.forEach(function(d) {
      dateMap[d].rows.forEach(function(s) {
        if (s.materi) materiSet[s.materi] = (materiSet[s.materi] || 0) + 1;
      });
    });
    var topMaterials = Object.keys(materiSet).sort(function(a, b) { return materiSet[b] - materiSet[a]; }).slice(0, 8);

    function attendancePct(count) {

  function formatDuration(sec) {
    if (!sec || sec <= 0) return "0 menit";
    var min = Math.round(sec / 60);
    if (min < 60) return min + " menit";
    var h = Math.floor(min / 60);
    var m = min % 60;
    return h + " jam" + (m > 0 ? " " + m + " menit" : "");
  }

  // Payment balance — per selected month only
  var prepaidThisMonth = payments
    .filter(function(p) { return monthKey(p.topup_date) === activeMonth; })
    .reduce(function(s, p) { return s + parseInt(p.sessions_count); }, 0);
  var hadirThisMonth = sessions.filter(function(s) { return s.attendance === "Hadir"; }).length;
  var saldo = prepaidThisMonth - hadirThisMonth;
  if (saldo < 0) saldo = 0;
  var saldoStatus = saldo <= 0 ? "Habis" : saldo <= 2 ? "Hampir Habis" : "Tersedia";

  function formatDateShort(dateStr) {
    if (!dateStr) return "";
    var d = new Date(dateStr + "T00:00:00");
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function navigateMonth(dir) {
    var idx = availableMonths.indexOf(activeMonth);
    if (idx === -1) return;
    var newIdx = idx + dir;
    if (newIdx >= 0 && newIdx < availableMonths.length) {
      setSelectedMonth(availableMonths[newIdx]);
    }
  }

  // Format date to readable Indonesian (e.g., "Senin, 1 Juni 2026")
  function formatDateLong(dateStr) {
    if (!dateStr) return "";
    var d = new Date(dateStr + "T00:00:00");
    var hari = (lang === "en" ? ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] : ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"])[d.getDay()];
    var tgl = d.getDate();
    var bln = MONTHS[d.getMonth()];
    var thn = d.getFullYear();
    return hari + ", " + tgl + " " + bln + " " + thn;
  }

  return (
    <div>

      {/* ── Print-only full report ── */}
      <style>{`
        .print-report-page {
          font-family: Arial, Helvetica, sans-serif;
          color: #222;
          background: #fff;
          padding: 0;
          line-height: 1.5;
        }
      `}</style>

      {/* ── Screen: Rangkuman ── */}
      <div className="rangkuman-screen">

        {/* Month Picker and name inline */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:"var(--color-text-primary)" }}>{profile.name}</div>
            <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:1 }}>{profile.defaultInstrument || "-"}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <button onClick={function() { navigateMonth(-1); }}
              style={{ background:"var(--color-background-secondary)", border:"1px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-sm)", padding:"4px 10px", fontSize:14, cursor:"pointer", color:"var(--color-text-primary)", opacity: availableMonths.indexOf(activeMonth) <= 0 ? 0.3 : 1 }}
              disabled={availableMonths.indexOf(activeMonth) <= 0}>
              ◀
            </button>
            <div style={{ fontSize:14, fontWeight:600, color:"var(--color-text-primary)", minWidth:100, textAlign:"center" }}>{monthLabel(activeMonth)}</div>
            <button onClick={function() { navigateMonth(1); }}
              style={{ background:"var(--color-background-secondary)", border:"1px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-sm)", padding:"4px 10px", fontSize:14, cursor:"pointer", color:"var(--color-text-primary)", opacity: availableMonths.indexOf(activeMonth) >= availableMonths.length - 1 ? 0.3 : 1 }}>
              ▶
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginBottom:"1rem" }}>
          <div style={{ background:"var(--color-background-success)", borderRadius:"var(--border-radius-md)", padding:"10px", textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--color-text-success)" }}>Hadir</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--color-text-success)", marginTop:2 }}>{hadir}</div>
            <div style={{ fontSize:10, color:"var(--color-text-success)", opacity:0.7 }}>{attendancePct(hadir)}%</div>
          </div>
          <div style={{ background:"var(--color-background-warning)", borderRadius:"var(--border-radius-md)", padding:"10px", textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--color-text-warning)" }}>Izin</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--color-text-warning)", marginTop:2 }}>{izin}</div>
            <div style={{ fontSize:10, color:"var(--color-text-warning)", opacity:0.7 }}>{attendancePct(izin)}%</div>
          </div>
          <div style={{ background:"var(--color-background-danger)", borderRadius:"var(--border-radius-md)", padding:"10px", textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--color-text-danger)" }}>Libur</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--color-text-danger)", marginTop:2 }}>{libur}</div>
            <div style={{ fontSize:10, color:"var(--color-text-danger)", opacity:0.7 }}>{attendancePct(libur)}%</div>
          </div>
          <div style={{ background:"var(--color-background-info)", borderRadius:"var(--border-radius-md)", padding:"10px", textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--color-text-info)" }}>Total</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--color-text-info)", marginTop:2 }}>{totalLessons}</div>
            <div style={{ fontSize:10, color:"var(--color-text-info)", opacity:0.7 }}>les</div>
          </div>
        </div>

        {/* Duration */}
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"0.75rem 1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:1 }}>Total Durasi</div>
          <div style={{ fontSize:16, fontWeight:600, color:"var(--color-text-primary)" }}>{formatDuration(totalDurasi)}</div>
        </div>

        {/* Materials */}
        {topMaterials.length > 0 && (
          <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.75rem 1rem", marginBottom:"1rem" }}>
            <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:8 }}>Materi yang Diajarkan</div>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {topMaterials.map(function(m) {
                return (
                  <span key={m} style={{ fontSize:11, padding:"3px 8px", borderRadius:"999px", background:"var(--color-background-info)", color:"var(--color-text-info)", fontWeight:500 }}>
                    {m} <span style={{ opacity:0.6 }}>×{materiSet[m]}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Payment Section ── */}
        <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.75rem 1rem", marginBottom:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)" }}>💰 Saldo & Pembayaran</div>
            <div style={{ fontSize:11, padding:"2px 10px", borderRadius:999, background: saldo <= 0 ? "var(--color-background-danger)" : "var(--color-background-success)", color: saldo <= 0 ? "var(--color-text-danger)" : "var(--color-text-success)", fontWeight:600 }}>
              {saldoStatus}
            </div>
          </div>

          {/* Balance row */}
          <div style={{ display:"flex", gap:12, marginBottom:8 }}>
            <div style={{ flex:1, textAlign:"center", padding:"8px", background:"var(--color-background-info)", borderRadius:"var(--border-radius-md)" }}>
              <div style={{ fontSize:10, color:"var(--color-text-info)" }}>Saldo</div>
              <div style={{ fontSize:20, fontWeight:700, color:"var(--color-text-info)" }}>{saldo}</div>
              <div style={{ fontSize:9, color:"var(--color-text-info)", opacity:0.7 }}>sesi</div>
            </div>
            <div style={{ flex:1, textAlign:"center", padding:"8px", background:"var(--color-background-success)", borderRadius:"var(--border-radius-md)" }}>
              <div style={{ fontSize:10, color:"var(--color-text-success)" }}>Top-Up</div>
              <div style={{ fontSize:20, fontWeight:700, color:"var(--color-text-success)" }}>{prepaidThisMonth}</div>
              <div style={{ fontSize:9, color:"var(--color-text-success)", opacity:0.7 }}>sesi</div>
            </div>
            <div style={{ flex:1, textAlign:"center", padding:"8px", background:"var(--color-background-warning)", borderRadius:"var(--border-radius-md)" }}>
              <div style={{ fontSize:10, color:"var(--color-text-warning)" }}>Terpakai</div>
              <div style={{ fontSize:20, fontWeight:700, color:"var(--color-text-warning)" }}>{hadirThisMonth}</div>
              <div style={{ fontSize:9, color:"var(--color-text-warning)", opacity:0.7 }}>sesi</div>
            </div>
          </div>

          {/* Per-month status */}
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:8 }}>
            Bulan ini: <strong>{hadir}</strong> Hadir · <strong>{izin}</strong> Izin
            {prepaidThisMonth > 0 && (
              <span> · Dibayar <strong>{payments.length > 0 ? Math.min(hadir, prepaidThisMonth) : 0}</strong> dari <strong>{hadir}</strong> sesi</span>
            )}
          </div>

          {/* Top-up form (inline toggle) */}
          {showTopup ? (
            <div style={{ background:"var(--color-background-primary)", borderRadius:"var(--border-radius-md)", padding:"10px", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"var(--color-text-primary)", marginBottom:6 }}>Catat Top-Up Baru</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <div style={{ display:"flex", gap:6 }}>
                  <input type="date" value={topupDate} onChange={function(e) { setTopupDate(e.target.value); }}
                    style={{ flex:1, padding:"6px 8px", fontSize:12, borderRadius:"var(--border-radius-sm)", border:"1px solid var(--color-border-tertiary)", background:"var(--color-background-primary)", color:"var(--color-text-primary)" }} />
                  <input type="number" value={topupSessions} onChange={function(e) { setTopupSessions(e.target.value); }}
                    placeholder="Jumlah sesi" min="1" max="50"
                    style={{ width:70, padding:"6px 8px", fontSize:12, borderRadius:"var(--border-radius-sm)", border:"1px solid var(--color-border-tertiary)", background:"var(--color-background-primary)", color:"var(--color-text-primary)" }} />
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <input type="number" value={topupAmount} onChange={function(e) { setTopupAmount(e.target.value); }}
                    placeholder="Nominal (opsional)" min="0"
                    style={{ flex:1, padding:"6px 8px", fontSize:12, borderRadius:"var(--border-radius-sm)", border:"1px solid var(--color-border-tertiary)", background:"var(--color-background-primary)", color:"var(--color-text-primary)" }} />
                  <input type="text" value={topupNotes} onChange={function(e) { setTopupNotes(e.target.value); }}
                    placeholder="Catatan (opsional)"
                    style={{ flex:1, padding:"6px 8px", fontSize:12, borderRadius:"var(--border-radius-sm)", border:"1px solid var(--color-border-tertiary)", background:"var(--color-background-primary)", color:"var(--color-text-primary)" }} />
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={saveTopup}
                    style={{ flex:1, padding:"7px", fontSize:12, fontWeight:600, background:"var(--color-text-info)", color:"#fff", border:"none", borderRadius:"var(--border-radius-sm)", cursor:"pointer" }}>
                    💾 Simpan
                  </button>
                  <button onClick={function() { setShowTopup(false); }}
                    style={{ padding:"7px 14px", fontSize:12, background:"var(--color-background-secondary)", color:"var(--color-text-secondary)", border:"1px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-sm)", cursor:"pointer" }}>
                    Batal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={function() { setShowTopup(true); }}
              style={{ width:"100%", padding:"8px", fontSize:12, fontWeight:600, background:"var(--color-background-primary)", color:"var(--color-text-info)", border:"1px dashed var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", cursor:"pointer" }}>
              + Catat Top-Up
            </button>
          )}

          {/* Top-up history */}
          {payments.length > 0 && (
            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:10, color:"var(--color-text-tertiary)", marginBottom:4 }}>Riwayat Top-Up</div>
              {payments.slice(0, 5).map(function(p) {
                return (
                  <div key={p.id} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"4px 0", borderBottom:"1px solid var(--color-border-tertiary)" }}>
                    <span style={{ color:"var(--color-text-secondary)" }}>{formatDateShort(p.topup_date)}</span>
                    <span style={{ fontWeight:600, color:"var(--color-text-success)" }}>+{p.sessions_count} sesi{p.amount ? " · Rp" + p.amount.toLocaleString("id-ID") : ""}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PDF Download button */}
        <button onClick={async function() {
          import('jspdf').then(function(jspdfModule) {
            var jsPDF = jspdfModule.default;
            var doc = new jsPDF('p', 'mm', 'a4');
            var pageW = 210;
            var margin = 20;
            var contentW = pageW - margin * 2;
            var y = margin;
            var lineH = 5;
            var pageH = 297;

            function addPage() {
              doc.addPage();
              y = margin;
            }

            function checkPage(h) {
              if (y + h > pageH - margin) { addPage(); return true; }
              return false;
            }

            // ── HEADER ──
            doc.setFontSize(18);
            doc.setTextColor(29, 158, 117);
            doc.text('KRISNA MUSIC COURSE', pageW / 2, y, { align: 'center' });
            y += 7;
            doc.setFontSize(10);
            doc.setTextColor(136, 136, 136);
            doc.text('Laporan Bulanan', pageW / 2, y, { align: 'center' });
            y += 3;
            doc.setDrawColor(29, 158, 117);
            doc.setLineWidth(1);
            doc.line(margin, y, pageW - margin, y);
            y += 8;

            // ── STUDENT INFO ──
            doc.setFontSize(14);
            doc.setTextColor(34, 34, 34);
            doc.setFont(undefined, 'bold');
            doc.text(profile.name, margin, y);
            doc.setFont(undefined, 'normal');
            y += 6;
            doc.setFontSize(10);
            doc.setTextColor(102, 102, 102);
            doc.text((profile.defaultInstrument || '-') + ' | Jadwal: ' + formatLessonSchedule(profile, t), margin, y);
            y += 6;
            doc.setTextColor(29, 158, 117);
            doc.setFont(undefined, 'bold');
            doc.text(monthLabel(activeMonth), margin, y);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(136, 136, 136);
            doc.text('Dicetak: ' + formatDateLong(new Date().toISOString().split('T')[0]), pageW - margin, y, { align: 'right' });
            y += 4;
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, y, pageW - margin, y);
            y += 8;

            // ── STATS GRID ──
            checkPage(30);
            var stats = [
              { label: 'HADIR', value: String(hadir), pct: attendancePct(hadir) + '%', color: [29, 158, 117] },
              { label: 'IZIN', value: String(izin), pct: attendancePct(izin) + '%', color: [186, 117, 23] },
              { label: 'LIBUR', value: String(libur), pct: attendancePct(libur) + '%', color: [204, 51, 51] },
              { label: 'TOTAL', value: String(totalLessons), pct: 'pertemuan', color: [34, 34, 34] },
            ];
            var cellW = contentW / 4;
            stats.forEach(function(s, i) {
              var cx = margin + cellW * i + cellW / 2;
              doc.setTextColor(136, 136, 136);
              doc.setFontSize(8);
              doc.text(s.label, cx, y, { align: 'center' });
              doc.setTextColor(s.color[0], s.color[1], s.color[2]);
              doc.setFontSize(20);
              doc.setFont(undefined, 'bold');
              doc.text(s.value, cx, y + 11, { align: 'center' });
              doc.setFont(undefined, 'normal');
              doc.setFontSize(9);
              doc.setTextColor(s.color[0], s.color[1], s.color[2]);
              doc.text(s.pct, cx, y + 18, { align: 'center' });
            });
            y += 26;
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, pageW - margin, y);
            y += 6;

            // ── DETAIL TABLE ──
            checkPage(40);
            var details = [
              ['Total Durasi', formatDuration(totalDurasi)],
              ['Rata-rata per sesi', totalLessons > 0 ? formatDuration(totalDurasi / totalLessons) : '0 menit'],
              ['Top-Up bulan ini', prepaidThisMonth + ' sesi'],
              ['Terpakai', hadirThisMonth + ' sesi'],
              ['Sisa Saldo', saldo + ' sesi  (' + saldoStatus + ')'],
            ];
            doc.setFontSize(10);
            details.forEach(function(row, i) {
              var labelColor = i === 4 ? (saldo <= 0 ? [204, 51, 51] : [29, 158, 117]) : [102, 102, 102];
              var valColor = i === 4 ? (saldo <= 0 ? [204, 51, 51] : [29, 158, 117]) : [34, 34, 34];
              doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
              doc.text(row[0], margin + 4, y);
              doc.setFont(undefined, 'bold');
              doc.setTextColor(valColor[0], valColor[1], valColor[2]);
              doc.text(row[1], pageW - margin - 4, y, { align: 'right' });
              doc.setFont(undefined, 'normal');
              y += 6;
            });
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, pageW - margin, y);
            y += 6;

            // ── MATERIALS ──
            if (topMaterials.length > 0) {
              checkPage(topMaterials.length * 5 + 20);
              doc.setFontSize(11);
              doc.setTextColor(34, 34, 34);
              doc.setFont(undefined, 'bold');
              doc.text('Materi yang Diajarkan', margin, y);
              doc.setFont(undefined, 'normal');
              y += 7;
              doc.setFillColor(245, 245, 245);
              doc.rect(margin, y - 4, contentW, 5, 'F');
              doc.setFontSize(9);
              doc.setTextColor(102, 102, 102);
              doc.text('Materi', margin + 4, y);
              doc.text('Jumlah', pageW - margin - 4, y, { align: 'right' });
              y += 5;
              topMaterials.forEach(function(m) {
                checkPage(6);
                doc.setFontSize(9);
                doc.setTextColor(34, 34, 34);
                doc.text(m, margin + 4, y);
                doc.setTextColor(29, 158, 117);
                doc.setFont(undefined, 'bold');
                doc.text('\u00D7' + materiSet[m], pageW - margin - 4, y, { align: 'right' });
                doc.setFont(undefined, 'normal');
                y += 5;
              });
              y += 4;
              doc.setDrawColor(200, 200, 200);
              doc.line(margin, y, pageW - margin, y);
              y += 6;
            }

            // ── SESSION HISTORY ──
            if (sessions.length > 0) {
              checkPage(sessions.length * 10 + 15);
              doc.setFontSize(11);
              doc.setTextColor(34, 34, 34);
              doc.setFont(undefined, 'bold');
              doc.text('Riwayat Pertemuan', margin, y);
              doc.setFont(undefined, 'normal');
              y += 7;
              sessions.forEach(function(s) {
                checkPage(12);
                var attColor = s.attendance === 'Hadir' ? [29, 158, 117] : s.attendance === 'Izin' ? [186, 117, 23] : [204, 51, 51];
                doc.setFontSize(9);
                doc.setTextColor(34, 34, 34);
                doc.setFont(undefined, 'bold');
                doc.text(formatDateLong(s.date), margin + 2, y);
                doc.setTextColor(attColor[0], attColor[1], attColor[2]);
                doc.text(s.attendance || 'Hadir', pageW - margin - 2, y, { align: 'right' });
                doc.setFont(undefined, 'normal');
                y += 5;
                doc.setFontSize(8);
                doc.setTextColor(102, 102, 102);
                doc.text((s.materi || '-') + ' · ' + formatDuration(s.duration), margin + 4, y);
                y += 4;
                if (s.notes) {
                  checkPage(5);
                  doc.setTextColor(136, 136, 136);
                  doc.setFont(undefined, 'italic');
                  doc.text('Catatan: ' + s.notes, margin + 6, y);
                  doc.setFont(undefined, 'normal');
                  y += 4;
                }
                if (s.homework) {
                  checkPage(5);
                  doc.setTextColor(186, 117, 23);
                  doc.text('PR: ' + s.homework, margin + 6, y);
                  y += 4;
                }
                doc.setDrawColor(220, 220, 220);
                doc.setLineWidth(0.2);
                doc.line(margin + 2, y, pageW - margin - 2, y);
                y += 3;
              });
            }

            // ── FOOTER ──
            checkPage(15);
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, pageW - margin, y);
            y += 5;
            doc.setFontSize(8);
            doc.setTextColor(170, 170, 170);
            doc.text('Krisna Music Course  ·  Laporan dibuat otomatis  ·  ' + monthLabel(activeMonth), pageW / 2, y, { align: 'center' });

            // Save
            var fileName = 'Laporan_' + safeFileName(profile.name) + '_' + activeMonth + '.pdf';
            doc.save(fileName);
          }).catch(function(err) {
            alert('Gagal generate PDF: ' + err.message);
            console.error(err);
          });
        }}
          style={{ width:"100%", padding:"11px", background:"var(--color-background-secondary)", color:"var(--color-text-primary)", border:"1px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", fontSize:13, fontWeight:600, cursor:"pointer" }}>
          📄 Download PDF Laporan
        </button>
      </div>

      {/* ── PDF content (hidden, rendered by html2pdf) ── */}
      <div id="pdf-report-content" style={{ display:"none" }}>
        <div className="print-report-page">
          {/* Header */}
          <div style={{ textAlign:"center", padding:"32px 32px 20px", borderBottom:"3px solid #1D9E75" }}>
            <div style={{ fontSize:22, fontWeight:700, color:"#1D9E75", letterSpacing:"0.02em" }}>🎵 KRISNA MUSIC COURSE</div>
            <div style={{ fontSize:11, color:"#888", marginTop:4 }}>Laporan Bulanan</div>
          </div>

          {/* Student info */}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"20px 32px", borderBottom:"1px solid #eee" }}>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#222" }}>{profile.name}</div>
              <div style={{ fontSize:12, color:"#666" }}>{profile.defaultInstrument || "-"}</div>
              <div style={{ fontSize:12, color:"#666" }}>Jadwal: {formatLessonSchedule(profile, t)}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#1D9E75" }}>{monthLabel(activeMonth)}</div>
              <div style={{ fontSize:11, color:"#888" }}>Dicetak: {formatDateLong(new Date().toISOString().split("T")[0])}</div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display:"flex", gap:0, padding:"20px 32px", borderBottom:"1px solid #eee" }}>
            <div style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:10, color:"#888" }}>HADIR</div>
              <div style={{ fontSize:24, fontWeight:700, color:"#1D9E75" }}>{hadir}</div>
              <div style={{ fontSize:11, color:"#1D9E75" }}>{attendancePct(hadir)}%</div>
            </div>
            <div style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:10, color:"#888" }}>IZIN</div>
              <div style={{ fontSize:24, fontWeight:700, color:"#BA7517" }}>{izin}</div>
              <div style={{ fontSize:11, color:"#BA7517" }}>{attendancePct(izin)}%</div>
            </div>
            <div style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:10, color:"#888" }}>LIBUR</div>
              <div style={{ fontSize:24, fontWeight:700, color:"#CC3333" }}>{libur}</div>
              <div style={{ fontSize:11, color:"#CC3333" }}>{attendancePct(libur)}%</div>
            </div>
            <div style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:10, color:"#888" }}>TOTAL LES</div>
              <div style={{ fontSize:24, fontWeight:700, color:"#222" }}>{totalLessons}</div>
              <div style={{ fontSize:11, color:"#888" }}>pertemuan</div>
            </div>
          </div>

          {/* Duration + Payment */}
          <div style={{ padding:"16px 32px", borderBottom:"1px solid #eee" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <tbody>
                <tr>
                  <td style={{ padding:"5px 8px", color:"#666", width:140 }}>Total Durasi</td>
                  <td style={{ padding:"5px 8px", fontWeight:600, color:"#222" }}>{formatDuration(totalDurasi)}</td>
                </tr>
                <tr>
                  <td style={{ padding:"5px 8px", color:"#666" }}>Rata-rata per sesi</td>
                  <td style={{ padding:"5px 8px", fontWeight:600, color:"#222" }}>{totalLessons > 0 ? formatDuration(totalDurasi / totalLessons) : "0 menit"}</td>
                </tr>
                <tr>
                  <td style={{ padding:"5px 8px", color:"#666" }}>Top-Up bulan ini</td>
                  <td style={{ padding:"5px 8px", fontWeight:600, color:"#222" }}>{prepaidThisMonth} sesi</td>
                </tr>
                <tr>
                  <td style={{ padding:"5px 8px", color:"#666" }}>Terpakai</td>
                  <td style={{ padding:"5px 8px", fontWeight:600, color:"#222" }}>{hadirThisMonth} sesi</td>
                </tr>
                <tr>
                  <td style={{ padding:"5px 8px", color:"#666" }}>Sisa Saldo</td>
                  <td style={{ padding:"5px 8px", fontWeight:600, color: saldo <= 0 ? "#CC3333" : "#1D9E75" }}>{saldo} sesi ({saldoStatus})</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Materials */}
          {topMaterials.length > 0 && (
            <div style={{ padding:"16px 32px", borderBottom:"1px solid #eee" }}>
              <div style={{ fontSize:12, fontWeight:600, color:"#222", marginBottom:8 }}>📚 Materi yang Diajarkan</div>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                <thead>
                  <tr style={{ background:"#f5f5f5" }}>
                    <th style={{ padding:"5px 8px", textAlign:"left", color:"#666", fontWeight:600 }}>Materi</th>
                    <th style={{ padding:"5px 8px", textAlign:"right", color:"#666", fontWeight:600, width:60 }}>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {topMaterials.map(function(m, i) {
                    return (
                      <tr key={m} style={{ borderBottom:"1px solid #f0f0f0" }}>
                        <td style={{ padding:"4px 8px", color:"#222" }}>{m}</td>
                        <td style={{ padding:"4px 8px", textAlign:"right", color:"#1D9E75", fontWeight:600 }}>×{materiSet[m]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Sessions log */}
          {sessions.length > 0 && (
            <div style={{ padding:"16px 32px 32px" }}>
              <div style={{ fontSize:12, fontWeight:600, color:"#222", marginBottom:8 }}>📋 Riwayat Pertemuan</div>
              {sessions.map(function(s, i) {
                var attColor = s.attendance === "Hadir" ? "#1D9E75" : s.attendance === "Izin" ? "#BA7517" : s.attendance === "No-show" ? "#CC3333" : "#888";
                return (
                  <div key={s.id || i} style={{ borderBottom:"1px dashed #e0e0e0", padding:"7px 0" }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:11, fontWeight:600, color:"#222" }}>{formatDateLong(s.date)}</span>
                      <span style={{ fontSize:11, color:attColor, fontWeight:600 }}>{s.attendance || "Hadir"}</span>
                    </div>
                    <div style={{ fontSize:10, color:"#666", marginTop:2 }}>
                      {(s.materi || "-")} · {formatDuration(s.duration)}
                    </div>
                    {s.notes && <div style={{ fontSize:10, color:"#888", marginTop:1, fontStyle:"italic" }}>📝 {s.notes}</div>}
                    {s.homework && <div style={{ fontSize:10, color:"#BA7517", marginTop:1 }}>📋 PR: {s.homework}</div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign:"center", padding:"12px 32px", borderTop:"1px solid #ddd", fontSize:10, color:"#aaa" }}>
            Krisna Music Course · Laporan dibuat otomatis · {monthLabel(activeMonth)}
          </div>
        </div>
      </div>

    </div>
  );
}
