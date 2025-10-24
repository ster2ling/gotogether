'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import Map, { Marker, Source, Layer } from 'react-map-gl'
import type { MapRef } from 'react-map-gl'
import { TripNode, Connection, MapViewport } from '@/types/node'
import PreviewCard from './PreviewCard'
import WhiteboardDrawer from './WhiteboardDrawer'
import { MapPin, Plus, Layers, Settings, Users, Sun, Moon, Satellite } from 'lucide-react'

interface MapWorkspaceProps {
  initialNodes?: TripNode[]
  initialConnections?: Connection[]
  onNodeUpdate?: (nodes: TripNode[]) => void
  onConnectionUpdate?: (connections: Connection[]) => void
  isCollaborating?: boolean
}

const MapWorkspace: React.FC<MapWorkspaceProps> = ({
  initialNodes = [],
  initialConnections = [],
  onNodeUpdate,
  onConnectionUpdate,
  isCollaborating = false
}) => {
  const mapRef = useRef<MapRef>(null)
  const [nodes, setNodes] = useState<TripNode[]>(initialNodes)
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false)
  const [mapStyle, setMapStyle] = useState<'light' | 'dark' | 'satellite'>('dark')
  const [viewport, setViewport] = useState<MapViewport>({
    latitude: 40.7589,
    longitude: -73.9851,
    zoom: 17,
    pitch: 45,
    bearing: 0
  })

  // Sample data for demonstration - only set once
  useEffect(() => {
    if (initialNodes.length === 0) {
      const sampleNodes: TripNode[] = [
        {
          id: '1',
          lat: 40.7589,
          lng: -73.9851,
          type: 'lodging',
          data: {
            title: 'The Plaza Hotel',
            description: 'Luxury hotel in the heart of Manhattan',
            price: 450,
            rating: 4.5,
            image: '/hotel.jpg',
            address: '768 5th Ave, New York, NY 10019',
            phone: '+1 212-759-3000',
            website: 'https://www.theplaza.com'
          }
        },
        {
          id: '2',
          lat: 40.7614,
          lng: -73.9776,
          type: 'restaurant',
          data: {
            title: 'Le Bernardin',
            description: 'Michelin-starred seafood restaurant',
            price: 185,
            rating: 4.8,
            image: '/restaurant.jpg',
            address: '155 W 51st St, New York, NY 10019'
          }
        },
        {
          id: '3',
          lat: 40.7829,
          lng: -73.9654,
          type: 'activity',
          data: {
            title: 'Central Park',
            description: 'Urban park in Manhattan',
            price: 0,
            rating: 4.7,
            image: '/park.jpg',
            address: 'Central Park, New York, NY'
          }
        }
      ]
      setNodes(sampleNodes)
    }
  }, []) // Remove nodes.length dependency to prevent infinite loop

  // Map style configuration
  const getMapStyle = () => {
    switch (mapStyle) {
      case 'light':
        return 'mapbox://styles/mapbox/streets-v12'
      case 'dark':
        return 'mapbox://styles/mapbox/dark-v11'
      case 'satellite':
        return 'mapbox://styles/mapbox/satellite-streets-v12'
      default:
        return 'mapbox://styles/mapbox/dark-v11'
    }
  }

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(selectedNodeId === nodeId ? null : nodeId)
  }, [selectedNodeId])

  const handleNodeUpdate = useCallback((updatedNode: TripNode) => {
    setNodes(prevNodes => {
      const newNodes = prevNodes.map(node => 
        node.id === updatedNode.id ? updatedNode : node
      )
      onNodeUpdate?.(newNodes)
      return newNodes
    })
  }, [onNodeUpdate])

  const handleAddNode = useCallback((lat: number, lng: number) => {
    const newNode: TripNode = {
      id: Date.now().toString(),
      lat,
      lng,
      type: 'note',
      data: {
        title: 'New Note',
        description: 'Click to edit...'
      }
    }
    setNodes(prevNodes => {
      const newNodes = [...prevNodes, newNode]
      onNodeUpdate?.(newNodes)
      return newNodes
    })
  }, [onNodeUpdate])

  const handleMapClick = useCallback((event: any) => {
    if (event.originalEvent.defaultPrevented) return
    
    try {
      const { lngLat } = event
      if (lngLat && typeof lngLat.lat === 'number' && typeof lngLat.lng === 'number') {
        handleAddNode(lngLat.lat, lngLat.lng)
      }
    } catch (error) {
      console.warn('Error handling map click:', error)
    }
  }, [handleAddNode])

  // Generate route data for connections
  const routeData = {
    type: 'FeatureCollection' as const,
    features: connections.map(connection => {
      const fromNode = nodes.find(n => n.id === connection.fromNodeId)
      const toNode = nodes.find(n => n.id === connection.toNodeId)
      
      if (!fromNode || !toNode) return null
      
      // Validate coordinates
      if (typeof fromNode.lat !== 'number' || typeof fromNode.lng !== 'number' ||
          typeof toNode.lat !== 'number' || typeof toNode.lng !== 'number') {
        return null
      }
      
      return {
        type: 'Feature' as const,
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [fromNode.lng, fromNode.lat],
            [toNode.lng, toNode.lat]
          ]
        },
        properties: {
          connectionId: connection.id,
          type: connection.type
        }
      }
    }).filter(Boolean)
  }

  // Error boundary for map rendering
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Missing</h3>
          <p className="text-gray-300">Please add your Mapbox access token to .env.local</p>
          <p className="text-gray-400 text-sm mt-2">Current token: {process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'undefined'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* Map Container */}
      <div className="absolute inset-0">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={viewport}
          onMove={evt => setViewport(evt.viewState)}
          onClick={handleMapClick}
          style={{ width: '100%', height: '100%' }}
          mapStyle={getMapStyle()}
          pitch={45}
          bearing={0}
          onError={(error) => {
            console.error('Map error:', error)
          }}
          onLoad={() => {
            console.log('Map loaded successfully')
            if (mapRef.current) {
              const map = mapRef.current.getMap()
              console.log('Available sources:', map.getStyle().sources)
              console.log('Available layers:', map.getStyle().layers.map(l => l.id))
            }
          }}
        >
          {/* Buildings Layer - simplified approach */}
          {mapStyle !== 'satellite' && (
            <Layer
              id="buildings-3d"
              type="fill-extrusion"
              source="mapbox"
              sourceLayer="building"
              paint={{
                'fill-extrusion-color': mapStyle === 'dark' ? '#2a2a2a' : '#9ca3af',
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.8
              }}
            />
          )}

          {/* Route Lines */}
          {routeData.features.length > 0 && (
            <Source id="routes" type="geojson" data={routeData}>
              <Layer
                id="route-lines"
                type="line"
                paint={{
                  'line-color': '#3b82f6',
                  'line-width': 3,
                  'line-opacity': 0.8
                }}
              />
            </Source>
          )}

          {/* Nodes as Markers */}
          {nodes.map((node) => (
            <Marker
              key={node.id}
              latitude={node.lat}
              longitude={node.lng}
              anchor="bottom"
            >
              <PreviewCard
                node={node}
                isSelected={selectedNodeId === node.id}
                onClick={() => handleNodeClick(node.id)}
                onUpdate={handleNodeUpdate}
                isCollaborating={isCollaborating}
              />
            </Marker>
          ))}
        </Map>
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        {/* Map Style Toggle */}
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setMapStyle('light')}
            className={`p-3 rounded-lg shadow-lg transition-colors ${
              mapStyle === 'light' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/90 backdrop-blur-sm hover:bg-white'
            }`}
            title="Light Map"
          >
            <Sun className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setMapStyle('dark')}
            className={`p-3 rounded-lg shadow-lg transition-colors ${
              mapStyle === 'dark' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/90 backdrop-blur-sm hover:bg-white'
            }`}
            title="Dark Map"
          >
            <Moon className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setMapStyle('satellite')}
            className={`p-3 rounded-lg shadow-lg transition-colors ${
              mapStyle === 'satellite' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/90 backdrop-blur-sm hover:bg-white'
            }`}
            title="Satellite Map"
          >
            <Satellite className="h-5 w-5" />
          </button>
        </div>

        {/* Other Controls */}
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title="Toggle Whiteboard"
          >
            <Layers className="h-5 w-5 text-gray-700" />
          </button>
          
          <button
            className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title="Settings"
          >
            <Settings className="h-5 w-5 text-gray-700" />
          </button>
          
          {isCollaborating && (
            <button
              className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
              title="Collaborators"
            >
              <Users className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Add Node Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => {
            const center = mapRef.current?.getCenter()
            if (center) {
              handleAddNode(center.lat, center.lng)
            }
          }}
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
          title="Add Node"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Whiteboard Drawer */}
      <WhiteboardDrawer
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        onNoteDrop={(note) => {
          // Convert whiteboard note to map node
          const newNode: TripNode = {
            id: note.id,
            lat: viewport.latitude + (Math.random() - 0.5) * 0.01,
            lng: viewport.longitude + (Math.random() - 0.5) * 0.01,
            type: 'note',
            data: {
              title: note.content,
              description: 'From whiteboard'
            }
          }
          setNodes(prevNodes => [...prevNodes, newNode])
        }}
      />
    </div>
  )
}

export default MapWorkspace
