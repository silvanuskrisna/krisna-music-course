-- Create student_progress table for tracking curriculum per student
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL,
  instrument TEXT NOT NULL,
  sub_item_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'belum' CHECK (status IN ('belum', 'diproses', 'selesai')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, sub_item_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_student_progress_student
  ON student_progress(student_id, instrument);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_student_progress_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_student_progress_updated ON student_progress;
CREATE TRIGGER trg_student_progress_updated
  BEFORE UPDATE ON student_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_student_progress_timestamp();
