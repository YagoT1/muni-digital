import { apiFetch } from '../services/api';

export async function login(email: string, password: string) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem('access_token', data.access_token);

  return data;
}

export async function register(
  dni: string,
  email: string,
  password: string,
) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ dni, email, password }),
  });

  localStorage.setItem('access_token', data.access_token);

  return data;
}

export function logout() {
  localStorage.removeItem('access_token');
}