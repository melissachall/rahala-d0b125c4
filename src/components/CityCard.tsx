
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { City } from '@/types';
import { Card, CardContent } from './ui/card';
import { useApp } from '@/context/AppContext';

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  const navigate = useNavigate();
  const { setCurrentCity } = useApp();
  
  const handleClick = () => {
    setCurrentCity(city);
    navigate(`/city/${city.id}`);
  };
  
  return (
    <Card 
      className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-64 relative group"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
      
      <img 
        src={city.imageUrl} 
        alt={city.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <CardContent className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
        <div className="flex items-center mb-2">
          <MapPin size={16} className="mr-1" />
          <p className="text-sm">{city.region}</p>
        </div>
        <h3 className="font-bold text-xl mb-1">{city.name}</h3>
        <p className="text-sm line-clamp-2 text-gray-200">{city.description}</p>
      </CardContent>
    </Card>
  );
};

export default CityCard;
