'use client'

import { useState } from 'react'
import { Plus, Target, TrendingUp, BarChart3, AlertCircle } from 'lucide-react'

export default function StrategieModellering() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
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
  ]

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
        <button className="btn-primary">
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
    </div>
  )
}
