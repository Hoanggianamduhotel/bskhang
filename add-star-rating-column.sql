-- Add star rating column to khambenh table
ALTER TABLE khambenh ADD COLUMN IF NOT EXISTS danh_gia_sao INTEGER CHECK (danh_gia_sao >= 1 AND danh_gia_sao <= 5);

-- Add comment to explain the column
COMMENT ON COLUMN khambenh.danh_gia_sao IS '1-5 star rating for treatment satisfaction';