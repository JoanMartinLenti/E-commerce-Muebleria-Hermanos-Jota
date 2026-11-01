export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
      <div style={{
        width: '45px',
        height: '45px',
        border: '5px solid #e0e0e0',
        borderTop: '5px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite'
      }} />
      <p style={{ marginTop: '1rem', color: '#6b7280' }}>Cargando información...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}