#!/usr/bin/env python3
"""
Script per estrarre tutte le domande dal documento Word AZ-104
e convertirle in formato JSON per l'applicazione React
"""

import re
import json
from docx import Document
from typing import List, Dict, Optional

def determine_category(question_text: str, explanation: str) -> str:
    """Determina la categoria della domanda basandosi sul contenuto"""
    text = (question_text + " " + explanation).lower()

    # Keywords per ogni categoria
    categories = {
        'storage': ['storage', 'blob', 'file share', 'azcopy', 'disk', 'sas', 'azure files', 'backup'],
        'networking': ['network', 'vnet', 'subnet', 'nsg', 'vpn', 'dns', 'load balancer', 'peering', 'gateway'],
        'compute': ['virtual machine', 'vm', 'availability', 'scale set', 'vmss', 'compute', 'deployment'],
        'identity-governance': ['azure ad', 'rbac', 'policy', 'role', 'identity', 'entra', 'governance', 'subscription'],
        'monitoring': ['monitor', 'backup', 'recovery', 'alert', 'diagnostic', 'log analytics']
    }

    # Conta le keywords per ogni categoria
    scores = {}
    for category, keywords in categories.items():
        scores[category] = sum(1 for keyword in keywords if keyword in text)

    # Ritorna la categoria con più matches, default a compute
    if max(scores.values()) == 0:
        return 'compute'
    return max(scores, key=scores.get)

def determine_question_type(question_text: str) -> str:
    """Determina il tipo di domanda"""
    text = question_text.lower()

    if 'hotspot question' in text:
        return 'hotspot'
    elif 'drag and drop' in text:
        return 'drag-drop'
    elif 'does this meet the goal' in text or 'does that meet the goal' in text:
        return 'yes-no'
    elif 'each correct answer' in text or 'each correct selection' in text:
        return 'multiple-choice'
    else:
        return 'single-choice'

def extract_options_from_text(question_text: str, answer: str) -> List[str]:
    """Estrae le opzioni dalla domanda"""
    options = []

    # Pattern per opzioni standard (A. B. C. D. E. F.)
    option_pattern = r'^([A-F])\.\s*(.+?)(?=\n[A-F]\.|$)'
    matches = re.finditer(option_pattern, question_text, re.MULTILINE | re.DOTALL)

    for match in matches:
        option_text = match.group(2).strip()
        if option_text and len(option_text) > 2:  # Evita opzioni troppo corte
            options.append(f"{match.group(1)}. {option_text}")

    # Se non trova opzioni standard, cerca Yes/No
    if not options and ('does this meet' in question_text.lower() or 'does that meet' in question_text.lower()):
        options = ['Yes', 'No']

    # Se ancora non ha opzioni, usa placeholder
    if not options:
        # Conta quante lettere ci sono nella risposta per capire quante opzioni
        num_options = len(answer) if len(answer) <= 1 else 4
        options = [f"Option {chr(65+i)}" for i in range(max(num_options, 4))]

    return options

def parse_answer(answer: str) -> List[int]:
    """Converte la risposta (es. "AC", "B") in array di indici"""
    if not answer:
        return [0]

    # Rimuovi spazi e converti in maiuscolo
    answer = answer.strip().upper()

    # Converte ogni lettera in indice (A=0, B=1, etc.)
    indices = []
    for char in answer:
        if char.isalpha():
            indices.append(ord(char) - ord('A'))

    return indices if indices else [0]

def extract_reference(explanation: str) -> Optional[str]:
    """Estrae il link alla documentazione Microsoft Learn"""
    # Pattern per URL Microsoft
    url_pattern = r'https?://(?:docs\.microsoft\.com|learn\.microsoft\.com)[^\s\n]+'
    match = re.search(url_pattern, explanation)

    if match:
        url = match.group(0)
        # Pulisce l'URL da caratteri finali non validi
        url = re.sub(r'[,\)\]\s]+$', '', url)
        return url

    return None

def clean_text(text: str) -> str:
    """Pulisce il testo da caratteri problematici"""
    # Rimuove caratteri non stampabili
    text = ''.join(char for char in text if char.isprintable() or char in '\n\t')
    # Normalizza spazi multipli
    text = re.sub(r'\s+', ' ', text)
    # Normalizza newline multiple
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def extract_questions_from_docx(docx_path: str) -> List[Dict]:
    """Estrae tutte le domande dal documento Word"""
    print(f"Apertura documento: {docx_path}")
    doc = Document(docx_path)

    # Estrai tutto il testo
    full_text = '\n'.join([para.text for para in doc.paragraphs])

    questions = []

    # Pattern migliorato per catturare le domande
    # Cerca pattern: QUESTION N ... Answer: X ... Explanation: ... [QUESTION | fine]
    question_pattern = r'QUESTION\s+(\d+)\s*\n+(.*?)\n+Answer:\s*([A-Z]+)\s*\n+Explanation:\s*\n*(.*?)(?=\n+QUESTION|\Z)'

    matches = re.finditer(question_pattern, full_text, re.DOTALL | re.IGNORECASE)

    for match in matches:
        question_num = match.group(1)
        question_text = clean_text(match.group(2))
        answer = match.group(3).strip()
        explanation = clean_text(match.group(4))

        # Determina tipo e categoria
        question_type = determine_question_type(question_text)
        category = determine_category(question_text, explanation)

        # Estrai opzioni
        options = extract_options_from_text(question_text, answer)

        # Converti risposta in indici
        correct_answers = parse_answer(answer)

        # Estrai riferimento
        reference = extract_reference(explanation)

        # Rileva note speciali
        note = None
        if 'each correct answer' in question_text.lower():
            note = "Each correct answer presents a complete solution"
        elif 'each correct selection' in question_text.lower():
            note = "Each correct selection is worth one point"

        question_obj = {
            'id': f'exam-q{question_num}',
            'type': question_type,
            'category': category,
            'question': question_text,
            'options': options,
            'correctAnswers': correct_answers,
            'explanation': explanation,
        }

        # Aggiungi campi opzionali solo se presenti
        if reference:
            question_obj['reference'] = reference
        if note:
            question_obj['note'] = note

        questions.append(question_obj)

        print(f"OK - Estratta domanda {question_num} - Tipo: {question_type}, Categoria: {category}")

    return questions

def main():
    """Funzione principale"""
    import sys

    docx_path = 'doc/epAZ-104_250905.docx'
    output_path = 'src/data/examQuestions.json'

    try:
        print("Inizio estrazione domande...\n")
        questions = extract_questions_from_docx(docx_path)

        if not questions:
            print("ERRORE: Nessuna domanda trovata!")
            sys.exit(1)

        print(f"\nEstratte {len(questions)} domande")

        # Statistiche per categoria
        categories = {}
        types = {}
        for q in questions:
            categories[q['category']] = categories.get(q['category'], 0) + 1
            types[q['type']] = types.get(q['type'], 0) + 1

        print("\nDistribuzione per categoria:")
        for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            print(f"  - {cat}: {count}")

        print("\nDistribuzione per tipo:")
        for typ, count in sorted(types.items(), key=lambda x: x[1], reverse=True):
            print(f"  - {typ}: {count}")

        # Salva in JSON
        print(f"\nSalvataggio in {output_path}...")
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)

        print(f"Completato! {len(questions)} domande salvate.")

    except FileNotFoundError:
        print(f"ERRORE: File non trovato: {docx_path}")
        print("Assicurati che il file esista nella cartella doc/")
        sys.exit(1)
    except Exception as e:
        print(f"ERRORE: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
