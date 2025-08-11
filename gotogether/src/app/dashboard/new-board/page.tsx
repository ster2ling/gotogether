'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Plus, 
  DollarSign,
  Waves,
  Mountain,
  Building2,
  Plane,
  Car,
  Sparkles,
  Check,
  Calendar,
  Users,
  Target
} from 'lucide-react'
import DateRangePicker from '@/components/DateRangePicker'

interface Template {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  features: string[]
}

const templates: Template[] = [
  {
    id: 'beach',
    name: 'Beach Vacation',
    description: 'Perfect for relaxing beach getaways',
    icon: <Waves className="h-8 w-8" />,
    color: 'bg-blue-500',
    gradient: 'from-cyan-400 to-blue-500',
    features: ['Accommodation', 'Activities', 'Restaurants', 'Transport']
  },
  {
    id: 'mountain',
    name: 'Mountain Adventure',
    description: 'For hiking and outdoor activities',
    icon: <Mountain className="h-8 w-8" />,
    color: 'bg-green-500',
    gradient: 'from-emerald-400 to-teal-500',
    features: ['Hiking Trails', 'Accommodation', 'Equipment', 'Safety']
  },
  {
    id: 'city',
    name: 'City Break',
    description: 'Urban exploration and culture',
    icon: <Building2 className="h-8 w-8" />,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-pink-500',
    features: ['Attractions', 'Hotels', 'Restaurants', 'Transport']
  },
  {
    id: 'roadtrip',
    name: 'Road Trip',
    description: 'Epic journeys by car',
    icon: <Car className="h-8 w-8" />,
    color: 'bg-orange-500',
    gradient: 'from-orange-400 to-red-500',
    features: ['Route Planning', 'Stops', 'Accommodation', 'Budget']
  },
  {
    id: 'international',
    name: 'International',
    description: 'Cross-border adventures',
    icon: <Plane className="h-8 w-8" />,
    color: 'bg-red-500',
    gradient: 'from-red-400 to-pink-500',
    features: ['Flights', 'Visa', 'Accommodation', 'Activities']
  },
  {
    id: 'blank',
    name: 'Blank Board',
    description: 'Start from scratch',
    icon: <Plus className="h-8 w-8" />,
    color: 'bg-gray-500',
    gradient: 'from-gray-400 to-gray-500',
    features: ['Custom Planning', 'Flexible Structure', 'Your Way']
  }
]

export default function NewBoardPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    groupSize: '2'
  })
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateBoard = async () => {
    setIsCreating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false)
      router.push('/dashboard/board/1') // Redirect to the new board
    }, 2000)
  }

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 mr-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Create New Board</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 ? (
          /* Step 1: Choose Template */
          <div>
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose a Template</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select a template to get started with your planning. Each template comes with pre-configured sections tailored to your trip type.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="group bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:border-teal-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${template.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {template.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="space-y-2">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-500">
                        <Check className="h-3 w-3 text-teal-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Step 2: Board Details */
          <div>
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                {selectedTemplateData?.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Board Details</h2>
              <p className="text-lg text-gray-600">
                Fill in the details for your new <span className="font-semibold text-teal-600">{selectedTemplateData?.name}</span> planning board
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Board Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm transition-all"
                    placeholder="e.g., Summer Beach Trip"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      id="groupSize"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm transition-all"
                    >
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6+">6+ people</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="tripDates" className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Dates
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <DateRangePicker
                      startDate={formData.startDate}
                      endDate={formData.endDate}
                      onStartDateChange={(date) => setFormData({ ...formData, startDate: date })}
                      onEndDateChange={(date) => setFormData({ ...formData, endDate: date })}
                      placeholder="Select trip dates"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (optional)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 backdrop-blur-sm transition-all resize-none"
                    placeholder="Describe your trip plans, goals, and any special requirements..."
                  />
                </div>
              </div>

              {/* Template Features Preview */}
              {selectedTemplateData && (
                <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-teal-500" />
                    {selectedTemplateData.name} Features
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedTemplateData.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-teal-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Templates
                </button>
                
                <button
                  onClick={handleCreateBoard}
                  disabled={!formData.title || isCreating}
                  className="px-8 py-3 text-white rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center"
                  style={{
                    background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                    boxShadow: '0 8px 25px rgba(13, 148, 136, 0.3), 0 2px 8px rgba(13, 148, 136, 0.2)'
                  }}
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Board
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 