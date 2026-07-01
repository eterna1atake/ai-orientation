# CONTEXT
You are working on a high-fidelity frontend mockup prototype for the "AI Study Orientation Platform" using Next.js (App Router), Tailwind CSS, and Lucide React icons. The target users are Thai undergraduate engineering/technology students. We do not have a backend database yet; everything must be powered by comprehensive, structured client-side mock data embedded within the project files.

# OBJECTIVE
Your task is to programmatically generate, style, and structure the dashboard and sub-pages to visualize the platform's 10 core modules. Ensure the design is modern, professional, scannable, and looks like a production-ready application.

# TECH STACK REQUIREMENTS
- **Framework:** Next.js (App Router, utilizing `app/page.tsx`, `app/components/*`, etc.)
- **Styling:** Tailwind CSS (fully responsive, utilizing grid/flexbox layouts, cards, progress bars, modern slate/blue/indigo color palettes).
- **Icons:** Lucide React (clean, consistent layout iconography).
- **Language:** UI text should be mostly English for navigation, but instructional content, notifications, and AI feedback strings should be in natural, friendly Thai language.

---

# INSTRUCTIONS FOR CLAUDE CODE EXECUTION

## Step 1: Create Mock Data Utility
Generate a TypeScript file (e.g., `src/data/mockData.ts` or `app/data/mockData.ts`) containing comprehensive static data matching the following student persona:
- **Name:** Kittitat Mukdasanit (Nickname: Boss)
- **University/Major:** Year 3, Computer Technology, KMUTNB
- **Current Project:** CED One-Stop Service Website (Next.js, Tailwind CSS, MongoDB, DevOps)
- **Target Job:** Full-Stack Developer / DevOps Engineer
- **Data Completeness:** Ensure the JSON structures for all 10 modules (AI Assessment, Adaptive Roadmap, Learning Assistant, Resource Recommendations, Progress Tracking, Skill Gap, Career Timeline, Smart Calendar Planner, Knowledge Gaps, and Notification Queue) are fully populated.

## Step 2: Build the Core Layout & Shell
Create a sidebar-based main application layout:
- **Sidebar:** Navigation links pointing to the main dashboards (Dashboard, Study Planner, Career & Skill Gap, AI Assistant, Analytics).
- **Top Navbar:** Display student profile summary (Boss, Year 3), active notifications count, and a toggleable notification dropdown queue (Module 10).

## Step 3: Implement Dashboard Widgets & Viewports
Construct the main viewports using clean, interactive Tailwind components:
1. **Overview Dashboard (`app/page.tsx`):**
   - Renders **Module 5 (Analytics)** using clear visual progress bars (e.g., 74% Roadmap Completed, Task Velocity charts using styled divs/CSS grids).
   - Renders **Module 10 (Notifications Queue)** with clickable alert cards in Thai.
   - Showcases a dynamic snippet of **Module 8 (Smart Study Planner)** displaying "Today's Study Blocks".

2. **AI Orientation & Roadmap Tab (`app/roadmap/page.tsx`):**
   - Renders **Module 2 (Personalized Roadmap)** as a vertical or horizontal interactive timeline (Timeline Nodes: Sophomore, Junior, Senior phases).
   - Integrates **Module 6 (Skill Gap Analysis)** displaying a side-by-side comparison matrix of required DevOps/Full-Stack skills vs. current student levels with color-coded status badges (e.g., Green for Match, Amber for Gap).
   - Displays **Module 7 (Career Guidance)** recommendations like "AWS Certified Cloud Practitioner" or "Toyota Tsusho Nexty Internship window".

3. **AI Assistant & Resource Tab (`app/assistant/page.tsx`):**
   - Implements a mock chat interface representing **Module 3 (AI Learning Assistant)** with pre-populated, context-aware dialogue threads regarding "Next.js Middleware Optimization" or "MongoDB Indexing".
   - Renders **Module 4 (Resource Recommendations)** as clean card grids linking to mock courses, videos, and documentation.
   - Displays **Module 9 (Knowledge Gap Detection)** flagging recent quiz blind spots (e.g., "Struggling with Pointer Allocation or Docker Networks") along with micro-review triggers.

## Step 4: Add Simple Frontend State Reactivity
- Implement client-side state (`useState`) to simulate interactivity:
  - Switching between different dashboard tabs smoothly.
  - Clicking a "Complete Task" button shifts progress bars dynamically.
  - Clicking a notification dismisses it from the active list count.
  - Inputting a question in the Mock Chat appends a simulated, smart AI response in Thai after a 1-second timeout.

---

# EXECUTION STEPS
1. Verify the project directory structure.
2. Initialize or modify necessary file paths (`app/page.tsx`, layout, components).
3. Populate files with complete, clean, non-placeholder TypeScript code.
4. Run `npm run dev` to verify the build is error-free.