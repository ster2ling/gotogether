'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Grid, List, MoreVertical, Users, Calendar, MapPin } from 'lucide-react'

interface PlanningBoard {
  id: string
  title: string
  description: string
  collaborators: number
  lastUpdated: string
  tripDate: string
  destination: string
  image: string
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
    image: '/beach.jpg'
  },
  {
    id: '2',
    title: 'European Adventure',
    description: 'Exploring multiple cities across Europe',
    collaborators: 2,
    lastUpdated: '1 day ago',
    tripDate: 'September 10-25, 2024',
    destination: 'Europe',
    image: '/europe.jpg'
  },
  {
    id: '3',
    title: 'Weekend Getaway',
    description: 'Quick mountain retreat for the weekend',
    collaborators: 3,
    lastUpdated: '3 days ago',
    tripDate: 'June 8-10, 2024',
    destination: 'Swiss Alps',
    image: '/mountain.jpg'
  }
]

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBoards = mockBoards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">GoTogether</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search boards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, Sarah!</h2>
          <p className="mt-2 text-gray-600">Ready to plan your next adventure?</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Your Planning Boards</h3>
            <Link
              href="/dashboard/new-board"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
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
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {board.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">{board.description}</p>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {filteredBoards.map((board) => (
              <Link
                key={board.id}
                href={`/dashboard/board/${board.id}`}
                className="block group"
              >
                <div className="flex items-center p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {board.title}
                        </h4>
                        <p className="text-sm text-gray-600">{board.description}</p>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
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
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No boards found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search terms.' : 'Get started by creating your first planning board.'}
            </p>
            {!searchQuery && (
              <div className="mt-6">
                <Link
                  href="/dashboard/new-board"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Board
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
} 