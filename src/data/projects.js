import { links } from "./links";

export const projects = [
  {
    id: "voyageur",
    numeral: "01",
    title: "Voyageur",
    tagline: "Intelligent Travel & Expedition Management System",
    description:
      "A comprehensive full-stack travel planning and itinerary management platform architected for adventurers with multi-destination trip scheduling, expense budgeting, and interactive route logistics.",
    bullets: [
      "Engineered responsive trip planning modules with real-time multi-destination itinerary cards and scheduling.",
      "Designed secure multi-tier authentication with JWT, role-based access, and persisted trip state in MongoDB.",
      "Deployed live on Render with active itinerary pipelines and comprehensive trip management dashboards.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API"],
    image: "/projects/voyageur.png",
    links: links.projects.voyageur,
  },
  {
    id: "page-replacement",
    numeral: "02",
    title: "Page Replacement Simulator",
    tagline: "Operating Systems Memory Management Visualizer",
    description:
      "An interactive educational simulator and algorithm benchmark engine visualizing core OS memory management routines including LRU, FIFO, and LFU page replacement with step-by-step tracing.",
    bullets: [
      "Implemented dynamic step-by-step visualizers and interactive memory frame allocations for LRU, FIFO, and LFU.",
      "Computed real-time performance benchmarks: page hits, page faults, and comparative hit-ratio analytics.",
      "Designed an interactive LRU stack state monitor and adjustable playback speed slider for algorithm analysis.",
    ],
    tags: ["JavaScript", "React", "Operating Systems", "Algorithms", "Data Structures", "Tailwind CSS"],
    image: "/projects/page-replacement.png",
    links: links.projects.pageReplacement,
  },
  {
    id: "civic-issue",
    numeral: "03",
    title: "CIVIX",
    tagline: "Crowdsourced Civic Issue Reporting & Triage Portal",
    description:
      "A community grievance tracking platform connecting citizens with municipal authorities to report, track, and resolve local infrastructure anomalies with unprecedented ease and transparency.",
    bullets: [
      "Engineered location-tagged issue logging with photo evidence uploads, category tagging, and interactive map views.",
      "Integrated community voting and verification workflows to prioritize critical infrastructure repairs.",
      "Architected clean REST APIs and database models with status lifecycles (Pending, In Progress, Resolved).",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Geolocation", "REST API"],
    image: "/projects/civic-issue.png",
    links: links.projects.civicIssue,
  },
];
