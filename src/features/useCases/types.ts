export interface TimelineItem {
  time: string;
  step: string;
  status: string;
}

export interface UseCase {
  id: string;
  icon: string;
  title: string;
  problem: string;
  solution: string;
  features: string[];
  timeline: TimelineItem[];
}

export type UseCaseId =
  | "healthcare"
  | "realEstate"
  | "ecommerce"
  | "restaurant"
  | "education"
  | "banking";
