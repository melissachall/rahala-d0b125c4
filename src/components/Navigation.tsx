
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plane, Map, CalendarDays, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useApp();
  const isMobile = useIsMobile();

  const navItems = [
    { icon: <Home size={24} />, label: "Home", path: "/" },
    { icon: <Plane size={24} />, label: "Flights", path: "/flights" },
    { icon: <Map size={24} />, label: "Explore", path: "/explore" },
    { icon: <CalendarDays size={24} />, label: "Activities", path: "/activities" },
    { 
      icon: (
        <div className="relative">
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-algeria-terracotta">
              {cart.length}
            </Badge>
          )}
        </div>
      ), 
      label: "Cart", 
      path: "/cart" 
    },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full text-gray-500",
              location.pathname === item.path && "text-algeria-blue"
            )}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="font-bold text-xl text-algeria-blue">Algeria Explorer</h1>
      </div>
      
      <div className="flex space-x-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center px-3 py-2 rounded-md transition-colors",
              location.pathname === item.path 
                ? "text-algeria-blue font-medium" 
                : "text-gray-500 hover:text-algeria-blue hover:bg-gray-50"
            )}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
