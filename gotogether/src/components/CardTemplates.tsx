'use client'

import { MapPin, Hotel, Camera, Utensils, Plane, Car, Calendar, DollarSign, Star, Clock, Users, Wifi, Car as Parking, Waves } from 'lucide-react'

export interface CardTemplate {
  id: string
  type: 'destination' | 'accommodation' | 'activity' | 'restaurant' | 'transport' | 'note'
  title: string
  description: string
  location?: string
  price?: string
  rating?: number
  icon: React.ReactNode
  color: string
  gradient: string
  fields: {
    title: string
    description: string
    location?: string
    price?: string
    rating?: number
    checkIn?: string
    checkOut?: string
    guests?: number
    amenities?: string[]
    duration?: string
    difficulty?: string
    cuisine?: string
    reservation?: string
    departure?: string
    arrival?: string
    airline?: string
    flightNumber?: string
    carType?: string
    pickupLocation?: string
  }
}

export const cardTemplates: CardTemplate[] = [
  // Destination Templates
  {
    id: 'beach-destination',
    type: 'destination',
    title: 'Beach Destination',
    description: 'Perfect beach getaway with crystal clear waters',
    icon: <MapPin className="h-5 w-5" />,
    color: 'bg-cyan-500',
    gradient: 'from-cyan-400 to-blue-500',
    fields: {
      title: 'Beach Destination',
      description: 'Beautiful beach with pristine waters and white sand. Perfect for swimming, snorkeling, and relaxation.',
      location: 'Beach Location',
      rating: 4.8
    }
  },
  {
    id: 'mountain-destination',
    type: 'destination',
    title: 'Mountain Retreat',
    description: 'Scenic mountain destination for hiking and nature',
    icon: <MapPin className="h-5 w-5" />,
    color: 'bg-emerald-500',
    gradient: 'from-emerald-400 to-teal-500',
    fields: {
      title: 'Mountain Retreat',
      description: 'Breathtaking mountain views with hiking trails and outdoor activities. Great for adventure seekers.',
      location: 'Mountain Location',
      rating: 4.7
    }
  },
  {
    id: 'city-destination',
    type: 'destination',
    title: 'City Break',
    description: 'Urban destination with culture and entertainment',
    icon: <MapPin className="h-5 w-5" />,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-pink-500',
    fields: {
      title: 'City Break',
      description: 'Vibrant city with rich culture, museums, shopping, and nightlife. Perfect for urban exploration.',
      location: 'City Name',
      rating: 4.6
    }
  },

  // Accommodation Templates
  {
    id: 'luxury-hotel',
    type: 'accommodation',
    title: 'Luxury Hotel',
    description: '5-star luxury accommodation with premium amenities',
    icon: <Hotel className="h-5 w-5" />,
    color: 'bg-teal-600',
    gradient: 'from-teal-500 to-cyan-600',
    fields: {
      title: 'Luxury Hotel',
      description: '5-star luxury hotel with premium amenities, spa, and fine dining.',
      location: 'Hotel Location',
      price: '$300/night',
      rating: 4.9,
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      guests: 2,
              amenities: ['WiFi', 'Waves', 'Spa', 'Restaurant', 'Room Service', 'Gym']
    }
  },
  {
    id: 'boutique-hotel',
    type: 'accommodation',
    title: 'Boutique Hotel',
    description: 'Charming boutique hotel with unique character',
    icon: <Hotel className="h-5 w-5" />,
    color: 'bg-rose-500',
    gradient: 'from-rose-400 to-pink-500',
    fields: {
      title: 'Boutique Hotel',
      description: 'Charming boutique hotel with unique character and personalized service.',
      location: 'Hotel Location',
      price: '$150/night',
      rating: 4.7,
      checkIn: '2:00 PM',
      checkOut: '11:00 AM',
      guests: 2,
      amenities: ['WiFi', 'Breakfast', 'Garden', 'Bar']
    }
  },
  {
    id: 'vacation-rental',
    type: 'accommodation',
    title: 'Vacation Rental',
    description: 'Private vacation rental with home comforts',
    icon: <Hotel className="h-5 w-5" />,
    color: 'bg-orange-500',
    gradient: 'from-orange-400 to-red-500',
    fields: {
      title: 'Vacation Rental',
      description: 'Private vacation rental with full kitchen, living space, and home comforts.',
      location: 'Rental Location',
      price: '$200/night',
      rating: 4.8,
      checkIn: '4:00 PM',
      checkOut: '10:00 AM',
      guests: 4,
      amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Parking', 'Balcony']
    }
  },

  // Activity Templates
  {
    id: 'guided-tour',
    type: 'activity',
    title: 'Guided Tour',
    description: 'Professional guided tour with local expert',
    icon: <Camera className="h-5 w-5" />,
    color: 'bg-teal-700',
    gradient: 'from-teal-600 to-cyan-700',
    fields: {
      title: 'Guided Tour',
      description: 'Professional guided tour with local expert. Learn about history, culture, and hidden gems.',
      location: 'Tour Location',
      price: '$50/person',
      rating: 4.8,
      duration: '3 hours',
      difficulty: 'Easy'
    }
  },
  {
    id: 'adventure-activity',
    type: 'activity',
    title: 'Adventure Activity',
    description: 'Thrilling outdoor adventure experience',
    icon: <Camera className="h-5 w-5" />,
    color: 'bg-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    fields: {
      title: 'Adventure Activity',
      description: 'Thrilling outdoor adventure experience. Perfect for adrenaline seekers and nature lovers.',
      location: 'Activity Location',
      price: '$80/person',
      rating: 4.9,
      duration: '4 hours',
      difficulty: 'Moderate'
    }
  },
  {
    id: 'cultural-experience',
    type: 'activity',
    title: 'Cultural Experience',
    description: 'Immerse yourself in local culture and traditions',
    icon: <Camera className="h-5 w-5" />,
    color: 'bg-purple-600',
    gradient: 'from-purple-500 to-pink-600',
    fields: {
      title: 'Cultural Experience',
      description: 'Immerse yourself in local culture and traditions. Learn about customs, art, and local life.',
      location: 'Experience Location',
      price: '$60/person',
      rating: 4.7,
      duration: '2 hours',
      difficulty: 'Easy'
    }
  },

  // Restaurant Templates
  {
    id: 'fine-dining',
    type: 'restaurant',
    title: 'Fine Dining',
    description: 'Elegant fine dining restaurant with gourmet cuisine',
    icon: <Utensils className="h-5 w-5" />,
    color: 'bg-teal-800',
    gradient: 'from-teal-700 to-cyan-800',
    fields: {
      title: 'Fine Dining Restaurant',
      description: 'Elegant fine dining restaurant with gourmet cuisine and exceptional service.',
      location: 'Restaurant Location',
      price: '$100/person',
      rating: 4.9,
      cuisine: 'International',
      reservation: 'Required'
    }
  },
  {
    id: 'local-restaurant',
    type: 'restaurant',
    title: 'Local Restaurant',
    description: 'Authentic local restaurant with traditional cuisine',
    icon: <Utensils className="h-5 w-5" />,
    color: 'bg-orange-600',
    gradient: 'from-orange-500 to-red-600',
    fields: {
      title: 'Local Restaurant',
      description: 'Authentic local restaurant serving traditional cuisine and local specialties.',
      location: 'Restaurant Location',
      price: '$30/person',
      rating: 4.6,
      cuisine: 'Local',
      reservation: 'Recommended'
    }
  },
  {
    id: 'casual-dining',
    type: 'restaurant',
    title: 'Casual Dining',
    description: 'Relaxed casual dining with great food',
    icon: <Utensils className="h-5 w-5" />,
    color: 'bg-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
    fields: {
      title: 'Casual Dining',
      description: 'Relaxed casual dining spot with great food and friendly atmosphere.',
      location: 'Restaurant Location',
      price: '$25/person',
      rating: 4.5,
      cuisine: 'Casual',
      reservation: 'Walk-in welcome'
    }
  },

  // Transport Templates
  {
    id: 'flight',
    type: 'transport',
    title: 'Flight',
    description: 'Air travel between destinations',
    icon: <Plane className="h-5 w-5" />,
    color: 'bg-teal-900',
    gradient: 'from-teal-800 to-cyan-900',
    fields: {
      title: 'Flight',
      description: 'Air travel between destinations with airline service.',
      departure: 'Departure Airport',
      arrival: 'Arrival Airport',
      airline: 'Airline Name',
      flightNumber: 'FL123',
      price: '$300/person'
    }
  },
  {
    id: 'car-rental',
    type: 'transport',
    title: 'Car Rental',
    description: 'Rental car for local transportation',
    icon: <Car className="h-5 w-5" />,
    color: 'bg-gray-600',
    gradient: 'from-gray-500 to-slate-600',
    fields: {
      title: 'Car Rental',
      description: 'Rental car for local transportation and exploration.',
      carType: 'SUV',
      pickupLocation: 'Rental Location',
      price: '$50/day',
      duration: '3 days'
    }
  },
  {
    id: 'train-journey',
    type: 'transport',
    title: 'Train Journey',
    description: 'Scenic train travel experience',
    icon: <Car className="h-5 w-5" />,
    color: 'bg-indigo-600',
    gradient: 'from-indigo-500 to-purple-600',
    fields: {
      title: 'Train Journey',
      description: 'Scenic train journey with comfortable seating and beautiful views.',
      departure: 'Departure Station',
      arrival: 'Arrival Station',
      price: '$80/person',
      duration: '2 hours'
    }
  }
]

export function getCardTemplate(id: string): CardTemplate | undefined {
  return cardTemplates.find(template => template.id === id)
}

export function getTemplatesByType(type: CardTemplate['type']): CardTemplate[] {
  return cardTemplates.filter(template => template.type === type)
} 