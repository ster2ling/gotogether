'use client'

import React, { useState, useRef, useEffect } from 'react'
import { WhiteboardNote } from '@/types/node'
import { 
  X, 
  Plus, 
  Palette, 
  Trash2, 
  Move, 
  Type, 
  StickyNote,
  Lightbulb,
  AlertCircle
} from 'lucide-react'

interface WhiteboardDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNoteDrop: (note: WhiteboardNote) => void
}

const WhiteboardDrawer: React.FC<WhiteboardDrawerProps> = ({
  isOpen,
  onClose,
  onNoteDrop
}) => {
  const [notes, setNotes] = useState<WhiteboardNote[]>([])
  const [selectedColor, setSelectedColor] = useState('#fbbf24')
  const [selectedType, setSelectedType] = useState<WhiteboardNote['type']>('note')
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const whiteboardRef = useRef<HTMLDivElement>(null)

  const colors = [
    '#fbbf24', // yellow
    '#f97316', // orange
    '#ef4444', // red
    '#ec4899', // pink
    '#a855f7', // purple
    '#3b82f6', // blue
    '#06b6d4', // cyan
    '#10b981', // green
    '#84cc16', // lime
    '#f59e0b'  // amber
  ]

  const noteTypes = [
    { type: 'note' as const, icon: StickyNote, label: 'Note', color: '#fbbf24' },
    { type: 'idea' as const, icon: Lightbulb, label: 'Idea', color: '#f97316' },
    { type: 'reminder' as const, icon: AlertCircle, label: 'Reminder', color: '#ef4444' }
  ]

  const addNote = () => {
    const newNote: WhiteboardNote = {
      id: Date.now().toString(),
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      content: 'Click to edit...',
      color: selectedColor,
      type: selectedType
    }
    setNotes(prev => [...prev, newNote])
  }

  const updateNote = (id: string, updates: Partial<WhiteboardNote>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ))
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    e.preventDefault()
    setIsDragging(true)
    
    const note = notes.find(n => n.id === noteId)
    if (note) {
      setDragOffset({
        x: e.clientX - note.x,
        y: e.clientY - note.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const rect = whiteboardRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left - dragOffset.x
    const y = e.clientY - rect.top - dragOffset.y
    
    // Update the note being dragged
    const draggedNote = notes.find(n => n.isDragging)
    if (draggedNote) {
      updateNote(draggedNote.id, { x, y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setNotes(prev => prev.map(note => ({ ...note, isDragging: false })))
  }

  const handleNoteContentChange = (id: string, content: string) => {
    updateNote(id, { content })
  }

  const handleNoteDoubleClick = (note: WhiteboardNote) => {
    onNoteDrop(note)
    deleteNote(note.id)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Whiteboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-4">
            {/* Note Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note Type
              </label>
              <div className="flex space-x-2">
                {noteTypes.map(({ type, icon: Icon, label, color }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors
                      ${selectedType === type 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all
                      ${selectedColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Add Note Button */}
            <button
              onClick={addNote}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Note</span>
            </button>
          </div>
        </div>

        {/* Whiteboard Canvas */}
        <div 
          ref={whiteboardRef}
          className="flex-1 p-4 bg-gray-50 overflow-hidden relative"
          style={{ height: 'calc(100vh - 200px)' }}
        >
          <div className="relative w-full h-full bg-white rounded-lg border-2 border-dashed border-gray-300">
            {notes.map((note) => (
              <div
                key={note.id}
                className="absolute cursor-move select-none"
                style={{
                  left: note.x,
                  top: note.y,
                  backgroundColor: note.color,
                  opacity: note.isDragging ? 0.8 : 1
                }}
                onMouseDown={(e) => handleMouseDown(e, note.id)}
                onDoubleClick={() => handleNoteDoubleClick(note)}
              >
                <div className="p-2 rounded-lg shadow-md min-w-32 max-w-48">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1">
                      {(() => {
                        const noteType = noteTypes.find(t => t.type === note.type)
                        const IconComponent = noteType?.icon
                        return IconComponent ? <IconComponent className="h-3 w-3 text-white" /> : null
                      })()}
                      <span className="text-xs text-white font-medium capitalize">
                        {note.type}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <Trash2 className="h-3 w-3 text-white" />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={note.content}
                    onChange={(e) => handleNoteContentChange(note.id, e.target.value)}
                    className="w-full bg-transparent text-white text-sm placeholder-white/70 border-none outline-none"
                    placeholder="Click to edit..."
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gray-100 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            💡 Double-click notes to drop them onto the map
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhiteboardDrawer
