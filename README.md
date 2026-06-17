# Scribe Haus Website

A multi page React site for Scribe Haus, built with Vite.

## Pages
- Home
- About
- Work (with case study modals)
- Books (shop with CV templates and the Manifestation Journal)
- Services (pricing packages)
- Studio (quote request form plus client tracker)

## Running locally
```
npm install
npm run dev
```

## Deploying to Vercel
1. Push this folder to a GitHub repo
2. Import the repo in Vercel
3. Framework preset: Vite
4. Build command: npm run build
5. Output directory: dist
6. Deploy

## Notes
- All images are embedded as base64 in src/images.js so there are no broken
  image links and nothing depends on external hosting.
- The AI assistant widget runs on a small local FAQ engine rather than calling
  an API directly, since a static site has no safe place to hold an API key
  in the browser. If you want a real AI backed version later, that needs one
  small serverless function on Vercel to hold the key. Quick to add when ready.
- The client tracker on the Studio page is for internal use and currently
  resets on page reload since there is no backend yet. If you want client
  data to persist permanently, that needs a small database, also quick to
  add later.
