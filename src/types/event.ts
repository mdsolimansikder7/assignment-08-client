// Event types and the main event shape.
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
  thumbnail: string; // image URL
  location: string;
  eventDate: string; // "YYYY-MM-DD"
  creatorEmail: string;
  creatorName?: string;
};
