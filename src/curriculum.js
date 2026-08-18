// Krisna Music Course — Progressive Curriculum
// Structure: Instrument → Category → Level → Item → Sub-item

export const CURRICULUM = {
  "Piano": {
    "Teknik Dasar": {
      "order": 1,
      "levels": [
        {
          "level": 1,
          "items": [
            {
              "id": "td-01",
              "nama": "Postur & posisi tangan",
              "sub": [
                {
                  "id": "td-01-a",
                  "nama": "Postur duduk (tegak, bahu rileks, kaki di pedal)"
                },
                {
                  "id": "td-01-b",
                  "nama": "Posisi jari rounded, buku jari keliatan"
                },
                {
                  "id": "td-01-c",
                  "nama": "Pergelangan tangan sejajar"
                },
                {
                  "id": "td-01-d",
                  "nama": "Tinggi kursi & jarak (siku 90°)"
                }
              ]
            },
            {
              "id": "td-02",
              "nama": "Legato & Staccato",
              "sub": [
                {
                  "id": "td-02-a",
                  "nama": "Legato 2 jari (C-D menggunakan jari 1-2)"
                },
                {
                  "id": "td-02-b",
                  "nama": "Legato 5 jari (C-D-E-F-G naik & turun)"
                },
                {
                  "id": "td-02-c",
                  "nama": "Staccato 5 jari (wrist staccato)"
                },
                {
                  "id": "td-02-d",
                  "nama": "Bedain bunyi legato vs staccato"
                }
              ]
            },
            {
              "id": "td-03",
              "nama": "Hand coordination",
              "sub": [
                {
                  "id": "td-03-a",
                  "nama": "Right Hand saja (C position)"
                },
                {
                  "id": "td-03-b",
                  "nama": "Left Hand saja (C position)"
                },
                {
                  "id": "td-03-c",
                  "nama": "Right Hand + Left Hand bergantian"
                },
                {
                  "id": "td-03-d",
                  "nama": "Right Hand + Left Hand bersamaan (sederhana)"
                }
              ]
            }
          ]
        },
        {
          "level": 2,
          "items": [
            {
              "id": "td-04",
              "nama": "Finger strengthening",
              "sub": [
                {
                  "id": "td-04-a",
                  "nama": "Five-finger patterns (C position)"
                },
                {
                  "id": "td-04-b",
                  "nama": "Hanon no. 1 (Right Hand)"
                },
                {
                  "id": "td-04-c",
                  "nama": "Hanon no. 1 (Left Hand)"
                },
                {
                  "id": "td-04-d",
                  "nama": "Hanon no. 1 (Right Hand + Left Hand)"
                }
              ]
            },
            {
              "id": "td-05",
              "nama": "Dynamic control",
              "sub": [
                {
                  "id": "td-05-a",
                  "nama": "Piano (soft) vs Forte (loud)"
                },
                {
                  "id": "td-05-b",
                  "nama": "Crescendo & Decrescendo"
                },
                {
                  "id": "td-05-c",
                  "nama": "Memainkan tangga nada dengan dinamika"
                },
                {
                  "id": "td-05-d",
                  "nama": "Bedain bunyi tiap tingkat dinamis"
                }
              ]
            }
          ]
        },
        {
          "level": 3,
          "items": [
            {
              "id": "td-06",
              "nama": "Pedal teknik",
              "sub": [
                {
                  "id": "td-06-a",
                  "nama": "Basic sustain pedal (down/up)"
                },
                {
                  "id": "td-06-b",
                  "nama": "Pedal sama tangga nada"
                },
                {
                  "id": "td-06-c",
                  "nama": "Pedal sama chord"
                },
                {
                  "id": "td-06-d",
                  "nama": "Legato pedaling"
                }
              ]
            },
            {
              "id": "td-07",
              "nama": "Oktav & chord leaps",
              "sub": [
                {
                  "id": "td-07-a",
                  "nama": "Oktav - Right Hand"
                },
                {
                  "id": "td-07-b",
                  "nama": "Oktav - Left Hand"
                },
                {
                  "id": "td-07-c",
                  "nama": "Chord leaps root position"
                },
                {
                  "id": "td-07-d",
                  "nama": "Chord leaps inversions"
                }
              ]
            }
          ]
        },
        {
          "level": 4,
          "items": [
            {
              "id": "td-08",
              "nama": "Trills & ornaments",
              "sub": [
                {
                  "id": "td-08-a",
                  "nama": "Trill 2-3 jari"
                },
                {
                  "id": "td-08-b",
                  "nama": "Mordent (upper/lower)"
                },
                {
                  "id": "td-08-c",
                  "nama": "Turn (gruppetto)"
                },
                {
                  "id": "td-08-d",
                  "nama": "Gunakan di lagu"
                }
              ]
            },
            {
              "id": "td-09",
              "nama": "Voicing & balance",
              "sub": [
                {
                  "id": "td-09-a",
                  "nama": "Melody lebih keras dari accompaniment"
                },
                {
                  "id": "td-09-b",
                  "nama": "Left Hand vs Right Hand balance"
                },
                {
                  "id": "td-09-c",
                  "nama": "Chord voicing (close vs open)"
                },
                {
                  "id": "td-09-d",
                  "nama": "Memainkan dengan ekspresi"
                }
              ]
            }
          ]
        },
        {
          "level": 5,
          "items": [
            {
              "id": "td-10",
              "nama": "Full Hanon cycle",
              "sub": [
                {
                  "id": "td-10-a",
                  "nama": "Hanon 1-10"
                },
                {
                  "id": "td-10-b",
                  "nama": "Hanon with transposition"
                },
                {
                  "id": "td-10-c",
                  "nama": "Hanon with dynamics"
                },
                {
                  "id": "td-10-d",
                  "nama": "Hanon with various articulations"
                }
              ]
            },
            {
              "id": "td-11",
              "nama": "Advanced articulation",
              "sub": [
                {
                  "id": "td-11-a",
                  "nama": "Staccato volante"
                },
                {
                  "id": "td-11-b",
                  "nama": "Leggiero"
                },
                {
                  "id": "td-11-c",
                  "nama": "Marcato"
                },
                {
                  "id": "td-11-d",
                  "nama": "Bedain & main semua artikulasi"
                }
              ]
            }
          ]
        }
      ]
    },
    "Scales & Arpeggio": {
      "order": 2,
      "levels": [
        {
          "level": 1,
          "items": [
            {
              "id": "sc-01",
              "nama": "C Mayor",
              "sub": [
                {
                  "id": "sc-01-a",
                  "nama": "Posisi tangan C position"
                },
                {
                  "id": "sc-01-b",
                  "nama": "Right Hand 1 oktaf naik & turun"
                },
                {
                  "id": "sc-01-c",
                  "nama": "Left Hand 1 oktaf naik & turun"
                },
                {
                  "id": "sc-01-d",
                  "nama": "Right Hand + Left Hand bersama"
                }
              ]
            },
            {
              "id": "sc-02",
              "nama": "G Mayor",
              "sub": [
                {
                  "id": "sc-02-a",
                  "nama": "Posisi G position"
                },
                {
                  "id": "sc-02-b",
                  "nama": "Right Hand 1 oktaf"
                },
                {
                  "id": "sc-02-c",
                  "nama": "Left Hand 1 oktaf"
                },
                {
                  "id": "sc-02-d",
                  "nama": "Right Hand + Left Hand bersama"
                }
              ]
            },
            {
              "id": "sc-03",
              "nama": "A minor (natural)",
              "sub": [
                {
                  "id": "sc-03-a",
                  "nama": "Posisi A minor"
                },
                {
                  "id": "sc-03-b",
                  "nama": "Right Hand 1 oktaf"
                },
                {
                  "id": "sc-03-c",
                  "nama": "Left Hand 1 oktaf"
                },
                {
                  "id": "sc-03-d",
                  "nama": "Right Hand + Left Hand bersama"
                }
              ]
            }
          ]
        },
        {
          "level": 2,
          "items": [
            {
              "id": "sc-04",
              "nama": "D Mayor",
              "sub": [
                {
                  "id": "sc-04-a",
                  "nama": "Right Hand 1 oktaf"
                },
                {
                  "id": "sc-04-b",
                  "nama": "Left Hand 1 oktaf"
                },
                {
                  "id": "sc-04-c",
                  "nama": "Right Hand + Left Hand bersama"
                }
              ]
            },
            {
              "id": "sc-05",
              "nama": "E minor (natural)",
              "sub": [
                {
                  "id": "sc-05-a",
                  "nama": "Right Hand 1 oktaf"
                },
                {
                  "id": "sc-05-b",
                  "nama": "Left Hand 1 oktaf"
                },
                {
                  "id": "sc-05-c",
                  "nama": "Right Hand + Left Hand bersama"
                }
              ]
            },
            {
              "id": "sc-06",
              "nama": "F Mayor",
              "sub": [
                {
                  "id": "sc-06-a",
                  "nama": "Posisi F position"
                },
                {
                  "id": "sc-06-b",
                  "nama": "Right Hand 1 oktaf (thumb under)"
                },
                {
                  "id": "sc-06-c",
                  "nama": "Left Hand 1 oktaf"
                },
                {
                  "id": "sc-06-d",
                  "nama": "Right Hand + Left Hand bersama"
                }
              ]
            }
          ]
        },
        {
          "level": 3,
          "items": [
            {
              "id": "sc-07",
              "nama": "Bb Mayor",
              "sub": [
                {
                  "id": "sc-07-a",
                  "nama": "Right Hand 2 oktaf"
                },
                {
                  "id": "sc-07-b",
                  "nama": "Left Hand 2 oktaf"
                },
                {
                  "id": "sc-07-c",
                  "nama": "Right Hand + Left Hand bersama 2 oktaf"
                },
                {
                  "id": "sc-07-d",
                  "nama": "Dengan dynamic contrast"
                }
              ]
            },
            {
              "id": "sc-08",
              "nama": "D minor (harmonic & melodic)",
              "sub": [
                {
                  "id": "sc-08-a",
                  "nama": "Harmonic: Right Hand + Left Hand"
                },
                {
                  "id": "sc-08-b",
                  "nama": "Melodic: Right Hand + Left Hand"
                },
                {
                  "id": "sc-08-c",
                  "nama": "Bedain bunyi harmonic vs melodic"
                }
              ]
            },
            {
              "id": "sc-09",
              "nama": "Arpeggio root position",
              "sub": [
                {
                  "id": "sc-09-a",
                  "nama": "C major (Right Hand)"
                },
                {
                  "id": "sc-09-b",
                  "nama": "G major (Left Hand)"
                },
                {
                  "id": "sc-09-c",
                  "nama": "F major (Right Hand + Left Hand)"
                },
                {
                  "id": "sc-09-d",
                  "nama": "Right Hand + Left Hand bersama 2 oktaf"
                }
              ]
            }
          ]
        },
        {
          "level": 4,
          "items": [
            {
              "id": "sc-10",
              "nama": "All major scales",
              "sub": [
                {
                  "id": "sc-10-a",
                  "nama": "Circle of Fifths (C→F#/Gb)"
                },
                {
                  "id": "sc-10-b",
                  "nama": "Right Hand 2 oktaf"
                },
                {
                  "id": "sc-10-c",
                  "nama": "Left Hand 2 oktaf"
                },
                {
                  "id": "sc-10-d",
                  "nama": "Right Hand + Left Hand parallel 2 oktaf"
                }
              ]
            },
            {
              "id": "sc-11",
              "nama": "Arpeggio inversions",
              "sub": [
                {
                  "id": "sc-11-a",
                  "nama": "First inversion"
                },
                {
                  "id": "sc-11-b",
                  "nama": "Second inversion"
                },
                {
                  "id": "sc-11-c",
                  "nama": "All inversions (C, G, F)"
                },
                {
                  "id": "sc-11-d",
                  "nama": "2 oktaf"
                }
              ]
            },
            {
              "id": "sc-12",
              "nama": "E minor & B minor",
              "sub": [
                {
                  "id": "sc-12-a",
                  "nama": "Harmonic: Right Hand + Left Hand"
                },
                {
                  "id": "sc-12-b",
                  "nama": "Melodic: Right Hand + Left Hand"
                },
                {
                  "id": "sc-12-c",
                  "nama": "2 oktaf"
                }
              ]
            }
          ]
        },
        {
          "level": 5,
          "items": [
            {
              "id": "sc-13",
              "nama": "Chromatic scale",
              "sub": [
                {
                  "id": "sc-13-a",
                  "nama": "Right Hand parallel"
                },
                {
                  "id": "sc-13-b",
                  "nama": "Left Hand parallel"
                },
                {
                  "id": "sc-13-c",
                  "nama": "Right Hand + Left Hand 3rd apart"
                },
                {
                  "id": "sc-13-d",
                  "nama": "4 oktaf"
                }
              ]
            },
            {
              "id": "sc-14",
              "nama": "Contrary motion",
              "sub": [
                {
                  "id": "sc-14-a",
                  "nama": "C major"
                },
                {
                  "id": "sc-14-b",
                  "nama": "G major"
                },
                {
                  "id": "sc-14-c",
                  "nama": "All keys"
                },
                {
                  "id": "sc-14-d",
                  "nama": "2 oktaf"
                }
              ]
            },
            {
              "id": "sc-15",
              "nama": "All minor scales",
              "sub": [
                {
                  "id": "sc-15-a",
                  "nama": "Harmonic: all keys"
                },
                {
                  "id": "sc-15-b",
                  "nama": "Melodic: all keys"
                },
                {
                  "id": "sc-15-c",
                  "nama": "2 oktaf parallel"
                },
                {
                  "id": "sc-15-d",
                  "nama": "Arpeggio minor"
                }
              ]
            }
          ]
        }
      ]
    },
    "Sight Reading & Ear Training": {
      "order": 4,
      "levels": [
        {
          "level": 1,
          "items": [
            {
              "id": "sr-01",
              "nama": "Note reading (C position)",
              "sub": [
                {
                  "id": "sr-01-a",
                  "nama": "Kenali not C D E F G (treble clef)"
                },
                {
                  "id": "sr-01-b",
                  "nama": "Kenali not C B A G F (bass clef)"
                },
                {
                  "id": "sr-01-c",
                  "nama": "Baca Right Hand: C-D-E-F-G"
                },
                {
                  "id": "sr-01-d",
                  "nama": "Baca Left Hand: C-B-A-G-F"
                }
              ]
            },
            {
              "id": "sr-02",
              "nama": "Rhythm Dasar",
              "sub": [
                {
                  "id": "sr-02-a",
                  "nama": "Whole, half, quarter note"
                },
                {
                  "id": "sr-02-b",
                  "nama": "Ketuk & hitung (1-2-3-4)"
                },
                {
                  "id": "sr-02-c",
                  "nama": "Clap sambil baca not"
                },
                {
                  "id": "sr-02-d",
                  "nama": "Memainkan di piano 1 not"
                }
              ]
            },
            {
              "id": "sr-03",
              "nama": "Interval recognition",
              "sub": [
                {
                  "id": "sr-03-a",
                  "nama": "Step vs skip"
                },
                {
                  "id": "sr-03-b",
                  "nama": "Step-wise di staff"
                },
                {
                  "id": "sr-03-c",
                  "nama": "Dengar & bedakan step vs skip"
                }
              ]
            }
          ]
        },
        {
          "level": 2,
          "items": [
            {
              "id": "sr-04",
              "nama": "Note reading extended",
              "sub": [
                {
                  "id": "sr-04-a",
                  "nama": "Not di staff treble (C4-C5)"
                },
                {
                  "id": "sr-04-b",
                  "nama": "Not di staff bass (C3-C4)"
                },
                {
                  "id": "sr-04-c",
                  "nama": "Ledger lines (middle C)"
                },
                {
                  "id": "sr-04-d",
                  "nama": "Baca Right Hand + Left Hand bersama"
                }
              ]
            },
            {
              "id": "sr-05",
              "nama": "Rhythm Level 2",
              "sub": [
                {
                  "id": "sr-05-a",
                  "nama": "Eighth notes"
                },
                {
                  "id": "sr-05-b",
                  "nama": "Dotted half note"
                },
                {
                  "id": "sr-05-c",
                  "nama": "Clap rhythm dengan 8th notes"
                },
                {
                  "id": "sr-05-d",
                  "nama": "Memainkan di piano"
                }
              ]
            },
            {
              "id": "sr-06",
              "nama": "Melodic dictation dasar",
              "sub": [
                {
                  "id": "sr-06-a",
                  "nama": "Dengar & main ulang 2 not"
                },
                {
                  "id": "sr-06-b",
                  "nama": "Dengar & main ulang 3 not"
                },
                {
                  "id": "sr-06-c",
                  "nama": "Dengar & main ulang 5 not"
                },
                {
                  "id": "sr-06-d",
                  "nama": "Tulis di staff"
                }
              ]
            }
          ]
        },
        {
          "level": 3,
          "items": [
            {
              "id": "sr-07",
              "nama": "Key signature sight-reading",
              "sub": [
                {
                  "id": "sr-07-a",
                  "nama": "Cari key dari staff"
                },
                {
                  "id": "sr-07-b",
                  "nama": "Baca di C, G, D"
                },
                {
                  "id": "sr-07-c",
                  "nama": "Baca di F, Bb"
                },
                {
                  "id": "sr-07-d",
                  "nama": "Pindah key sambil baca"
                }
              ]
            },
            {
              "id": "sr-08",
              "nama": "Syncopation",
              "sub": [
                {
                  "id": "sr-08-a",
                  "nama": "Off-beat 8th notes"
                },
                {
                  "id": "sr-08-b",
                  "nama": "Dotted rhythm"
                },
                {
                  "id": "sr-08-c",
                  "nama": "Clap syncopation"
                },
                {
                  "id": "sr-08-d",
                  "nama": "Memainkan di piano"
                }
              ]
            },
            {
              "id": "sr-09",
              "nama": "Chord progression detection",
              "sub": [
                {
                  "id": "sr-09-a",
                  "nama": "Dengerin I-IV-V"
                },
                {
                  "id": "sr-09-b",
                  "nama": "Bedain mayor vs minor"
                },
                {
                  "id": "sr-09-c",
                  "nama": "Tulis progresi sederhana"
                }
              ]
            }
          ]
        },
        {
          "level": 4,
          "items": [
            {
              "id": "sr-10",
              "nama": "Compound time (6/8)",
              "sub": [
                {
                  "id": "sr-10-a",
                  "nama": "6/8 feel"
                },
                {
                  "id": "sr-10-b",
                  "nama": "Dotted quarter = 1 beat"
                },
                {
                  "id": "sr-10-c",
                  "nama": "Clap 6/8 rhythm"
                },
                {
                  "id": "sr-10-d",
                  "nama": "Baca etude 6/8"
                }
              ]
            },
            {
              "id": "sr-11",
              "nama": "Harmonic dictation",
              "sub": [
                {
                  "id": "sr-11-a",
                  "nama": "Dengar I-IV-V progresi"
                },
                {
                  "id": "sr-11-b",
                  "nama": "Tulis bass line"
                },
                {
                  "id": "sr-11-c",
                  "nama": "Tulis chords"
                },
                {
                  "id": "sr-11-d",
                  "nama": "Kadens V-I"
                }
              ]
            },
            {
              "id": "sr-12",
              "nama": "Sight-reading dinamika",
              "sub": [
                {
                  "id": "sr-12-a",
                  "nama": "Baca p & f"
                },
                {
                  "id": "sr-12-b",
                  "nama": "Baca cresc/decresc"
                },
                {
                  "id": "sr-12-c",
                  "nama": "Etude pendek (16 bars)"
                }
              ]
            }
          ]
        },
        {
          "level": 5,
          "items": [
            {
              "id": "sr-13",
              "nama": "Complex Rhythms",
              "sub": [
                {
                  "id": "sr-13-a",
                  "nama": "Triplets"
                },
                {
                  "id": "sr-13-b",
                  "nama": "16th notes"
                },
                {
                  "id": "sr-13-c",
                  "nama": "Swing feel"
                },
                {
                  "id": "sr-13-d",
                  "nama": "Polyrhythm (3 vs 2)"
                }
              ]
            },
            {
              "id": "sr-14",
              "nama": "Full etude sight-reading",
              "sub": [
                {
                  "id": "sr-14-a",
                  "nama": "Bach invention level"
                },
                {
                  "id": "sr-14-b",
                  "nama": "Czerny etude"
                },
                {
                  "id": "sr-14-c",
                  "nama": "Sight-read cold"
                }
              ]
            },
            {
              "id": "sr-15",
              "nama": "Advanced ear training",
              "sub": [
                {
                  "id": "sr-15-a",
                  "nama": "Transcribe melody (8 bars)"
                },
                {
                  "id": "sr-15-b",
                  "nama": "Transcribe chord progression"
                },
                {
                  "id": "sr-15-c",
                  "nama": "Play by ear"
                }
              ]
            }
          ]
        }
      ]
    },
    "Teori & Harmoni": {
      "order": 5,
      "levels": [
        {
          "level": 1,
          "items": [
            {
              "id": "th-01",
              "nama": "Interval dasar",
              "sub": [
                {
                  "id": "th-01-a",
                  "nama": "Whole step vs half step"
                },
                {
                  "id": "th-01-b",
                  "nama": "Mayor third & minor third"
                },
                {
                  "id": "th-01-c",
                  "nama": "Perfect fifth"
                },
                {
                  "id": "th-01-d",
                  "nama": "Kenali di keyboard"
                }
              ]
            },
            {
              "id": "th-02",
              "nama": "Chord triad dasar",
              "sub": [
                {
                  "id": "th-02-a",
                  "nama": "C major (C-E-G)"
                },
                {
                  "id": "th-02-b",
                  "nama": "F major (F-A-C)"
                },
                {
                  "id": "th-02-c",
                  "nama": "G major (G-B-D)"
                },
                {
                  "id": "th-02-d",
                  "nama": "Memainkan broken chord"
                }
              ]
            },
            {
              "id": "th-03",
              "nama": "Progresi chord dasar",
              "sub": [
                {
                  "id": "th-03-a",
                  "nama": "I-IV-V di C mayor"
                },
                {
                  "id": "th-03-b",
                  "nama": "Play progresi di Right Hand"
                },
                {
                  "id": "th-03-c",
                  "nama": "Add Left Hand root note"
                },
                {
                  "id": "th-03-d",
                  "nama": "Memainkan hands together"
                }
              ]
            }
          ]
        },
        {
          "level": 2,
          "items": [
            {
              "id": "th-04",
              "nama": "Tangga nada minor",
              "sub": [
                {
                  "id": "th-04-a",
                  "nama": "Natural minor (A, E, D)"
                },
                {
                  "id": "th-04-b",
                  "nama": "Harmonic minor"
                },
                {
                  "id": "th-04-c",
                  "nama": "Melodic minor"
                },
                {
                  "id": "th-04-d",
                  "nama": "Memainkan di keyboard & bedakan"
                }
              ]
            },
            {
              "id": "th-05",
              "nama": "Circle of Fifths",
              "sub": [
                {
                  "id": "th-05-a",
                  "nama": "Gambar & pahami lingkaran (C→G→D→A→E→B→F#/Gb)"
                },
                {
                  "id": "th-05-b",
                  "nama": "Family chord tiap key (I-IV-V)"
                },
                {
                  "id": "th-05-c",
                  "nama": "Cari key signature dari circle"
                },
                {
                  "id": "th-05-d",
                  "nama": "Memainkan I-IV-V di C, G, D, F"
                },
                {
                  "id": "th-05-e",
                  "nama": "Hubungan relative minor"
                }
              ]
            },
            {
              "id": "th-06",
              "nama": "Chord 7th dasar",
              "sub": [
                {
                  "id": "th-06-a",
                  "nama": "Dominant 7th (G7)"
                },
                {
                  "id": "th-06-b",
                  "nama": "Major 7th (Cmaj7)"
                },
                {
                  "id": "th-06-c",
                  "nama": "Minor 7th (Am7)"
                },
                {
                  "id": "th-06-d",
                  "nama": "Memainkan broken chord"
                }
              ]
            },
            {
              "id": "th-07",
              "nama": "Progresi ii-V-I",
              "sub": [
                {
                  "id": "th-07-a",
                  "nama": "ii-V-I di C mayor (Dm-G7-C)"
                },
                {
                  "id": "th-07-b",
                  "nama": "Play di Right Hand"
                },
                {
                  "id": "th-07-c",
                  "nama": "Add Left Hand root note"
                },
                {
                  "id": "th-07-d",
                  "nama": "Memainkan hands together"
                }
              ]
            }
          ]
        },
        {
          "level": 3,
          "items": [
            {
              "id": "th-08",
              "nama": "Chord inversions",
              "sub": [
                {
                  "id": "th-08-a",
                  "nama": "First inversion (6/3)"
                },
                {
                  "id": "th-08-b",
                  "nama": "Second inversion (6/4)"
                },
                {
                  "id": "th-08-c",
                  "nama": "Memainkan di semua triad"
                },
                {
                  "id": "th-08-d",
                  "nama": "Gunakan di lagu"
                }
              ]
            },
            {
              "id": "th-09",
              "nama": "Cadences",
              "sub": [
                {
                  "id": "th-09-a",
                  "nama": "Perfect (V-I)"
                },
                {
                  "id": "th-09-b",
                  "nama": "Plagal (IV-I)"
                },
                {
                  "id": "th-09-c",
                  "nama": "Imperfect (I-V)"
                },
                {
                  "id": "th-09-d",
                  "nama": "Dengerin & bedakan"
                }
              ]
            },
            {
              "id": "th-10",
              "nama": "Modulasi dasar",
              "sub": [
                {
                  "id": "th-10-a",
                  "nama": "Modulasi ke V (C→G)"
                },
                {
                  "id": "th-10-b",
                  "nama": "Modulasi ke IV (C→F)"
                },
                {
                  "id": "th-10-c",
                  "nama": "Pivot chord"
                }
              ]
            }
          ]
        },
        {
          "level": 4,
          "items": [
            {
              "id": "th-11",
              "nama": "Extended chords",
              "sub": [
                {
                  "id": "th-11-a",
                  "nama": "Dominant 9th"
                },
                {
                  "id": "th-11-b",
                  "nama": "Minor 9th"
                },
                {
                  "id": "th-11-c",
                  "nama": "Major 9th"
                }
              ]
            },
            {
              "id": "th-12",
              "nama": "Harmonic analysis",
              "sub": [
                {
                  "id": "th-12-a",
                  "nama": "Analisis progresi lagu pop"
                },
                {
                  "id": "th-12-b",
                  "nama": "Label chords (I, ii, V7, etc)"
                },
                {
                  "id": "th-12-c",
                  "nama": "Circle progression"
                }
              ]
            },
            {
              "id": "th-13",
              "nama": "Secondary dominants",
              "sub": [
                {
                  "id": "th-13-a",
                  "nama": "V7/V (D7→G7)"
                },
                {
                  "id": "th-13-b",
                  "nama": "V7/IV (C7→F)"
                },
                {
                  "id": "th-13-c",
                  "nama": "Analisis lagu"
                }
              ]
            }
          ]
        },
        {
          "level": 5,
          "items": [
            {
              "id": "th-14",
              "nama": "Improvisasi",
              "sub": [
                {
                  "id": "th-14-a",
                  "nama": "Blues scale"
                },
                {
                  "id": "th-14-b",
                  "nama": "Pentatonic"
                },
                {
                  "id": "th-14-c",
                  "nama": "Impro over I-IV-V"
                }
              ]
            },
            {
              "id": "th-15",
              "nama": "Reharmonization",
              "sub": [
                {
                  "id": "th-15-a",
                  "nama": "Ganti chord with substitutions"
                },
                {
                  "id": "th-15-b",
                  "nama": "Tritone substitution"
                },
                {
                  "id": "th-15-c",
                  "nama": "Add passing chords"
                }
              ]
            },
            {
              "id": "th-16",
              "nama": "Composition dasar",
              "sub": [
                {
                  "id": "th-16-a",
                  "nama": "Write 8-bar melody"
                },
                {
                  "id": "th-16-b",
                  "nama": "Add chord progression"
                },
                {
                  "id": "th-16-c",
                  "nama": "Memainkan komposisi sendiri"
                }
              ]
            }
          ]
        }
      ]
    },
    "Repertoire": {
      "order": 3,
      "type": "song_based",
      "stages": [
        {
          "id": "rep-1",
          "nama": "Sight-read"
        },
        {
          "id": "rep-2",
          "nama": "Belajar (notes & fingering)"
        },
        {
          "id": "rep-3",
          "nama": "Hapal (memory)"
        },
        {
          "id": "rep-4",
          "nama": "Polish (dynamics, tempo, expression)"
        },
        {
          "id": "rep-5",
          "nama": "Performance ready (full run-through)"
        }
      ]
    }
  },
  "Gitar": {
      "Teknik Dasar": {
        "order": 1,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "gd-01",
                "nama": "Postur & Posisi Tangan",
                "sub": [
                  {
                    "id": "gd-01-a",
                    "nama": "Postur duduk yang benar"
                  },
                  {
                    "id": "gd-01-b",
                    "nama": "Posisi thumb di belakang neck"
                  },
                  {
                    "id": "gd-01-c",
                    "nama": "Posisi jari di fretboard"
                  },
                  {
                    "id": "gd-01-d",
                    "nama": "Strap height & posisi gitar berdiri"
                  }
                ]
              },
              {
                "id": "gd-02",
                "nama": "Teknik Memetik Dasar",
                "sub": [
                  {
                    "id": "gd-02-a",
                    "nama": "Pick grip yang benar"
                  },
                  {
                    "id": "gd-02-b",
                    "nama": "Downstroke & upstroke"
                  },
                  {
                    "id": "gd-02-c",
                    "nama": "Alternate picking (senar terbuka)"
                  },
                  {
                    "id": "gd-02-d",
                    "nama": "Petik senar satu per satu dengan kontrol"
                  }
                ]
              },
              {
                "id": "gd-03",
                "nama": "Finger Placement & Fret Hand",
                "sub": [
                  {
                    "id": "gd-03-a",
                    "nama": "Fret jari 1-2-3-4 per fret"
                  },
                  {
                    "id": "gd-03-b",
                    "nama": "Chromatic exercise (fret 1-4)"
                  },
                  {
                    "id": "gd-03-c",
                    "nama": "Pindah senar dengan jari yang tepat"
                  },
                  {
                    "id": "gd-03-d",
                    "nama": "Sinkronisasi tangan kanan dan kiri"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "gd-04",
                "nama": "Chord Open Dasar",
                "sub": [
                  {
                    "id": "gd-04-a",
                    "nama": "Chord C major, G major, D major"
                  },
                  {
                    "id": "gd-04-b",
                    "nama": "Chord A minor, E minor"
                  },
                  {
                    "id": "gd-04-c",
                    "nama": "Pindah chord dengan lancar"
                  },
                  {
                    "id": "gd-04-d",
                    "nama": "Strumming dasar (down only)"
                  }
                ]
              },
              {
                "id": "gd-05",
                "nama": "Strumming Patterns",
                "sub": [
                  {
                    "id": "gd-05-a",
                    "nama": "Down-down-down-down (4/4)"
                  },
                  {
                    "id": "gd-05-b",
                    "nama": "Down-up-down-up (8th notes)"
                  },
                  {
                    "id": "gd-05-c",
                    "nama": "Pattern dengan accent"
                  },
                  {
                    "id": "gd-05-d",
                    "nama": "Dynamic strumming (soft-loud)"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "gd-06",
                "nama": "Chord Barre",
                "sub": [
                  {
                    "id": "gd-06-a",
                    "nama": "F major barre (fret 1)"
                  },
                  {
                    "id": "gd-06-b",
                    "nama": "B minor barre (fret 2)"
                  },
                  {
                    "id": "gd-06-c",
                    "nama": "Pindah antar chord barre"
                  },
                  {
                    "id": "gd-06-d",
                    "nama": "Kombinasi open chord & barre"
                  }
                ]
              },
              {
                "id": "gd-07",
                "nama": "Fingerpicking Dasar",
                "sub": [
                  {
                    "id": "gd-07-a",
                    "nama": "PIMA pattern"
                  },
                  {
                    "id": "gd-07-b",
                    "nama": "Travis picking (thumb pattern)"
                  },
                  {
                    "id": "gd-07-c",
                    "nama": "Fingerpicking dengan chord sederhana"
                  },
                  {
                    "id": "gd-07-d",
                    "nama": "Arpeggio fingerstyle"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "gd-08",
                "nama": "Alternate Picking Lanjutan",
                "sub": [
                  {
                    "id": "gd-08-a",
                    "nama": "Cross-string picking"
                  },
                  {
                    "id": "gd-08-b",
                    "nama": "String skipping"
                  },
                  {
                    "id": "gd-08-c",
                    "nama": "Economy picking dasar"
                  },
                  {
                    "id": "gd-08-d",
                    "nama": "Picking dengan metronome"
                  }
                ]
              },
              {
                "id": "gd-09",
                "nama": "Legato & Bending",
                "sub": [
                  {
                    "id": "gd-09-a",
                    "nama": "Hammer-on & pull-off"
                  },
                  {
                    "id": "gd-09-b",
                    "nama": "Full bend, half bend, pre-bend"
                  },
                  {
                    "id": "gd-09-c",
                    "nama": "Slide (legato slide & shift slide)"
                  },
                  {
                    "id": "gd-09-d",
                    "nama": "Vibrato dasar (finger vibrato)"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "gd-10",
                "nama": "Sweep Picking Dasar",
                "sub": [
                  {
                    "id": "gd-10-a",
                    "nama": "3-string arpeggio sweep"
                  },
                  {
                    "id": "gd-10-b",
                    "nama": "5-string arpeggio sweep"
                  },
                  {
                    "id": "gd-10-c",
                    "nama": "Sweep dengan metronome"
                  },
                  {
                    "id": "gd-10-d",
                    "nama": "Kombinasi sweep & alternate picking"
                  }
                ]
              },
              {
                "id": "gd-11",
                "nama": "Speed & Control",
                "sub": [
                  {
                    "id": "gd-11-a",
                    "nama": "Chromatic speed exercise"
                  },
                  {
                    "id": "gd-11-b",
                    "nama": "Sequential pattern (1234)"
                  },
                  {
                    "id": "gd-11-c",
                    "nama": "Sequence naik turun fretboard"
                  },
                  {
                    "id": "gd-11-d",
                    "nama": "Main dengan metronome (60 ke 200 bpm)"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Scales & Melody": {
        "order": 2,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "gs-01",
                "nama": "Major Scale (Pattern 1)",
                "sub": [
                  {
                    "id": "gs-01-a",
                    "nama": "C major scale (posisi open)"
                  },
                  {
                    "id": "gs-01-b",
                    "nama": "G major scale"
                  },
                  {
                    "id": "gs-01-c",
                    "nama": "F major scale"
                  },
                  {
                    "id": "gs-01-d",
                    "nama": "Main naik turun dengan picking konsisten"
                  }
                ]
              },
              {
                "id": "gs-02",
                "nama": "Pentatonic Minor Scale",
                "sub": [
                  {
                    "id": "gs-02-a",
                    "nama": "A minor pentatonic (box 1)"
                  },
                  {
                    "id": "gs-02-b",
                    "nama": "Main naik turun pelan"
                  },
                  {
                    "id": "gs-02-c",
                    "nama": "Tambahkan hammer-on & pull-off"
                  },
                  {
                    "id": "gs-02-d",
                    "nama": "Main bersama backing track"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "gs-03",
                "nama": "Major Scale Shapes (CAGED)",
                "sub": [
                  {
                    "id": "gs-03-a",
                    "nama": "C shape, A shape, G shape, E shape, D shape"
                  },
                  {
                    "id": "gs-03-b",
                    "nama": "Hubungkan antar shape"
                  },
                  {
                    "id": "gs-03-c",
                    "nama": "Main di semua posisi"
                  }
                ]
              },
              {
                "id": "gs-04",
                "nama": "Pentatonic Major Scale",
                "sub": [
                  {
                    "id": "gs-04-a",
                    "nama": "C major pentatonic shape"
                  },
                  {
                    "id": "gs-04-b",
                    "nama": "Kaitkan dengan minor pentatonic"
                  },
                  {
                    "id": "gs-04-c",
                    "nama": "Main melodi sederhana"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "gs-05",
                "nama": "Minor Scale Shapes",
                "sub": [
                  {
                    "id": "gs-05-a",
                    "nama": "Natural minor (Aeolian)"
                  },
                  {
                    "id": "gs-05-b",
                    "nama": "Harmonic minor"
                  },
                  {
                    "id": "gs-05-c",
                    "nama": "Melodic minor"
                  }
                ]
              },
              {
                "id": "gs-06",
                "nama": "Blues Scale",
                "sub": [
                  {
                    "id": "gs-06-a",
                    "nama": "A minor blues scale"
                  },
                  {
                    "id": "gs-06-b",
                    "nama": "Blues phrasing dasar"
                  },
                  {
                    "id": "gs-06-c",
                    "nama": "Bending & vibrato dalam blues"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "gs-07",
                "nama": "Modes (Ionian, Dorian, Phrygian)",
                "sub": [
                  {
                    "id": "gs-07-a",
                    "nama": "Ionian (mayor) pattern"
                  },
                  {
                    "id": "gs-07-b",
                    "nama": "Dorian pattern & feel"
                  },
                  {
                    "id": "gs-07-c",
                    "nama": "Phrygian pattern & feel"
                  }
                ]
              },
              {
                "id": "gs-08",
                "nama": "Modes (Lydian - Locrian)",
                "sub": [
                  {
                    "id": "gs-08-a",
                    "nama": "Lydian, Mixolydian, Aeolian, Locrian"
                  },
                  {
                    "id": "gs-08-b",
                    "nama": "Main di seluruh fretboard"
                  },
                  {
                    "id": "gs-08-c",
                    "nama": "Aplikasi modes ke lagu"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "gs-09",
                "nama": "Speed Scale Runs",
                "sub": [
                  {
                    "id": "gs-09-a",
                    "nama": "3-note per string sequences"
                  },
                  {
                    "id": "gs-09-b",
                    "nama": "Sequential patterns for speed"
                  },
                  {
                    "id": "gs-09-c",
                    "nama": "Kombinasi across the neck"
                  }
                ]
              },
              {
                "id": "gs-10",
                "nama": "Improvisasi",
                "sub": [
                  {
                    "id": "gs-10-a",
                    "nama": "Improvisasi dengan pentatonic"
                  },
                  {
                    "id": "gs-10-b",
                    "nama": "Target tones (chord tones)"
                  },
                  {
                    "id": "gs-10-c",
                    "nama": "Improvisasi modal"
                  },
                  {
                    "id": "gs-10-d",
                    "nama": "Impro bersama backing track"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Chords & Rhythm": {
        "order": 3,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "gc-01",
                "nama": "Chord Family Dasar",
                "sub": [
                  {
                    "id": "gc-01-a",
                    "nama": "Family chord C (C, Dm, Em, F, G, Am)"
                  },
                  {
                    "id": "gc-01-b",
                    "nama": "Family chord G (G, Am, Bm, C, D, Em)"
                  },
                  {
                    "id": "gc-01-c",
                    "nama": "Pindah antar family chord"
                  }
                ]
              },
              {
                "id": "gc-02",
                "nama": "Common Progressions",
                "sub": [
                  {
                    "id": "gc-02-a",
                    "nama": "I-IV-V (C-F-G)"
                  },
                  {
                    "id": "gc-02-b",
                    "nama": "I-V-vi-IV (C-G-Am-F)"
                  },
                  {
                    "id": "gc-02-c",
                    "nama": "ii-V-I (Dm-G7-C)"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "gc-03",
                "nama": "Chord Variations",
                "sub": [
                  {
                    "id": "gc-03-a",
                    "nama": "Sus2 & Sus4 chords"
                  },
                  {
                    "id": "gc-03-b",
                    "nama": "Add9 chords"
                  },
                  {
                    "id": "gc-03-c",
                    "nama": "Chord voicing berbeda"
                  }
                ]
              },
              {
                "id": "gc-04",
                "nama": "Rhythm Patterns",
                "sub": [
                  {
                    "id": "gc-04-a",
                    "nama": "Reggae strumming pattern"
                  },
                  {
                    "id": "gc-04-b",
                    "nama": "Funk strumming (16th notes)"
                  },
                  {
                    "id": "gc-04-c",
                    "nama": "Waltz pattern (3/4)"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "gc-05",
                "nama": "Jazz Chords Dasar",
                "sub": [
                  {
                    "id": "gc-05-a",
                    "nama": "Maj7, Dom7, Min7 shapes"
                  },
                  {
                    "id": "gc-05-b",
                    "nama": "Drop 2 voicing dasar"
                  },
                  {
                    "id": "gc-05-c",
                    "nama": "Jazz progression (ii-V-I)"
                  }
                ]
              },
              {
                "id": "gc-06",
                "nama": "Chord Melody Dasar",
                "sub": [
                  {
                    "id": "gc-06-a",
                    "nama": "Melodi + chord sederhana"
                  },
                  {
                    "id": "gc-06-b",
                    "nama": "Chord melody arrangement"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "gc-07",
                "nama": "Extended Chords",
                "sub": [
                  {
                    "id": "gc-07-a",
                    "nama": "9th, 11th, 13th chords"
                  },
                  {
                    "id": "gc-07-b",
                    "nama": "Altered dominants"
                  },
                  {
                    "id": "gc-07-c",
                    "nama": "Voicing & comping"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "gc-08",
                "nama": "Advanced Rhythm",
                "sub": [
                  {
                    "id": "gc-08-a",
                    "nama": "Syncopation lanjutan"
                  },
                  {
                    "id": "gc-08-b",
                    "nama": "Polyrhythm"
                  },
                  {
                    "id": "gc-08-c",
                    "nama": "Odd time signature (5/4, 7/8)"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Teori & Harmoni": {
        "order": 4,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "gt-01",
                "nama": "Dasar Notasi Gitar",
                "sub": [
                  {
                    "id": "gt-01-a",
                    "nama": "Baca tabulasi gitar (tab)"
                  },
                  {
                    "id": "gt-01-b",
                    "nama": "Nama senar (E-A-D-G-B-E)"
                  },
                  {
                    "id": "gt-01-c",
                    "nama": "Not di fretboard"
                  }
                ]
              },
              {
                "id": "gt-02",
                "nama": "Interval di Fretboard",
                "sub": [
                  {
                    "id": "gt-02-a",
                    "nama": "Unison, second, third"
                  },
                  {
                    "id": "gt-02-b",
                    "nama": "Fourth, fifth, octave"
                  },
                  {
                    "id": "gt-02-c",
                    "nama": "Cari interval di fretboard"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "gt-03",
                "nama": "Chord Construction",
                "sub": [
                  {
                    "id": "gt-03-a",
                    "nama": "Triad mayor & minor"
                  },
                  {
                    "id": "gt-03-b",
                    "nama": "Sus, dim, aug chords"
                  },
                  {
                    "id": "gt-03-c",
                    "nama": "Cari chord shapes sendiri"
                  }
                ]
              },
              {
                "id": "gt-04",
                "nama": "Circle of Fifths",
                "sub": [
                  {
                    "id": "gt-04-a",
                    "nama": "Key signature & family chord"
                  },
                  {
                    "id": "gt-04-b",
                    "nama": "Circle progression di gitar"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "gt-05",
                "nama": "Chord Function",
                "sub": [
                  {
                    "id": "gt-05-a",
                    "nama": "Tonic, dominant, subdominant"
                  },
                  {
                    "id": "gt-05-b",
                    "nama": "Secondary dominants"
                  },
                  {
                    "id": "gt-05-c",
                    "nama": "Modal interchange"
                  }
                ]
              },
              {
                "id": "gt-06",
                "nama": "Harmonic Analysis",
                "sub": [
                  {
                    "id": "gt-06-a",
                    "nama": "Analisis progresi lagu"
                  },
                  {
                    "id": "gt-06-b",
                    "nama": "Reharmonization dasar"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "gt-07",
                "nama": "Ear Training",
                "sub": [
                  {
                    "id": "gt-07-a",
                    "nama": "Interval recognition"
                  },
                  {
                    "id": "gt-07-b",
                    "nama": "Chord progression by ear"
                  },
                  {
                    "id": "gt-07-c",
                    "nama": "Transcribe melodi sederhana"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "gt-08",
                "nama": "Composition & Arranging",
                "sub": [
                  {
                    "id": "gt-08-a",
                    "nama": "Write chord progression"
                  },
                  {
                    "id": "gt-08-b",
                    "nama": "Arrange for solo guitar"
                  },
                  {
                    "id": "gt-08-c",
                    "nama": "Fingerstyle arrangement"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Repertoire": {
        "order": 5,
        "type": "song_based",
        "stages": [
          {
            "id": "gr-1",
            "nama": "Sight-read (tab)"
          },
          {
            "id": "gr-2",
            "nama": "Belajar (notes & fingering)"
          },
          {
            "id": "gr-3",
            "nama": "Hapal (memory)"
          },
          {
            "id": "gr-4",
            "nama": "Polish (dynamics, tempo, expression)"
          },
          {
            "id": "gr-5",
            "nama": "Performance ready (full run-through)"
          }
        ]
      }
    },
  "Drum": {
      "Rudiments": {
        "order": 1,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "dr-01",
                "nama": "Stick Grip & Postur",
                "sub": [
                  {
                    "id": "dr-01-a",
                    "nama": "Matched grip (German, French, American)"
                  },
                  {
                    "id": "dr-01-b",
                    "nama": "Postur duduk di drum throne"
                  },
                  {
                    "id": "dr-01-c",
                    "nama": "Foot position di pedal"
                  }
                ]
              },
              {
                "id": "dr-02",
                "nama": "Single Stroke Roll",
                "sub": [
                  {
                    "id": "dr-02-a",
                    "nama": "Single stroke (RLRL) pelan"
                  },
                  {
                    "id": "dr-02-b",
                    "nama": "Tambah tempo bertahap"
                  },
                  {
                    "id": "dr-02-c",
                    "nama": "Accent pattern (RlRl)"
                  }
                ]
              },
              {
                "id": "dr-03",
                "nama": "Double Stroke Roll",
                "sub": [
                  {
                    "id": "dr-03-a",
                    "nama": "Double stroke (RRLL) pelan"
                  },
                  {
                    "id": "dr-03-b",
                    "nama": "Open roll vs closed roll"
                  },
                  {
                    "id": "dr-03-c",
                    "nama": "Tambah tempo bertahap"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "dr-04",
                "nama": "Paradiddle",
                "sub": [
                  {
                    "id": "dr-04-a",
                    "nama": "Single paradiddle (RLRR LRLL)"
                  },
                  {
                    "id": "dr-04-b",
                    "nama": "Double paradiddle (RLRLRR LRLRLL)"
                  },
                  {
                    "id": "dr-04-c",
                    "nama": "Paradiddle-diddle (RLRRLL)"
                  }
                ]
              },
              {
                "id": "dr-05",
                "nama": "Flam Rudiments",
                "sub": [
                  {
                    "id": "dr-05-a",
                    "nama": "Flam (lrL / rlR)"
                  },
                  {
                    "id": "dr-05-b",
                    "nama": "Flam accent"
                  },
                  {
                    "id": "dr-05-c",
                    "nama": "Flam tap"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "dr-06",
                "nama": "Drag Rudiments",
                "sub": [
                  {
                    "id": "dr-06-a",
                    "nama": "Drag (llR / rrL)"
                  },
                  {
                    "id": "dr-06-b",
                    "nama": "Double drag tap"
                  },
                  {
                    "id": "dr-06-c",
                    "nama": "Lesson 25"
                  }
                ]
              },
              {
                "id": "dr-07",
                "nama": "Diddle Combinations",
                "sub": [
                  {
                    "id": "dr-07-a",
                    "nama": "Swiss army triplet (RLL RLL)"
                  },
                  {
                    "id": "dr-07-b",
                    "nama": "Inverted paradiddle"
                  },
                  {
                    "id": "dr-07-c",
                    "nama": "Pataflafla"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "dr-08",
                "nama": "Advanced Rolls",
                "sub": [
                  {
                    "id": "dr-08-a",
                    "nama": "Triple stroke roll"
                  },
                  {
                    "id": "dr-08-b",
                    "nama": "Buzz roll (closed roll)"
                  },
                  {
                    "id": "dr-08-c",
                    "nama": "Dynamic rolls (ppp ke fff)"
                  }
                ]
              },
              {
                "id": "dr-09",
                "nama": "Hybrid Rudiments",
                "sub": [
                  {
                    "id": "dr-09-a",
                    "nama": "Cheese, inverted flam tap"
                  },
                  {
                    "id": "dr-09-b",
                    "nama": "Flam drag, flam paradiddle"
                  },
                  {
                    "id": "dr-09-c",
                    "nama": "Aplikasi ke groove"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "dr-10",
                "nama": "Speed Rudiments",
                "sub": [
                  {
                    "id": "dr-10-a",
                    "nama": "All rudiments at tempo 120+ bpm"
                  },
                  {
                    "id": "dr-10-b",
                    "nama": "Around the drum set"
                  },
                  {
                    "id": "dr-10-c",
                    "nama": "Dynamic control at speed"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Groove & Timing": {
        "order": 2,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "dg-01",
                "nama": "Basic Rock Beat",
                "sub": [
                  {
                    "id": "dg-01-a",
                    "nama": "Kick on 1 & 3, Snare on 2 & 4"
                  },
                  {
                    "id": "dg-01-b",
                    "nama": "Hi-hat 8th notes"
                  },
                  {
                    "id": "dg-01-c",
                    "nama": "Tambah kick pattern variasi"
                  }
                ]
              },
              {
                "id": "dg-02",
                "nama": "Quarter Note Groove",
                "sub": [
                  {
                    "id": "dg-02-a",
                    "nama": "Hi-hat quarter notes"
                  },
                  {
                    "id": "dg-02-b",
                    "nama": "Kick pattern sederhana"
                  },
                  {
                    "id": "dg-02-c",
                    "nama": "Main dengan metronome"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "dg-03",
                "nama": "8th Note Groove Variations",
                "sub": [
                  {
                    "id": "dg-03-a",
                    "nama": "Variasi kick drum"
                  },
                  {
                    "id": "dg-03-b",
                    "nama": "Ghost notes snare"
                  },
                  {
                    "id": "dg-03-c",
                    "nama": "Open hi-hat technique"
                  }
                ]
              },
              {
                "id": "dg-04",
                "nama": "16th Note Groove",
                "sub": [
                  {
                    "id": "dg-04-a",
                    "nama": "Hi-hat 16th notes"
                  },
                  {
                    "id": "dg-04-b",
                    "nama": "16th note kick patterns"
                  },
                  {
                    "id": "dg-04-c",
                    "nama": "Kombinasi snare & kick"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "dg-05",
                "nama": "Shuffle & Swing",
                "sub": [
                  {
                    "id": "dg-05-a",
                    "nama": "Shuffle feel (triplet based)"
                  },
                  {
                    "id": "dg-05-b",
                    "nama": "Half-time shuffle"
                  },
                  {
                    "id": "dg-05-c",
                    "nama": "Swing vs straight feel"
                  }
                ]
              },
              {
                "id": "dg-06",
                "nama": "Funk Groove",
                "sub": [
                  {
                    "id": "dg-06-a",
                    "nama": "16th note feel"
                  },
                  {
                    "id": "dg-06-b",
                    "nama": "Syncopated kick patterns"
                  },
                  {
                    "id": "dg-06-c",
                    "nama": "Ghost notes & dynamics"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "dg-07",
                "nama": "Triplet Groove",
                "sub": [
                  {
                    "id": "dg-07-a",
                    "nama": "6/8 feel"
                  },
                  {
                    "id": "dg-07-b",
                    "nama": "12/8 feel"
                  },
                  {
                    "id": "dg-07-c",
                    "nama": "Half-time feel"
                  }
                ]
              },
              {
                "id": "dg-08",
                "nama": "Latin Groove",
                "sub": [
                  {
                    "id": "dg-08-a",
                    "nama": "Bossa nova beat"
                  },
                  {
                    "id": "dg-08-b",
                    "nama": "Samba pattern"
                  },
                  {
                    "id": "dg-08-c",
                    "nama": "Cha-cha pattern"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "dg-09",
                "nama": "Odd Time Groove",
                "sub": [
                  {
                    "id": "dg-09-a",
                    "nama": "5/4 groove"
                  },
                  {
                    "id": "dg-09-b",
                    "nama": "7/8 groove"
                  },
                  {
                    "id": "dg-09-c",
                    "nama": "Polymeter"
                  }
                ]
              },
              {
                "id": "dg-10",
                "nama": "Advanced Groove Concepts",
                "sub": [
                  {
                    "id": "dg-10-a",
                    "nama": "Metric modulation"
                  },
                  {
                    "id": "dg-10-b",
                    "nama": "Linear drumming"
                  },
                  {
                    "id": "dg-10-c",
                    "nama": "Open-handed playing"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Independence": {
        "order": 3,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "di-01",
                "nama": "Limb Separation Dasar",
                "sub": [
                  {
                    "id": "di-01-a",
                    "nama": "Right hand & kick bersama"
                  },
                  {
                    "id": "di-01-b",
                    "nama": "Right hand & snare bersama"
                  },
                  {
                    "id": "di-01-c",
                    "nama": "Kick & snare pattern"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "di-02",
                "nama": "Three-Limb Coordination",
                "sub": [
                  {
                    "id": "di-02-a",
                    "nama": "RH hi-hat + LH snare + RF kick"
                  },
                  {
                    "id": "di-02-b",
                    "nama": "Satu limb independen"
                  },
                  {
                    "id": "di-02-c",
                    "nama": "Tambahkan variasi kick"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "di-03",
                "nama": "Four-Limb Coordination",
                "sub": [
                  {
                    "id": "di-03-a",
                    "nama": "Hi-hat foot + hands + kick"
                  },
                  {
                    "id": "di-03-b",
                    "nama": "All limbs different patterns"
                  },
                  {
                    "id": "di-03-c",
                    "nama": "Ostinato patterns"
                  }
                ]
              },
              {
                "id": "di-04",
                "nama": "Independence Exercises",
                "sub": [
                  {
                    "id": "di-04-a",
                    "nama": "Stick control applied to set"
                  },
                  {
                    "id": "di-04-b",
                    "nama": "Syncopation exercise (Ted Reed)"
                  },
                  {
                    "id": "di-04-c",
                    "nama": "Pattern displacement"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "di-05",
                "nama": "Advanced Coordination",
                "sub": [
                  {
                    "id": "di-05-a",
                    "nama": "Polyrhythm (3:2, 4:3)"
                  },
                  {
                    "id": "di-05-b",
                    "nama": "Ostinato with fills"
                  },
                  {
                    "id": "di-05-c",
                    "nama": "Dynamic independence"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "di-06",
                "nama": "Mastery",
                "sub": [
                  {
                    "id": "di-06-a",
                    "nama": "All limb independence over odd time"
                  },
                  {
                    "id": "di-06-b",
                    "nama": "Sight-read & play complex patterns"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Teori & Notasi Drum": {
        "order": 4,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "dth-01",
                "nama": "Notasi Drum Dasar",
                "sub": [
                  {
                    "id": "dth-01-a",
                    "nama": "Baca notasi drum (snare, kick, hi-hat)"
                  },
                  {
                    "id": "dth-01-b",
                    "nama": "Time signature (4/4, 3/4)"
                  },
                  {
                    "id": "dth-01-c",
                    "nama": "Note values (quarter, 8th, 16th)"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "dth-02",
                "nama": "Dinamika & Artikulasi",
                "sub": [
                  {
                    "id": "dth-02-a",
                    "nama": "Accent & tap notation"
                  },
                  {
                    "id": "dth-02-b",
                    "nama": "Dynamic markings (ppp ke fff)"
                  },
                  {
                    "id": "dth-02-c",
                    "nama": "Ghost note notation"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "dth-03",
                "nama": "Gaya & Genre Musik",
                "sub": [
                  {
                    "id": "dth-03-a",
                    "nama": "Rock, pop, funk characteristics"
                  },
                  {
                    "id": "dth-03-b",
                    "nama": "Jazz, latin characteristics"
                  },
                  {
                    "id": "dth-03-c",
                    "nama": "Metal, fusion characteristics"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "dth-04",
                "nama": "Arranging untuk Drum",
                "sub": [
                  {
                    "id": "dth-04-a",
                    "nama": "Song structure & dynamics"
                  },
                  {
                    "id": "dth-04-b",
                    "nama": "Fill placement & vocabulary"
                  },
                  {
                    "id": "dth-04-c",
                    "nama": "Intro, bridge, ending patterns"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "dth-05",
                "nama": "Transcribing & Analysis",
                "sub": [
                  {
                    "id": "dth-05-a",
                    "nama": "Transcribe drum part dari lagu"
                  },
                  {
                    "id": "dth-05-b",
                    "nama": "Analyze famous drummers"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Fills & Soloing": {
        "order": 5,
        "levels": [
          {
            "level": 1,
            "items": [
              {
                "id": "df-01",
                "nama": "Basic Fills",
                "sub": [
                  {
                    "id": "df-01-a",
                    "nama": "1-bar fill (quarter notes)"
                  },
                  {
                    "id": "df-01-b",
                    "nama": "1-bar fill (8th notes)"
                  },
                  {
                    "id": "df-01-c",
                    "nama": "Fill menuju downbeat"
                  }
                ]
              }
            ]
          },
          {
            "level": 2,
            "items": [
              {
                "id": "df-02",
                "nama": "8th Note Fills",
                "sub": [
                  {
                    "id": "df-02-a",
                    "nama": "8th note tom patterns"
                  },
                  {
                    "id": "df-02-b",
                    "nama": "Around the drum set"
                  },
                  {
                    "id": "df-02-c",
                    "nama": "Kombinasi snare & tom"
                  }
                ]
              }
            ]
          },
          {
            "level": 3,
            "items": [
              {
                "id": "df-03",
                "nama": "16th Note Fills",
                "sub": [
                  {
                    "id": "df-03-a",
                    "nama": "16th note patterns"
                  },
                  {
                    "id": "df-03-b",
                    "nama": "Accent patterns in fills"
                  },
                  {
                    "id": "df-03-c",
                    "nama": "Linear fills"
                  }
                ]
              },
              {
                "id": "df-04",
                "nama": "Soloing Concepts",
                "sub": [
                  {
                    "id": "df-04-a",
                    "nama": "Phrasing & dynamics"
                  },
                  {
                    "id": "df-04-b",
                    "nama": "Call & response"
                  },
                  {
                    "id": "df-04-c",
                    "nama": "Build & release tension"
                  }
                ]
              }
            ]
          },
          {
            "level": 4,
            "items": [
              {
                "id": "df-05",
                "nama": "Advanced Fills",
                "sub": [
                  {
                    "id": "df-05-a",
                    "nama": "Odd grouping fills (3, 5, 7)"
                  },
                  {
                    "id": "df-05-b",
                    "nama": "Displacement fills"
                  },
                  {
                    "id": "df-05-c",
                    "nama": "Mixing rudiments into fills"
                  }
                ]
              }
            ]
          },
          {
            "level": 5,
            "items": [
              {
                "id": "df-06",
                "nama": "Solo Mastery",
                "sub": [
                  {
                    "id": "df-06-a",
                    "nama": "Structured solo over form"
                  },
                  {
                    "id": "df-06-b",
                    "nama": "Trading 4s & 8s"
                  },
                  {
                    "id": "df-06-c",
                    "nama": "Solo dengan dynamic range luas"
                  }
                ]
              }
            ]
          }
        ]
      },
      "Repertoire": {
        "order": 6,
        "type": "song_based",
        "stages": [
          {
            "id": "drep-1",
            "nama": "Sight-read (notasi)"
          },
          {
            "id": "drep-2",
            "nama": "Belajar (bagian per bagian)"
          },
          {
            "id": "drep-3",
            "nama": "Hapal (memory)"
          },
          {
            "id": "drep-4",
            "nama": "Polish (dynamics, tempo, feel)"
          },
          {
            "id": "drep-5",
            "nama": "Performance ready"
          }
        ]
      }
    }
};
