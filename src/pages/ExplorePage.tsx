
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import CityCard from '@/components/CityCard';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ExplorePage = () => {
  const { cities } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const regions = [...new Set(cities.map(city => city.region))];
  
  return (
    <div className={`container mx-auto px-4 py-6 ${isMobile ? 'pb-24' : ''}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Explore Algeria</h1>
        <p className="text-gray-600">Discover the diverse cities and regions of Algeria</p>
      </div>
      
      <div className="relative mb-6">
        <Input
          placeholder="Search cities or regions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
      
      {regions.map(region => {
        const regionCities = filteredCities.filter(city => city.region === region);
        
        if (regionCities.length === 0) return null;
        
        return (
          <div key={region} className="mb-8">
            <div className="flex items-center mb-4">
              <MapPin size={18} className="text-algeria-terracotta mr-2" />
              <h2 className="text-xl font-medium">{region} Region</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regionCities.map(city => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </div>
        );
      })}
      
      {filteredCities.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <MapPin className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="font-medium text-lg mb-1">No cities found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
