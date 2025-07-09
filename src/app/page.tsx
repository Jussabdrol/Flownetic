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
import Welcome from '@/components/Welcome'
import StrategieModellering from '@/components/StrategieModellering'
import ProcesModeling from '@/components/ProcesModeling'
import CaseManagement from '@/components/CaseManagement'
import Dashboard from '@/components/Dashboard'

type TabType = 'welcome' | 'dashboard' | 'strategie' | 'proces' | 'cases'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('welcome')

  const navigation = [
    { 
      id: 'welcome' as TabType, 
      name: 'Welkom', 
      icon: Home,
      description: 'Overzicht van de applicatie'
    },
    { 
      id: 'dashboard' as TabType, 
      name: 'Dashboard', 
      icon: BarChart3,
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
      case 'welcome':
        return <Welcome />
      case 'dashboard':
        return <Dashboard />
      case 'strategie':
        return <StrategieModellering />
      case 'proces':
        return <ProcesModeling />
      case 'cases':
        return <CaseManagement />
      default:
        return <Welcome />
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col">
      {/* Header with Logo and Horizontal Navigation */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        {/* Top Header with Logo */}
        <div className="px-6 py-4 border-b border-secondary-100">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-secondary-600">
                <Users className="h-4 w-4" />
                <span className="text-sm">Organisatie Beheer</span>
              </div>
              <button className="btn-secondary">
                <Settings className="h-4 w-4 mr-2" />
                Instellingen
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav className="px-6">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              )
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Page Title */}
        {activeTab !== 'welcome' && (
          <div className="bg-white border-b border-secondary-200 px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">
                {navigation.find(nav => nav.id === activeTab)?.name}
              </h2>
              <p className="text-secondary-600 mt-1">
                {navigation.find(nav => nav.id === activeTab)?.description}
              </p>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
