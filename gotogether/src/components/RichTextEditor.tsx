'use client'

import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Quote, Link, Undo, Redo } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className = '' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const formatText = (command: string) => {
    execCommand(command)
  }

  const insertList = (ordered: boolean) => {
    execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList')
  }

  const insertQuote = () => {
    execCommand('formatBlock', '<blockquote>')
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const canUndo = () => document.queryCommandSupported('undo')
  const canRedo = () => document.queryCommandSupported('redo')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      execCommand('insertLineBreak')
    }
  }

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => formatText('bold')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => formatText('italic')}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => insertList(false)}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => insertList(true)}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          onClick={insertQuote}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={insertLink}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => execCommand('undo')}
          disabled={!canUndo()}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          onClick={() => execCommand('redo')}
          disabled={!canRedo()}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className={`p-3 min-h-[100px] max-h-[200px] overflow-y-auto focus:outline-none ${
          isFocused ? 'ring-2 ring-teal-500 ring-opacity-50' : ''
        }`}
        style={{
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
        data-placeholder={placeholder}
      />
    </div>
  )
}

// CSS for placeholder
const style = document.createElement('style')
style.textContent = `
  [contenteditable][data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
    position: absolute;
  }
`
document.head.appendChild(style) 