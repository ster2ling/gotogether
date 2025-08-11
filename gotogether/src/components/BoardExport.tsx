'use client'

import { useState } from 'react'
import { Download, FileText, Settings, Check, X } from 'lucide-react'

interface BoardExportProps {
  boardTitle: string
  cards: any[]
  isOpen: boolean
  onClose: () => void
}

export default function BoardExport({ boardTitle, cards, isOpen, onClose }: BoardExportProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'json'>('pdf')
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeChat, setIncludeChat] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    
    // Simulate export process
    setTimeout(() => {
      setExporting(false)
      // In a real implementation, this would generate and download the file
      console.log('Exporting board:', { boardTitle, cards, exportFormat, includeDetails, includeChat })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Export Board</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Export &quot;{boardTitle}&quot; for offline use</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'json')}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-red-500" />
                  <div>
                    <div className="font-medium text-gray-900">PDF Document</div>
                    <div className="text-sm text-gray-500">Printable format with all details</div>
                  </div>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'json')}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-3 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">JSON Data</div>
                    <div className="text-sm text-gray-500">Raw data for backup or import</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Export Options */}
          {exportFormat === 'pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Include in Export
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeDetails}
                    onChange={(e) => setIncludeDetails(e.target.checked)}
                    className="mr-3 rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Card Details</div>
                    <div className="text-sm text-gray-500">Descriptions, prices, ratings, and metadata</div>
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeChat}
                    onChange={(e) => setIncludeChat(e.target.checked)}
                    className="mr-3 rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Chat History</div>
                    <div className="text-sm text-gray-500">Team discussions and comments</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Export Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Export Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• {cards.length} cards will be exported</div>
              <div>• Format: {exportFormat.toUpperCase()}</div>
              {exportFormat === 'pdf' && (
                <>
                  <div>• Details: {includeDetails ? 'Included' : 'Excluded'}</div>
                  <div>• Chat: {includeChat ? 'Included' : 'Excluded'}</div>
                </>
              )}
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {exporting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Export Board
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 