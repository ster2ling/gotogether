'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchSection from '@/components/SearchSection'
import BoardShowcase from '@/components/BoardShowcase'
import Features from '@/components/Features'
import SignupOverlay from '@/components/SignupOverlay'

export default function Home() {
  const { isAuthenticated, signup } = useAuth()
  const [showSignupOverlay, setShowSignupOverlay] = useState(false)

  const handleSignupSuccess = (userData: { firstName: string; lastName: string; email: string }) => {
    signup({
      id: '1',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    })
  }

  const handleStartPlanning = () => {
    if (!isAuthenticated) {
      setShowSignupOverlay(true)
    } else {
      // TODO: Navigate to dashboard or search page
      window.location.href = '/search'
    }
  }

  const handleTestBypass = () => {
    signup({
      id: 'test-user',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gotogether.com'
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onSignupClick={() => setShowSignupOverlay(true)} />
      
      {/* Test Bypass Button - Only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 z-50">
          <button
            onClick={handleTestBypass}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors"
          >
            🧪 Test Login
          </button>
        </div>
      )}
      
      <Hero onStartPlanningClick={handleStartPlanning} />
      <BoardShowcase />
      <SearchSection />
      <Features />
      
      <SignupOverlay 
        isOpen={showSignupOverlay}
        onClose={() => setShowSignupOverlay(false)}
        onSuccess={handleSignupSuccess}
      />
    </main>
  )
}
