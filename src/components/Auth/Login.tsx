import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname ?? '/';

  if (!isLoading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Inserisci username e password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(username.trim(), password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-500/20">
            AZ
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">Accedi</h1>
          <p className="mt-2 text-sm text-slate-500">
            Inserisci le credenziali per continuare.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Il tuo username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="La tua password"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Accesso...' : 'Entra'}
          </button>
        </form>
      </div>
    </div>
  );
}
