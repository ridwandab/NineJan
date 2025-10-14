# 🔐 Setup Google OAuth - Panduan Lengkap

## ⚠️ Error yang Terjadi

Error **"invalid_client"** terjadi karena Google OAuth credentials belum dikonfigurasi dengan benar.

---

## 📋 Langkah-langkah Setup (Step by Step)

### **STEP 1: Buat Google Cloud Project**

1. Buka: https://console.cloud.google.com/
2. Klik **"Select a project"** di bagian atas
3. Klik **"New Project"**
4. Isi:
   - **Project name**: `NineJan` (atau nama lain)
5. Klik **"Create"**
6. Tunggu beberapa detik sampai project dibuat

---

### **STEP 2: Enable Google+ API**

1. Di sidebar kiri, klik **"APIs & Services"** → **"Library"**
2. Di search box, ketik: `Google+ API`
3. Klik **"Google+ API"**
4. Klik tombol **"Enable"**
5. Tunggu sampai selesai

---

### **STEP 3: Setup OAuth Consent Screen**

1. Di sidebar kiri, klik **"APIs & Services"** → **"OAuth consent screen"**
2. Pilih **"External"**
3. Klik **"Create"**
4. Isi form:
   - **App name**: `NineJan`
   - **User support email**: (pilih email Anda)
   - **Developer contact information**: (masukkan email Anda)
5. Klik **"Save and Continue"**
6. Di halaman **"Scopes"**:
   - Klik **"Add or Remove Scopes"**
   - Cari dan centang:
     - ✅ `userinfo.email`
     - ✅ `userinfo.profile`
     - ✅ `openid`
   - Klik **"Update"**
   - Klik **"Save and Continue"**
7. Di halaman **"Test users"**:
   - Klik **"Add Users"**
   - Masukkan email Google Anda (yang akan dipakai untuk login)
   - Klik **"Add"**
   - Klik **"Save and Continue"**
8. Klik **"Back to Dashboard"**

---

### **STEP 4: Buat OAuth Credentials**

1. Di sidebar kiri, klik **"APIs & Services"** → **"Credentials"**
2. Klik **"Create Credentials"** di bagian atas
3. Pilih **"OAuth client ID"**
4. Pilih **"Web application"**
5. Isi:
   - **Name**: `NineJan Web Client`
   - **Authorized redirect URIs**: 
     ```
     http://localhost:3000/api/auth/google
     ```
     (Copy paste persis seperti di atas!)
6. Klik **"Create"**
7. **PENTING!** Akan muncul popup dengan:
   - **Client ID**: (contoh: `123456789-abc.apps.googleusercontent.com`)
   - **Client Secret**: (contoh: `GOCSPX-abcdefghijklmnop`)
8. **COPY** keduanya! (Anda tidak akan bisa melihat Client Secret lagi nanti)
9. Klik **"OK"**

---

### **STEP 5: Update File .env**

1. Buka file `.env` di folder project Anda
2. Tambahkan atau update baris berikut:

```env
# Google OAuth
GOOGLE_CLIENT_ID="PASTE_CLIENT_ID_DI_SINI"
GOOGLE_CLIENT_SECRET="PASTE_CLIENT_SECRET_DI_SINI"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="PASTE_CLIENT_ID_DI_SINI"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random_string_untuk_security_12345"
```

**Contoh setelah diisi:**
```env
GOOGLE_CLIENT_ID="123456789-abcxyz.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="123456789-abcxyz.apps.googleusercontent.com"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="my_super_secret_key_12345"
```

**⚠️ PENTING:**
- Jangan ada spasi sebelum atau sesudah tanda `=`
- Pastikan tidak ada tanda kutip tambahan
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` harus sama dengan `GOOGLE_CLIENT_ID`

---

### **STEP 6: Restart Development Server**

1. Di terminal, tekan **Ctrl + C** untuk stop server
2. Jalankan lagi:
   ```bash
   npm run dev
   ```
3. Tunggu sampai server running

---

### **STEP 7: Test Login dengan Google**

1. Buka browser: `http://localhost:3000`
2. Klik tombol **"Continue with Google"**
3. Login dengan akun Google yang Anda masukkan di "Test users"
4. Setelah login, Anda akan di-redirect ke feed!

---

## 🔧 Troubleshooting

### ❌ Error: "redirect_uri_mismatch"
**Solusi:**
- Pastikan redirect URI di Google Console: `http://localhost:3000/api/auth/google`
- Harus persis sama, termasuk `http` (bukan `https`)

### ❌ Error: "access_denied"
**Solusi:**
- Pastikan email Anda ada di "Test users" di OAuth consent screen
- Tambahkan email Anda di STEP 3 poin 7

### ❌ Error: "invalid_client"
**Solusi:**
- Pastikan Client ID dan Client Secret sudah benar di file `.env`
- Restart server setelah update `.env`
- Pastikan tidak ada spasi ekstra di file `.env`

### ❌ Tombol Google tidak muncul
**Solusi:**
- Refresh halaman (F5)
- Clear cache browser
- Restart server

---

## ✅ Checklist Setup

- [ ] Google Cloud Project dibuat
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] Test users ditambahkan
- [ ] OAuth credentials dibuat
- [ ] Client ID dan Client Secret di-copy
- [ ] File `.env` di-update dengan credentials
- [ ] Server di-restart
- [ ] Login dengan Google berhasil!

---

## 🚀 Untuk Production

Ketika deploy ke production (misalnya Vercel):

1. Tambahkan redirect URI production di Google Console:
   ```
   https://your-domain.com/api/auth/google
   ```

2. Update `.env` di hosting:
   ```
   NEXTAUTH_URL="https://your-domain.com"
   ```

3. Jangan lupa set environment variables di hosting!

---

## 📞 Butuh Bantuan?

Jika masih error setelah mengikuti semua langkah:
1. Screenshot error yang muncul
2. Screenshot file `.env` (tutupi Client Secret!)
3. Kirim ke saya untuk dibantu

---

**Selamat! Setup Google OAuth sudah selesai!** 🎉

