import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  const esUsuario = true;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen ">
          <div className="dots-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : esUsuario ? (
        <AppRoutes />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Acceso Denegado</h1>
        </div>
      )}
    </>
  );
}

export default App;
