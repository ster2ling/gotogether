// Google Places API service
// You'll need to get an API key from: https://console.cloud.google.com/apis/credentials

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

interface GooglePlace {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
  types: string[]
}

interface LocationSuggestion {
  id: string
  name: string
  type: 'city' | 'region' | 'country'
  country?: string
  region?: string
  displayName: string
}

export const searchPlaces = async (query: string): Promise<LocationSuggestion[]> => {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API key not found. Using mock data.')
    return getMockSuggestions(query)
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)&key=${GOOGLE_PLACES_API_KEY}&language=en`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status)
      return getMockSuggestions(query)
    }

    return data.predictions.map((place: GooglePlace) => {
      const mainText = place.structured_formatting.main_text
      const secondaryText = place.structured_formatting.secondary_text || ''
      
      // Determine type based on Google's types
      let type: 'city' | 'region' | 'country' = 'city'
      if (place.types.includes('country')) {
        type = 'country'
      } else if (place.types.includes('administrative_area_level_1') || 
                 place.types.includes('administrative_area_level_2')) {
        type = 'region'
      }

      return {
        id: place.place_id,
        name: mainText,
        type,
        displayName: `${mainText}${secondaryText ? `, ${secondaryText}` : ''}`,
        country: extractCountry(secondaryText),
        region: extractRegion(secondaryText)
      }
    })
  } catch (error) {
    console.error('Error fetching places:', error)
    return getMockSuggestions(query)
  }
}

const extractCountry = (text: string): string | undefined => {
  // Simple extraction - in production you might want more sophisticated parsing
  const parts = text.split(', ')
  return parts[parts.length - 1] || undefined
}

const extractRegion = (text: string): string | undefined => {
  const parts = text.split(', ')
  return parts.length > 1 ? parts[parts.length - 2] : undefined
}

// Fallback mock data
const getMockSuggestions = (query: string): LocationSuggestion[] => {
  const mockSuggestions: LocationSuggestion[] = [
    { id: '1', name: 'Paris', type: 'city', country: 'France', displayName: 'Paris, France' },
    { id: '2', name: 'Hawaii', type: 'region', country: 'United States', displayName: 'Hawaii, United States' },
    { id: '3', name: 'Japan', type: 'country', displayName: 'Japan' },
    { id: '4', name: 'Patagonia', type: 'region', country: 'Argentina', displayName: 'Patagonia, Argentina' },
    { id: '5', name: 'Panama', type: 'country', displayName: 'Panama' },
    { id: '6', name: 'Pakistan', type: 'country', displayName: 'Pakistan' },
    { id: '7', name: 'Pana', type: 'city', country: 'United States', region: 'Illinois', displayName: 'Pana, Illinois, United States' },
    { id: '8', name: 'Paraiso', type: 'city', country: 'Costa Rica', region: 'Province of Cartago', displayName: 'Paraiso, Province of Cartago, Costa Rica' },
    { id: '9', name: 'Paraiso', type: 'city', country: 'Brazil', region: 'State of Santa Catarina', displayName: 'Paraiso, State of Santa Catarina, Brazil' },
    { id: '10', name: 'Paraiso', type: 'city', country: 'Costa Rica', region: 'Province of Guanacaste', displayName: 'Paraiso, Province of Guanacaste, Costa Rica' },
    { id: '11', name: 'Paraiso', type: 'city', country: 'Mexico', region: 'Tabasco', displayName: 'Paraiso, Tabasco, Mexico' },
  ]

  return mockSuggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
    suggestion.displayName.toLowerCase().includes(query.toLowerCase())
  )
} 