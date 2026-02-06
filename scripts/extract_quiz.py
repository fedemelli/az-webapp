import re
import json
from docx import Document

def extract_questions_from_docx(docx_path):
    """Estrae le domande dal documento Word AZ-104"""
    doc = Document(docx_path)
    questions = []

    text = '\n'.join([p.text for p in doc.paragraphs])

    # Pattern per identificare le domande
    question_pattern = r'QUESTION (\d+)\n(.*?)\n\nAnswer: ([A-Z]+)\n+Explanation:\n(.*?)\n\n(?:QUESTION|\Z)'

    matches = re.finditer(question_pattern, text, re.DOTALL)

    for match in matches:
        question_num = match.group(1)
        question_text = match.group(2).strip()
        answer = match.group(3).strip()
        explanation = match.group(4).strip()

        # Determina il tipo di domanda
        question_type = 'single-choice'
        if 'Hotspot Question' in question_text:
            question_type = 'hotspot'
        elif 'Each correct answer' in question_text or 'Each correct selection' in question_text:
            question_type = 'multiple-choice'
        elif 'Does this meet the goal?' in question_text or 'Does that meet the goal?' in question_text:
            question_type = 'yes-no'

        # Estrai le opzioni se presenti
        options = []
        if question_type == 'yes-no':
            options = ['Yes', 'No']
        else:
            # Pattern per estrarre opzioni multiple choice (A. , B. , C. , D. , E. )
            # Questo è semplificato - in realtà dovremmo analizzare le tabelle
            options = ['Option A', 'Option B', 'Option C', 'Option D']

        # Converti la risposta in indici
        correct_answers = []
        if question_type == 'yes-no':
            correct_answers = [0 if answer == 'A' else 1]
        else:
            # Per risposte multiple tipo "AC" o "CE"
            for char in answer:
                correct_answers.append(ord(char) - ord('A'))

        # Estrai riferimenti Learn
        reference_match = re.search(r'https://(?:docs\.microsoft\.com|learn\.microsoft\.com)[^\s]+', explanation)
        reference = reference_match.group(0) if reference_match else None

        question_obj = {
            'id': f'exam-q{question_num}',
            'type': question_type,
            'question': question_text,
            'options': options,
            'correctAnswers': correct_answers,
            'explanation': explanation,
            'reference': reference
        }

        questions.append(question_obj)

    return questions

if __name__ == '__main__':
    questions = extract_questions_from_docx('doc/epAZ-104_250905.docx')

    # Salva solo le prime 50 domande per ora
    with open('src/data/examQuestions.json', 'w', encoding='utf-8') as f:
        json.dump(questions[:50], f, indent=2, ensure_ascii=False)

    print(f'Estratte {len(questions[:50])} domande')
