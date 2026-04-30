import { GitHubData, GitHubRepository } from '../types/analysis';

// Extract username from GitHub URL
export function extractGitHubUsername(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+)/);
  return match ? match[1] : null;
}

// Validate GitHub URL format
export function validateGitHubUrl(url: string): boolean {
  const pattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/;
  return pattern.test(url);
}

// Mock implementation for development fallback
export async function fetchGitHubDataMock(url: string): Promise<GitHubData> {
  const username = extractGitHubUsername(url);
  
  if (!username) {
    throw new Error('Invalid GitHub URL');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data - replace with actual API calls
  const mockRepos: GitHubRepository[] = [
    {
      name: 'ecommerce-dashboard',
      description: 'Full-stack React and Node.js e-commerce dashboard with real-time analytics',
      stars: 45,
      languages: ['TypeScript', 'React', 'Node.js'],
      readmeContent: 'A comprehensive e-commerce dashboard built with React, TypeScript, and Node.js. Features include real-time sales tracking, inventory management, and customer analytics.',
      url: `https://github.com/${username}/ecommerce-dashboard`
    },
    {
      name: 'mobile-task-app',
      description: 'React Native task management application with offline support',
      stars: 28,
      languages: ['TypeScript', 'React Native', 'Firebase'],
      readmeContent: 'Cross-platform mobile app for task management. Built with React Native and Firebase for real-time synchronization.',
      url: `https://github.com/${username}/mobile-task-app`
    },
    {
      name: 'api-gateway',
      description: 'Microservices API Gateway with authentication and rate limiting',
      stars: 15,
      languages: ['Python', 'FastAPI', 'Docker'],
      readmeContent: 'Scalable API Gateway for microservices architecture. Includes JWT authentication, rate limiting, and request routing.',
      url: `https://github.com/${username}/api-gateway`
    },
    {
      name: 'ml-image-classifier',
      description: 'Machine learning image classification using TensorFlow and Python',
      stars: 12,
      languages: ['Python', 'TensorFlow', 'Jupyter Notebook'],
      readmeContent: 'Image classification model trained on custom dataset. Achieves 94% accuracy on test set.',
      url: `https://github.com/${username}/ml-image-classifier`
    },
    {
      name: 'portfolio-website',
      description: 'Personal portfolio website built with Next.js and Tailwind CSS',
      stars: 8,
      languages: ['TypeScript', 'Next.js', 'Tailwind CSS'],
      readmeContent: 'Modern portfolio website featuring project showcases, blog, and contact form.',
      url: `https://github.com/${username}/portfolio-website`
    }
  ];
  
  return {
    username,
    publicRepos: 12,
    followers: 67,
    following: 34,
    topRepositories: mockRepos,
    topLanguages: ['TypeScript', 'React', 'Node.js', 'Python', 'Next.js'],
    contributionActivity: 'Active contributor with consistent commits over the past 6 months. Regular contributions to personal projects and open-source libraries.',
    accountAge: '3 years'
  };
}

// Real GitHub API implementation
export async function fetchGitHubDataReal(url: string): Promise<GitHubData> {
  const username = extractGitHubUsername(url);

  if (!username) {
    throw new Error('Invalid GitHub URL');
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'EksporAI-Coach'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Fetch user profile
  const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userResponse.ok) {
    if (userResponse.status === 404) {
      throw new Error('GitHub user not found');
    }
    throw new Error(`GitHub API error: ${userResponse.status}`);
  }

  const userData = await userResponse.json();

  // Fetch repositories
  const reposResponse = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
    { headers }
  );

  if (!reposResponse.ok) {
    throw new Error(`GitHub API error fetching repos: ${reposResponse.status}`);
  }

  const reposData = await reposResponse.json();

  // Fetch README content for top 3 repos
  const reposWithReadmes = await Promise.all(
    reposData.slice(0, 3).map(async (repo: any) => {
      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/readme`,
          { headers }
        );

        if (!readmeResponse.ok) {
          return { ...repo, readmeContent: '' };
        }

        const readmeData = await readmeResponse.json();
        // Decode base64 content
        const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        return { ...repo, readmeContent };
      } catch {
        return { ...repo, readmeContent: '' };
      }
    })
  );

  // Aggregate top languages
  const languageFrequency: Record<string, number> = {};
  reposData.forEach((repo: any) => {
    if (repo.language) {
      languageFrequency[repo.language] = (languageFrequency[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang);

  // Calculate account age
  const createdDate = new Date(userData.created_at);
  const now = new Date();
  const yearsDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365));

  return {
    username,
    publicRepos: userData.public_repos,
    followers: userData.followers,
    following: userData.following,
    topRepositories: reposWithReadmes.map(repo => ({
      name: repo.name,
      description: repo.description || '',
      stars: repo.stargazers_count,
      languages: repo.language ? [repo.language] : [],
      readmeContent: repo.readmeContent,
      url: repo.html_url
    })),
    topLanguages,
    contributionActivity: `Account created ${createdDate.getFullYear()}`,
    accountAge: `${yearsDiff} years`
  };
}

// Main function with fallback
export async function fetchGitHubData(url: string): Promise<GitHubData> {
  // Check if we should use real API or mock
  const useRealApi = process.env.GITHUB_TOKEN || process.env.USE_REAL_GITHUB === 'true';

  if (useRealApi) {
    try {
      console.log('Using real GitHub API...');
      return await fetchGitHubDataReal(url);
    } catch (error) {
      console.error('GitHub API failed, falling back to mock:', error);
      // Fall through to mock data
    }
  }

  console.log('Using mock GitHub data...');
  return fetchGitHubDataMock(url);
}
