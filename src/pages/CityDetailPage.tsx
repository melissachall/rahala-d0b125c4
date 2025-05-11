
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import AttractionCard from '@/components/AttractionCard';
import ActivityCard from '@/components/ActivityCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, CalendarDays, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CityDetailPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  const { cities, activities, setCurrentCity, setSelectedTab, selectedTab } = useApp();
  const isMobile = useIsMobile();
  
  const city = cities.find(c => c.id === cityId);
  const cityActivities = activities.filter(activity => activity.cityId === cityId);
  
  useEffect(() => {
    if (city) {
      setCurrentCity(city);
    } else {
      navigate('/explore');
    }
  }, [city, navigate, setCurrentCity]);
  
  if (!city) {
    return <div>Loading...</div>
  }
  
  return (
    <div className={`${isMobile ? 'pb-24' : ''}`}>
      {/* Hero Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={city.imageUrl} 
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
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
        
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <MapPin size={16} className="mr-1" />
            <p className="text-sm">{city.region}</p>
          </div>
          <h1 className="text-3xl font-bold">{city.name}</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">About {city.name}</h2>
          <p className="text-gray-600">{city.description}</p>
        </div>
        
        <Tabs 
          defaultValue="attractions" 
          value={selectedTab === 0 ? "attractions" : "activities"}
          onValueChange={(value) => setSelectedTab(value === "attractions" ? 0 : 1)}
        >
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="attractions">
              Attractions
            </TabsTrigger>
            <TabsTrigger value="activities">
              <CalendarDays size={16} className="mr-2" />
              Activities
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="attractions">
            {city.attractions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {city.attractions.map(attraction => (
                  <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p>No attractions found for this city.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activities">
            {cityActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p>No activities found for this city.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CityDetailPage;
