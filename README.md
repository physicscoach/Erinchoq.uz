# Erinchoq.uz — Shaxsiy Mahsuldorlik Boshqaruv Paneli 🚀
*(Personal Productivity Dashboard to Vanquish Laziness)*

**Erinchoq.uz** — bu dangasalikni mutloq mag'lub etish va kunlik mahsuldorlikni eng yuqori darajaga ko'tarish uchun maxsus ishlab chiqilgan, zamonaviy, interaktiv va g'oyat go'zal shaxsiy boshqaruv paneli. Loyiha to'liq **React + Vite**, **TypeScript** va **Tailwind CSS** yordamida yaratilgan bo'lib, har bir harakatni vizual tarzda tahlil qiladi.

---

## 🌟 Asosiy Imkoniyatlar / Core Features

### 1. 📝 Vazifalar Boshqaruvi (Task Tracker)
* **Kategoriyalar**: Vazifalarni yo'nalishlar bo'yicha ajratish (Ish, O'qish, Shaxsiy, Salomatlik).
* **Holatlar (Status)**: "Kutilmoqda" (Pending), "Bajarilmoqda" (Doing) va "Bajarildi" (Done) bosqichlari. Har bir holat o'ziga xos dizayn va ranglar bilan ajralib turadi.
* **Efficacy (Samaradorlik)**: Bajarilgan vazifalar foiz ko'rsatkichi real vaqtda hisoblab boriladi.

### 2. ⏱️ Fokus Taymer (Focus Timer - Pomodoro)
* **Ish va Dam olish rejimlar**: Pomodoro texnikasiga asoslangan 25 daqiqalik fokus va 5 daqiqalik dam olish rejimlari.
* **Aylana animatsiyasi**: Vaqt kamayishi bilan qisqarib boruvchi dinamik SVG progress aylanasi va pulsatsiyalanuvchi mikro-animatsiyalar.
* **Demo Rejim (DX)**: Vaqtni juda tezlikda sinab ko'rish va tizim integratsiyasini tekshirish uchun maxsus tezlashtirilgan namoyish rejimi.

### 3. 📅 Mitti Taqvim (Mini Calendar)
* Oylar va kunlar bo'yicha qulay navigatsiya.
* Bugungi kun va tanlangan kunni ajratib ko'rsatuvchi stilistik vizuallar.
* **Dinamik status nuqtalari**: Har bir kun ostida kiritilgan vazifalarning holatiga qarab rangli nuqtalar (pushti, to'q sariq, yashil) avtomatik ravishda aks etadi.

### 4. 🎚️ Erinchoqlik Indeksi (Laziness Index & Meter)
* Foydalanuvchining umumiy vazifalari orasidagi tugatilmaganlari nisbatiga qarab uning dangasalik darajasini aniqlovchi aqlli datchik.
* **Unvonlar (Tiers)**: Dangasalik foiziga qarab dinamik unvonlar va hazilomuz, motivatsion tavsiflar:
  * **Super Hero! 🚀** (0% - 20%) — Erinchoqlik ustidan mutloq g'alaba.
  * **Busy Bee 🐝** (21% - 50%) — Mehnatsevar ari kabi faol.
  * **Slightly Coined 🥱** (51% - 80%) — Dangasalik bulutlari yaqinlashmoqda.
  * **Absolute Sloth 🫠** (81% - 100%) — Erinchoqlik asiri.

### 5. 📈 Mahsuldorlik Tahlili (Productivity Analytics)
* Kunlik, haftalik va oylik faollik ko'rsatkichlarini doimiy kuzatib borish imkoniyati.
* **Custom SVG Chart**: Hech qanday og'ir kutubxonalarsiz, to'liq qo'lda yaratilgan interaktiv egri chiziqli grafik (Line Chart).
* **Interactive Tooltip**: Grafik ustiga kursor olib borilganda nuqtalar haqida aniq ma'lumotlarni chiqaruvchi crosshair datchigi.

### 6. 🌗 Tizimli Tun/Kun Rejimi (Dark & Light Mode Toggle)
* To'liq moslashtirilgan interfeys ranglari. Birgina tugma bilan tun va kun rejimlariga o'tish imkoniyati.

---

## 🛠️ Texnologiyalar / Tech Stack

* **Fraymvork**: [React 18+](https://react.dev/) with [Vite](https://vitejs.dev/)
* **Dasturlash Tili**: [TypeScript](https://www.typescriptlang.org/) (Strict type-safety)
* **Stillash**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animatsiyalar**: [Motion (Framer Motion)](https://motion.dev/)
* **Ikonkalar**: [Lucide React](https://lucide.dev/)

---

## 🚀 Loyihani Mahalliy Ishga Tushirish / Local Setup

Loyiha kodlarini o'z kompyuteringizda ishga tushirish uchun quyidagi bosqichlarni bajaring:

1. **Repozitoriyani klonlash (Clone repository):**
   ```bash
   git clone <repo-url-here>
   cd <project-folder-name>
   ```

2. **Kutubxonalarni o'rnatish (Install dependencies):**
   ```bash
   npm install
   ```

3. **Lokal serverni yoqish (Run development server):**
   ```bash
   npm run dev
   ```
   Server ishga tushgach, brauzeringizda `http://localhost:3000` (yoki ko'rsatilgan boshqa port) orqali panelni ochishingiz mumkin.

4. **Kodni tekshirish (Lint checklist):**
   ```bash
   npm run lint
   ```

5. **Ishlab chiqarish uchun tayyorlash (Build for production):**
   ```bash
   npm run build
   ```

---

## 🐙 Loyihani GitHub-ga Joylashtirish Yo'riqnomasi / GitHub Deployment Guide

Ushbu loyihani o'zingizning GitHub hisobingizga yuklash uchun quyidagi ketma-ketlikka amal qiling:

### 1-qadam: GitHub-da yangi repozitoriya oching
1. [github.com](https://github.com) saytiga kiring va profilingizga o'ting.
2. **Repositories** bo'limida **New** tugmasini bosing.
3. Repozitoriyaga nom bering (masalan: `erinchoq-uz-dashboard`).
4. Tavsif yozing (ixtiyoriy) va uni **Public** qilib belgilang.
5. **Hech qanday qo'shimcha fayl qo'shmang** (README, .gitignore yoki litsenziya belgilari bo'sh tursin, chunki loyihamizda bu fayllar allaqachon tayyorlangan).
6. **Create repository** tugmasini bosing.

### 2-qadam: Mahalliy Git-ni sozlash va birinchi commit
Terminal/Buyruqlar panelini oching va loyiha papkasining ichida turib quyidagi buyruqlarni kiriting:

```bash
# Git-ni loyiha ichida faollashtirish
git init

# Barcha tayyor fayllarni git-ga qo'shish
git add .

# Birinchi commit-ni amalga oshirish
git commit -m "feat: Erinchoq.uz shaxsiy mahsuldorlik boshqaruv paneli ishga tushirildi"

# Asosiy tarmoqni 'main' qilib belgilash
git branch -M main
```

### 3-qadam: GitHub repozitoriyasiga ulash va yuklash
GitHub sizga taqdim etgan URL havolasini nusxalang va terminalga quyidagicha yozing (havolani o'zingizniki bilan oling):

```bash
# Mahalliy kodni uzoqdagi repozitoriyaga bog'lash
git remote add origin https://github.com/FOYDALANUVChI_NOMI/REPOSITORIYA_NOMI.git

# Kodni GitHub-ga yuklash
git push -u origin main
```

Shu bilan loyihangiz to'liqligicha GitHub-ga joylashadi! 🚀

---

## 📝 Muallif va Litsenziya / Author & License

* Loyiha muallifi: **[hakimovichumar](https://github.com/hakimovichumar)**
* Litsenziya: MIT License. Uni tahrirlash va shaxsiy maqsadlarda foydalanish mutloq bepul.

---
*Dunyoni o'zgartirishni o'zingizdan, dangasalikni yengishni esa **Erinchoq.uz** bilan boshlang!* 😉
