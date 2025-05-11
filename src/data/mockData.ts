
import { City, Attraction, AttractionType, Activity, ActivityType, Flight, Review } from '../types';

const generateReviews = (count: number): Review[] => {
  const reviews: Review[] = [];
  const names = ['Ahmed', 'Fatima', 'Mohammed', 'Leila', 'Omar', 'Amina', 'Youcef', 'Karima'];
  const comments = [
    'Amazing experience! Highly recommend it.',
    'Beautiful place, will definitely come back.',
    'Great value for money.',
    'The views are breathtaking.',
    'A must-visit location in Algeria.',
    'Wonderful history and culture.',
    'I enjoyed every moment here.',
    'Better than I expected!'
  ];
  
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `review-${i}`,
      userName: names[Math.floor(Math.random() * names.length)],
      rating: Math.floor(Math.random() * 3) + 3, // 3 to 5 stars
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    });
  }
  
  return reviews;
};

export const cities: City[] = [
  {
    id: 'algiers',
    name: 'Algiers',
    imageUrl: 'https://images.unsplash.com/photo-1586123491627-8cfc78c7e989?q=80&w=2069',
    description: 'The capital city of Algeria, known for its stunning mix of colonial architecture and historical sites.',
    region: 'North',
    attractions: []
  },
  {
    id: 'oran',
    name: 'Oran',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1887',
    description: 'The second largest city in Algeria, famous for its vibrant culture and beautiful Mediterranean beaches.',
    region: 'Northwest',
    attractions: []
  },
  {
    id: 'constantine',
    name: 'Constantine',
    imageUrl: 'https://images.unsplash.com/photo-1583159860411-aa830c94701d?q=80&w=1921',
    description: 'Known as "City of Bridges," Constantine is built on a plateau with deep ravines and spectacular bridges.',
    region: 'Northeast',
    attractions: []
  },
  {
    id: 'tamanrasset',
    name: 'Tamanrasset',
    imageUrl: 'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=1974',
    description: 'Gateway to the Sahara Desert, offering incredible landscapes and Tuareg cultural experiences.',
    region: 'South',
    attractions: []
  },
  {
    id: 'tlemcen',
    name: 'Tlemcen',
    imageUrl: 'https://images.unsplash.com/photo-1565689477106-26bc9303e10a?q=80&w=1974',
    description: 'A city rich in Islamic heritage with beautiful mosques and fascinating historic sites.',
    region: 'Northwest',
    attractions: []
  },
  {
    id: 'annaba',
    name: 'Annaba',
    imageUrl: 'https://images.unsplash.com/photo-1583067609847-9fe47176d918?q=80&w=1887',
    description: 'Coastal city known for its beautiful beaches and the ruins of ancient Hippo Regius.',
    region: 'Northeast',
    attractions: []
  },
];

