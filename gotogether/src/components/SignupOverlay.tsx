'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, X } from 'lucide-react'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import DatePicker from './DatePicker'

interface SignupOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (userData: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string; birthDate: string }) => void
}

export default function SignupOverlay({ isOpen, onClose, onSuccess }: SignupOverlayProps) {
  const { signUp } = useSupabaseAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDateSelect = (date: string) => {
    setFormData({
      ...formData,
      birthDate: date
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }
    
    try {
      // Sign up the user
      const { error, message } = await signUp(formData.email, formData.password, formData.firstName, formData.lastName)
      
      if (error) {
        console.error('Signup error:', error)
        setError(error.message || 'Failed to create account')
      } else {
        setSuccess(message || 'Account created successfully! Please check your email to confirm your account.')
        onSuccess?.(formData)
        
        // Reset form and close after delay
        setTimeout(() => {
          onClose()
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: ''
          })
        }, 2000)
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             {/* Backdrop */}
       <div 
         className="absolute inset-0 bg-black/50 backdrop-blur-md"
         onClick={onClose}
       />
       
       {/* Overlay Content */}
       <div 
         className="relative w-full max-w-md bg-black/20 backdrop-blur-lg rounded-3xl shadow-md border border-white/20"
         style={{
           backdropFilter: 'blur(8px) saturate(110%)',
           WebkitBackdropFilter: 'blur(8px) saturate(110%)',
           backgroundColor: 'rgba(0, 0, 0, 0.2)',
           border: '1px solid rgba(255, 255, 255, 0.3)',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
         }}
       >
         {/* Close Button */}
         <button
           onClick={onClose}
           className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
         >
           <X className="h-5 w-5" />
         </button>

         {/* Header */}
         <div className="text-center pt-8 pb-6 px-8">
           <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
             Join GoTogether
           </h2>
           <p className="text-white/80 text-sm" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
             Create your account to start planning together 
           </p>
         </div>
         
         {/* Form */}
         <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
           {error && (
             <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
               <p className="text-sm text-red-300">{error}</p>
             </div>
           )}
           
           {success && (
             <div className="p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
               <p className="text-sm text-green-300">{success}</p>
             </div>
           )}
           <div className="grid grid-cols-2 gap-3">
             <div>
               <label htmlFor="firstName" className="block text-xs font-medium text-white/90 mb-1">
                 First name
               </label>
               <div className="relative">
                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                 <input
                   id="firstName"
                   name="firstName"
                   type="text"
                   autoComplete="given-name"
                   required
                   value={formData.firstName}
                   onChange={handleChange}
                   className="w-full pl-9 pr-3 py-2.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-white placeholder-white/50 transition-all duration-200 text-sm bg-white/10 backdrop-blur-sm"
                   placeholder="First name"
                 />
               </div>
             </div>
             
             <div>
               <label htmlFor="lastName" className="block text-xs font-medium text-white/90 mb-1">
                 Last name
               </label>
               <div className="relative">
                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                 <input
                   id="lastName"
                   name="lastName"
                   type="text"
                   autoComplete="family-name"
                   required
                   value={formData.lastName}
                   onChange={handleChange}
                   className="w-full pl-9 pr-3 py-2.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-white placeholder-white/50 transition-all duration-200 text-sm bg-white/10 backdrop-blur-sm"
                   placeholder="Last name"
                 />
               </div>
             </div>
           </div>
           
           <div>
             <label htmlFor="email" className="block text-xs font-medium text-white/90 mb-1">
               Email address
             </label>
             <div className="relative">
               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
               <input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 className="w-full pl-9 pr-3 py-2.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-white placeholder-white/50 transition-all duration-200 text-sm bg-white/10 backdrop-blur-sm"
                 placeholder="Enter your email"
               />
             </div>
           </div>
           
                       <div>
              <label htmlFor="birthDate" className="block text-xs font-medium text-white/90 mb-1">
                Birth date
              </label>
                             <DatePicker
                 value={formData.birthDate}
                 onChange={handleDateSelect}
                 placeholder="Select your birth date"
                 className="w-full"
                 variant="glass"
               />
            </div>
           
           <div>
             <label htmlFor="password" className="block text-xs font-medium text-white/90 mb-1">
               Password
             </label>
             <div className="relative">
               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
               <input
                 id="password"
                 name="password"
                 type={showPassword ? 'text' : 'password'}
                 autoComplete="new-password"
                 required
                 value={formData.password}
                 onChange={handleChange}
                 className="w-full pl-9 pr-9 py-2.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-white placeholder-white/50 transition-all duration-200 text-sm bg-white/10 backdrop-blur-sm"
                 placeholder="Create a password"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
               >
                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
               </button>
             </div>
           </div>
           
           <div>
             <label htmlFor="confirmPassword" className="block text-xs font-medium text-white/90 mb-1">
               Confirm password
             </label>
             <div className="relative">
               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
               <input
                 id="confirmPassword"
                 name="confirmPassword"
                 type={showConfirmPassword ? 'text' : 'password'}
                 autoComplete="new-password"
                 required
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 className="w-full pl-9 pr-9 py-2.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-white placeholder-white/50 transition-all duration-200 text-sm bg-white/10 backdrop-blur-sm"
                 placeholder="Confirm your password"
               />
               <button
                 type="button"
                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
               >
                 {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
               </button>
             </div>
           </div>

           <div className="flex items-start pt-2">
             <input
               id="terms"
               name="terms"
               type="checkbox"
               required
               className="h-4 w-4 text-teal-400 focus:ring-teal-400 border-white/30 rounded mt-0.5 bg-white/10"
             />
             <label htmlFor="terms" className="ml-2 block text-xs text-white/80">
               I agree to the{' '}
               <a href="#" className="text-teal-300 hover:text-teal-200 font-medium">
                 Terms of Service
               </a>{' '}
               and{' '}
               <a href="#" className="text-teal-300 hover:text-teal-200 font-medium">
                 Privacy Policy
               </a>
             </label>
           </div>

           <button
             type="submit"
             disabled={isLoading}
             className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-500 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
             style={{
               background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
               boxShadow: '0 8px 25px rgba(13, 148, 136, 0.3), 0 2px 8px rgba(13, 148, 136, 0.2)',
               border: '1px solid rgba(255, 255, 255, 0.1)'
             }}
           >
             {isLoading ? 'Creating account...' : 'Create account'}
           </button>

           <div className="text-center pt-2">
             <p className="text-xs text-white/70">
               Already have an account?{' '}
               <button 
                 type="button"
                 className="font-medium text-teal-300 hover:text-teal-200 transition-colors"
                 onClick={() => {
                   // TODO: Switch to login overlay
                   onClose()
                 }}
               >
                 Sign in
               </button>
             </p>
                       </div>
          </form>
        </div>


      </div>
    )
  } 