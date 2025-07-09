'use client'

import { useState } from 'react'
import { Plus, Target, TrendingUp, BarChart3, AlertCircle, Edit, Trash2, X, Save, ExternalLink } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  ctqFactors: string[]
  status: 'Actief' | 'In Ontwikkeling' | 'Inactief'
}

interface KPI {
  id: string
  name: string
  current: string
  target: string
  trend: 'up' | 'down' | 'stable'
  ctqFactor: string
  serviceId: string
}

export default function StrategieModellering() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showKPIModal, setShowKPIModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null)

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

  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: '1',
      name: 'Gemiddelde Onboarding Tijd',
      current: '2.3 dagen',
      target: '2.0 dagen',
      trend: 'stable',
      ctqFactor: 'Snelheid',
      serviceId: 'klantonboarding'
    },
    {
      id: '2',
      name: 'Klanttevredenheid Score',
      current: '8.7/10',
      target: '9.0/10',
      trend: 'up',
      ctqFactor: 'Klanttevredenheid',
      serviceId: 'klantonboarding'
    },
    {
      id: '3',
      name: 'Data Accuraatheid',
      current: '96%',
      target: '98%',
      trend: 'down',
      ctqFactor: 'Accuraatheid',
      serviceId: 'klantonboarding'
    }
  ])

  // Form state for new/editing services
  const [serviceForm, setServiceForm] = useState<{
    name: string
    description: string
    ctqFactors: string[]
    status: 'Actief' | 'In Ontwikkeling' | 'Inactief'
  }>({
    name: '',
    description: '',
    ctqFactors: [''],
    status: 'Actief'
  })

  // Form state for new/editing KPIs  
  const [kpiForm, setKpiForm] = useState<{
    name: string
    current: string
    target: string
    trend: 'up' | 'down' | 'stable'
    ctqFactor: string
    serviceId: string
  }>({
    name: '',
    current: '',
    target: '',
    trend: 'stable',
    ctqFactor: '',
    serviceId: ''
  })

  const openServiceModal = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setServiceForm({
        name: service.name,
        description: service.description,
        ctqFactors: [...service.ctqFactors],
        status: service.status
      })
    } else {
      setEditingService(null)
      setServiceForm({
        name: '',
        description: '',
        ctqFactors: [''],
        status: 'Actief'
      })
    }
    setShowServiceModal(true)
  }

  const openKPIModal = (kpi?: KPI) => {
    if (kpi) {
      setEditingKPI(kpi)
      setKpiForm({
        name: kpi.name,
        current: kpi.current,
        target: kpi.target,
        trend: kpi.trend,
        ctqFactor: kpi.ctqFactor,
        serviceId: kpi.serviceId
      })
    } else {
      setEditingKPI(null)
      setKpiForm({
        name: '',
        current: '',
        target: '',
        trend: 'stable',
        ctqFactor: '',
        serviceId: selectedService || ''
      })
    }
    setShowKPIModal(true)
  }

  const saveService = () => {
    if (!serviceForm.name.trim()) return

    const serviceData = {
      name: serviceForm.name.trim(),
      description: serviceForm.description.trim(),
      ctqFactors: serviceForm.ctqFactors.filter(factor => factor.trim()),
      status: serviceForm.status
    }

    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { ...editingService, ...serviceData }
          : s
      ))
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...serviceData
      }
      setServices([...services, newService])
    }
    
    setShowServiceModal(false)
  }

  const deleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId))
    setKpis(kpis.filter(k => k.serviceId !== serviceId))
    if (selectedService === serviceId) {
      setSelectedService(null)
    }
  }

  const saveKPI = () => {
    if (!kpiForm.name.trim() || !kpiForm.serviceId) return

    const kpiData = {
      name: kpiForm.name.trim(),
      current: kpiForm.current.trim(),
      target: kpiForm.target.trim(),
      trend: kpiForm.trend,
      ctqFactor: kpiForm.ctqFactor.trim(),
      serviceId: kpiForm.serviceId
    }

    if (editingKPI) {
      setKpis(kpis.map(k => 
        k.id === editingKPI.id 
          ? { ...editingKPI, ...kpiData }
          : k
      ))
    } else {
      const newKPI: KPI = {
        id: Date.now().toString(),
        ...kpiData
      }
      setKpis([...kpis, newKPI])
    }
    
    setShowKPIModal(false)
  }

  const deleteKPI = (kpiId: string) => {
    setKpis(kpis.filter(k => k.id !== kpiId))
  }

  const addCTQFactor = () => {
    setServiceForm({
      ...serviceForm,
      ctqFactors: [...serviceForm.ctqFactors, '']
    })
  }

  const updateCTQFactor = (index: number, value: string) => {
    const newFactors = [...serviceForm.ctqFactors]
    newFactors[index] = value
    setServiceForm({
      ...serviceForm,
      ctqFactors: newFactors
    })
  }

  const removeCTQFactor = (index: number) => {
    setServiceForm({
      ...serviceForm,
      ctqFactors: serviceForm.ctqFactors.filter((_, i) => i !== index)
    })
  }

  const currentService = selectedService ? services.find(s => s.id === selectedService) : null
  const currentServiceKPIs = selectedService ? kpis.filter(k => k.serviceId === selectedService) : []

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
        <button 
          className="btn-primary"
          onClick={() => openServiceModal()}
        >
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
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-secondary-900">
                          {service.name}
                        </h5>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openServiceModal(service)
                          }}
                          className="p-1 text-secondary-400 hover:text-secondary-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteService(service.id)
                          }}
                          className="p-1 text-secondary-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
                        : service.status === 'In Ontwikkeling'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
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
                  CTQ Flowdown - {currentService?.name}
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
                  <div className="flex space-x-2">
                    <button 
                      className="btn-secondary"
                      onClick={() => openKPIModal()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      KPI Toevoegen
                    </button>
                    <button className="btn-secondary">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Rapport Genereren
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {currentServiceKPIs.map((kpi) => (
                    <div key={kpi.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-secondary-900">{kpi.name}</h5>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {kpi.ctqFactor}
                          </span>
                          <button
                            onClick={() => openKPIModal(kpi)}
                            className="p-1 text-secondary-400 hover:text-secondary-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteKPI(kpi.id)}
                            className="p-1 text-secondary-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
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
                  {currentServiceKPIs.length === 0 && (
                    <div className="text-center py-8 text-secondary-500">
                      Nog geen KPI's gedefinieerd voor deze dienst
                    </div>
                  )}
                </div>
                
                {/* Platform Integration Links */}
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <h5 className="font-medium text-secondary-900 mb-3">Platform Integratie</h5>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      <span>Proces Modeling</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      <span>Case Management</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      <span>KPI Dashboard</span>
                    </button>
                  </div>
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

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {editingService ? 'Dienst Bewerken' : 'Nieuwe Dienst'}
                </h3>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="p-1 text-secondary-400 hover:text-secondary-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Dienst Naam
                  </label>
                  <input
                    type="text"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Bijv. Klantonboarding"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Beschrijving
                  </label>
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Korte beschrijving van de dienst"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Status
                  </label>
                  <select
                    value={serviceForm.status}
                    onChange={(e) => setServiceForm({...serviceForm, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Actief">Actief</option>
                    <option value="In Ontwikkeling">In Ontwikkeling</option>
                    <option value="Inactief">Inactief</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-secondary-700">
                      CTQ Factoren
                    </label>
                    <button
                      type="button"
                      onClick={addCTQFactor}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      + Toevoegen
                    </button>
                  </div>
                  <div className="space-y-2">
                    {serviceForm.ctqFactors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={factor}
                          onChange={(e) => updateCTQFactor(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="CTQ Factor"
                        />
                        {serviceForm.ctqFactors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCTQFactor(index)}
                            className="p-1 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 px-4 py-2 text-secondary-700 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors"
                >
                  Annuleren
                </button>
                <button
                  onClick={saveService}
                  disabled={!serviceForm.name.trim()}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  Opslaan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Modal */}
      {showKPIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {editingKPI ? 'KPI Bewerken' : 'Nieuwe KPI'}
                </h3>
                <button
                  onClick={() => setShowKPIModal(false)}
                  className="p-1 text-secondary-400 hover:text-secondary-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    KPI Naam
                  </label>
                  <input
                    type="text"
                    value={kpiForm.name}
                    onChange={(e) => setKpiForm({...kpiForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Bijv. Gemiddelde Onboarding Tijd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Dienst
                  </label>
                  <select
                    value={kpiForm.serviceId}
                    onChange={(e) => setKpiForm({...kpiForm, serviceId: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecteer dienst</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    CTQ Factor
                  </label>
                  <select
                    value={kpiForm.ctqFactor}
                    onChange={(e) => setKpiForm({...kpiForm, ctqFactor: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={!kpiForm.serviceId}
                  >
                    <option value="">Selecteer CTQ factor</option>
                    {kpiForm.serviceId && services.find(s => s.id === kpiForm.serviceId)?.ctqFactors.map((factor, index) => (
                      <option key={index} value={factor}>
                        {factor}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Huidige Waarde
                    </label>
                    <input
                      type="text"
                      value={kpiForm.current}
                      onChange={(e) => setKpiForm({...kpiForm, current: e.target.value})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="2.3 dagen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Doel Waarde
                    </label>
                    <input
                      type="text"
                      value={kpiForm.target}
                      onChange={(e) => setKpiForm({...kpiForm, target: e.target.value})}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="2.0 dagen"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Trend
                  </label>
                  <select
                    value={kpiForm.trend}
                    onChange={(e) => setKpiForm({...kpiForm, trend: e.target.value as any})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="up">Stijgend</option>
                    <option value="stable">Stabiel</option>
                    <option value="down">Dalend</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowKPIModal(false)}
                  className="flex-1 px-4 py-2 text-secondary-700 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors"
                >
                  Annuleren
                </button>
                <button
                  onClick={saveKPI}
                  disabled={!kpiForm.name.trim() || !kpiForm.serviceId}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  Opslaan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
