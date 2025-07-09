'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  GitBranch, 
  FolderKanban, 
  TrendingUp,
  Users,
  Settings,
  Home
} from 'lucide-react'
import StrategieModellering from '@/components/StrategieModellering'
import ProcesModeling from '@/components/ProcesModeling'
import CaseManagement from '@/components/CaseManagement'
import Dashboard from '@/components/Dashboard'

type TabType = 'dashboard' | 'strategie' | 'proces' | 'cases'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const navigation = [
    { 
      id: 'dashboard' as TabType, 
      name: 'Dashboard', 
      icon: Home,
      description: 'Overzicht van alle processen'
    },
    { 
      id: 'strategie' as TabType, 
      name: 'Strategie Modellering', 
      icon: TrendingUp,
      description: 'CTQ flowdowns en KPI monitoring'
    },
    { 
      id: 'proces' as TabType, 
      name: 'Proces Modeling', 
      icon: GitBranch,
      description: 'SIPOC/Swimlane diagrammen en checklists'
    },
    { 
      id: 'cases' as TabType, 
      name: 'Case Management', 
      icon: FolderKanban,
      description: 'Process templates en planning'
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'strategie':
        return <StrategieModellering />
      case 'proces':
        return <ProcesModeling />
      case 'cases':
        return <CaseManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-secondary-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r border-secondary-200">
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">
                Procesmanagement
              </h1>
              <p className="text-sm text-secondary-600">
                Bedrijfsprocessen beheersen
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-secondary-500 mt-1">
                    {item.description}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 w-80 p-4 border-t border-secondary-200">
          <div className="flex items-center space-x-3 text-secondary-600">
            <Users className="h-5 w-5" />
            <span className="text-sm">Organisatie Beheer</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-secondary-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">
                {navigation.find(nav => nav.id === activeTab)?.name}
              </h2>
              <p className="text-secondary-600 mt-1">
                {navigation.find(nav => nav.id === activeTab)?.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <Settings className="h-4 w-4 mr-2" />
                Instellingen
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
