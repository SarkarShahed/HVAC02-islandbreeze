import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global early listener and console error tap for Google Maps Platform quota defense
(window as any).gm_authFailure = () => {
  (window as any).isDirectionsQuotaExceeded = true;
  window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
};
const origError = console.error;
console.error = (...args: unknown[]) => {
  const msg = args.map((a) => String(a)).join(' ');
  const isQuotaError = 
    msg.includes('OverQuotaMapError') || 
    msg.includes('QuotaExceededError') ||
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('exceeded your daily request quota') ||
    msg.includes('Directions Service') ||
    msg.includes('DIRECTIONS_ROUTE');

  if (isQuotaError) {
    (window as any).isDirectionsQuotaExceeded = true;
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    console.warn("[Google Maps Quota Notice]", msg);
  } else {
    origError.apply(console, args);
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
