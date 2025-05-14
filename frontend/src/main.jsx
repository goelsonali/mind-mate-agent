import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Add typing animation styles
const style = document.createElement('style')
style.textContent = `
  .typing-dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    animation: typing 1s infinite ease-in-out;
  }
  .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes typing {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
