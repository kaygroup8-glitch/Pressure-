# PRESSURE

> **Pause before you respond.**  
> An automated communication safety and decision-support system designed to identify psychological pressure signals, urgency tactics, and manipulation patterns in incoming messages.

---

```
   ┌─────────────────────────────────────────────────────────────┐
   │                                                             │
   │   Incoming Message          Linguistic Signal Engine        │
   │  ┌─────────────────┐       ┌────────────────────────┐       │
   │  │   Screenshot    │ ───▶  │  • Urgency Detection   │       │
   │  │   or Text DM    │       │  • Secrecy Indicators  │       │
   │  └─────────────────┘       │  • Authority Pressure  │       │
   │                            └───────────┬────────────┘       │
   │                                        │                    │
   │                                        ▼                    │
   │                         ┌───────────────────────────┐       │
   │                         │  PRESSURE EVALUATION      │       │
   │                         │                           │       │
   │                         │  Score: 88 / 100 [HIGH]   │       │
   │                         │  Tactic: Artificial Clock │       │
   │                         │  Action: Independent Call │       │
   │                         │  Pause: Reflective Prompt │       │
   │                         └───────────────────────────┘       │
   │                                                             │
   └─────────────────────────────────────────────────────────────┘
```

---

## Overview

High-stakes social engineering, coercive requests, and fraudulent communications rely on a common psychological vector: creating overwhelming urgency so targets react emotionally before they can verify facts.

**PRESSURE** acts as an intentional circuit breaker between receiving an alarming message and taking action. By inspecting visual screenshots and message transcripts against established cognitive exploitation indicators, PRESSURE computes an objective pressure score, breaks down active manipulation tactics, and provides a focused pause question to restore critical thinking.

---

## Key Capabilities

### 1. Multimodal Screenshot & Text Ingestion
- Upload raw screenshots directly from messaging platforms, SMS, email, or social media.
- Supports drag-and-drop, clipboard image paste (`Ctrl+V` / `Cmd+V`), file selection, and mobile camera capture.
- Formats accepted: PNG, JPEG, and WebP up to 25MB.

### 2. Multi-Vector Tactic Decomposition
PRESSURE scans message content for specific behavioural pressure vectors:
- **Urgency Manipulation:** Artificial deadlines designed to induce panic and force premature compliance.
- **Secrecy & Isolation:** Demands to conceal the conversation from family, advisers, or official support lines.
- **Authority Impersonation:** Fabricated legal, banking, or institutional threats intended to bypass scrutiny.
- **Emotional Exploitation:** Weaponized distress, obligation, or fear to provoke quick concession.
- **Financial Extraction:** Immediate fund redirection requests, gift card demands, or unverified payment links.

### 3. Reflective Pause Centerpiece
- Bypasses reactive instincts by isolating one central verification prompt.
- Encourages independent verification via verified external channels before taking irreversible action.

### 4. Local-First Privacy & History
- All saved evaluation history remains strictly on your local device via browser storage.
- Zero server-side persistence of personal screenshots or message transcripts.
- One-click deletion of individual records or permanent history purge.

### 5. Client-Side Vector PDF Reports
- Generates formatted, publication-grade executive summary reports on the client device.
- Direct download without transmitting document artifacts to external endpoints.
- Instant clipboard summary formatting for team escalation or security reviews.

---

## System Architecture

```
[ Client Application ]
   │
   ├── Mobile-First UI (React + TypeScript + Tailwind CSS)
   │     ├── Landing Page (Editorial Presentation)
   │     ├── Consent Gate (Versioned Legal Compliance)
   │     ├── Analyzer & Dropzone (Canvas Screenshot Parser)
   │     ├── Result Engine (Dynamic Gauge & Tactic Cards)
   │     ├── History Viewer (Local State Persistence)
   │     └── Vector PDF Generator (Client-Side Rendering)
   │
   ▼ HTTPS / TLS Encrypted
[ Application Proxy Server ] (Node.js + Express)
   │
   ├── Request Validation & Payload Sanitization
   ├── In-Memory Stream Processing (Zero Disk Logging)
   └── Secure Heuristic Analysis Dispatch
```

