import {
  Student,
  Roadmap,
  ChatThread,
  Resource,
  StudyAnalytics,
  SkillGapItem,
  CareerMilestone,
  StudyBlock,
  KnowledgeGap,
  NotificationEvent,
  UniversityCourse,
  DegreeRequirement,
  AcademicRecord,
  AssessmentQuestion,
  AssessmentTrackDefinition,
  SubscriptionPlan,
  PlanFeatureRow,
  UserSubscription,
  StudyActivityDay,
} from "@/domain/entities";

// ---------------------------------------------------------------------------
// Module 1: AI Assessment Profile + Student
// ---------------------------------------------------------------------------

export const mockStudent: Student = {
  id: "std-001",
  fullName: "Kittitat Mukdasanit",
  nickname: "Boss",
  university: "King Mongkut's University of Technology North Bangkok (KMUTNB)",
  faculty: "Faculty of Information Technology and Digital Innovation",
  major: "Computer Technology",
  year: 3,
  studentId: "6501234567",
  avatarInitials: "KM",
  currentProject: {
    name: "CED One-Stop Service Website",
    description:
      "An all-in-one student service platform for the Cooperative Education Department (CED), covering document submission, status tracking, and automated notifications.",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Docker", "GitHub Actions"],
  },
  targetJob: "Full-Stack Developer / DevOps Engineer",
  gpa: 3.42,
  assessmentProfile: {
    assessmentDate: "2026-06-15",
    personaSummary:
      "Boss tends to excel at work that connects systems together, enjoys seeing tangible results, and shows strong interest in making deployments run smoothly — a great fit for a Full-Stack track that extends into DevOps.",
    learningStyle: "Kinesthetic",
    strengths: [
      { trait: "Problem Decomposition", score: 82, description: "Breaks down complex problems into smaller pieces effectively" },
      { trait: "Frontend Implementation", score: 78, description: "Quick at translating UI designs into working code" },
      { trait: "System Thinking", score: 65, description: "Starting to see the big picture, but still needs practice connecting infrastructure pieces" },
    ],
    interests: ["Web Development", "Cloud Infrastructure", "Automation", "UI/UX"],
    recommendedTrack: "Full-Stack Development with DevOps Specialization",
    confidenceScore: 88,
  },
};

// ---------------------------------------------------------------------------
// Module 2: Adaptive Learning Roadmap
// ---------------------------------------------------------------------------

