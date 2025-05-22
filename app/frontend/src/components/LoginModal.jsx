import { useState } from 'react'

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  if (!open) return null

  return (
    <div className="login-modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(120deg, #23243a 0%, #2d2a4a 100%)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      animation: 'fadeIn 0.5s',
    }}>
      <div className="login-modal-card" onClick={e => e.stopPropagation()} style={{
        background: 'rgba(58, 45, 101, 0.98)',
        borderRadius: '28px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        position: 'relative',
        minWidth: 340,
        maxWidth: '95vw',
        width: 400,
        padding: '2.5rem 2rem 2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        borderImage: 'linear-gradient(90deg, #7CAEFF, #A6FFC4) 1',
      }}>
        <div className="login-modal-slogan" style={{
          color: '#B8C1EC',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: '2rem',
          letterSpacing: '0.01em',
        }}>
          A peaceful mind begins with one simple check-in.
        </div>
        <button className="google-signin-btn" aria-label="Sign in with Google" style={{
          width: '100%',
          background: 'linear-gradient(90deg, #B8C1EC 0%, #A6FFC4 100%)',
          color: '#1e1e3f',
          fontWeight: 600,
          border: 'none',
          borderRadius: '12px',
          padding: '0.85rem 0',
          fontSize: '1.08rem',
          marginBottom: '1.2rem',
          boxShadow: '0 2px 12px #b8c1ec22',
          cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}>
          <span style={{fontSize: '1.3em', marginRight: 8}}>🔒</span>
          Sign in with Google
        </button>
        <div className="login-divider" style={{
          color: '#B8C1EC',
          margin: '1rem 0 1.2rem 0',
          fontSize: '1rem',
          textAlign: 'center',
          width: '100%',
          position: 'relative',
        }}>or</div>
        <form className="login-form" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.7rem',
        }}>
          <label htmlFor="login-email" style={{ color: '#B8C1EC', fontSize: '0.98rem', marginBottom: '0.2rem' }}>Email or Username</label>
          <input id="login-email" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email or username" autoFocus style={{
            width: '100%',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            border: '1px solid #4E4A67',
            background: 'rgba(255,255,255,0.97)',
            color: '#2D254C',
            fontSize: '1rem',
            marginBottom: '0.2rem',
          }} />
          <label htmlFor="login-password" style={{ color: '#B8C1EC', fontSize: '0.98rem', marginBottom: '0.2rem' }}>Password</label>
          <input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" style={{
            width: '100%',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            border: '1px solid #4E4A67',
            background: 'rgba(255,255,255,0.97)',
            color: '#2D254C',
            fontSize: '1rem',
            marginBottom: '0.2rem',
          }} />
          <div className="login-form-row" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: '#A6FFC4', width: 16, height: 16 }}
                id="remember-me-checkbox"
              />
              <label htmlFor="remember-me-checkbox" style={{ marginLeft: 8, color: '#B8C1EC', fontSize: '0.95rem', cursor: 'pointer' }}>
                Remember me
              </label>
            </div>
            <a href="#signup" className="signup-link" style={{ color: '#A6FFC4', textDecoration: 'none', fontSize: '0.97rem', fontWeight: 500, transition: 'color 0.2s' }}>Sign up</a>
          </div>
          <button type="submit" className="login-btn" style={{
            width: '100%',
            background: '#7A6CF4',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.85rem 0',
            fontSize: '1.08rem',
            fontWeight: 600,
            marginTop: '0.7rem',
            boxShadow: '0 2px 8px #7a6cf422',
            cursor: 'pointer',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal 