import { useState, useEffect } from "react";
import { CURRICULUM } from "./curriculum";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

// ─── Helper ────────────────────────────────────────────────────────────────

function getCategoryOrder(cat) {
  return cat.order || 99;
}

function getLevelKey(instrument, category, levelNum) {
  return instrument + "|" + category + "|L" + levelNum;
}

function getItemKey(instrument, category, levelNum, itemId) {
  return instrument + "|" + category + "|L" + levelNum + "|" + itemId;
}

function getSubKey(studentId, subId) {
  return studentId + "|" + subId;
}

const STATUS_LABELS = {
  belum: "Belum",
  diproses: "Diproses",
  selesai: "Selesai",
};
const STATUS_COLORS = {
  belum: { bg: "var(--color-background-tertiary)", text: "var(--color-text-tertiary)" },
  diproses: { bg: "var(--color-background-info)", text: "var(--color-text-info)" },
  selesai: { bg: "var(--color-background-success)", text: "var(--color-text-success)" },
};
const STATUS_NEXT = {
  belum: "diproses",
  diproses: "selesai",
  selesai: "diproses",
};

// ─── ProgressTab ───────────────────────────────────────────────────────────

export default function ProgressTab({ profile, lang, t }) {
  var instrument = profile.defaultInstrument || "Piano";
  var curriculum = CURRICULUM[instrument];
  if (!curriculum) {
    return (
      <div style={{ padding:"2rem", textAlign:"center", color:"var(--color-text-tertiary)", fontSize:13 }}>
        Belum ada kurikulum untuk {instrument}.<br />
        (Gitar & Drum menyusul)
      </div>
    );
  }

  // Flatten: list of all sub-items with their parent info
  var allSubItems = [];
  var categories = Object.keys(curriculum).sort(function(a, b) {
    return getCategoryOrder(curriculum[a]) - getCategoryOrder(curriculum[b]);
  });
  categories.forEach(function(catName) {
    var cat = curriculum[catName];
    if (cat.type === "song_based") {
      // Handle Repertoire separately
      allSubItems.push({
        key: "repertoire|" + catName,
        category: catName,
        type: "repertoire",
        stages: cat.stages,
      });
      return;
    }
    cat.levels.forEach(function(level) {
      level.items.forEach(function(item) {
        item.sub.forEach(function(sub) {
          allSubItems.push({
            key: sub.id,
            category: catName,
            level: level.level,
            itemId: item.id,
            itemName: item.nama,
            subId: sub.id,
            subName: sub.nama,
            orderInItem: item.sub.indexOf(sub),
            orderInLevel: level.items.indexOf(item),
            levelItems: level.items,
          });
        });
      });
    });
  });

  // Load progress from Supabase
  var [progressMap, setProgressMap] = useState({});
  var [loading, setLoading] = useState(true);
  var [activeCategory, setActiveCategory] = useState(categories[0] || "");

  useEffect(function() {
    if (!supabase || !profile.id) { setLoading(false); return; }
    setLoading(true);
    supabase
      .from("student_progress")
      .select("*")
      .eq("student_id", profile.id)
      .eq("instrument", instrument)
      .then(function(res) {
        var map = {};
        if (res.data) {
          res.data.forEach(function(row) {
            map[row.sub_item_id] = row.status;
          });
        }
        setProgressMap(map);
        setLoading(false);
      })
      .catch(function(err) {
        console.error(err);
        setLoading(false);
      });
  }, [profile.id, instrument]);

  function getStatus(subId) {
    return progressMap[subId] || "belum";
  }

  function isUnlocked(subItem) {
    if (!subItem.itemId) return true; // repertoire
    // Check if previous sub-item in same item is completed
    var idx = subItem.orderInItem;
    if (idx > 0) {
      var prevSubId = subItem.levelItems[subItem.orderInLevel].sub[idx - 1].id;
      if (getStatus(prevSubId) !== "selesai") return false;
    }
    // Check if previous item in same level is completed
    if (subItem.orderInItem === 0 && subItem.orderInLevel > 0) {
      var prevItem = subItem.levelItems[subItem.orderInLevel - 1];
      var allPrevSelesai = prevItem.sub.every(function(s) {
        return getStatus(s.id) === "selesai";
      });
      if (!allPrevSelesai) return false;
    }
    return true;
  }

  async function toggleStatus(subId) {
    var current = getStatus(subId);
    var next = STATUS_NEXT[current] || "diproses";
    var newMap = Object.assign({}, progressMap, { [subId]: next });
    setProgressMap(newMap);

    if (!supabase || !profile.id) return;
    try {
      await supabase.from("student_progress").upsert({
        student_id: profile.id,
        instrument: instrument,
        sub_item_id: subId,
        status: next,
        completed_at: next === "selesai" ? new Date().toISOString() : null,
      }, { onConflict: "student_id, sub_item_id" });
    } catch (err) {
      console.error(err);
    }
  }

  function getCategoryProgress(catName) {
    var items = allSubItems.filter(function(s) { return s.category === catName && s.itemId; });
    var total = items.length;
    var done = items.filter(function(s) { return getStatus(s.subId) === "selesai"; }).length;
    return { total: total, done: done, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  }

  // ── GROUP ITEMS BY CATEGORY + LEVEL ──
  var grouped = {};
  allSubItems.forEach(function(s) {
    if (!s.category) return;
    var key = s.category;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  // Find selected category data
  var activeCatData = curriculum[activeCategory];

  if (loading) {
    return <div style={{ padding:"2rem", textAlign:"center", color:"var(--color-text-tertiary)" }}>Memuat progress...</div>;
  }

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display:"flex", gap:4, marginBottom:"0.75rem", flexWrap:"wrap" }}>
        {categories.map(function(catName) {
          var prog = getCategoryProgress(catName);
          return (
            <button key={catName} onClick={function() { setActiveCategory(catName); }}
              style={{
                padding:"5px 10px", fontSize:11, fontWeight: activeCategory === catName ? 600 : 400,
                borderRadius:"var(--border-radius-md)", border:"none", cursor:"pointer",
                background: activeCategory === catName ? "var(--color-background-primary)" : "var(--color-background-secondary)",
                color: activeCategory === catName ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                boxShadow: activeCategory === catName ? "0 0.5px 2px rgba(0,0,0,0.08)" : "none",
              }}>
              {catName}
              {prog.total > 0 && (
                <span style={{ marginLeft:4, fontSize:10, opacity:0.7 }}>({prog.done}/{prog.total})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Repertoire view */}
      {activeCatData && activeCatData.type === "song_based" && (
        <div style={{ padding:"1rem", background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-lg)", textAlign:"center", color:"var(--color-text-tertiary)", fontSize:13 }}>
          🎵 Repertoire — sistem daftar lagu (menyusul)
          <div style={{ marginTop:8, display:"flex", gap:4, justifyContent:"center", flexWrap:"wrap" }}>
            {activeCatData.stages.map(function(stage) {
              return (
                <span key={stage.id} style={{ fontSize:10, padding:"2px 8px", borderRadius:999, background:"var(--color-background-info)", color:"var(--color-text-info)" }}>
                  {stage.nama}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Category content: levels */}
      {activeCatData && activeCatData.levels && activeCatData.levels.map(function(level) {
        var levelItems = grouped[activeCategory].filter(function(s) { return s.level === level.level && s.itemId; });
        var levelDone = levelItems.filter(function(s) { return getStatus(s.subId) === "selesai"; }).length;
        var levelTotal = levelItems.length;

        return (
          <div key={"L" + level.level} style={{ marginBottom:"0.75rem" }}>
            {/* Level header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
              <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-primary)" }}>
                Level {level.level}
              </div>
              <div style={{ fontSize:10, color:"var(--color-text-tertiary)" }}>
                {levelDone}/{levelTotal}
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height:3, borderRadius:999, background:"var(--color-background-tertiary)", marginBottom:8, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:999, background:"var(--color-text-info)", width: levelTotal > 0 ? (levelDone / levelTotal * 100) + "%" : "0%", transition:"width 0.3s" }} />
            </div>
            {/* Items */}
            {level.items.map(function(item) {
              var allSubSelesai = item.sub.every(function(s) { return getStatus(s.id) === "selesai"; });
              var firstSub = item.sub[0];
              var isFirstUnlocked = !firstSub || true; // first item is always unlocked
              return (
                <div key={item.id} style={{ marginBottom:8, opacity: 1 }}>
                  <div style={{ fontSize:11, fontWeight: allSubSelesai ? 600 : 500, color:"var(--color-text-primary)", marginBottom:4 }}>
                    {allSubSelesai ? "✅" : "☐"} {item.nama}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:2, marginLeft:12 }}>
                    {item.sub.map(function(sub) {
                      var status = getStatus(sub.id);
                      var unlocked = isUnlocked(sub);
                      var colorInfo = STATUS_COLORS[status] || STATUS_COLORS.belum;
                      return (
                        <div key={sub.id} style={{ display:"flex", alignItems:"center", gap:6, cursor: unlocked ? "pointer" : "default", opacity: unlocked ? 1 : 0.4 }} onClick={function() { if (unlocked) toggleStatus(sub.id); }}>
                          <span style={{ width:16, height:16, borderRadius:"50%", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0, background:colorInfo.bg, color:colorInfo.text }}>
                            {status === "selesai" ? "✓" : status === "diproses" ? "◉" : "○"}
                          </span>
                          <span style={{ fontSize:10, color:"var(--color-text-secondary)" }}>{sub.nama}</span>
                          <span style={{ fontSize:8, color:colorInfo.text, marginLeft:"auto" }}>{STATUS_LABELS[status]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
