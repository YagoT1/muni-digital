import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';

type Mode = 'login' | 'register';

export default function AuthPortalPage() {
  console.log('[AuthPortalPage] RENDER');

  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');

  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const title = useMemo(() => (mode === 'login' ? 'Ingresar' : 'Crear cuenta'), [mode]);

  const handleSubmit = async () => {
    console.log('[AuthPortalPage] CLICK submit', { mode, email, dni });

    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await register(dni.trim(), email.trim(), password);
      }

      navigate('/ciudadano', { replace: true });
    } catch (e: any) {
      console.error('[AuthPortalPage] ERROR', e);
      setError(e?.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md p-6">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Accedé con tus credenciales para usar los servicios digitales.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                mode === 'login' ? 'bg-accent' : 'hover:bg-accent'
              }`}
              onClick={() => setMode('login')}
              type="button"
            >
              Login
            </button>
            <button
              className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                mode === 'register' ? 'bg-accent' : 'hover:bg-accent'
              }`}
              onClick={() => setMode('register')}
              type="button"
            >
              Registro
            </button>
          </div>

          <div className="mt-4 grid gap-3">
            {mode === 'register' && (
              <div className="grid gap-1">
                <label className="text-sm">DNI</label>
                <input
                  className="rounded-md border bg-background px-3 py-2"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="12345678"
                />
              </div>
            )}

            <div className="grid gap-1">
              <label className="text-sm">Email</label>
              <input
                className="rounded-md border bg-background px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@correo.com"
                type="email"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm">Contraseña</label>
              <input
                className="rounded-md border bg-background px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                type="password"
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              className="mt-2 rounded-md bg-muni-blue px-4 py-2 text-white disabled:opacity-60"
              disabled={loading}
              type="button"
              onClick={handleSubmit}
            >
              {loading ? 'Procesando...' : mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </button>

            <button
              type="button"
              onClick={() => alert('CLICK OK')}
              className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
            >
              Probar click (QA)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}