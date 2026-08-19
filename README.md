# विश्वकर्मा फर्नीचर — Vishwakarma Furniture

Custom wooden furniture business website — Hindi + English, online order booking, photo gallery aur ek aasan admin panel.

**Stack:** Next.js 16 (App Router) · MongoDB + Mongoose · Cloudinary · Tailwind CSS 4 · Vercel

---

## ✨ Kya kya hai is website me

| Feature | Detail |
|---|---|
| 🌐 Do bhasha | Hindi / English switch — customer apni bhasha chun sakta hai, choice yaad rehti hai |
| 🛏️ Room ke hisaab se | Bedroom, Living room, Kitchen, Office, Mandir, Doors, Custom |
| 🪑 Alag-alag cheezein | Bed, kapat, dressing table… har cheez alag bhi bikti hai |
| 📦 Poore set | "पूरा बेडरूम सेट" jaise room package bhi |
| 🖼️ Hamara kaam | Gallery — kiye hue kaam ki photos, lightbox ke saath |
| 🛒 Order booking | Customer list banata hai, form bharta hai, order database me save hota hai |
| 💬 WhatsApp | Har jagah WhatsApp button, order ka poora detail WhatsApp par bhi jata hai |
| 📩 Contact | Contact form ke sandesh admin panel me dikhte hain |
| 🔐 Admin panel | Photo upload, naya saman, gallery, orders aur messages — sab `/admin` se |

---

## 🚀 Shuru kaise karein (Local computer par)

### 1. Packages install karein

```bash
npm install
```

### 2. `.env.local` file banayein

`.env.example` ki copy banakar naam `.env.local` rakhein, phir apni values bharein:

```bash
cp .env.example .env.local
```

| Value | Kahan se milegi |
|---|---|
| `MONGODB_URI` | [mongodb.com/atlas](https://www.mongodb.com/atlas) → free cluster → Connect → Drivers |
| `CLOUDINARY_CLOUD_NAME` / `API_KEY` / `API_SECRET` | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | wahi cloud name (browser ke liye) |
| `ADMIN_PASSWORD` | jo aap khud rakhna chahein — isi se `/admin` khulega |
| `AUTH_SECRET` | koi lamba random text |
| `NEXT_PUBLIC_WHATSAPP` | aapka WhatsApp number, `91` ke saath, bina `+` — jaise `919876543210` |

### 3. Shuruaati saman database me daalein

```bash
npm run seed
```

24 products + 12 gallery entries jud jayengi. Sab dobara set karna ho to:

```bash
npm run seed -- --fresh
```

### 4. Website chalayein

```bash
npm run dev
```

Website: <http://localhost:3000> · Admin: <http://localhost:3000/admin>

> **Note:** Agar MongoDB abhi set nahi kiya, tab bhi website chalegi — demo saman dikhega.
> Sirf admin panel aur order save karne ke liye database zaroori hai.

---

## 🔧 Apni jaankari kahan badlein

| Kya badalna hai | File |
|---|---|
| Phone, WhatsApp, email, pata, khulne ka samay, Google map | `lib/site.js` + `.env.local` |
| Rooms / categories | `lib/categories.js` |
| Website ki lines (Hindi + English) | `lib/i18n.js` |
| Rang aur design | `app/globals.css` (upar `@theme` block) |
| Shuruaati saman | `lib/seed-data.js` |

Saman, photos aur gallery **admin panel se** badalna sabse aasan hai — code chhune ki zarurat nahi.

---

## 🖥️ Admin panel (`/admin`)

1. `/admin` kholein → `ADMIN_PASSWORD` daalein
2. **डैशबोर्ड** — naye order aur sandesh ek nazar me
3. **सामान** — naya product jodein, photo upload karein (seedha Cloudinary par jati hai), daam/naap badlein, "होम" dabakar home page par dikhayein
4. **गैलरी** — apne kiye hue kaam ki photos
5. **ऑर्डर** — customer ko call/WhatsApp karein, status badlein (नया → बात हुई → पक्का → बन रहा है → दे दिया)
6. **संदेश** — contact form ke sandesh

Photos browser se **seedha Cloudinary** jati hain, isliye badi photos bhi bina dikkat chadh jati hain.

---

## ☁️ Vercel par live karna

1. Code GitHub par daalein:

```bash
git init && git add . && git commit -m "Vishwakarma Furniture website"
```

   phir GitHub par repo banakar push karein.

2. [vercel.com](https://vercel.com) → **Add New → Project** → apna repo chunein
3. **Environment Variables** me `.env.local` wali saari values daalein
   (`NEXT_PUBLIC_SITE_URL` me apna asli domain daalein, jaise `https://vishwakarmafurniture.com`)
4. **Deploy** dabayein

**MongoDB Atlas me ek zaroori setting:** Network Access → `0.0.0.0/0` allow karein, warna Vercel connect nahi kar payega.

Apna domain jodne ke liye: Vercel project → Settings → Domains.

---

## 📁 Project ka dhancha

```
app/
  page.js                 home page
  products/               saman ki list + har product ka page
  gallery/                hamara kiya hua kaam
  about/  contact/  cart/ baaki pages
  admin/                  admin panel (login se surakshit)
  api/
    orders/               order book karna
    contact/              sandesh bhejna
    upload/               Cloudinary signature
    auth/                 admin login/logout
    admin/                admin ke CRUD routes
components/               saare UI parts
lib/
  db.js                   MongoDB connection
  i18n.js                 Hindi + English lines
  categories.js           kamre / categories
  site.js                 business ki jaankari
  products.js             data padhne ke helpers
models/                   Mongoose models
scripts/seed.mjs          shuruaati data
```

---

## ❓ Choti-moti dikkat

| Dikkat | Hal |
|---|---|
| Admin me "MongoDB juda nahi hai" | `.env.local` me `MONGODB_URI` sahi hai? Atlas me IP allow kiya? |
| Photo upload nahi ho rahi | `CLOUDINARY_*` teeno values aur `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` bhare hain? |
| Admin login nahi ho raha | `.env.local` me `ADMIN_PASSWORD` set karke server dobara chalayein |
| Website par purana saman dikh raha | Page 1 minute me apne aap taaza ho jata hai |
