import { useState } from 'react';

type Props = { onLogin: (token: string) => void };
export default function Login({ onLogin }: Props) {
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const url = mode === 'login' ? '/api/login' : '/api/register';
    const res = await fetch('http://localhost:3000' + url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      onLogin(data.token);
    } else {
      setError(data.error || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
      <h2>{mode==='login'?'Iniciar sesión':'Registrarse'}</h2>
      <input
        placeholder="Usuario"
        value={username}
        onChange={e=>setUsername(e.target.value)}
        style={{ width:'50%', padding:8 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        style={{ width:'50%', padding:8 }}
      />
      <button type="submit" style={{ width:'50%', padding:8, background:'#807e7e',color:'#fff',border:'none',cursor:'pointer' }}>
        {mode==='login'?'Ingresar':'Crear Cuenta'}
      </button>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p style={{ fontSize:'0.9em', cursor:'pointer' }}>
        {mode==='login'
          ? '¿No tienes cuenta? '
          : '¿Ya tienes cuenta? '}
        <span
          onClick={()=>{ setMode(mode==='login'?'register':'login'); setError(''); }}
          style={{ textDecoration:'underline' }}
        >
          {mode==='login'?'Regístrate':'Inicia sesión'}
        </span>
      </p>
    </form>
  );
}
