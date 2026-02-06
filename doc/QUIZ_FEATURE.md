# Funzionalità Quiz AZ-104 - v2.0

## Panoramica

Sezione completa per eseguire quiz di simulazione dell'esame AZ-104 con **20 domande** estratte dal documento `epAZ-104_250905.docx`, con filtri per categoria, ricerca testuale e paginazione.

## ✨ Nuove Funzionalità v2.0

### 1. Filtri e Ricerca

- **Filtro per Categoria**: Filtra domande per argomento (Identity & Governance, Storage, Compute, Networking, Monitoring)
- **Ricerca Testuale**: Cerca nelle domande e nelle spiegazioni in tempo reale
- **Statistiche Live**: Visualizzazione domande trovate, pagina corrente, score parziale

### 2. Paginazione Intelligente

- **10 domande per pagina** per una navigazione più gestibile
- **Navigazione tra pagine**: Bottoni Precedente/Successivo con indicatore visuale
- **Jump alle pagine**: Clicca direttamente su un numero di pagina
- **Smart pagination**: Mostra solo le pagine rilevanti (prima, ultima, corrente ± 2)

### 3. Tipi di Domande Supportate (con esempi)

#### Single Choice (12 domande)
Domande con una sola risposta corretta tra 4 opzioni.
```
Esempio: "What should you deploy for VM availability?"
A. Availability Set
B. Availability Zones ✓
C. Scale Set
D. Load Balancer
```

#### Multiple Choice (2 domande)
Domande con più risposte corrette (notate: "Each correct answer presents...")
```
Esempio: "Which two groups should you create?"
A. Microsoft 365 group - Assigned ✓
B. Security group - Assigned
C. Microsoft 365 group - Dynamic ✓
D. Security group - Dynamic
E. Security group - Device
```

#### Yes/No (1 domanda)
Domande "Does this meet the goal?" con risposta Sì/No
```
Esempio: "Solution: Configure custom policy definition. Does this meet the goal?"
- Yes ✓
- No
```

#### Hotspot (4 domande)
Domande con tabelle/scenari che richiedono selezioni multiple
```
Esempio: "Which A records will be added?"
- VM1: A record added ✓
- VM2: A record added ✓
- VM3: No A record
```

#### Drag & Drop (2 domande)
Domande che richiedono di ordinare/posizionare elementi
```
Esempio: "UNC path format: \\[Box1].[Box2]\[Box3]"
- Box 1: contosostorage ✓
- Box 2: file.core.windows.net ✓
- Box 3: data ✓
```

### 4. Interfaccia Migliorata

- **Badge Categoria**: Ogni domanda mostra la categoria con colori distintivi
- **Badge Tipo**: Indica se è Single Choice, Multiple Choice, Hotspot, ecc.
- **Note Importanti**: Alert gialli per note tipo "Each correct selection is worth one point"
- **Feedback Visivo**: ✅ verde per corrette, ❌ rosso per errate
- **Spiegazione Dettagliata**: Dopo ogni risposta con link Microsoft Learn
- **Navigazione Fluida**: Bottoni Precedente/Prossima per muoversi tra domande
- **Score Tracking**: Conta solo la prima risposta per evitare tentativi multipli

## 📊 Distribuzione Domande per Categoria

| Categoria | Domande | Percentuale |
|-----------|---------|-------------|
| **Networking** | 6 | 30% |
| **Storage** | 7 | 35% |
| **Compute** | 5 | 25% |
| **Identity & Governance** | 3 | 15% |
| **Monitoring** | 1 | 5% |

## 🎯 Argomenti Coperti

### Identity & Governance
- Azure Policy (custom definitions)
- Azure AD (roles, groups, expiration policies)

### Storage
- Azure Files (SAS, mounting, sync)
- Storage accounts (types, replication)
- AzCopy commands
- Import/Export service
- File Sync deployment

### Compute
- VM Availability (Sets, Zones, Update Domains)
- VM Templates and deployment
- Temporary disk behavior

### Networking
- Private DNS zones (auto-registration)
- Network Watcher (connection monitor)
- VPN Gateway (point-to-site, route-based vs policy-based)
- Load Balancer (session persistence)

### Monitoring
- Azure Backup (supported VMs)

## 🚀 Come Usare la Funzionalità

### 1. Accesso
- **Homepage**: Banner verde in alto "Quiz Simulazione AZ-104"
- **Sidebar**: Sezione "Quiz Simulazione"
- **URL**: `/exam-quiz`

