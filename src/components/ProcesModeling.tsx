'use client'

import { useState } from 'react'
import { Plus, GitBranch, CheckSquare, Users, ArrowRight, Settings } from 'lucide-react'

export default function ProcesModeling() {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)
  const [diagramType, setDiagramType] = useState<'sipoc' | 'swimlane'>('sipoc')

  const processes = [
    {
      id: 'klantonboarding',
      name: 'Klantonboarding',
      description: 'Complete onboarding van nieuwe klanten',
      status: 'Actief',
      steps: 5,
      checklistItems: 12
    },
    {
      id: 'factuurverwerking',
      name: 'Factuurverwerking',
      description: 'Geautomatiseerde factuurverwerking',
      status: 'Concept',
      steps: 3,
      checklistItems: 8
    }
  ]

  const sipocData = {
    suppliers: ['Klant', 'Salesteam', 'Marketing'],
    inputs: ['Klantgegevens', 'Contract', 'Identificatie'],
    process: 'Klantonboarding',
    outputs: ['Actieve Account', 'Welkomstpakket', 'Toegangsgegevens'],
    customers: ['Nieuwe Klant', 'Account Manager', 'Support Team']
  }

  const swimlaneSteps = [
    { id: 1, actor: 'Klant', action: 'Aanvraag indienen', duration: '5 min' },
    { id: 2, actor: 'Sales', action: 'Documentatie controleren', duration: '30 min' },
    { id: 3, actor: 'Compliance', action: 'KYC verificatie', duration: '2 uur' },
    { id: 4, actor: 'IT', action: 'Account aanmaken', duration: '15 min' },
    { id: 5, actor: 'Support', action: 'Welkomstcommunicatie', duration: '10 min' }
  ]

  const checklistItems = [
    { id: 1, step: 1, requirement: 'Volledige klantgegevens ingevoerd', type: 'mandatory', checked: true },
    { id: 2, step: 1, requirement: 'Identiteitsverificatie uitgevoerd', type: 'mandatory', checked: true },
    { id: 3, step: 1, requirement: 'Contract ondertekend', type: 'mandatory', checked: false },
    { id: 4, step: 2, requirement: 'Creditworthiness check voltooid', type: 'conditional', checked: false },
    { id: 5, step: 2, requirement: 'Referenties gecontroleerd', type: 'optional', checked: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">
            Proces Modeling & Checklists
          </h3>
          <p className="text-secondary-600 mt-1">
            Modelleer processen met SIPOC/Swimlane diagrammen en bijbehorende checklists
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Nieuw Proces
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Proces Lijst */}
        <div className="lg:col-span-1">
          <div className="card">
            <h4 className="font-semibold text-secondary-900 mb-4">Processen</h4>
            <div className="space-y-3">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProcess === process.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-secondary-200 hover:border-secondary-300'
                  }`}
                  onClick={() => setSelectedProcess(process.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-secondary-900">
                      {process.name}
                    </h5>
                    <span className={`px-2 py-1 text-xs rounded ${
                      process.status === 'Actief'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {process.status}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 mb-3">
                    {process.description}
                  </p>
                  <div className="flex justify-between text-xs text-secondary-500">
                    <span>{process.steps} stappen</span>
                    <span>{process.checklistItems} checklist items</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagram Area */}
        <div className="lg:col-span-2">
          {selectedProcess ? (
            <div className="space-y-6">
              {/* Diagram Type Selector */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-secondary-900">
                    Proces Diagram
                  </h4>
                  <div className="flex bg-secondary-100 rounded-lg p-1">
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        diagramType === 'sipoc'
                          ? 'bg-white text-secondary-900 shadow-sm'
                          : 'text-secondary-600'
                      }`}
                      onClick={() => setDiagramType('sipoc')}
                    >
                      SIPOC
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        diagramType === 'swimlane'
                          ? 'bg-white text-secondary-900 shadow-sm'
                          : 'text-secondary-600'
                      }`}
                      onClick={() => setDiagramType('swimlane')}
                    >
                      Swimlane
                    </button>
                  </div>
                </div>

                {diagramType === 'sipoc' ? (
                  <div className="bg-secondary-50 rounded-lg p-6">
                    <div className="grid grid-cols-5 gap-4 text-center">
                      <div>
                        <h5 className="font-medium text-secondary-900 mb-3">Suppliers</h5>
                        <div className="space-y-2">
                          {sipocData.suppliers.map((supplier, index) => (
                            <div key={index} className="bg-white p-2 rounded text-sm">
                              {supplier}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-secondary-900 mb-3">Inputs</h5>
                        <div className="space-y-2">
                          {sipocData.inputs.map((input, index) => (
                            <div key={index} className="bg-white p-2 rounded text-sm">
                              {input}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-secondary-900 mb-3">Process</h5>
                        <div className="bg-primary-100 p-4 rounded border-2 border-primary-300">
                          <GitBranch className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                          <span className="text-sm font-medium">{sipocData.process}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-secondary-900 mb-3">Outputs</h5>
                        <div className="space-y-2">
                          {sipocData.outputs.map((output, index) => (
                            <div key={index} className="bg-white p-2 rounded text-sm">
                              {output}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-secondary-900 mb-3">Customers</h5>
                        <div className="space-y-2">
                          {sipocData.customers.map((customer, index) => (
                            <div key={index} className="bg-white p-2 rounded text-sm">
                              {customer}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-secondary-50 rounded-lg p-6">
                    <div className="space-y-4">
                      {swimlaneSteps.map((step, index) => (
                        <div key={step.id} className="flex items-center space-x-4">
                          <div className="w-20 text-center">
                            <div className="p-2 bg-primary-100 rounded">
                              <Users className="h-4 w-4 text-primary-600 mx-auto" />
                            </div>
                            <span className="text-xs text-secondary-600 mt-1 block">
                              {step.actor}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-secondary-400" />
                          <div className="flex-1 bg-white p-3 rounded border">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-secondary-900">
                                {step.action}
                              </span>
                              <span className="text-xs text-secondary-500">
                                {step.duration}
                              </span>
                            </div>
                          </div>
                          {index < swimlaneSteps.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-secondary-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <GitBranch className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">
                  Selecteer een proces om het diagram te bekijken
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Checklist Panel */}
        <div className="lg:col-span-1">
          {selectedProcess ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-secondary-900">
                  Process Checklist
                </h4>
                <button className="p-1 text-secondary-500 hover:text-secondary-700">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className="mt-1 h-4 w-4 text-primary-600 rounded border-secondary-300"
                      onChange={() => {}}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs px-2 py-1 rounded bg-secondary-200 text-secondary-700">
                          Stap {item.step}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.type === 'mandatory' ? 'bg-red-100 text-red-700' :
                          item.type === 'conditional' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-secondary-900">
                        {item.requirement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Checklist Item Toevoegen
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <CheckSquare className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">
                  Selecteer een proces om de checklist te bekijken
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
