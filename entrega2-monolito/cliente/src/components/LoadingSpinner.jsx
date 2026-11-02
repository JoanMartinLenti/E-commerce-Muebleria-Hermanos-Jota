import React from 'react';

function LoadingSpinner({ label = 'Cargando...' }) {
  return (
    <div className="catalog-message" role="status" aria-live="polite" aria-busy="true">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export default LoadingSpinner;
