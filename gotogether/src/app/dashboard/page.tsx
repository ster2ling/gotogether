'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Grid, List, MoreVertical, Users, Calendar, MapPin, Sparkles, TrendingUp, Clock, Star } from 'lucide-react'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'

interface PlanningBoard {
  id: string
  title: string
  description: string
  collaborators: number
  lastUpdated: string
  tripDate: string
  destination: string
  image: string
  progress: number
  isFavorite: boolean
}

const mockBoards: PlanningBoard[] = [
  {
    id: '1',
    title: 'Summer Beach Trip',
    description: 'Planning a relaxing beach vacation with friends',
    collaborators: 4,
    lastUpdated: '2 hours ago',
    tripDate: 'July 15-22, 2024',
    destination: 'Maldives',
    image: '/beach.jpg',
    progress: 75,
    isFavorite: true
  },
  {
    id: '2',
    title: 'European Adventure',
    description: 'Exploring multiple cities across Europe',
    collaborators: 2,
    lastUpdated: '1 day ago',
    tripDate: 'September 10-25, 2024',
    destination: 'Europe',
    image: '/europe.jpg',
    progress: 45,
    isFavorite: false
  },
  {
    id: '3',
    title: 'Weekend Getaway',
    description: 'Quick mountain retreat for the weekend',
    collaborators: 3,
    lastUpdated: '3 days ago',
    tripDate: 'June 8-10, 2024',
    destination: 'Swiss Alps',
    image: '/mountain.jpg',
    progress: 90,
    isFavorite: true
  }
]

export default function DashboardPage() {
  const { user } = useSupabaseAuth()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'recent'>('all')

  const filteredBoards = mockBoards.filter(board => {
    const matchesSearch = board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         board.destination.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === 'favorites') return matchesSearch && board.isFavorite
    if (activeFilter === 'recent') return matchesSearch && board.lastUpdated.includes('hours')
    return matchesSearch
  })

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getDestinationGradient = (destination: string) => {
    const gradients = {
      'Maldives': 'from-cyan-400 to-blue-500',
      'Europe': 'from-purple-400 to-pink-500',
      'Swiss Alps': 'from-emerald-400 to-teal-500',
      'default': 'from-teal-400 to-cyan-500'
    }
    return gradients[destination as keyof typeof gradients] || gradients.default
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  GoTogether
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search boards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeFilter === 'all' 
                      ? 'bg-teal-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('favorites')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeFilter === 'favorites' 
                      ? 'bg-teal-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setActiveFilter('recent')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeFilter === 'recent' 
                      ? 'bg-teal-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Recent
                </button>
              </div>
              
              <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-teal-500 text-white shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-teal-500 text-white shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.user_metadata?.first_name || 'Traveler'}! ✨
                </h2>
                <p className="text-gray-600 text-lg">Ready to plan your next adventure?</p>
                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-teal-500" />
                    <span>{filteredBoards.length} active boards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-teal-500" />
                    <span>12 total collaborators</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-teal-500" />
                    <span>3 upcoming trips</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Your Planning Boards</h3>
            <Link
              href="/dashboard/new-board"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                boxShadow: '0 8px 25px rgba(13, 148, 136, 0.3), 0 2px 8px rgba(13, 148, 136, 0.2)'
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Board
            </Link>
          </div>
        </div>

        {/* Boards Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board) => (
              <Link
                key={board.id}
                href={`/dashboard/board/${board.id}`}
                className="group block"
              >
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${getDestinationGradient(board.destination)} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-3 right-3">
                      <button 
                        className={`p-2 rounded-full transition-all ${
                          board.isFavorite 
                            ? 'bg-white/20 text-yellow-300' 
                            : 'bg-white/20 text-white/60 hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          // Toggle favorite
                        }}
                      >
                        <Star className={`h-4 w-4 ${board.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center space-x-2 text-white">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{board.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                          {board.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{board.description}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Planning Progress</span>
                        <span>{board.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(board.progress)}`}
                          style={{ width: `${board.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {board.collaborators}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {board.tripDate}
                        </div>
                      </div>
                      <span className="text-xs">{board.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            {filteredBoards.map((board, index) => (
              <Link
                key={board.id}
                href={`/dashboard/board/${board.id}`}
                className="block group"
              >
                <div className={`flex items-center p-6 hover:bg-white/40 transition-colors ${index !== filteredBoards.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${getDestinationGradient(board.destination)} rounded-xl flex items-center justify-center`}>
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                          {board.title}
                        </h4>
                        {board.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{board.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Planning Progress</span>
                        <span>{board.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(board.progress)}`}
                          style={{ width: `${board.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {board.collaborators} collaborators
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {board.tripDate}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {board.destination}
                      </div>
                      <span className="text-xs">{board.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredBoards.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No boards found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Try adjusting your search terms.' : 'Get started by creating your first planning board.'}
              </p>
              {!searchQuery && (
                <Link
                  href="/dashboard/new-board"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                    boxShadow: '0 8px 25px rgba(13, 148, 136, 0.3), 0 2px 8px rgba(13, 148, 136, 0.2)'
                  }}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Board
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 