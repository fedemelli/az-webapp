import type { Day } from '../types';

export const studyPlan: Day[] = [
  // SETTIMANA 1: Identità e Governance (Giorni 1-6)
  {
    day: 1,
    title: "Azure AD - Utenti e Gruppi",
    description: "Gestione delle identità in Azure Active Directory",
    category: "identity-governance",
    topics: [
      {
        id: "day1-users",
        title: "Gestione Utenti Azure AD",
        description: "Creare e gestire utenti in Azure Active Directory",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users",
        content: `<p><strong>Azure Active Directory (Azure AD)</strong> è il servizio di gestione delle identità e degli accessi basato su cloud di Microsoft.</p>
        <h4>Tipi di utenti:</h4>
        <ul>
          <li><strong>Cloud identity</strong>: utenti creati direttamente in Azure AD</li>
          <li><strong>Synchronized identity</strong>: utenti sincronizzati da Active Directory on-premises</li>
          <li><strong>Guest users</strong>: utenti esterni invitati tramite Azure AD B2B</li>
        </ul>
        <h4>Proprietà principali:</h4>
        <ul>
          <li>User Principal Name (UPN)</li>
          <li>Display Name</li>
          <li>Job Title, Department</li>
          <li>Usage Location (richiesto per le licenze)</li>
        </ul>`
      },
      {
        id: "day1-groups",
        title: "Gruppi Azure AD",
        description: "Tipi di gruppi e membership",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/groups-view-azure-portal",
        content: `<h4>Tipi di gruppi:</h4>
        <ul>
          <li><strong>Security groups</strong>: per gestire accesso a risorse</li>
          <li><strong>Microsoft 365 groups</strong>: per collaborazione (include mailbox, SharePoint)</li>
        </ul>
        <h4>Tipi di membership:</h4>
        <ul>
          <li><strong>Assigned</strong>: membri aggiunti manualmente</li>
          <li><strong>Dynamic User</strong>: membership basata su regole (richiede Azure AD Premium P1)</li>
          <li><strong>Dynamic Device</strong>: per gruppi di dispositivi</li>
        </ul>`
      },
      {
        id: "day1-bulk",
        title: "Operazioni Bulk",
        description: "Creare utenti e gruppi in blocco",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-add",
        content: `<h4>Operazioni bulk disponibili:</h4>
        <ul>
          <li><strong>Bulk create</strong>: crea utenti da file CSV</li>
          <li><strong>Bulk invite</strong>: invita guest users in blocco</li>
          <li><strong>Bulk delete</strong>: elimina utenti in blocco</li>
          <li><strong>Download users</strong>: esporta lista utenti</li>
        </ul>
        <p>Il file CSV deve contenere le colonne obbligatorie: Name, User principal name, Initial password.</p>`
      }
    ],
    quiz: [
      {
        id: "q1-1",
        question: "Quale tipo di membership richiede Azure AD Premium P1?",
        options: ["Assigned", "Dynamic User", "Static", "Manual"],
        correctAnswer: 1,
        explanation: "Dynamic User membership richiede Azure AD Premium P1 o P2 per creare regole automatiche di appartenenza ai gruppi."
      },
      {
        id: "q1-2",
        question: "Qual è il formato file richiesto per le operazioni bulk di creazione utenti?",
        options: ["JSON", "XML", "CSV", "XLSX"],
        correctAnswer: 2,
        explanation: "Le operazioni bulk in Azure AD richiedono file in formato CSV con colonne specifiche."
      },
      {
        id: "q1-3",
        question: "Quale proprietà utente è obbligatoria per assegnare licenze Microsoft 365?",
        options: ["Department", "Job Title", "Usage Location", "Manager"],
        correctAnswer: 2,
        explanation: "Usage Location è richiesto per assegnare licenze, in quanto determina la disponibilità dei servizi in base alla regione."
      }
    ]
  },
  {
    day: 2,
    title: "Azure AD - Ruoli e RBAC",
    description: "Controllo degli accessi basato sui ruoli",
    category: "identity-governance",
    topics: [
      {
        id: "day2-rbac",
        title: "Role-Based Access Control (RBAC)",
        description: "Concetti fondamentali di RBAC in Azure",
        duration: 30,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
        content: `<h4>Componenti RBAC:</h4>
        <ul>
          <li><strong>Security Principal</strong>: chi richiede l'accesso (user, group, service principal, managed identity)</li>
          <li><strong>Role Definition</strong>: collezione di permessi (actions, notActions, dataActions)</li>
          <li><strong>Scope</strong>: dove si applica (management group, subscription, resource group, resource)</li>
          <li><strong>Role Assignment</strong>: associazione di principal + role + scope</li>
        </ul>
        <h4>Ruoli built-in principali:</h4>
        <ul>
          <li><strong>Owner</strong>: accesso completo + può delegare</li>
          <li><strong>Contributor</strong>: accesso completo, non può delegare</li>
          <li><strong>Reader</strong>: solo lettura</li>
          <li><strong>User Access Administrator</strong>: gestisce accessi utente</li>
        </ul>`
      },
      {
        id: "day2-custom-roles",
        title: "Ruoli Personalizzati",
        description: "Creare custom roles in Azure",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles",
        content: `<h4>Quando usare custom roles:</h4>
        <p>Quando i ruoli built-in non soddisfano i requisiti specifici dell'organizzazione.</p>
        <h4>Struttura di un custom role:</h4>
        <ul>
          <li><strong>Name</strong>: nome univoco nel tenant</li>
          <li><strong>Actions</strong>: operazioni permesse</li>
          <li><strong>NotActions</strong>: operazioni escluse</li>
          <li><strong>DataActions</strong>: operazioni sui dati</li>
          <li><strong>AssignableScopes</strong>: dove può essere assegnato</li>
        </ul>
        <p>Richiede Azure AD Premium P1 o P2.</p>`
      },
      {
        id: "day2-aad-roles",
        title: "Azure AD Roles vs Azure Roles",
        description: "Differenza tra ruoli Azure AD e Azure RBAC",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles",
        content: `<h4>Azure AD Roles:</h4>
        <p>Gestiscono risorse Azure AD (utenti, gruppi, app registrations)</p>
        <ul>
          <li>Global Administrator</li>
          <li>User Administrator</li>
          <li>Billing Administrator</li>
        </ul>
        <h4>Azure RBAC Roles:</h4>
        <p>Gestiscono risorse Azure (VM, storage, networks)</p>
        <ul>
          <li>Owner, Contributor, Reader</li>
          <li>Virtual Machine Contributor</li>
          <li>Storage Blob Data Contributor</li>
        </ul>`
      }
    ],
    quiz: [
      {
        id: "q2-1",
        question: "Quale ruolo può gestire le risorse Azure MA non può delegare accessi ad altri?",
        options: ["Owner", "Contributor", "Reader", "User Access Administrator"],
        correctAnswer: 1,
        explanation: "Contributor ha accesso completo alle risorse ma non può assegnare ruoli ad altri utenti."
      },
      {
        id: "q2-2",
        question: "A quale livello NON si può applicare un role assignment?",
        options: ["Management Group", "Subscription", "Resource Group", "Azure AD Tenant"],
        correctAnswer: 3,
        explanation: "Azure RBAC si applica a management group, subscription, resource group e singole risorse. Azure AD Tenant usa Azure AD roles, non RBAC."
      },
      {
        id: "q2-3",
        question: "Quale proprietà di un custom role definisce dove può essere assegnato?",
        options: ["Actions", "Scope", "AssignableScopes", "NotActions"],
        correctAnswer: 2,
        explanation: "AssignableScopes definisce i livelli (subscription, resource group) dove il custom role può essere assegnato."
      }
    ]
  },
  {
    day: 3,
    title: "Sottoscrizioni e Management Groups",
    description: "Organizzazione gerarchica delle risorse Azure",
    category: "identity-governance",
    topics: [
      {
        id: "day3-subscriptions",
        title: "Azure Subscriptions",
        description: "Gestione delle sottoscrizioni Azure",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources",
        content: `<h4>Cos'è una Subscription:</h4>
        <p>Container logico per le risorse Azure, legato a un account di fatturazione.</p>
        <h4>Limiti subscription:</h4>
        <ul>
          <li>Ogni risorsa appartiene a una sola subscription</li>
          <li>Limiti di risorse per subscription (es. max 250 storage accounts)</li>
          <li>Una subscription può essere in un solo Azure AD tenant</li>
        </ul>
        <h4>Tipi di subscription:</h4>
        <ul>
          <li>Free, Pay-As-You-Go, Enterprise Agreement, CSP</li>
        </ul>`
      },
      {
        id: "day3-mgmt-groups",
        title: "Management Groups",
        description: "Organizzazione gerarchica delle subscription",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview",
        content: `<h4>Gerarchia:</h4>
        <p>Root Management Group → Management Groups → Subscriptions → Resource Groups → Resources</p>
        <h4>Caratteristiche:</h4>
        <ul>
          <li>Max 6 livelli di profondità (escluso root)</li>
          <li>Ogni directory ha un Root management group</li>
          <li>Policy e RBAC si ereditano verso il basso</li>
          <li>10.000 management groups per directory</li>
        </ul>`
      },
      {
        id: "day3-resource-groups",
        title: "Resource Groups",
        description: "Container per le risorse Azure",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal",
        content: `<h4>Caratteristiche:</h4>
        <ul>
          <li>Ogni risorsa deve essere in un resource group</li>
          <li>Una risorsa può essere in un solo resource group</li>
          <li>Le risorse possono essere spostate tra resource groups</li>
          <li>Il resource group ha una location (per i metadata)</li>
          <li>Eliminando un RG si eliminano tutte le risorse contenute</li>
        </ul>
        <h4>Best practices:</h4>
        <p>Raggruppare risorse con lo stesso ciclo di vita.</p>`
      }
    ],
    quiz: [
      {
        id: "q3-1",
        question: "Quanti livelli di management group sono supportati (escluso il root)?",
        options: ["4", "6", "10", "Illimitati"],
        correctAnswer: 1,
        explanation: "Azure supporta fino a 6 livelli di profondità per i management groups, escluso il root management group."
      },
      {
        id: "q3-2",
        question: "Cosa succede quando elimini un resource group?",
        options: ["Le risorse vengono spostate", "Solo il RG viene eliminato", "Tutte le risorse vengono eliminate", "Viene creato un backup"],
        correctAnswer: 2,
        explanation: "Eliminando un resource group, tutte le risorse contenute vengono eliminate in modo permanente."
      },
      {
        id: "q3-3",
        question: "Una subscription può appartenere a più Azure AD tenant?",
        options: ["Sì, fino a 3", "Sì, illimitati", "No, solo uno", "Dipende dal tipo di subscription"],
        correctAnswer: 2,
        explanation: "Una subscription può essere associata a un solo Azure AD tenant alla volta."
      }
    ]
  },
  {
    day: 4,
    title: "Azure Policy",
    description: "Governance e compliance con Azure Policy",
    category: "identity-governance",
    topics: [
      {
        id: "day4-policy-basics",
        title: "Concetti Base di Azure Policy",
        description: "Cos'è Azure Policy e come funziona",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/overview",
        content: `<h4>Azure Policy:</h4>
        <p>Servizio per creare, assegnare e gestire policy che impongono regole sulle risorse.</p>
        <h4>Componenti:</h4>
        <ul>
          <li><strong>Policy Definition</strong>: regola in formato JSON</li>
          <li><strong>Initiative (Policy Set)</strong>: gruppo di policy</li>
          <li><strong>Assignment</strong>: applicazione a uno scope</li>
          <li><strong>Exemption</strong>: esclusione da una policy</li>
        </ul>
        <h4>Effetti delle policy:</h4>
        <ul>
          <li><strong>Deny</strong>: blocca la creazione/modifica</li>
          <li><strong>Audit</strong>: registra non-compliance</li>
          <li><strong>Append</strong>: aggiunge proprietà</li>
          <li><strong>DeployIfNotExists</strong>: deploy automatico</li>
          <li><strong>Modify</strong>: modifica tag o proprietà</li>
        </ul>`
      },
      {
        id: "day4-initiatives",
        title: "Policy Initiatives",
        description: "Raggruppare policy in iniziative",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/concepts/initiative-definition-structure",
        content: `<h4>Quando usare le initiatives:</h4>
        <p>Per raggruppare policy correlate e semplificare la gestione della compliance.</p>
        <h4>Built-in initiatives:</h4>
        <ul>
          <li>Azure Security Benchmark</li>
          <li>CIS Microsoft Azure Foundations Benchmark</li>
          <li>ISO 27001</li>
          <li>NIST SP 800-53</li>
        </ul>
        <h4>Vantaggi:</h4>
        <ul>
          <li>Un solo assignment per multiple policy</li>
          <li>Compliance score aggregato</li>
          <li>Gestione centralizzata dei parametri</li>
        </ul>`
      },
      {
        id: "day4-compliance",
        title: "Compliance e Remediation",
        description: "Monitorare e correggere la compliance",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources",
        content: `<h4>Compliance Dashboard:</h4>
        <p>Visualizza lo stato di compliance delle risorse rispetto alle policy assegnate.</p>
        <h4>Remediation:</h4>
        <ul>
          <li>Automatica per DeployIfNotExists e Modify</li>
          <li>Richiede managed identity per il deployment</li>
          <li>Remediation tasks per risorse esistenti</li>
        </ul>
        <h4>Evaluation:</h4>
        <ul>
          <li>Automatica ogni 24 ore</li>
          <li>On-demand tramite Azure CLI/PowerShell</li>
          <li>Trigger su creazione/modifica risorse</li>
        </ul>`
      }
    ],
    quiz: [
      {
        id: "q4-1",
        question: "Quale effetto di Azure Policy blocca la creazione di risorse non conformi?",
        options: ["Audit", "Deny", "Append", "Disabled"],
        correctAnswer: 1,
        explanation: "L'effetto Deny impedisce la creazione o modifica di risorse che non rispettano la policy."
      },
      {
        id: "q4-2",
        question: "Ogni quanto vengono valutate automaticamente le Azure Policy?",
        options: ["Ogni ora", "Ogni 12 ore", "Ogni 24 ore", "Ogni settimana"],
        correctAnswer: 2,
        explanation: "Azure Policy esegue una valutazione automatica della compliance ogni 24 ore."
      },
      {
        id: "q4-3",
        question: "Cosa è richiesto per usare l'effetto DeployIfNotExists?",
        options: ["Azure AD Premium", "Managed Identity", "Custom Role", "Enterprise Agreement"],
        correctAnswer: 1,
        explanation: "DeployIfNotExists richiede una Managed Identity per effettuare il deployment automatico delle risorse."
      }
    ]
  },
  {
    day: 5,
    title: "Resource Tags e Resource Locks",
    description: "Organizzazione e protezione delle risorse",
    category: "identity-governance",
    topics: [
      {
        id: "day5-tags",
        title: "Resource Tags",
        description: "Organizzare risorse con i tag",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources",
        content: `<h4>Cosa sono i Tag:</h4>
        <p>Coppie nome-valore per categorizzare e organizzare le risorse Azure.</p>
        <h4>Limiti:</h4>
        <ul>
          <li>Max 50 tag per risorsa</li>
          <li>Nome tag: max 512 caratteri</li>
          <li>Valore tag: max 256 caratteri</li>
          <li>I tag NON sono ereditati da resource group</li>
        </ul>
        <h4>Uso comune:</h4>
        <ul>
          <li>Cost center / Department</li>
          <li>Environment (Dev/Test/Prod)</li>
          <li>Owner / Project</li>
        </ul>`
      },
      {
        id: "day5-locks",
        title: "Resource Locks",
        description: "Proteggere risorse da modifiche accidentali",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources",
        content: `<h4>Tipi di Lock:</h4>
        <ul>
          <li><strong>CanNotDelete (Delete)</strong>: permette lettura e modifica, blocca eliminazione</li>
          <li><strong>ReadOnly</strong>: permette solo lettura, blocca modifica ed eliminazione</li>
        </ul>
        <h4>Comportamento:</h4>
        <ul>
          <li>I lock si ereditano verso il basso (RG → risorse)</li>
          <li>Anche Owner deve rimuovere il lock prima di eliminare</li>
          <li>ReadOnly può causare comportamenti inattesi (es. blocca list keys su storage)</li>
        </ul>`
      },
      {
        id: "day5-move",
        title: "Spostare Risorse",
        description: "Move di risorse tra resource group e subscription",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription",
        content: `<h4>Tipi di spostamento:</h4>
        <ul>
          <li>Tra resource groups nella stessa subscription</li>
          <li>Tra subscription (stesso Azure AD tenant)</li>
          <li>Tra tenant (operazione più complessa)</li>
        </ul>
        <h4>Limitazioni:</h4>
        <ul>
          <li>Non tutte le risorse supportano lo spostamento</li>
          <li>Source e destination sono bloccati durante il move</li>
          <li>I lock devono essere rimossi prima del move</li>
        </ul>
        <p>Verifica sempre la documentazione per ogni tipo di risorsa.</p>`
      }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "I tag di un resource group sono automaticamente ereditati dalle risorse?",
        options: ["Sì, sempre", "No, mai", "Solo se configurato", "Solo per alcuni tipi"],
        correctAnswer: 1,
        explanation: "I tag NON sono ereditati automaticamente. Puoi usare Azure Policy per applicare tag automaticamente."
      },
      {
        id: "q5-2",
        question: "Quale tipo di lock permette modifiche ma blocca l'eliminazione?",
        options: ["ReadOnly", "CanNotDelete", "NoModify", "Protected"],
        correctAnswer: 1,
        explanation: "CanNotDelete (Delete lock) permette lettura e modifica, ma impedisce l'eliminazione della risorsa."
      },
      {
        id: "q5-3",
        question: "Quanti tag possono essere applicati a una singola risorsa Azure?",
        options: ["15", "25", "50", "100"],
        correctAnswer: 2,
        explanation: "È possibile applicare fino a 50 tag per risorsa Azure."
      }
    ]
  },
  {
    day: 6,
    title: "Cost Management e Billing",
    description: "Gestione dei costi e della fatturazione Azure",
    category: "identity-governance",
    topics: [
      {
        id: "day6-cost-analysis",
        title: "Cost Analysis",
        description: "Analizzare e comprendere i costi Azure",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis",
        content: `<h4>Cost Management + Billing:</h4>
        <p>Servizio per monitorare, allocare e ottimizzare i costi Azure.</p>
        <h4>Funzionalità:</h4>
        <ul>
          <li><strong>Cost Analysis</strong>: visualizza costi per periodo, risorsa, tag</li>
          <li><strong>Budgets</strong>: imposta limiti di spesa con alert</li>
          <li><strong>Recommendations</strong>: suggerimenti per ridurre i costi</li>
          <li><strong>Exports</strong>: esporta dati in storage account</li>
        </ul>`
      },
      {
        id: "day6-budgets",
        title: "Budgets e Alerts",
        description: "Configurare budget e notifiche",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets",
        content: `<h4>Budget:</h4>
        <p>Definisce un limite di spesa per un periodo specifico.</p>
        <h4>Configurazione:</h4>
        <ul>
          <li>Scope: subscription o resource group</li>
          <li>Periodo: mensile, trimestrale, annuale</li>
          <li>Importo: valore in valuta</li>
          <li>Alert: percentuale del budget (es. 80%, 100%)</li>
        </ul>
        <h4>Azioni:</h4>
        <ul>
          <li>Email notifications</li>
          <li>Action groups (Azure Monitor)</li>
          <li>Automation runbooks</li>
        </ul>`
      },
      {
        id: "day6-savings",
        title: "Risparmiare su Azure",
        description: "Strategie per ottimizzare i costi",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/cost-mgt-best-practices",
        content: `<h4>Strategie di risparmio:</h4>
        <ul>
          <li><strong>Reserved Instances</strong>: sconto fino al 72% per impegno 1-3 anni</li>
          <li><strong>Azure Hybrid Benefit</strong>: usa licenze Windows/SQL esistenti</li>
          <li><strong>Spot VMs</strong>: sconto fino al 90% per workload interrompibili</li>
          <li><strong>Right-sizing</strong>: ridimensiona risorse sottoutilizzate</li>
          <li><strong>Dev/Test pricing</strong>: prezzi ridotti per ambienti non-prod</li>
          <li><strong>Auto-shutdown</strong>: spegni VM non utilizzate</li>
        </ul>`
      }
    ],
    quiz: [
      {
        id: "q6-1",
        question: "Quale servizio Azure permette di creare budget con alert automatici?",
        options: ["Azure Monitor", "Cost Management + Billing", "Azure Advisor", "Azure Policy"],
        correctAnswer: 1,
        explanation: "Cost Management + Billing permette di creare budget e configurare alert quando si raggiungono determinate soglie."
      },
      {
        id: "q6-2",
        question: "Quanto sconto può offrire Azure Reserved Instances per un impegno di 3 anni?",
        options: ["Fino al 30%", "Fino al 50%", "Fino al 72%", "Fino al 90%"],
        correctAnswer: 2,
        explanation: "Azure Reserved Instances può offrire sconti fino al 72% rispetto ai prezzi pay-as-you-go per impegni di 1 o 3 anni."
      },
      {
        id: "q6-3",
        question: "Quale opzione è ideale per workload che possono essere interrotti?",
        options: ["Reserved Instances", "Spot VMs", "Premium SSD", "Dedicated Host"],
        correctAnswer: 1,
        explanation: "Spot VMs offrono sconti fino al 90% ma possono essere deallocate quando Azure necessita della capacità."
      }
    ]
  },
  // SETTIMANA 2: Storage (Giorni 7-11)
  {
    day: 7,
    title: "Storage Accounts - Fondamenti",
    description: "Tipi e configurazione degli storage account",
    category: "storage",
    topics: [
      {
        id: "day7-types",
        title: "Tipi di Storage Account",
        description: "Standard vs Premium, tipi di account",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview",
        content: `<h4>Tipi di Storage Account:</h4>
        <ul>
          <li><strong>Standard general-purpose v2</strong>: blob, file, queue, table (più comune)</li>
          <li><strong>Premium block blobs</strong>: alte prestazioni per blob</li>
          <li><strong>Premium file shares</strong>: alte prestazioni per file</li>
          <li><strong>Premium page blobs</strong>: per dischi non gestiti</li>
        </ul>
        <h4>Tier di accesso (Blob):</h4>
        <ul>
          <li><strong>Hot</strong>: accesso frequente, costo storage alto, accesso basso</li>
          <li><strong>Cool</strong>: accesso infrequente (30+ giorni)</li>
          <li><strong>Cold</strong>: accesso raro (90+ giorni)</li>
          <li><strong>Archive</strong>: archiviazione (180+ giorni), richiede rehydration</li>
        </ul>`
      },
      {
        id: "day7-replication",
        title: "Replication e Ridondanza",
        description: "Opzioni di ridondanza per la durabilità",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
        content: `<h4>Opzioni di ridondanza:</h4>
        <ul>
          <li><strong>LRS</strong>: 3 copie in un datacenter (11 nines)</li>
          <li><strong>ZRS</strong>: 3 copie in 3 zone diverse (12 nines)</li>
          <li><strong>GRS</strong>: LRS + replica in region secondaria</li>
          <li><strong>GZRS</strong>: ZRS + replica in region secondaria</li>
          <li><strong>RA-GRS/RA-GZRS</strong>: come sopra + read access alla replica</li>
        </ul>
        <h4>Failover:</h4>
        <p>Con GRS/GZRS puoi fare failover manuale alla region secondaria in caso di disastro.</p>`
      },
      {
        id: "day7-config",
        title: "Configurazione Storage Account",
        description: "Networking, sicurezza e opzioni avanzate",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create",
        content: `<h4>Opzioni di rete:</h4>
        <ul>
          <li><strong>Public endpoint (all networks)</strong>: accessibile da internet</li>
          <li><strong>Public endpoint (selected networks)</strong>: firewall + VNet</li>
          <li><strong>Private endpoint</strong>: accesso solo via private link</li>
        </ul>
        <h4>Naming:</h4>
        <ul>
          <li>3-24 caratteri</li>
          <li>Solo lettere minuscole e numeri</li>
          <li>Deve essere globalmente univoco</li>
        </ul>`
      }
    ],
    quiz: [
      {
        id: "q7-1",
        question: "Quale opzione di ridondanza replica i dati in 3 zone di disponibilità?",
        options: ["LRS", "ZRS", "GRS", "RA-GRS"],
        correctAnswer: 1,
        explanation: "ZRS (Zone-Redundant Storage) replica i dati in 3 zone di disponibilità diverse nella stessa region."
      },
      {
        id: "q7-2",
        question: "Quale tier di accesso richiede rehydration prima di poter leggere i dati?",
        options: ["Hot", "Cool", "Cold", "Archive"],
        correctAnswer: 3,
        explanation: "Il tier Archive richiede rehydration (spostamento a Hot o Cool) prima di poter accedere ai dati, con tempi da ore a giorni."
      },
      {
        id: "q7-3",
        question: "Qual è la lunghezza massima per il nome di uno storage account?",
        options: ["15 caratteri", "24 caratteri", "63 caratteri", "128 caratteri"],
        correctAnswer: 1,
        explanation: "Il nome dello storage account deve essere tra 3 e 24 caratteri, solo lettere minuscole e numeri."
      }
    ]
  },
  {
    day: 8,
    title: "Blob Storage e Lifecycle Management",
    description: "Gestione dei blob e automazione del ciclo di vita",
    category: "storage",
    topics: [
      {
        id: "day8-blob-types",
        title: "Tipi di Blob",
        description: "Block, Page e Append blobs",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction",
        content: `<h4>Tipi di Blob:</h4>
        <ul>
          <li><strong>Block blobs</strong>: per file fino a 190.7 TB, upload in blocchi</li>
          <li><strong>Page blobs</strong>: per dischi VHD, ottimizzato per random read/write</li>
          <li><strong>Append blobs</strong>: ottimizzato per append (log files)</li>
        </ul>
        <h4>Container:</h4>
        <ul>
          <li>Organizza i blob in gruppi logici</li>
          <li>Access level: Private, Blob, Container</li>
          <li>Nome: 3-63 caratteri, lowercase</li>
        </ul>`
      },
      {
        id: "day8-lifecycle",
        title: "Lifecycle Management",
        description: "Automatizzare la gestione dei blob",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview",
        content: `<h4>Lifecycle Policies:</h4>
        <p>Regole per automatizzare il movimento o l'eliminazione dei blob.</p>
        <h4>Azioni disponibili:</h4>
        <ul>
          <li><strong>tierToCool</strong>: sposta a Cool dopo X giorni</li>
          <li><strong>tierToCold</strong>: sposta a Cold dopo X giorni</li>
          <li><strong>tierToArchive</strong>: sposta ad Archive dopo X giorni</li>
          <li><strong>delete</strong>: elimina dopo X giorni</li>
        </ul>
        <h4>Filtri:</h4>
        <ul>
          <li>blobTypes: blockBlob, appendBlob</li>
          <li>prefixMatch: pattern per il nome blob</li>
          <li>blobIndexMatch: basato su tag</li>
        </ul>`
      },
      {
        id: "day8-versioning",
        title: "Versioning e Soft Delete",
        description: "Proteggere i dati da eliminazioni accidentali",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview",
        content: `<h4>Blob Versioning:</h4>
        <p>Mantiene automaticamente versioni precedenti dei blob quando vengono modificati o sovrascritti.</p>
        <h4>Soft Delete:</h4>
        <ul>
          <li><strong>Blob soft delete</strong>: recupera blob eliminati (1-365 giorni)</li>
          <li><strong>Container soft delete</strong>: recupera container eliminati</li>
        </ul>
        <h4>Point-in-time Restore:</h4>
        <p>Ripristina i blob a uno stato precedente. Richiede versioning e change feed abilitati.</p>`
      }
    ],
    quiz: [
      {
        id: "q8-1",
        question: "Quale tipo di blob è ottimizzato per dischi VHD di macchine virtuali?",
        options: ["Block blob", "Page blob", "Append blob", "File blob"],
        correctAnswer: 1,
        explanation: "Page blobs sono ottimizzati per operazioni di read/write random e sono usati per dischi VHD non gestiti."
      },
      {
        id: "q8-2",
        question: "Quale funzionalità è richiesta per abilitare Point-in-time Restore?",
        options: ["Soft delete", "Versioning", "Lifecycle management", "Archive tier"],
        correctAnswer: 1,
        explanation: "Point-in-time Restore richiede che versioning e change feed siano abilitati sullo storage account."
      },
      {
        id: "q8-3",
        question: "Per quanti giorni massimo può essere configurato il soft delete?",
        options: ["30 giorni", "90 giorni", "180 giorni", "365 giorni"],
        correctAnswer: 3,
        explanation: "Il periodo di retention per soft delete può essere configurato da 1 a 365 giorni."
      }
    ]
  },
  {
    day: 9,
    title: "Azure Files e File Sync",
    description: "Condivisioni file cloud e sincronizzazione",
    category: "storage",
    topics: [
      {
        id: "day9-files",
        title: "Azure Files",
        description: "Condivisioni file gestite nel cloud",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction",
        content: `<h4>Azure Files:</h4>
        <p>Condivisioni file SMB/NFS completamente gestite nel cloud.</p>
        <h4>Protocolli:</h4>
        <ul>
          <li><strong>SMB 3.x</strong>: Windows, Linux, macOS (porta 445)</li>
          <li><strong>NFS 4.1</strong>: Linux (solo Premium)</li>
          <li><strong>REST API</strong>: accesso programmatico</li>
        </ul>
        <h4>Tier:</h4>
        <ul>
          <li><strong>Premium</strong>: SSD, bassa latenza, NFS support</li>
          <li><strong>Transaction optimized</strong>: workload transaction-heavy</li>
          <li><strong>Hot</strong>: file sharing generale</li>
          <li><strong>Cool</strong>: archiviazione economica</li>
        </ul>`
      },
      {
        id: "day9-identity",
        title: "Autenticazione Azure Files",
        description: "Opzioni di autenticazione per le condivisioni",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview",
        content: `<h4>Opzioni di autenticazione:</h4>
        <ul>
          <li><strong>Storage account key</strong>: accesso completo</li>
          <li><strong>Azure AD DS</strong>: identity-based per VM Azure</li>
          <li><strong>On-prem AD DS</strong>: per hybrid (richiede sync)</li>
          <li><strong>Azure AD Kerberos</strong>: per Azure AD users</li>
        </ul>
        <h4>Permessi NTFS:</h4>
        <p>Con identity-based auth puoi usare permessi granulari a livello di file/cartella.</p>`
      },
      {
        id: "day9-sync",
        title: "Azure File Sync",
        description: "Sincronizzare file server on-premises",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/file-sync/file-sync-introduction",
        content: `<h4>Componenti:</h4>
        <ul>
          <li><strong>Storage Sync Service</strong>: risorsa Azure</li>
          <li><strong>Sync Group</strong>: definisce la topologia di sync</li>
          <li><strong>Cloud Endpoint</strong>: Azure file share</li>
          <li><strong>Server Endpoint</strong>: path su Windows Server</li>
        </ul>
        <h4>Cloud Tiering:</h4>
        <p>Mantiene solo i file più usati localmente, il resto viene tiered nel cloud. Libera spazio sui server.</p>`
      }
    ],
    quiz: [
      {
        id: "q9-1",
        question: "Quale porta deve essere aperta per accedere ad Azure Files via SMB?",
        options: ["Port 22", "Port 80", "Port 443", "Port 445"],
        correctAnswer: 3,
        explanation: "SMB utilizza la porta 445. Molti ISP la bloccano, quindi Azure Files offre anche SMB over QUIC (port 443)."
      },
      {
        id: "q9-2",
        question: "Quale protocollo è supportato SOLO con Azure Files Premium?",
        options: ["SMB 2.1", "SMB 3.0", "NFS 4.1", "REST API"],
        correctAnswer: 2,
        explanation: "NFS 4.1 è supportato solo con Azure Files Premium tier e solo su Linux."
      },
      {
        id: "q9-3",
        question: "Quale funzionalità di Azure File Sync libera spazio sui server locali?",
        options: ["Sync Groups", "Cloud Tiering", "Server Endpoints", "Change Detection"],
        correctAnswer: 1,
        explanation: "Cloud Tiering mantiene localmente solo i file più utilizzati, spostando gli altri nel cloud e liberando spazio."
      }
    ]
  },
  {
    day: 10,
    title: "Storage Security",
    description: "Sicurezza e controllo accessi per lo storage",
    category: "storage",
    topics: [
      {
        id: "day10-auth",
        title: "Metodi di Autenticazione",
        description: "Keys, SAS, Azure AD",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-auth",
        content: `<h4>Metodi di autenticazione:</h4>
        <ul>
          <li><strong>Access Keys</strong>: full access, da usare con cautela</li>
          <li><strong>Shared Access Signature (SAS)</strong>: accesso limitato e temporaneo</li>
          <li><strong>Azure AD</strong>: identity-based, RBAC</li>
          <li><strong>Anonymous</strong>: per container pubblici</li>
        </ul>
        <h4>Best practices:</h4>
        <ul>
          <li>Preferisci Azure AD quando possibile</li>
          <li>Ruota le access keys regolarmente</li>
          <li>Usa SAS con breve durata</li>
        </ul>`
      },
      {
        id: "day10-sas",
        title: "Shared Access Signatures",
        description: "Tipi di SAS e configurazione",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview",
        content: `<h4>Tipi di SAS:</h4>
        <ul>
          <li><strong>Account SAS</strong>: accesso a uno o più servizi</li>
          <li><strong>Service SAS</strong>: accesso a un singolo servizio</li>
          <li><strong>User delegation SAS</strong>: firmato con Azure AD (più sicuro)</li>
        </ul>
        <h4>Parametri SAS:</h4>
        <ul>
          <li>Start/Expiry time</li>
          <li>Permissions (read, write, delete, list)</li>
          <li>IP restrictions</li>
          <li>Protocol (HTTPS only)</li>
        </ul>
        <h4>Stored Access Policy:</h4>
        <p>Permette di revocare SAS senza rigenerare le keys.</p>`
      },
      {
        id: "day10-encryption",
        title: "Encryption",
        description: "Crittografia at rest e in transit",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption",
        content: `<h4>Encryption at rest:</h4>
        <ul>
          <li>Sempre abilitata (256-bit AES)</li>
          <li><strong>Microsoft-managed keys</strong>: default</li>
          <li><strong>Customer-managed keys</strong>: Azure Key Vault</li>
          <li><strong>Customer-provided keys</strong>: per singole richieste</li>
        </ul>
        <h4>Encryption in transit:</h4>
        <ul>
          <li>HTTPS sempre consigliato</li>
          <li>SMB 3.x encryption</li>
          <li>Require secure transfer: forza HTTPS</li>
        </ul>`
      }
    ],
    quiz: [
      {
        id: "q10-1",
        question: "Quale tipo di SAS è firmato con credenziali Azure AD?",
        options: ["Account SAS", "Service SAS", "User delegation SAS", "Stored Access Policy"],
        correctAnswer: 2,
        explanation: "User delegation SAS è firmato con credenziali Azure AD invece che con account key, offrendo maggiore sicurezza."
      },
      {
        id: "q10-2",
        question: "Come puoi revocare un Service SAS senza rigenerare le access keys?",
        options: ["Non è possibile", "Stored Access Policy", "Azure AD revocation", "Delete the container"],
        correctAnswer: 1,
        explanation: "Usando una Stored Access Policy, puoi revocare il SAS modificando o eliminando la policy."
      },
      {
        id: "q10-3",
        question: "La crittografia at rest per Azure Storage è...",
        options: ["Opzionale e a pagamento", "Opzionale e gratuita", "Obbligatoria", "Disponibile solo con Premium"],
        correctAnswer: 2,
        explanation: "La crittografia at rest è sempre abilitata per Azure Storage e non può essere disattivata."
      }
    ]
  },
  {
    day: 11,
    title: "AzCopy e Import/Export",
    description: "Trasferimento dati verso Azure Storage",
    category: "storage",
    topics: [
      {
        id: "day11-azcopy",
        title: "AzCopy",
        description: "Utility command-line per trasferimento dati",
        duration: 30,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10",
        content: `<h4>AzCopy:</h4>
        <p>Utility a riga di comando per copiare dati da/verso Azure Storage.</p>
        <h4>Autenticazione:</h4>
        <ul>
          <li><strong>Azure AD</strong>: azcopy login</li>
          <li><strong>SAS token</strong>: nel URL</li>
        </ul>
        <h4>Comandi principali:</h4>
        <ul>
          <li><strong>azcopy copy</strong>: copia file/blob</li>
          <li><strong>azcopy sync</strong>: sincronizza directory</li>
          <li><strong>azcopy make</strong>: crea container</li>
          <li><strong>azcopy remove</strong>: elimina blob</li>
        </ul>
        <h4>Scenari:</h4>
        <ul>
          <li>Upload da locale a Azure</li>
          <li>Download da Azure a locale</li>
          <li>Copia tra storage accounts</li>
        </ul>`
      },
      {
        id: "day11-import-export",
        title: "Azure Import/Export",
        description: "Trasferimento dati con dischi fisici",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/import-export/storage-import-export-service",
        content: `<h4>Quando usarlo:</h4>
        <p>Per trasferire grandi quantità di dati (TB/PB) quando la rete è troppo lenta o costosa.</p>
        <h4>Processo di Import:</h4>
        <ol>
          <li>Prepara i dischi con WAImportExport tool</li>
          <li>Crea import job nel portale</li>
          <li>Spedisci i dischi al datacenter Azure</li>
          <li>Azure copia i dati e restituisce i dischi</li>
        </ol>
        <h4>Limitazioni:</h4>
        <ul>
          <li>Solo dischi SATA II/III (SSD o HDD)</li>
          <li>Supporta blob e Azure Files</li>
        </ul>`
      },
      {
        id: "day11-databox",
        title: "Azure Data Box",
        description: "Dispositivi per trasferimento offline",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/databox/data-box-overview",
        content: `<h4>Famiglia Data Box:</h4>
        <ul>
          <li><strong>Data Box Disk</strong>: fino a 35 TB (8 TB x 5 dischi)</li>
          <li><strong>Data Box</strong>: fino a 80 TB</li>
          <li><strong>Data Box Heavy</strong>: fino a 1 PB</li>
        </ul>
        <h4>Processo:</h4>
        <ol>
          <li>Ordina il dispositivo</li>
          <li>Ricevi e copia i dati</li>
          <li>Restituisci ad Azure</li>
          <li>Dati caricati automaticamente</li>
        </ol>
        <p>Crittografia AES 256-bit, cancellazione sicura dopo upload.</p>`
      }
    ],
    quiz: [
      {
        id: "q11-1",
        question: "Quale comando AzCopy sincronizza una directory mantenendo solo i file più recenti?",
        options: ["azcopy copy", "azcopy sync", "azcopy make", "azcopy mirror"],
        correctAnswer: 1,
        explanation: "azcopy sync sincronizza directory copiando solo i file modificati o mancanti nella destinazione."
      },
      {
        id: "q11-2",
        question: "Qual è la capacità massima di Azure Data Box (standard)?",
        options: ["35 TB", "80 TB", "100 TB", "1 PB"],
        correctAnswer: 1,
        explanation: "Azure Data Box standard ha una capacità utilizzabile di 80 TB. Per capacità maggiori, usa Data Box Heavy (1 PB)."
      },
      {
        id: "q11-3",
        question: "Azure Import/Export supporta quale tipo di storage?",
        options: ["Solo Blob", "Solo Azure Files", "Blob e Azure Files", "Tutti i servizi storage"],
        correctAnswer: 2,
        explanation: "Azure Import/Export supporta sia Azure Blob Storage che Azure Files per import e export di dati."
      }
    ]
  },
  // SETTIMANA 3: Compute (Giorni 12-18) - Abbreviato per spazio
  {
    day: 12,
    title: "Virtual Machines - Fondamenti",
    description: "Creazione e configurazione di VM Azure",
    category: "compute",
    topics: [
      {
        id: "day12-vm-basics",
        title: "Creazione di una VM",
        description: "Configurazione base di una macchina virtuale",
        duration: 30,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/overview",
        content: `<h4>Parametri principali:</h4>
        <ul>
          <li><strong>Size</strong>: CPU, RAM, disk (es. Standard_D2s_v3)</li>
          <li><strong>Image</strong>: OS (Windows, Linux)</li>
          <li><strong>Authentication</strong>: password o SSH key</li>
          <li><strong>Disk</strong>: OS disk + data disks</li>
          <li><strong>Networking</strong>: VNet, subnet, NSG, IP</li>
        </ul>
        <h4>Serie VM comuni:</h4>
        <ul>
          <li><strong>B-series</strong>: burstable, dev/test</li>
          <li><strong>D-series</strong>: general purpose</li>
          <li><strong>E-series</strong>: memory optimized</li>
          <li><strong>F-series</strong>: compute optimized</li>
        </ul>`
      },
      {
        id: "day12-disks",
        title: "Managed Disks",
        description: "Tipi di disco e configurazione",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview",
        content: `<h4>Tipi di disco:</h4>
        <ul>
          <li><strong>Ultra Disk</strong>: max performance, mission-critical</li>
          <li><strong>Premium SSD v2</strong>: flessibile IOPS/throughput</li>
          <li><strong>Premium SSD</strong>: produzione</li>
          <li><strong>Standard SSD</strong>: dev/test</li>
          <li><strong>Standard HDD</strong>: backup, non-critical</li>
        </ul>
        <h4>Encryption:</h4>
        <ul>
          <li>SSE (Server-Side Encryption): sempre attiva</li>
          <li>Azure Disk Encryption: BitLocker/DM-Crypt</li>
        </ul>`
      },
      {
        id: "day12-connect",
        title: "Connessione alle VM",
        description: "RDP, SSH, Bastion",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/bastion/bastion-overview",
        content: `<h4>Metodi di connessione:</h4>
        <ul>
          <li><strong>RDP</strong>: Windows (porta 3389)</li>
          <li><strong>SSH</strong>: Linux (porta 22)</li>
          <li><strong>Azure Bastion</strong>: via browser, no IP pubblico</li>
          <li><strong>Serial Console</strong>: troubleshooting</li>
        </ul>
        <h4>Azure Bastion:</h4>
        <p>Servizio PaaS che fornisce accesso RDP/SSH sicuro senza esporre porte pubbliche.</p>`
      }
    ],
    quiz: [
      {
        id: "q12-1",
        question: "Quale serie di VM è ottimizzata per workload memory-intensive?",
        options: ["B-series", "D-series", "E-series", "F-series"],
        correctAnswer: 2,
        explanation: "E-series VM sono ottimizzate per carichi di lavoro che richiedono molta RAM, come database in-memory."
      },
      {
        id: "q12-2",
        question: "Quale servizio permette connessione RDP/SSH senza IP pubblico sulla VM?",
        options: ["VPN Gateway", "Azure Bastion", "ExpressRoute", "NAT Gateway"],
        correctAnswer: 1,
        explanation: "Azure Bastion fornisce connettività RDP/SSH sicura via browser, senza necessità di IP pubblici sulle VM."
      },
      {
        id: "q12-3",
        question: "Quale tipo di disco offre le massime prestazioni?",
        options: ["Premium SSD", "Standard SSD", "Ultra Disk", "Standard HDD"],
        correctAnswer: 2,
        explanation: "Ultra Disk offre le massime prestazioni con IOPS fino a 160.000 e throughput fino a 2.000 MB/s."
      }
    ]
  },
  // Giorni 13-30 seguono lo stesso pattern...
  // Li aggiungo in forma abbreviata per completezza
  {
    day: 13,
    title: "VM Availability",
    description: "Alta disponibilità per le macchine virtuali",
    category: "compute",
    topics: [
      {
        id: "day13-availability-sets",
        title: "Availability Sets",
        description: "Protezione da guasti hardware",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview",
        content: `<h4>Availability Set:</h4>
        <p>Raggruppa VM per proteggerle da guasti hardware e manutenzione.</p>
        <h4>Concetti chiave:</h4>
        <ul>
          <li><strong>Fault Domain (FD)</strong>: rack fisico separato (max 3)</li>
          <li><strong>Update Domain (UD)</strong>: gruppo riavviato insieme (max 20)</li>
        </ul>
        <h4>SLA:</h4>
        <p>99.95% con 2+ VM in un availability set.</p>`
      },
      {
        id: "day13-availability-zones",
        title: "Availability Zones",
        description: "Protezione da guasti datacenter",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview",
        content: `<h4>Availability Zones:</h4>
        <p>Datacenter fisicamente separati nella stessa region.</p>
        <ul>
          <li>Almeno 3 zone per region (dove disponibile)</li>
          <li>Alimentazione, rete e raffreddamento indipendenti</li>
          <li>SLA 99.99% con VM distribuite su più zone</li>
        </ul>`
      },
      {
        id: "day13-vmss",
        title: "Virtual Machine Scale Sets",
        description: "Scaling automatico delle VM",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview",
        content: `<h4>VMSS:</h4>
        <p>Gruppo di VM identiche con auto-scaling.</p>
        <h4>Caratteristiche:</h4>
        <ul>
          <li>Fino a 1000 VM per scale set</li>
          <li>Autoscale basato su metriche o schedule</li>
          <li>Integrazione con Load Balancer</li>
          <li>Supporta Availability Zones</li>
        </ul>`
      }
    ],
    quiz: [
      {
        id: "q13-1",
        question: "Qual è il numero massimo di Fault Domain in un Availability Set?",
        options: ["2", "3", "5", "20"],
        correctAnswer: 1,
        explanation: "Un Availability Set supporta fino a 3 Fault Domain, ognuno rappresenta un rack fisico separato."
      },
      {
        id: "q13-2",
        question: "Quale SLA è garantito per VM distribuite su Availability Zones?",
        options: ["99.9%", "99.95%", "99.99%", "99.999%"],
        correctAnswer: 2,
        explanation: "VM distribuite su Availability Zones hanno un SLA del 99.99% uptime."
      },
      {
        id: "q13-3",
        question: "Quante VM può contenere un Virtual Machine Scale Set?",
        options: ["100", "500", "1000", "5000"],
        correctAnswer: 2,
        explanation: "Un VMSS può contenere fino a 1000 istanze VM con immagini standard della piattaforma."
      }
    ]
  },
  // Continuo con gli altri giorni in modo sintetico
  {
    day: 14,
    title: "VM Extensions e Custom Script",
    description: "Automazione post-deployment delle VM",
    category: "compute",
    topics: [
      { id: "day14-extensions", title: "VM Extensions", description: "Estensioni per configurare VM", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/overview", content: "<p>VM Extensions permettono di automatizzare la configurazione post-deployment: installazione software, configurazione, monitoring.</p><ul><li><strong>Custom Script Extension</strong>: esegue script</li><li><strong>DSC Extension</strong>: PowerShell Desired State Configuration</li><li><strong>Azure Monitor Agent</strong>: raccolta log e metriche</li></ul>" },
      { id: "day14-custom-script", title: "Custom Script Extension", description: "Eseguire script su VM", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/custom-script-windows", content: "<p>Scarica ed esegue script dalla rete o da Azure Storage.</p><ul><li>Timeout: 90 minuti</li><li>Supporta PowerShell (Windows) e Bash (Linux)</li><li>Un'unica CSE per VM</li></ul>" },
      { id: "day14-cloud-init", title: "Cloud-init", description: "Configurazione iniziale Linux", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/linux/using-cloud-init", content: "<p>Standard per inizializzazione VM Linux. Esegue al primo boot: installa pacchetti, crea utenti, esegue comandi.</p>" }
    ],
    quiz: [
      { id: "q14-1", question: "Qual è il timeout massimo per Custom Script Extension?", options: ["30 minuti", "60 minuti", "90 minuti", "120 minuti"], correctAnswer: 2, explanation: "Custom Script Extension ha un timeout massimo di 90 minuti per completare l'esecuzione." },
      { id: "q14-2", question: "Quante Custom Script Extension possono essere attive su una VM?", options: ["1", "3", "5", "Illimitate"], correctAnswer: 0, explanation: "Solo una Custom Script Extension può essere attiva per VM alla volta." }
    ]
  },
  {
    day: 15,
    title: "Azure App Service",
    description: "Piattaforma PaaS per applicazioni web",
    category: "compute",
    topics: [
      { id: "day15-basics", title: "App Service Basics", description: "Introduzione ad App Service", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview", content: "<p>PaaS per hosting di web app, REST API, mobile backends.</p><ul><li>Supporta .NET, Java, Node.js, Python, PHP</li><li>Auto-scaling e load balancing integrati</li><li>CI/CD con GitHub, Azure DevOps</li><li>SSL/TLS, custom domains</li></ul>" },
      { id: "day15-plans", title: "App Service Plans", description: "Piani e pricing", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans", content: "<ul><li><strong>Free/Shared</strong>: dev/test, risorse condivise</li><li><strong>Basic</strong>: dedicato, no scaling</li><li><strong>Standard</strong>: produzione, autoscale</li><li><strong>Premium</strong>: high performance, VNet</li><li><strong>Isolated</strong>: App Service Environment</li></ul>" },
      { id: "day15-deployment", title: "Deployment Options", description: "Opzioni di deploy", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices", content: "<ul><li>Git push, GitHub Actions, Azure DevOps</li><li>FTP, ZIP deploy, Run from package</li><li>Container deployment</li><li>Deployment slots per staging</li></ul>" }
    ],
    quiz: [
      { id: "q15-1", question: "Quale tier di App Service supporta l'autoscaling?", options: ["Free", "Shared", "Basic", "Standard"], correctAnswer: 3, explanation: "Standard tier e superiori supportano l'autoscaling automatico." },
      { id: "q15-2", question: "Quale tier è richiesto per App Service Environment (ASE)?", options: ["Premium", "PremiumV2", "Isolated", "Standard"], correctAnswer: 2, explanation: "App Service Environment richiede il tier Isolated per l'isolamento completo della rete." }
    ]
  },
  {
    day: 16,
    title: "Deployment Slots",
    description: "Staging e deployment senza downtime",
    category: "compute",
    topics: [
      { id: "day16-slots", title: "Deployment Slots", description: "Ambienti di staging", duration: 30, msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots", content: "<p>Slot separati per staging, testing, produzione.</p><ul><li>Ogni slot ha URL unico</li><li>Swap istantaneo tra slot</li><li>Swap con preview per validazione</li><li>Auto swap per CD</li></ul>" },
      { id: "day16-settings", title: "Slot Settings", description: "Configurazioni per slot", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots", content: "<p>Alcune impostazioni seguono lo swap, altre restano con lo slot.</p><ul><li><strong>Swapped</strong>: app settings (default), connection strings</li><li><strong>Slot-specific</strong>: custom domain, SSL, scale settings</li></ul>" },
      { id: "day16-traffic", title: "Traffic Routing", description: "Routing percentuale del traffico", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots", content: "<p>Invia una percentuale del traffico a slot diversi per testing A/B o canary deployment.</p>" }
    ],
    quiz: [
      { id: "q16-1", question: "Quanti deployment slot sono inclusi nel tier Standard?", options: ["0", "5", "10", "20"], correctAnswer: 1, explanation: "Standard tier include 5 deployment slot. Premium ne include 20." },
      { id: "q16-2", question: "Quale impostazione NON viene swappata tra slot?", options: ["App Settings", "Connection Strings", "Custom Domain", "Handler Mappings"], correctAnswer: 2, explanation: "Custom domains e SSL bindings sono slot-specific e non vengono swappati." }
    ]
  },
  {
    day: 17,
    title: "Container Instances e ACR",
    description: "Container serverless e registry",
    category: "compute",
    topics: [
      { id: "day17-aci", title: "Azure Container Instances", description: "Container senza gestire VM", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview", content: "<p>Esegui container senza gestire l'infrastruttura.</p><ul><li>Avvio in secondi</li><li>Fatturazione per secondo</li><li>Container groups per multi-container</li><li>Supporta Linux e Windows</li></ul>" },
      { id: "day17-acr", title: "Azure Container Registry", description: "Registry privato per immagini", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-intro", content: "<ul><li><strong>Basic</strong>: dev/test</li><li><strong>Standard</strong>: produzione</li><li><strong>Premium</strong>: geo-replication, private link</li></ul><p>Supporta Docker e OCI images, Helm charts.</p>" },
      { id: "day17-tasks", title: "ACR Tasks", description: "Build automatiche di immagini", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-tasks-overview", content: "<p>Build e push automatici di container images su commit o base image update.</p>" }
    ],
    quiz: [
      { id: "q17-1", question: "Quale tier di ACR supporta la geo-replication?", options: ["Basic", "Standard", "Premium", "Tutti"], correctAnswer: 2, explanation: "Solo il tier Premium di Azure Container Registry supporta la geo-replication." },
      { id: "q17-2", question: "Come vengono fatturati i Container Instances?", options: ["Per ora", "Per minuto", "Per secondo", "Flat mensile"], correctAnswer: 2, explanation: "Azure Container Instances sono fatturati per secondo, basato su CPU e memoria allocate." }
    ]
  },
  {
    day: 18,
    title: "Azure Kubernetes Service",
    description: "Orchestrazione container gestita",
    category: "compute",
    topics: [
      { id: "day18-aks-basics", title: "AKS Basics", description: "Introduzione a Kubernetes su Azure", duration: 30, msLearnUrl: "https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes", content: "<p>Servizio Kubernetes gestito. Azure gestisce il control plane, tu gestisci i node.</p><ul><li>Control plane gratuito</li><li>Paghi solo per i node (VM)</li><li>Integrazione con Azure AD, ACR, Monitor</li></ul>" },
      { id: "day18-networking", title: "AKS Networking", description: "Opzioni di rete per AKS", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/aks/concepts-network", content: "<ul><li><strong>Kubenet</strong>: rete semplice, NAT per pod</li><li><strong>Azure CNI</strong>: pod con IP dalla VNet</li><li><strong>Azure CNI Overlay</strong>: scalabilità maggiore</li></ul>" },
      { id: "day18-scaling", title: "AKS Scaling", description: "Scaling di nodi e pod", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/aks/concepts-scale", content: "<ul><li><strong>Cluster Autoscaler</strong>: scala i nodi</li><li><strong>Horizontal Pod Autoscaler</strong>: scala i pod</li><li><strong>KEDA</strong>: event-driven scaling</li></ul>" }
    ],
    quiz: [
      { id: "q18-1", question: "Cosa è incluso gratuitamente in AKS?", options: ["Node pool", "Control plane", "Load Balancer", "Storage"], correctAnswer: 1, explanation: "Il control plane di AKS è gratuito. Paghi solo per le VM dei node e le risorse Azure usate." },
      { id: "q18-2", question: "Quale plugin di rete assegna IP della VNet direttamente ai pod?", options: ["Kubenet", "Azure CNI", "Calico", "Flannel"], correctAnswer: 1, explanation: "Azure CNI assegna IP dalla VNet Azure direttamente ai pod, permettendo comunicazione diretta." }
    ]
  },
  // SETTIMANA 4: Networking (Giorni 19-24)
  {
    day: 19,
    title: "Virtual Networks e Subnets",
    description: "Fondamenti del networking Azure",
    category: "networking",
    topics: [
      { id: "day19-vnet", title: "Virtual Networks", description: "Creare e configurare VNet", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview", content: "<p>VNet è il blocco fondamentale per le reti private in Azure.</p><ul><li>Isolamento e segmentazione</li><li>Comunicazione con internet e on-premises</li><li>Range IP: spazio indirizzi privato (10.x, 172.16-31.x, 192.168.x)</li></ul>" },
      { id: "day19-subnets", title: "Subnets", description: "Segmentazione della rete", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-vnet-plan-design-arm", content: "<p>Suddividi la VNet in subnet per organizzazione e sicurezza.</p><ul><li>Ogni subnet ha un range di IP</li><li>5 IP riservati per subnet</li><li>NSG e Route Table per subnet</li></ul>" },
      { id: "day19-ip", title: "IP Addressing", description: "IP pubblici e privati", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses", content: "<ul><li><strong>Private IP</strong>: comunicazione interna</li><li><strong>Public IP</strong>: comunicazione internet</li><li><strong>SKU Basic</strong>: dinamico, no zone</li><li><strong>SKU Standard</strong>: statico, zone-redundant</li></ul>" }
    ],
    quiz: [
      { id: "q19-1", question: "Quanti indirizzi IP sono riservati da Azure in ogni subnet?", options: ["3", "4", "5", "8"], correctAnswer: 2, explanation: "Azure riserva 5 IP in ogni subnet: network, gateway, DNS x2, broadcast." },
      { id: "q19-2", question: "Quale SKU di Public IP è zone-redundant?", options: ["Basic", "Standard", "Premium", "Entrambi"], correctAnswer: 1, explanation: "Solo Standard SKU supporta zone-redundancy per alta disponibilità." }
    ]
  },
  {
    day: 20,
    title: "Network Security Groups",
    description: "Firewall a livello di rete",
    category: "networking",
    topics: [
      { id: "day20-nsg", title: "NSG Basics", description: "Regole di sicurezza di rete", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview", content: "<p>Filtra traffico in entrata e uscita per subnet e NIC.</p><ul><li>Regole: priority, source, dest, port, action</li><li>Priority: 100-4096 (più basso = più prioritario)</li><li>Stateful: risposta automatica permessa</li></ul>" },
      { id: "day20-asg", title: "Application Security Groups", description: "Raggruppare VM per policy", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups", content: "<p>Raggruppa VM logicamente per semplificare le regole NSG.</p><p>Invece di specificare IP, usi ASG come source/destination.</p>" },
      { id: "day20-default", title: "Regole Predefinite", description: "Regole NSG di default", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview", content: "<p>Regole di default (non eliminabili):</p><ul><li>AllowVNetInBound/OutBound</li><li>AllowAzureLoadBalancerInBound</li><li>DenyAllInBound (65500)</li></ul>" }
    ],
    quiz: [
      { id: "q20-1", question: "Qual è il range di priority per le regole NSG?", options: ["1-1000", "100-4096", "1-65535", "0-10000"], correctAnswer: 1, explanation: "Le regole NSG hanno priority da 100 a 4096. Regole di default usano 65000+." },
      { id: "q20-2", question: "Gli NSG sono stateful o stateless?", options: ["Stateful", "Stateless", "Dipende dalla regola", "Configurabile"], correctAnswer: 0, explanation: "NSG sono stateful: se permetti traffico inbound, la risposta outbound è automaticamente permessa." }
    ]
  },
  {
    day: 21,
    title: "Azure DNS",
    description: "Hosting DNS e risoluzione nomi",
    category: "networking",
    topics: [
      { id: "day21-public-dns", title: "Azure Public DNS", description: "Hosting zone DNS pubbliche", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/dns/dns-overview", content: "<p>Hosting di zone DNS con infrastruttura Azure globale.</p><ul><li>SLA 100%</li><li>Anycast networking</li><li>Integrazione con altri servizi Azure</li><li>Record: A, AAAA, CNAME, MX, TXT, etc.</li></ul>" },
      { id: "day21-private-dns", title: "Private DNS Zones", description: "Risoluzione nomi interna", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/dns/private-dns-overview", content: "<p>Risoluzione DNS all'interno delle VNet senza DNS custom.</p><ul><li>Link a una o più VNet</li><li>Auto-registration per VM</li><li>Split-horizon DNS</li></ul>" },
      { id: "day21-alias", title: "Alias Records", description: "Record alias per risorse Azure", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/dns/dns-alias", content: "<p>Punta direttamente a risorse Azure (Public IP, Traffic Manager, CDN).</p><p>Si aggiorna automaticamente se l'IP cambia.</p>" }
    ],
    quiz: [
      { id: "q21-1", question: "Qual è lo SLA di Azure DNS?", options: ["99.9%", "99.95%", "99.99%", "100%"], correctAnswer: 3, explanation: "Azure DNS ha uno SLA del 100% per le query DNS." },
      { id: "q21-2", question: "Quale funzionalità registra automaticamente i record DNS per le VM?", options: ["Alias Records", "Auto-registration", "Dynamic DNS", "DNS Proxy"], correctAnswer: 1, explanation: "Auto-registration nelle Private DNS Zones crea automaticamente record A per le VM nella VNet linkata." }
    ]
  },
  {
    day: 22,
    title: "VNet Peering e VPN Gateway",
    description: "Connettività tra reti",
    category: "networking",
    topics: [
      { id: "day22-peering", title: "VNet Peering", description: "Connettere VNet direttamente", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview", content: "<ul><li><strong>Regional peering</strong>: stessa region</li><li><strong>Global peering</strong>: region diverse</li><li>Traffico su backbone Microsoft (privato)</li><li>Non transitivo (A-B, B-C non implica A-C)</li></ul>" },
      { id: "day22-vpn", title: "VPN Gateway", description: "Connessione sicura site-to-site", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways", content: "<ul><li><strong>Point-to-Site (P2S)</strong>: client singoli</li><li><strong>Site-to-Site (S2S)</strong>: reti on-premises</li><li><strong>VNet-to-VNet</strong>: tra VNet (alternativa a peering)</li></ul><p>Richiede GatewaySubnet dedicata.</p>" },
      { id: "day22-expressroute", title: "ExpressRoute", description: "Connessione privata dedicata", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction", content: "<p>Connessione privata tramite provider, non passa su internet.</p><ul><li>Bandwidth fino a 100 Gbps</li><li>Latenza prevedibile</li><li>Global Reach per connettere sedi</li></ul>" }
    ],
    quiz: [
      { id: "q22-1", question: "Il VNet peering è transitivo?", options: ["Sì, sempre", "No, mai", "Solo con Global peering", "Solo con Hub-spoke"], correctAnswer: 1, explanation: "VNet peering non è transitivo. Per connettività transitiva serve un hub VNet con routing." },
      { id: "q22-2", question: "Quale subnet è richiesta per VPN Gateway?", options: ["DefaultSubnet", "GatewaySubnet", "VPNSubnet", "ManagementSubnet"], correctAnswer: 1, explanation: "VPN Gateway richiede una subnet chiamata esattamente 'GatewaySubnet'." }
    ]
  },
  {
    day: 23,
    title: "Azure Load Balancer",
    description: "Bilanciamento del carico L4",
    category: "networking",
    topics: [
      { id: "day23-lb-basics", title: "Load Balancer Basics", description: "Concetti fondamentali", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview", content: "<p>Load balancer Layer 4 (TCP/UDP).</p><ul><li><strong>Public LB</strong>: traffico internet</li><li><strong>Internal LB</strong>: traffico interno VNet</li><li><strong>SKU Basic</strong>: limitato, gratuito</li><li><strong>SKU Standard</strong>: produzione, zone-aware</li></ul>" },
      { id: "day23-rules", title: "Load Balancing Rules", description: "Configurare regole e probe", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/components", content: "<ul><li><strong>Frontend IP</strong>: IP di ingresso</li><li><strong>Backend Pool</strong>: VM target</li><li><strong>Health Probe</strong>: verifica stato backend</li><li><strong>Rules</strong>: port mapping e distribution</li></ul>" },
      { id: "day23-nat", title: "NAT Rules", description: "Port forwarding diretto", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/inbound-nat-rules", content: "<p>Inbound NAT rules per accesso diretto a VM specifiche (es. RDP su porte diverse).</p>" }
    ],
    quiz: [
      { id: "q23-1", question: "A quale layer opera Azure Load Balancer?", options: ["Layer 3", "Layer 4", "Layer 7", "Layer 2"], correctAnswer: 1, explanation: "Azure Load Balancer opera al Layer 4 (Transport), bilanciando traffico TCP/UDP." },
      { id: "q23-2", question: "Quale SKU è richiesto per zone-redundancy?", options: ["Basic", "Standard", "Premium", "Entrambi"], correctAnswer: 1, explanation: "Solo lo SKU Standard supporta Availability Zones e zone-redundancy." }
    ]
  },
  {
    day: 24,
    title: "Application Gateway",
    description: "Bilanciamento del carico L7",
    category: "networking",
    topics: [
      { id: "day24-appgw", title: "Application Gateway", description: "Load balancer Layer 7", duration: 30, msLearnUrl: "https://learn.microsoft.com/en-us/azure/application-gateway/overview", content: "<p>Load balancer applicativo (HTTP/HTTPS).</p><ul><li>SSL termination</li><li>URL-based routing</li><li>Cookie-based session affinity</li><li>Web Application Firewall (WAF)</li></ul>" },
      { id: "day24-waf", title: "Web Application Firewall", description: "Protezione applicazioni web", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/web-application-firewall/ag/ag-overview", content: "<p>Protezione da attacchi web comuni (OWASP Top 10).</p><ul><li>SQL injection</li><li>Cross-site scripting (XSS)</li><li>Rule sets gestiti o custom</li></ul>" },
      { id: "day24-traffic", title: "Traffic Manager", description: "DNS-based load balancing", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview", content: "<p>Distribuzione traffico globale basata su DNS.</p><ul><li>Priority, Weighted, Performance, Geographic routing</li><li>Endpoint: Azure, External, Nested</li></ul>" }
    ],
    quiz: [
      { id: "q24-1", question: "A quale layer opera Application Gateway?", options: ["Layer 4", "Layer 5", "Layer 7", "Layer 3"], correctAnswer: 2, explanation: "Application Gateway opera al Layer 7 (Application), gestendo traffico HTTP/HTTPS." },
      { id: "q24-2", question: "Quale funzionalità protegge da SQL injection?", options: ["NSG", "WAF", "DDoS Protection", "Azure Firewall"], correctAnswer: 1, explanation: "Web Application Firewall (WAF) protegge da attacchi web come SQL injection e XSS." }
    ]
  },
  // SETTIMANA 5: Monitoring e Ripasso (Giorni 25-30)
  {
    day: 25,
    title: "Azure Monitor",
    description: "Monitoring e osservabilità",
    category: "monitoring",
    topics: [
      { id: "day25-monitor", title: "Azure Monitor", description: "Piattaforma di monitoring unificata", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview", content: "<p>Raccoglie e analizza dati di telemetria da Azure e on-premises.</p><ul><li><strong>Metrics</strong>: dati numerici time-series</li><li><strong>Logs</strong>: dati strutturati in Log Analytics</li><li><strong>Traces</strong>: application insights</li></ul>" },
      { id: "day25-logs", title: "Log Analytics", description: "Query e analisi dei log", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview", content: "<p>Workspace per raccolta e analisi log.</p><ul><li>Kusto Query Language (KQL)</li><li>Retention configurabile</li><li>Integrazione con altri servizi</li></ul>" },
      { id: "day25-insights", title: "Insights", description: "Monitoring specializzato", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vminsights-overview", content: "<ul><li><strong>VM Insights</strong>: performance e dipendenze VM</li><li><strong>Container Insights</strong>: AKS monitoring</li><li><strong>Application Insights</strong>: APM per applicazioni</li></ul>" }
    ],
    quiz: [
      { id: "q25-1", question: "Quale linguaggio si usa per query in Log Analytics?", options: ["SQL", "KQL", "PowerShell", "Python"], correctAnswer: 1, explanation: "Log Analytics usa Kusto Query Language (KQL) per le query sui dati." },
      { id: "q25-2", question: "Quale Insight monitora le performance delle VM?", options: ["Application Insights", "VM Insights", "Container Insights", "Network Insights"], correctAnswer: 1, explanation: "VM Insights fornisce monitoring dettagliato di performance e dipendenze per le VM." }
    ]
  },
  {
    day: 26,
    title: "Alerts e Action Groups",
    description: "Notifiche e automazione",
    category: "monitoring",
    topics: [
      { id: "day26-alerts", title: "Azure Alerts", description: "Configurare avvisi", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview", content: "<ul><li><strong>Metric alerts</strong>: soglie su metriche</li><li><strong>Log alerts</strong>: query KQL</li><li><strong>Activity log alerts</strong>: eventi Azure</li><li><strong>Smart detection</strong>: anomalie automatiche</li></ul>" },
      { id: "day26-actions", title: "Action Groups", description: "Azioni in risposta agli alert", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups", content: "<ul><li>Email, SMS, Push notification</li><li>Azure Function, Logic App</li><li>Webhook, ITSM</li><li>Automation Runbook</li></ul>" },
      { id: "day26-autoscale", title: "Autoscale", description: "Scaling automatico basato su metriche", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-overview", content: "<p>Scala automaticamente risorse basandosi su metriche o schedule.</p><ul><li>Scale out/in rules</li><li>Min/max instance count</li><li>Cooldown period</li></ul>" }
    ],
    quiz: [
      { id: "q26-1", question: "Quale tipo di alert usa query KQL?", options: ["Metric alert", "Log alert", "Activity log alert", "Smart detection"], correctAnswer: 1, explanation: "Log alerts usano query KQL su Log Analytics per determinare quando attivare l'avviso." },
      { id: "q26-2", question: "Cosa definisce un Action Group?", options: ["Soglie degli alert", "Azioni da eseguire", "Risorse da monitorare", "Query KQL"], correctAnswer: 1, explanation: "Action Groups definiscono le azioni da eseguire quando un alert viene attivato (email, webhook, etc.)." }
    ]
  },
  {
    day: 27,
    title: "Azure Backup",
    description: "Protezione dati con backup",
    category: "monitoring",
    topics: [
      { id: "day27-backup", title: "Azure Backup", description: "Servizio di backup gestito", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/backup/backup-overview", content: "<p>Backup centralizzato per workload Azure e on-premises.</p><ul><li>Recovery Services Vault</li><li>Backup policies</li><li>Geo-redundant storage</li></ul>" },
      { id: "day27-vm-backup", title: "VM Backup", description: "Backup di macchine virtuali", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-introduction", content: "<ul><li>Snapshot-based backup</li><li>Application-consistent (VSS)</li><li>Instant restore</li><li>Cross-region restore</li></ul>" },
      { id: "day27-restore", title: "Restore Options", description: "Opzioni di ripristino", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-restore-vms", content: "<ul><li><strong>Create new VM</strong>: nuova VM dal backup</li><li><strong>Replace existing</strong>: sostituisci dischi</li><li><strong>Restore disks</strong>: solo dischi</li><li><strong>Cross-region</strong>: ripristina in altra region</li></ul>" }
    ],
    quiz: [
      { id: "q27-1", question: "Dove vengono archiviati i backup di Azure Backup?", options: ["Storage Account", "Recovery Services Vault", "Blob Container", "Data Lake"], correctAnswer: 1, explanation: "Azure Backup archivia i dati in un Recovery Services Vault." },
      { id: "q27-2", question: "Quale tipo di backup è application-consistent per le VM?", options: ["Crash-consistent", "File-consistent", "Application-consistent con VSS", "Incremental"], correctAnswer: 2, explanation: "Azure Backup usa VSS (Volume Shadow Copy Service) per backup application-consistent." }
    ]
  },
  {
    day: 28,
    title: "Azure Site Recovery",
    description: "Disaster recovery",
    category: "monitoring",
    topics: [
      { id: "day28-asr", title: "Site Recovery Basics", description: "Disaster recovery as a service", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview", content: "<p>Replica e failover per business continuity.</p><ul><li>Azure to Azure DR</li><li>On-premises to Azure</li><li>RPO/RTO configurabili</li></ul>" },
      { id: "day28-replication", title: "Replication", description: "Configurare la replica", duration: 25, msLearnUrl: "https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication", content: "<ul><li>Continuous replication</li><li>Recovery points retention</li><li>Replication policy</li><li>Consistency points</li></ul>" },
      { id: "day28-failover", title: "Failover e Failback", description: "Eseguire DR", duration: 15, msLearnUrl: "https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback", content: "<ul><li><strong>Test failover</strong>: verifica senza impatto</li><li><strong>Planned failover</strong>: migrazione controllata</li><li><strong>Unplanned failover</strong>: emergenza</li><li><strong>Failback</strong>: ritorno al sito primario</li></ul>" }
    ],
    quiz: [
      { id: "q28-1", question: "Cosa indica RPO (Recovery Point Objective)?", options: ["Tempo di ripristino", "Perdita dati accettabile", "Costo del DR", "Numero di repliche"], correctAnswer: 1, explanation: "RPO indica la quantità massima di dati che puoi permetterti di perdere (in tempo)." },
      { id: "q28-2", question: "Quale tipo di failover non impatta la produzione?", options: ["Planned failover", "Unplanned failover", "Test failover", "Forced failover"], correctAnswer: 2, explanation: "Test failover crea VM in una rete isolata senza impattare la produzione." }
    ]
  },
  {
    day: 29,
    title: "Ripasso Generale",
    description: "Revisione degli argomenti principali",
    category: "monitoring",
    topics: [
      { id: "day29-identity-review", title: "Review: Identity & Governance", description: "Ripasso Azure AD, RBAC, Policy", duration: 30, msLearnUrl: "https://learn.microsoft.com/en-us/certifications/exams/az-104", content: "<p>Rivedi i concetti chiave:</p><ul><li>Azure AD: utenti, gruppi, ruoli</li><li>RBAC: scope, roles, assignments</li><li>Azure Policy: effects, initiatives</li><li>Management Groups e subscriptions</li></ul>" },
      { id: "day29-storage-compute-review", title: "Review: Storage & Compute", description: "Ripasso Storage, VM, App Service", duration: 30, msLearnUrl: "https://learn.microsoft.com/en-us/certifications/exams/az-104", content: "<p>Rivedi i concetti chiave:</p><ul><li>Storage: tiers, replication, security</li><li>VM: sizing, availability, extensions</li><li>App Service: plans, slots, deployment</li><li>Containers: ACI, ACR, AKS</li></ul>" },
      { id: "day29-network-monitor-review", title: "Review: Network & Monitor", description: "Ripasso VNet, LB, Monitor", duration: 30, msLearnUrl: "https://learn.microsoft.com/en-us/certifications/exams/az-104", content: "<p>Rivedi i concetti chiave:</p><ul><li>VNet: peering, VPN, ExpressRoute</li><li>NSG, Load Balancer, App Gateway</li><li>Azure Monitor, Log Analytics</li><li>Backup e Site Recovery</li></ul>" }
    ],
    quiz: [
      { id: "q29-1", question: "Quale servizio gestisce identità e accessi in Azure?", options: ["Azure AD", "Azure Policy", "RBAC", "Key Vault"], correctAnswer: 0, explanation: "Azure Active Directory (Azure AD) è il servizio di identity and access management." },
      { id: "q29-2", question: "Quale tier di storage ha il costo di accesso più basso?", options: ["Archive", "Cool", "Hot", "Premium"], correctAnswer: 2, explanation: "Hot tier ha i costi di accesso più bassi ma storage più costoso, ideale per dati frequentemente acceduti." }
    ]
  },
  {
    day: 30,
    title: "Simulazione Esame",
    description: "Pratica finale con domande d'esame",
    category: "monitoring",
    topics: [
      { id: "day30-exam-tips", title: "Exam Tips", description: "Consigli per l'esame", duration: 20, msLearnUrl: "https://learn.microsoft.com/en-us/certifications/exams/az-104", content: "<h4>Consigli per il giorno dell'esame:</h4><ul><li>Leggi attentamente ogni domanda</li><li>Gestisci il tempo (circa 2 min per domanda)</li><li>Usa 'Flag for review' per domande difficili</li><li>Non lasciare risposte vuote</li><li>Attenzione a 'NOT', 'LEAST', 'MOST'</li></ul>" },
      { id: "day30-practice", title: "Practice Questions", description: "Domande di pratica", duration: 60, msLearnUrl: "https://learn.microsoft.com/en-us/certifications/practice-assessments-for-microsoft-certifications", content: "<p>Usa le practice assessment ufficiali di Microsoft Learn per testare la tua preparazione.</p><p>L'esame reale ha circa 40-60 domande, 150 minuti, passing score ~700/1000.</p>" },
      { id: "day30-resources", title: "Additional Resources", description: "Risorse aggiuntive", duration: 10, msLearnUrl: "https://learn.microsoft.com/en-us/certifications/exams/az-104", content: "<ul><li>Microsoft Learn practice assessments</li><li>Azure documentation</li><li>Hands-on labs in Azure Portal</li><li>Azure free account per pratica</li></ul>" }
    ],
    quiz: [
      { id: "q30-1", question: "Qual è il punteggio minimo per passare AZ-104?", options: ["600", "700", "800", "850"], correctAnswer: 1, explanation: "Il punteggio minimo per passare l'esame AZ-104 è 700 su 1000." },
      { id: "q30-2", question: "Quante domande ha tipicamente l'esame AZ-104?", options: ["20-30", "40-60", "80-100", "100+"], correctAnswer: 1, explanation: "L'esame AZ-104 ha tipicamente tra 40 e 60 domande." }
    ]
  }
];
