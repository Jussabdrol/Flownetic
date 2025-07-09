'use client'

import { 
  BarChart3, 
  TrendingUp, 
  GitBranch, 
  FolderKanban, 
  ArrowRight,
  CheckCircle,
  Users,
  Zap
} from 'lucide-react'

export default function Welcome() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Strategie Modellering',
      description: 'CTQ flowdowns en KPI monitoring voor strategische doelen',
      benefits: ['Real-time KPI monitoring', 'Critical-to-Quality mapping', 'Strategische doelstellingen']
    },
    {
      icon: GitBranch,
      title: 'Proces Modeling',
      description: 'SIPOC/Swimlane diagrammen met geïntegreerde checklists',
      benefits: ['Visuele proceskaarten', 'Herbruikbare templates', 'Proceseisen beheer']
    },
    {
      icon: FolderKanban,
      title: 'Case Management',
      description: 'Template-based cases met voortgangsmonitoring',
      benefits: ['Automatische workflows', 'Progress tracking', 'Deadline beheer']
    }
  ]

  const quickStats = [
    { label: 'Actieve Processen', value: '24', icon: BarChart3 },
    { label: 'Lopende Cases', value: '156', icon: FolderKanban },
    { label: 'Team Leden', value: '12', icon: Users },
    { label: 'Efficiency Score', value: '87%', icon: Zap }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary-600 rounded-2xl">
            <BarChart3 className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          Welkom bij Procesmanagement
        </h1>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto mb-8">
          Uw professionele platform voor het beheersen van bedrijfsprocessen. 
          Strategieën ontwikkelen, processen optimaliseren en cases effectief managen.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <span>Aan de slag</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="btn-secondary">
            Meer informatie
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              <p className="text-sm text-secondary-600 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Features Overview */}
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 text-center mb-8">
          Hoofdfunctionaliteiten
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-secondary-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-secondary-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            Klaar om te beginnen?
          </h3>
          <p className="text-secondary-600 mb-6">
            Kies een module om direct aan de slag te gaan met uw procesmanagement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-secondary flex items-center justify-center space-x-2 p-4">
              <TrendingUp className="h-5 w-5" />
              <span>Strategie</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 p-4">
              <GitBranch className="h-5 w-5" />
              <span>Processen</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 p-4">
              <FolderKanban className="h-5 w-5" />
              <span>Cases</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}