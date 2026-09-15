# Docket

>Track each AND every application, scholarship, and deadline on your path to studying abroad in one place.

_Docket takes your goals, timeline, and current situation through a short onboarding flow, then uses AI to generate a personalized pathway of applications ordered by priority and deadlines. Each stage has a checklist, a status, and a fallback branch if a primary route doesn't work out._

<img width="1894" height="916" alt="docket" src="https://github.com/user-attachments/assets/1070b807-4a4c-41e7-a1d9-235ba7652098" />

## Features

- **AI-generated pathways**, so gemini builds a ranked list of scholarships, universities, and bridge programs tailored to your answers
- **Multi-step onboarding**, your goals, situation, target countries/fields, budget, timeline; takes under 2 minutes
- **Fallback branches** discusses risky stages (e.g. competitive scholarships) automatically get a fallback route so you always have a next move
- **Per-application checklists** the specific required steps for each application type and trackable as you go
- **Pathway visualizer**, used React Flow graph showing your primary and fallback branches at a glance
- **Persistent state**, Zustand + localStorage; your pathway wont be affected by a page refresh


## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand with `persist` middleware |
| AI | Gemini 2.0 Flash (`/api/onboarding/generate`) |
| Visualizer | React Flow |

## Project Structure

```
app/
  onboarding/         # Multi-step onboarding flow
    page.tsx          # Shell — holds OnboardingData state, steps, routing
    steps/
      StepGoal.tsx
      StepSituation.tsx
      StepTarget.tsx
      StepTimeline.tsx
      StepPreview.tsx  # Calls AI, previews generated pathway
  pathway/            # Main dashboard after onboarding
    page.tsx
  api/
    onboarding/
      generate/
        route.ts      # POST → Gemini → returns Application[]

components/
  onboarding/
    ui.tsx            # Shared primitives: PillButton, OptionButton, SectionLabel, StepFooter

store/
  useAppStore.ts      # Zustand store — applications, checklist, onboarding state
```


## Running Locally

```bash
# Install dependencies
npm install

# Add your Gemini API key
echo "GEMINI_API_KEY=your_key_here" >> .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and go through onboarding — it takes about 90 seconds.


## How It Works

1. **Onboarding**: 5 steps collect your goal, what you already have, target countries and fields, budget, and timeline
2. **Generation**: `StepPreview` POSTs your answers to `/api/onboarding/generate`, which sends them to Gemini with a "smart" prompt and returns 3–6 applications as JSON
3. **Confirmation** lets you review the AI-generated pathway and confirm or regenerate
4. **Dashboard** :  applications land in the Zustand store, the pathway page visualizes them as a React Flow graph with primary stages in sequence and fallbacks branching off each risky node


## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key |


## Roadmap

- [ ] Deadline reminders / email notifications
- [ ] Manual stage creation and reordering
- [ ] Document upload per application
- [ ] Share pathway as a public link

## LICENSE
MIT
