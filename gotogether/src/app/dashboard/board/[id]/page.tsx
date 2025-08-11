'use client'

import { useState, useRef, useEffect, useCallback, use } from 'react'
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Users, 
  Settings, 
  Share2, 
  MapPin, 
  DollarSign,
  Plane,
  Hotel,
  Utensils,
  Camera,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Star,
  Send,
  X,
  Check
} from 'lucide-react'

interface Card {
  id: string
  type: 'destination' | 'accommodation' | 'activity' | 'restaurant' | 'transport' | 'note'
  title: string
  description: string
  location?: string
  price?: string
  rating?: number
  image?: string
  x: number
  y: number
  width: number
  height: number
  isEditing?: boolean
  createdBy?: string
  createdAt?: Date
}

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
  avatar: string
}

interface AISuggestion {
  id: string
  type: 'suggestion' | 'alert' | 'info'
  title: string
  message: string
  action?: string
}

// Extended CSS style declaration for vendor-prefixed properties
interface ExtendedCSSStyleDeclaration extends CSSStyleDeclaration {
  webkitUserSelect: string
  mozUserSelect: string
  msUserSelect: string
}

const mockCards: Card[] = [
  {
    id: '1',
    type: 'destination',
    title: 'Maldives',
    description: 'Beautiful island paradise with crystal clear waters',
    location: 'Maldives',
    rating: 4.8,
    x: 100,
    y: 100,
    width: 256,
    height: 200,
    createdBy: 'Sarah',
    createdAt: new Date(Date.now() - 7200000) // 2 hours ago
  },
  {
    id: '2',
    type: 'accommodation',
    title: 'Overwater Villa',
    description: 'Luxury overwater bungalow with private deck',
    location: 'Maldives',
    price: '$500/night',
    rating: 4.9,
    x: 300,
    y: 150,
    width: 256,
    height: 200,
    createdBy: 'Mike',
    createdAt: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: '3',
    type: 'activity',
    title: 'Snorkeling Tour',
    description: 'Explore vibrant coral reefs and marine life',
    location: 'Maldives',
    price: '$80/person',
    rating: 4.7,
    x: 500,
    y: 200,
    width: 256,
    height: 200,
    createdBy: 'Alex',
    createdAt: new Date(Date.now() - 1800000) // 30 minutes ago
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey team! I found this amazing overwater villa. What do you think?',
    sender: 'Sarah',
    timestamp: new Date(Date.now() - 7200000),
    avatar: 'S'
  },
  {
    id: '2',
    text: 'Looks perfect! I love the private deck idea.',
    sender: 'Mike',
    timestamp: new Date(Date.now() - 3600000),
    avatar: 'M'
  },
  {
    id: '3',
    text: 'Should we add a spa day? I found some great packages.',
    sender: 'Alex',
    timestamp: new Date(Date.now() - 1800000),
    avatar: 'A'
  }
]

const mockAISuggestions: AISuggestion[] = [
  {
    id: '1',
    type: 'suggestion',
    title: 'AI Suggestion',
    message: 'Based on your Maldives trip, I recommend adding a sunset cruise and a spa day. Would you like me to find some options?',
    action: 'Find options'
  },
  {
    id: '2',
    type: 'info',
    title: 'Budget Update',
    message: 'You\'re currently at 65% of your budget. Still room for luxury activities!'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Weather Alert',
    message: 'July is perfect for Maldives! Average temperature 28°C with minimal rainfall.'
  }
]

