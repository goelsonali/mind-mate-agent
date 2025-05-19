import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
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
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#about" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>About</a>
          <a href="#how-it-works" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>How it works</a>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar 