import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="navbar navbar-custom"
    >
      <div className="container navbar-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="navbar-title"
            style={{ color: '#ffffff' }}
          >
            MindMate
          </motion.h1>
        </Link>
        <div className="navbar-links">
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/how-it-works" className="navbar-link">How it works</Link>
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting" style={{ marginRight: '10px', color: '#B8C1EC' }}>
                Hello, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="navbar-login"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                  color: 'inherit'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="#login"
              className="navbar-login"
              onClick={e => { e.preventDefault(); setLoginOpen(true); }}
              style={{
                color: 'var(--color-mint, #A6FFC4)',
                fontWeight: 600,
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                font: 'inherit',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
            >
              Login
            </a>
          )}
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </motion.nav>
  )
}

export default Navbar