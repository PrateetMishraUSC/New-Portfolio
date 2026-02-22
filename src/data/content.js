import webudgetImg from "../assets/WeBudget.png"; 
import smartmedAI from "../assets/SmartMedAI.png";
import stockImg from "../assets/StocksTrading.png";
import transferImg from "../assets/TransferLearning.png";
import readEstateImg from "../assets/Real_State.png";
import roboImg from "../assets/robofriends.png";


export const personalInfo = {
  name: "Prateet",
  greeting: "Hi, I'm",
  uni: "MS CS @ University of Southern California | New Grad (Dec '25)",
  tagline: ["Software Engineer", "Applied AI Engineer"],
  bio: "I enjoy building end to end products that combine clean, responsive user experiences with scalable backend systems and practical applied AI. I prioritize reliability, performance, and thoughtful engineering so the work is accurate, trustworthy, and holds up in real world use.",
  email: "prateetm@usc.edu", 
  resumeUrl: "https://prateetmishrausc.github.io/Resume-SDE/",
  socials: [
    { name: "GitHub", url: "https://github.com/PrateetMishraUSC" },   
    { name: "LinkedIn", url: "https://www.linkedin.com/in/prateet-mishra/" },   
    { name: "Twitter", url: "https://x.com/prateet_mishra" },    
    { name: "Email", url: "mailto:prateetm@usc.edu" }, 
  ],
};

export const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#connect" },
];

export const projects = [
  {
    title: "WeBudget",
    description:
      "An AI-driven platform that unifies smart budgeting and seamless bill splitting delivering real-time insights, optimized spending with fair and transparent expense sharing.",
    tech: ["Next.js", "Prisma", "Supabase", "Tailwind CSS", "Shadcn UI" ,"Inngest", "Arcjet"],
    liveUrl: "https://we-budget-rho.vercel.app/", 
    sourceUrl: "https://github.com/PrateetMishraUSC/WeBudget", 
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    image: webudgetImg,
  },
  {
    title: "SmartMedAI",
    description:
      "Turned a 1.5B Qwen model into a medical Q&A assistant using LoRA + AI feedback (DPO)—no human labels. Trained on 30k prompts; accuracy rose to 0.805 on 200 clinical questions (+4–8% across metrics)",
    tech: ["Python", "PyTorch", "RLAIF", "LoRA", "Hugging Face PEFT", "Qwen", "DeepSeek"],
    sourceUrl: "https://prateetmishrausc.github.io/SmartMedAI/",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    image: smartmedAI,
  },
  {
    title: "Stock Trading & Analytics Platform",
    description:
      "Built a full-stack real-time trading platform with Angular, Node.js, and Redis Streams for sub-second stock updates across 100+ tickers. Enabled live trading with WebSockets, OAuth-secured sessions, and automated data pipelines on GCP Kubernetes (99.99% uptime).",
    tech: ["Angular", "Express.js" ,"Node.js", "MongoDB", "Docker", "Redis", "GCP"],
    sourceUrl: "https://github.com/PrateetMishraUSC/Stock-Trading-and-Analytics-Platform",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: stockImg,
  },
  {
    title: "Transfer Learning for Image Classification",
    description:
      "Built a transfer-learning pipeline in TensorFlow/Keras (ResNet50/101, EfficientNet-B0, VGG16) with OpenCV preprocessing, on-the-fly augmentation, and hyperparameter sweeps for robust model selection.",
    tech: ["Python", "Tensorflow/Keras", "OpenCV", "CNN's"],
    sourceUrl: "https://prateetmishrausc.github.io/Transfer-Learning-for-Image-Classification/",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: transferImg,
  },
  {
    title: "Real EState Price Prediction",
    description:
      "Built an end-to-end pricing pipeline in Python (pandas, scikit-learn) using feature engineering (BHK, sqft, locality), outlier handling, and k-fold validation, achieving R² = 0.87 on 10k+ Bengaluru listings. Deployed a Flask inference service with an interactive UI for real-time estimates, cutting manual evaluation time by ~60%.",
    tech: ["Python", "Pandas", "Scikit-learn", "Flask API", "Feature Engineering"],
    sourceUrl: "https://github.com/PrateetMishraUSC/Real-State-Price-Prediction",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: readEstateImg,
  },
  {
    title: "RoboFriends",
    description:
      "Robo Friends is a React-based web app that renders a card grid of user profiles and lets you filter them in real time with a search bar, updating the UI dynamically as you type.",
    tech: ["JavaScript" ,"React" ,"Node.js", "REST API", "Material UI"],
    liveUrl: "https://prateetmishra.github.io/robofriends/",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: roboImg,
  },
  
];

// TODO: Replace with your education details
export const education = [
  {
    degree: "Master of Science in Computer Science",
    gpa: "GPA: 3.45/4.00",
    school: "University of Southern California",
    date: "Aug 2023 — May 2025",
    location: "Los Angeles, CA",
    overview: "Focused on applied AI, distributed systems, and full-stack engineering with hands-on research and industry projects.",
    achievements: [
      "Technical Student Lead at USC Information and Technology Services",
      "Authored research on, 'A Novel Architecture For Securing Federated Learning with Cryptographic Techniques'.",
      "Developed a MedicalQA LLM fine-tuning pipeline using RLAIF to improve quality and reduce hallucinations.",
    ],
    coursework: [
      "Machine Learning",
      "Natural Language Processing",
      "Web Technologies",
      "Analysis of Algorithms",
      "Database Systems",
      "Information Retrieval and Web Search Engines",
    ],
  },
  {
    degree: "Bachelor of Technology in Computer Science and Information Technology",
    gpa: "GPA: 3.70/4.00",
    school: "Symbiosis University of Applied Sciences",
    date: "Aug 2019 — May 2023",
    location: "Indore, India",
    overview: "Built a strong foundation in data structures, algorithms, and software engineering with multiple award-winning projects.",
    achievements: [
      "Graduated in the top 10% of my class.",
      "Published a research paper on, 'Use of IoT in WiFi-based Home Automation System over the Cloud Using Arduino'.",
      "Built a bluetooth app-controlled humanoid robot. - SUAS Robotics Club",
    ],
    coursework: [
      "Data Structures",
      "Operating Systems",
      "Computer Networks",
      "Object-Oriented Programming",
      "Software Engineering",
      "Artificial Intelligence",
    ],
  },
];

