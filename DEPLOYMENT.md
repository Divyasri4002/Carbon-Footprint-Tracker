# Deployment

This guide shows how to host the app publicly using a simple split: Render (backend) + Vercel (frontend).

## Prereqs
- GitHub repo with this project
- Node.js installed locally

## 1) Backend: Render
1. Push to GitHub.
2. On Render: New → Web Service → select repo.
3. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
4. Deploy and note the URL, e.g. `https://your-backend.onrender.com`.

Notes:
- The server uses `process.env.PORT || 5000`.
- CORS is enabled; you can restrict origins later.

## 2) Frontend: Vercel
1. On Vercel: New Project → import repo.
2. Root Directory: `frontend`.
3. Framework: Next.js.
4. Environment Variables:
   - `NEXT_PUBLIC_API_BASE_URL = https://your-backend.onrender.com`
5. Deploy. You’ll get `https://your-app.vercel.app`.

## 3) Custom domains (optional)
- Add a domain to Vercel for the frontend.
- Add a domain to Render for the backend.

## Troubleshooting
- 404/Network errors: verify `NEXT_PUBLIC_API_BASE_URL` matches your backend URL.
- CORS errors: confirm your backend allows the frontend origin.
- Mixed content: ensure both URLs are HTTPS.


