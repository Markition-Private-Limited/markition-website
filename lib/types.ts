export interface Service {
  id: string;
  number: string;
  label: string;
  icon: string;
  iconSrc?: string;
  description: string;
  features: [string, string, string, string];
  cta: string;
}

export interface ChatMessage {
  sender: "bot" | "user";
  text: string;
}
