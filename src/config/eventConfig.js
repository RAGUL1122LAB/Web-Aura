/**
 * WEB AURA 2K26 - Centralized Event Configuration
 * 
 * AUTHORITATIVE EVENT DATE & TIME:
 * 7 September 2026 at 9:00 AM
 * 
 * SCOPE:
 * Exactly 2 rounds, 5 questions per round, 10 marks per question.
 * Total marks: 100
 */

export const EVENT_CONFIG = {
  name: "WEB AURA 2K26",
  edition: "2K26",
  tagline: "DESIGN. DEVELOP. DEPLOY.",
  theme: "GTA: SAN ANDREAS EDITION",
  organization: "Department of Computer Science & Engineering, Tech Club",
  institution: "College of Engineering & Technology",
  webmasterEmail: "webaura2k26@organizers.internal",
  
  // Authoritative Date & Time (Strictly 7 September 2026, 9:00 AM)
  eventStartIso: "2026-09-07T09:00:00+05:30",
  eventDateDisplay: "7 September 2026",
  eventTimeDisplay: "9:00 AM IST",
  
  // Scoring Structure (EXACTLY 2 Rounds, 5 questions each, 10 marks per question)
  maxOverallScore: 100,
  rounds: [
    {
      id: 1,
      name: "Round 1: Presentation + Frontend",
      subtitle: "UI/UX, Architecture, Presentation & Client Implementation",
      maxMarks: 50,
      questionCount: 5,
      questionMax: 10,
      questions: [
        { id: "q1", title: "Q1: UI/UX Fidelity & Visual Cohesion", description: "Strict design consistency, responsiveness, accessibility & polish." },
        { id: "q2", title: "Q2: Frontend Architecture & Code Quality", description: "Modular components, clean state management & separation of concerns." },
        { id: "q3", title: "Q3: Presentation & Problem Solution Clarity", description: "Articulation of the problem statement and technical design decisions." },
        { id: "q4", title: "Q4: User Interaction & Dynamic Responsiveness", description: "Fluidity of user flows, form validation, error handling & micro-feedback." },
        { id: "q5", title: "Q5: Innovation & Creativity in Feature Execution", description: "Unique technical edge or delightful implementation detail." }
      ]
    },
    {
      id: 2,
      name: "Round 2: Backend + Database + Deployment",
      subtitle: "Data Modelling, APIs, Real-time Sync & Cloud Deployment",
      maxMarks: 50,
      questionCount: 5,
      questionMax: 10,
      questions: [
        { id: "q1", title: "Q1: Database Schema & Real-time Integration", description: "Schema normalization, indexing, Firestore listeners & data integrity." },
        { id: "q2", title: "Q2: Backend Logic & Business Rules", description: "Transactional safety, validation boundaries and edge case handling." },
        { id: "q3", title: "Q3: Cloud Deployment & Live Availability", description: "Hosting configuration, SSL, environment security and build optimization." },
        { id: "q4", title: "Q4: Role Security & Firestore Security Rules", description: "Enforcement of least privilege across participants, evaluators, and admins." },
        { id: "q5", title: "Q5: System Scalability & Overall Completeness", description: "End-to-end functionality, performance benchmarks and latency handling." }
      ]
    }
  ],

  // Dispatch Bulletin items (Styled after "Grove Street Times")
  dispatchNews: [
    {
      id: 1,
      tag: "FLAGSHIP EVENT",
      headline: "WEB AURA 2K26 OFFICIALLY ANNOUNCED!",
      date: "SEPTEMBER 2026",
      summary: "Get your rigs ready. Two grueling rounds of code, architecture, and live deployment begin 7 September 2026 at 9:00 AM sharp."
    },
    {
      id: 2,
      tag: "RULES UPDATE",
      headline: "ROUND 1 & 2 MARK DISTRIBUTION RELEASED",
      date: "RULES DISPATCH",
      summary: "50 marks for Frontend & Presentation + 50 marks for Backend & Deployment. Evaluators test live on 5 specific rubric criteria."
    },
    {
      id: 3,
      tag: "PODIUM REVEAL",
      headline: "REAL-TIME BROADCAST PODIUM CONFIRMED",
      date: "SYSTEM READY",
      summary: "Winner reveal will be triggered live across all spectator screens simultaneously. Respect + for the top 3 squads."
    }
  ],

  // Gallery Highlights
  galleryItems: [
    {
      id: 1,
      title: "HACKATHON WAR ROOM",
      caption: "Teams locked in fierce development sprints at the main engineering lab.",
      tag: "ROUND 1"
    },
    {
      id: 2,
      title: "EVALUATOR JURY PRESENTATION",
      caption: "Scoring panels evaluating component architecture and UI responsiveness.",
      tag: "EVALUATION"
    },
    {
      id: 3,
      title: "SERVER DEPLOYMENT RUSH",
      caption: "Database schemas and production builds validated under live load.",
      tag: "ROUND 2"
    },
    {
      id: 4,
      title: "TECH SYMPOSIUM KEYNOTE",
      caption: "Department faculty and alumni addressing participants before the kickoff.",
      tag: "CEREMONY"
    },
    {
      id: 5,
      title: "WINNERS PODIUM CELEBRATION",
      caption: "Trophy and cash prize distribution for the championship squads.",
      tag: "PODIUM"
    },
    {
      id: 6,
      title: "INNOVATION SHOWCASE LAB",
      caption: "Experimental prototypes and real-time cloud integrations on display.",
      tag: "LABS"
    }
  ]
};
