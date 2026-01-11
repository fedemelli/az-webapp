// Script per estrarre i contenuti HTML e quiz da studyPlan.ts
// Esegui con: node scripts/extractContent.cjs

const fs = require('fs');
const path = require('path');

// Leggi il file studyPlan.ts
const studyPlanPath = path.join(__dirname, '../src/data/studyPlan.ts');
const content = fs.readFileSync(studyPlanPath, 'utf-8');

// Estrai ogni day come blocco
const dayBlocks = [];
const dayStartRegex = /\{\s*day:\s*(\d+),/g;
let match;
const dayStarts = [];

while ((match = dayStartRegex.exec(content)) !== null) {
  dayStarts.push({ index: match.index, day: parseInt(match[1]) });
}

// Per ogni day, estrai il blocco completo
for (let i = 0; i < dayStarts.length; i++) {
  const start = dayStarts[i].index;
  const end = i < dayStarts.length - 1 ? dayStarts[i + 1].index : content.length;
  const dayContent = content.substring(start, end);

  // Estrai metadati del giorno
  const titleMatch = dayContent.match(/title:\s*"([^"]+)"/);
  const descMatch = dayContent.match(/description:\s*"([^"]+)"/);
  const catMatch = dayContent.match(/category:\s*"([^"]+)"/);

  // Estrai topics
  const topics = [];
  const topicRegex = /\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*duration:\s*(\d+),\s*msLearnUrl:\s*"([^"]+)",\s*content:\s*`([\s\S]*?)`\s*\}/g;
  let topicMatch;

  while ((topicMatch = topicRegex.exec(dayContent)) !== null) {
    const id = topicMatch[1];
    const topicName = id.replace(/^day\d+-/, '');

    topics.push({
      id: id,
      topicName: topicName,
      title: topicMatch[2],
      description: topicMatch[3],
      duration: parseInt(topicMatch[4]),
      msLearnUrl: topicMatch[5],
      content: topicMatch[6].trim()
    });
  }

  // Estrai quiz
  const quizzes = [];
  const quizRegex = /\{\s*id:\s*"([^"]+)",\s*question:\s*"([^"]+)",\s*options:\s*\[([\s\S]*?)\],\s*correctAnswer:\s*(\d+),\s*explanation:\s*"([^"]+)"\s*\}/g;
  let quizMatch;

  while ((quizMatch = quizRegex.exec(dayContent)) !== null) {
    const optionsStr = quizMatch[3];
    const options = optionsStr.match(/"([^"]+)"/g)?.map(o => o.replace(/"/g, '')) || [];

    quizzes.push({
      id: quizMatch[1],
      question: quizMatch[2],
      options: options,
      correctAnswer: parseInt(quizMatch[4]),
      explanation: quizMatch[5]
    });
  }

  dayBlocks.push({
    day: dayStarts[i].day,
    title: titleMatch ? titleMatch[1] : `Day ${dayStarts[i].day}`,
    description: descMatch ? descMatch[1] : '',
    category: catMatch ? catMatch[1] : 'monitoring',
    topics: topics,
    quiz: quizzes
  });
}

console.log(`Trovati ${dayBlocks.length} giorni`);

// Conta totale topic e quiz
let totalTopics = 0;
let totalQuiz = 0;
dayBlocks.forEach(d => {
  totalTopics += d.topics.length;
  totalQuiz += d.quiz.length;
});
console.log(`Totale topic: ${totalTopics}`);
console.log(`Totale quiz: ${totalQuiz}`);

// Crea la cartella content se non esiste
const contentDir = path.join(__dirname, '../src/data/content');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Crea i file HTML per ogni topic
dayBlocks.forEach(day => {
  const dayDir = path.join(contentDir, `day${day.day.toString().padStart(2, '0')}`);
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, { recursive: true });
  }

  day.topics.forEach(topic => {
    const filePath = path.join(dayDir, `${topic.topicName}.html`);
    fs.writeFileSync(filePath, topic.content);
  });
});

console.log('File HTML creati.');

// Genera il nuovo studyPlan.ts con solo metadati
const escapeString = (str) => str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const newStudyPlan = `import type { Day } from '../types';

// I contenuti HTML sono caricati dinamicamente da src/data/content/
// Usa loadTopicContent() da contentLoader.ts per caricare i contenuti

export const studyPlan: Day[] = [
${dayBlocks.map(day => `  {
    day: ${day.day},
    title: "${escapeString(day.title)}",
    description: "${escapeString(day.description)}",
    category: "${day.category}",
    topics: [
${day.topics.map(t => `      {
        id: "${t.id}",
        title: "${escapeString(t.title)}",
        description: "${escapeString(t.description)}",
        duration: ${t.duration},
        msLearnUrl: "${t.msLearnUrl}"
      }`).join(',\n')}
    ],
    quiz: [
${day.quiz.map(q => `      {
        id: "${q.id}",
        question: "${escapeString(q.question)}",
        options: [${q.options.map(o => `"${escapeString(o)}"`).join(', ')}],
        correctAnswer: ${q.correctAnswer},
        explanation: "${escapeString(q.explanation)}"
      }`).join(',\n')}
    ]
  }`).join(',\n')}
];
`;

const newStudyPlanPath = path.join(__dirname, '../src/data/studyPlan.new.ts');
fs.writeFileSync(newStudyPlanPath, newStudyPlan);
console.log(`\nCreated new studyPlan: ${newStudyPlanPath}`);

// Stampa statistiche
console.log('\n=== Statistiche per Giorno ===');
dayBlocks.forEach(day => {
  console.log(`Day ${day.day.toString().padStart(2)}: ${day.topics.length} topics, ${day.quiz.length} quiz - ${day.title}`);
});
