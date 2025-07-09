'use client'

import { useState } from 'react'
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, User, Filter } from 'lucide-react'

export default function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const processTemplates = [
    { id: 'klantonboarding', name: 'Klantonboarding', steps: 5 },
    { id: 'factuurverwerking', name: 'Factuurverwerking', steps: 3 },
    { id: 'klachtafhandeling', name: 'Klachtafhandeling', steps: 4 }
  ]

  const cases = [
    {
      id: 'case-001',
      title: 'Nieuwe klant: ABC Corp',
      template: 'Klantonboarding',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Jan Bakker',
      dueDate: '2025-07-15',
      progress: 60,
      currentStep: 3,
      totalSteps: 5
    },
    {
      id: 'case-002',
      title: 'Factuur verwerking Q2',
      template: 'Factuurverwerking',
      status: 'Pending Review',
      priority: 'Medium',
      assignee: 'Marie de Vries',
      dueDate: '2025-07-12',
      progress: 80,
      currentStep: 2,
      totalSteps: 3
    },
    {
      id: 'case-003',
      title: 'Klacht: Product defect',
      template: 'Klachtafhandeling',
      status: 'Completed',
      priority: 'Low',
      assignee: 'Peter Jansen',
      dueDate: '2025-07-10',
      progress: 100,
      currentStep: 4,
      totalSteps: 4
    }
  ]

  const caseSteps = [
    {
      id: 1,
      title: 'Documentatie verzamelen',
      description: 'Alle benodigde documenten van de klant verzamelen',
      status: 'completed',
      assignee: 'Jan Bakker',
      completedAt: '2025-07-08',
      checklist: [
        { item: 'Identiteitsbewijs ontvangen', completed: true },
        { item: 'Contract ondertekend', completed: true },
        { item: 'Bankgegevens geverifieerd', completed: true }
      ]
    },
    {
      id: 2,
      title: 'KYC verificatie',
      description: 'Know Your Customer verificatie uitvoeren',
      status: 'completed',
      assignee: 'Compliance Team',
      completedAt: '2025-07-09',
      checklist: [
        { item: 'Identiteit geverifieerd', completed: true },
        { item: 'Adres bevestigd', completed: true },
        { item: 'Creditcheck uitgevoerd', completed: true }
      ]
    },
    {
      id: 3,
      title: 'Account setup',
      description: 'Technische account aanmaken en configureren',
      status: 'in-progress',
      assignee: 'IT Team',
      checklist: [
        { item: 'Database entry aangemaakt', completed: true },
        { item: 'Toegangsrechten ingesteld', completed: false },
        { item: 'Welkomstemail verzonden', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Onboarding call',
      description: 'Introductiegesprek met nieuwe klant',
      status: 'pending',
      assignee: 'Account Manager',
      scheduledFor: '2025-07-16',
      checklist: [
        { item: 'Call ingepland', completed: false },
        { item: 'Agenda voorbereid', completed: false },
        { item: 'Welkomstpakket verstuurd', completed: false }
      ]
    },
    {
      id: 5,
      title: 'Follow-up',
      description: 'Follow-up na onboarding',
      status: 'pending',
      assignee: 'Customer Success',
      checklist: [
        { item: 'Tevredenheidssurvey verzonden', completed: false },
        { item: 'Account review ingepland', completed: false }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-700'
      case 'Completed': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const filteredCases = statusFilter === 'all' 
    ? cases 
    : cases.filter(caseItem => caseItem.status === statusFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">
            Case Management
          </h3>
          <p className="text-secondary-600 mt-1">
            Beheer cases volgens proces templates met geïntegreerde planning
          </p>
        </div>
        <div className="flex space-x-3">
          <select className="border border-secondary-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Selecteer Template</option>
            {processTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases Lijst */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-secondary-900">Cases</h4>
              <select 
                className="text-sm border border-secondary-300 rounded px-2 py-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Alle Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-3">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCase === caseItem.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                  onClick={() => setSelectedCase(caseItem.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-secondary-900 text-sm">
                      {caseItem.title}
                    </h5>
                    <div className="flex space-x-1">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(caseItem.priority)}`}>
                        {caseItem.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-secondary-600 mb-2">
                    Template: {caseItem.template}
                  </p>
                  <div className="flex items-center justify-between text-xs text-secondary-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{caseItem.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{caseItem.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-600">
                      Stap {caseItem.currentStep}/{caseItem.totalSteps}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary-600 h-1.5 rounded-full transition-all"
                          style={{width: `${caseItem.progress}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-secondary-600">{caseItem.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-semibold text-secondary-900">
                      {cases.find(c => c.id === selectedCase)?.title}
                    </h4>
                    <p className="text-secondary-600 text-sm mt-1">
                      Template: {cases.find(c => c.id === selectedCase)?.template}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary">
                      <Calendar className="h-4 w-4 mr-2" />
                      Planning
                    </button>
                    <button className="btn-secondary">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                  </div>
                </div>

                {/* Process Steps */}
                <div className="space-y-4">
                  <h5 className="font-medium text-secondary-900">Proces Stappen</h5>
                  {caseSteps.map((step, index) => (
                    <div key={step.id} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        {getStepStatusIcon(step.status)}
                        {index < caseSteps.length - 1 && (
                          <div className="w-px h-12 bg-secondary-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="bg-secondary-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h6 className="font-medium text-secondary-900">
                                {step.title}
                              </h6>
                              <p className="text-sm text-secondary-600 mt-1">
                                {step.description}
                              </p>
                            </div>
                            <div className="text-right text-xs text-secondary-500">
                              <div className="flex items-center space-x-1 mb-1">
                                <User className="h-3 w-3" />
                                <span>{step.assignee}</span>
                              </div>
                              {step.completedAt && (
                                <div>Voltooid: {step.completedAt}</div>
                              )}
                              {step.scheduledFor && (
                                <div>Gepland: {step.scheduledFor}</div>
                              )}
                            </div>
                          </div>
                          
                          {/* Checklist */}
                          <div className="mt-4">
                            <h6 className="text-sm font-medium text-secondary-800 mb-2">
                              Checklist
                            </h6>
                            <div className="space-y-2">
                              {step.checklist.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={item.completed}
                                    className="h-4 w-4 text-primary-600 rounded border-secondary-300"
                                    onChange={() => {}}
                                  />
                                  <span className={`text-sm ${
                                    item.completed 
                                      ? 'text-secondary-900 line-through' 
                                      : 'text-secondary-700'
                                  }`}>
                                    {item.item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
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
                <Calendar className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">
                  Selecteer een case om de details en planning te bekijken
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
