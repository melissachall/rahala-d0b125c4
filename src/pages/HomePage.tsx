
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, Map, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CityCard from '@/components/CityCard';

const HomePage = () => {
  const { cities } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const featuredCities = cities.slice(0, 4);
  const popularDestinations = [...cities].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1974"
          alt="Algeria"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Algeria</h1>
          <p className="text-lg mb-8 max-w-md">Explore the hidden treasures of North Africa's largest country</p>
          
          <form onSubmit={handleSearch} className="w-full max-w-md relative">
            <Input
              placeholder="Search cities, attractions, or activities..."
              className="h-12 pl-10 pr-4 bg-white/90 text-gray-900 rounded-lg focus-visible:ring-algeria-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Button 
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-algeria-blue hover:bg-algeria-blue/90"
            >
              Explore
            </Button>
          </form>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid grid-cols-3 h-14 mb-4">
            <TabsTrigger value="flights" className="data-[state=active]:bg-algeria-blue data-[state=active]:text-white">
              <Plane className="mr-2 h-4 w-4" /> Flights
            </TabsTrigger>
            <TabsTrigger value="destinations" className="data-[state=active]:bg-algeria-blue data-[state=active]:text-white">
              <Map className="mr-2 h-4 w-4" /> Destinations
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-algeria-blue data-[state=active]:text-white">
              <Calendar className="mr-2 h-4 w-4" /> Activities
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Quick Flight Search</h3>
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="justify-start text-left"
                onClick={() => navigate('/flights')}
              >
                <Plane className="mr-2 h-4 w-4 -rotate-45" />
                Find flights to and from Algerian cities
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="destinations" className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Popular Destinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularDestinations.map(city => (
                <Button 
                  key={city.id}
                  variant="outline" 
                  className="justify-start text-left"
                  onClick={() => navigate(`/city/${city.id}`)}
                >
                  <Map className="mr-2 h-4 w-4" />
                  {city.name}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Find Activities</h3>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={() => navigate('/activities')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Browse all activities in Algeria
            </Button>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Featured Cities */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Destinations</h2>
          <Button 
            variant="ghost" 
            className="text-algeria-blue hover:text-algeria-blue/90"
            onClick={() => navigate('/explore')}
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredCities.map(city => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
      
      {/* Experience Categories */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Experience Algeria</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            className="relative h-48 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => navigate('/category/beach')}
          >
            <img 
              src="https://images.unsplash.com/photo-1520942702018-0862200e6873?q=80&w=2070" 
              alt="Beautiful Beaches" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-bold">Beaches</h3>
              <p className="text-sm">Pristine shores</p>
            </div>
          </div>
          
          <div 
            className="relative h-48 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => navigate('/category/mountain')}
          >
            <img 
              src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2070" 
              alt="Mountain Adventures" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-bold">Mountains</h3>
              <p className="text-sm">Majestic heights</p>
            </div>
          </div>
          
          <div 
            className="relative h-48 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => navigate('/category/historical')}
          >
            <img 
              src="https://images.unsplash.com/photo-1563220599338-7b1ad7fb9b76?q=80&w=2070" 
              alt="Historical Sites" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-bold">Historical Sites</h3>
              <p className="text-sm">Rich heritage</p>
            </div>
          </div>
          
          <div 
            className="relative h-48 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => navigate('/category/desert')}
          >
            <img 
              src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076" 
              alt="Desert Adventures" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-bold">Sahara Desert</h3>
              <p className="text-sm">Endless dunes</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Promotional Banner */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative h-52 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2074" 
            alt="Special Offer" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-algeria-blue/60" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6">
            <h2 className="text-2xl font-bold mb-2">Summer Special Offer</h2>
            <p className="mb-4">Get 20% off on selected activities and tours</p>
            <Button 
              className="bg-white text-algeria-blue hover:bg-white/90"
              onClick={() => navigate('/activities')}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
