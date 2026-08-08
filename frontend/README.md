# WorkForce AI

> **Africa's enterprise AI workforce platform** — deploy autonomous agents that handle your back-office operations end to end, with full human oversight.

![WorkForce AI Platform](https://img.shields.io/badge/Status-In%20Development-indigo?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Lucide React](https://img.shields.io/badge/Lucide-Icons-f97316?style=flat-square)

---

## What is WorkForce AI?

WorkForce AI is a **SaaS platform for African enterprises** that lets you deploy and manage autonomous AI agents that handle repetitive back-office work — invoice approval, candidate screening, customer support, compliance reporting, expense processing, and employee onboarding — without replacing your team.

Every agent action is logged, auditable, and operates within configurable approval thresholds. When an edge case exceeds policy limits, the agent escalates to a human for review.

**Think of it as hiring an AI team that works 24/7, follows your rules exactly, and never misses a task.**

---

## Core Value Proposition

| Traditional Approach | WorkForce AI Approach |
|---|---|
| Manual invoice review by finance team | Invoice Guard auto-approves within limits, escalates exceptions |
| HR team screens 200 CVs per role | HR Scout ranks, scores, and shortlists automatically |
| Customer support team works 9–5 | Support Agent handles tickets 24/7 via WhatsApp & email |
| Monthly compliance reports take days | Compliance Scout generates them instantly on demand |
| Expense reports processed weekly | Finance Ops processes and flags exceptions in real time |

---

## Project Structure

```
workforce-ai/
├── frontend/                    # Next.js 16 application (this repo)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/          # Auth route group
│   │   │   │   ├── layout.tsx   # Centered card layout with brand
│   │   │   │   ├── sign-in/     # Sign in page
│   │   │   │   ├── sign-up/     # Registration with password strength meter
│   │   │   │   └── forgot-password/ # Password reset flow
│   │   │   ├── (dashboard)/     # Dashboard route group
│   │   │   │   ├── layout.tsx   # Sidebar shell + mobile drawer
│   │   │   │   ├── dashboard/   # Overview page
│   │   │   │   ├── agents/      # Agent library + config slide-over
│   │   │   │   ├── audit-log/   # Full agent action log
│   │   │   │   ├── escalations/ # Human-review queue
│   │   │   │   ├── usage/       # Credits, billing, plan info
│   │   │   │   └── settings/    # Profile, notifications, integrations
│   │   │   ├── globals.css      # Tailwind v4 config + design tokens
│   │   │   ├── layout.tsx       # Root layout with ThemeProvider
│   │   │   └── page.tsx         # Landing page
│   │   └── components/
│   │       ├── landing/
│   │       │   ├── Navbar.tsx         # Responsive sticky nav
│   │       │   ├── HeroSection.tsx    # Animated hero with particle canvas
│   │       │   ├── ParticleCanvas.tsx # WebGL/canvas particle background
│   │       │   ├── FeaturesSection.tsx
│   │       │   ├── HowItWorks.tsx
│   │       │   ├── Pricing.tsx
│   │       │   ├── Testimonials.tsx
│   │       │   └── Footer.tsx
│   │       ├── dashboard/
│   │       │   ├── Sidebar.tsx        # Collapsible sidebar + mobile drawer
│   │       │   └── DashboardTopbar.tsx # Search, notifications, avatar
│   │       └── ThemeSwitch.tsx        # Light / dark mode toggle
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
└── README.md
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2 (App Router) | Framework — SSR, routing, layouts |
| **TypeScript** | 5.x | Type safety across all components |
| **Tailwind CSS** | v4 | Utility-first styling |
| **Lucide React** | ^1.27 | Professional SVG icon system |
| **next-themes** | latest | System-aware dark/light mode |
| **Outfit (Google Font)** | — | Display typeface for headings |

### Architecture Decisions
- **Next.js App Router** with route groups `(auth)` and `(dashboard)` to isolate layout shells without affecting URL paths
- **Tailwind CSS v4** with `@custom-variant dark (&:is(.dark *))` for class-based dark mode toggling (required for `next-themes` compatibility)
- **`localStorage` session simulation** — `wf_session` key stores mock auth state until the backend is built
- **Static-first rendering** — all dashboard pages are statically prerendered at build time (no server-side data fetching yet)

---

## Features

### Landing Page
- **Responsive sticky navbar** with light/dark toggle, Sign In and Book Demo CTAs
- **Animated hero section** with particle canvas background (WebGL-powered)
- Features section with agent capability cards
- How It Works walkthrough
- Pricing tiers (Starter, Growth, Enterprise)
- Testimonials from Nigerian enterprise customers
- Full mobile responsiveness at all breakpoints

### Authentication
| Page | Path | Features |
|---|---|---|
| Sign In | `/sign-in` | Email + password, Google SSO button, Remember me, Loading state |
| Sign Up | `/sign-up` | Full name, email, company, password with live strength meter, terms acceptance |
| Forgot Password | `/forgot-password` | Email input → success confirmation state |

All auth pages share a **centered card layout** with brand logo, gradient glow background, and footer note.

### Dashboard

#### Layout Shell
- **Desktop (md+):** Collapsible sidebar — full labels at 220px, icon-only at 60px with hover tooltips
- **Mobile (< md):** Hamburger menu in topbar opens a **slide-in drawer** (300ms CSS transition, ESC to close, backdrop click to dismiss)
- **Topbar:** Page title + subtitle, search bar (lg+), notification bell with unread badge, theme switch, user avatar (name + plan on xl+)

#### Overview (`/dashboard`)
- **System status badge** — "All systems operational" with animated green dot
- **4 stat cards** — Tasks Today, Agents Active, Awaiting Approval, Accuracy Rate — each with trending delta indicator
- **Active agents panel** — initials avatar with per-agent color, task count, progress bar, status badge
- **Activity feed** — timeline with connector lines, agent label, timestamp, message
- **Quick action links** — Deploy Agent, Review Escalations, View Audit Log, Upgrade Plan

#### Agent Library (`/agents`)
- **6 pre-configured agents** with color-coded initials avatars and category tags
- **3-column metrics** per card (tasks, success rate, credits used)
- **Pause / Resume toggle** with confirmation-free instant state update
- **Configure slide-over panel** — pulls in from the right, sets escalation email, auto-approve threshold, notification channel, working hours

#### Audit Log (`/audit-log`)
- **Search + filters** by agent name and action type
- **Mobile:** Expandable card list
- **Desktop:** Multi-column table with expand chevron, structured detail panel on expand
- **Action badges** with Lucide icon + color coding (green = success, amber = warning, indigo = info)

#### Escalations (`/escalations`)
- **Pending / Resolved tab switcher** with live badge count
- Each pending escalation shows a **priority color bar**, agent avatar, structured data panel
- **Approve / Reject** with confirmation modal (icon + text, ESC to cancel)
- Empty state with CheckCircle icon when queue is clear

#### Usage & Billing (`/usage`)
- **Plan banner** with gradient glow and upgrade CTA
- **Credit usage** — overall percentage, per-agent bar chart with initials
- **Billing history** — desktop table / mobile card layout (same data, different presentation)

#### Settings (`/settings`)
- **Profile form** — avatar initial, name, email, company — with live save confirmation
- **Notification toggles** — 4 switches with divider layout (email, WhatsApp, escalations, weekly digest)
- **Integrations** — 6 services (WhatsApp, Gmail, Slack, QuickBooks, Zoho, Google Drive) with Lucide icons, connect/disconnect state
- **Danger Zone** — Pause All Agents + Delete Account with rose styling

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Local Development

```bash
# Clone the repository
git clone https://github.com/Pipe7-sudo/Agentic.git
cd Agentic/workforce-ai/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deployment (Vercel)

The project is configured for Vercel deployment. Push to `main` and Vercel auto-deploys.

> **Note:** A `package-lock.json` exists at the repo root and at `workforce-ai/frontend/`. Vercel may warn about multiple lockfiles. This is safe to ignore — it detects the correct `frontend/` project root. You can silence it by setting `turbopack.root` in `next.config.ts`.

---

## Design System

### Color Palette
The dashboard uses a neutral slate base with an indigo/violet primary accent:

| Token | Light | Dark | Usage |
|---|---|---|---|
| Background | `slate-50` | `#04040c` | Page bg |
| Surface | `white` | `#080812` | Cards, sidebar |
| Border | `slate-200` | `white/7%` | Card borders |
| Primary | `indigo-600` | `indigo-400` | CTAs, active state |
| Success | `emerald-600` | `emerald-400` | Active agents, approved |
| Warning | `amber-600` | `amber-400` | Escalations, flags |
| Danger | `rose-600` | `rose-400` | Rejections, danger zone |

### Typography
- **Headings:** `Outfit` (Google Fonts) — `font-bold`, `tracking-tight`
- **Body:** System sans-serif (`font-sans`) at `text-sm` / `text-[13px]`
- **Mono:** System monospace for IDs, timestamps, codes

### Gradient
The `gradient-bg` utility class applies `background: linear-gradient(135deg, #6366f1, #8b5cf6)` — used on primary buttons, sidebar brand logo, stat card icons, and avatar initials.

### Responsive Breakpoints (Tailwind defaults)
| Breakpoint | Width | Dashboard Behaviour |
|---|---|---|
| (default) | < 768px | Hamburger drawer, compact topbar |
| `md` | ≥ 768px | Sidebar visible (icon-only default) |
| `lg` | ≥ 1024px | Search bar in topbar |
| `xl` | ≥ 1280px | 2-column dashboard grid, user name in topbar |

---

## AI Agents

### HR Scout
**Category:** HR & Talent  
Screens incoming CVs against job description criteria, scores candidates using a configurable rubric, ranks them, and schedules shortlisted candidates for interviews. Notifies the hiring manager via email with a structured summary.

### Invoice Guard
**Category:** Finance & Accounts Payable  
Matches supplier invoices to purchase orders, validates line items and amounts, and auto-approves invoices within a configurable threshold (default ₦500,000). Invoices exceeding the threshold are escalated to finance with full context.

### Support Agent
**Category:** Customer Operations  
Handles inbound support requests via WhatsApp Business and email 24/7. Uses a knowledge base to resolve common queries. Escalates to a human agent when sentiment is negative or the customer explicitly requests it.

### Compliance Scout
**Category:** Legal & Compliance  
Monitors regulatory feeds (NDPC, CBN, FIRS) for relevant updates. Generates structured compliance reports with a checklist against active regulations. Alerts the legal team to any gaps.

### Finance Ops
**Category:** Finance & Accounts Payable  
Processes employee expense reports, categorizes spend against budget codes, flags expenses that exceed category limits, and queues clean reports for payment. Produces a weekly reconciliation summary.

### Onboarding Bot
**Category:** HR & Talent  
Guides new hires through the onboarding checklist — document submission, IT access provisioning, policy acknowledgement, and training scheduling. Sends reminders and tracks completion status.

---

## Roadmap

### Phase 1 — Frontend (Current)
- [x] Landing page with hero, features, pricing
- [x] Auth pages (Sign In, Sign Up, Forgot Password)
- [x] Dashboard layout with collapsible sidebar + mobile drawer
- [x] Overview, Agents, Audit Log, Escalations, Usage, Settings pages
- [x] Light/dark mode with system preference detection
- [x] Full responsiveness across all screen sizes
- [x] Lucide icon system throughout

### Phase 2 — Backend (Planned)
- [ ] Node.js / Express API server
- [ ] PostgreSQL database with Prisma ORM
- [ ] Authentication with JWT + refresh tokens
- [ ] Agent execution engine (task queue with BullMQ)
- [ ] Real-time audit log streaming (WebSocket / SSE)
- [ ] WhatsApp Business API integration
- [ ] Email integration (Resend / Nodemailer)
- [ ] Stripe / Flutterwave payment integration

### Phase 3 — Agent Intelligence (Planned)
- [ ] LLM integration (GPT-4o / Claude 3.5) per agent
- [ ] Custom document processing (invoices, CVs, expense reports)
- [ ] Configurable policy rules per agent
- [ ] Learning from human approval decisions
- [ ] Multi-tenant workspace isolation

---

## Contributing

This is a private project. If you are a collaborator:

1. Branch from `main`: `git checkout -b feat/your-feature`
2. Follow the existing component patterns (Lucide icons, Tailwind utility classes, no inline styles)
3. Keep pages in the correct route group (`(auth)` or `(dashboard)`)
4. Run `npm run build` before pushing — all pages must compile with zero errors
5. Open a PR against `main` with a clear description

---

## License

Private — All rights reserved © 2026 WorkForce AI.

---

*Built by Pipe7-sudo · Powered by Next.js, Tailwind CSS, and Lucide React*