export const attractions: Attraction[] = [
  // Algiers attractions
  {
    id: 'casbah',
    name: 'Casbah of Algiers',
    imageUrl: 'https://images.unsplash.com/photo-1528564031703-51b85eeb96cb?q=80&w=2070',
    description: 'A UNESCO World Heritage site, this ancient citadel features Ottoman palaces, mosques, and traditional houses.',
    type: AttractionType.HISTORICAL,
    price: 0,
    rating: 4.7,
    reviews: generateReviews(5)
  },
  {
    id: 'martyrs-memorial',
    name: 'Martyrs\' Memorial (Maqam Echahid)',
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070',
    description: 'An iconic monument commemorating the Algerian War of Independence with panoramic views of Algiers.',
    type: AttractionType.HISTORICAL,
    price: 0,
    rating: 4.5,
    reviews: generateReviews(4)
  },
  {
    id: 'sidi-fredj',
    name: 'Sidi Fredj Beach',
    imageUrl: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?q=80&w=2074',
    description: 'A beautiful beach resort area with pristine waters and sandy shores, perfect for relaxation.',
    type: AttractionType.BEACH,
    price: 0,
    rating: 4.6,
    reviews: generateReviews(6)
  },

  // Oran attractions
  {
    id: 'santa-cruz',
    name: 'Fort Santa Cruz',
    imageUrl: 'https://images.unsplash.com/photo-1517217748333-7ca3cf50d304?q=80&w=1887',
    description: 'A historic fortress offering panoramic views of Oran and the Mediterranean Sea.',
    type: AttractionType.HISTORICAL,
    price: 5,
    rating: 4.4,
    reviews: generateReviews(4)
  },
  {
    id: 'madagh-beach',
    name: 'Madagh Beach',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073',
    description: 'A secluded beach with clear blue waters and beautiful cliffs.',
    type: AttractionType.BEACH,
    price: 0,
    rating: 4.8,
    reviews: generateReviews(5)
  },

  // Constantine attractions
  {
    id: 'sidi-mcid-bridge',
    name: 'Sidi M\'Cid Bridge',
    imageUrl: 'https://images.unsplash.com/photo-1539768942896-ddbcbf21c392?q=80&w=2071',
    description: 'One of Constantine\'s magnificent bridges suspended over deep gorges.',
    type: AttractionType.HISTORICAL,
    price: 0,
    rating: 4.9,
    reviews: generateReviews(7)
  },
  {
    id: 'ahmed-bey-palace',
    name: 'Ahmed Bey Palace',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?q=80&w=2070',
    description: 'A stunning palace showcasing Ottoman architecture and Algerian history.',
    type: AttractionType.HISTORICAL,
    price: 3,
    rating: 4.3,
    reviews: generateReviews(3)
  },

  // Tamanrasset attractions
  {
    id: 'assekrem',
    name: 'Assekrem',
    imageUrl: 'https://images.unsplash.com/photo-1583314580204-efe0bcd28a88?q=80&w=2070',
    description: 'Famous for its breathtaking sunset views over the Hoggar Mountains.',
    type: AttractionType.MOUNTAIN,
    price: 10,
    rating: 4.9,
    reviews: generateReviews(8)
  },
  {
    id: 'hoggar-mountains',
    name: 'Hoggar Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1541580621-39f717ce77cd?q=80&w=2070',
    description: 'Dramatic volcanic mountains with impressive rock formations and Tuareg settlements.',
    type: AttractionType.MOUNTAIN,
    price: 15,
    rating: 4.8,
    reviews: generateReviews(6)
  },
  {
    id: 'tin-hinan-tomb',
    name: 'Tin Hinan Tomb',
    imageUrl: 'https://images.unsplash.com/photo-1612460237618-a462fd47270d?q=80&w=1935',
    description: 'Archaeological site believed to be the tomb of the matriarch of the Tuareg people.',
    type: AttractionType.HISTORICAL,
    price: 7,
    rating: 4.2,
    reviews: generateReviews(3)
  },

  // Tlemcen attractions
  {
    id: 'mansourah',
    name: 'Mansourah Ruins',
    imageUrl: 'https://images.unsplash.com/photo-1626201850459-c0f63e8bb789?q=80&w=2070',
    description: 'Remains of a medieval city with a partially preserved mosque and impressive minaret.',
    type: AttractionType.HISTORICAL,
    price: 4,
    rating: 4.4,
    reviews: generateReviews(4)
  },
  {
    id: 'el-mechouar',
    name: 'El Mechouar Palace',
    imageUrl: 'https://images.unsplash.com/photo-1577720580479-9c5fde35d8f9?q=80&w=2070',
    description: 'A historic citadel that has housed various rulers throughout Tlemcen\'s history.',
    type: AttractionType.HISTORICAL,
    price: 5,
    rating: 4.3,
    reviews: generateReviews(5)
  },

  // Annaba attractions
  {
    id: 'hippo-regius',
    name: 'Hippo Regius',
    imageUrl: 'https://images.unsplash.com/photo-1566138518272-236912fcb41d?q=80&w=2070',
    description: 'Ancient Roman ruins where St. Augustine served as bishop in the 4th century.',
    type: AttractionType.HISTORICAL,
    price: 6,
    rating: 4.6,
    reviews: generateReviews(5)
  },
  {
    id: 'seraidi',
    name: 'Seraidi Mountain',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2070',
    description: 'A picturesque mountain village offering stunning views of Annaba and the Mediterranean.',
    type: AttractionType.MOUNTAIN,
    price: 0,
    rating: 4.7,
    reviews: generateReviews(6)
  },
];

