# 🔐 Setup Google OAuth Login

## Cara Setup Google OAuth:

### 1. Buat Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik "Select a project" → "New Project"
3. Beri nama project (contoh: "NineJan")
4. Klik "Create"

### 2. Enable Google+ API

1. Di sidebar, pilih "APIs & Services" → "Library"
2. Cari "Google+ API"
3. Klik "Enable"

### 3. Configure OAuth Consent Screen

1. Di sidebar, pilih "APIs & Services" → "OAuth consent screen"
2. Pilih "External" → "Create"
3. Isi informasi:
   - App name: `NineJan`
   - User support email: email Anda
   - Developer contact: email Anda
4. Klik "Save and Continue"
5. Scopes: Klik "Add or Remove Scopes"
   - Pilih: `userinfo.email`, `userinfo.profile`
6. Klik "Save and Continue"
7. Test users: Tambahkan email Anda sendiri
8. Klik "Save and Continue"

### 4. Create OAuth Credentials

1. Di sidebar, pilih "APIs & Services" → "Credentials"
2. Klik "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: `NineJan Web Client`
5. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/google
   ```
6. Klik "Create"
7. **COPY** Client ID dan Client Secret

### 5. Update .env File

Buka file `.env` dan tambahkan:

```env
# Google OAuth
GOOGLE_CLIENT_ID="your_client_id_dari_google"
GOOGLE_CLIENT_SECRET="your_client_secret_dari_google"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_client_id_dari_google"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random_string_untuk_security"
```

**Contoh:**
```env
GOOGLE_CLIENT_ID="123456789-abcdefg.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnop"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="123456789-abcdefg.apps.googleusercontent.com"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="my_super_secret_key_12345"
```

### 6. Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start ulang
npm run dev
```

### 7. Test Login dengan Google

1. Buka `http://localhost:3000`
2. Klik tombol "Continue with Google"
3. Login dengan akun Google Anda
4. Setelah login, Anda akan di-redirect ke feed!

---

## 🚀 Fitur yang Sudah Ditambahkan:

✅ Tombol "Continue with Google" di halaman Login
✅ Tombol "Continue with Google" di halaman Register  
✅ Auto-create account jika belum ada
✅ Auto-login setelah OAuth berhasil
✅ Avatar dari Google otomatis terambil
✅ Name dari Google otomatis terisi

---

## 🔧 Troubleshooting:

### Error: "redirect_uri_mismatch"
- Pastikan redirect URI di Google Console sama dengan di `.env`
- Harus: `http://localhost:3000/api/auth/google`

### Error: "access_denied"
- Pastikan email Anda ada di "Test users" di OAuth consent screen

### Error: "invalid_client"
- Pastikan Client ID dan Client Secret sudah benar
- Restart server setelah update `.env`

---

## 📝 Catatan:

- Untuk production, tambahkan domain Anda di "Authorized redirect URIs"
- Jangan commit file `.env` ke Git!
- `NEXTAUTH_SECRET` harus random string yang kuat

---

**Selamat! Login dengan Google sudah siap digunakan!** 🎉

