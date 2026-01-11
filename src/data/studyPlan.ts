import type { Day } from '../types';

// I contenuti HTML sono caricati dinamicamente da src/data/content/
// Usa loadTopicContent() da contentLoader.ts per caricare i contenuti

export const studyPlan: Day[] = [
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
        msLearnUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users"
      },
      {
        id: "day1-groups",
        title: "Gruppi Azure AD",
        description: "Tipi di gruppi e membership",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/groups-view-azure-portal"
      },
      {
        id: "day1-bulk",
        title: "Operazioni Bulk",
        description: "Creare utenti e gruppi in blocco",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-add"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview"
      },
      {
        id: "day2-custom-roles",
        title: "Ruoli Personalizzati",
        description: "Creare custom roles in Azure",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles"
      },
      {
        id: "day2-aad-roles",
        title: "Azure AD Roles vs Azure Roles",
        description: "Differenza tra ruoli Azure AD e Azure RBAC",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources"
      },
      {
        id: "day3-mgmt-groups",
        title: "Management Groups",
        description: "Organizzazione gerarchica delle subscription",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview"
      },
      {
        id: "day3-resource-groups",
        title: "Resource Groups",
        description: "Container per le risorse Azure",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/overview"
      },
      {
        id: "day4-initiatives",
        title: "Policy Initiatives",
        description: "Raggruppare policy in iniziative",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/concepts/initiative-definition-structure"
      },
      {
        id: "day4-compliance",
        title: "Compliance e Remediation",
        description: "Monitorare e correggere la compliance",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources"
      },
      {
        id: "day5-locks",
        title: "Resource Locks",
        description: "Proteggere risorse da modifiche accidentali",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources"
      },
      {
        id: "day5-move",
        title: "Spostare Risorse",
        description: "Move di risorse tra resource group e subscription",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis"
      },
      {
        id: "day6-budgets",
        title: "Budgets e Alerts",
        description: "Configurare budget e notifiche",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets"
      },
      {
        id: "day6-savings",
        title: "Risparmiare su Azure",
        description: "Strategie per ottimizzare i costi",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/cost-mgt-best-practices"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview"
      },
      {
        id: "day7-replication",
        title: "Replication e Ridondanza",
        description: "Opzioni di ridondanza per la durabilità",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy"
      },
      {
        id: "day7-config",
        title: "Configurazione Storage Account",
        description: "Networking, sicurezza e opzioni avanzate",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction"
      },
      {
        id: "day8-lifecycle",
        title: "Lifecycle Management",
        description: "Automatizzare la gestione dei blob",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview"
      },
      {
        id: "day8-versioning",
        title: "Versioning e Soft Delete",
        description: "Proteggere i dati da eliminazioni accidentali",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction"
      },
      {
        id: "day9-identity",
        title: "Autenticazione Azure Files",
        description: "Opzioni di autenticazione per le condivisioni",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview"
      },
      {
        id: "day9-sync",
        title: "Azure File Sync",
        description: "Sincronizzare file server on-premises",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/file-sync/file-sync-introduction"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-auth"
      },
      {
        id: "day10-sas",
        title: "Shared Access Signatures",
        description: "Tipi di SAS e configurazione",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview"
      },
      {
        id: "day10-encryption",
        title: "Encryption",
        description: "Crittografia at rest e in transit",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10"
      },
      {
        id: "day11-import-export",
        title: "Azure Import/Export",
        description: "Trasferimento dati con dischi fisici",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/import-export/storage-import-export-service"
      },
      {
        id: "day11-databox",
        title: "Azure Data Box",
        description: "Dispositivi per trasferimento offline",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/databox/data-box-overview"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/overview"
      },
      {
        id: "day12-disks",
        title: "Managed Disks",
        description: "Tipi di disco e configurazione",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview"
      },
      {
        id: "day12-connect",
        title: "Connessione alle VM",
        description: "RDP, SSH, Bastion",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/bastion/bastion-overview"
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
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview"
      },
      {
        id: "day13-availability-zones",
        title: "Availability Zones",
        description: "Protezione da guasti datacenter",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview"
      },
      {
        id: "day13-vmss",
        title: "Virtual Machine Scale Sets",
        description: "Scaling automatico delle VM",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview"
      }
    ],
    quiz: [
      {
        id: "q13-1",
        question: "Qual è il numero massimo di Fault Domain in un Availability Set (ARM)?",
        options: ["2", "3", "5", "20"],
        correctAnswer: 1,
        explanation: "Un Availability Set supporta fino a 3 Fault Domain (in base alla region), ognuno rappresenta un rack fisico separato."
      },
      {
        id: "q13-2",
        question: "Quale SLA è garantito per VM distribuite su Availability Zones?",
        options: ["99.9%", "99.95%", "99.99%", "99.999%"],
        correctAnswer: 2,
        explanation: "VM distribuite su Availability Zones hanno un SLA del 99.99% uptime, il più alto per VM singole (senza scale set)."
      },
      {
        id: "q13-3",
        question: "In un VMSS, quale metrica è comunemente usata per l'autoscaling?",
        options: ["Disk Space", "Percentage CPU", "Network Latency", "OS Version"],
        correctAnswer: 1,
        explanation: "Percentage CPU è la metrica più comune. Quando il carico CPU aumenta, si aggiungono istanze."
      }
    ]
  },
  {
    day: 14,
    title: "VM Extensions e Custom Script",
    description: "Automazione post-deployment delle VM",
    category: "compute",
    topics: [
      {
        id: "day14-extensions",
        title: "VM Extensions",
        description: "Estensioni per configurare VM",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/overview"
      },
      {
        id: "day14-custom-script",
        title: "Custom Script Extension",
        description: "Eseguire script su VM",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/custom-script-windows"
      },
      {
        id: "day14-cloud-init",
        title: "Cloud-init",
        description: "Configurazione iniziale Linux",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-machines/linux/using-cloud-init"
      }
    ],
    quiz: [
      {
        id: "q14-1",
        question: "Qual è il timeout massimo per l'esecuzione di una Custom Script Extension?",
        options: ["30 minuti", "60 minuti", "90 minuti", "120 minuti"],
        correctAnswer: 2,
        explanation: "Custom Script Extension ha un timeout fisso di 90 minuti. Se lo script non termina entro questo tempo, l'estensione fallisce."
      },
      {
        id: "q14-2",
        question: "Dove dovresti inserire password o chiavi segrete nella configurazione di un'estensione?",
        options: ["settings", "publicSettings", "protectedSettings", "customData"],
        correctAnswer: 2,
        explanation: "Le informazioni sensibili devono essere inserite in 'protectedSettings', che vengono criptate e decriptate solo all'interno della VM."
      },
      {
        id: "q14-3",
        question: "Quando viene eseguito cloud-init su una VM Linux?",
        options: ["Ad ogni riavvio", "Solo al primo avvio (provisioning)", "Ogni ora", "Su richiesta manuale"],
        correctAnswer: 1,
        explanation: "Cloud-init viene eseguito tipicamente solo durante il primo avvio della VM per la configurazione iniziale."
      }
    ]
  },
  {
    day: 15,
    title: "Azure App Service",
    description: "Piattaforma PaaS per applicazioni web",
    category: "compute",
    topics: [
      {
        id: "day15-basics",
        title: "App Service Basics",
        description: "Introduzione ad App Service",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview"
      },
      {
        id: "day15-plans",
        title: "App Service Plans",
        description: "Piani e pricing",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans"
      },
      {
        id: "day15-deployment",
        title: "Deployment Options",
        description: "Opzioni di deploy",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices"
      }
    ],
    quiz: [
      {
        id: "q15-1",
        question: "Quale tier di App Service è il minimo richiesto per avere gli slot di deployment?",
        options: ["Basic", "Standard", "Premium", "Isolated"],
        correctAnswer: 1,
        explanation: "Il tier Standard è il primo livello che include il supporto per i deployment slots (fino a 5)."
      },
      {
        id: "q15-2",
        question: "Cosa succede se si arresta un App Service Plan?",
        options: ["Le app continuano a funzionare", "Le app vengono eliminate", "Tutte le app nel piano si arrestano", "Si passa al tier Free"],
        correctAnswer: 2,
        explanation: "Poiché l'App Service Plan rappresenta le risorse di calcolo sottostanti, se viene arrestato, tutte le app ospitate su di esso smettono di funzionare."
      },
      {
        id: "q15-3",
        question: "Come viene scalato un App Service Plan per gestire più traffico (aumento carico)?",
        options: ["Scale Up", "Scale Out", "Scale Down", "Scale In"],
        correctAnswer: 1,
        explanation: "Scale Out significa aumentare il numero di istanze VM che eseguono l'app. Scale Up significa aumentare la potenza (CPU/RAM) della singola istanza."
      }
    ]
  },
  {
    day: 16,
    title: "Deployment Slots",
    description: "Staging e deployment senza downtime",
    category: "compute",
    topics: [
      {
        id: "day16-slots",
        title: "Deployment Slots",
        description: "Ambienti di staging",
        duration: 30,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots"
      },
      {
        id: "day16-settings",
        title: "Slot Settings",
        description: "Configurazioni per slot",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots"
      },
      {
        id: "day16-traffic",
        title: "Traffic Routing",
        description: "Routing percentuale del traffico",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots"
      }
    ],
    quiz: [
      {
        id: "q16-1",
        question: "Quale impostazione NON viene scambiata durante uno swap?",
        options: ["Connection Strings", "Framework Version", "Custom Domain", "Handler Mappings"],
        correctAnswer: 2,
        explanation: "I Custom Domains sono legati allo slot specifico e non vengono scambiati. Questo permette di avere URL stabili per produzione e staging."
      },
      {
        id: "q16-2",
        question: "Come puoi evitare che una specifica App Setting venga scambiata?",
        options: ["Non è possibile", "Usare un nome diverso", "Selezionare 'Deployment slot setting'", "Usare Key Vault"],
        correctAnswer: 2,
        explanation: "Marcando una configurazione come 'Deployment slot setting' (o 'Slot setting'), questa rimarrà ancorata allo slot durante lo swap."
      },
      {
        id: "q16-3",
        question: "Cosa succede durante uno swap con preview?",
        options: ["Lo swap avviene immediatamente", "La configurazione di prod viene applicata a staging per test", "Il traffico viene bloccato", "Viene creato un backup"],
        correctAnswer: 1,
        explanation: "Lo swap con preview applica le impostazioni dello slot di destinazione (es. prod) allo slot sorgente (es. staging) permettendoti di verificare che l'app funzioni con la config di produzione prima di completare lo swap."
      }
    ]
  },
  {
    day: 17,
    title: "Container Instances e ACR",
    description: "Container serverless e registry",
    category: "compute",
    topics: [
      {
        id: "day17-aci",
        title: "Azure Container Instances (ACI)",
        description: "Container senza gestire VM",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview"
      },
      {
        id: "day17-acr",
        title: "Azure Container Registry (ACR)",
        description: "Registry privato per immagini",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-intro"
      },
      {
        id: "day17-tasks",
        title: "CLI Commands",
        description: "Comandi per ACI e ACR",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-tasks-overview"
      }
    ],
    quiz: [
      {
        id: "q17-1",
        question: "Quale SKU di ACR è necessario per la Geo-Replication?",
        options: ["Basic", "Standard", "Premium", "Enterprise"],
        correctAnswer: 2,
        explanation: "La Geo-Replication, che permette di avere un unico registry replicato in più region per pull veloci, è esclusiva del tier Premium."
      },
      {
        id: "q17-2",
        question: "Come vengono fatturati i Container Instances?",
        options: ["Per ora", "Per minuto", "Per secondo", "Flat mensile"],
        correctAnswer: 2,
        explanation: "Azure Container Instances sono fatturati per secondo, basato sulla quantità di vCPU e Memoria allocate al container group."
      },
      {
        id: "q17-3",
        question: "Cosa condividono i container all'interno dello stesso Container Group?",
        options: ["Nulla", "Solo la rete", "Ciclo di vita, Rete locale, Volumi", "Il filesystem completo"],
        correctAnswer: 2,
        explanation: "I container in un gruppo condividono il ciclo di vita (partono/si fermano insieme), l'indirizzo IP, le porte e i volumi montati."
      }
    ]
  },
  {
    day: 18,
    title: "Azure Kubernetes Service",
    description: "Orchestrazione container gestita",
    category: "compute",
    topics: [
      {
        id: "day18-aks-basics",
        title: "AKS Architecture",
        description: "Introduzione a Kubernetes su Azure",
        duration: 30,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes"
      },
      {
        id: "day18-networking",
        title: "AKS Networking",
        description: "Opzioni di rete per AKS",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/aks/concepts-network"
      },
      {
        id: "day18-scaling",
        title: "AKS Scaling & CLI",
        description: "Scaling di nodi e pod",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/aks/concepts-scale"
      }
    ],
    quiz: [
      {
        id: "q18-1",
        question: "Cosa è incluso gratuitamente in AKS?",
        options: ["Node pool", "Control plane", "Load Balancer", "Storage"],
        correctAnswer: 1,
        explanation: "Il control plane di AKS è gratuito. Paghi solo per le VM dei node e le risorse Azure usate."
      },
      {
        id: "q18-2",
        question: "Quale plugin di rete assegna IP della VNet direttamente ai pod?",
        options: ["Kubenet", "Azure CNI", "Calico", "Flannel"],
        correctAnswer: 1,
        explanation: "Azure CNI assegna IP dalla VNet Azure direttamente ai pod, permettendo comunicazione diretta."
      },
      {
        id: "q18-3",
        question: "Quale componente scala il numero di Nodi nel cluster?",
        options: ["Horizontal Pod Autoscaler", "Cluster Autoscaler", "Virtual Kubelet", "ReplicaSet"],
        correctAnswer: 1,
        explanation: "Il Cluster Autoscaler monitora i pod in stato 'pending' e aggiunge nodi se necessario, o li rimuove se sottoutilizzati."
      }
    ]
  },
  {
    day: 19,
    title: "Virtual Networks e Subnets",
    description: "Fondamenti del networking Azure",
    category: "networking",
    topics: [
      {
        id: "day19-vnet",
        title: "Virtual Networks",
        description: "Creare e configurare VNet",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview"
      },
      {
        id: "day19-subnets",
        title: "Subnets",
        description: "Segmentazione della rete",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-vnet-plan-design-arm"
      }
    ],
    quiz: [
      {
        id: "q19-1",
        question: "Quanti indirizzi IP sono riservati da Azure in ogni subnet?",
        options: ["3", "4", "5", "8"],
        correctAnswer: 2,
        explanation: "Azure riserva 5 IP in ogni subnet: network, gateway, DNS x2, broadcast."
      },
      {
        id: "q19-2",
        question: "Quale SKU di Public IP è zone-redundant?",
        options: ["Basic", "Standard", "Premium", "Entrambi"],
        correctAnswer: 1,
        explanation: "Solo Standard SKU supporta zone-redundancy per alta disponibilità."
      }
    ]
  },
  {
    day: 20,
    title: "Network Security Groups",
    description: "Firewall a livello di rete",
    category: "networking",
    topics: [
      {
        id: "day20-nsg",
        title: "NSG Basics",
        description: "Regole di sicurezza di rete",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview"
      },
      {
        id: "day20-asg",
        title: "Application Security Groups",
        description: "Raggruppare VM per policy",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups"
      },
      {
        id: "day20-cli",
        title: "CLI Commands",
        description: "Gestire NSG via CLI",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/manage-network-security-group"
      }
    ],
    quiz: [
      {
        id: "q20-1",
        question: "Qual è il range di priority per le regole NSG?",
        options: ["1-1000", "100-4096", "1-65535", "0-10000"],
        correctAnswer: 1,
        explanation: "Le regole NSG hanno priority da 100 a 4096. Regole di default usano 65000+."
      },
      {
        id: "q20-2",
        question: "Gli NSG sono stateful o stateless?",
        options: ["Stateful", "Stateless", "Dipende dalla regola", "Configurabile"],
        correctAnswer: 0,
        explanation: "NSG sono stateful: se permetti traffico inbound, la risposta outbound è automaticamente permessa."
      },
      {
        id: "q20-3",
        question: "A cosa può essere associato un NSG?",
        options: ["Solo VM", "Solo Subnet", "Subnet o NIC", "VNet intera"],
        correctAnswer: 2,
        explanation: "Un NSG può essere associato a livello di Subnet (consigliato) o direttamente alla NIC di una VM."
      }
    ]
  },
  {
    day: 21,
    title: "Azure DNS",
    description: "Hosting DNS e risoluzione nomi",
    category: "networking",
    topics: [
      {
        id: "day21-public-dns",
        title: "Azure Public DNS",
        description: "Hosting zone DNS pubbliche",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/dns/dns-overview"
      },
      {
        id: "day21-private-dns",
        title: "Private DNS Zones",
        description: "Risoluzione nomi interna",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/dns/private-dns-overview"
      },
      {
        id: "day21-cli",
        title: "CLI Commands",
        description: "Gestire DNS via CLI",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/dns/dns-getstarted-cli"
      }
    ],
    quiz: [
      {
        id: "q21-1",
        question: "Qual è lo SLA di Azure DNS?",
        options: ["99.9%", "99.95%", "99.99%", "100%"],
        correctAnswer: 3,
        explanation: "Azure DNS ha uno SLA del 100% per le query DNS, garantendo che i name server siano sempre disponibili."
      },
      {
        id: "q21-2",
        question: "Cosa fa l'Auto-registration in una Private DNS Zone?",
        options: ["Registra domini pubblici", "Crea record A per le VM", "Configura NSG", "Abilita il peering"],
        correctAnswer: 1,
        explanation: "Auto-registration crea e aggiorna automaticamente i record A per le macchine virtuali nella VNet collegata."
      },
      {
        id: "q21-3",
        question: "Cos'è lo Split-Horizon DNS?",
        options: ["DNS distribuito", "Stesso nome risolve diversamente interno/esterno", "DNS ridondante", "Backup DNS"],
        correctAnswer: 1,
        explanation: "Split-Horizon permette di usare lo stesso nome di dominio (es. contoso.com) per risolvere IP privati internamente e IP pubblici esternamente."
      }
    ]
  },
  {
    day: 22,
    title: "VNet Peering e VPN",
    description: "Connettività tra reti",
    category: "networking",
    topics: [
      {
        id: "day22-peering",
        title: "VNet Peering",
        description: "Connettere VNet direttamente",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview"
      },
      {
        id: "day22-vpn",
        title: "VPN Gateway",
        description: "Connessione sicura site-to-site",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways"
      },
      {
        id: "day22-cli",
        title: "CLI Commands",
        description: "Gestire Peering via CLI",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview"
      }
    ],
    quiz: [
      {
        id: "q22-1",
        question: "Il VNet peering è transitivo?",
        options: ["Sì, sempre", "No, mai", "Solo con Global peering", "Solo con Hub-spoke"],
        correctAnswer: 1,
        explanation: "VNet peering non è transitivo. Se A è connesso a B, e B è connesso a C, A non può parlare con C a meno che non si usi un Gateway o NVA come router."
      },
      {
        id: "q22-2",
        question: "Quale subnet è richiesta per VPN Gateway?",
        options: ["DefaultSubnet", "GatewaySubnet", "VPNSubnet", "ManagementSubnet"],
        correctAnswer: 1,
        explanation: "VPN Gateway richiede una subnet chiamata esattamente 'GatewaySubnet' per funzionare."
      },
      {
        id: "q22-3",
        question: "Qual è la differenza principale tra Peering e VPN VNet-to-VNet?",
        options: ["Il costo", "La crittografia", "La velocità", "La regione"],
        correctAnswer: 1,
        explanation: "Il traffico di Peering non è crittografato (ma è privato su backbone), mentre VPN VNet-to-VNet è crittografato (IPsec)."
      }
    ]
  },
  {
    day: 23,
    title: "Azure Load Balancer",
    description: "Bilanciamento del traffico Layer 4",
    category: "networking",
    topics: [
      {
        id: "day23-lb-overview",
        title: "Load Balancer Overview",
        description: "Concetti base e Layer 4",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview"
      },
      {
        id: "day23-skus",
        title: "SKUs: Basic vs Standard",
        description: "Differenze tra i livelli di servizio",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/skus"
      },
      {
        id: "day23-cli",
        title: "CLI Commands",
        description: "Creare un Load Balancer",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/load-balancer/quickstart-load-balancer-standard-public-cli"
      }
    ],
    quiz: [
      {
        id: "q23-1",
        question: "A quale livello OSI opera Azure Load Balancer?",
        options: ["Layer 2", "Layer 3", "Layer 4", "Layer 7"],
        correctAnswer: 2,
        explanation: "Azure Load Balancer opera al Layer 4 (Transport), gestendo traffico TCP e UDP."
      },
      {
        id: "q23-2",
        question: "Quale SKU di Load Balancer supporta le Availability Zones?",
        options: ["Basic", "Standard", "Premium", "Enterprise"],
        correctAnswer: 1,
        explanation: "Solo lo SKU Standard supporta le Availability Zones e offre uno SLA del 99.99%."
      },
      {
        id: "q23-3",
        question: "Cosa succede se una Health Probe fallisce per una VM?",
        options: ["La VM viene riavviata", "Il LB smette di inviare traffico a quella VM", "Il LB viene eliminato", "Viene inviato un alert ma il traffico continua"],
        correctAnswer: 1,
        explanation: "Il Load Balancer rimuove la VM non sana dalla rotazione e smette di inviarle nuovo traffico finché non torna sana."
      }
    ]
  },
  {
    day: 24,
    title: "Application Gateway",
    description: "Bilanciamento Layer 7 e WAF",
    category: "networking",
    topics: [
      {
        id: "day24-appgw-overview",
        title: "App Gateway Overview",
        description: "Routing URL-based e WAF",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/application-gateway/overview"
      },
      {
        id: "day24-cli",
        title: "CLI Commands",
        description: "Creare un App Gateway",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/application-gateway/quick-create-cli"
      }
    ],
    quiz: [
      {
        id: "q24-1",
        question: "A quale livello OSI opera Application Gateway?",
        options: ["Layer 2", "Layer 3", "Layer 4", "Layer 7"],
        correctAnswer: 3,
        explanation: "Application Gateway è un bilanciatore di carico web che opera al Layer 7 (Application)."
      },
      {
        id: "q24-2",
        question: "Quale funzionalità protegge da SQL Injection?",
        options: ["NSG", "WAF (Web Application Firewall)", "DDoS Protection", "Private Link"],
        correctAnswer: 1,
        explanation: "Il WAF (Web Application Firewall) integrato in App Gateway protegge da vulnerabilità web comuni come SQL Injection e XSS."
      },
      {
        id: "q24-3",
        question: "Cosa permette di indirizzare /images a un pool diverso da /video?",
        options: ["Basic Routing", "URL Path-based Routing", "DNS Routing", "IP Routing"],
        correctAnswer: 1,
        explanation: "URL Path-based Routing permette di instradare il traffico a pool di backend diversi in base al percorso URL della richiesta."
      }
    ]
  },
  {
    day: 25,
    title: "Azure Monitor",
    description: "Monitoraggio e Alerting",
    category: "monitoring",
    topics: [
      {
        id: "day25-monitor-overview",
        title: "Azure Monitor Overview",
        description: "Raccogliere, analizzare e agire",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview"
      },
      {
        id: "day25-alerts",
        title: "Alerts & Action Groups",
        description: "Notifiche e automazione",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview"
      },
      {
        id: "day25-cli",
        title: "CLI Commands",
        description: "Creare Alert via CLI",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-manage-metric-cli"
      }
    ],
    quiz: [
      {
        id: "q25-1",
        question: "Quale tipo di dati è ideale per alerting in tempo reale?",
        options: ["Logs", "Metrics", "Traces", "Events"],
        correctAnswer: 1,
        explanation: "Le Metrics sono valori numerici leggeri ideali per alerting in tempo reale (es. CPU usage)."
      },
      {
        id: "q25-2",
        question: "Dove vengono archiviati i log di Azure Monitor?",
        options: ["Storage Account", "Log Analytics Workspace", "SQL Database", "Cosmos DB"],
        correctAnswer: 1,
        explanation: "I log vengono raccolti e interrogati (KQL) all'interno di un Log Analytics Workspace."
      },
      {
        id: "q25-3",
        question: "Cosa definisce CHI riceve una notifica di alert?",
        options: ["Alert Rule", "Action Group", "Monitor Setting", "Notification Hub"],
        correctAnswer: 1,
        explanation: "L'Action Group definisce le azioni da intraprendere (email, SMS, webhook) quando scatta un alert."
      }
    ]
  },
  {
    day: 26,
    title: "Azure Backup",
    description: "Backup e ripristino dati",
    category: "storage",
    topics: [
      {
        id: "day26-backup-overview",
        title: "Azure Backup Overview",
        description: "Protezione dati on-prem e cloud",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/backup/backup-overview"
      },
      {
        id: "day26-cli",
        title: "CLI Commands",
        description: "Abilitare Backup VM",
        duration: 15,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/backup/quick-backup-vm-cli"
      }
    ],
    quiz: [
      {
        id: "q26-1",
        question: "Quale risorsa è necessaria per configurare Azure Backup?",
        options: ["Storage Account", "Recovery Services Vault", "Log Analytics Workspace", "Key Vault"],
        correctAnswer: 1,
        explanation: "Il Recovery Services Vault è il contenitore che archivia i backup e le policy di configurazione."
      },
      {
        id: "q26-2",
        question: "Cosa definisce la retention di un backup?",
        options: ["Backup Policy", "SLA", "Storage Tier", "Region"],
        correctAnswer: 0,
        explanation: "La Backup Policy definisce la frequenza dei backup e il periodo di conservazione (retention) dei dati."
      },
      {
        id: "q26-3",
        question: "È possibile fare il backup di file on-premise su Azure?",
        options: ["No, solo risorse cloud", "Sì, usando l'agente MARS", "Sì, ma solo tramite VPN", "Solo se si usa ExpressRoute"],
        correctAnswer: 1,
        explanation: "Sì, installando l'agente MARS (Microsoft Azure Recovery Services) su server Windows on-premise è possibile fare backup di file e cartelle su Azure."
      }
    ]
  },
  {
    day: 27,
    title: "Azure Backup",
    description: "Protezione dati con backup",
    category: "monitoring",
    topics: [

    ],
    quiz: [
      {
        id: "q27-1",
        question: "Dove vengono archiviati i backup di Azure Backup?",
        options: ["Storage Account", "Recovery Services Vault", "Blob Container", "Data Lake"],
        correctAnswer: 1,
        explanation: "Azure Backup archivia i dati in un Recovery Services Vault."
      },
      {
        id: "q27-2",
        question: "Quale tipo di backup è application-consistent per le VM?",
        options: ["Crash-consistent", "File-consistent", "Application-consistent con VSS", "Incremental"],
        correctAnswer: 2,
        explanation: "Azure Backup usa VSS (Volume Shadow Copy Service) per backup application-consistent."
      }
    ]
  },
  {
    day: 27,
    title: "Azure Site Recovery",
    description: "Disaster Recovery (DR)",
    category: "storage",
    topics: [
      {
        id: "day27-asr-overview",
        title: "Site Recovery Overview",
        description: "Business Continuity & DR",
        duration: 25,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview"
      },
      {
        id: "day27-failover",
        title: "Failover & Failback",
        description: "Test e attivazione DR",
        duration: 20,
        msLearnUrl: "https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-failover"
      }
    ],
    quiz: [
      {
        id: "q27-1",
        question: "Qual è la differenza tra Backup e Site Recovery?",
        options: ["Nessuna", "Backup è per i dati, ASR è per la continuità operativa", "Backup è più veloce", "ASR costa meno"],
        correctAnswer: 1,
        explanation: "Azure Backup protegge i dati (file, VM) per il ripristino. ASR replica l'intero carico di lavoro per garantire la continuità operativa (Business Continuity) con tempi di ripristino minimi."
      },
      {
        id: "q27-2",
        question: "Cos'è un Test Failover?",
        options: ["Un failover reale", "Una simulazione isolata", "Un backup", "Un riavvio"],
        correctAnswer: 1,
        explanation: "Il Test Failover crea le VM nel sito secondario in una rete isolata per verificare che tutto funzioni, senza interrompere la produzione."
      },
      {
        id: "q27-3",
        question: "In quale scenario si usa ASR?",
        options: ["Archiviazione a lungo termine", "Disaster Recovery", "Bilanciamento del carico", "CDN"],
        correctAnswer: 1,
        explanation: "ASR è progettato specificamente per scenari di Disaster Recovery (DR)."
      }
    ]
  },
  {
    day: 28,
    title: "Review: Compute & Storage",
    description: "Ripasso concetti chiave",
    category: "compute",
    topics: [

    ],
    quiz: [
      {
        id: "q28-1",
        question: "Quale servizio useresti per un'app web senza voler gestire l'OS?",
        options: ["Virtual Machine", "App Service", "Virtual Network", "Load Balancer"],
        correctAnswer: 1,
        explanation: "App Service è un servizio PaaS che astrae la gestione del sistema operativo."
      },
      {
        id: "q28-2",
        question: "Quale livello di accesso Storage è più economico per dati a cui si accede raramente?",
        options: ["Hot", "Cool", "Archive", "Premium"],
        correctAnswer: 2,
        explanation: "Archive è il livello più economico per lo storage, ma ha costi di recupero più alti e tempi di latenza maggiori (ore)."
      }
    ]
  },
  {
    day: 29,
    title: "Review: Networking & Monitoring",
    description: "Ripasso finale",
    category: "networking",
    topics: [

    ],
    quiz: [
      {
        id: "q29-1",
        question: "Quale load balancer sceglieresti per gestire traffico HTTPS con WAF?",
        options: ["Azure Load Balancer", "Application Gateway", "Traffic Manager", "Front Door"],
        correctAnswer: 1,
        explanation: "Application Gateway opera al Layer 7, gestisce HTTPS e include il WAF per la sicurezza."
      },
      {
        id: "q29-2",
        question: "Quale servizio offre una connessione privata dedicata verso Azure?",
        options: ["VPN Gateway", "ExpressRoute", "VNet Peering", "Private Link"],
        correctAnswer: 1,
        explanation: "ExpressRoute fornisce una connessione privata e dedicata che non passa attraverso internet pubblico."
      }
    ]
  },
  {
    day: 30,
    title: "Practice Exam & Tips",
    description: "Simulazione e consigli finali",
    category: "compute",
    topics: [
      {
        id: "day30-exam-tips",
        title: "Exam Day Tips",
        description: "Strategie per l'esame",
        duration: 30,
        msLearnUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/?practice-assessment-type=certification"
      }
    ],
    quiz: [
      {
        id: "q30-1",
        question: "Quante domande ci sono tipicamente nell'esame AZ-104?",
        options: ["20-30", "40-60", "80-100", "10-15"],
        correctAnswer: 1,
        explanation: "L'esame AZ-104 contiene tipicamente tra le 40 e le 60 domande."
      },
      {
        id: "q30-2",
        question: "Qual è il punteggio minimo per passare?",
        options: ["500", "600", "700", "800"],
        correctAnswer: 2,
        explanation: "Il punteggio minimo per superare l'esame è 700 su 1000."
      }
    ]
  }
];
