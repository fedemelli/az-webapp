import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiUrl } from '../../utils/api';

type UserRow = {
  id: number;
  username: string;
};

export function AdminUsers() {
  const { user, token, isLoading } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const fetchUsers = async () => {
    setError('');
    try {
      const response = await fetch(apiUrl('/api/users'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? 'Errore durante il caricamento utenti.');
      }
      const data = (await response.json()) as { users: UserRow[] };
      setUsers(data.users);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore durante il caricamento utenti.';
      setError(message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

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

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!newUsername || !newPassword) {
      setError('Inserisci username e password.');
      return;
    }

    setIsBusy(true);
    try {
      const response = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername.trim(), password: newPassword }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? 'Errore durante la creazione utente.');
      }

      setNewUsername('');
      setNewPassword('');
      setMessage('Utente creato con successo.');
      await fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore durante la creazione utente.';
      setError(message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError('');
    setMessage('');
    setIsBusy(true);
    try {
      const response = await fetch(apiUrl(`/api/users/${id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? 'Errore durante la cancellazione.');
      }
      setMessage('Utente eliminato.');
      await fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Errore durante la cancellazione.';
      setError(message);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-slate-900">Gestione utenze</h1>
          <p className="text-sm text-slate-500 mt-1">
            Solo l’amministratore puo creare o rimuovere utenti.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <form onSubmit={handleCreate} className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Nuovo utente</h2>
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="admin-new-username">
                Username
              </label>
              <input
                id="admin-new-username"
                type="text"
                autoComplete="off"
                value={newUsername}
                onChange={(event) => setNewUsername(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Nuovo username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="admin-new-password">
                Password
              </label>
              <input
                id="admin-new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Password temporanea"
              />
            </div>
            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? 'Salvataggio...' : 'Crea utente'}
            </button>
          </form>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Utenti registrati</h2>
              <button
                type="button"
                onClick={fetchUsers}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Aggiorna
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {users.length === 0 ? (
                <p className="text-sm text-slate-500">Nessun utente registrato.</p>
              ) : (
                users.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.username}</p>
                      <p className="text-xs text-slate-500">ID {item.id}</p>
                    </div>
                    <button
                      type="button"
                      disabled={isBusy || item.username === user.username}
                      onClick={() => handleDelete(item.id)}
                      className="text-sm font-semibold text-rose-600 hover:text-rose-500 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      Elimina
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {error}
          </div>
        ) : null}
        {message ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-600">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
