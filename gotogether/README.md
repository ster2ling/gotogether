# GoTogether - Collaborative Vacation Planning Platform

A modern web application for planning trips with friends and family, featuring real-time collaboration, AI-powered recommendations, and comprehensive itinerary management.

## Features

- **Collaborative Planning Boards**: Real-time shared planning with drag-and-drop functionality
- **Smart Location Search**: Google Places API integration for destination autocomplete
- **Date Range Selection**: Beautiful calendar interface for trip dates
- **User Authentication**: Secure login and signup system
- **Dashboard**: Manage multiple planning boards
- **AI Integration**: OpenAI-powered recommendations (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Places API key (for location search)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gotogether
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Google Places API Configuration
# Get your API key from: https://console.cloud.google.com/apis/credentials
# Enable the Places API in your Google Cloud Console
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

### Google Places API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
5. Add the API key to your `.env.local` file

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
gotogether/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard and board pages
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable UI components
│   │   ├── DateRangePicker.tsx
│   │   ├── LocationSearch.tsx
│   │   └── ...
│   └── services/           # API services
│       └── placesApi.ts    # Google Places API integration
├── public/                 # Static assets
└── package.json
```

## Key Components

### LocationSearch
- Google Places API integration
- Real-time autocomplete suggestions
- Location type indicators (City, Region, Country)
- Keyboard navigation support

### DateRangePicker
- Vacation-focused date range selection
- Visual range highlighting
- Trip duration calculation
- Smart date validation

### Planning Board
- Interactive canvas for trip planning
- Drag-and-drop card functionality
- Real-time collaboration (coming soon)
- Multiple card types (destination, accommodation, activity, etc.)

## Development Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Location search with Google Places API
- ✅ Date range picker
- ✅ Planning board interface
- ✅ Dashboard and board management

### Phase 2 (Next)
- 🔄 Backend API integration
- 🔄 Real-time collaboration (WebSockets)
- 🔄 Drag-and-drop functionality
- 🔄 AI-powered recommendations

### Phase 3 (Future)
- 📋 Advanced card editing
- 📋 Budget tracking
- 📋 Itinerary builder
- 📋 Mobile app (React Native/PWA)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
