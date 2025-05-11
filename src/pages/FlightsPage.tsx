
import React, { useState } from 'react';
import SearchFilters from '@/components/SearchFilters';
import FlightCard from '@/components/FlightCard';
import { useApp } from '@/context/AppContext';
import { SearchFilters as FilterType } from '@/types';
import { Plane } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FlightsPage = () => {
  const { flights, cities, searchFlights } = useApp();
  const [filters, setFilters] = useState<FilterType>({});
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const isMobile = useIsMobile();
  
  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    
    const filtered = searchFlights(
      newFilters.departureCity || '',
      newFilters.arrivalCity || '',
      newFilters.date || ''
    );
    
    if (newFilters.minPrice !== undefined || newFilters.maxPrice !== undefined) {
      const minPrice = newFilters.minPrice || 0;
      const maxPrice = newFilters.maxPrice || Infinity;
      
      setFilteredFlights(filtered.filter(flight => 
        flight.price >= minPrice && flight.price <= maxPrice
      ));
    } else {
      setFilteredFlights(filtered);
    }
  };
  
  const cityOptions = cities.map(city => ({ id: city.name, name: city.name }));
  
  return (
    <div className={`container mx-auto px-4 py-6 ${isMobile ? 'pb-24' : ''}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Flights in Algeria</h1>
        <p className="text-gray-600">Search and book flights to explore Algeria's cities</p>
      </div>
      
      <SearchFilters 
        onFilterChange={handleFilterChange}
        type="flights"
        cityOptions={cityOptions}
      />
      
      {filteredFlights.length > 0 ? (
        <div className="grid gap-6">
          {filteredFlights.map(flight => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <Plane className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="font-medium text-lg mb-1">No flights found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default FlightsPage;