### 2. Filtri
1. Seleziona una categoria dal dropdown (es. "Storage")
2. Digita una parola chiave nella barra di ricerca (es. "backup")
3. Le domande vengono filtrate in tempo reale

### 3. Rispondere
1. Leggi la domanda e il badge del tipo
2. Seleziona una o più risposte (in base al tipo)
3. Clicca "Verifica Risposta"
4. Leggi la spiegazione e il link Learn
5. Usa "Prossima" per continuare

### 4. Navigazione
- **Tra domande**: Precedente/Prossima in fondo alla domanda
- **Tra pagine**: Clicca sui numeri pagina in basso
- **Reset**: "Ricomincia Quiz" per azzerare filtri e score

## 📂 Struttura Tecnica

```
src/
├── components/
│   └── Quiz/
│       └── ExamQuiz.tsx          # Componente principale (453 righe)
├── data/
│   └── examQuestions.json        # 20 domande categorizzate
├── types/
│   └── index.ts                  # ExamQuestion interface con category
└── App.tsx                       # Route /exam-quiz
```

### Tipo ExamQuestion

```typescript
interface ExamQuestion {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'hotspot' | 'yes-no' | 'drag-drop';
  category: 'identity-governance' | 'storage' | 'compute' | 'networking' | 'monitoring';
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
  reference?: string;
  note?: string;
}
```

## 🔧 Logica Implementata

### Filtri
```typescript
const filteredQuestions = useMemo(() => {
  return questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}, [questions, selectedCategory, searchQuery]);
```

### Paginazione
```typescript
const QUESTIONS_PER_PAGE = 10;
const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
const paginatedQuestions = useMemo(() => {
  const start = currentPage * QUESTIONS_PER_PAGE;
  return filteredQuestions.slice(start, start + QUESTIONS_PER_PAGE);
}, [filteredQuestions, currentPage]);
```

### Score Tracking
- Solo la **prima risposta** a ogni domanda conta per lo score
- Usa `answeredQuestions` per tracciare quali domande sono state già risposte
- Lo score persiste anche cambiando pagina o filtri

## 📈 Miglioramenti Futuri

### A Breve Termine
1. **Più domande**: Estrarre tutte le ~100+ domande dal documento
2. **Salvataggio progressi**: localStorage per riprendere da dove si era rimasti
3. **Modalità esame**: Timer simulato (90-120 minuti)
4. **Review finale**: Riepilogo domande sbagliate con possibilità di rifare

### A Lungo Termine
1. **Immagini**: Supporto per screenshot/tabelle nelle domande Hotspot
2. **Statistiche avanzate**: Grafico performance per categoria
3. **Quiz personalizzati**: Crea un quiz con N domande random per categoria
4. **Export risultati**: PDF con report performance
5. **Modalità practice**: Domande random infinite per ripassare

## 🎨 Design System

### Colori Categoria
- **Identity & Governance**: Viola (`text-purple-600`, `bg-purple-100`)
- **Storage**: Blu (`text-blue-600`, `bg-blue-100`)
- **Compute**: Arancione (`text-orange-600`, `bg-orange-100`)
- **Networking**: Verde (`text-green-600`, `bg-green-100`)
- **Monitoring**: Rosso (`text-red-600`, `bg-red-100`)

### Stato Risposta
- **Non risposto**: Bordo grigio, hover blu
- **Selezionato**: Bordo blu, sfondo blu chiaro
- **Corretto**: Bordo verde, sfondo verde chiaro, ✅
- **Errato**: Bordo rosso, sfondo rosso chiaro, ❌

## ✅ Testing

Build verificata con successo:
```bash
npm run build  # ✓ Compilazione riuscita (349 KB bundle)
npm run dev    # ✓ Server in esecuzione
```

## 📝 Note per Sviluppatori

### Aggiungere Nuove Domande
1. Aggiungi l'oggetto question in `examQuestions.json`
2. Assicurati di includere la `category`
3. Per domande multiple-choice/hotspot/drag-drop, metti più indici in `correctAnswers`

### Modificare il Numero di Domande per Pagina
Cambia la costante in [ExamQuiz.tsx:7](src/components/Quiz/ExamQuiz.tsx#L7):
```typescript
const QUESTIONS_PER_PAGE = 10; // Modifica questo valore
```

### Personalizzare i Filtri
Aggiungi nuove opzioni di filtro modificando l'enum `StudyCategory` in [types/index.ts](src/types/index.ts#L27-L31).

---

**Versione**: 2.0
**Data**: 2026-01-18
**Domande**: 20
**Tipologie**: 5 (Single, Multiple, Yes/No, Hotspot, Drag&Drop)
