# 🎓 ALUMights — Alumni Networking Platform

> Smart India Hackathon 2024 · **Team ARKKY** (Advanced Research Koders Kreating Youth)

A modern, fully functional alumni networking platform built with **pure HTML, CSS, and JavaScript**. Connect with alumni, discover batchmates, share achievements, and stay updated on campus events — all without any backend required.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Auth System** | Register & login with localStorage-based session management, captcha verification, and password strength meter |
| 📰 **Activity Feed** | Create posts, like, and comment — all persisted in localStorage |
| 👥 **Alumni Directory** | Search and filter alumni by name, college, course, or graduation year |
| 📅 **Events** | Browse upcoming reunions, hackathons, career fairs, and seminars with category filtering |
| 👤 **Profile** | View and edit your alumni profile with bio, college info, and post history |
| 🔍 **Global Search** | Search across the platform from the navbar |
| 🌙 **Dark Mode UI** | Premium glassmorphism design with gradient accents and micro-animations |
| 📱 **Responsive** | Works across desktop, tablet, and mobile viewports |

---

## 🚀 Quick Start

1. **Clone or download** this repository
2. Open `login.html` in any modern browser
3. Use sample credentials — username: `aditya_yadav`, password: `demo123`
4. Or click **Create one now** to register a new account

> **Note:** 8 sample alumni users are pre-seeded on first visit. All use password `demo123`.

---

## 📁 Project Structure

```
ALUMights/
├── css/
│   ├── variables.css        # Design tokens — colors, typography, spacing, shadows
│   └── common.css           # Global styles — navbar, footer, buttons, forms, animations
│
├── js/
│   ├── auth.js              # Auth module — register, login, session, profile updates
│   ├── captcha.js           # Canvas-based captcha with noise & colored characters
│   ├── feed.js              # Post CRUD — create, like, comment, render
│   └── utils.js             # Shared UI — navbar, footer, toasts, date helpers
│
├── images/
│   └── logoHome.jpeg        # ARKKY team logo
│
├── index.html               # Home dashboard — feed, sidebars, stats
├── login.html               # Sign in page with captcha
├── register.html            # Registration with password strength meter
├── profile.html             # View/edit user profile
├── directory.html           # Searchable alumni directory
├── events.html              # Event listings with category tabs
│
└── README.md
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, SEO meta tags
- **CSS3** — Custom properties, glassmorphism, CSS Grid, Flexbox, keyframe animations
- **Vanilla JavaScript** — No frameworks, no dependencies
- **localStorage** — Client-side data persistence
- **Font Awesome 6** — Icon library
- **Google Fonts** — Inter + Outfit typography

---

## 📸 Screenshots

### Login
<img src="https://img.shields.io/badge/Dark_Mode-Glassmorphism-7c3aed?style=flat-square" alt="Design Style">

Clean glassmorphism card with captcha verification, password toggle, and animated background orbs.

### Dashboard
Three-column layout with profile sidebar, dynamic post feed (create, like, comment), network stats, upcoming events, and trending hashtags.

### Alumni Directory
Searchable grid with filters for course, graduation year, and college. Click any card to view full profile.

### Events
Category-filtered event cards with date blocks, location/time, and color-coded badges (Reunion, Seminar, Career Fair, Competition, Sports).

---

## 👥 Sample Users

| Username | College | Course | Year |
|----------|---------|--------|------|
| `aditya_yadav` | University of Delhi | B.Tech CSE | 2028 |
| `nishtha_nalin` | University of Delhi | B.Tech IT | 2027 |
| `rishi_dwakar` | MMMUT Gorakhpur | B.Tech IT | 2028 |
| `priya_sharma` | IIT Delhi | M.Tech AI | 2025 |
| `rahul_verma` | NSUT Delhi | B.Tech ECE | 2026 |
| `sneha_gupta` | DTU Delhi | B.Tech CSE | 2024 |
| `arjun_patel` | BITS Pilani | M.Sc. Physics | 2023 |
| `kavya_reddy` | NIT Trichy | B.Tech Mechanical | 2025 |

> All passwords: `demo123`

---

## 📄 License

This project was developed for the **Smart India Hackathon 2024**.

---

<p align="center">
  <strong>Built with ❤️ by Team ARKKY</strong>
</p>
