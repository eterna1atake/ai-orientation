@AGENTS.md

# CONTEXT
You are working on a high-fidelity frontend mockup prototype for the "AI Study Orientation Platform" using Next.js (App Router), Tailwind CSS, and Lucide React icons. The target users are Thai undergraduate engineering/technology students. We do not have a backend database yet; everything must be powered by comprehensive, structured mock data, but it MUST strictly adhere to a Clean Code Architecture pattern (Domain, Data, and Presentation Layers).

# OBJECTIVE
Programmatically generate, structure, and style the application using Clean Architecture principles to separate concerns. The UI must be highly professional, scannable, modern, and fully responsive.

# CLEAN ARCHITECTURE COMPLIANCE LAYOUT
You must create and organize the project files strictly into the following layers inside the `src/` or root directory:

1. CORE / DOMAIN LAYER (`domain/`) - Business Logic (Independent of frameworks, UI, or libraries)
   - `domain/entities/`: Pure TypeScript interfaces defining data schemas (e.g., Student, Roadmap, SkillGap, Notification).
   - `domain/usecases/`: Pure business workflows (e.g., GetStudentProfile, CalculateRoadmapProgress, UpdateStudySchedule).

2. DATA LAYER (`data/`) - Data Sources & Gateways
   - `data/mocks/mockDataStore.ts`: The central repository of all mock data schemas populated with the target student persona (Kittitat "Boss" Mukdasanit, Year 3 Computer Technology at KMUTNB, building a CED One-Stop Service web app).
   - `data/repositories/`: Concrete implementations of domain interfaces that pull data directly from the local mock data store.

3. PRESENTATION LAYER (`presentation/` or unified Next.js App Router hooks) - Delivery Mechanism
   - `presentation/components/`: Reusable, dumb UI layout modules styled with Tailwind CSS and Lucide React.
   - `presentation/hooks/`: Custom React hooks (e.g., `useDashboard.ts`, `useAIAsistant.ts`) that call domain use-cases and manage component local states.
   - `app/`: Next.js pages/routes serving merely as clean entry points that pass data down to the presentation components.

---

# TECH STACK & LOCALIZATION REQUIREMENTS
- **Framework:** Next.js (App Router, utilizing App Directory for structural routing only).
- **Styling:** Tailwind CSS (modern palette: slate/blue/indigo layout, css grids, flexbox, clean card styles).
- **Icons:** Lucide React icons.
- **Language:** UI architecture, buttons, and system headers in English; custom AI advice strings, instruction text, and system notifications in natural, encouraging Thai language.

---

# STEP-BY-STEP IMPLEMENTATION FOR CLAUDE CODE

## Step 1: Initialize the Domain Entities & Usecases
Generate explicit type definitions inside `domain/entities/` corresponding to all 10 core modules. Create pure TypeScript usecases that execute functional transformations (e.g., sorting schedule blocks by priority weight, filtering active notifications).

## Step 2: Establish the Data Layer (The High-Fidelity Mock Database)
Create `data/mocks/mockDataStore.ts`. Populate this dataset completely. Ensure complete, realistic mock data arrays are built out for:
1. AI Assessment Profile
2. Adaptive Learning Roadmaps
3. AI Learning Assistant Prompt Logs
4. Course & Resource Recommendations
5. Study Analytics & Progress Logging
6. DevOps/Full-Stack Skill Gap Matrix
7. Academic & Internship Career Timelines
8. Weekly Smart Planner Calendar (Monday-Sunday slots)
9. Knowledge Gap History Logs
10. Notification Event Queue Stream

Implement repositories in `data/repositories/` that read from this mock file, returning data wrapped in asynchronous Promises to mock real API latencies.

## Step 3: Architect Custom Presentation Hooks
Create React custom state hooks within the presentation tier. These hooks must isolate page logic from the view components. For instance, `useAIPlatform.ts` handles:
- Simulating a mock AI response in Thai after a 1-second timeout when a query is submitted.
- Dynamically recalculating progress states when a roadmap task is toggled.
- Filtering out notifications from the active badge array when clicked.

## Step 4: Build Presentation UI Components & Views
Create gorgeous, production-grade responsive dashboard layouts utilizing clean grids and cards:
- **Sidebar & Navbar:** Clean navigation shell with a real-time reactive notification counter badge and interactive dropdown container.
- **Main Dashboard View:** Highlights overall roadmap progress bars, current tracking status alerts, and a widget displaying today's prioritized calendar allocations.
- **Roadmap & Skills Tab:** Displays a clean interactive vertical checkpoint milestone track coupled with a visual Skill Gap analysis comparison matrix (Green badges for matching skills, Amber badges for gaps).
- **AI Tutoring Interface:** Features an interactive split view consisting of a functional chat panel on one side and resource recommendations card feeds on the other.

---

# EXECUTION STEPS FOR CLAUDE CODE AGENT
1. Analyze current project dependencies and layout configurations.
2. Formulate directory paths under the `domain/`, `data/`, and `presentation/` separation contract.
3. Write complete, robust, non-placeholder TypeScript code across all target layers.
4. Execute `npm run dev` to verify the code compiles smoothly without build warnings or architecture layout errors.