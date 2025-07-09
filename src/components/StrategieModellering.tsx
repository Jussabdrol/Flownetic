'use client'

import { useState } from 'react'
import { Plus, Target, TrendingUp, BarChart3, AlertCircle, X, Trash2 } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  ctqFactors: string[]
  status: string
}

interface KPI {
  name: string
  target: string
  ctqFactor: string
}

export default function StrategieModellering() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [services, setServices] = useState<Service[]>([
    {
      id: 'klantonboarding',
      name: 'Klantonboarding',
      description: 'Complete onboarding van nieuwe klanten',
      ctqFactors: ['Snelheid', 'Accuraatheid', 'Klanttevredenheid'],
      status: 'Actief'
    },
    {
      id: 'factuurverwerking',
      name: 'Factuurverwerking',
      description: 'Geautomatiseerde factuurverwerking',
      ctqFactors: ['Doorlooptijd', 'Foutpercentage', 'Compliance'],
      status: 'In Ontwikkeling'
    }
  ])

  const handleNewService = (newService: Omit<Service, 'id'>, newKpis: KPI[]) => {
    const serviceId = newService.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    const serviceWithId = {
      ...newService,
      id: serviceId
    }
    
    setServices([...services, serviceWithId])
    
    // Note: In een echte applicatie zou je hier ook de KPI's opslaan
    // Voor nu voegen we ze toe aan de bestaande kpis array
    console.log('Nieuwe KPIs:', newKpis)
  }

  const kpis = [
    {
      name: 'Gemiddelde Onboarding Tijd',
      current: '2.3 dagen',
      target: '2.0 dagen',
      trend: 'stable',
      ctqFactor: 'Snelheid'
    },
    {
      name: 'Klanttevredenheid Score',
      current: '8.7/10',
      target: '9.0/10',
      trend: 'up',
      ctqFactor: 'Klanttevredenheid'
    },
    {
      name: 'Data Accuraatheid',
      current: '96%',
      target: '98%',
      trend: 'down',
      ctqFactor: 'Accuraatheid'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header met actie knoppen */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">
            Diensten & CTQ Flowdowns
          </h3>
          <p className="text-secondary-600 mt-1">
            Koppel Critical-to-Quality factoren aan KPI's
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe Dienst
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diensten Lijst */}
        <div className="lg:col-span-1">
          <div className="card">
            <h4 className="font-semibold text-secondary-900 mb-4">Diensten</h4>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-secondary-900">
                        {service.name}
                      </h5>
                      <p className="text-sm text-secondary-600 mt-1">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.ctqFactors.map((factor, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-secondary-100 text-secondary-700 rounded"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      service.status === 'Actief'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTQ Flowdown */}
        <div className="lg:col-span-2">
          {selectedService ? (
            <div className="space-y-6">
              {/* CTQ Diagram */}
              <div className="card">
                <h4 className="font-semibold text-secondary-900 mb-4">
                  CTQ Flowdown - {services.find(s => s.id === selectedService)?.name}
                </h4>
                <div className="bg-secondary-50 rounded-lg p-6">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary-100 rounded-lg flex items-center justify-center mb-2">
                        <Target className="h-8 w-8 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-secondary-900">Dienst</span>
                    </div>
                    <div className="flex-1 h-px bg-secondary-300"></div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
                        <AlertCircle className="h-8 w-8 text-yellow-600" />
                      </div>
                      <span className="text-sm font-medium text-secondary-900">CTQ Factoren</span>
                    </div>
                    <div className="flex-1 h-px bg-secondary-300"></div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-secondary-900">KPI's</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI Monitoring */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-secondary-900">
                    KPI Monitoring
                  </h4>
                  <button className="btn-secondary">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Rapport Genereren
                  </button>
                </div>
                <div className="space-y-4">
                  {kpis.map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-secondary-900">{kpi.name}</h5>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {kpi.ctqFactor}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-secondary-600">
                            Huidig: <span className="font-medium">{kpi.current}</span>
                          </span>
                          <span className="text-sm text-secondary-600">
                            Doel: <span className="font-medium">{kpi.target}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded ${
                          kpi.trend === 'up' ? 'bg-green-100' :
                          kpi.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          <TrendingUp className={`h-4 w-4 ${
                            kpi.trend === 'up' ? 'text-green-600' :
                            kpi.trend === 'down' ? 'text-red-600 rotate-180' : 'text-gray-600'
                          }`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">
                  Selecteer een dienst om de CTQ flowdown en KPI's te bekijken
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal voor Nieuwe Dienst */}
      {showModal && <NewServiceModal onClose={() => setShowModal(false)} onSubmit={handleNewService} />}
    </div>
  )
}

// Modal Component voor Nieuwe Dienst
interface NewServiceModalProps {
  onClose: () => void
  onSubmit: (service: Omit<Service, 'id'>, kpis: KPI[]) => void
}

function NewServiceModal({ onClose, onSubmit }: NewServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Actief'
  })
  const [ctqFactors, setCtqFactors] = useState<string[]>([''])
  const [kpis, setKpis] = useState<KPI[]>([{ name: '', target: '', ctqFactor: '' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validatie
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Naam en beschrijving zijn verplicht')
      return
    }

    const validCtqFactors = ctqFactors.filter(factor => factor.trim() !== '')
    const validKpis = kpis.filter(kpi => kpi.name.trim() !== '' && kpi.target.trim() !== '' && kpi.ctqFactor.trim() !== '')

    if (validCtqFactors.length === 0) {
      alert('Minimaal één CTQ factor is verplicht')
      return
    }

    onSubmit(
      {
        name: formData.name,
        description: formData.description,
        ctqFactors: validCtqFactors,
        status: formData.status
      },
      validKpis
    )
    onClose()
  }

  const addCtqFactor = () => {
    setCtqFactors([...ctqFactors, ''])
  }

  const removeCtqFactor = (index: number) => {
    if (ctqFactors.length > 1) {
      setCtqFactors(ctqFactors.filter((_, i) => i !== index))
    }
  }

  const updateCtqFactor = (index: number, value: string) => {
    const updated = [...ctqFactors]
    updated[index] = value
    setCtqFactors(updated)
  }

  const addKpi = () => {
    setKpis([...kpis, { name: '', target: '', ctqFactor: '' }])
  }

  const removeKpi = (index: number) => {
    if (kpis.length > 1) {
      setKpis(kpis.filter((_, i) => i !== index))
    }
  }

  const updateKpi = (index: number, field: keyof KPI, value: string) => {
    const updated = [...kpis]
    updated[index] = { ...updated[index], [field]: value }
    setKpis(updated)
  }

  const platformRoutes = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Proces Modeling', path: '/proces-modeling' },
    { name: 'Case Management', path: '/case-management' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-secondary-900">Nieuwe Dienst Toevoegen</h2>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basis Informatie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Dienst Naam *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijv. Klantondersteuning"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Actief">Actief</option>
                  <option value="In Ontwikkeling">In Ontwikkeling</option>
                  <option value="Inactief">Inactief</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Beschrijving *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="Beschrijf de dienst en haar doelstellingen"
                required
              />
            </div>

            {/* CTQ Factoren */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-secondary-700">
                  Critical-to-Quality (CTQ) Factoren *
                </label>
                <button
                  type="button"
                  onClick={addCtqFactor}
                  className="btn-secondary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  CTQ Toevoegen
                </button>
              </div>
              <div className="space-y-2">
                {ctqFactors.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={factor}
                      onChange={(e) => updateCtqFactor(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Bijv. Snelheid, Accuraatheid, Kwaliteit"
                    />
                    {ctqFactors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCtqFactor(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* KPI's */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-secondary-700">
                  Key Performance Indicators (KPI's)
                </label>
                <button
                  type="button"
                  onClick={addKpi}
                  className="btn-secondary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  KPI Toevoegen
                </button>
              </div>
              <div className="space-y-3">
                {kpis.map((kpi, index) => (
                  <div key={index} className="border border-secondary-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-secondary-600 mb-1">
                          KPI Naam
                        </label>
                        <input
                          type="text"
                          value={kpi.name}
                          onChange={(e) => updateKpi(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Bijv. Response tijd"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary-600 mb-1">
                          Doel Waarde
                        </label>
                        <input
                          type="text"
                          value={kpi.target}
                          onChange={(e) => updateKpi(index, 'target', e.target.value)}
                          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Bijv. < 2 uren"
                        />
                      </div>
                      <div className="flex items-end space-x-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-secondary-600 mb-1">
                            Gekoppelde CTQ
                          </label>
                          <select
                            value={kpi.ctqFactor}
                            onChange={(e) => updateKpi(index, 'ctqFactor', e.target.value)}
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">Selecteer CTQ</option>
                            {ctqFactors.filter(factor => factor.trim() !== '').map((factor, factorIndex) => (
                              <option key={factorIndex} value={factor}>{factor}</option>
                            ))}
                          </select>
                        </div>
                        {kpis.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKpi(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigatie Links */}
          <div className="mt-8 pt-6 border-t border-secondary-200">
            <h3 className="text-sm font-medium text-secondary-700 mb-3">Gerelateerde Modules</h3>
            <div className="flex flex-wrap gap-2">
              {platformRoutes.map((route) => (
                <a
                  key={route.name}
                  href={route.path}
                  className="inline-flex items-center px-3 py-1 text-sm bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                >
                  {route.name}
                  <TrendingUp className="h-3 w-3 ml-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-secondary-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Dienst Toevoegen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
