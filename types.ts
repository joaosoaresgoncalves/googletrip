export interface Metadata {
  destination: string;
  currency: string;
  timezone: string;
}

export interface Accommodation {
  name: string;
  category: 'Budget' | 'Boutique' | 'Luxury' | string;
  rating: string;
  reason_to_stay: string;
}

export interface Activity {
  time: string;
  activity: string;
  location: string;
  description: string;
  transport: string;
  rainy_day_backup: string;
  photo_tip: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
  local_secret: string;
  cultural_etiquette: string;
}

export interface TravelPlan {
  metadata: Metadata;
  accommodations: Accommodation[];
  itinerary: DayPlan[];
}

export interface TravelParams {
  destination: string;
  startDate: string;
  endDate: string;
  group: string;
  interests: string[];
  pace: string;
  vibe: string;
}
