-- Tạo view v_toaduocsi để hỗ trợ tính năng thống kê thuốc với đầy đủ thông tin
CREATE OR REPLACE VIEW v_toaduocsi AS
SELECT 
    tt.khambenh_id,
    p.ho_ten as ten_benhnhan,
    kb.ngay_kham as ngaytoa,
    kb.chan_doan,
    kb.benhnhan_id,
    tt.thuoc_id,
    t.ten_thuoc,
    tt.so_lan_dung,
    tt.so_luong_moi_lan,
    tt.tong_so_luong,
    tt.so_luong_moi_lan as so_luong,
    t.duong_dung as dang_dung
FROM toathuoc tt
JOIN khambenh kb ON tt.khambenh_id = kb.id
JOIN patients p ON kb.benhnhan_id = p.id
JOIN thuoc t ON tt.thuoc_id = t.id;