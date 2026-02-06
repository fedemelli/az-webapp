import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Register() {
  const { user, token, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Verifica permessi...
      </div>
    );
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!username || !password) {
      setError('Inserisci username e password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        setError(data.message ?? 'Errore durante la registrazione.');
        return;
      }

      setMessage('Utente creato con successo.');
      setUsername('');
      setPassword('');
    } catch {
      setError('Errore di rete.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-lg shadow-lg shadow-emerald-500/20">
            +
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">Nuovo utente</h1>
          <p className="mt-2 text-sm text-slate-500">
            Crea un account per l’accesso alla piattaforma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="new-username">
              Username
            </label>
            <input
              id="new-username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Nuovo username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="new-password">
              Password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Password temporanea"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creazione...' : 'Crea utente'}
          </button>
        </form>
      </div>
    </div>
  );
}
