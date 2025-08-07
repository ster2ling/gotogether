'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  MapPin, 
  DollarSign,
  Waves,
  Mountain,
  Building2,
  Plane,
  Car,
  Train
} from 'lucide-react'
import DateRangePicker from '@/components/DateRangePicker'

interface Template {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const templates: Template[] = [
  {
    id: 'beach',
    name: 'Beach Vacation',
    description: 'Perfect for relaxing beach getaways',
    icon: <Waves className="h-8 w-8" />,
    color: 'bg-blue-500'
  },
  {
    id: 'mountain',
    name: 'Mountain Adventure',
    description: 'For hiking and outdoor activities',
    icon: <Mountain className="h-8 w-8" />,
    color: 'bg-green-500'
  },
  {
    id: 'city',
    name: 'City Break',
    description: 'Urban exploration and culture',
    icon: <Building2 className="h-8 w-8" />,
    color: 'bg-purple-500'
  },
  {
    id: 'roadtrip',
    name: 'Road Trip',
    description: 'Epic journeys by car',
    icon: <Car className="h-8 w-8" />,
    color: 'bg-orange-500'
  },
  {
    id: 'international',
    name: 'International',
    description: 'Cross-border adventures',
    icon: <Plane className="h-8 w-8" />,
    color: 'bg-red-500'
  },
  {
    id: 'blank',
    name: 'Blank Board',
    description: 'Start from scratch',
    icon: <Plus className="h-8 w-8" />,
    color: 'bg-gray-500'
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

  const handleCreateBoard = () => {
    // TODO: Create board in backend
    console.log('Creating board:', { selectedTemplate, formData })
    
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard/board/1') // Redirect to the new board
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Create New Board</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 ? (
          /* Step 1: Choose Template */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
              <p className="mt-2 text-gray-600">Select a template to get started with your planning</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className={`w-16 h-16 ${template.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                    {template.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Step 2: Board Details */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Board Details</h2>
              <p className="mt-2 text-gray-600">Fill in the details for your new planning board</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Summer Beach Trip"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                    <option value="6+">6+ people</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="tripDates" className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Dates
                  </label>
                  <DateRangePicker
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    onStartDateChange={(date) => setFormData({ ...formData, startDate: date })}
                    onEndDateChange={(date) => setFormData({ ...formData, endDate: date })}
                    placeholder="Select trip dates"
                  />
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
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your trip plans..."
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Back to Templates
                </button>
                
                <button
                  onClick={handleCreateBoard}
                  disabled={!formData.title}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Board
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 