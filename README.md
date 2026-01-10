# AZ-104 Study Planner

Una webapp responsive in stile "Runna" per prepararsi all'esame Microsoft Azure Administrator (AZ-104) in 30 giorni.

## Funzionalita

- **Checklist giornaliera**: 30 giorni di studio con argomenti selezionabili
- **Tracking progressi**: Segna gli argomenti completati con un click
- **Dettaglio argomenti**: Visualizza spiegazioni approfondite per ogni topic
- **Quiz giornalieri**: Domande pratiche simili all'esame reale con feedback immediato
- **Fonti Microsoft Learn**: Link diretti alla documentazione ufficiale
- **Persistenza locale**: I progressi vengono salvati automaticamente nel browser
- **Responsive design**: Navigazione ottimizzata per mobile, tablet e desktop
- **Menu mobile**: Sidebar con animazione slide-in su dispositivi mobili

## Stack Tecnologico

- **Framework**: React 18 con TypeScript
- **Styling**: Tailwind CSS v4 (design moderno mobile-first)
- **State Management**: React Context + localStorage
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React

## Struttura del Progetto

```
az-webapp/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx      # Header responsive con hamburger menu
│   │   │   ├── Sidebar.tsx     # Sidebar con overlay mobile
│   │   │   └── ProgressBar.tsx
│   │   ├── Day/
│   │   │   ├── DayCard.tsx
│   │   │   ├── DayList.tsx
│   │   │   └── DayDetail.tsx
│   │   ├── Topic/
│   │   │   └── TopicItem.tsx
│   │   └── Quiz/
│   │       ├── QuizContainer.tsx
│   │       ├── QuizQuestion.tsx
│   │       └── QuizResults.tsx
│   ├── data/
│   │   └── studyPlan.ts        # Piano di studio 30 giorni
│   ├── context/
│   │   └── ProgressContext.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Piano di Studio AZ-104 (30 Giorni)

L'esame AZ-104 copre le seguenti aree con i relativi pesi:

| Area | Peso | Giorni |
|------|------|--------|
| Gestione identita e governance Azure | 20-25% | 1-6 |
| Implementazione e gestione storage | 15-20% | 7-11 |
| Distribuzione e gestione risorse di calcolo | 20-25% | 12-18 |
| Implementazione e gestione reti virtuali | 15-20% | 19-24 |
| Monitoraggio e backup risorse Azure | 10-15% | 25-28 |
| Ripasso e simulazione esame | - | 29-30 |

## Installazione

```bash
# Clona il repository
cd az-webapp

# Installa dipendenze
npm install

# Avvia development server
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview
```

## Deployment

### Vercel (Consigliato)

```bash
# Installa Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Oppure collega il repository GitHub a Vercel per deploy automatici ad ogni push.

### Netlify

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Altri servizi

L'app puo essere deployata su qualsiasi piattaforma che supporta hosting di siti statici:
- GitHub Pages
- Cloudflare Pages
- Azure Static Web Apps

## Responsive Breakpoints

L'app utilizza i breakpoint standard di Tailwind CSS:

| Breakpoint | Min Width | Uso |
|------------|-----------|-----|
| Mobile | < 640px | Layout a colonna singola, menu hamburger |
| sm | >= 640px | Tablet portrait |
| md | >= 768px | Tablet landscape |
| lg | >= 1024px | Desktop, sidebar sempre visibile |
| xl | >= 1280px | Desktop grande, grid a 3 colonne |

## Fonti Ufficiali

- [AZ-104 Exam Page](https://learn.microsoft.com/en-us/certifications/exams/az-104)
- [Microsoft Learn - Azure Administrator](https://learn.microsoft.com/en-us/training/paths/az-104-administrator-prerequisites/)
- [Azure Documentation](https://learn.microsoft.com/en-us/azure/)

## Come Usare l'App

1. **Home**: Visualizza tutti i 30 giorni organizzati per area tematica
2. **Clicca su un giorno**: Accedi agli argomenti del giorno
3. **Espandi un argomento**: Clicca per leggere la spiegazione dettagliata
4. **Segna come completato**: Clicca sul cerchio per segnare un argomento studiato
5. **Quiz**: Completa il quiz a fine giornata per verificare la preparazione
6. **Progressi**: I tuoi progressi sono salvati automaticamente nel browser

## Caratteristiche Mobile

- **Menu hamburger**: Tocca l'icona menu per aprire la sidebar
- **Overlay scuro**: Tocca fuori dalla sidebar per chiuderla
- **Touch-friendly**: Bottoni e aree cliccabili ottimizzate per il touch
- **Scroll fluido**: Navigazione smooth su tutti i dispositivi

## Licenza

MIT
