// Analysis Request Types
export interface AnalysisRequest {
  linkedinPdf: File;
  githubUrl: string;
}

// GitHub Data Types
export interface GitHubRepository {
  name: string;
  description: string;
  stars: number;
  languages: string[];
  readmeContent: string;
  url: string;
}

export interface GitHubData {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  topRepositories: GitHubRepository[];
  topLanguages: string[];
  contributionActivity: string;
  accountAge: string;
}

// Category Scores
export interface CategoryScores {
  technical_strength: number;
  communication: number;
  market_demand: number;
  presentation: number;
  activity: number;
}

// Scoring Justification (internal use)
export interface ScoringJustification {
  technical_strength: string;
  communication: string;
  market_demand: string;
  presentation: string;
  activity: string;
}

// Strengths and Weaknesses
export interface Strength {
  point: string;
  evidence: string;
}

export interface Weakness {
  point: string;
  improvement: string;
}

// Roadmap
export interface RoadmapWeek {
  week: number;
  focus: string;
  actions: string[];
}

// Hourly Rate
export interface HourlyRate {
  min: number;
  max: number;
  currency: string;
}

// Proposal Template
export interface ProposalTemplate {
  jobType: string;
  proposal: string;
}

// Complete Analysis Result
export interface AnalysisResult {
  overall_score: number;
  category_scores: CategoryScores;
  scoring_justification: ScoringJustification;
  strengths: Strength[];
  weaknesses: Weakness[];
  optimized_about: string;
  recommended_rate: HourlyRate;
  roadmap: RoadmapWeek[];
  proposals: ProposalTemplate[];
}

// Loading State Steps
export type LoadingStep = 
  | 'uploading'
  | 'extracting'
  | 'github'
  | 'analyzing'
  | 'generating'
  | 'complete';

export interface LoadingState {
  step: LoadingStep;
  progress: number;
  message: string;
}

// API Response Types
export interface ApiError {
  error: string;
  code: string;
  details?: string;
}

// Share Result Types
export interface ShareableSummary {
  overallScore: number;
  topStrength: string;
  keyImprovement: string;
  recommendedRate: string;
}
