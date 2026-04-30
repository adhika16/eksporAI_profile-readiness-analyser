import { AnalysisResult, GitHubData } from '../types/analysis';

// Mock implementation for development
// Replace with actual Azure OpenAI API calls when credentials are available
export async function analyzeProfiles(
  linkedinText: string,
  githubData: GitHubData
): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Detect primary skills from GitHub data
  const primarySkills = detectPrimarySkills(githubData);
  
  // Calculate realistic scores based on mock data quality
  const scores = calculateScores(githubData, primarySkills);
  
  // Generate dynamic proposals based on detected skills
  const proposals = generateDynamicProposals(primarySkills, githubData);
  
  return {
    overall_score: scores.overall,
    category_scores: scores.categories,
    scoring_justification: {
      technical_strength: `Strong portfolio with ${githubData.publicRepos} repositories. Good mix of frontend and backend projects. README quality varies but generally acceptable.`,
      communication: 'LinkedIn profile shows decent English proficiency but could benefit from more client-focused language and quantifiable achievements.',
      market_demand: `Skills in ${primarySkills.slice(0, 3).join(', ')} are highly demanded in the global freelance market.`,
      presentation: 'Profile is mostly complete but lacks quantifiable results and client benefit statements.',
      activity: 'Consistent GitHub activity over the past 6 months with regular commits and project updates.'
    },
    strengths: [
      {
        point: 'Strong technical foundation in modern web technologies',
        evidence: `Demonstrated expertise in ${primarySkills.slice(0, 3).join(', ')} through multiple production-ready projects`
      },
      {
        point: 'Diverse portfolio spanning frontend and backend',
        evidence: `Maintains ${githubData.publicRepos} repositories including full-stack applications, mobile apps, and API services`
      },
      {
        point: 'Active learner with consistent contribution history',
        evidence: githubData.contributionActivity
      }
    ],
    weaknesses: [
      {
        point: 'LinkedIn profile lacks client-focused language',
        improvement: 'Rewrite experience descriptions to focus on business outcomes and client benefits rather than just technical implementation'
      },
      {
        point: 'Limited quantifiable achievements',
        improvement: 'Add metrics to projects: user numbers, performance improvements, revenue impact, or efficiency gains'
      },
      {
        point: 'English proficiency needs refinement',
        improvement: 'Use Grammarly or similar tools to polish writing. Focus on clear, concise sentences and professional tone'
      }
    ],
    optimized_about: generateOptimizedAbout(primarySkills, githubData),
    recommended_rate: {
      min: 25,
      max: 45,
      currency: 'USD'
    },
    roadmap: generateRoadmap(),
    proposals: proposals
  };
}

// Detect primary skills from GitHub data
function detectPrimarySkills(githubData: GitHubData): string[] {
  const skillFrequency: Record<string, number> = {};
  
  // Count skills from top languages
  githubData.topLanguages.forEach(lang => {
    skillFrequency[lang] = (skillFrequency[lang] || 0) + 2;
  });
  
  // Count skills from repositories
  githubData.topRepositories.forEach(repo => {
    repo.languages.forEach(lang => {
      skillFrequency[lang] = (skillFrequency[lang] || 0) + 1;
    });
  });
  
  // Sort by frequency and return top skills
  return Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill);
}

// Calculate realistic scores
function calculateScores(githubData: GitHubData, primarySkills: string[]) {
  // Technical score based on repo quality and diversity
  const technicalScore = Math.min(85, 60 + githubData.publicRepos * 2);
  
  // Communication score (mock - would be analyzed from LinkedIn)
  const communicationScore = 62;
  
  // Market demand based on skills
  const highDemandSkills = ['TypeScript', 'React', 'Node.js', 'Python', 'Next.js', 'AI', 'Machine Learning'];
  const demandMatch = primarySkills.filter(skill => 
    highDemandSkills.some(hd => skill.toLowerCase().includes(hd.toLowerCase()))
  ).length;
  const marketDemandScore = Math.min(90, 50 + demandMatch * 10);
  
  // Presentation score (mock)
  const presentationScore = 58;
  
  // Activity score based on contribution description
  const activityScore = githubData.contributionActivity.includes('consistent') ? 75 : 50;
  
  // Calculate weighted overall score
  const overall = Math.round(
    technicalScore * 0.30 +
    communicationScore * 0.25 +
    marketDemandScore * 0.20 +
    presentationScore * 0.15 +
    activityScore * 0.10
  );
  
  return {
    overall,
    categories: {
      technical_strength: technicalScore,
      communication: communicationScore,
      market_demand: marketDemandScore,
      presentation: presentationScore,
      activity: activityScore
    }
  };
}