---

## Decision Flow

```
                      [ User Receives Suspicious Message ]
                                       │
                                       ▼
                       [ Opens PRESSURE Application ]
                                       │
                                       ▼
                     [ First-Use Consent Acknowledged? ]
                                  /         \
                              No /           \ Yes
                                /             \
                  [ Terms & Privacy Modal ]    │
                                \             │
                             Agree             │
                                  \           /
                                   ▼         ▼
                        [ Dashboard / Analyzer ]
                                       │
                                       ▼
                     [ Upload Screenshot / Sample Check ]
                                       │
                                       ▼
                       [ Linguistic Signal Analysis ]
                                       │
                                       ▼
                        [ Comprehensive Evaluation ]
                        ├── Pressure Level & Score (0-100)
                        ├── Identified Tactics & Explanations
                        ├── Contextual Risk Assessment
                        ├── Recommended Safe Action
                        └── Centerpiece Pause Question
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
           [ Save to Local History ]            [ Export PDF / Copy ]
```

---

## Repository Structure

```
├── src/
│   ├── assets/
│   │   └── images/              # Editorial visual assets
│   ├── components/
│   │   ├── AnalyzingView.tsx    # Processing and scanning interface
│   │   ├── BottomNav.tsx        # Mobile-first floating navigation dock
│   │   ├── HistoryView.tsx      # Local history browser with delete/clear
│   │   ├── LandingPage.tsx      # Public presentation and overview
│   │   ├── Navbar.tsx           # Brand header with quick view switching
│   │   ├── PressureLogo.tsx     # Custom SVG identity asset
│   │   ├── PrivacyPolicy.tsx    # Plain-English privacy documentation
│   │   ├── ResultView.tsx       # Evaluation dashboard, tactics, and pause prompt
│   │   ├── TermsAndConditions.tsx # Full terms of service
│   │   ├── TermsConsentModal.tsx  # First-use consent gating modal
│   │   └── UploadCard.tsx       # Drag-and-drop ingestion and demo scenarios
│   ├── data/
│   │   └── examples.ts          # Simulated message scenarios and canvas generator
│   ├── utils/
│   │   ├── consentStorage.ts    # Versioned terms consent persistence
│   │   ├── historyStorage.ts    # On-device localStorage persistence
│   │   └── pdfExport.ts         # Client-side vector PDF generation
│   ├── App.tsx                  # Master state router and lifecycle manager
│   ├── main.tsx                 # React DOM mount point
│   ├── types.ts                 # TypeScript interfaces and data models
│   ├── index.css                # Global Tailwind CSS directives
│   └── vite-env.d.ts            # Asset declarations and module shims
├── server.ts                    # Express proxy server and API routing
├── index.html                   # HTML entry point with synchronized metadata
├── metadata.json                # Project configuration and capabilities
├── package.json                 # Project dependencies and script declarations
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler configuration
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pressure.git
   cd pressure
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Start production server:**
   ```bash
   npm start
   ```

---

## Security & Privacy Design

- **Zero Server-Side Storage:** Uploaded image buffers are processed ephemerally in server memory and discarded immediately upon response generation.
- **Local-First History:** Saved assessments and downscaled thumbnails reside exclusively in the client browser storage.
- **Client-Side Document Export:** PDF compilation occurs within the browser runtime using vector primitives, without sending data back to servers.
- **Consent Enforced:** Every user confirms and logs terms acceptance prior to accessing the analysis suite.

---

## Contact & Inquiries

For support, feedback, or legal questions, reach out directly:

- **Email:** [web3update3y@gmail.com](mailto:web3update3y@gmail.com)
- **Product:** PRESSURE Communication Security
