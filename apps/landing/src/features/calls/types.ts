// Call feature types
export interface Call {
  id: string;
  callerId: string;
  callerNumber: string;
  agentId: string;
  agentName: string;
  status: "active" | "resolved" | "escalated" | "missed";
  sentiment: "positive" | "neutral" | "negative";
  duration: number; // seconds
  startedAt: string;
  endedAt?: string;
  transcript?: string;
  summary?: string;
}

export interface CallFilter {
  status?: Call["status"];
  agentId?: string;
  dateFrom?: string;
  dateTo?: string;
  sentiment?: Call["sentiment"];
}
