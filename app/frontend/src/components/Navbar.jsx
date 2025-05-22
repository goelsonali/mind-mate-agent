import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="navbar"
    >
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 var(--spacing-xl)'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-accent"
            style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-family-primary)'
            }}
          >
            MindMate
          </motion.h1>
        </Link>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ 
            display: 'flex', 
            gap: 'var(--spacing-xl)',
            alignItems: 'center'
          }}
        >
          <Link 
            to="/how-it-works" 
            className="nav-link"
            style={{ 
              color: isActive('/how-it-works') ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1.1rem',
              transition: 'color var(--transition-fast)',
              position: 'relative',
              padding: '0.5rem 0'
            }}
          >
            How It Works
            {isActive('/how-it-works') && (
              <motion.div
                layoutId="navbar-indicator"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--color-accent)',
                  borderRadius: '2px'
                }}
              />
            )}
          </Link>
          <Link 
            to="/about" 
            className="nav-link"
            style={{ 
              color: isActive('/about') ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1.1rem',
              transition: 'color var(--transition-fast)',
              position: 'relative',
              padding: '0.5rem 0'
            }}
          >
            About
            {isActive('/about') && (
              <motion.div
                layoutId="navbar-indicator"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--color-accent)',
                  borderRadius: '2px'
                }}
              />
            )}
          </Link>
          <Link 
            to="/"
            className="nav-link"
            style={{ 
              color: isActive('/') ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1.1rem',
              transition: 'color var(--transition-fast)',
              position: 'relative',
              padding: '0.5rem 0'
            }}
          >
            Chat
            {isActive('/') && (
              <motion.div
                layoutId="navbar-indicator"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--color-accent)',
                  borderRadius: '2px'
                }}
              />
            )}
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar 