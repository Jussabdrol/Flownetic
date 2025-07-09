# Procesmanagement App

Een professionele bedrijfsprocessmanagement applicatie gebouwd met Next.js en TypeScript voor het beheersen van bedrijfsprocessen.

## Hoofdfunctionaliteiten

### 1. Strategie Modellering
- **CTQ Flowdowns**: Koppel Critical-to-Quality factoren aan diensten
- **KPI Monitoring**: Real-time monitoring van prestatie-indicatoren
- **Data Integratie**: Automatische koppeling met proces- en case data

### 2. Proces Modeling & Checklists
- **SIPOC Diagrammen**: Suppliers, Inputs, Process, Outputs, Customers mapping
- **Swimlane Diagrammen**: Actor-gebaseerde procesvisualisatie
- **Proceseisen**: Geïntegreerde checklists per processtap
- **Process Templates**: Herbruikbare processjablonen

### 3. Case Management
- **Template-based Cases**: Nieuwe cases op basis van processjablonen
- **Progress Tracking**: Real-time voortgang van cases
- **Geïntegreerde Planning**: Tijdlijnen en deadlines per case
- **Checklist Integratie**: Automatische handreiking van proceseisen

## Technology Stack

- **Frontend**: Next.js 15+ met App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Development**: Turbopack voor snelle development

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm of bun

### Installatie
```bash
# Dependencies installeren
npm install

# Development server starten
npm run dev

# Applicatie bouwen voor productie
npm run build

# Productie server starten
npm start
```

### Development
De applicatie draait standaard op [http://localhost:3000](http://localhost:3000).

## Project Structuur

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Globale styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage met navigatie
├── components/            # React componenten
│   ├── Dashboard.tsx      # Dashboard overzicht
│   ├── StrategieModellering.tsx
│   ├── ProcesModeling.tsx
│   └── CaseManagement.tsx
```

## Design Principes

- **High-class uitstraling**: Professioneel en modern design
- **Responsive**: Optimaal op alle apparaten
- **Intuitive UX**: Gebruiksvriendelijke interface
- **Modulair**: Duidelijke scheiding tussen functionaliteiten
- **Schaalbaar**: Voorbereid op toekomstige uitbreidingen

## Development Guidelines

- Gebruik functionele React componenten met TypeScript
- Volg Nederlandse terminologie voor business logic
- Implementeer proper error handling
- Gebruik moderne React patterns (hooks, context)
- Maintain code quality met ESLint

## Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/nieuwe-functie`)
3. Commit je wijzigingen (`git commit -m 'Voeg nieuwe functie toe'`)
4. Push naar de branch (`git push origin feature/nieuwe-functie`)
5. Open een Pull Request

## License

Dit project is gelicenseerd onder de MIT License.