export default function PlanningBoardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [cards, setCards] = useState<Card[]>(mockCards)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [aiSuggestions] = useState<AISuggestion[]>(mockAISuggestions)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [editingCard, setEditingCard] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Card>>({})
  const [showChat, setShowChat] = useState(true)
  const [showAI, setShowAI] = useState(true)
  const [collaborators] = useState([
    { name: 'Sarah', color: 'bg-blue-500', online: true },
    { name: 'Mike', color: 'bg-green-500', online: true },
    { name: 'Alex', color: 'bg-purple-500', online: false },
    { name: 'Emma', color: 'bg-orange-500', online: true }
  ])
  const [notifications, setNotifications] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error)
      setError(event.error?.message || 'An unexpected error occurred')
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  const canvasRef = useRef<HTMLDivElement>(null)

  // Add notification
  const addNotification = (message: string) => {
    const newNotification = `${message} - ${new Date().toLocaleTimeString()}`
    setNotifications(prev => [...prev, newNotification])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== newNotification))
    }, 3000)
  }

  const handleCardDelete = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId))
    setSelectedCard(null)
  }

  // Enhanced AI assistant interactions
  const handleAIAction = (suggestionId: string, action: string) => {
    if (action === 'Find options') {
      // Simulate AI finding options
      const newCard: Card = {
        id: Date.now().toString(),
        type: 'activity',
        title: 'Sunset Cruise',
        description: 'Romantic sunset cruise with dinner included',
        location: 'Maldives',
        price: '$120/person',
        rating: 4.8,
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
        width: 256,
        height: 200,
        createdBy: 'AI Assistant',
        createdAt: new Date()
      }
      setCards([...cards, newCard])
      addNotification('AI added a new activity suggestion')
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete selected card
      if (e.key === 'Delete' && selectedCard) {
        handleCardDelete(selectedCard)
      }
      // Escape to deselect
      if (e.key === 'Escape') {
        setSelectedCard(null)
        setShowAddMenu(false)
      }
      // Ctrl/Cmd + N to add new card
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setShowAddMenu(!showAddMenu)
      }
      // Ctrl/Cmd + F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder="Search cards..."]') as HTMLInputElement
        searchInput?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedCard, showAddMenu, handleCardDelete])

  // Load board state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(`board-${resolvedParams.id}`)
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState)
          
          // Convert date strings back to Date objects for cards
          const cardsWithDates = (parsedState.cards || mockCards).map((card: Card) => ({
            ...card,
            createdAt: card.createdAt ? new Date(card.createdAt) : new Date()
          }))
          
          // Convert date strings back to Date objects for messages
          const messagesWithDates = (parsedState.messages || mockMessages).map((message: Message) => ({
            ...message,
            timestamp: message.timestamp ? new Date(message.timestamp) : new Date()
          }))
          
          setCards(cardsWithDates)
          setMessages(messagesWithDates)
        } catch (error) {
          console.error('Error loading board state:', error)
        }
      }
    }
  }, [resolvedParams.id])

  // Save board state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const boardState = {
        cards,
        messages,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(`board-${resolvedParams.id}`, JSON.stringify(boardState))
    }
  }, [cards, messages, resolvedParams.id])

  // Filter cards based on search query
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.location?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddCard = (type: Card['type']) => {
    const newCard: Card = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      description: 'Add description here',
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      width: 256,
      height: 200,
      createdBy: 'You',
      createdAt: new Date()
    }
    setCards([...cards, newCard])
    setShowAddMenu(false)
  }

  const handleCardClick = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId)
    addNotification(`Selected card: ${cards.find(c => c.id === cardId)?.title}`)
  }

  const handleCardDuplicate = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      const duplicatedCard: Card = {
        ...card,
        id: Date.now().toString(),
        title: `${card.title} (Copy)`,
        x: card.x + 20,
        y: card.y + 20,
        createdAt: new Date()
      }
      setCards([...cards, duplicatedCard])
    }
  }

  const handleStartEdit = (card: Card) => {
    setEditingCard(card.id)
    setEditForm({
      title: card.title,
      description: card.description,
      location: card.location,
      price: card.price,
      rating: card.rating
    })
  }

  const handleSaveEdit = () => {
    if (editingCard) {
      setCards(cards.map(card =>
        card.id === editingCard
          ? { ...card, ...editForm, isEditing: false }
          : card
      ))
      setEditingCard(null)
      setEditForm({})
    }
  }

  const handleCancelEdit = () => {
    setEditingCard(null)
    setEditForm({})
  }

  // Drag and drop functionality
  const handleMouseDown = (e: React.MouseEvent, cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card && canvasRef.current) {
      // Prevent text selection during drag
      e.preventDefault()
      document.body.style.userSelect = 'none'
      ;(document.body.style as ExtendedCSSStyleDeclaration).webkitUserSelect = 'none'
      ;(document.body.style as ExtendedCSSStyleDeclaration).mozUserSelect = 'none'
      ;(document.body.style as ExtendedCSSStyleDeclaration).msUserSelect = 'none'
      
      const rect = canvasRef.current.getBoundingClientRect()
      setDraggedCard(cardId)
      setDragOffset({
        x: e.clientX - rect.left - card.x,
        y: e.clientY - rect.top - card.y
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && draggedCard && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const newX = e.clientX - rect.left - dragOffset.x
      const newY = e.clientY - rect.top - dragOffset.y

      setCards(prevCards =>
        prevCards.map(card =>
          card.id === draggedCard
            ? { ...card, x: Math.max(0, newX), y: Math.max(0, newY) }
            : card
        )
      )
    }
  }, [isDragging, draggedCard, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setDraggedCard(null)
    
    // Restore text selection
    document.body.style.userSelect = ''
    ;(document.body.style as ExtendedCSSStyleDeclaration).webkitUserSelect = ''
    ;(document.body.style as ExtendedCSSStyleDeclaration).mozUserSelect = ''
    ;(document.body.style as ExtendedCSSStyleDeclaration).msUserSelect = ''
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Chat functionality
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date(),
        avatar: 'Y'
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getCardIcon = (type: Card['type']) => {
    switch (type) {
      case 'destination': return <MapPin className="h-5 w-5" />
      case 'accommodation': return <Hotel className="h-5 w-5" />
      case 'activity': return <Camera className="h-5 w-5" />
      case 'restaurant': return <Utensils className="h-5 w-5" />
      case 'transport': return <Plane className="h-5 w-5" />
      default: return <MapPin className="h-5 w-5" />
    }
  }

  const getCardColor = (type: Card['type']) => {
    switch (type) {
      case 'destination': return 'bg-teal-500'
      case 'accommodation': return 'bg-teal-600'
      case 'activity': return 'bg-teal-700'
      case 'restaurant': return 'bg-teal-800'
      case 'transport': return 'bg-teal-900'
      default: return 'bg-gray-500'
    }
  }

  const formatTimeAgo = (date: Date | string) => {
    // Ensure date is a Date object
    const dateObj = date instanceof Date ? date : new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  // Error boundary
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 overflow-hidden">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-xl text-gray-900 px-6 py-3 rounded-xl shadow-xl border border-white/20 max-w-sm"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                {notification}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Top Toolbar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Summer Beach Trip</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{collaborators.length} collaborators</span>
                <span>•</span>
                <span>Last updated {formatTimeAgo(cards[0]?.createdAt || new Date())}</span>
              </div>
              <div className="flex items-center space-x-1">
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.name}
                    className={`w-6 h-6 rounded-full ${collaborator.color} flex items-center justify-center relative`}
                    title={`${collaborator.name} ${collaborator.online ? '(online)' : '(offline)'}`}
                  >
                    <span className="text-white text-xs font-medium">
                      {collaborator.name.charAt(0)}
                    </span>
                    {collaborator.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
                    )}
                  </div>
                ))}
              </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="search-cards"
                name="search-cards"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <button 
              className={`p-2 rounded-lg transition-all ${showChat ? 'text-teal-600 bg-teal-50 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Keyboard shortcuts: Delete (delete card), Escape (deselect), Ctrl+N (add card), Ctrl+F (search)"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative overflow-hidden">
        {/* Canvas Area */}
        <div 
          ref={canvasRef}
          className="absolute inset-0 bg-white/60 backdrop-blur-sm select-none"
          style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        >
          {/* Cards */}
          {filteredCards.map((card) => (
                         <div
               key={card.id}
               className={`absolute transition-all duration-200 select-none ${
                 selectedCard === card.id ? 'ring-2 ring-teal-500 ring-offset-2' : ''
               } ${isDragging && draggedCard === card.id ? 'z-50' : ''}`}
               style={{ 
                 left: card.x, 
                 top: card.y,
                 width: card.width,
                 height: card.height
               }}
               onMouseDown={(e) => handleMouseDown(e, card.id)}
               onClick={() => handleCardClick(card.id)}
               onDoubleClick={() => handleStartEdit(card)}
             >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full h-full">
                <div className={`p-3 rounded-t-lg ${getCardColor(card.type)} text-white`}>
                  <div className="flex items-center justify-between">
                    {getCardIcon(card.type)}
                    <div className="flex items-center space-x-1">
                      {card.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm ml-1">{card.rating}</span>
                        </div>
                      )}
                      <div className="relative">
                        <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {selectedCard === card.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-32 z-50">
                            <button
                              onClick={() => handleStartEdit(card)}
                              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleCardDuplicate(card.id)}
                              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleCardDelete(card.id)}
                              className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  {editingCard === card.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        id={`edit-title-${card.id}`}
                        name={`edit-title-${card.id}`}
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Title"
                      />
                      <textarea
                        id={`edit-description-${card.id}`}
                        name={`edit-description-${card.id}`}
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Description"
                        rows={3}
                      />
                      <input
                        type="text"
                        id={`edit-location-${card.id}`}
                        name={`edit-location-${card.id}`}
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Location"
                      />
                      <input
                        type="text"
                        id={`edit-price-${card.id}`}
                        name={`edit-price-${card.id}`}
                        value={editForm.price || ''}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Price"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                      
                      <div className="space-y-1 text-xs text-gray-500">
                        {card.location && (
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {card.location}
                          </div>
                        )}
                        {card.price && (
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {card.price}
                          </div>
                        )}
                        <div className="flex items-center text-xs text-gray-400">
                          <span>By {card.createdBy}</span>
                          <span className="mx-1">•</span>
                          <span>{formatTimeAgo(card.createdAt || new Date())}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
            >
              <Plus className="h-6 w-6" />
            </button>
            
            {showAddMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-2 min-w-48">
                <div className="text-xs font-medium text-gray-500 px-3 py-2">Add to board</div>
                <button
                  onClick={() => handleAddCard('destination')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <MapPin className="h-4 w-4 mr-3 text-teal-500" />
                  Destination
                </button>
                <button
                  onClick={() => handleAddCard('accommodation')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <Hotel className="h-4 w-4 mr-3 text-teal-600" />
                  Accommodation
                </button>
                <button
                  onClick={() => handleAddCard('activity')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <Camera className="h-4 w-4 mr-3 text-teal-700" />
                  Activity
                </button>
                <button
                  onClick={() => handleAddCard('restaurant')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <Utensils className="h-4 w-4 mr-3 text-teal-800" />
                  Restaurant
                </button>
                <button
                  onClick={() => handleAddCard('transport')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <Plane className="h-4 w-4 mr-3 text-teal-900" />
                  Transport
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel - Chat & AI Assistant */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-white/20 flex-shrink-0 shadow-sm" style={{ height: '200px' }}>
        <div className="flex h-full">
          {/* Chat Panel */}
          {showChat && (
            <div className="flex-1 border-r border-gray-100 flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <h3 className="font-semibold text-gray-900">Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 p-3 overflow-y-auto">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-medium">{message.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
                            <p className="text-sm text-gray-900 font-normal leading-relaxed">{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            {message.sender} • {formatTimeAgo(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100 flex-shrink-0">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="chat-message"
                      name="chat-message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-sm"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* AI Assistant Panel */}
          {showAI && (
            <div className={`${showChat ? 'w-72' : 'flex-1'} flex flex-col`}>
              <div className="p-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                <button
                  onClick={() => setShowAI(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`rounded-lg p-2 ${
                        suggestion.type === 'suggestion' ? 'bg-teal-50' :
                        suggestion.type === 'alert' ? 'bg-orange-50' :
                        'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            suggestion.type === 'suggestion' ? 'text-teal-900' :
                            suggestion.type === 'alert' ? 'text-orange-900' :
                            'text-blue-900'
                          }`}>
                            {suggestion.title}
                          </p>
                          <p className={`text-sm mt-1 ${
                            suggestion.type === 'suggestion' ? 'text-teal-700' :
                            suggestion.type === 'alert' ? 'text-orange-700' :
                            'text-blue-700'
                          }`}>
                            {suggestion.message}
                          </p>
                        </div>
                        {suggestion.action && (
                          <button 
                            onClick={() => handleAIAction(suggestion.id, suggestion.action!)}
                            className="ml-2 px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 flex-shrink-0"
                          >
                            {suggestion.action}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 