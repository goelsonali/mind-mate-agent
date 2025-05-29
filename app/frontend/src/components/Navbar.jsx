import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="navbar navbar-custom"
    >
      <div className="container navbar-container">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="navbar-title"
        >
          MindMate
        </motion.h1>
        <div className="navbar-links">
          <a href="#about" className="navbar-link">About</a>
          <a href="#how-it-works" className="navbar-link">How it works</a>
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting" style={{ marginRight: '10px', color: '#B8C1EC' }}>
                Hello, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <a
                href="#logout"
                className="navbar-login"
                onClick={e => { e.preventDefault(); logout(); }}
              >
                Logout
              </a>
            </div>
          ) : (
            <a
              href="#login"
              className="navbar-login"
              onClick={e => { e.preventDefault(); setLoginOpen(true); }}
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