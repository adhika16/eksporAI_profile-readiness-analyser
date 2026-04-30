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

// Mock implementation for development
// Replace with actual GitHub API calls when ready
export async function fetchGitHubData(url: string): Promise<GitHubData> {
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

// Real GitHub API implementation (for later use)
/*
export async function fetchGitHubDataReal(url: string): Promise<GitHubData> {
  const username = extractGitHubUsername(url);
  
  if (!username) {
    throw new Error('Invalid GitHub URL');
  }
  
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  // Fetch user profile
  const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userResponse.ok) {
    throw new Error(`GitHub API error: ${userResponse.status}`);
  }
  const userData = await userResponse.json();
  
  // Fetch repositories
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, { headers });
  const reposData = await reposResponse.json();
  
  // Process and return data
  // ... implementation details
}
*/
