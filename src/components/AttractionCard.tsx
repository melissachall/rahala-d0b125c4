
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Palmtree, Mountain, Building, Compass } from 'lucide-react';
import { Attraction, AttractionType } from '@/types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard = ({ attraction }: AttractionCardProps) => {
  const navigate = useNavigate();
  
  const getTypeIcon = (type: AttractionType) => {
    switch (type) {
      case AttractionType.BEACH:
        return <Palmtree size={16} />;
      case AttractionType.MOUNTAIN:
        return <Mountain size={16} />;
      case AttractionType.HISTORICAL:
        return <Building size={16} />;
      case AttractionType.DESERT:
        return <Compass size={16} />;
      case AttractionType.CULTURAL:
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 11V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>;
      default:
        return <Compass size={16} />;
    }
  };
  
  const getTypeColor = (type: AttractionType) => {
    switch (type) {
      case AttractionType.BEACH:
        return "bg-blue-500 text-white";
      case AttractionType.MOUNTAIN:
        return "bg-green-600 text-white";
      case AttractionType.HISTORICAL:
        return "bg-amber-600 text-white";
      case AttractionType.DESERT:
        return "bg-algeria-sand text-black";
      case AttractionType.CULTURAL:
        return "bg-algeria-terracotta text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  
  return (
    <Card 
      className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer h-[280px] relative"
      onClick={() => navigate(`/attraction/${attraction.id}`)}
    >
      <div className="h-36 overflow-hidden">
        <img 
          src={attraction.imageUrl} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        
        <Badge 
          className={cn(
            "absolute top-2 left-2",
            getTypeColor(attraction.type)
          )}
        >
          <span className="flex items-center">
            {getTypeIcon(attraction.type)}
            <span className="ml-1">{attraction.type}</span>
          </span>
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{attraction.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm text-gray-700">{attraction.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-2">{attraction.description}</p>
        
        {attraction.price > 0 ? (
          <p className="font-semibold text-algeria-blue">${attraction.price}</p>
        ) : (
          <p className="font-semibold text-green-600">Free Entry</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AttractionCard;
