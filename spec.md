# Physiotherapy App — Spec

## What It Does

A web app for physiotherapy clinics with two types of users:

- **Doctor** — assigns exercises to patients, tracks progress, chats with patients, gets AI help
- **Patient** — views their exercise checklist, ticks off completed exercises, chats with their doctor

---

## Requirements

### Doctor can:
- Log in and see a list of their patients
- View a patient's exercise plan and progress
- Add or remove exercises from a patient's plan
- Message patients
- Ask Claude to suggest exercises based on a condition (e.g. "torn ACL")
- Get AI-drafted replies to patient messages
- Generate a progress summary for any patient

### Patient can:
- Log in and see their exercise plan
- Tick off exercises as completed
- Message their doctor
- Ask Claude questions about their exercises

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | Express (Node.js) |
| AI | Claude API (`claude-sonnet-4-6`) with web search tool |
| Styling | Plain CSS (no frameworks) |
| Data (M1) | Hardcoded dummy data |
| Data (M2+) | In-memory store on the Express server |

---

## Design Guidelines

- **Clean and calm** — white background, soft blues and greens, no clutter
- **Two clear views** — Doctor dashboard and Patient dashboard, each with a sidebar nav
- **Mobile-friendly** — works on a phone screen
- **No jargon** — plain English labels everywhere (e.g. "Mark as done", not "Update exercise status")

---

## Milestones

### Milestone 1 — UI with Dummy Data

Build the full interface using hardcoded data. No backend, no API calls yet.

**Deliverables:**
- Doctor dashboard: patient list, exercise plan view, messaging panel
- Patient dashboard: exercise checklist, messaging panel
- Dummy login (click "Log in as Doctor" or "Log in as Patient")
- Exercises can be ticked off (state lives in React)

**Done when:** You can click through the full app and it looks right.

---

### Milestone 2 — Connect Claude API with Web Search

Wire up the Express backend and connect to the Claude API. Use the web search tool so Claude can look up current exercise guidelines in real time.

**Deliverables:**
- Express server with `/api/chat` endpoint that calls Claude
- Web search tool enabled (`web_search_20250305`) so Claude can search for up-to-date physio guidance
- Doctor flow: type a condition → Claude suggests exercises (searches the web for evidence-based recommendations)
- Patient flow: ask a question about an exercise → Claude answers (with sources)
- Data stored in-memory on the server (no database yet)

**Claude API call example:**
```js
tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }]
```

**Done when:** Doctor types "ACL tear, week 2 recovery" and gets a real AI-generated exercise list with cited sources.

---

### Milestone 3 — Full AI Features

Add the remaining AI-powered features.

**Deliverables:**
- AI-drafted message replies for doctors (one-click suggest reply)
- Automated weekly progress summary per patient
- Patient tips: Claude explains each exercise in plain English
- Persist data to a simple JSON file or SQLite so it survives server restarts

**Done when:** All AI features from the requirements work end to end.
