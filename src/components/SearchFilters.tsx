
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Calendar as CalendarIcon, Filter, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { SearchFilters as FilterType, AttractionType, ActivityType } from '@/types';

interface SearchFiltersProps {
  onFilterChange: (filters: FilterType) => void;
  type?: 'flights' | 'activities';
  cityOptions?: Array<{ id: string; name: string; }>;
}

const SearchFilters = ({ onFilterChange, type = 'flights', cityOptions = [] }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    city: undefined,
    date: undefined,
    minPrice: 0,
    maxPrice: 200,
    type: undefined
  });
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      setFilters(prev => ({ ...prev, date: formattedDate }));
    } else {
      setFilters(prev => ({ ...prev, date: undefined }));
    }
  };
  
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };
  
  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({
      city: undefined,
      date: undefined,
      minPrice: 0,
      maxPrice: 200,
      type: undefined
    });
    setDate(undefined);
    onFilterChange({});
    setIsOpen(false);
  };
  
  return (
    <div className="mb-6">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-dashed border-gray-300 hover:border-gray-400"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter Options
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h3 className="font-medium">Search Filters</h3>
            
            {type === 'flights' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departure City</label>
                  <Select
                    value={filters.city}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map(city => (
                        <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <Select
                    value={filters.city}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map(city => (
                        <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {type === 'activities' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity Type</label>
                <Select
                  value={filters.type as string}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value as ActivityType }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ActivityType).map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Price Range</label>
                <span className="text-sm font-medium">
                  ${filters.minPrice} - ${filters.maxPrice}
                </span>
              </div>
              <Slider
                defaultValue={[0, 200]}
                value={[filters.minPrice || 0, filters.maxPrice || 200]}
                max={500}
                step={10}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={resetFilters}
              >
                <X className="mr-1 h-4 w-4" />
                Reset
              </Button>
              <Button size="sm" onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchFilters;