export const mockRoadmap: Roadmap = {
  id: "roadmap-001",
  studentId: "std-001",
  title: "Full-Stack & DevOps Readiness Roadmap",
  generatedFromAssessment: true,
  overallProgressPercent: 58,
  phases: [
    {
      id: "phase-sophomore",
      phase: "Sophomore",
      title: "Foundation Building",
      timeframe: "Year 2 (2024-2025)",
      isCurrent: false,
      tasks: [
        { id: "t-01", title: "Learn Data Structures & Algorithms Fundamentals", description: "Understand Big-O, Linked List, Tree, Graph", status: "completed", priorityWeight: 8, estimatedHours: 40 },
        { id: "t-02", title: "HTML/CSS/JavaScript Fundamentals", description: "Build a single-page website independently", status: "completed", priorityWeight: 7, estimatedHours: 30 },
        { id: "t-03", title: "Relational Database Fundamentals (SQL)", description: "Design schemas and write basic queries", status: "completed", priorityWeight: 6, estimatedHours: 20 },
      ],
    },
    {
      id: "phase-junior",
      phase: "Junior",
      title: "Applied Full-Stack Development",
      timeframe: "Year 3 (2025-2026)",
      isCurrent: true,
      tasks: [
        { id: "t-04", title: "Learn React & Next.js App Router", description: "Build a full-stack app using Next.js App Router", status: "completed", priorityWeight: 9, estimatedHours: 45 },
        { id: "t-05", title: "Design and Use MongoDB in a Real Project", description: "Do schema design and indexing for CED One-Stop Service", status: "in_progress", priorityWeight: 9, estimatedHours: 35 },
        { id: "t-06", title: "Build REST APIs with Next.js Route Handlers", description: "Create endpoints for CRUD and authentication", status: "in_progress", priorityWeight: 8, estimatedHours: 30 },
        { id: "t-07", title: "Docker & Containerization Fundamentals", description: "Convert the project into a deployable container", status: "in_progress", priorityWeight: 8, estimatedHours: 25 },
        { id: "t-08", title: "Set Up a Basic CI/CD Pipeline", description: "Use GitHub Actions for automated build/test", status: "locked", priorityWeight: 7, estimatedHours: 20 },
      ],
    },
    {
      id: "phase-senior",
      phase: "Senior",
      title: "Career Readiness & Specialization",
      timeframe: "Year 4 (2026-2027)",
      isCurrent: false,
      tasks: [
        { id: "t-09", title: "Internship / Cooperative Education in Full-Stack or DevOps", description: "Gain real-world work experience at a company", status: "locked", priorityWeight: 10, estimatedHours: 400 },
        { id: "t-10", title: "Pass the AWS Certified Cloud Practitioner Exam", description: "Build a cloud infrastructure foundation for a DevOps track", status: "locked", priorityWeight: 8, estimatedHours: 30 },
        { id: "t-11", title: "Build a Capstone Project with Full CI/CD", description: "Showcase full pipeline skills from dev to production", status: "locked", priorityWeight: 9, estimatedHours: 100 },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Module 3: AI Learning Assistant Prompt Logs
// ---------------------------------------------------------------------------

export const mockChatThreads: ChatThread[] = [
  {
    id: "thread-01",
    topic: "Next.js Middleware Optimization",
    lastUpdated: "2026-06-28T14:20:00+07:00",
    messages: [
      {
        id: "msg-01",
        threadId: "thread-01",
        role: "student",
        content: "Why does my middleware slow down every request, even for routes that have nothing to do with auth?",
        timestamp: "2026-06-28T14:18:00+07:00",
      },
      {
        id: "msg-02",
        threadId: "thread-01",
        role: "ai",
        content:
          "To optimize your Next.js Middleware, first check your matcher config — middleware runs on every request matching its pattern. Try scoping it down with config.matcher so it only targets routes that actually need the authentication guard.",
        timestamp: "2026-06-28T14:20:00+07:00",
      },
    ],
  },
  {
    id: "thread-02",
    topic: "MongoDB Indexing",
    lastUpdated: "2026-06-25T20:05:00+07:00",
    messages: [
      {
        id: "msg-03",
        threadId: "thread-02",
        role: "student",
        content: "The CED request list page gets really slow once there's a lot of data. How should I index it?",
        timestamp: "2026-06-25T20:02:00+07:00",
      },
      {
        id: "msg-04",
        threadId: "thread-02",
        role: "ai",
        content:
          "I'd recommend creating a compound index on the fields you query most often, like { studentId: 1, status: 1 }, and using explain('executionStats') to check whether the query is actually using the index or scanning the whole collection.",
        timestamp: "2026-06-25T20:05:00+07:00",
      },
    ],
  },
  {
    id: "thread-03",
    topic: "Docker Networking Confusion",
    lastUpdated: "2026-06-20T10:40:00+07:00",
    messages: [
      {
        id: "msg-05",
        threadId: "thread-03",
        role: "student",
        content: "My frontend and backend containers can't talk to each other at all. Did I set up the network wrong?",
        timestamp: "2026-06-20T10:38:00+07:00",
      },
      {
        id: "msg-06",
        threadId: "thread-03",
        role: "ai",
        content:
          "Picture it this way: each container needs to be on the same network to communicate. If you're using docker-compose, it creates a default network automatically, and you can just call services by their service name.",
        timestamp: "2026-06-20T10:40:00+07:00",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Module 4: Course & Resource Recommendations
// ---------------------------------------------------------------------------

export const mockResources: Resource[] = [
  {
    id: "res-01",
    title: "Docker & Kubernetes: The Complete Guide",
    type: "course",
    provider: "Udemy",
    url: "https://www.udemy.com/course/docker-kubernetes/",
    durationLabel: "22 hours",
    relevantSkill: "Containerization",
    matchScore: 96,
    description: "Covers everything from Docker basics to Kubernetes orchestration for production",
  },
  {
    id: "res-02",
    title: "MongoDB Performance Best Practices",
    type: "documentation",
    provider: "MongoDB Official Docs",
    url: "https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/",
    durationLabel: "45 min read",
    relevantSkill: "Database Indexing",
    matchScore: 91,
    description: "Official documentation on analyzing and improving query performance",
  },
  {
    id: "res-03",
    title: "GitHub Actions CI/CD Crash Course",
    type: "video",
    provider: "YouTube - Fireship",
    url: "https://www.youtube.com/watch?v=R8_veQiYBjI",
    durationLabel: "18 min",
    relevantSkill: "CI/CD Pipeline",
    matchScore: 89,
    description: "A quick rundown of concepts and sample YAML workflows for automated build/test",
  },
  {
    id: "res-04",
    title: "AWS Certified Cloud Practitioner Prep",
    type: "certification",
    provider: "AWS Skill Builder",
    url: "https://skillbuilder.aws/",
    durationLabel: "6 weeks",
    relevantSkill: "Cloud Infrastructure",
    matchScore: 85,
    description: "A prep course for AWS's entry-level certification exam",
  },
  {
    id: "res-05",
    title: "Next.js Route Handlers Deep Dive",
    type: "article",
    provider: "Next.js Blog",
    url: "https://nextjs.org/blog",
    durationLabel: "20 min read",
    relevantSkill: "API Development",
    matchScore: 82,
    description: "A structured approach to designing REST APIs with Route Handlers",
  },
  {
    id: "res-06",
    title: "Pointers and Memory Management in C",
    type: "video",
    provider: "YouTube - freeCodeCamp",
    url: "https://www.youtube.com/watch?v=zuegQmMdy8M",
    durationLabel: "1 hour 30 min",
    relevantSkill: "Memory Management",
    matchScore: 74,
    description: "Builds a foundation in pointers and memory management with easy-to-follow animations",
  },
];

// ---------------------------------------------------------------------------
// Module 5: Study Analytics & Progress Logging
// ---------------------------------------------------------------------------

export const mockAcademicRecord: AcademicRecord = {
  currentGPA: 3.42,
  targetGPA: 3.6,
  earnedCredits: 98,
  totalCreditsRequired: 145,
  graduationMilestones: [
    { id: "gm-01", title: "Complete all Year 2 core courses", targetLabel: "Semester 2/2025", completed: true },
    { id: "gm-02", title: "Pass KMUTNB English Proficiency Test", targetLabel: "Semester 1/2026", completed: true },
    { id: "gm-03", title: "Earn 120+ credits", targetLabel: "Semester 1/2026", completed: false },
    { id: "gm-04", title: "Cooperative Education Placement", targetLabel: "Semester 2/2026", completed: false },
    { id: "gm-05", title: "Capstone Project Defense", targetLabel: "Semester 2/2027", completed: false },
  ],
};

// Deterministic 10-week daily activity log ending "today" (2026-07-02) for the
// Student Profile activity heatmap. Built from a fixed anchor + pure arithmetic
// (no Date.now()/Math.random()) so server and client render identical values.
function buildActivityLog(): StudyActivityDay[] {
  const ANCHOR = new Date("2026-07-02T00:00:00+07:00");
  const DAY_MS = 24 * 60 * 60 * 1000;
  const TOTAL_DAYS = 70;

  const days: StudyActivityDay[] = [];
  for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
    const date = new Date(ANCHOR.getTime() - i * DAY_MS);
    const dayOfWeek = date.getDay(); // 0 = Sunday
    const weekIndex = Math.floor((TOTAL_DAYS - 1 - i) / 7); // 0 (oldest) .. 9 (this week)
    const isRestDay = dayOfWeek === 0 || i % 11 === 0;

    let hours = 0;
    if (!isRestDay) {
      const weekdayBase = dayOfWeek === 6 ? 1.5 : 2.5;
      const examCrunchBonus = weekIndex * 0.15; // busier as the term progresses toward today
      hours = Math.round((weekdayBase + examCrunchBonus) * 2) / 2;
    }

    days.push({ date: date.toISOString().slice(0, 10), hours });
  }
  return days;
}

export const mockAnalytics: StudyAnalytics = {
  studentId: "std-001",
  academicRecord: mockAcademicRecord,
  activityLog: buildActivityLog(),
  roadmapCompletionPercent: 58,
  totalTasksCompleted: 7,
  totalTasksRemaining: 5,
  currentStreakDays: 12,
  averageDailyFocusMinutes: 145,
  weeklyVelocity: [
    { weekLabel: "Week 1", tasksCompleted: 1, hoursStudied: 8 },
    { weekLabel: "Week 2", tasksCompleted: 2, hoursStudied: 11 },
    { weekLabel: "Week 3", tasksCompleted: 1, hoursStudied: 9 },
    { weekLabel: "Week 4", tasksCompleted: 3, hoursStudied: 14 },
    { weekLabel: "Week 5", tasksCompleted: 2, hoursStudied: 12 },
    { weekLabel: "Week 6", tasksCompleted: 3, hoursStudied: 15 },
  ],
  subjectBreakdown: [
    { subject: "Next.js / React", hoursStudied: 34 },
    { subject: "MongoDB / Database", hoursStudied: 22 },
    { subject: "Docker / DevOps", hoursStudied: 18 },
    { subject: "Algorithms Review", hoursStudied: 10 },
    { subject: "English for Tech", hoursStudied: 6 },
  ],
};

// ---------------------------------------------------------------------------
// Module 6: DevOps/Full-Stack Skill Gap Matrix
// ---------------------------------------------------------------------------

export const mockSkillGaps: SkillGapItem[] = [
  { id: "sk-01", skillName: "React / Next.js", category: "Frontend", requiredLevel: 85, currentLevel: 80, status: "match", recommendedAction: "Maintain this level by continuing to build projects" },
  { id: "sk-02", skillName: "Tailwind CSS", category: "Frontend", requiredLevel: 75, currentLevel: 78, status: "match", recommendedAction: "Already solid — try mentoring juniors to reinforce it" },
  { id: "sk-03", skillName: "Node.js / Express", category: "Backend", requiredLevel: 80, currentLevel: 60, status: "gap", recommendedAction: "Practice building APIs beyond Next.js Route Handlers" },
  { id: "sk-04", skillName: "Authentication & Security", category: "Backend", requiredLevel: 75, currentLevel: 45, status: "critical_gap", recommendedAction: "Learn JWT, session management, and OWASP basics soon" },
  { id: "sk-05", skillName: "MongoDB Schema Design", category: "Database", requiredLevel: 80, currentLevel: 65, status: "gap", recommendedAction: "Practice schema design patterns for relational-like data in MongoDB" },
  { id: "sk-06", skillName: "SQL Fundamentals", category: "Database", requiredLevel: 70, currentLevel: 72, status: "match", recommendedAction: "Solid foundation — use it to move on to data warehousing" },
  { id: "sk-07", skillName: "Docker", category: "DevOps", requiredLevel: 80, currentLevel: 55, status: "gap", recommendedAction: "Containerize both the frontend and backend of the CED project" },
  { id: "sk-08", skillName: "CI/CD (GitHub Actions)", category: "DevOps", requiredLevel: 75, currentLevel: 30, status: "critical_gap", recommendedAction: "Start with a simple lint/test workflow before adding deploy" },
  { id: "sk-09", skillName: "Cloud Infrastructure (AWS)", category: "DevOps", requiredLevel: 70, currentLevel: 25, status: "critical_gap", recommendedAction: "Start studying for the AWS Certified Cloud Practitioner exam" },
  { id: "sk-10", skillName: "Git & Version Control", category: "Tools & Practices", requiredLevel: 80, currentLevel: 85, status: "match", recommendedAction: "Already strong — try advanced workflows like rebase strategies" },
  { id: "sk-11", skillName: "Testing (Unit/Integration)", category: "Tools & Practices", requiredLevel: 70, currentLevel: 40, status: "gap", recommendedAction: "Start writing unit tests for the project's business logic layer" },
];

// ---------------------------------------------------------------------------
// Module 7: Academic & Internship Career Timelines
// ---------------------------------------------------------------------------

export const mockCareerMilestones: CareerMilestone[] = [
  {
    id: "car-01",
    title: "Toyota Tsusho Nexty Internship Window",
    type: "internship",
    status: "open_now",
    windowLabel: "August 2026 - October 2026",
    organization: "Toyota Tsusho Nexty Electronics",
    description: "An IT/Full-Stack cooperative education program open to Year 3-4 students with a real project portfolio",
  },
  {
    id: "car-02",
    title: "AWS Certified Cloud Practitioner",
    type: "certification",
    status: "recommended",
    windowLabel: "Recommended before December 2026",
    organization: "Amazon Web Services",
    description: "An entry-level certification that strengthens a DevOps profile in the job market",
  },
  {
    id: "car-03",
    title: "Submit Cooperative Education Application for Semester 1/2026",
    type: "academic",
    status: "upcoming",
    windowLabel: "September 2026",
    organization: "Cooperative Education Department, KMUTNB",
    description: "Prepare documents and a portfolio to submit a cooperative education application through the CED One-Stop Service",
  },
  {
    id: "car-04",
    title: "Capstone Project: CED One-Stop Service (Full CI/CD)",
    type: "project",
    status: "upcoming",
    windowLabel: "January - April 2027",
    organization: "Department of Computer Technology",
    description: "Extend the current project with a full end-to-end pipeline to use as a capstone project",
  },
  {
    id: "car-05",
    title: "Thailand DevOps Meetup Bangkok",
    type: "networking",
    status: "open_now",
    windowLabel: "July 23, 2026",
    organization: "DevOps Thailand Community",
    description: "A meetup to connect with people in the DevOps field and pick up on industry trends",
  },
  {
    id: "car-06",
    title: "Secured a Cooperative Education Placement (2025)",
    type: "internship",
    status: "completed",
    windowLabel: "March 2025",
    organization: "-",
    description: "Successfully completed the first round of the cooperative education application process",
  },
];

// ---------------------------------------------------------------------------
// Module 8: Weekly Smart Planner Calendar (Monday-Sunday)
// ---------------------------------------------------------------------------

export const mockStudyBlocks: StudyBlock[] = [
  { id: "blk-01", day: "Monday", startTime: "09:00", endTime: "12:00", title: "Software Engineering Class", category: "class", priorityWeight: 6, completed: true },
  { id: "blk-02", day: "Monday", startTime: "13:30", endTime: "15:30", title: "Develop Backend API - CED Project", category: "project", priorityWeight: 9, completed: false },
  { id: "blk-03", day: "Monday", startTime: "19:00", endTime: "20:30", title: "Review MongoDB Indexing", category: "review", priorityWeight: 7, completed: false },

  { id: "blk-04", day: "Tuesday", startTime: "09:00", endTime: "12:00", title: "Database Systems Class", category: "class", priorityWeight: 6, completed: true },
  { id: "blk-05", day: "Tuesday", startTime: "14:00", endTime: "16:00", title: "Practice Docker Compose on the Real Project", category: "self_study", priorityWeight: 8, completed: false },

  { id: "blk-06", day: "Wednesday", startTime: "09:00", endTime: "12:00", title: "Computer Networks Class", category: "class", priorityWeight: 6, completed: false },
  { id: "blk-07", day: "Wednesday", startTime: "13:00", endTime: "15:00", title: "Build Frontend UI - Request List Page", category: "project", priorityWeight: 8, completed: false },
  { id: "blk-08", day: "Wednesday", startTime: "20:00", endTime: "21:00", title: "Read Up on AWS Cloud Practitioner", category: "career", priorityWeight: 5, completed: false },

  { id: "blk-09", day: "Thursday", startTime: "10:00", endTime: "12:00", title: "CED Project Team Meeting", category: "project", priorityWeight: 9, completed: false },
  { id: "blk-10", day: "Thursday", startTime: "15:00", endTime: "17:00", title: "Write Unit Tests for the Auth Module", category: "self_study", priorityWeight: 7, completed: false },

  { id: "blk-11", day: "Friday", startTime: "09:00", endTime: "12:00", title: "Human-Computer Interaction Class", category: "class", priorityWeight: 6, completed: false },
  { id: "blk-12", day: "Friday", startTime: "13:30", endTime: "15:00", title: "Set Up GitHub Actions Workflow", category: "self_study", priorityWeight: 8, completed: false },
  { id: "blk-13", day: "Friday", startTime: "19:30", endTime: "21:00", title: "Rest / Watch a Show", category: "rest", priorityWeight: 2, completed: false },

  { id: "blk-14", day: "Saturday", startTime: "10:00", endTime: "13:00", title: "Deep Work: Docker + CI/CD Integration", category: "self_study", priorityWeight: 9, completed: false },
  { id: "blk-15", day: "Saturday", startTime: "16:00", endTime: "17:30", title: "Exercise", category: "rest", priorityWeight: 3, completed: false },

  { id: "blk-16", day: "Sunday", startTime: "11:00", endTime: "13:00", title: "Review This Week's Plan + Plan Next Week", category: "review", priorityWeight: 6, completed: false },
  { id: "blk-17", day: "Sunday", startTime: "15:00", endTime: "17:00", title: "Prepare Portfolio for Cooperative Education", category: "career", priorityWeight: 7, completed: false },
];

// ---------------------------------------------------------------------------
// Module 9: Knowledge Gap History Logs
// ---------------------------------------------------------------------------

export const mockKnowledgeGaps: KnowledgeGap[] = [
  {
    id: "kg-01",
    topic: "Pointer Allocation",
    relatedSkill: "Memory Management",
    detectedDate: "2026-06-30",
    severity: "high",
    sourceQuiz: "Data Structures Quiz - Chapter 4",
    suggestedMicroReview: "Review the Pointers and Memory Management in C video (10 min)",
    resolved: false,
  },
  {
    id: "kg-02",
    topic: "Docker Networking",
    relatedSkill: "Containerization",
    detectedDate: "2026-06-27",
    severity: "high",
    sourceQuiz: "Quiz: Container Orchestration Basics",
    suggestedMicroReview: "Read a summary on Docker Bridge Networks and rebuild a docker-compose setup",
    resolved: false,
  },
  {
    id: "kg-03",
    topic: "JWT Token Expiry Handling",
    relatedSkill: "Authentication & Security",
    detectedDate: "2026-06-22",
    severity: "medium",
    sourceQuiz: "Code Review: Auth Module PR #14",
    suggestedMicroReview: "Review refresh token patterns and secure cookie storage",
    resolved: false,
  },
  {
    id: "kg-04",
    topic: "MongoDB Aggregation Pipeline",
    relatedSkill: "Database Query Design",
    detectedDate: "2026-06-14",
    severity: "medium",
    sourceQuiz: "Database Systems Quiz - Chapter 6",
    suggestedMicroReview: "Practice writing $match, $group, $lookup against sample data",
    resolved: true,
  },
  {
    id: "kg-05",
    topic: "CSS Grid vs Flexbox Layout",
    relatedSkill: "Frontend Implementation",
    detectedDate: "2026-05-30",
    severity: "low",
    sourceQuiz: "Quiz: Responsive Layout Patterns",
    suggestedMicroReview: "Review examples comparing Grid and Flexbox layouts",
    resolved: true,
  },
];

// ---------------------------------------------------------------------------
// Module 10: Notification Event Queue Stream
// ---------------------------------------------------------------------------

export const mockNotifications: NotificationEvent[] = [
  {
    id: "ntf-01",
    category: "career",
    priority: "high",
    title: "A Cooperative Education Window Just Opened!",
    message: "Toyota Tsusho Nexty is now accepting cooperative education applications — it's a great match for Boss's track. Check the details in the Career & Skill Gap tab.",
    createdAt: "2026-07-01T08:00:00+07:00",
    isRead: false,
  },
  {
    id: "ntf-02",
    category: "skill_gap",
    priority: "high",
    title: "New Critical Skill Gap Detected",
    message: "Boss's CI/CD skill level is still well below target. Consider starting the GitHub Actions Crash Course this week.",
    createdAt: "2026-06-30T19:30:00+07:00",
    isRead: false,
  },
  {
    id: "ntf-03",
    category: "planner",
    priority: "medium",
    title: "Don't Forget Deep Work This Saturday",
    message: "There's a Deep Work session planned: Docker + CI/CD Integration from 10:00-13:00. Get ready for it.",
    createdAt: "2026-06-30T09:00:00+07:00",
    isRead: false,
  },
  {
    id: "ntf-04",
    category: "roadmap",
    priority: "medium",
    title: "Another Roadmap Milestone Reached!",
    message: "The task 'Learn React & Next.js App Router' is now complete. Overall progress for the Junior Phase is at 60%.",
    createdAt: "2026-06-28T21:15:00+07:00",
    isRead: false,
  },
  {
    id: "ntf-05",
    category: "ai_assistant",
    priority: "low",
    title: "AI Assistant Has a New Suggestion",
    message: "Based on the recent conversation about Docker Networking, we've recommended some additional reading in the AI Assistant tab.",
    createdAt: "2026-06-25T20:10:00+07:00",
    isRead: true,
  },
  {
    id: "ntf-06",
    category: "system",
    priority: "low",
    title: "AI Assessment Profile Updated",
    message: "The system has re-analyzed Boss's learning profile. Check out the latest results on the Dashboard.",
    createdAt: "2026-06-15T10:00:00+07:00",
    isRead: true,
  },
  {
    id: "ntf-07",
    category: "system",
    priority: "high",
    title: "Course Enrollment for Semester 1/2026 Is Open",
    message: "Course registration for Semester 1/2026 is now open! Check out the AI-recommended courses based on your Skill Gap in the Course Selection tab before seats run out.",
    createdAt: "2026-07-01T09:00:00+07:00",
    isRead: false,
  },
];

// ---------------------------------------------------------------------------
// Module 11: University Course Catalog (Steps 3-7, mock Institutional API)
// ---------------------------------------------------------------------------

export const mockCourses: UniversityCourse[] = [
  {
    id: "crs-01",
    code: "060243401",
    name: "DevOps and Cloud Infrastructure",
    credits: 3,
    category: "major_elective",
    prerequisites: ["060233201"],
    difficultyScore: 4,
    avgWeeklyEffortHours: 6,
    relatedSkills: ["CI/CD (GitHub Actions)", "Docker", "Cloud Infrastructure (AWS)"],
    description: "CI/CD pipelines, containerization, infrastructure as code, and cloud deployment on AWS.",
    sections: [
      {
        id: "crs-01-s1",
        sectionLabel: "Sec 1",
        instructorName: "Dr. Anucha Wongpanya",
        instructorRating: 4.8,
        seatsLeft: 8,
        slots: [{ day: "Tuesday", startTime: "09:00", endTime: "12:00", room: "IT-405" }],
      },
      {
        id: "crs-01-s2",
        sectionLabel: "Sec 2",
        instructorName: "Asst. Prof. Preecha Srisawat",
        instructorRating: 4.1,
        seatsLeft: 21,
        slots: [{ day: "Thursday", startTime: "13:00", endTime: "16:00", room: "IT-406" }],
      },
    ],
  },
  {
    id: "crs-02",
    code: "060243102",
    name: "Information System Security",
    credits: 3,
    category: "major_core",
    prerequisites: ["060233103"],
    difficultyScore: 4,
    avgWeeklyEffortHours: 5,
    relatedSkills: ["Authentication & Security"],
    description: "Applied cryptography, authentication protocols, OWASP Top 10, and secure system design.",
    sections: [
      {
        id: "crs-02-s1",
        sectionLabel: "Sec 1",
        instructorName: "Assoc. Prof. Dr. Siriporn Chaiyasit",
        instructorRating: 4.6,
        seatsLeft: 12,
        slots: [{ day: "Monday", startTime: "09:00", endTime: "12:00", room: "IT-301" }],
      },
      {
        id: "crs-02-s2",
        sectionLabel: "Sec 2",
        instructorName: "Dr. Kittipong Ruangroj",
        instructorRating: 3.9,
        seatsLeft: 25,
        slots: [{ day: "Wednesday", startTime: "13:00", endTime: "16:00", room: "IT-302" }],
      },
    ],
  },
  {
    id: "crs-03",
    code: "060243205",
    name: "Advanced Database Systems",
    credits: 3,
    category: "major_elective",
    prerequisites: ["060223104"],
    difficultyScore: 3,
    avgWeeklyEffortHours: 4,
    relatedSkills: ["MongoDB Schema Design", "SQL Fundamentals"],
    description: "NoSQL data modeling, indexing strategies, query optimization, and distributed transactions.",
    sections: [
      {
        id: "crs-03-s1",
        sectionLabel: "Sec 1",
        instructorName: "Dr. Narisara Bunmee",
        instructorRating: 4.5,
        seatsLeft: 15,
        slots: [{ day: "Wednesday", startTime: "09:00", endTime: "12:00", room: "IT-204" }],
      },
    ],
  },
  {
    id: "crs-04",
    code: "060243303",
    name: "Software Testing and Quality Assurance",
    credits: 3,
    category: "major_elective",
    prerequisites: ["060233301"],
    difficultyScore: 3,
    avgWeeklyEffortHours: 4,
    relatedSkills: ["Testing (Unit/Integration)"],
    description: "Unit/integration testing, test automation, TDD workflow, and quality metrics in CI pipelines.",
    sections: [
      {
        id: "crs-04-s1",
        sectionLabel: "Sec 1",
        instructorName: "Asst. Prof. Dr. Warunee Thongchai",
        instructorRating: 4.4,
        seatsLeft: 18,
        slots: [{ day: "Thursday", startTime: "09:00", endTime: "12:00", room: "IT-207" }],
      },
      {
        id: "crs-04-s2",
        sectionLabel: "Sec 2",
        instructorName: "Dr. Somyot Klinchan",
        instructorRating: 4.0,
        seatsLeft: 9,
        slots: [{ day: "Friday", startTime: "13:00", endTime: "16:00", room: "IT-207" }],
      },
    ],
  },
  {
    id: "crs-05",
    code: "060243901",
    name: "Cooperative Education Preparation",
    credits: 1,
    category: "major_core",
    prerequisites: [],
    difficultyScore: 1,
    avgWeeklyEffortHours: 1,
    relatedSkills: [],
    description: "Resume writing, interview practice, and workplace readiness before the cooperative education semester.",
    sections: [
      {
        id: "crs-05-s1",
        sectionLabel: "Sec 1",
        instructorName: "Ajarn Pimchanok Saelim",
        instructorRating: 4.2,
        seatsLeft: 40,
        slots: [{ day: "Friday", startTime: "09:00", endTime: "11:00", room: "CED-101" }],
      },
    ],
  },
  {
    id: "crs-06",
    code: "060243207",
    name: "Cross-Platform Mobile Application Development",
    credits: 3,
    category: "major_elective",
    prerequisites: ["060233202"],
    difficultyScore: 3,
    avgWeeklyEffortHours: 5,
    relatedSkills: ["React / Next.js"],
    description: "Building iOS/Android apps with React Native, native APIs, and app store deployment.",
    sections: [
      {
        id: "crs-06-s1",
        sectionLabel: "Sec 1",
        instructorName: "Dr. Thanawat Phumsiri",
        instructorRating: 4.3,
        seatsLeft: 6,
        slots: [{ day: "Tuesday", startTime: "09:00", endTime: "12:00", room: "IT-408" }],
      },
      {
        id: "crs-06-s2",
        sectionLabel: "Sec 2",
        instructorName: "Dr. Thanawat Phumsiri",
        instructorRating: 4.3,
        seatsLeft: 17,
        slots: [{ day: "Tuesday", startTime: "13:00", endTime: "16:00", room: "IT-408" }],
      },
    ],
  },
  {
    id: "crs-07",
    code: "060243501",
    name: "Machine Learning Fundamentals",
    credits: 3,
    category: "major_elective",
    prerequisites: ["040203111"],
    difficultyScore: 5,
    avgWeeklyEffortHours: 8,
    relatedSkills: [],
    description: "Supervised/unsupervised learning, model evaluation, and hands-on labs with Python and scikit-learn.",
    sections: [
      {
        id: "crs-07-s1",
        sectionLabel: "Sec 1",
        instructorName: "Assoc. Prof. Dr. Chatchai Meesuk",
        instructorRating: 4.7,
        seatsLeft: 4,
        slots: [{ day: "Monday", startTime: "13:00", endTime: "16:00", room: "IT-501" }],
      },
    ],
  },
  {
    id: "crs-08",
    code: "080103032",
    name: "Technical English for Career Preparation",
    credits: 3,
    category: "general_education",
    prerequisites: [],
    difficultyScore: 2,
    avgWeeklyEffortHours: 2,
    relatedSkills: [],
    description: "Professional communication, technical documentation reading, and interview English for IT careers.",
    sections: [
      {
        id: "crs-08-s1",
        sectionLabel: "Sec 1",
        instructorName: "Ajarn Suthida Kraivit",
        instructorRating: 4.0,
        seatsLeft: 30,
        slots: [{ day: "Monday", startTime: "09:00", endTime: "12:00", room: "LA-210" }],
      },
      {
        id: "crs-08-s2",
        sectionLabel: "Sec 2",
        instructorName: "Ajarn David Collins",
        instructorRating: 4.6,
        seatsLeft: 11,
        slots: [{ day: "Friday", startTime: "13:00", endTime: "16:00", room: "LA-212" }],
      },
    ],
  },
];

export const mockDegreeRequirements: DegreeRequirement[] = [
  { category: "major_core", label: "Major Core Courses", requiredCredits: 88, earnedCredits: 62 },
  { category: "major_elective", label: "Major Elective Courses", requiredCredits: 21, earnedCredits: 12 },
  { category: "general_education", label: "General Education", requiredCredits: 30, earnedCredits: 24 },
  { category: "free_elective", label: "Free Electives", requiredCredits: 6, earnedCredits: 0 },
];

// ---------------------------------------------------------------------------
// Module 12: AI Assessment Questionnaire (Step 1)
// ---------------------------------------------------------------------------

export const mockAssessmentTracks: AssessmentTrackDefinition[] = [
  {
    key: "fullstack_devops",
    label: "Full-Stack Development with DevOps Specialization",
    personaSummary:
      "Boss excels at connecting systems from frontend to backend. He enjoys seeing tangible results and is interested in making deployments run smoothly. The Full-Stack track extending into DevOps is a perfect fit.",
  },
  {
    key: "data_ai",
    label: "Data Engineering & AI Development",
    personaSummary:
      "Boss enjoys asking questions about data and finding hidden patterns. The Data Engineering track leading into AI will allow his analytical strengths to shine.",
  },
  {
    key: "mobile_dev",
    label: "Mobile Application Development",
    personaSummary:
      "Boss values user experience and loves creating apps that people use every day. The Mobile Developer track will allow him to combine creativity with technical skills.",
  },
  {
    key: "security",
    label: "Cybersecurity & Infrastructure",
    personaSummary:
      "Boss has a detective-like perspective, always looking to reverse-engineer systems and find vulnerabilities. The Cybersecurity track will turn his curiosity into highly sought-after skills.",
  },
];

export const mockAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: "aq-01",
    order: 1,
    prompt: "When starting a new project, what do you usually do first?",
    helper: "Choose the option that best describes you. There are no right or wrong answers.",
    options: [
      {
        id: "aq-01-a",
        label: "Draw the overall system architecture to see how each part connects.",
        trackWeights: { fullstack_devops: 3, security: 1 },
        styleWeights: { Visual: 1 },
        traitScores: { "System Thinking": 85, "Problem Decomposition": 75 },
        interests: ["System Design"],
      },
      {
        id: "aq-01-b",
        label: "Start building the UI to see the visual result as fast as possible, then adjust later.",
        trackWeights: { fullstack_devops: 2, mobile_dev: 3 },
        styleWeights: { Kinesthetic: 1 },
        traitScores: { "Frontend Implementation": 85 },
        interests: ["UI/UX"],
      },
      {
        id: "aq-01-c",
        label: "Explore the available data first to see what insights it can provide.",
        trackWeights: { data_ai: 3 },
        styleWeights: { "Reading/Writing": 1 },
        traitScores: { "Data Intuition": 85 },
        interests: ["Data Analysis"],
      },
      {
        id: "aq-01-d",
        label: "Think about where the system could be attacked or fail.",
        trackWeights: { security: 3 },
        styleWeights: { "Reading/Writing": 1 },
        traitScores: { "Security Mindset": 85, "System Thinking": 65 },
        interests: ["Cybersecurity"],
      },
    ],
  },
  {
    id: "aq-02",
    order: 2,
    prompt: "How do you learn new things the fastest?",
    options: [
      {
        id: "aq-02-a",
        label: "Follow a workshop or tutorial, then tweak it to make it my own.",
        trackWeights: { fullstack_devops: 1 },
        styleWeights: { Kinesthetic: 3 },
        traitScores: { "Problem Decomposition": 70 },
        interests: [],
      },
      {
        id: "aq-02-b",
        label: "Watch a video or look at diagrams to get the big picture first.",
        trackWeights: {},
        styleWeights: { Visual: 3 },
        traitScores: { "System Thinking": 70 },
        interests: [],
      },
      {
        id: "aq-02-c",
        label: "Read official documentation or books thoroughly from start to finish.",
        trackWeights: { security: 1 },
        styleWeights: { "Reading/Writing": 3 },
        traitScores: { "Security Mindset": 60 },
        interests: [],
      },
      {
        id: "aq-02-d",
        label: "Listen to a podcast or have a friend explain and discuss it.",
        trackWeights: {},
        styleWeights: { Auditory: 3 },
        traitScores: { "Problem Decomposition": 60 },
        interests: [],
      },
    ],
  },
  {
    id: "aq-03",
    order: 3,
    prompt: "What kind of work makes you so engaged that you lose track of time?",
    options: [
      {
        id: "aq-03-a",
        label: "Writing automation scripts to turn manual tasks into automated processes.",
        trackWeights: { fullstack_devops: 3 },
        styleWeights: { Kinesthetic: 1 },
        traitScores: { "System Thinking": 80 },
        interests: ["Automation"],
      },
      {
        id: "aq-03-b",
        label: "Building apps that people actually use and getting their feedback.",
        trackWeights: { mobile_dev: 3, fullstack_devops: 1 },
        styleWeights: { Kinesthetic: 1 },
        traitScores: { "Frontend Implementation": 80 },
        interests: ["Web Development"],
      },
      {
        id: "aq-03-c",
        label: "Playing with datasets until discovering insights that others missed.",
        trackWeights: { data_ai: 3 },
        styleWeights: { Visual: 1 },
        traitScores: { "Data Intuition": 80 },
        interests: ["Machine Learning"],
      },
      {
        id: "aq-03-d",
        label: "Debugging or analyzing a system to find the root cause of a deep issue.",
        trackWeights: { security: 3 },
        styleWeights: { "Reading/Writing": 1 },
        traitScores: { "Security Mindset": 80, "Problem Decomposition": 70 },
        interests: ["Reverse Engineering"],
      },
    ],
  },
  {
    id: "aq-04",
    order: 4,
    prompt: "If you could choose one free elective course right now, which would it be?",
    options: [
      {
        id: "aq-04-a",
        label: "Cloud & DevOps — I want to learn how to automate deployments.",
        trackWeights: { fullstack_devops: 3 },
        styleWeights: {},
        traitScores: { "System Thinking": 75 },
        interests: ["Cloud Infrastructure"],
      },
      {
        id: "aq-04-b",
        label: "Mobile App Development — I want to publish my own app to the store.",
        trackWeights: { mobile_dev: 3 },
        styleWeights: {},
        traitScores: { "Frontend Implementation": 75 },
        interests: ["Mobile Development"],
      },
      {
        id: "aq-04-c",
        label: "Machine Learning — I want to build predictive models from real data.",
        trackWeights: { data_ai: 3 },
        styleWeights: {},
        traitScores: { "Data Intuition": 75 },
        interests: ["Machine Learning"],
      },
      {
        id: "aq-04-d",
        label: "Ethical Hacking — I want to learn how to ethically hack systems.",
        trackWeights: { security: 3 },
        styleWeights: {},
        traitScores: { "Security Mindset": 75 },
        interests: ["Cybersecurity"],
      },
    ],
  },
  {
    id: "aq-05",
    order: 5,
    prompt: "What does your ideal future self look like after graduation?",
    options: [
      {
        id: "aq-05-a",
        label: "An engineer who maintains large systems reliably and deploys daily.",
        trackWeights: { fullstack_devops: 3, security: 1 },
        styleWeights: {},
        traitScores: { "System Thinking": 80 },
        interests: ["DevOps Culture"],
      },
      {
        id: "aq-05-b",
        label: "A developer with my own applications used by real people.",
        trackWeights: { mobile_dev: 3, fullstack_devops: 1 },
        styleWeights: {},
        traitScores: { "Frontend Implementation": 78 },
        interests: ["Product Building"],
      },
      {
        id: "aq-05-c",
        label: "An expert who uses data to help organizations make critical decisions.",
        trackWeights: { data_ai: 3 },
        styleWeights: {},
        traitScores: { "Data Intuition": 78 },
        interests: ["Data Engineering"],
      },
      {
        id: "aq-05-d",
        label: "A system guardian trusted by organizations to handle all security.",
        trackWeights: { security: 3 },
        styleWeights: {},
        traitScores: { "Security Mindset": 78 },
        interests: ["Security Operations"],
      },
    ],
  },
  {
    id: "aq-06",
    order: 6,
    prompt: "What role do you naturally take on in group projects?",
    options: [
      {
        id: "aq-06-a",
        label: "The one who structures the work and delegates tasks so everyone is on the same page.",
        trackWeights: { fullstack_devops: 2 },
        styleWeights: { Visual: 1 },
        traitScores: { "Problem Decomposition": 82, "System Thinking": 72 },
        interests: ["Team Leadership"],
      },
      {
        id: "aq-06-b",
        label: "The one who implements the most difficult parts to get things done.",
        trackWeights: { fullstack_devops: 1, mobile_dev: 2 },
        styleWeights: { Kinesthetic: 1 },
        traitScores: { "Frontend Implementation": 76, "Problem Decomposition": 70 },
        interests: [],
      },
      {
        id: "aq-06-c",
        label: "The one who researches and summarizes evidence to support team decisions.",
        trackWeights: { data_ai: 2 },
        styleWeights: { "Reading/Writing": 1 },
        traitScores: { "Data Intuition": 76 },
        interests: [],
      },
      {
        id: "aq-06-d",
        label: "The one who reviews the work to find mistakes before submission, as I often spot overlooked flaws.",
        trackWeights: { security: 2 },
        styleWeights: { "Reading/Writing": 1 },
        traitScores: { "Security Mindset": 76, "Problem Decomposition": 68 },
        interests: [],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Module 13: Subscription Plans (Free / Pro / Diamond simulation)
// ---------------------------------------------------------------------------

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    tier: "free",
    name: "Free",
    tagline: "Every core planning tool, free for every student",
    priceMonthly: 0,
    priceYearly: 0,
    highlighted: false,
    perks: [
      "AI Assessment, Course Selection & Schedule Builder",
      "Dashboard & Weekly Smart Planner",
      "Adaptive Roadmap & Skill Gap Matrix",
      "AI Assistant — 5 messages / day",
    ],
  },
  {
    tier: "pro",
    name: "Pro",
    tagline: "Unlock unlimited AI help and deeper progress tracking",
    priceMonthly: 9.99,
    priceYearly: 99.99,
    highlighted: true,
    perks: [
      "Everything in Free",
      "Unlimited AI Assistant messages",
      "GPA & Credit progress tracking",
      "Full Knowledge Gap history log",
    ],
  },
  {
    tier: "diamond",
    name: "Diamond",
    tagline: "White-glove guidance all the way to graduation",
    priceMonthly: 29.99,
    priceYearly: 299.99,
    highlighted: false,
    perks: [
      "Everything in Pro",
      "1-on-1 mentor consultation, 2 sessions / month",
      "Priority cooperative education matching",
      "Priority AI Assistant response speed",
    ],
  },
];

export const mockPlanFeatures: PlanFeatureRow[] = [
  { key: "ai_assessment", label: "AI Assessment", free: true, pro: true, diamond: true },
  { key: "course_selection", label: "Course Selection & Optimized Scheduling", free: true, pro: true, diamond: true },
  { key: "dashboard", label: "Dashboard & Weekly Smart Planner", free: true, pro: true, diamond: true },
  { key: "roadmap", label: "Adaptive Roadmap & Skill Gap Matrix", free: true, pro: true, diamond: true },
  { key: "ai_assistant", label: "AI Learning Assistant", free: "5 messages / day", pro: "Unlimited", diamond: "Unlimited + priority" },
  { key: "academic_progress", label: "GPA & Credit Progress Tracking", free: false, pro: true, diamond: true },
  { key: "knowledge_gap_history", label: "Knowledge Gap History Log", free: false, pro: true, diamond: true },
  { key: "mentor_sessions", label: "1-on-1 Mentor Consultation", free: false, pro: false, diamond: "2 sessions / month" },
  { key: "career_matching", label: "Priority Cooperative Education Matching", free: false, pro: false, diamond: true },
];

export const mockUserSubscription: UserSubscription = {
  studentId: "std-001",
  tier: "free",
  status: "active",
  subscribedSince: "2026-01-10",
  renewsOn: "2026-08-10",
  billingCycle: "monthly",
  aiAssistantMessagesUsedToday: 2,
};
