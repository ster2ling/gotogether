'use client'

import { useState, useEffect, useRef } from 'react'
import { Users, MessageSquare, Calendar, MapPin, Plus, CheckCircle, ArrowRight, Star, Clock, MessageCircle, Move, MoreHorizontal, Edit3, Trash2, Copy, Share2, MapPin as MapPinIcon, Building, Camera, Utensils, Plane } from 'lucide-react'

interface DraggableNode {
  id: string
  type: string
  title: string
  description: string
  location: string
  rating: number
  price?: string
  author: string
  timeAgo: string
  x: number
  y: number
  connections: string[]
}

interface Connection {
  id: string
  from: string
  to: string
}

export default function BoardShowcase() {
  // Drag and drop state
  const [nodes, setNodes] = useState<DraggableNode[]>([
    { 
      id: 'maldives', 
      type: 'destination', 
      title: 'Maldives',
      description: 'Beautiful island paradise with crystal clear waters and pristine white sand beaches. Perfect for romantic getaways and family vacations.',
      location: 'Maldives',
      rating: 4.8,
      author: 'Sarah',
      timeAgo: '2h ago',
      x: 100, 
      y: 80, 
      connections: [] 
    },
    { 
      id: 'overwater-villa', 
      type: 'accommodation', 
      title: 'Overwater Villa',
      description: 'Luxury overwater bungalow with private deck and direct ocean access. Features glass floor panels and infinity pool.',
      location: 'Maldives',
      rating: 4.9,
      price: '$500/night',
      author: 'Mike',
      timeAgo: '1h ago',
      x: 400, 
      y: 120, 
      connections: [] 
    },
    { 
      id: 'snorkeling-tour', 
      type: 'activity', 
      title: 'Snorkeling Tour',
      description: 'Explore vibrant coral reefs and marine life with professional guides. Includes equipment and safety briefing.',
      location: 'Maldives',
      rating: 4.7,
      price: '$80/person',
      author: 'Alex',
      timeAgo: '30m ago',
      x: 200, 
      y: 300, 
      connections: [] 
    },
    { 
      id: 'beach-restaurant', 
      type: 'restaurant', 
      title: 'Beach Restaurant',
      description: 'Fresh seafood with oceanfront dining. Features local cuisine and sunset views. Reservations recommended.',
      location: 'Maldives',
      rating: 4.6,
      price: '$120/meal',
      author: 'Emma',
      timeAgo: '45m ago',
      x: 500, 
      y: 280, 
      connections: [] 
    }
  ])
  const [connections, setConnections] = useState<Connection[]>([])
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isCreatingConnection, setIsCreatingConnection] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'destination': return <MapPinIcon className="w-5 h-5" />
      case 'accommodation': return <Building className="w-5 h-5" />
      case 'activity': return <Camera className="w-5 h-5" />
      case 'restaurant': return <Utensils className="w-5 h-5" />
      case 'transport': return <Plane className="w-5 h-5" />
      default: return <MapPinIcon className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'destination': return 'bg-blue-500'
      case 'accommodation': return 'bg-green-500'
      case 'activity': return 'bg-purple-500'
      case 'restaurant': return 'bg-orange-500'
      case 'transport': return 'bg-red-500'
      default: return 'bg-teal-500'
    }
  }

  const addExampleNode = () => {
    const exampleNodes = [
      {
        id: `node-${Date.now()}`,
        type: 'transport',
        title: 'Seaplane Transfer',
        description: 'Scenic flight to your island resort',
        location: 'Maldives',
        rating: 4.5,
        price: '$200/person',
        author: 'Tom',
        timeAgo: '15m ago',
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 100,
        connections: []
      },
      {
        id: `node-${Date.now() + 1}`,
        type: 'activity',
        title: 'Sunset Cruise',
        description: 'Romantic evening on the Indian Ocean',
        location: 'Maldives',
        rating: 4.9,
        price: '$150/person',
        author: 'Lisa',
        timeAgo: '1h ago',
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 100,
        connections: []
      },
      {
        id: `node-${Date.now() + 2}`,
        type: 'restaurant',
        title: 'Underwater Dining',
        description: 'Unique dining experience below the waves',
        location: 'Maldives',
        rating: 4.8,
        price: '$300/person',
        author: 'David',
        timeAgo: '2h ago',
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 100,
        connections: []
      }
    ]
    
    const randomNode = exampleNodes[Math.floor(Math.random() * exampleNodes.length)]
    setNodes(prev => [...prev, randomNode])
  }

  // Drag and drop handlers
  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (isCreatingConnection) return
    
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    setDraggedNode(nodeId)
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isCreatingConnection) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
      return
    }

    if (!draggedNode || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragOffset.x
    const newY = e.clientY - rect.top - dragOffset.y

    setNodes(prev => prev.map(node => 
      node.id === draggedNode 
        ? { ...node, x: Math.max(0, Math.min(newX, rect.width - 240)), y: Math.max(0, Math.min(newY, rect.height - 140)) }
        : node
    ))
  }

  const handleMouseUp = () => {
    setDraggedNode(null)
  }

  // Connection creation handlers
  const handlePlusClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    setIsCreatingConnection(true)
    setConnectionStart(nodeId)
  }

  const handleDeleteClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => conn.from !== nodeId && conn.to !== nodeId))
  }

  const handleDeleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId))
  }

  const handleNodeClick = (nodeId: string) => {
    if (isCreatingConnection && connectionStart && connectionStart !== nodeId) {
      const newConnection: Connection = {
        id: `${connectionStart}-${nodeId}`,
        from: connectionStart,
        to: nodeId
      }
      setConnections(prev => [...prev, newConnection])
      setIsCreatingConnection(false)
      setConnectionStart(null)
    }
  }

  // Connection line rendering
  const renderConnectionLine = (connection: Connection) => {
    const fromNode = nodes.find(n => n.id === connection.from)
    const toNode = nodes.find(n => n.id === connection.to)
    if (!fromNode || !toNode) return null

    const fromX = fromNode.x + 120 // center of node (using minWidth/2)
    const fromY = fromNode.y + 70
    const toX = toNode.x + 120
    const toY = toNode.y + 70

    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    const offset = Math.abs(toX - fromX) * 0.3

    return (
      <g key={connection.id}>
        <defs>
          <marker
            id={`arrow-${connection.id}`}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#0d9488" />
          </marker>
        </defs>
        <path
          d={`M ${fromX} ${fromY} Q ${midX} ${midY - offset} ${toX} ${toY}`}
          stroke="#0d9488"
          strokeWidth="2"
          fill="none"
          markerEnd={`url(#arrow-${connection.id})`}
          opacity="0.6"
          className="cursor-pointer"
          onMouseEnter={() => setHoveredConnection(connection.id)}
          onMouseLeave={() => setHoveredConnection(null)}
        />
        
        {hoveredConnection === connection.id && (
          <circle
            cx={midX}
            cy={midY - offset}
            r="8"
            fill="#ef4444"
            className="cursor-pointer"
            onClick={() => handleDeleteConnection(connection.id)}
          />
        )}
        {hoveredConnection === connection.id && (
          <text
            x={midX}
            y={midY - offset}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            className="cursor-pointer pointer-events-none"
          >
            ×
          </text>
        )}
      </g>
    )
  }

  // Render temporary connection line while creating
  const renderTempConnection = () => {
    if (!isCreatingConnection || !connectionStart) return null

    const fromNode = nodes.find(n => n.id === connectionStart)
    if (!fromNode) return null

    const fromX = fromNode.x + 120 // center of node (using minWidth/2)
    const fromY = fromNode.y + 70
    const toX = mousePosition.x
    const toY = mousePosition.y

    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    const offset = Math.abs(toX - fromX) * 0.3

    return (
      <g>
        <defs>
          <marker
            id="temp-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#0d9488" />
          </marker>
        </defs>
        <path
          d={`M ${fromX} ${fromY} Q ${midX} ${midY - offset} ${toX} ${toY}`}
          stroke="#0d9488"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#temp-arrow)"
          opacity="0.8"
          strokeDasharray="5,5"
        />
      </g>
    )
  }

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-teal-50 py-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Interactive Planning</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Visual Collaboration
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Drag, drop, and connect your travel plans with an intuitive interface that makes group coordination effortless.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <div 
            ref={canvasRef}
            className="relative w-full max-w-6xl mx-auto h-96 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 border border-teal-200 shadow-xl"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp()
              if (isCreatingConnection) {
                setIsCreatingConnection(false)
                setConnectionStart(null)
              }
            }}
          >
            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(13, 148, 136, 0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map(connection => renderConnectionLine(connection))}
              {renderTempConnection()}
            </svg>

            {/* Draggable Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute bg-white rounded-xl shadow-xl border border-gray-200 transition-shadow duration-200 ${
                  draggedNode === node.id ? 'shadow-2xl z-50 cursor-move' : 'hover:shadow-2xl'
                } ${isCreatingConnection && connectionStart === node.id ? 'ring-2 ring-teal-400' : ''}`}
                style={{
                  left: node.x,
                  top: node.y,
                  minWidth: '240px',
                  minHeight: '140px',
                  width: 'fit-content',
                  maxWidth: '320px'
                }}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node.id)}
              >
                {/* Header */}
                <div className={`${getTypeColor(node.type)} text-white px-3 py-2 rounded-t-xl flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(node.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{node.rating}</span>
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col gap-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-sm truncate leading-tight">{node.title}</h3>
                    <p className="text-xs text-gray-600 leading-tight" style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {node.description}
                    </p>
                  </div>
                  
                  <div className="space-y-1 mt-auto">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{node.location}</span>
                    </div>
                    
                    {node.price && (
                      <div className="text-xs font-medium text-gray-900 truncate">
                        {node.price}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 truncate">
                      By {node.author} • {node.timeAgo}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                {hoveredNode === node.id && !isCreatingConnection && (
                  <div className="absolute -top-2 -right-2 flex gap-1">
                    <button
                      className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors shadow-lg z-10"
                      onClick={(e) => handlePlusClick(e, node.id)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
                      onClick={(e) => handleDeleteClick(e, node.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Instructions */}
            <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              🎯 Try it yourself
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
              {isCreatingConnection ? '💡 Click another node to connect' : '💡 Hover nodes to add connections'}
            </div>

            {/* Add Node Button */}
            <button
              onClick={addExampleNode}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-lg text-sm font-medium shadow-lg hover:bg-white transition-colors"
            >
              + Add Example
            </button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Move className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop</h3>
            <p className="text-gray-600">Move items around freely to organize your perfect itinerary</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Connections</h3>
            <p className="text-gray-600">Create flow charts showing how your plans connect and depend on each other</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Sync</h3>
            <p className="text-gray-600">See changes instantly as your travel group collaborates together</p>
          </div>
        </div>
      </div>
    </section>
  )
} 