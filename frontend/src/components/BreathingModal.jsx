import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BreathingModal = ({ onClose }) => {
  const [phase, setPhase] = useState('inhale')
  const [count, setCount] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === 'inhale') {
        if (count > 0) {
          setCount(prev => prev - 1)
        } else {
          setPhase('hold')
          setCount(4)
        }
      } else if (phase === 'hold') {
        if (count > 0) {
          setCount(prev => prev - 1)
        } else {
          setPhase('exhale')
          setCount(4)
        }
      } else if (phase === 'exhale') {
        if (count > 0) {
          setCount(prev => prev - 1)
        } else {
          setPhase('inhale')
          setCount(4)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [phase, count])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          style={{
            background: 'var(--background)',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
            maxWidth: '90%',
            width: '400px'
          }}
          onClick={e => e.stopPropagation()}
        >
          <motion.div
            animate={{
              scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut'
            }}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'var(--primary)',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--background)'
            }}
          >
            {phase === 'inhale' ? 'Inhale' : phase === 'exhale' ? 'Exhale' : 'Hold'}
          </motion.div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
            {count} seconds
          </h2>
          <p style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>
            Focus on your breath. Let your thoughts come and go.
          </p>
          <button onClick={onClose}>Close</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BreathingModal 