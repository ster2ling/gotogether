'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMapStore, useSetNodes, useSetConnections, useToggleWhiteboard } from '@/store/mapStore'
import MapWorkspace from '@/components/MapWorkspace'
import { ArrowLeft, Share, Settings, Users, Download, MoreVertical } from 'lucide-react'

export default function BoardPage() {
  const params = useParams()
  const router = useRouter()
  const boardId = params.id as string
  const [boardTitle, setBoardTitle] = useState('Untitled Board')
  const [isCollaborating, setIsCollaborating] = useState(false)
  
  const { 
    nodes, 
    connections, 
    viewport, 
    selectedNodeId,
    isWhiteboardOpen,
    isCollaborating: storeCollaborating 
  } = useMapStore()
  
  const setNodes = useSetNodes()
  const setConnections = useSetConnections()
  const toggleWhiteboard = useToggleWhiteboard()

  // Load board data (in a real app, this would come from an API)
  useEffect(() => {
    // Mock data loading
    const mockNodes = [
  {
    id: '1',
        lat: 40.7589,
        lng: -73.9851,
        type: 'lodging' as const,
        data: {
          title: 'The Plaza Hotel',
          description: 'Luxury hotel in the heart of Manhattan',
          price: 450,
          rating: 4.5,
          address: '768 5th Ave, New York, NY 10019',
          phone: '+1 212-759-3000',
          website: 'https://www.theplaza.com'
        }
  },
  {
    id: '2',
        lat: 40.7614,
        lng: -73.9776,
        type: 'restaurant' as const,
        data: {
          title: 'Le Bernardin',
          description: 'Michelin-starred seafood restaurant',
          price: 185,
          rating: 4.8,
          address: '155 W 51st St, New York, NY 10019'
        }
  },
  {
    id: '3',
        lat: 40.7829,
        lng: -73.9654,
        type: 'activity' as const,
        data: {
          title: 'Central Park',
          description: 'Urban park in Manhattan',
          price: 0,
    rating: 4.7,
          address: 'Central Park, New York, NY'
        }
      }
    ]

    const mockConnections = [
  {
    id: '1',
        fromNodeId: '1',
        toNodeId: '2',
        type: 'route' as const,
        color: '#3b82f6',
        strokeWidth: 3
  },
  {
    id: '2',
        fromNodeId: '2',
        toNodeId: '3',
        type: 'route' as const,
        color: '#3b82f6',
        strokeWidth: 3
      }
    ]

    setNodes(mockNodes)
    setConnections(mockConnections)
  }, [boardId, setNodes, setConnections])

  const handleNodeUpdate = (updatedNodes: typeof nodes) => {
    setNodes(updatedNodes)
  }

  const handleConnectionUpdate = (updatedConnections: typeof connections) => {
    setConnections(updatedConnections)
  }

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href)
    alert('Board link copied to clipboard!')
  }

  const handleExport = () => {
    // In a real app, this would export the board data
    const exportData = {
      title: boardTitle,
      nodes,
      connections,
      viewport,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${boardTitle.replace(/\s+/g, '_')}_export.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            
              <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-900">
                {boardTitle}
              </h1>
              <button
                onClick={() => {
                  const newTitle = prompt('Enter new title:', boardTitle)
                  if (newTitle) setBoardTitle(newTitle)
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
              </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
            
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            
            <button 
              onClick={() => setIsCollaborating(!isCollaborating)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isCollaborating 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>{isCollaborating ? 'Stop' : 'Start'} Collaboration</span>
            </button>
            
            <button 
              onClick={toggleWhiteboard}
              className={`p-2 rounded-lg transition-colors ${
                isWhiteboardOpen 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Map Workspace */}
      <div className="flex-1 relative">
        <MapWorkspace
          initialNodes={nodes}
          initialConnections={connections}
          onNodeUpdate={handleNodeUpdate}
          onConnectionUpdate={handleConnectionUpdate}
          isCollaborating={isCollaborating}
                        />
                      </div>

      {/* Status Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-white/20 px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>Nodes: {nodes.length}</span>
          <span>Connections: {connections.length}</span>
          <span>Selected: {selectedNodeId || 'None'}</span>
        </div>

        <div className="flex items-center space-x-4">
          <span>Zoom: {viewport.zoom.toFixed(1)}</span>
          <span>Pitch: {viewport.pitch}°</span>
          {isCollaborating && (
            <span className="flex items-center space-x-1 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Collaborating</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
} 