import { useState } from 'react'

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  if (!open) return null

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-card" onClick={e => e.stopPropagation()}>
        <div className="login-modal-slogan">
          A peaceful mind begins with one simple check-in.
        </div>
        <button className="google-signin-btn">
          <span style={{fontSize: '1.3em', marginRight: 8}}>🔒</span>
          Sign in with Google
        </button>
        <div className="login-divider">or</div>
        <form className="login-form">
          <label>Email or Username</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email or username" autoFocus />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
          <div className="login-form-row">
            <label className="remember-me">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              Remember me
            </label>
            <a href="#signup" className="signup-link">Sign up</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal 