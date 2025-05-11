
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { CartItem, City, Flight, Activity, SearchFilters, AttractionType, ActivityType, User } from '../types';
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
  user: User | null;
  
  setCurrentCity: (city: City | null) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSelectedTab: (tab: number) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  searchFlights: (departure: string, arrival: string, date: string) => Flight[];
  searchActivities: (cityId: string, filters?: SearchFilters) => Activity[];
  login: (email: string, password: string) => void;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoggedIn: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [user, setUser] = useState<User | null>(null);

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

  // Authentication methods
  const login = (email: string, password: string) => {
    // In a real app, you would verify credentials against a backend
    // For now, we'll create a mock user
    const mockUser: User = {
      id: '1',
      name: 'Utilisateur Test',
      email: email,
      phone: '+213 123 456 789',
      bookings: [],
      isLoggedIn: true
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  
  const register = (userData: Partial<User>) => {
    // In a real app, you would send this data to a backend
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userData.name || 'Utilisateur',
      email: userData.email || '',
      phone: userData.phone,
      bookings: [],
      isLoggedIn: true
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...userData
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const isLoggedIn = () => {
    return !!user?.isLoggedIn;
  };
  
  // Check for a saved user in localStorage on app init
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = useMemo(() => ({
    cities,
    flights,
    activities,
    cart,
    currentCity,
    searchFilters,
    selectedTab,
    user,
    setCurrentCity,
    setSearchFilters,
    setSelectedTab,
    addToCart,
    removeFromCart,
    clearCart,
    searchFlights,
    searchActivities,
    login,
    register,
    logout,
    updateUser,
    isLoggedIn
  }), [cart, currentCity, searchFilters, selectedTab, user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
