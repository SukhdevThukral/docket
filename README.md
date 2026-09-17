# Docket

>Track each AND every application, scholarship, and deadline on your path to studying abroad in one place.

_it takes your goals, timeline, and current financial situation thru an onboarding flow, further then uses AI to generate a personalized pathway of applications. Each stage has a checklist, a status, and a fallback branch if a primary route doesn't work out_

<img width="1894" height="916" alt="docket" src="https://github.com/user-attachments/assets/1070b807-4a4c-41e7-a1d9-235ba7652098" />

## how ts was made

i used [Next.js](https://nextjs.org/) with the app router for the app and its arch and [Typescript](https://www.typescriptlang.org/), [Tailwind CSS](tailwindcss.com) for the UI styling and the Gemini API to use AI through the onboarding, specific node tips, additions and automatic checklist for the same, Zustand manages the app state and persists it locally between sessions, React Flow to visualise the Applications data into a pathway flowchart, and deployed on [Vercel](vercel.com) 


## Running Locally

```bash
# Install dependencies
npm install

# Add your Gemini API key
echo "GEMINI_API_KEY=your_key_here" >> .env.local

# Run the dev server
npm run dev
```

and boom open [http://localhost:3000](http://localhost:3000) and go through the onboarding


## how ts works

it starts on a landing page, leads you on to a small 5-step onboarding page and adjusts your goals and suggests you higher studies options, generating a checklist for your selected program/scholarship/option and another Pathway page to visualize your applications' primary and fallback options



## LICENSE
[MIT](https://github.com/SukhdevThukral/docket/blob/master/LICENSE)
