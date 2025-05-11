
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Clock } from 'lucide-react';
import { attractions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

const AttractionDetailPage = () => {
  const { attractionId } = useParams<{ attractionId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const attraction = attractions.find(a => a.id === attractionId);
  
  useEffect(() => {
    if (!attraction) {
      navigate('/explore');
    }
  }, [attraction, navigate]);
  
  if (!attraction) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className={`mb-6 ${isMobile ? 'pb-24' : ''}`}>
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={attraction.imageUrl} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">{attraction.name}</h1>
          
          <div className="flex items-center mt-2 md:mt-0">
            <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full">
              <Star size={16} fill="currentColor" className="mr-1" />
              <span className="font-medium">{attraction.rating}</span>
              <span className="text-gray-500 ml-1">({attraction.reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-6">
          <MapPin size={18} className="mr-2" />
          <span>Location information would be displayed here</span>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Entry Fee</p>
            {attraction.price > 0 ? (
              <p className="font-bold text-xl text-algeria-blue">${attraction.price}</p>
            ) : (
              <p className="font-bold text-xl text-green-600">Free Entry</p>
            )}
          </div>
          
          <Button className="bg-algeria-blue hover:bg-algeria-blue/90">
            Get Directions
          </Button>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">About</h2>
          <p className="text-gray-600">
            {attraction.description}
          </p>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
            Praesent bibendum purus ac metus feugiat, in dapibus massa finibus. 
            Duis eleifend enim nec ex facilisis, at volutpat eros porta. 
            Curabitur efficitur pellentesque urna a convallis.
          </p>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          
          <div className="space-y-4">
            {attraction.reviews.map(review => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${review.userName}`} />
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{review.userName}</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailPage;
