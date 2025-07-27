import { useState } from 'react';
import './index.css';
import Login from './Login';
import Notes from './Notes';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('No se pudo llamar a logout:', err);
    }

    // Eliminar el token local y redirigir
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="app-container">
      {/* Este header siempre aparece */}
      <header>
        <h1>Taller Desarrollo Seguro</h1>
        {token && (
          <button onClick={handleLogout}>Cerrar sesión</button>
        )}
      </header>

      {/* Línea separadora si quieres */}
      <div className="divider" />

      {token ? (
        <Notes token={token} />
      ) : (
        <div className="login-wrapper">
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
