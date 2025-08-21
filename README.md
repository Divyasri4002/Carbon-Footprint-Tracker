# 🌱 Carbon Footprint Tracker

A modern web app to calculate and track your daily CO₂ emissions with a beautiful, calming UI. Enter what you did today, see your footprint instantly, learn where it comes from, and track your journey over time.

## ✨ What you can do

- **Calculate CO₂ in real-time** from travel, electricity use, and plastics
- **Visualize your day** with clear status badges and a friendly result card
- **Break down contributions** by category with animated bars
- **Track your progress** on the History page with trends and insights

## 🧮 How we calculate

```
CO₂ = (Travel × 0.12) + (Electricity × 0.5) + (Plastic × 0.3)
```

- 🚗 Travel: 0.12 kg CO₂ per km
- ⚡ Electricity: 0.5 kg CO₂ per kWh
- 🛍️ Plastic: 0.3 kg CO₂ per item

Status ranges: **Good < 5** • **Average 5–15** • **Bad ≥ 15** (kg CO₂)

## 🧱 Tech

- Frontend: **Next.js + React**, handcrafted CSS
- Backend: **Node + Express** (simple in-memory history)

## 🚀 Quick start

1) Install
```bash
cd backend && npm install
cd ../frontend && npm install
```

2) Configure the frontend API base
```bash
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:5000 > frontend/.env.local
```

3) Run
```bash
cd backend && npm start
# new terminal
cd frontend && npm run dev
```
Open `http://localhost:3000`.

## 🧭 Project structure
```
carbon/
├── backend/
│   └── server.js
├── frontend/
│   ├── pages/ (Next.js pages)
│   └── styles/globals.css
└── README.md
```

## 🔌 API (summary)

- `POST /api/calculate` → `{ date, totalCO2, status, emoji, breakdown }`
- `GET /api/history` → `Array<entry>`

## 📦 Deploy

Production setup and step‑by‑step guides live in `DEPLOYMENT.md`.

## 🤝 Contributing

Issues and pull requests are welcome. If you have ideas for new factors or better visuals, we’d love to hear them.

## 📄 License

MIT

---

Built with ❤️ to make environmental awareness beautiful and accessible.