// Associate attractions with their cities
cities.forEach(city => {
  city.attractions = attractions.filter(attraction => {
    if (city.id === 'algiers' && ['casbah', 'martyrs-memorial', 'sidi-fredj'].includes(attraction.id)) return true;
    if (city.id === 'oran' && ['santa-cruz', 'madagh-beach'].includes(attraction.id)) return true;
    if (city.id === 'constantine' && ['sidi-mcid-bridge', 'ahmed-bey-palace'].includes(attraction.id)) return true;
    if (city.id === 'tamanrasset' && ['assekrem', 'hoggar-mountains', 'tin-hinan-tomb'].includes(attraction.id)) return true;
    if (city.id === 'tlemcen' && ['mansourah', 'el-mechouar'].includes(attraction.id)) return true;
    if (city.id === 'annaba' && ['hippo-regius', 'seraidi'].includes(attraction.id)) return true;
    return false;
  });
});

export const activities: Activity[] = [
  // Algiers activities
  {
    id: 'algiers-tour',
    cityId: 'algiers',
    name: 'Historical Algiers Walking Tour',
    imageUrl: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=2069',
    description: 'Explore the historic heart of Algiers with a knowledgeable guide, including visits to the Casbah and key monuments.',
    type: ActivityType.TOUR,
    price: 25,
    duration: '3 hours',
    rating: 4.7,
    reviews: generateReviews(5)
  },
  {
    id: 'tipaza-day',
    cityId: 'algiers',
    name: 'Tipaza Roman Ruins Day Trip',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070',
    description: 'A day excursion to the Roman ruins of Tipaza and the Royal Mausoleum of Mauritania.',
    type: ActivityType.EXCURSION,
    price: 45,
    duration: '8 hours',
    rating: 4.8,
    reviews: generateReviews(6)
  },
  
  // Oran activities
  {
    id: 'oran-tour',
    cityId: 'oran',
    name: 'Oran City Cultural Tour',
    imageUrl: 'https://images.unsplash.com/photo-1528890513801-4bef8dac8161?q=80&w=1889',
    description: 'Discover the cultural landmarks of Oran including the theater, historic center, and local markets.',
    type: ActivityType.CULTURAL,
    price: 20,
    duration: '4 hours',
    rating: 4.5,
    reviews: generateReviews(4)
  },
  {
    id: 'oran-sailing',
    cityId: 'oran',
    name: 'Mediterranean Sailing Experience',
    imageUrl: 'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=2070',
    description: 'Sail along the coast of Oran while enjoying the beautiful Mediterranean scenery.',
    type: ActivityType.OUTDOOR,
    price: 60,
    duration: '5 hours',
    rating: 4.9,
    reviews: generateReviews(7)
  },
  
  // Constantine activities
  {
    id: 'constantine-bridges',
    cityId: 'constantine',
    name: 'Seven Bridges of Constantine Tour',
    imageUrl: 'https://images.unsplash.com/photo-1446148050415-19397017b4eb?q=80&w=2075',
    description: 'A guided tour of Constantine\'s famous bridges with historical commentary.',
    type: ActivityType.TOUR,
    price: 15,
    duration: '3 hours',
    rating: 4.6,
    reviews: generateReviews(5)
  },
  
  // Tamanrasset activities
  {
    id: 'desert-camping',
    cityId: 'tamanrasset',
    name: 'Sahara Desert Camping Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1528278618572-27614a24c391?q=80&w=1932',
    description: 'Experience the magic of camping under the stars in the Sahara Desert with traditional Tuareg guides.',
    type: ActivityType.OUTDOOR,
    price: 120,
    duration: '2 days',
    rating: 5.0,
    reviews: generateReviews(9)
  },
  {
    id: 'tuareg-culture',
    cityId: 'tamanrasset',
    name: 'Tuareg Cultural Experience',
    imageUrl: 'https://images.unsplash.com/photo-1547496614-59d7ea825ef7?q=80&w=1974',
    description: 'Learn about Tuareg traditions, crafts, and music in an authentic setting.',
    type: ActivityType.CULTURAL,
    price: 40,
    duration: '4 hours',
    rating: 4.8,
    reviews: generateReviews(6)
  },
  
  // Tlemcen activities
  {
    id: 'tlemcen-mosques',
    cityId: 'tlemcen',
    name: 'Islamic Architecture Tour',
    imageUrl: 'https://images.unsplash.com/photo-1563220599338-7b1ad7fb9b76?q=80&w=2070',
    description: 'Visit the beautiful mosques and madrasas of Tlemcen with an expert in Islamic architecture.',
    type: ActivityType.CULTURAL,
    price: 30,
    duration: '5 hours',
    rating: 4.7,
    reviews: generateReviews(5)
  },
  
  // Annaba activities
  {
    id: 'annaba-boat',
    cityId: 'annaba',
    name: 'Mediterranean Beach Hopping by Boat',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070',
    description: 'Visit the most beautiful beaches around Annaba by private boat.',
    type: ActivityType.OUTDOOR,
    price: 50,
    duration: '6 hours',
    rating: 4.9,
    reviews: generateReviews(7)
  }
];

