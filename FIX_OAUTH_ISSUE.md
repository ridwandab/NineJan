# 🔧 Fix OAuth Login Issue - Panduan Lengkap

## 📋 Masalah yang Terjadi

Setelah login dengan Google, user tidak bisa masuk ke halaman beranda dan tetap kembali ke halaman login.

## 🔍 Root Cause

Error "Failed to get access token" dari Google OAuth API.

## ✅ Solusi Final

### **Langkah 1: Cek Environment Variables di Vercel**

1. Buka: https://vercel.com/dashboard
2. Pilih project **nine-jan**
3. Pergi ke **Settings** → **Environment Variables**
4. **HAPUS SEMUA** environment variables yang ada
5. **TAMBAHKAN LAGI** satu per satu dengan nilai yang benar:

```
DATABASE_URL = postgresql://neondb_owner:npg_gjcplOm3UW2o@ep-misty-firefly-a11bsgoz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

GOOGLE_CLIENT_ID = 1069221150035-j56e8gmhm571oshe6v60hf0gqcc250eq.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET = 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

NEXT_PUBLIC_GOOGLE_CLIENT_ID = 1069221150035-j56e8gmhm571oshe6v60hf0gqcc250eq.apps.googleusercontent.com

NEXTAUTH_URL = https://nine-jan-git-main-ridwans-projects-1ccd5935.vercel.app

JWT_SECRET = my_super_secret_jwt_key_12345

JWT_REFRESH_SECRET = my_refresh_secret_key_67890
```

**⚠️ PENTING:**
- Pastikan **TIDAK ADA SPASI** sebelum atau sesudah tanda `=`
- Pastikan **TIDAK ADA SLASH** di akhir `NEXTAUTH_URL`
- Set semua environment ke: ✅ Production, ✅ Preview, ✅ Development

### **Langkah 2: Cek Redirect URI di Google Cloud Console**

1. Buka: https://console.cloud.google.com/apis/credentials?project=ninejan
2. Klik pada **OAuth 2.0 Client ID** kamu
3. Scroll ke bagian **"Authorized redirect URIs"**
4. **HAPUS SEMUA** redirect URI yang ada
5. **TAMBAHKAN LAGI** satu per satu:

```
https://nine-jan-git-main-ridwans-projects-1ccd5935.vercel.app/api/auth/google
http://localhost:3000/api/auth/google
```

6. Klik **"Save"**

### **Langkah 3: Redeploy di Vercel**

1. Buka Vercel dashboard
2. Pergi ke tab **"Deployments"**
3. Klik **"..."** (three dots) pada deployment terbaru
4. Pilih **"Redeploy"**
5. Tunggu sampai selesai (sekitar 1-2 menit)

### **Langkah 4: Tunggu 5 Menit**

Setelah redeploy selesai, tunggu **5 menit** untuk:
- Google OAuth settings terpropagasi
- Environment variables ter-load dengan benar

### **Langkah 5: Test Login**

1. Buka aplikasi Vercel: https://nine-jan-git-main-ridwans-projects-1ccd5935.vercel.app
2. **Hard refresh browser** (tekan **Ctrl + Shift + R**)
3. Klik **"Continue with Google"**
4. Login dengan akun Google
5. Seharusnya sekarang akan redirect ke halaman beranda!

---

## 🔍 Troubleshooting

### **Kalau Masih Error:**

1. **Cek Runtime Logs:**
   - Buka Vercel dashboard → Deployments → Klik deployment terbaru → Logs
   - Coba login lagi
   - Copy semua logs yang muncul
   - Kirim ke developer untuk dianalisis

2. **Cek Environment Variables:**
   - Pastikan semua environment variables sudah di-set dengan benar
   - Pastikan tidak ada typo atau spasi ekstra

3. **Cek Redirect URI:**
   - Pastikan redirect URI di Google Cloud Console sudah benar
   - Pastikan tidak ada spasi di awal atau akhir

---

## ✅ Checklist Final:

- [ ] Environment variables sudah di-set di Vercel
- [ ] Redirect URI sudah ditambahkan di Google Cloud Console
- [ ] Aplikasi sudah di-redeploy
- [ ] Tunggu 5 menit
- [ ] Test login lagi
- [ ] Hard refresh browser

---

**Selamat mencoba!** 🚀

