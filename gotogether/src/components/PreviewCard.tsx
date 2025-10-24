'use client'

import React, { useState, useRef, useEffect } from 'react'
import { TripNode } from '@/types/node'
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  Globe, 
  Edit3, 
  Trash2, 
  Expand,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface PreviewCardProps {
  node: TripNode
  isSelected: boolean
  onClick: () => void
  onUpdate: (node: TripNode) => void
  isCollaborating?: boolean
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  node,
  isSelected,
  onClick,
  onUpdate,
  isCollaborating = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(node.data)
  const cardRef = useRef<HTMLDivElement>(null)

  const getNodeTypeColor = (type: TripNode['type']) => {
    const colors = {
      lodging: 'bg-blue-500',
      activity: 'bg-green-500',
      flight: 'bg-purple-500',
      restaurant: 'bg-orange-500',
      chat: 'bg-pink-500',
      task: 'bg-yellow-500',
      note: 'bg-gray-500'
    }
    return colors[type] || colors.note
  }

  const getNodeTypeIcon = (type: TripNode['type']) => {
    const icons = {
      lodging: '🏨',
      activity: '🎯',
      flight: '✈️',
      restaurant: '🍽️',
      chat: '💬',
      task: '✅',
      note: '📝'
    }
    return icons[type] || icons.note
  }

  const handleSave = () => {
    onUpdate({
      ...node,
      data: editData
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    // This would typically be handled by the parent component
    console.log('Delete node:', node.id)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div
      ref={cardRef}
      className={`
        relative bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border-2 transition-all duration-300
        ${isSelected ? 'border-blue-500 shadow-2xl scale-105' : 'border-white/20 hover:border-blue-300'}
        ${isExpanded ? 'w-80' : 'w-64'}
        cursor-pointer group
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className={`p-4 ${isExpanded ? 'pb-2' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getNodeTypeIcon(node.type)}</span>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-2 py-1 border rounded text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  editData.title
                )}
              </h3>
              <div className="flex items-center space-x-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${getNodeTypeColor(node.type)}`} />
                <span className="text-xs text-gray-500 capitalize">{node.type}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Rating */}
        {editData.rating && (
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(editData.rating)}
            <span className="text-xs text-gray-500 ml-1">
              {editData.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {isEditing ? (
            <textarea
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full px-2 py-1 border rounded text-xs resize-none"
              rows={2}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            editData.description
          )}
        </p>

        {/* Price */}
        {editData.price !== undefined && (
          <div className="flex items-center space-x-1 mt-2">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              {editData.price === 0 ? 'Free' : `$${editData.price}`}
            </span>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="space-y-3 mt-3">
            {/* Address */}
            {editData.address && (
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-xs text-gray-600">{editData.address}</span>
              </div>
            )}

            {/* Phone */}
            {editData.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-600">{editData.phone}</span>
              </div>
            )}

            {/* Website */}
            {editData.website && (
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <a 
                  href={editData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Website
                </a>
              </div>
            )}

            {/* Time */}
            {editData.startTime && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-600">
                  {editData.startTime}
                  {editData.endTime && ` - ${editData.endTime}`}
                </span>
              </div>
            )}

            {/* Notes */}
            {editData.notes && (
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-600">{editData.notes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(!isEditing)
                  if (isEditing) {
                    handleSave()
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit3 className="h-4 w-4 text-gray-500" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete()
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>

            {/* Quick Actions */}
            {editData.actions && editData.actions.length > 0 && (
              <div className="flex items-center space-x-2">
                {editData.actions.slice(0, 2).map((action, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      action.action()
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collaboration Indicator */}
      {isCollaborating && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      )}
    </div>
  )
}

export default PreviewCard
