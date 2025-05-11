
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { CartItem, City, Flight, Activity, SearchFilters, AttractionType, ActivityType } from '../types';
import { cities, attractions, activities, flights } from '../data/mockData';
import { toast } from '../components/ui/use-toast';

interface AppContextType {
  cities: City[];
  flights: Flight[];
  activities: Activity[];
  cart: CartItem[];
  currentCity: City | null;
  searchFilters: SearchFilters;
  selectedTab: number;
  
  setCurrentCity: (city: City | null) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSelectedTab: (tab: number) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  searchFlights: (departure: string, arrival: string, date: string) => Flight[];
  searchActivities: (cityId: string, filters?: SearchFilters) => Activity[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [selectedTab, setSelectedTab] = useState(0);

  const addToCart = (item: CartItem) => {
    if (cart.some(cartItem => cartItem.id === item.id)) {
      toast({
        title: "Already in cart",
        description: `${item.name} is already in your booking cart.`,
      });
      return;
    }
    
    setCart(prev => [...prev, item]);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your booking cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your booking cart.",
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your booking cart.",
    });
  };

  const searchFlights = (departure: string, arrival: string, date: string) => {
    return flights.filter(
      flight => 
        (departure ? flight.departureCity.toLowerCase() === departure.toLowerCase() : true) &&
        (arrival ? flight.arrivalCity.toLowerCase() === arrival.toLowerCase() : true) &&
        (date ? flight.departureDate === date : true)
    );
  };

  const searchActivities = (cityId: string, filters?: SearchFilters) => {
    return activities.filter(activity => {
      if (activity.cityId !== cityId) return false;
      
      if (filters?.type && 
          Object.values(ActivityType).includes(filters.type as ActivityType) && 
          activity.type !== filters.type) {
        return false;
      }
      
      if (filters?.minPrice !== undefined && activity.price < filters.minPrice) return false;
      if (filters?.maxPrice !== undefined && activity.price > filters.maxPrice) return false;
      
      return true;
    });
  };

  const value = useMemo(() => ({
    cities,
    flights,
    activities,
    cart,
    currentCity,
    searchFilters,
    selectedTab,
    setCurrentCity,
    setSearchFilters,
    setSelectedTab,
    addToCart,
    removeFromCart,
    clearCart,
    searchFlights,
    searchActivities,
  }), [cart, currentCity, searchFilters, selectedTab]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
