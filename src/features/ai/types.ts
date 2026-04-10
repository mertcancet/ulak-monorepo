// AI feature types
export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google';
  contextWindow: number;
  costPerToken: number;
}

export interface AIAnalysis {
  callId: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  topics: string[];
  summary: string;
  actionItems: string[];
  escalationRisk: number;
}
