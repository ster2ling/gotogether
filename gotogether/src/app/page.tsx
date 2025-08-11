'use client'

import { useState } from 'react'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchSection from '@/components/SearchSection'
import BoardShowcase from '@/components/BoardShowcase'
import Features from '@/components/Features'
import SignupOverlay from '@/components/SignupOverlay'

export default function Home() {
  const { user, signUp } = useSupabaseAuth()
  const isAuthenticated = !!user
  const [showSignupOverlay, setShowSignupOverlay] = useState(false)

  const handleSignupSuccess = async (userData: { firstName: string; lastName: string; email: string }) => {
    await signUp(userData.email, 'password123', userData.firstName, userData.lastName)
  }

  const handleStartPlanning = () => {
    if (!isAuthenticated) {
      setShowSignupOverlay(true)
    } else {
      // TODO: Navigate to dashboard or search page
      window.location.href = '/search'
    }
  }

  const handleTestBypass = async () => {
    await signUp('test@gotogether.com', 'password123', 'Test', 'User')
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
