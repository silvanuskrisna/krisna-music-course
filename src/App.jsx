import { useState, useEffect, useRef, useCallback } from "react";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const THEME_KEY = "mpt_theme";
const DRAFT_PREFIX = "mpt_draft_";
const INSTRUMENTS = ["Gitar", "Piano", "Drum"];
const INST_ICON = { Gitar: "🎸", Piano: "🎹", Drum: "🥁" };
const LESSON_DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const ATTENDANCE_STATUSES = ["Hadir", "Izin", "Libur", "No-show", "Reschedule"];
const SCORE_KEYS = ["timing", "technique", "reading", "expression"];
const SCORE_LABELS = {
  timing: "Timing",
  technique: "Technique",
  reading: "Reading",
  expression: "Expression",
};
let lessonScheduleColumnsAvailable = true;
let sessionExtraColumnsAvailable = true;

const MATERI = {
  Gitar: {
    "Teknik Dasar": ["Warm Up Session","Chord open","Chord barre","Scale pentatonik","Scale mayor/minor","Fingerpicking","Alternate picking","Legato & bending","Sweep picking"],
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

const APP_VERSION = "1.0.0";

const KAT_COLORS = {
  "Teknik Dasar": { bg:"var(--color-background-info)", text:"var(--color-text-info)", bar:"#378ADD" },
  "Repertoire":   { bg:"var(--color-background-success)", text:"var(--color-text-success)", bar:"#1D9E75" },
  "Teori":        { bg:"var(--color-background-warning)", text:"var(--color-text-warning)", bar:"#BA7517" },
};

const TABS = ["practice","metronome","log","progress","report"];

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
    tabs: { practice:"Latihan", metronome:"Metronome", log:"Log", progress:"Progress", report:"Report" },
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
    tabs: { practice:"Practice", metronome:"Metronome", log:"Log", progress:"Progress", report:"Report" },
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

function withoutSessionExtraFields(row) {
  const next = Object.assign({}, row);
  delete next.attendance_status;
  delete next.homework;
  delete next.lesson_goal;
  delete next.evaluation_scores;
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
  const today = new Date().toLocaleDateString("id-ID", { weekday:"long" });
  const normalizedToday = today.charAt(0).toUpperCase() + today.slice(1);
  return profiles
    .filter(function(profile) { return profile.lessonDay === normalizedToday; })
    .sort(function(a, b) { return normalizeLessonTime(a.lessonTime).localeCompare(normalizeLessonTime(b.lessonTime)); });
}

function getLessonGroupKey(profile) {
  return [profile.lessonDay || "", normalizeLessonTime(profile.lessonTime)].join("|");
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
      time: normalizeLessonTime(profilesInGroup[0].lessonTime),
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
    weeklyTarget: row.weekly_target_seconds,
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
    result = await supabase
      .from("students")
      .insert(withoutLessonScheduleFields(row))
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
    studentResult = await supabase
      .from("students")
      .upsert(withoutLessonScheduleFields(studentRow));
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
      className="theme-switch"
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={onToggle}
    >
      <span className="theme-switch-icon">{isDark ? "☾" : "☀"}</span>
      <span className="theme-switch-track">
        <span className="theme-switch-thumb" />
      </span>
    </button>
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

function HomeScreen({ data, onSelect, onSelectGroup, onAdd, onDelete, syncStatus, theme, onToggleTheme, lang, onChangeLang, t }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newInstrument, setNewInstrument] = useState("Gitar");
  const [newLessonDay, setNewLessonDay] = useState("Senin");
  const [newLessonTime, setNewLessonTime] = useState("16:00");
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
          <LanguageSwitch lang={lang} onChange={onChangeLang} />
          <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
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
          <div style={{ fontSize:13, fontWeight:600, color:"var(--color-text-primary)", marginBottom:8 }}>{t("todayAgenda")}</div>
	          {todaysLessonGroups.length === 0 ? (
	            <div style={{ fontSize:12, color:"var(--color-text-tertiary)" }}>{t("noLessonsToday")}</div>
	          ) : (
	            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
	              {todaysLessonGroups.map(function(group) {
	                const inst = group.profiles[0].defaultInstrument || "Gitar";
	                const names = group.profiles.map(function(profile) { return profile.name; }).join(", ");
	                return (
	                  <button key={group.key} onClick={function() { onSelectGroup(group.profiles.map(function(profile) { return profile.id; })); }}
	                    style={{ display:"flex", alignItems:"center", gap:8, textAlign:"left", padding:"8px 10px", background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", cursor:"pointer", color:"var(--color-text-primary)" }}>
	                    <span>{INST_ICON[inst] || "🎵"}</span>
	                    <span style={{ flex:1, fontSize:13 }}>{names}</span>
	                    <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{group.time}</span>
	                  </button>
	                );
	              })}
            </div>
          )}
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:"1rem" }}>
        {data.profiles.map(function(p) {
          const total = p.sessions.reduce(function(a,s) { return a + s.duration; }, 0);
          const week = sessionsInWeek(p.sessions, getWeekKey(todayStr())).reduce(function(a,s) { return a + s.duration; }, 0);
          const defaultInst = p.defaultInstrument || (p.sessions.length ? p.sessions[p.sessions.length - 1].instrument : "Gitar");
          return (
            <div className="profile-card" key={p.id} onClick={function() { onSelect(p.id); }}
              style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"0.9rem 1rem", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
              <div className="instrument-avatar" style={{ width:44, height:44, borderRadius:"50%", background:"var(--color-background-secondary)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                {INST_ICON[defaultInst] || "🎵"}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:15, color:"var(--color-text-primary)" }}>{p.name}</div>
                <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>
                  {defaultInst} · {t("lessonSchedule")}: {formatLessonSchedule(p, t)}
                </div>
                <div style={{ fontSize:12, color:"var(--color-text-tertiary)", marginTop:2 }}>
                  {t("thisWeek")}: {formatTime(week)} · {t("total")}: {formatTime(total)}
                </div>
              </div>
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
    </div>
  );
}

// ─── TRACKER ────────────────────────────────────────────────────────────────

function TrackerScreen({ profile, updateProfile, onBack, syncStatus, theme, onToggleTheme, lang, onChangeLang, t }) {
  const [tab, setTab] = useState(0);
  const [metronomeRunning, setMetronomeRunning] = useState(false);
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
        <LanguageSwitch lang={lang} onChange={onChangeLang} />
        <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
      </div>
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem", marginBottom:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8 }}>
          <div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{t("lessonSchedule")}</div>
            <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)", marginTop:2 }}>{formatLessonSchedule(profile, t)}</div>
          </div>
          {!editSchedule && (
            <button onClick={function() { setEditSchedule(true); }} style={{ fontSize:12, color:"var(--color-text-info)", background:"none", border:"none", cursor:"pointer" }}>{t("edit")}</button>
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
        <TimerTab profile={profile} updateProfile={updateProfile} onSaveSession={function() { setMetronomeRunning(false); }} t={t} />
      </div>
      <div style={{ display:tab === 1 ? "block" : "none" }} aria-hidden={tab !== 1}>
        <MetronomeTab running={metronomeRunning} setRunning={setMetronomeRunning} t={t} />
      </div>
      <div style={{ display:tab === 2 ? "block" : "none" }} aria-hidden={tab !== 2}>
        <LogTab profile={profile} updateProfile={updateProfile} t={t} />
      </div>
      <div style={{ display:tab === 3 ? "block" : "none" }} aria-hidden={tab !== 3}>
        <ProgressTab profile={profile} updateProfile={updateProfile} lang={lang} t={t} />
      </div>
      <div style={{ display:tab === 4 ? "block" : "none" }} aria-hidden={tab !== 4}>
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
        <LanguageSwitch lang={lang} onChange={onChangeLang} />
        <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
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
    );
  }

  if (activeProfile) {
    return (
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
    );
  }

  return (
    <HomeScreen
      data={data}
      onSelect={handleSelect}
      onSelectGroup={handleSelectGroup}
      onAdd={handleAdd}
      onDelete={handleDelete}
      syncStatus={syncStatus}
      theme={theme}
      onToggleTheme={function() { setTheme(function(current) { return current === "dark" ? "light" : "dark"; }); }}
      lang={lang}
      onChangeLang={setLang}
      t={t}
    />
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

// ─── TIMER TAB ───────────────────────────────────────────────────────────────

function TimerTab({ profile, updateProfile, onSaveSession, t }) {
  const instrument = profile.defaultInstrument || "Gitar";
  const defaultMateri = getDefaultLessonMaterial(instrument);
  const draftRef = useRef(null);
  const initialDraft = loadSessionDraft(profile.id);
  const initialElapsed = initialDraft
    ? (initialDraft.elapsed || 0) + (initialDraft.running ? Math.max(0, Math.floor((Date.now() - (initialDraft.savedAt || Date.now())) / 1000)) : 0)
    : 0;
  const [running, setRunning] = useState(true);
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
      setRunning(true);
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
      return Object.assign({}, p, { sessions: p.sessions.concat(newSessions) });
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

// ─── METRONOME TAB ───────────────────────────────────────────────────────────

function MetronomeTab({ running, setRunning, t }) {
  const [bpm, setBpm] = useState(80);
  const [beat, setBeat] = useState(4);
  const [volume, setVolume] = useState(0.8);
  const [tick, setTick] = useState(-1);
  const [tapTimes, setTapTimes] = useState([]);
  const timerRef = useRef(null);
  const ctxRef = useRef(null);

  function playClick(accent) {
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      osc.frequency.value = accent ? 1200 : 800;
      const compressor = ctx.createDynamicsCompressor();
      gain.connect(compressor); compressor.connect(ctx.destination);
      gain.gain.setValueAtTime(accent ? volume * 3 : volume * 2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    } catch(e) {}
  }

  useEffect(function() {
    if (running) {
      let cur = 0;
      playClick(true); setTick(0);
      timerRef.current = setInterval(function() {
        cur = (cur + 1) % beat;
        setTick(cur);
        playClick(cur === 0);
      }, (60 / bpm) * 1000);
    } else {
      clearInterval(timerRef.current);
      setTick(-1);
    }
    return function() { clearInterval(timerRef.current); };
  }, [running, bpm, beat, volume]);

  function handleTap() {
    const now = Date.now();
    const times = tapTimes.concat([now]).slice(-6);
    setTapTimes(times);
    if (times.length >= 2) {
      const diffs = times.slice(1).map(function(t, i) { return t - times[i]; });
      const avg = diffs.reduce(function(a, b) { return a + b; }) / diffs.length;
      setBpm(Math.round(60000 / avg));
    }
  }

  return (
    <div>
      <div style={{ textAlign:"center", margin:"1.5rem 0" }}>
        <div style={{ fontSize:56, fontWeight:500, color:"var(--color-text-primary)", lineHeight:1 }}>{bpm}</div>
        <div style={{ fontSize:13, color:"var(--color-text-secondary)", marginTop:4 }}>BPM</div>
      </div>
      <div style={{ margin:"0 0 1.25rem" }}>
        <input type="range" min={30} max={240} step={1} value={bpm} onChange={function(e) { setBpm(+e.target.value); }} style={{ width:"100%" }} />
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--color-text-tertiary)" }}><span>30</span><span>240</span></div>
      </div>
      <div style={{ margin:"0 0 1.25rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--color-text-secondary)", marginBottom:4 }}>
          <span>{t("volume")}</span><span>{Math.round(volume * 100)}%</span>
        </div>
        <input type="range" min={0.1} max={1.5} step={0.05} value={volume} onChange={function(e) { setVolume(+e.target.value); }} style={{ width:"100%" }} />
      </div>
      <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:"1.5rem" }}>
        {Array.from({ length: beat }).map(function(_, i) {
          return (
            <div key={i} style={{ width:40, height:40, borderRadius:"50%", background:tick===i?(i===0?"#1D9E75":"#378ADD"):"var(--color-background-secondary)", border:"0.5px solid " + (tick===i?"transparent":"var(--color-border-tertiary)"), transition:"background 0.05s" }} />
          );
        })}
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:"1rem", alignItems:"center" }}>
        <div style={{ fontSize:13, color:"var(--color-text-secondary)", whiteSpace:"nowrap" }}>{t("beats")}</div>
        {[2,3,4,6].map(function(b) {
          return (
            <button key={b} onClick={function() { setBeat(b); }}
              style={{ flex:1, padding:"7px", fontSize:13, background:beat===b?"var(--color-background-info)":"transparent", color:beat===b?"var(--color-text-info)":"var(--color-text-secondary)", border:"0.5px solid " + (beat===b?"var(--color-border-info)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:"pointer" }}>
              {b}/4
            </button>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={function() { setRunning(function(r) { return !r; }); }}
          style={{ flex:2, padding:"11px", fontSize:14, fontWeight:500, background:running?"var(--color-background-danger)":"#1D9E75", color:running?"var(--color-text-danger)":"#fff", border:running?"0.5px solid var(--color-border-danger)":"none", borderRadius:"var(--border-radius-md)", cursor:"pointer" }}>
          {running ? t("stop") : t("start")}
        </button>
        <button onClick={handleTap}
          style={{ flex:1, padding:"11px", fontSize:13, border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", background:"transparent", color:"var(--color-text-secondary)", cursor:"pointer" }}>
          Tap
        </button>
      </div>
      <div style={{ marginTop:"1.5rem", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {[70,80,100,120,140,160].map(function(b) {
          return (
            <button key={b} onClick={function() { setBpm(b); }}
              style={{ padding:"8px", fontSize:12, border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", background:bpm===b?"var(--color-background-secondary)":"transparent", color:"var(--color-text-secondary)", cursor:"pointer" }}>
              {b} bpm
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── LOG TAB ─────────────────────────────────────────────────────────────────

function LogTab({ profile, updateProfile, t }) {
  const sessions = profile.sessions.slice().reverse();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  function startEdit(session) {
    setEditingId(session.id);
    setEditForm({
      date: session.date,
      materi: session.materi || "",
      duration: String(Math.max(1, Math.round((session.duration || 60) / 60))),
      notes: session.notes || "",
      attendance: session.attendance || "Hadir",
      homework: session.homework || "",
      goal: session.goal || "",
      scores: normalizeScores(session.scores),
    });
  }

  function setEditField(key, value) {
    setEditForm(function(prev) {
      return Object.assign({}, prev, { [key]: value });
    });
  }

  function setEditScore(key, value) {
    setEditForm(function(prev) {
      return Object.assign({}, prev, {
        scores: Object.assign({}, prev.scores, { [key]: Number(value) }),
      });
    });
  }

  function saveEdit(id) {
    if (!editForm) return;
    updateProfile(function(p) {
      return Object.assign({}, p, {
        sessions: p.sessions.map(function(session) {
          if (session.id !== id) return session;
          return Object.assign({}, session, {
            date: editForm.date || session.date,
            materi: editForm.materi || session.materi,
            duration: Math.max(1, (parseInt(editForm.duration, 10) || 1) * 60),
            notes: editForm.notes.trim(),
            attendance: editForm.attendance,
            homework: editForm.homework.trim(),
            goal: editForm.goal.trim(),
            scores: normalizeScores(editForm.scores),
          });
        }),
      });
    });
    setEditingId(null);
    setEditForm(null);
  }

  async function handleDelete(id) {
    try {
      await deleteSupabaseSession(id);
      updateProfile(function(p) {
        return Object.assign({}, p, { sessions: p.sessions.filter(function(s) { return s.id !== id; }) });
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (!sessions.length) {
    return <div style={{ textAlign:"center", padding:"3rem 0", color:"var(--color-text-tertiary)", fontSize:14 }}>{t("noPracticeSessions")}</div>;
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {sessions.map(function(s) {
        const kat = getKategori(s.instrument, s.materi);
        const c = kat ? KAT_COLORS[kat] : null;
        const editing = editingId === s.id && editForm;
        return (
          <div key={s.id} style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"0.85rem 1rem" }}>
            {editing ? (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <input type="date" value={editForm.date} onChange={function(e) { setEditField("date", e.target.value); }} />
                  <input value={editForm.duration} onChange={function(e) { setEditField("duration", e.target.value); }} />
                </div>
                <input value={editForm.materi} onChange={function(e) { setEditField("materi", e.target.value); }} />
                <input value={editForm.notes} onChange={function(e) { setEditField("notes", e.target.value); }} placeholder={t("notesPlaceholder")} />
                <input value={editForm.goal} onChange={function(e) { setEditField("goal", e.target.value); }} placeholder={t("lessonGoalPlaceholder")} />
                <input value={editForm.homework} onChange={function(e) { setEditField("homework", e.target.value); }} placeholder={t("homeworkPlaceholder")} />
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:5 }}>
                  {ATTENDANCE_STATUSES.map(function(status) {
                    return (
                      <button key={status} onClick={function() { setEditField("attendance", status); }}
                        style={{ padding:"7px 4px", fontSize:11, background:editForm.attendance===status?"var(--color-background-info)":"var(--color-background-secondary)", color:editForm.attendance===status?"var(--color-text-info)":"var(--color-text-secondary)", border:"0.5px solid " + (editForm.attendance===status?"var(--color-border-info)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:"pointer" }}>
                        {status}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {SCORE_KEYS.map(function(key) {
                    return (
                      <label key={key} style={{ fontSize:11, color:"var(--color-text-secondary)" }}>
                        <span style={{ display:"flex", justifyContent:"space-between" }}><span>{SCORE_LABELS[key]}</span><span>{editForm.scores[key]}/5</span></span>
                        <input type="range" min="1" max="5" step="1" value={editForm.scores[key]} onChange={function(e) { setEditScore(key, e.target.value); }} style={{ width:"100%" }} />
                      </label>
                    );
                  })}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={function() { saveEdit(s.id); }} style={{ flex:1, padding:"9px", background:"#1D9E75", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", fontSize:12, cursor:"pointer" }}>{t("saveChanges")}</button>
                  <button onClick={function() { setEditingId(null); setEditForm(null); }} style={{ flex:1, padding:"9px", background:"transparent", color:"var(--color-text-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", fontSize:12, cursor:"pointer" }}>{t("cancel")}</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:18 }}>{INST_ICON[s.instrument] || "🎵"}</span>
                      <span style={{ fontWeight:500, fontSize:15, color:"var(--color-text-primary)" }}>{s.instrument}</span>
                      <span style={{ fontSize:11, color:"var(--color-text-secondary)" }}>{s.attendance || "Hadir"}</span>
                    </div>
                    {kat && <div style={{ display:"inline-block", marginTop:4, fontSize:11, padding:"2px 8px", borderRadius:"var(--border-radius-md)", background:c.bg, color:c.text }}>{kat}</div>}
                    {s.materi && <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:4 }}>{s.materi}</div>}
                    {s.notes && <div style={{ fontSize:12, color:"var(--color-text-tertiary)", marginTop:2 }}>{s.notes}</div>}
                    {s.goal && <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>{t("lessonGoal")}: {s.goal}</div>}
                    {s.homework && <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginTop:2 }}>{t("homework")}: {s.homework}</div>}
                    <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:3 }}>{t("evaluation")}: {averageScore(s.scores)}/5</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                    <div style={{ fontSize:14, fontWeight:500, color:"#1D9E75" }}>{formatTime(s.duration)}</div>
                    <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:2 }}>{s.date}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, marginTop:8 }}>
                  <button onClick={function() { startEdit(s); }} style={{ fontSize:11, color:"var(--color-text-info)", background:"none", border:"none", cursor:"pointer", padding:0 }}>{t("editSession")}</button>
                  <button onClick={function() { handleDelete(s.id); }} style={{ fontSize:11, color:"var(--color-text-tertiary)", background:"none", border:"none", cursor:"pointer", padding:0 }}>{t("delete")}</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PROGRESS TAB ────────────────────────────────────────────────────────────

function ProgressTab({ profile, updateProfile, lang, t }) {
  const [editTarget, setEditTarget] = useState(false);
  const [targetInput, setTargetInput] = useState(String(Math.round(profile.weeklyTarget / 60)));
  const sessions = profile.sessions;
  const weekKey = getWeekKey(todayStr());
  const weekSessions = sessionsInWeek(sessions, weekKey);
  const weekTotal = weekSessions.reduce(function(a,s) { return a + s.duration; }, 0);
  const totalAll = sessions.reduce(function(a,s) { return a + s.duration; }, 0);
  const todaySecs = sessions.filter(function(s) { return s.date === todayStr(); }).reduce(function(a,s) { return a + s.duration; }, 0);

  const streak = (function() {
    const days = [];
    const seen = {};
    sessions.forEach(function(s) { if (!seen[s.date]) { seen[s.date]=true; days.push(s.date); } });
    days.sort().reverse();
    if (!days.length) return 0;
    let count = 0, cur = new Date();
    for (let i = 0; i < days.length; i++) {
      const diff = Math.round((cur - new Date(days[i])) / 86400000);
      if (diff <= 1) { count++; cur = new Date(days[i]); } else break;
    }
    return count;
  })();

  const pct = Math.min(100, Math.round((weekTotal / profile.weeklyTarget) * 100));

  const byKatInst = {};
  sessions.forEach(function(s) {
    const key = s.instrument + "|" + (getKategori(s.instrument, s.materi) || "Lainnya");
    byKatInst[key] = (byKatInst[key] || 0) + s.duration;
  });
  const recentTargets = sessions
    .filter(function(s) { return s.goal; })
    .slice()
    .reverse()
    .slice(0, 5);

  function saveTarget() {
    const m = parseInt(targetInput) || 60;
    updateProfile(function(p) { return Object.assign({}, p, { weeklyTarget: m * 60 }); });
    setEditTarget(false);
  }

  const stats = [
    { label:t("today"), val:formatTime(todaySecs) },
    { label:t("streak"), val:streak + " " + t("day") },
    { label:t("thisWeek"), val:formatTime(weekTotal) },
    { label:t("total"), val:formatTime(totalAll) },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {stats.map(function(c) {
          return (
            <div key={c.label} style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"0.85rem" }}>
              <div style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{c.label}</div>
              <div style={{ fontSize:22, fontWeight:500, marginTop:4, color:"var(--color-text-primary)" }}>{c.val}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)" }}>{t("weeklyTarget")}</div>
          {!editTarget ? (
            <button onClick={function() { setEditTarget(true); }} style={{ fontSize:12, color:"var(--color-text-info)", background:"none", border:"none", cursor:"pointer" }}>{t("edit")}</button>
          ) : (
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <input value={targetInput} onChange={function(e) { setTargetInput(e.target.value); }} style={{ width:50, textAlign:"center" }} />
              <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{t("minutes")}</span>
              <button onClick={saveTarget} style={{ fontSize:12, color:"#1D9E75", background:"none", border:"none", cursor:"pointer" }}>{t("save")}</button>
            </div>
          )}
        </div>
        <div style={{ height:8, background:"var(--color-background-secondary)", borderRadius:4 }}>
          <div style={{ width:pct+"%", height:"100%", background:"#1D9E75", borderRadius:4, transition:"width 0.4s" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--color-text-secondary)", marginTop:6 }}>
          <span>{formatTime(weekTotal)}</span>
          <span>{pct}% {t("from")} {Math.round(profile.weeklyTarget/60)} {t("minutes")}</span>
        </div>
      </div>

      {Object.keys(byKatInst).length > 0 && (
        <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem" }}>
          <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)", marginBottom:12 }}>{t("practiceBreakdown")}</div>
          {Object.entries(byKatInst).sort(function(a,b) { return b[1]-a[1]; }).map(function(entry) {
            const key = entry[0], sec = entry[1];
            const parts = key.split("|");
            const inst = parts[0], kat = parts[1];
            const p = Math.round((sec / totalAll) * 100);
            const c = KAT_COLORS[kat];
            return (
              <div key={key} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4, alignItems:"center" }}>
                  <span style={{ color:"var(--color-text-primary)", display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ fontSize:14 }}>{INST_ICON[inst] || "🎵"}</span>{inst} — {kat}
                  </span>
                  <span style={{ color:"var(--color-text-secondary)" }}>{formatTime(sec)} ({p}%)</span>
                </div>
                <div style={{ height:6, background:"var(--color-background-secondary)", borderRadius:3 }}>
                  <div style={{ width:p+"%", height:"100%", background:c?c.bar:"#888780", borderRadius:3 }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem" }}>
        <div style={{ fontSize:14, fontWeight:500, color:"var(--color-text-primary)", marginBottom:10 }}>{t("recentTargets")}</div>
        {recentTargets.length === 0 ? (
          <div style={{ fontSize:12, color:"var(--color-text-tertiary)" }}>{t("noTargets")}</div>
        ) : (
          recentTargets.map(function(session) {
            return (
              <div key={session.id} style={{ padding:"7px 0", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
                <div style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{session.date}</div>
                <div style={{ fontSize:13, color:"var(--color-text-primary)" }}>{session.goal}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── REPORT TAB ──────────────────────────────────────────────────────────────

function ReportTab({ profile, lang, t }) {
  const months = getMonthsWithSessions(profile.sessions);
  const [selectedMonth, setSelectedMonth] = useState(months[0] || getMonthKey(todayStr()));
  const [reportHtml, setReportHtml] = useState("");
  const reportFrameRef = useRef(null);

  const curSessions = sessionsInMonth(profile.sessions, selectedMonth);
  const prevSessions = sessionsInMonth(profile.sessions, prevMonthKey(selectedMonth));
  const curTotal = curSessions.reduce(function(a,s) { return a + s.duration; }, 0);
  const prevTotal = prevSessions.reduce(function(a,s) { return a + s.duration; }, 0);
  const diff = curTotal - prevTotal;
  const insights = getReportInsights(curSessions, t);

  const dayBuckets = {};
  curSessions.forEach(function(s) {
    dayBuckets[s.date] = (dayBuckets[s.date] || 0) + s.duration;
  });
  const dayRows = Object.keys(dayBuckets).sort().map(function(dateStr) {
    const d = parseDateStr(dateStr);
    return {
      key: dateStr,
      label: d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", { day:"numeric", month:"short" }),
      total: dayBuckets[dateStr],
    };
  });
  const maxDay = Math.max.apply(null, dayRows.map(function(row) { return row.total; }).concat([1]));

  const weekBuckets = {};
  curSessions.forEach(function(s) {
    const key = getWeekKey(s.date);
    weekBuckets[key] = (weekBuckets[key] || 0) + s.duration;
  });
  const weekRows = Object.keys(weekBuckets).sort().map(function(key) {
    return { label:getWeekLabel(key, lang), total:weekBuckets[key] };
  });

  function printReport() {
    const dateNow = new Date().toLocaleDateString(lang === "en" ? "en-US" : "id-ID", { day:"numeric", month:"long", year:"numeric" });
    const monthLabel = getMonthLabel(selectedMonth, lang);
    const diffText = diff === 0 ? t("sameAsPreviousMonth") : diff > 0 ? t("upFromPreviousMonth") + " " + formatMin(Math.abs(diff), lang) + " " + t("fromPreviousMonth") : t("downFromPreviousMonth") + " " + formatMin(Math.abs(diff), lang) + " " + t("fromPreviousMonth");
    const safeProfileName = escapeHtml(profile.name);
    const safeMonthLabel = escapeHtml(monthLabel);
    const safeDateNow = escapeHtml(dateNow);
    const safeDiffText = escapeHtml(diffText);
    const safeSchedule = escapeHtml(formatLessonSchedule(profile, t));
    const safeTopCategory = escapeHtml(insights.topCategory);
    const safeTopMaterial = escapeHtml(insights.topMaterial);
    const safeNextPlan = escapeHtml(insights.nextPlan);

    const rows = curSessions.map(function(s) {
      const instrument = escapeHtml(s.instrument || "-");
      const kategori = escapeHtml(getKategori(s.instrument,s.materi) || "-");
      const materi = escapeHtml(s.materi || "-");
      const notes = escapeHtml(s.notes || "-");
      const homeworkText = escapeHtml(s.homework || "-");
      const goalText = escapeHtml(s.goal || "-");
      return "<tr><td>" + escapeHtml(s.date) + "</td><td>" + escapeHtml(s.attendance || "Hadir") + "</td><td>" + (INST_ICON[s.instrument]||"") + " " + instrument + "</td><td>" + kategori + "</td><td>" + materi + "</td><td>" + formatTime(s.duration) + "</td><td>" + averageScore(s.scores) + "/5</td><td>" + goalText + "</td><td>" + homeworkText + "</td><td>" + notes + "</td></tr>";
    }).join("");

    const noteRows = insights.notes.length
      ? insights.notes.map(function(note) { return "<li>" + escapeHtml(note) + "</li>"; }).join("")
      : "<li>" + escapeHtml(t("noNotesRecorded")) + "</li>";
    const homeworkRows = insights.homework.length
      ? insights.homework.map(function(item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("")
      : "<li>-</li>";
    const goalRows = insights.goals.length
      ? insights.goals.map(function(item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("")
      : "<li>-</li>";

    const weekChart = weekRows.map(function(row) {
      const p = Math.round((row.total / Math.max(curTotal, 1)) * 100);
      return "<div style='display:flex;align-items:center;gap:8px;margin-bottom:6px;'><div style='width:92px;font-size:11px;color:#666;'>" + escapeHtml(row.label) + "</div><div style='flex:1;background:#f0f0f0;border-radius:3px;height:18px;'><div style='width:" + p + "%;background:#378ADD;height:100%;border-radius:3px;'></div></div><div style='width:58px;font-size:11px;color:#444;text-align:right;'>" + formatMin(row.total, lang) + "</div></div>";
    }).join("");

    const barChart = dayRows.map(function(row) {
      const p = Math.max(4, Math.round((row.total / maxDay) * 80));
      return "<div style='display:flex;align-items:center;gap:8px;margin-bottom:6px;'><div style='width:54px;font-size:11px;color:#666;'>" + escapeHtml(row.label) + "</div><div style='flex:1;background:#f0f0f0;border-radius:3px;height:18px;'><div style='width:" + p + "%;background:#1D9E75;height:100%;border-radius:3px;'></div></div><div style='width:58px;font-size:11px;color:#444;text-align:right;'>" + formatMin(row.total, lang) + "</div></div>";
    }).join("");

    const onePageCss = "@page{size:A4 landscape;margin:7mm;}body{max-width:none!important;padding:0!important;font-size:10px!important;line-height:1.18!important;}h1{font-size:16px!important;margin:0 0 2px!important;}.sub{font-size:10px!important;margin-bottom:6px!important;}.grid{gap:6px!important;margin-bottom:6px!important;}.card{padding:6px 8px!important;border-radius:6px!important;}.card-label{font-size:8px!important;margin-bottom:2px!important;}.card-val{font-size:13px!important;}.summary{gap:6px!important;margin-bottom:7px!important;}.panel{padding:6px 8px!important;border-radius:6px!important;}.section{margin-bottom:7px!important;}.section-title{font-size:8px!important;margin-bottom:4px!important;letter-spacing:.03em!important;}.diff{font-size:9px!important;padding:4px 6px!important;margin-top:4px!important;}ul{padding-left:13px!important;}li{margin-bottom:1px!important;}table{table-layout:fixed!important;margin-bottom:7px!important;}th{font-size:7px!important;padding:3px 4px!important;}td{font-size:7.5px!important;padding:3px 4px!important;word-break:break-word!important;}.notes-box{min-height:34px!important;padding:6px!important;border-radius:6px!important;}.footer{margin-top:6px!important;font-size:8px!important;}@media print{body{zoom:.86;}.section,.summary,.grid,.notes-box{break-inside:avoid;}}";
    let html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>" + escapeHtml(t("reportTitle")) + " - " + safeProfileName + "</title><style>body{font-family:Arial,sans-serif;max-width:920px;margin:0 auto;padding:30px;color:#222;font-size:13px;line-height:1.45;}h1{font-size:22px;font-weight:700;margin:0 0 4px;}.sub{color:#666;font-size:13px;margin-bottom:20px;}.section{margin-bottom:22px;}.section-title{font-size:12px;font-weight:700;color:#444;text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px;}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;}.card{background:#f8f8f8;border-radius:8px;padding:11px 13px;border:1px solid #eee;}.card-label{font-size:10px;color:#777;margin-bottom:4px;}.card-val{font-size:18px;font-weight:700;}.summary{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:22px;}.panel{border:1px solid #e5e5e5;border-radius:8px;padding:14px 16px;}.diff{font-size:12px;padding:8px 12px;background:#f0fdf4;border-left:3px solid #1D9E75;color:#333;border-radius:4px;margin-top:10px;}ul{margin:0;padding-left:18px;}li{margin-bottom:5px;}table{width:100%;border-collapse:collapse;margin-bottom:20px;}th{background:#f8f8f8;padding:7px 8px;text-align:left;font-size:9px;color:#666;font-weight:700;border-bottom:1px solid #e8e8e8;}td{padding:7px 8px;border-bottom:1px solid #f0f0f0;font-size:11px;vertical-align:top;}.notes-box{border:1px solid #ddd;border-radius:8px;padding:16px;min-height:76px;}.footer{margin-top:28px;font-size:11px;color:#aaa;text-align:center;}@media print{body{padding:16px;}.grid{gap:8px;}.section{break-inside:avoid;}}" + onePageCss + "</style></head><body><h1>" + escapeHtml(t("reportTitle")) + "</h1><div class='sub'>" + safeProfileName + " &nbsp;·&nbsp; " + safeMonthLabel + " &nbsp;·&nbsp; " + safeSchedule + " &nbsp;·&nbsp; " + escapeHtml(t("printed")) + " " + safeDateNow + "</div><div class='grid'><div class='card'><div class='card-label'>" + escapeHtml(t("totalPractice")) + "</div><div class='card-val'>" + formatMin(curTotal, lang) + "</div></div><div class='card'><div class='card-label'>" + escapeHtml(t("sessionCount")) + "</div><div class='card-val'>" + curSessions.length + "</div></div><div class='card'><div class='card-label'>" + escapeHtml(t("evaluation")) + "</div><div class='card-val'>" + insights.averageScore + "/5</div></div><div class='card'><div class='card-label'>" + escapeHtml(t("attendance")) + "</div><div class='card-val' style='font-size:13px;line-height:1.25;'>" + escapeHtml(insights.attendanceSummary) + "</div></div></div><div class='summary'><div class='panel'><div class='section-title'>" + escapeHtml(t("reportSummary")) + "</div><div>" + safeDiffText + "</div><div class='diff'>" + safeTopCategory + " · " + safeTopMaterial + " · " + formatMin(insights.topMaterialDuration, lang) + "</div></div><div class='panel'><div class='section-title'>" + escapeHtml(t("nextLessonPlan")) + "</div><div>" + safeNextPlan + "</div></div></div><div class='summary'><div class='panel'><div class='section-title'>" + escapeHtml(t("lessonGoal")) + "</div><ul>" + goalRows + "</ul></div><div class='panel'><div class='section-title'>" + escapeHtml(t("homework")) + "</div><ul>" + homeworkRows + "</ul></div></div><div class='section'><div class='section-title'>" + escapeHtml(t("weeklyDuration")) + "</div>" + (weekChart || "<p style='color:#999;font-size:13px;'>" + escapeHtml(t("noSessionsThisMonth")) + "</p>") + "</div><div class='section'><div class='section-title'>" + escapeHtml(t("dailyDuration")) + "</div>" + barChart + "</div><div class='section'><div class='section-title'>" + escapeHtml(t("practiceNotes")) + "</div><div class='panel'><ul>" + noteRows + "</ul></div></div>" + (curSessions.length > 0 ? "<div class='section'><div class='section-title'>" + escapeHtml(t("learningFocus")) + "</div><table><thead><tr><th>" + escapeHtml(t("date")) + "</th><th>" + escapeHtml(t("attendance")) + "</th><th>" + escapeHtml(t("instrument")) + "</th><th>" + escapeHtml(t("category")) + "</th><th>" + escapeHtml(t("material")) + "</th><th>" + escapeHtml(t("duration")) + "</th><th>" + escapeHtml(t("evaluation")) + "</th><th>" + escapeHtml(t("lessonGoal")) + "</th><th>" + escapeHtml(t("homework")) + "</th><th>" + escapeHtml(t("notes")) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>" : "<p style='color:#999;font-size:13px;'>" + escapeHtml(t("noSessionsThisMonth")) + "</p>") + "<div class='notes-box'><div class='section-title'>" + escapeHtml(t("teacherNotes")) + "</div><div style='color:#ccc;font-size:12px;font-style:italic;'>" + escapeHtml(t("handwritten")) + "</div></div><div class='footer'>Music Practice Tracker &nbsp;·&nbsp; " + safeProfileName + "</div></body></html>";

    setReportHtml(html);
  }

  function printPreview() {
    const frame = reportFrameRef.current;
    if (frame && frame.contentWindow) {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    }
  }

  if (reportHtml) {
    return (
      <div>
        <div style={{ display:"flex", gap:8, marginBottom:"1rem" }}>
          <button onClick={function() { setReportHtml(""); }}
            style={{ flex:1, padding:"10px", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", background:"transparent", color:"var(--color-text-secondary)", fontSize:13, cursor:"pointer" }}>
            {t("back")}
          </button>
          <button onClick={printPreview}
            style={{ flex:2, padding:"10px", background:"#1D9E75", color:"#fff", border:"none", borderRadius:"var(--border-radius-md)", fontSize:13, fontWeight:500, cursor:"pointer" }}>
            {t("printSavePdf")}
          </button>
        </div>
        <iframe
          ref={reportFrameRef}
          title="Preview laporan latihan"
          srcDoc={reportHtml}
          style={{ width:"100%", height:"72vh", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", background:"#fff" }}
        />
      </div>
    );
  }

	  return (
	    <div>
	      <div style={{ marginBottom:"1rem" }}>
	        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>{t("selectMonth")}</div>
	        {months.length === 0 ? (
	          <div style={{ fontSize:13, color:"var(--color-text-tertiary)", padding:"1rem 0" }}>{t("noReportSessions")}</div>
	        ) : (
	          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
	            {months.map(function(m) {
	              const mSessions = sessionsInMonth(profile.sessions, m);
	              const mTotal = mSessions.reduce(function(a,s) { return a + s.duration; }, 0);
	              return (
	                <button key={m} onClick={function() { setSelectedMonth(m); }}
	                  style={{ textAlign:"left", padding:"10px 14px", fontSize:13, background:selectedMonth===m?"var(--color-background-info)":"var(--color-background-secondary)", color:selectedMonth===m?"var(--color-text-info)":"var(--color-text-primary)", border:"0.5px solid " + (selectedMonth===m?"var(--color-border-info)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", cursor:"pointer" }}>
	                  {getMonthLabel(m, lang)}
	                  <span style={{ marginLeft:8, fontSize:11, color:selectedMonth===m?"var(--color-text-info)":"var(--color-text-tertiary)" }}>
	                    {mSessions.length} {t("sessions")} · {formatMin(mTotal, lang)}
	                  </span>
	                </button>
	              );
	            })}
          </div>
        )}
      </div>

	      {months.length > 0 && (
	        <div>
	          <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", marginBottom:"1rem" }}>
	            <div style={{ fontSize:13, fontWeight:500, color:"var(--color-text-primary)", marginBottom:10 }}>{getMonthLabel(selectedMonth, lang)}</div>
	            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
	              <div style={{ background:"var(--color-background-primary)", borderRadius:"var(--border-radius-md)", padding:"10px" }}>
	                <div style={{ fontSize:11, color:"var(--color-text-secondary)" }}>{t("total")}</div>
	                <div style={{ fontSize:18, fontWeight:500, color:"var(--color-text-primary)", marginTop:2 }}>{formatMin(curTotal, lang)}</div>
	              </div>
	              <div style={{ background:"var(--color-background-primary)", borderRadius:"var(--border-radius-md)", padding:"10px" }}>
	                <div style={{ fontSize:11, color:"var(--color-text-secondary)" }}>{t("vsLastMonth")}</div>
	                <div style={{ fontSize:18, fontWeight:500, color:diff>=0?"#1D9E75":"var(--color-text-danger)", marginTop:2 }}>
	                  {diff === 0 ? "=" : (diff > 0 ? "+" : "") + formatMin(diff, lang)}
	                </div>
	              </div>
	            </div>
	            {weekRows.length > 0 && (
	              <div style={{ marginBottom:14 }}>
	                <div style={{ marginBottom:8, fontSize:12, fontWeight:500, color:"var(--color-text-secondary)" }}>{t("weeklyDuration")}</div>
	                {weekRows.map(function(row) {
	                  const p = Math.round((row.total / Math.max(curTotal, 1)) * 100);
	                  return (
	                    <div key={row.label} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
	                      <div style={{ width:86, fontSize:11, color:"var(--color-text-tertiary)" }}>{row.label}</div>
	                      <div style={{ flex:1, background:"var(--color-background-tertiary)", borderRadius:3, height:14 }}>
	                        <div style={{ width:p+"%", background:"#378ADD", height:"100%", borderRadius:3 }} />
	                      </div>
	                      <div style={{ width:52, fontSize:11, color:"var(--color-text-secondary)", textAlign:"right" }}>{formatMin(row.total, lang)}</div>
	                    </div>
	                  );
	                })}
	              </div>
	            )}
	            <div style={{ marginBottom:8, fontSize:12, fontWeight:500, color:"var(--color-text-secondary)" }}>{t("dailyDuration")}</div>
		            {dayRows.length === 0 ? (
		              <div style={{ fontSize:12, color:"var(--color-text-tertiary)" }}>{t("noSessionsThisMonth")}</div>
		            ) : dayRows.map(function(row) {
		              return (
	                <div key={row.key} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
	                  <div style={{ width:54, fontSize:11, color:"var(--color-text-tertiary)" }}>{row.label}</div>
	                  <div style={{ flex:1, background:"var(--color-background-tertiary)", borderRadius:3, height:14 }}>
	                    <div style={{ width:Math.max(4, Math.round((row.total/maxDay)*100))+"%", background:"#1D9E75", height:"100%", borderRadius:3 }} />
	                  </div>
	                  <div style={{ width:52, fontSize:11, color:"var(--color-text-secondary)", textAlign:"right" }}>{formatMin(row.total, lang)}</div>
	                </div>
	              );
	            })}
          </div>
          <button onClick={printReport}
            style={{ width:"100%", padding:"12px", background:"#1D9E75", color:"#fff", border:"none", borderRadius:"var(--border-radius-lg)", fontSize:14, fontWeight:500, cursor:"pointer" }}>
            {t("printExportPdf")}
          </button>
        </div>
      )}
    </div>
  );
}