export const experience = [
  {
    role: "Technical Student Lead",
    company: "USC, Information and Technology Services",
    date: "July 2024 — Dec 2025",
    location: "Los Angeles, CA",
    description: "Mentored 50 technical student assistants, ran training programs that cut onboarding time 30%, and bridged student teams with full-time engineers to streamline cross-team coordination.",
    icon: "academic",
  },
  {
    role: "Software Developer Intern",
    company: "NICT Technologies Private Limited",
    date: "July 2023 — Dec 2023",
    location: "Indore, India",
    description: "Collaborated in a 6-member team to build a responsive React + Tailwind digital asset marketplace, integrating FastAPI/Node.js + PostgreSQL with Redis caching, Dockerized services, and Web3.js/MetaMask—reducing transaction failures ~33%.",
    icon: "briefcase",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Ypsilon IT Solutions",
    date: "Jul 2022 — Dec 2022",
    location: "Indore, India",
    description: "Delivered a Scrap Auction web app in a 4-member team, leading cross-module integration (listing/bidding/checkout), optimizing uploads with batched DB inserts + pre-signed S3 URLs, and building 12 REST APIs + WebSockets for real-time bidding and alerts (200+ notifications/auction).",
    icon: "briefcase",
  },
  {
    role: "Python Developer Intern",
    company: "Cad and Cart",
    date: "Aug 2021 — Oct 2021",
    location: "Remote, India",
    description: "Built a Django + SQLite web app to digitize client/vendor/order workflows, improving operational efficiency and cutting down record retrieval time by ~50%, while automating Dayco catalog lookups with Selenium (Python/Openpyxl) and adding Excel uploads to speed data entry by ~28%.",
    icon: "briefcase",
  },
  {
    role: "Frontend Developer Intern",
    company: "Worth Technologies",
    date: "Jun 2020 — July 2020",
    location: "Remote, India",
    description: "Led development of the Urban Wings e-commerce platform using HTML/CSS/JavaScript with a PHP + MySQL backend, implementing user authentication, secure payments, and admin features for category management and order tracking to streamline operations.",
    icon: "briefcase",
  },
];

export const floatingIcons = [
  "python/python-original.svg",
  "react/react-original.svg",
  "nodejs/nodejs-original.svg",
  "docker/docker-original.svg",
  "typescript/typescript-original.svg",
  "git/git-original.svg",
  "postgresql/postgresql-original.svg",
  "javascript/javascript-original.svg",
  "mongodb/mongodb-original.svg",
  "pytorch/pytorch-original.svg",
  "nextjs/nextjs-original.svg",
  "linux/linux-original.svg",
];

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "python/python-original.svg" },
      { name: "JavaScript", icon: "javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "typescript/typescript-original.svg" },
      { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
      { name: "SQL", icon: "azuresqldatabase/azuresqldatabase-original.svg" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react/react-original.svg" },
      { name: "Angular", icon: "angular/angular-original.svg" },
      { name: "Next", icon: "nextjs/nextjs-original.svg" },
      { name: "HTML5", icon: "html5/html5-original.svg" },
      { name: "CSS3", icon: "css3/css3-original.svg" },
      { name: "Tailwind", icon: "tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
      { name: "Express", icon: "express/express-original.svg" },
      { name: "Django", icon: "django/django-plain.svg" },
      { name: "Flask", icon: "flask/flask-original.svg" },
      { name: "FastAPI", icon: "fastapi/fastapi-plain.svg" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original.svg" },
      { name: "MySQL", icon: "mysql/mysql-original.svg" },
      { name: "Supabase", icon: "supabase/supabase-original.svg" },
      { name: "Pinecone", icon: "custom-icons/pinecone.png", isCustom: true},
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Git", icon: "git/git-original.svg" },
      { name: "Docker", icon: "docker/docker-original.svg" },
      { name: "CI/CD", icon: "githubactions/githubactions-original.svg" },
      { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Firebase", icon: "firebase/firebase-original.svg" },
      { name: "Kubernetes", icon: "kubernetes/kubernetes-original.svg" },
    ],
  },
  {
    category: "AI/ML",
    items: [
      { name: "PyTorch",  icon: "pytorch/pytorch-original.svg" },
      { name: "Pandas",   icon: "pandas/pandas-original.svg" },
      { name: "RAG",      icon: "custom-icons/rag.svg", isCustom: true},
      { name: "LangChain",icon: "custom-icons/langchain-color.svg", isCustom: true},
      { name: "LangGraph",icon: "custom-icons/langgraph-color.svg", isCustom: true},
      { name: "LLMs",     icon: "custom-icons/ollama.svg", isCustom: true},
      { name: "MCP",      icon: "custom-icons/mcp.svg", isCustom: true},
  ]},
];
