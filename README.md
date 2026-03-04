# Physiotherapy Demo App

A web app for physiotherapy clinics with two user types: **doctors** and **patients**. Built as a three-milestone project — this repo contains Milestone 1 (full UI with dummy data).

---

## How the App Works

Two completely separate dashboards sit behind a simple login screen:

- **Doctor dashboard** — view patients, manage exercise plans, message patients, get AI exercise suggestions
- **Patient dashboard** — view and tick off exercises, message the doctor, ask AI questions about exercises

A doctor can also click "View as Patient" to see exactly what a patient sees.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React (Vite) | Component-based UI, fast dev server |
| Backend (M2+) | Express (Node.js) | Lightweight API server |
| AI (M2+) | Claude API (`claude-sonnet-4-6`) | Exercise suggestions + patient Q&A |
| Styling | Plain CSS | No framework overhead |
| Data (M1) | Hardcoded dummy data | Lets us build the full UI before the backend exists |
| Build/Deploy | GitHub Actions → GitHub Pages | Automatic deploys on push to main |

---

## Project Structure

```
Physiotherapy-Demo/
├── src/
│   ├── main.jsx              # Entry point — mounts React into index.html
│   ├── App.jsx               # Root component — manages login state and routing
│   ├── pages/
│   │   ├── LoginScreen.jsx   # Dummy login (click "Doctor" or "Patient")
│   │   ├── DoctorDashboard.jsx   # Full doctor interface
│   │   └── PatientDashboard.jsx  # Full patient interface
│   ├── components/
│   │   ├── Sidebar.jsx           # Navigation sidebar (shared layout)
│   │   ├── PatientList.jsx       # Doctor: list of all patients
│   │   ├── PatientProfile.jsx    # Doctor: one patient's metrics and progress
│   │   ├── ExercisePlan.jsx      # Doctor: manage a patient's exercise plan
│   │   ├── ExerciseLibrary.jsx   # Browse all available exercises
│   │   ├── ExerciseChecklist.jsx # Patient: tick off today's exercises
│   │   └── MessagingPanel.jsx    # In-app messaging (doctor ↔ patient)
│   ├── data/
│   │   └── dummy.js          # Hardcoded patients, exercises, messages (M1 only)
│   └── styles/
│       └── global.css        # App-wide styles
├── spec.md                   # Full product requirements and milestones
├── prompt.md                 # Claude API system prompt design (for M2)
├── vite.config.js            # Vite build config (sets base path for GitHub Pages)
└── package.json              # Dependencies and scripts
```

---

## Architecture: How State Flows

React apps pass data **down** through props and signal changes **up** through callback functions. Here's how this app is structured:

```
App.jsx  (owns: role, patientId, viewingAsPatientId)
  ├── LoginScreen  →  calls onLogin(role)
  ├── DoctorDashboard  →  calls onViewAsPatient(id) / onLogout()
  │     ├── PatientList
  │     ├── PatientProfile
  │     ├── ExercisePlan
  │     ├── ExerciseLibrary
  │     └── MessagingPanel
  └── PatientDashboard  →  calls onLogout() / onBackToDoctor()
        ├── ExerciseChecklist
        ├── ExerciseLibrary
        └── MessagingPanel
```

**Key idea:** `App.jsx` is the "traffic controller" — it decides which page to show based on who is logged in and what they're doing.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Milestones

| Milestone | Status | Description |
|-----------|--------|-------------|
| M1 — UI with dummy data | Complete | Full interface, no backend |
| M2 — Claude API + web search | Planned | Express backend, AI exercise suggestions |
| M3 — Full AI features | Planned | AI message drafts, progress summaries, data persistence |

See [`spec.md`](./spec.md) for full requirements, and [`prompt.md`](./prompt.md) for the Claude API system prompt design.
