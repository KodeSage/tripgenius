// Budget options
export type Budget = "cheap" | "moderate" | "luxury";

// Travel mode options
export type TravelMode = "solo" | "family" | "couples" | "friends";

// Base trip data from the form
export interface TripFormData {
  destination: string;
  days: number;
  budget: Budget;
  travelMode: TravelMode;
  timestamp: number;
}

// Geographic coordinates
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

// Hotel information
export interface Hotel {
  hotelName: string;
  hotelAddress: string;
  price: string;
  hotelImageUrl: string;
  geoCoordinates: GeoCoordinates;
  rating: number;
  description: string;
}

// Place to visit within the itinerary
export interface Place {
  placeName: string;
  placeDetails: string;
  placeImageUrl: string;
  geoCoordinates: GeoCoordinates;
  ticketPricing: string;
  travelTime: string;
}

// Daily itinerary structure
export interface DayItinerary {
  theme: string;
  bestTimeToVisit: string;
  places: Place[];
}
// Complete itinerary by day
export interface Itinerary {
  [key: string]: DayItinerary; // e.g., "day1", "day2", "day3"
}

// Complete trip plan structure
export interface TripPlan {
  location: string;
  duration: string;
  budget: Budget;
  travelers: TravelMode;
  hotels: Hotel[];
  itinerary: Itinerary;
}

// Document as stored in Fireproof
export interface TripDocument {
  _id?: string;
  timestamp: number;
  destination: string | null;
  days: number;
  budget: Budget;
  travelMode: TravelMode;
  travelPlan?: TripPlan ;
}
