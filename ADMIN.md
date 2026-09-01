# Admin Panel — Portfolio CMS

সাইটের সব কনটেন্ট (`src/content/site.json`) এখন `/admin` প্যানেল থেকে edit করা যায়।

## Login

- URL: `/admin` (password লাগবে)
- **Dev (localhost):** ডিফল্ট পাসওয়ার্ড `admin123`
- **Production (Vercel):** `ADMIN_PASSWORD` environment variable সেট না থাকলে login বন্ধ থাকবে

## কী কী edit করা যায়

General/Profile (নাম, যোগাযোগ, সোশ্যাল লিংক, About ছবি, হিরো ছবি, OG ছবি), Media/
ছবি লাইব্রেরি, Navigation, About, Stats, Skills, Services, Projects (demo লিংক,
ছবি, screenshot), Testimonials, Process ধাপ, FAQ এবং Marquee — সব কিছু add/remove/
reorder সহ।

## Media / ছবি

- `/admin` → **Media / ছবি** ট্যাবে JPG, PNG, WebP, GIF, SVG, AVIF আপলোড /
  delete / URL কপি করা যায়।
- আপলোডের ছবি `public/uploads/`-এ সেভ হয় (local), আর Vercel-এ
  `ADMIN_GITHUB_TOKEN` থাকলে repo-তে commit হয়ে redeploy পর লাইভ হয়।
- প্রজেক্টে **ছবি / Cover**, **Screenshot**, **Demo লিংক** — সব admin থেকে
  control করা যায়। ছবি না দিলে আগের মতো অ্যাবস্ট্রাক্ট ভিজ্যুয়াল দেখানো হয়।

## সেভ করলে কী হয়

| Environment | Behavior |
|---|---|
| **Dev (localhost)** | `src/content/site.json` সরাসরি লেখা হয় → সাইট সাথে সাথে hot-reload হয় |
| **Vercel** | `ADMIN_GITHUB_TOKEN` সেট থাকলে JSON টি GitHub repo-তে commit হয় → Vercel নিজে থেকেই redeploy করে (~1 মিনিট) |

## Vercel setup (একবারই করতে হবে)

1. **ADMIN_PASSWORD** — Vercel → Project → Settings → Environment Variables:
   ```
   ADMIN_PASSWORD = আপনার-শক্ত-পাসওয়ার্ড
   ```
2. **ADMIN_GITHUB_TOKEN** — GitHub-এ fine-grained token বানান
   (Settings → Developer settings → Fine-grained tokens):
   - Repository access: শুধু `marufraj3/portfolio`
   - Permissions: **Contents → Read and write**
   
   তারপর Vercel-এ:
   ```
   ADMIN_GITHUB_TOKEN = github_pat_...
   ```
3. Redeploy দিন। এখন `/admin` থেকে সেভ করলেই সাইট আপডেট হয়ে যাবে।

> ঐচ্ছিক: `ADMIN_SECRET` (session signing key), `ADMIN_GITHUB_BRANCH` (default `main`),
> `ADMIN_GITHUB_OWNER` / `ADMIN_GITHUB_REPO` — ডিফল্ট value-ই ঠিক আছে।

## Security

- `/admin` ও `/api/admin/*` middleware দিয়ে protected (HMAC-signed httpOnly cookie, 12 ঘণ্টা মেয়াদ)
- Production-এ `ADMIN_PASSWORD` ছাড়া login সম্পূর্ণ বন্ধ
- `/admin` search engine থেকে block করা (robots + noindex)
