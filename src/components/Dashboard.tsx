'use client'

import { BarChart3, TrendingUp, Target, Activity } from 'lucide-react'

export default function Dashboard() {
  const kpiData = [
    { 
      name: 'Actieve Processen', 
      value: '24', 
      change: '+12%', 
      trend: 'up',
      icon: Activity 
    },
    { 
      name: 'Lopende Cases', 
      value: '156', 
      change: '+8%', 
      trend: 'up',
      icon: Target 
    },
    { 
      name: 'Efficiency Score', 
      value: '87%', 
      change: '+3%', 
      trend: 'up',
      icon: TrendingUp 
    },
    { 
      name: 'Gemiddelde Doorlooptijd', 
      value: '4.2d', 
      change: '-15%', 
      trend: 'down',
      icon: BarChart3 
    },
  ]

  const recentActivities = [
    { 
      id: 1, 
      action: 'Nieuw proces aangemaakt', 
      process: 'Klantonboarding V2.0', 
      user: 'Jan Bakker', 
      time: '2 uur geleden' 
    },
    { 
      id: 2, 
      action: 'Case voltooid', 
      process: 'Factuurverwerking', 
      user: 'Marie de Vries', 
      time: '4 uur geleden' 
    },
    { 
      id: 3, 
      action: 'KPI threshold bereikt', 
      process: 'Customer Support', 
      user: 'Systeem', 
      time: '6 uur geleden' 
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">
                    {kpi.name}
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 mt-2">
                    {kpi.value}
                  </p>
                  <p className={`text-sm mt-1 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change} vs vorige maand
                  </p>
                </div>
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recente Activiteiten */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Recente Activiteiten
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary-50">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-secondary-600">
                    {activity.process} • {activity.user}
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proces Overzicht */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Proces Status Overzicht
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-600">In Ontwikkeling</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-secondary-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
                <span className="text-sm font-medium text-secondary-900">8</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-600">Actief</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-secondary-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
                <span className="text-sm font-medium text-secondary-900">16</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-600">Review</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-secondary-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
                <span className="text-sm font-medium text-secondary-900">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
