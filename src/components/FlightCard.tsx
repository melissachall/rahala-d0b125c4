
import React from 'react';
import { Plane, Clock, Calendar } from 'lucide-react';
import { Flight } from '@/types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useApp } from '@/context/AppContext';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart({
      id: flight.id,
      type: 'flight',
      name: `${flight.departureCity} to ${flight.arrivalCity}`,
      imageUrl: 'https://images.unsplash.com/photo-1628510118714-d2124c527a27?q=80&w=2069',
      price: flight.price,
      details: `${flight.departureDate} · ${flight.departureTime} - ${flight.arrivalTime}`
    });
  };
  
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-algeria-blue/10 flex items-center justify-center">
              <Plane size={18} className="text-algeria-blue -rotate-45" />
            </div>
            <p className="ml-2 font-semibold text-gray-600">{flight.airline}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{flight.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-bold">{flight.departureTime}</p>
            <p className="text-sm text-gray-500">{flight.departureCity}</p>
          </div>
          
          <div className="flex-1 mx-4 px-4 relative">
            <Separator />
            <div className="w-2 h-2 rounded-full bg-algeria-blue absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 rounded-full bg-algeria-blue absolute right-0 top-1/2 -translate-y-1/2" />
            <Plane size={16} className="text-algeria-blue absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold">{flight.arrivalTime}</p>
            <p className="text-sm text-gray-500">{flight.arrivalCity}</p>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar size={14} className="mr-1" />
          <span>{new Date(flight.departureDate).toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
          })}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg text-algeria-blue">${flight.price}</p>
          <Button 
            className="bg-algeria-blue hover:bg-algeria-blue/90"
            onClick={handleAddToCart}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
