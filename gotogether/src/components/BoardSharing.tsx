'use client'

import { useState } from 'react'
import { Share2, Copy, Mail, Link as LinkIcon, Users, Lock, Globe, Check } from 'lucide-react'

interface BoardSharingProps {
  boardId: string
  boardTitle: string
  isOpen: boolean
  onClose: () => void
}

export default function BoardSharing({ boardId, boardTitle, isOpen, onClose }: BoardSharingProps) {
  const [shareType, setShareType] = useState<'link' | 'email'>('link')
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<'view' | 'edit'>('view')
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)

  const boardUrl = `${window.location.origin}/dashboard/board/${boardId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(boardUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleEmailShare = async () => {
    if (!email) return
    
    setSending(true)
    // Simulate sending email
    setTimeout(() => {
      setSending(false)
      setEmail('')
      // Show success message
    }, 2000)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleEmailShare()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Share Board</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Share &quot;{boardTitle}&quot; with your team</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Share Type Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setShareType('link')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                shareType === 'link'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Link
            </button>
            <button
              onClick={() => setShareType('email')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                shareType === 'email'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </button>
          </div>

          {shareType === 'link' ? (
            /* Link Sharing */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={boardUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-colors flex items-center"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="permission"
                      value="view"
                      checked={permission === 'view'}
                      onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Can view</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="permission"
                      value="edit"
                      checked={permission === 'edit'}
                      onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Can edit</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800">
                      Anyone with the link can {permission === 'view' ? 'view' : 'edit'} this board.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Email Sharing */
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="email-permission"
                      value="view"
                      checked={permission === 'view'}
                      onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Can view</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="email-permission"
                      value="edit"
                      checked={permission === 'edit'}
                      onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Can edit</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!email || sending}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
} 