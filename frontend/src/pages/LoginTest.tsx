import { useState } from 'react';
import { login, register, logout } from '../services/authService';

export default function LoginTest() {
  const [dni, setDni] = useState('12345678');
  const [email, setEmail] = useState('nuevo@test.com');
  const [password, setPassword] = useState('123456');
  const [legajo, setLegajo] = useState('');
  const [out, setOut] = useState<any>(null);
  const [err, setErr] = useState('');

  const onRegister = async () => {
    setErr('');
    setOut(null);
    try {
      const r = await register(dni, email, password, legajo || undefined);
      setOut(r);
    } catch (e: any) {
      setErr(e.message);
    }
  };

  const onLogin = async () => {
    setErr('');
    setOut(null);
    try {
      const r = await login(email, password);
      setOut(r);
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h2>Login/Register Test</h2>

      <div style={{ display: 'grid', gap: 8 }}>
        <input value={dni} onChange={(e) => setDni(e.target.value)} placeholder="DNI" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input value={legajo} onChange={(e) => setLegajo(e.target.value)} placeholder="Legajo (opcional)" />

        <button onClick={onRegister}>Register</button>
        <button onClick={onLogin}>Login</button>
        <button onClick={() => { logout(); setOut({ ok: true, message: 'Logged out' }); }}>Logout</button>
      </div>

      {err && <p style={{ color: 'crimson' }}>{err}</p>}
      {out && <pre>{JSON.stringify(out, null, 2)}</pre>}
    </div>
  );
}