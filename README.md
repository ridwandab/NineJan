# 🚀 NineJan - Social Media App

Aplikasi sosial media modern yang dibangun dengan Next.js, Prisma, dan PostgreSQL.

## ✨ Fitur

- ✅ **Authentication** - Login dan Register dengan email/password
- ✅ **Feed** - Lihat post dari user yang kamu follow
- ✅ **Explore** - Lihat semua post dari semua user
- ✅ **Create Post** - Buat post baru dengan gambar
- ✅ **Like & Comment** - Interaksi dengan post
- ✅ **Follow** - Follow dan unfollow user
- ✅ **Profile** - Lihat profil user dan post mereka
- ✅ **Search** - Cari user dan post

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT

## 📋 Setup

### **1. Clone Repository**

```bash
git clone https://github.com/ridwandab/NineJan.git
cd ninejan-apk
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Database**

Database sudah dikonfigurasi dengan Neon (PostgreSQL). Environment variables sudah di-set di Vercel.

### **4. Run Development Server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🌐 Production

Aplikasi sudah di-deploy di Vercel:
- **URL**: https://nine-jan-git-main-ridwans-projects-1ccd5935.vercel.app

## 📱 Cara Menggunakan

### **1. Buat Akun**

1. Buka aplikasi
2. Klik **"Sign up"**
3. Isi form:
   - Email: (contoh: `test@example.com`)
   - Username: (contoh: `testuser`)
   - Name: (contoh: `Test User`)
   - Password: (minimal 6 karakter)
4. Klik **"Sign Up"**

### **2. Login**

1. Buka aplikasi
2. Isi email dan password
3. Klik **"Sign In"**

### **3. Gunakan Aplikasi**

- **Home** - Lihat feed dan explore post
- **Feed** - Post dari user yang kamu follow
- **Explore** - Semua post dari semua user
- **Profile** - Lihat profil kamu dan post kamu
- **Settings** - Edit profil kamu

## 🎨 Logo & Branding

Logo aplikasi menggunakan **NineJan logo.png** yang tersedia di folder `public/`.

## 📝 Environment Variables

Environment variables sudah di-set di Vercel:

```
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT License

---

**Dibuat dengan ❤️ oleh Ridwan**
