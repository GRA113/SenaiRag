import { useState, type FormEvent, type KeyboardEvent } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void | Promise<void>;
}

export function QuestionInput({ onSubmit }: QuestionInputProps) {
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const current = question.trim();
    if (!current || busy) return;

    setBusy(true);
    try {
      await onSubmit(current);
      setQuestion('');
    } finally {
      setBusy(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter envia; Shift+Enter quebra linha.
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      const current = question.trim();
      if (!current || busy) return;
      void handleSubmit(event as unknown as FormEvent);
    }
  };

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <textarea
        className="input"
        placeholder="Faça uma pergunta... (Enter para enviar, Shift+Enter para nova linha)"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
      />
      <button type="submit" disabled={busy || question.trim().length === 0}>
        {busy ? 'Perguntando...' : 'Perguntar'}
      </button>
    </form>
  );
}