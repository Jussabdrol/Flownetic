'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: string
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = 'max-w-2xl'
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`relative bg-white rounded-xl shadow-lg ${maxWidth} w-full`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <h3 className="text-lg font-semibold text-secondary-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-secondary-200">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}