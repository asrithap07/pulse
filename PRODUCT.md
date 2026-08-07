# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Software engineers and backend teams responsible for maintaining, monitoring, and debugging production APIs and backend services. They are on-call, need rapid incident diagnosis, and work across multiple API endpoints.

## Product Purpose

Pulse transforms raw API monitoring data into simple, actionable explanations. Instead of asking "Is something wrong?" developers can immediately understand "What changed, which endpoint is affected, and what should I investigate?"

Success means engineers can diagnose and locate API failures faster, with confidence that they're looking at the right place.

## Positioning

Pulse explains API problems, not just collects metrics. While most monitoring tools dump graphs and raw data, Pulse detects changes against historical baselines and generates concise, narrative incident summaries that point developers directly to the likely cause.

## Operating Context

- **Environment:** On-call support, desktop workstations; rapid response to production incidents
- **Workflow:** Monitor dashboard → detect anomaly → read incident summary → locate affected endpoint → investigate root cause
- **Integration needs:** Designed as a standalone MVP; assumes engineers have access to API services and logs elsewhere; real-time or near-real-time updates expected without requiring constant manual refresh

## Capabilities and Constraints

**Core capabilities:**
- Continuous API checks: status codes, latency, availability, response failures
- Change detection: compare current behavior against historical baselines
- Automatic incident summaries: narrative explanations of what changed, when, and likely scope

**Technical constraints:**
- Desktop-first optimization; mobile secondary
- Simple architecture: MVP should be easy to build, understand, deploy, and maintain
- No dependency on complex observability stack
- Real-time-ish updates (near real-time dashboard refresh)

**Terminology:** "API," "endpoint," "incident," "baseline," "degradation," "latency spike," "error rate," "deployment."

## Brand Commitments

Name: **Pulse** — suggests heartbeat, continuous monitoring, vital signs. Clear, one-word, technical.

## Evidence on Hand

- Repository: Next.js 16.3 web app (TypeScript, Tailwind CSS, React 19, TanStack Query, Recharts for metrics visualization)
- Development entry: `npm run dev`
- No existing brand assets or style guide at this stage

## Accessibility & Inclusion

**Required standards:**
- WCAG 2.1 AA minimum: good contrast ratios, readable text sizes, keyboard navigation
- Do not rely on color alone to communicate status (pair color with icons, labels, or text)
- Real-time updates must not depend on user polling

## Product Principles

1. **Explain, don't overwhelm.** Summarize incidents into readable narratives instead of dumping raw metrics or graph complexity.
2. **Baseline-aware.** Detect anomalies by comparing against historical patterns; context matters more than raw numbers.
3. **Developer-centered.** Assume desktop, fast workflows, and precision. Optimize for rapid diagnosis, not comprehensive historical browsing.
4. **Built to stay simple.** Avoid sprawl; focus on the job of explaining API failures well enough that a developer knows where to look next.
5. **Visible and accessible.** Real-time feels responsive. WCAG compliance is not negotiable; contrast, labels, and keyboard support must be native to the design.