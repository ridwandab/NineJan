# 🚀 Deploy NineJan ke Vercel - Panduan Lengkap

## 📋 Prerequisites

- Akun GitHub (gratis)
- Akun Vercel (gratis) - https://vercel.com/signup
- Code aplikasi NineJan

---

## 🌐 Cara 1: Deploy via Vercel Web (RECOMMENDED)

### **STEP 1: Push Code ke GitHub**

1. **Buat repository baru di GitHub**:
   - Buka: https://github.com/new
   - Repository name: `ninejan`
   - Description: `Social Media App`
   - Pilih **Public**
   - **JANGAN** centang "Initialize this repository with a README"
   - Klik **"Create repository"**

2. **Push code ke GitHub**:

```bash
# Di terminal, jalankan:
git add .
git commit -m "Initial commit - NineJan Social Media App"
git branch -M main
git remote add origin https://github.com/USERNAME/ninejan.git
git push -u origin main
```

*(Ganti `USERNAME` dengan username GitHub Anda)*

---

### **STEP 2: Deploy ke Vercel**

1. **Buka Vercel**: https://vercel.com/
2. **Login** dengan GitHub account Anda
3. Klik **"Add New..."** → **"Project"**
4. **Import** repository `ninejan` Anda
5. **Configure Project**:
   - Framework Preset: **Next.js** (otomatis terdeteksi)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Environment Variables** - Klik "Environment Variables" dan tambahkan:

   ```
   DATABASE_URL=file:./dev.db
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
   NODE_ENV=production
   UPLOAD_DIR=./public/uploads
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

   **PENTING:** Ganti nilai environment variables dengan nilai yang sesuai!

7. Klik **"Deploy"**

8. **Tunggu 2-3 menit** sampai deploy selesai

9. **Done!** 🎉 Aplikasi Anda live di: `https://your-app.vercel.app`

---

## 💻 Cara 2: Deploy via Vercel CLI

### **STEP 1: Install Vercel CLI**

```bash
npm install -g vercel
```

### **STEP 2: Login ke Vercel**

```bash
vercel login
```

Ikuti instruksi untuk login via browser.

### **STEP 3: Deploy**

```bash
vercel
```

Ikuti prompt:
- Set up and deploy? **Y**
- Which scope? **Pilih akun Anda**
- Link to existing project? **N**
- What's your project's name? **ninejan**
- In which directory is your code located? **./**
- Want to override settings? **N**

### **STEP 4: Set Environment Variables**

```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add JWT_REFRESH_SECRET
# ... (dan seterusnya untuk semua env vars)
```

### **STEP 5: Deploy to Production**

```bash
vercel --prod
```

---

## ⚙️ Konfigurasi Environment Variables

Tambahkan environment variables berikut di Vercel Dashboard:

### **Database**
```
DATABASE_URL=file:./dev.db
```

### **JWT Secrets**
```
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
```

### **Google OAuth**
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### **NextAuth**
```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret
```

### **Other**
```
NODE_ENV=production
UPLOAD_DIR=./public/uploads
```

---

## 🔧 Post-Deployment Setup

### **1. Update Google OAuth Redirect URI**

Setelah deploy, update redirect URI di Google Cloud Console:

1. Buka: https://console.cloud.google.com/
2. Pilih project Anda
3. Go to **APIs & Services** → **Credentials**
4. Edit OAuth 2.0 Client
5. Tambahkan **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/google
   ```
6. Save

### **2. Update NEXTAUTH_URL**

Setelah deploy, update `NEXTAUTH_URL` di Vercel Dashboard:
```
NEXTAUTH_URL=https://your-app.vercel.app
```

### **3. Redeploy**

Setelah update environment variables, redeploy:
- Via Web: Klik "Redeploy" di Vercel Dashboard
- Via CLI: `vercel --prod`

---

## 🐛 Troubleshooting

### ❌ Build Failed: "Module not found"
**Solusi:** Pastikan semua dependencies ada di `package.json`

### ❌ Build Failed: "Environment variable not found"
**Solusi:** Tambahkan semua environment variables di Vercel Dashboard

### ❌ Runtime Error: "Database connection failed"
**Solusi:** 
- Untuk production, gunakan database eksternal (PostgreSQL, MySQL)
- SQLite tidak cocok untuk production di Vercel

### ❌ OAuth Error: "redirect_uri_mismatch"
**Solusi:** Update redirect URI di Google Console dengan URL Vercel

---

## 📝 Catatan Penting

### **Database untuk Production**

SQLite tidak cocok untuk production di Vercel (serverless). Gunakan:

1. **Vercel Postgres** (Recommended)
2. **Supabase** (Free tier available)
3. **PlanetScale** (Free tier available)
4. **Railway** (Free tier available)

### **File Upload**

Untuk production, gunakan:
- **Vercel Blob Storage**
- **AWS S3**
- **Cloudinary**
- **Uploadcare**

### **Environment Variables**

**JANGAN** commit file `.env` ke GitHub!
- Gunakan Vercel Dashboard untuk set environment variables
- File `.env` sudah ada di `.gitignore`

---

## ✅ Checklist Deployment

- [ ] Code pushed ke GitHub
- [ ] Vercel account created
- [ ] Project imported ke Vercel
- [ ] Environment variables configured
- [ ] Deploy successful
- [ ] Google OAuth redirect URI updated
- [ ] Test login berhasil
- [ ] Test create post berhasil
- [ ] Test upload image berhasil

---

## 🎉 Congratulations!

Aplikasi NineJan Anda sudah live di Vercel!

**URL:** `https://your-app.vercel.app`

**Next Steps:**
1. Share URL ke teman-teman
2. Custom domain (optional)
3. Setup database production (PostgreSQL)
4. Setup file storage (S3/Cloudinary)
5. Add analytics
6. Add monitoring

---

## 📞 Need Help?

Jika ada masalah saat deployment:
1. Check build logs di Vercel Dashboard
2. Check runtime logs
3. Verify environment variables
4. Check Google OAuth configuration
5. Contact Vercel support

---

**Happy Deploying! 🚀**

