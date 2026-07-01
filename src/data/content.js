import webudgetImg from "../assets/WeBudget.png"; 
import smartmedAI from "../assets/SmartMedAI.png";
import stockImg from "../assets/StocksTrading.png";
import transferImg from "../assets/TransferLearning.png";
import readEstateImg from "../assets/Real_State.png";
import docuchatImg from "../assets/DocuChat.png";
import syntropyImg from "../assets/Syntropy.png"


export const personalInfo = {
  name: "Prateet Mishra",
  greeting: "Hi, I'm Prateet Mishra",
  uni: "MS in Computer Science, University of Southern California — new grad, Dec '25.",
  tagline: ["Software Engineer", "Applied AI Engineer"],
  bio: "Product-focused full-stack engineer with experience in real-time systems and applied AI.",
  email: "prateetm@usc.edu",
  resumeUrl: "https://prateetmishrausc.github.io/Resume-SDE/",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/prateet-mishra/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/PrateetMishraUSC", icon: "github" },
    { name: "Email", url: "mailto:prateetm@usc.edu", icon: "mail" },
  ],
};

export const heroContent = {
  kicker: "01 — introduction",
  headlineStart: "Software engineer crafting ",
  headlineAccent: "real-time systems",
  headlineEnd: " & applied AI.",
  metrics: [
    { value: "35K+", label: "daily users · ~60% faster page loads" },
    { value: "2", label: "research papers published (IEEE)" },
    { value: "50+", label: "student engineers led at USC ITS" },
  ],
  status: [
    { text: "open to work", ok: true },
    { text: "san francisco, ca", icon: "pin" },
  ],
};

