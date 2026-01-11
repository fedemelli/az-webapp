// Sistema di caricamento dinamico dei contenuti HTML
// Usa import.meta.glob di Vite per caricare i file on-demand

// Importa tutti i file HTML come raw string
const contentModules = import.meta.glob<string>('./content/**/*.html', {
  query: '?raw',
  import: 'default',
});

// Cache per i contenuti già caricati
const contentCache = new Map<string, string>();

/**
 * Carica il contenuto HTML per un topic specifico
 * @param topicId - ID del topic (es. "day1-users")
 * @returns Promise con il contenuto HTML o stringa vuota se non trovato
 */
export async function loadTopicContent(topicId: string): Promise<string> {
  // Controlla cache
  if (contentCache.has(topicId)) {
    return contentCache.get(topicId)!;
  }

  // Estrai il numero del giorno dall'ID (es. "day1-users" -> "01")
  const match = topicId.match(/^day(\d+)-(.+)$/);
  if (!match) {
    console.warn(`Invalid topic ID format: ${topicId}`);
    return '';
  }

  const dayNum = match[1].padStart(2, '0');
  const topicName = match[2];
  const path = `./content/day${dayNum}/${topicName}.html`;

  // Cerca il modulo
  const loader = contentModules[path];
  if (!loader) {
    console.warn(`Content not found: ${path}`);
    return '';
  }

  try {
    const content = await loader();
    contentCache.set(topicId, content);
    return content;
  } catch (error) {
    console.error(`Error loading content for ${topicId}:`, error);
    return '';
  }
}

/**
 * Precarica i contenuti per un giorno specifico
 * @param topicIds - Array di topic IDs da precaricare
 */
export async function preloadDayContent(topicIds: string[]): Promise<void> {
  await Promise.all(topicIds.map(loadTopicContent));
}

/**
 * Pulisce la cache dei contenuti (utile per testing o refresh)
 */
export function clearContentCache(): void {
  contentCache.clear();
}
