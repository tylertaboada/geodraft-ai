# GeoDraft AI — MVP

A polished single-page React application for an enterprise AI-assisted geotechnical engineering report drafting platform.

---

## Prerequisites

- **Node.js** v18 or later → https://nodejs.org
- **npm** (comes with Node)
- **VS Code** → https://code.visualstudio.com

---

## Setup (5 minutes)

### 1. Open the project folder in VS Code

```bash
# In VS Code, open this folder:
File → Open Folder → select the "geodraft-ai" folder
```

Or from terminal:
```bash
cd geodraft-ai
code .
```

### 2. Install dependencies

Open the VS Code integrated terminal (`Ctrl+\`` or `Cmd+\``) and run:

```bash
npm install
```

This installs React, Vite, TypeScript, and Tailwind CSS.

### 3. Start the development server

```bash
npm run dev
```

You'll see output like:
```
  VITE v5.x.x  ready in 400ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Open in browser

Visit **http://localhost:5173** — the app loads instantly with hot reload.

---

## Project Structure

```
geodraft-ai/
├── index.html                  # Entry HTML (loads Google Fonts)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Root component (assembles all sections)
    ├── index.css               # Tailwind + global styles
    ├── types.ts                # TypeScript interfaces
    ├── reportEngine.ts         # ★ Core report generation logic
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── ProblemSection.tsx
        ├── WorkflowSection.tsx
        ├── ReportTool.tsx      # ★ Interactive form + report display
        ├── FeaturesSection.tsx
        ├── ValueSection.tsx
        └── CtaFooter.tsx
```

---

## How the Mock Report Generator Works

`src/reportEngine.ts` contains a `generateReport(formData)` function that:

1. **Detects conditions** — scans input text for keywords (glacial till, bedrock, weak soils, fill, high groundwater, floodplain, industrial history, etc.)
2. **Builds risk flags** — creates structured risk objects with severity levels (high / elevated / medium / info)
3. **Generates sections** — produces 7–8 structured report sections with realistic geotechnical language tailored to:
   - Project type and location
   - Detected subsurface conditions
   - Audience (Internal Engineer / Developer / Architect / Client)
   - Regional context (PA, NY, NJ)
4. **Returns a `GeneratedReport` object** — used by `ReportTool.tsx` to render the formatted output

---

## Connecting to Claude's API (Next Step)

When you're ready to replace the mock generator with real AI:

### 1. Get an Anthropic API key
Sign up at https://console.anthropic.com and create an API key.

### 2. Install the SDK
```bash
npm install @anthropic-ai/sdk
```

### 3. Create a backend endpoint (required — never expose API keys in frontend)

Create a simple Express or Next.js API route:

```typescript
// server/api/generate-report.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateReportWithAI(formData: FormData) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `You are a senior geotechnical engineer with 20+ years of experience in the northeastern United States, 
    specializing in Pennsylvania, New York, and New Jersey. You understand glacially deposited soils (tills, outwash, 
    varved clays), residual soils, weathered rock, seasonal frost depth, groundwater variability, and common 
    foundation practices for commercial and residential construction in the Northeast.
    
    Generate preliminary geotechnical assessment report sections based on the site data provided. 
    Always include appropriate disclaimers that this is a draft for engineering review only and requires 
    review by a licensed Professional Engineer. Use conservative, professional language appropriate for 
    an enterprise engineering firm. Never make specific numerical engineering claims without caveating 
    that these require verification through site-specific investigation and analysis.`,
    
    messages: [{
      role: 'user',
      content: `Generate a preliminary geotechnical assessment draft for the following project:

Project: ${formData.projectName}
Type: ${formData.projectType}
Location: ${formData.location}
Report Audience: ${formData.reportAudience}

Boring Log Data:
${formData.boringLogs}

Groundwater Conditions:
${formData.groundwater}

Site Observations:
${formData.siteObservations}

Known Constraints:
${formData.knownConstraints}

Please structure the response as a JSON object with the following sections:
- executiveSummary
- subsurfaceConditions
- groundwaterConditions
- geotechnicalRisks (include risk flags with level and description)
- foundationRecommendations
- sitePreparation
- additionalInvestigation
- plainLanguageSummary (tailored to the report audience)

Include appropriate professional disclaimers throughout.`
    }],
  });

  return message.content[0].text;
}
```

### 4. Update ReportTool.tsx to call your endpoint

Replace the `handleGenerate` function's `setTimeout` mock with a real API call:

```typescript
const handleGenerate = async () => {
  setIsGenerating(true);
  try {
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    const report = parseAIReport(data); // parse the structured JSON response
    setReport(report);
  } catch (error) {
    console.error('Generation failed:', error);
  } finally {
    setIsGenerating(false);
  }
};
```

### Backend Options

- **Simplest:** Next.js API routes (add `pages/api/generate-report.ts`)
- **Standalone:** Express.js server alongside Vite
- **Production:** Deploy to Vercel, Railway, or AWS with environment variables for the API key

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy to any static host (Netlify, Vercel, S3+CloudFront).

---

## VS Code Extensions (Recommended)

Install these for the best development experience:
- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **TypeScript Importer** (`pmneo.tsimporter`)
- **Prettier** (`esbenp.prettier-vscode`)

---

## Legal / Disclaimer Note

GeoDraft AI is a productivity tool for licensed engineering professionals. All generated content:
- Is clearly marked as a draft for engineering review
- Requires review by a licensed Professional Engineer
- Does not constitute professional engineering advice
- Must not be used as the basis for design or construction without licensed PE oversight
# geodraft-ai
