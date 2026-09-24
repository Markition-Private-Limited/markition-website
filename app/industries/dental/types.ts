export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  clinicName: string;
  monthlyAdBudget?: string;
  primaryGoal?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
