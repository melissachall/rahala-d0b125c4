
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Users, Route, Landmark } from 'lucide-react';
import { Activity, ActivityType } from '@/types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const getTypeIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.TOUR:
        return <Users size={16} />;
      case ActivityType.EXCURSION:
        return <Route size={16} />;
      case ActivityType.CULTURAL:
        return <Landmark size={16} />;
      case ActivityType.OUTDOOR:
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22L12 12M12 12L22 2M12 12L22 22M12 12L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>;
      default:
        return <Route size={16} />;
    }
  };
  
  const getTypeColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.TOUR:
        return "bg-purple-600 text-white";
      case ActivityType.EXCURSION:
        return "bg-blue-600 text-white";
      case ActivityType.CULTURAL:
        return "bg-algeria-terracotta text-white";
      case ActivityType.OUTDOOR:
        return "bg-algeria-green text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: activity.id,
      type: 'activity',
      name: activity.name,
      imageUrl: activity.imageUrl,
      price: activity.price,
      details: activity.duration
    });
  };
  
  return (
    <Card 
      className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={() => navigate(`/activity/${activity.id}`)}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={activity.imageUrl} 
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        
        <Badge 
          className={cn(
            "absolute top-2 left-2",
            getTypeColor(activity.type)
          )}
        >
          <span className="flex items-center">
            {getTypeIcon(activity.type)}
            <span className="ml-1">{activity.type}</span>
          </span>
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{activity.name}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-500 mr-4">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-xs text-gray-700">{activity.rating}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Clock size={14} />
            <span className="ml-1 text-xs">{activity.duration}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{activity.description}</p>
        
        <div className="flex items-center justify-between">
          <p className="font-bold text-algeria-blue">${activity.price}</p>
          <Button 
            variant="outline" 
            size="sm"
            className="border-algeria-blue text-algeria-blue hover:bg-algeria-blue hover:text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
