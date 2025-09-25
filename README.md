# CyberSecuriTeen — Demo (Polished Simulation)
This repository contains a frontend-only demo of CyberSecuriTeen: interactive lessons, full-device style simulations (Google/Gmail/Facebook), and a Parent Dashboard for activity monitoring.

## What’s included
- `index.html` — single-page demo UI (contains hero, lessons, simulation, dashboard, login modal)
- `styles.css` — polished translucent "iOS-style" theme using the provided background image (assets/bg.png)
- `app.js` — client-side logic (no backend). Stores user and activity in `localStorage`.
- `assets/bg.png` — background image you provided

## How to run locally
1. Unzip the project.
2. Open `index.html` in your browser.
3. To deploy: Push to GitHub as a static site and enable GitHub Pages (see earlier instructions).

## Notes
- This is a **simulation only**. It does not connect to Facebook, Google, or Gmail. For real-time scanning while browsing you'd build a browser extension or server-side integrations.
- Activity logs are saved in the browser (`localStorage`) so the Parent Dashboard reads simulated activity.

Good luck on your contest — show them the demo in full-screen for best effect!