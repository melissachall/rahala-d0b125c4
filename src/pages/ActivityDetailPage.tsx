
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Clock, Calendar, UserRound } from 'lucide-react';
import { activities } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const ActivityDetailPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const isMobile = useIsMobile();
  
  const activity = activities.find(a => a.id === activityId);
  
  useEffect(() => {
    if (!activity) {
      navigate('/activities');
    }
  }, [activity, navigate]);
  
  if (!activity) {
    return <div>Loading...</div>;
  }
  
  const handleAddToCart = () => {
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
    <div className={`mb-6 ${isMobile ? 'pb-24' : ''}`}>
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={activity.imageUrl} 
          alt={activity.name}
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
        <div className="mb-4">
          <Badge className="mb-2">{activity.type}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{activity.name}</h1>
          
          <div className="flex items-center">
            <div className="flex items-center text-yellow-500 mr-4">
              <Star size={16} fill="currentColor" className="mr-1" />
              <span className="font-medium">{activity.rating}</span>
              <span className="text-gray-500 ml-1">({activity.reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg flex items-center">
            <Clock size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{activity.duration}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex items-center">
            <MapPin size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">Algeria</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex items-center">
            <UserRound size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Group Size</p>
              <p className="font-medium">Max 10 people</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">Price per person</p>
            <p className="font-bold text-2xl text-algeria-blue">${activity.price}</p>
          </div>
          
          <Button 
            className="bg-algeria-blue hover:bg-algeria-blue/90"
            size="lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">About this activity</h2>
          <p className="text-gray-600">
            {activity.description}
          </p>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
            Praesent bibendum purus ac metus feugiat, in dapibus massa finibus. 
            Duis eleifend enim nec ex facilisis, at volutpat eros porta. 
            Curabitur efficitur pellentesque urna a convallis.
          </p>
          
          <div className="mt-6 space-y-3">
            <h3 className="font-medium">What's included:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Professional guide</li>
              <li>Transportation</li>
              <li>Entrance fees</li>
              <li>Bottled water</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          
          <div className="space-y-4">
            {activity.reviews.map(review => (
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

export default ActivityDetailPage;
