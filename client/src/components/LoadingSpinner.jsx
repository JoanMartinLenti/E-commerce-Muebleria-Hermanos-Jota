import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ mensaje = 'Cargando datos...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <Loader2
        style={{
          width: '44px',
          height: '44px',
          color: 'var(--primary)',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {mensaje}
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
