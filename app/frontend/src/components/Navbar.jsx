import { motion } from 'framer-motion'
import { useState } from 'react'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="navbar"
      style={{
        background: 'var(--navbar-bg)',
        color: 'var(--text-color)',
        backdropFilter: 'blur(10px)',
        padding: '1.25rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 960, margin: '0 auto', padding: '0 2rem' }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'var(--primary-color)', fontSize: '1.7rem', fontWeight: 700, letterSpacing: 1 }}
        >
          MindMate
        </motion.h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>About</a>
          <a href="#how-it-works" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>How it works</a>
          <a
            href="#login"
            style={{
              color: '#A6FFC4',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderRadius: '8px',
              padding: '0.4rem 1.1rem',
              background: 'linear-gradient(90deg, #7CAEFF22, #A6FFC422)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'background 0.2s',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1.1,
            }}
            onClick={e => { e.preventDefault(); setLoginOpen(true); }}
          >
            Login
          </a>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </motion.nav>
  )
}

export default Navbar 