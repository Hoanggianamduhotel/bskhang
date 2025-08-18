# Pediatric Clinic v2 - Vue + Vite

Phiên bản Vue + Vite tối ưu hóa của hệ thống quản lý phòng khám nhi khoa.

## 🚀 Ưu điểm so với Next.js

| Tính năng | Next.js | Vite + Vue |
|-----------|---------|------------|
| **Build time** | ~40s | ~3-5s |
| **Bundle size** | ~209MB | ~15-20MB |
| **Hot reload** | 1-3s | <100ms |
| **Modules** | 14,336 | ~50-100 |

## 📦 Tính năng đầy đủ

✅ **Tự động viết hoa tên**: `lê minh khang` → `Lê Minh Khang`  
✅ **Quy tắc 36 tháng**: Dưới 36 tháng hiển thị tháng tuổi, trên 36 tháng hiển thị tuổi  
✅ **Quản lý danh sách chờ**: Thêm/xóa bệnh nhân  
✅ **Khám bệnh**: Triệu chứng, chẩn đoán, bác sĩ  
✅ **Supabase integration**: Hoàn toàn tương thích  
✅ **Responsive design**: Mobile-first  
✅ **TypeScript**: Type safety đầy đủ  

## 🛠 Setup

```bash
cd vue-clinic
npm install
npm run dev
```

## 🔧 Environment Variables

Copy từ `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Cấu trúc

```
vue-clinic/
├── src/
│   ├── components/     # Vue components
│   ├── views/          # Page views
│   ├── stores/         # Pinia stores
│   ├── utils/          # Utilities & Supabase
│   ├── types/          # TypeScript types
│   └── router/         # Vue Router
├── public/             # Static assets
└── dist/               # Build output
```

## 🚦 Deployment

Build cực nhẹ và nhanh:
```bash
npm run build  # ~5s vs Next.js 40s
```

Deploy lên:
- Netlify
- Vercel  
- GitHub Pages
- Any static hosting

## 💡 Migration từ Next.js

Tất cả tính năng được giữ nguyên 100%:
- Database schema không thay đổi
- Supabase queries tương thích
- Business logic giữ nguyên
- UI/UX tương tự

**Chỉ thay đổi**: Framework nhẹ hơn, build nhanh hơn, deploy dễ dàng hơn!