export const flights: Flight[] = [
  // Algiers to other cities
  {
    id: 'alg-orn-001',
    departureCity: 'Algiers',
    arrivalCity: 'Oran',
    departureDate: '2025-06-10',
    departureTime: '08:30',
    arrivalTime: '09:45',
    price: 120,
    airline: 'Air Algérie',
    duration: '1h 15m'
  },
  {
    id: 'alg-cne-001',
    departureCity: 'Algiers',
    arrivalCity: 'Constantine',
    departureDate: '2025-06-10',
    departureTime: '10:15',
    arrivalTime: '11:30',
    price: 130,
    airline: 'Air Algérie',
    duration: '1h 15m'
  },
  {
    id: 'alg-tmr-001',
    departureCity: 'Algiers',
    arrivalCity: 'Tamanrasset',
    departureDate: '2025-06-10',
    departureTime: '07:00',
    arrivalTime: '09:30',
    price: 220,
    airline: 'Air Algérie',
    duration: '2h 30m'
  },
  
  // Return flights
  {
    id: 'orn-alg-001',
    departureCity: 'Oran',
    arrivalCity: 'Algiers',
    departureDate: '2025-06-15',
    departureTime: '18:30',
    arrivalTime: '19:45',
    price: 125,
    airline: 'Air Algérie',
    duration: '1h 15m'
  },
  {
    id: 'cne-alg-001',
    departureCity: 'Constantine',
    arrivalCity: 'Algiers',
    departureDate: '2025-06-15',
    departureTime: '16:45',
    arrivalTime: '18:00',
    price: 135,
    airline: 'Air Algérie',
    duration: '1h 15m'
  },
  {
    id: 'tmr-alg-001',
    departureCity: 'Tamanrasset',
    arrivalCity: 'Algiers',
    departureDate: '2025-06-15',
    departureTime: '19:00',
    arrivalTime: '21:30',
    price: 225,
    airline: 'Air Algérie',
    duration: '2h 30m'
  },
  
  // More flight options
  {
    id: 'alg-orn-002',
    departureCity: 'Algiers',
    arrivalCity: 'Oran',
    departureDate: '2025-06-10',
    departureTime: '14:00',
    arrivalTime: '15:15',
    price: 110,
    airline: 'Tassili Airlines',
    duration: '1h 15m'
  },
  {
    id: 'alg-cne-002',
    departureCity: 'Algiers',
    arrivalCity: 'Constantine',
    departureDate: '2025-06-10',
    departureTime: '16:30',
    arrivalTime: '17:45',
    price: 140,
    airline: 'Tassili Airlines',
    duration: '1h 15m'
  },
  {
    id: 'orn-alg-002',
    departureCity: 'Oran',
    arrivalCity: 'Algiers',
    departureDate: '2025-06-15',
    departureTime: '10:00',
    arrivalTime: '11:15',
    price: 115,
    airline: 'Tassili Airlines',
    duration: '1h 15m'
  },
  {
    id: 'cne-alg-002',
    departureCity: 'Constantine',
    arrivalCity: 'Algiers',
    departureDate: '2025-06-15',
    departureTime: '07:30',
    arrivalTime: '08:45',
    price: 130,
    airline: 'Tassili Airlines',
    duration: '1h 15m'
  }
];
