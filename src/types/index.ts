
export interface City {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  region: string;
  attractions: Attraction[];
}

export interface Attraction {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  type: AttractionType;
  price: number;
  rating: number;
  reviews: Review[];
}

export enum AttractionType {
  BEACH = "BEACH",
  MOUNTAIN = "MOUNTAIN",
  HISTORICAL = "HISTORICAL",
  DESERT = "DESERT",
  CULTURAL = "CULTURAL"
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Flight {
  id: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  airline: string;
  duration: string;
}

export interface Activity {
  id: string;
  cityId: string;
  name: string;
  imageUrl: string;
  description: string;
  type: ActivityType;
  price: number;
  duration: string;
  rating: number;
  reviews: Review[];
}

export enum ActivityType {
  TOUR = "TOUR",
  EXCURSION = "EXCURSION",
  CULTURAL = "CULTURAL",
  OUTDOOR = "OUTDOOR"
}

export interface CartItem {
  id: string;
  type: 'flight' | 'activity';
  name: string;
  imageUrl: string;
  price: number;
  details: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  phone?: string;
  bookings: Booking[];
  isLoggedIn: boolean;
}

export interface Booking {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
}

export interface SearchFilters {
  city?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: AttractionType | ActivityType;
  departureCity?: string;
  arrivalCity?: string;
}
