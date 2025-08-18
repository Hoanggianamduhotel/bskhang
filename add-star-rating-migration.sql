-- Add star rating column to khambenh table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'khambenh' 
        AND column_name = 'danh_gia_sao'
    ) THEN
        ALTER TABLE khambenh ADD COLUMN danh_gia_sao INTEGER CHECK (danh_gia_sao >= 1 AND danh_gia_sao <= 5);
        COMMENT ON COLUMN khambenh.danh_gia_sao IS '1-5 star rating for treatment satisfaction';
    END IF;
END $$;