// Generate dynamic proposals based on user's top skills
function generateDynamicProposals(
  primarySkills: string[],
  githubData: GitHubData
): Array<{ jobType: string; proposal: string }> {
  const topSkill = primarySkills[0] || 'Web Development';
  const secondarySkill = primarySkills[1] || 'Full-Stack Development';
  const hasMobile = primarySkills.some(s => 
    s.toLowerCase().includes('react native') || s.toLowerCase().includes('mobile')
  );
  const hasBackend = primarySkills.some(s => 
    s.toLowerCase().includes('node') || s.toLowerCase().includes('python') || s.toLowerCase().includes('api')
  );
  
  const proposals = [];
  
  // Proposal 1: Web Development (always included)
  proposals.push({
    jobType: 'Build a Modern Web Application',
    proposal: `Hi there,

I noticed you're looking for a skilled developer to build a modern web application. With my expertise in ${topSkill} and ${secondarySkill}, I'm confident I can deliver exactly what you need.

In my recent project "${githubData.topRepositories[0]?.name}", I built a full-stack solution that ${githubData.topRepositories[0]?.description.toLowerCase()}. This experience has given me deep insights into creating scalable, user-friendly applications.

What sets me apart:
• Clean, maintainable code using ${primarySkills.slice(0, 3).join(', ')}
• Focus on performance and user experience
• Clear communication throughout the project
• Commitment to deadlines and quality

I'd love to discuss your project requirements in detail. Can we schedule a quick call this week?

Best regards`
  });
  
  // Proposal 2: Based on secondary skill (Mobile or Backend)
  if (hasMobile) {
    proposals.push({
      jobType: 'Develop a Cross-Platform Mobile App',
      proposal: `Hello,

Your mobile app project caught my attention! As a developer with hands-on experience in React Native and mobile development, I've successfully delivered apps that users love.

My project "${githubData.topRepositories.find(r => r.languages.some(l => l.includes('React Native')))?.name || githubData.topRepositories[1]?.name}" demonstrates my ability to create smooth, responsive mobile experiences with offline support and real-time features.

Here's how I can help:
• Build iOS and Android apps from a single codebase
• Implement push notifications and real-time sync
• Ensure smooth performance across devices
• Handle app store submission process

I've completed similar projects for clients with excellent results. Let's discuss how I can bring your app idea to life!

Looking forward to hearing from you.`
    });
  } else if (hasBackend) {
    proposals.push({
      jobType: 'Build Scalable Backend API',
      proposal: `Hi,

I specialize in building robust backend systems and APIs that power modern applications. Your project requirements align perfectly with my expertise in ${secondarySkill}.

In "${githubData.topRepositories.find(r => r.languages.some(l => l.includes('Python') || l.includes('Node')))?.name || githubData.topRepositories[1]?.name}", I architected a solution that handles authentication, rate limiting, and microservices communication - exactly the kind of scalable system you need.

My approach includes:
• RESTful API design following best practices
• Secure authentication and authorization
• Database optimization and query efficiency
• Comprehensive API documentation
• Docker containerization for easy deployment

I can start immediately and deliver a production-ready API within your timeline. Shall we discuss the technical specifications?

Best regards`
    });
  } else {
    proposals.push({
      jobType: 'Frontend UI/UX Development',
      proposal: `Hello,

I saw your post looking for a frontend developer, and I'm excited about the opportunity to work on your project. With my strong background in ${topSkill} and modern frontend technologies, I can create a stunning, responsive interface.

My portfolio includes projects like "${githubData.topRepositories[1]?.name}" where I focused on creating intuitive user experiences with clean, maintainable code.

What I bring to your project:
• Pixel-perfect implementation of your designs
• Responsive layouts that work on all devices
• Smooth animations and interactions
• Component-based architecture for scalability
• Cross-browser compatibility

I pay attention to every detail and ensure the final product exceeds expectations. Let's chat about your design vision!

Best regards`
    });
  }
  
  // Proposal 3: AI/ML if applicable, otherwise Full-Stack
  const hasAI = primarySkills.some(s => 
    s.toLowerCase().includes('tensorflow') || s.toLowerCase().includes('machine learning') || s.toLowerCase().includes('ai')
  );
  
  if (hasAI) {
    proposals.push({
      jobType: 'AI/ML Model Development',
      proposal: `Hi there,

I'm genuinely excited about your machine learning project! With my background in Python, TensorFlow, and data science, I've built models that solve real business problems.

My "${githubData.topRepositories.find(r => r.languages.some(l => l.includes('TensorFlow')))?.name || 'ML project'}" achieved 94% accuracy in image classification, demonstrating my ability to train, tune, and deploy effective ML models.

Services I offer:
• Data preprocessing and feature engineering
• Model selection and hyperparameter tuning
• Training pipeline development
• Model deployment and API integration
• Performance monitoring and improvement

I stay current with the latest ML research and techniques. I'd love to understand your data and objectives to propose the best approach.

When would be a good time to discuss your project?

Best regards`
    });
  } else {
    proposals.push({
      jobType: 'Full-Stack Application Development',
      proposal: `Hello,

I'm a full-stack developer with experience building end-to-end applications that solve real problems. Your project sounds like a perfect fit for my skills in ${primarySkills.slice(0, 4).join(', ')}.

I've successfully delivered ${githubData.publicRepos} projects, including "${githubData.topRepositories[0]?.name}" and "${githubData.topRepositories[1]?.name}", which gave me deep experience in:
• Database design and management
• RESTful API development
• Frontend implementation
• Deployment and DevOps

My development process emphasizes:
✓ Regular communication and updates
✓ Clean, documented code
✓ Testing and quality assurance
✓ On-time delivery

I'm ready to start immediately and can adapt to your preferred workflow. Let's discuss your project requirements!

Best regards`
    });
  }
  
  return proposals;
}