export const navLinks = [
  { label: "work", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#connect" },
];

export const projects = [
    {
    title: "Syntropy",
    featured: true,
    description:
      "Describe any system in plain English. Syntropy's AI maps it to a live architecture canvas your whole team can explore, edit, and build on together in real time.",
    metric: { value: "realtime", label: "collaborative AI architecture canvas" },
    tech: ["React", "NextJS", "TypeScript", "Prisma", "LLM", "Transformers"],
    liveUrl: "https://syntropy-59hj.vercel.app/sign-in?redirect_url=https%3A%2F%2Fsyntropy-59hj.vercel.app%2F",
    sourceUrl: "https://github.com/PrateetMishraUSC/Syntropy",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
    image: syntropyImg,
  },
  {
    title: "DocuChat",
    featured: true,
    description:
      "A text-first multimodal RAG system that lets you upload documents and chat with them in real time, extracting tables and figures as searchable knowledge, with full source citations and retrieval transparency.",
    metric: { value: "100%", label: "answers grounded with source citations" },
    tech: ["React", "FastAPI", "LangChain", "Vector DB", "LLM", "Transformers"],
    liveUrl: "https://huggingface.co/spaces/prateetmishra/DocuChat",
    sourceUrl: "https://github.com/PrateetMishraUSC/Text-First-Multimodal-Rag",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
    image: docuchatImg,
  },
  {
    title: "WeBudget",
    featured: true,
    metric: { value: "2-in-1", label: "smart budgeting & fair bill splitting, unified" },
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
    metric: { value: "0.805", label: "accuracy on 200 clinical questions (+4–8%)" },
    tech: ["Python", "PyTorch", "RLAIF", "LoRA", "Hugging Face PEFT", "Qwen", "DeepSeek"],
    liveUrl: "https://prateetmishrausc.github.io/SmartMedAI/",
    sourceUrl: "https://github.com/PrateetMishraUSC/SmartMedAI",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    image: smartmedAI,
  },
  {
    title: "Transfer Learning for Image Classification",
    description:
      "Built a transfer-learning pipeline in TensorFlow/Keras (ResNet50/101, EfficientNet-B0, VGG16) with OpenCV preprocessing, on-the-fly augmentation, and hyperparameter sweeps for robust model selection.",
    tech: ["Python", "Tensorflow/Keras", "OpenCV", "CNN's"],
    liveUrl: "https://prateetmishrausc.github.io/Transfer-Learning-for-Image-Classification/", 
    sourceUrl: "https://github.com/PrateetMishraUSC/Transfer-Learning-for-Image-Classification",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: transferImg,
  },
  {
    title: "Real EState Price Prediction",
    description:
      "Built an end-to-end pricing pipeline in Python (pandas, scikit-learn) using feature engineering (BHK, sqft, locality), outlier handling, and k-fold validation, achieving R² = 0.87 on 10k+ Bengaluru listings.",
    tech: ["Python", "Pandas", "Scikit-learn", "Flask API", "Feature Engineering"],
    liveUrl: "https://real-estate-price-prediction-8mp8acuyj3yjpwawvecktq.streamlit.app/", 
    sourceUrl: "https://github.com/PrateetMishraUSC/Real-State-Price-Prediction",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: readEstateImg,
  },
    {
    title: "Stock Trading & Analytics Platform",
    featured: true,
    description:
      "Built a full-stack real-time trading platform with Angular, Node.js, and Redis Streams for sub-second stock updates across 100+ tickers. Enabled live trading with WebSockets, OAuth-secured sessions, and automated data pipelines on GCP Kubernetes (99.99% uptime).",
    metric: { value: "99.99%", label: "uptime · sub-second updates on 100+ tickers" },
    tech: ["Angular", "Express.js" ,"Node.js", "MongoDB", "Docker", "Redis", "GCP"],
    liveUrl: "https://stock-trading-and-analytics-platfor.vercel.app/search/home",
    sourceUrl: "https://github.com/PrateetMishraUSC/Stock-Trading-and-Analytics-Platform",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: stockImg,
  },
];

// TODO: Replace with your education details
export const education = [
  {
    degree: "Master of Science in Computer Science",
    gpa: "GPA: 3.45/4.00",
    school: "University of Southern California",
    date: "Jan 2024 — Dec 2025",
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
    gpa: "GPA: 9.23/10.0",
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
    description: "Led 50+ student assistants, cutting onboarding time ~30% and issue resolution ~25% through training programs and runbooks. Established standardized incident response procedures and mentorship frameworks adopted across 3 IT support departments.",
    icon: "academic",
  },
  {
    role: "Software Engineer Intern",
    company: "NICT Technologies",
    date: "July 2023 — Dec 2023",
    location: "Indore, India",
    description: "Built a React 18 frontend with code splitting and virtualized rendering, cutting page load time ~60% for 35K+ daily active users. Shrank release cycles from 2 weeks to 3 days with GitHub Actions CI/CD, and designed FastAPI/Node.js services with Redis caching handling 500+ API calls/min — reducing transaction failures ~33% and saving $2K+/month.",
    icon: "briefcase",
  },
  {
    role: "Software Engineer Intern",
    company: "Ypsilon IT Solutions",
    date: "Feb 2023 — Jun 2023",
    location: "Remote, India",
    description: "Unified 3 core auction workflows with Django, DRF, and MySQL, cut media upload latency ~55% for 500+ listings via batched inserts and presigned S3 uploads, and shipped a real-time bidding UI for 200+ concurrent users over WebSockets — lifting repeat-bidder retention 19.5% with a notification system dispatching 1K+ alerts per auction.",
    icon: "briefcase",
  },
];

export const coreTools = [
  { group: "languages", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "HTML5", "CSS3"] },
  { group: "frameworks", items: ["React", "Next.js", "Angular", "Node.js", "Express.js", "Django", "Django REST Framework", "FastAPI", "Tailwind CSS", "Prisma"] },
  { group: "cloud & devops", items: ["AWS (S3, EC2)", "GCP (GKE, Cloud Run)", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Linux"] },
  { group: "databases & tools", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Git", "REST APIs", "GraphQL", "WebSockets", "Jest", "Pytest"] },
  { group: "ai/ml", items: ["LLMs", "RAG", "LangChain", "FAISS", "Hugging Face", "PyTorch", "Sentence Transformers", "OCR", "Generative AI", "Agentic Workflows"] },
];
