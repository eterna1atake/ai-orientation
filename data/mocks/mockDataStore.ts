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

export const mockAnalytics: StudyAnalytics = {
  studentId: "std-001",
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
];
