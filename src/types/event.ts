export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Food Drive"
  | "Health Camp"
  | "Education"
  | "Other";

export type CommunityEvent = {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnail: string; 
  location: string;
  eventDate: string; 
  creatorEmail: string;
  creatorName?: string;
};
