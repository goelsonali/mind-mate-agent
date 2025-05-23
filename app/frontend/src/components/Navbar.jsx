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
          <a
            href="#login"
            className="navbar-login"
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