// Generate optimized LinkedIn About section
function generateOptimizedAbout(primarySkills: string[], githubData: GitHubData): string {
  const topSkills = primarySkills.slice(0, 4).join(' • ');
  
  return `Full-Stack Developer specializing in ${topSkills} | Building scalable solutions that drive business results

I help businesses transform their ideas into powerful digital products. With ${githubData.accountAge} of hands-on development experience and ${githubData.publicRepos}+ successfully delivered projects, I bring both technical expertise and business understanding to every engagement.

What I do best:
🚀 Develop high-performance web and mobile applications
📊 Build data-driven solutions that provide actionable insights  
⚡ Optimize existing systems for better speed and scalability
🤝 Collaborate closely with clients to ensure project success

Technical expertise: ${primarySkills.slice(0, 6).join(', ')}

Recent achievements:
• Built an e-commerce dashboard processing $100K+ monthly transactions
• Developed a mobile app with 5,000+ active users
• Reduced API response times by 60% through optimization
• Implemented CI/CD pipelines reducing deployment time by 80%

I'm passionate about writing clean, maintainable code and creating intuitive user experiences. My goal is to deliver solutions that not only meet technical requirements but also drive real business value.

Currently available for freelance projects and open to full-time opportunities. Let's connect and discuss how I can help bring your vision to life!

📧 Open to collaboration | 🌍 Remote-friendly | ⚡ Quick turnaround`;
}

// Generate 30-day improvement roadmap
function generateRoadmap() {
  return [
    {
      week: 1,
      focus: 'Profile Optimization',
      actions: [
        'Rewrite LinkedIn About section using client-focused language',
        'Add 3 quantifiable achievements to experience section',
        'Update GitHub READMEs with project benefits and metrics',
        'Create a professional portfolio website'
      ]
    },
    {
      week: 2,
      focus: 'English Proficiency',
      actions: [
        'Complete 3 lessons on business English writing',
        'Review and edit all LinkedIn content with Grammarly',
        'Practice explaining one project in client-friendly terms',
        'Record a 2-minute intro video in English'
      ]
    },
    {
      week: 3,
      focus: 'Portfolio Enhancement',
      actions: [
        'Add 2 new features to your best GitHub project',
        'Write detailed case studies for top 3 projects',
        'Create visual diagrams/architecture for complex projects',
        'Get code review from a senior developer'
      ]
    },
    {
      week: 4,
      focus: 'Market Positioning',
      actions: [
        'Research 10 successful freelancers in your niche',
        'Update Upwork/Freelancer profile with optimized content',
        'Apply to 5 relevant jobs using custom proposals',
        'Join 2 professional communities in your field'
      ]
    }
  ];
}

// Real Azure OpenAI implementation (for later use)
/*
export async function analyzeProfilesReal(
  linkedinText: string,
  githubData: GitHubData
): Promise<AnalysisResult> {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  
  const response = await fetch(`${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-15-preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey!
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify({ linkedinText, githubData }) }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });
  
  // Parse and return result
}
*/
