
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import ActivityCard from '@/components/ActivityCard';
import SearchFilters from '@/components/SearchFilters';
import { SearchFilters as FilterType, ActivityType } from '@/types';
import { CalendarDays } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ActivitiesPage = () => {
  const { activities, cities } = useApp();
  const [filters, setFilters] = useState<FilterType>({});
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const isMobile = useIsMobile();
  
  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    
    const filtered = activities.filter(activity => {
      // Filter by city
      if (newFilters.city && activity.cityId !== newFilters.city) {
        return false;
      }
      
      // Filter by activity type
      if (newFilters.type && activity.type !== newFilters.type) {
        return false;
      }
      
      // Filter by price
      const minPrice = newFilters.minPrice !== undefined ? newFilters.minPrice : 0;
      const maxPrice = newFilters.maxPrice !== undefined ? newFilters.maxPrice : Infinity;
      if (activity.price < minPrice || activity.price > maxPrice) {
        return false;
      }
      
      return true;
    });
    
    setFilteredActivities(filtered);
  };
  
  const cityOptions = cities.map(city => ({ id: city.id, name: city.name }));
  
  return (
    <div className={`container mx-auto px-4 py-6 ${isMobile ? 'pb-24' : ''}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Activities & Experiences</h1>
        <p className="text-gray-600">Book guided tours, cultural experiences, and outdoor adventures</p>
      </div>
      
      <SearchFilters 
        onFilterChange={handleFilterChange}
        type="activities"
        cityOptions={cityOptions}
      />
      
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <CalendarDays className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="font-medium text-lg mb-1">No activities found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
