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

  },
  "Drum": {

  }
};
