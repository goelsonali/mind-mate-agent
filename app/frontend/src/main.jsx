import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

console.log('main.jsx starting...');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);

  if (!rootElement) {
    throw new Error('Root element not found!');
  }

  const root = createRoot(rootElement);
  console.log('Root created');

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('Render called');
} catch (error) {
  console.error('Error in main.jsx:', error);
  document.body.innerHTML = `<div style="color: red; padding: 20px;">
    Error: ${error.message}
  </div>`;
}
