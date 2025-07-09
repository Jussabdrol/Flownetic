'use client'

import { useState, useEffect } from 'react'
import { Plus, X, TrendingUp, GitBranch, FolderKanban } from 'lucide-react'
import Modal from './Modal'

export interface Service {
  id: string
  name: string
  description: string
  ctqFactors: string[]
  status: 'Actief' | 'In Ontwikkeling' | 'Gestopt'
  kpis: KPI[]
}

export interface KPI {
  id: string
  name: string
  current: string
  target: string
  trend: 'up' | 'down' | 'stable'
  ctqFactor: string
}

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (service: Service) => void
  service?: Service | null
}

export default function ServiceModal({ isOpen, onClose, onSave, service }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Actief' as Service['status']
  })
  const [ctqFactors, setCTQFactors] = useState<string[]>([])
  const [kpis, setKPIs] = useState<KPI[]>([])
  const [newCTQ, setNewCTQ] = useState('')
  const [newKPI, setNewKPI] = useState({
    name: '',
    current: '',
    target: '',
    trend: 'stable' as KPI['trend'],
    ctqFactor: ''
  })

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        status: service.status
      })
      setCTQFactors([...service.ctqFactors])
      setKPIs([...service.kpis])
    } else {
      // Reset form for new service
      setFormData({
        name: '',
        description: '',
        status: 'Actief'
      })
      setCTQFactors([])
      setKPIs([])
    }
    setNewCTQ('')
    setNewKPI({
      name: '',
      current: '',
      target: '',
      trend: 'stable',
      ctqFactor: ''
    })
  }, [service, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Naam is verplicht')
      return
    }

    const newService: Service = {
      id: service?.id || `service-${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      ctqFactors: [...ctqFactors],
      status: formData.status,
      kpis: [...kpis]
    }

    onSave(newService)
    onClose()
  }

  const addCTQ = () => {
    if (newCTQ.trim() && !ctqFactors.includes(newCTQ.trim())) {
      setCTQFactors([...ctqFactors, newCTQ.trim()])
      setNewCTQ('')
    }
  }

  const removeCTQ = (index: number) => {
    const removedCTQ = ctqFactors[index]
    setCTQFactors(ctqFactors.filter((_, i) => i !== index))
    // Remove KPIs that reference this CTQ
    setKPIs(kpis.filter(kpi => kpi.ctqFactor !== removedCTQ))
  }

  const addKPI = () => {
    if (newKPI.name.trim() && newKPI.ctqFactor) {
      const kpi: KPI = {
        id: `kpi-${Date.now()}`,
        name: newKPI.name.trim(),
        current: newKPI.current.trim(),
        target: newKPI.target.trim(),
        trend: newKPI.trend,
        ctqFactor: newKPI.ctqFactor
      }
      setKPIs([...kpis, kpi])
      setNewKPI({
        name: '',
        current: '',
        target: '',
        trend: 'stable',
        ctqFactor: ''
      })
    }
  }

  const removeKPI = (id: string) => {
    setKPIs(kpis.filter(kpi => kpi.id !== id))
  }

  const footer = (
    <div className="flex justify-between items-center">
      {/* Navigation Links */}
      <div className="flex space-x-4 text-sm">
        <a href="/strategie" className="flex items-center space-x-1 text-primary-600 hover:text-primary-700">
          <TrendingUp className="h-4 w-4" />
          <span>Strategie</span>
        </a>
        <a href="/processen" className="flex items-center space-x-1 text-primary-600 hover:text-primary-700">
          <GitBranch className="h-4 w-4" />
          <span>Processen</span>
        </a>
        <a href="/cases" className="flex items-center space-x-1 text-primary-600 hover:text-primary-700">
          <FolderKanban className="h-4 w-4" />
          <span>Cases</span>
        </a>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Annuleren
        </button>
        <button
          type="submit"
          form="service-form"
          className="btn-primary"
        >
          {service ? 'Bijwerken' : 'Toevoegen'}
        </button>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service ? 'Dienst Bewerken' : 'Nieuwe Dienst'}
      footer={footer}
      maxWidth="max-w-4xl"
    >
      <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Naam *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Bijv. Klantonboarding"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Service['status'] })}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="Actief">Actief</option>
              <option value="In Ontwikkeling">In Ontwikkeling</option>
              <option value="Gestopt">Gestopt</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Beschrijving
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows={3}
            placeholder="Beschrijf de dienst..."
          />
        </div>

        {/* CTQ Factors */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Critical-to-Quality Factoren
          </label>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCTQ}
                onChange={(e) => setNewCTQ(e.target.value)}
                className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Nieuwe CTQ factor"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCTQ())}
              />
              <button
                type="button"
                onClick={addCTQ}
                className="btn-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {ctqFactors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ctqFactors.map((factor, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg"
                  >
                    <span>{factor}</span>
                    <button
                      type="button"
                      onClick={() => removeCTQ(index)}
                      className="text-secondary-500 hover:text-secondary-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KPIs */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Key Performance Indicators
          </label>
          
          {/* Add KPI Form */}
          <div className="bg-secondary-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <input
                type="text"
                value={newKPI.name}
                onChange={(e) => setNewKPI({ ...newKPI, name: e.target.value })}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm"
                placeholder="KPI naam"
              />
              <input
                type="text"
                value={newKPI.current}
                onChange={(e) => setNewKPI({ ...newKPI, current: e.target.value })}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm"
                placeholder="Huidige waarde"
              />
              <input
                type="text"
                value={newKPI.target}
                onChange={(e) => setNewKPI({ ...newKPI, target: e.target.value })}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm"
                placeholder="Doelwaarde"
              />
              <select
                value={newKPI.ctqFactor}
                onChange={(e) => setNewKPI({ ...newKPI, ctqFactor: e.target.value })}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm"
              >
                <option value="">Selecteer CTQ</option>
                {ctqFactors.map((factor) => (
                  <option key={factor} value={factor}>{factor}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addKPI}
                disabled={!newKPI.name || !newKPI.ctqFactor}
                className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* KPI List */}
          {kpis.length > 0 && (
            <div className="space-y-3">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-3 border border-secondary-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-secondary-900">{kpi.name}</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {kpi.ctqFactor}
                      </span>
                    </div>
                    <div className="text-sm text-secondary-600 mt-1">
                      Huidig: {kpi.current} | Doel: {kpi.target}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeKPI(kpi.id)}
                    className="text-secondary-500 hover:text-red-600 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </Modal>
  )
}