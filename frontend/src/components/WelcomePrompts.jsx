import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PLACEHOLDER_PROMPTS = [
  "What's your name?",
  "How are you feeling today?",
  "What would you like to achieve with MindMate?"
]

const WelcomePrompts = ({ onComplete }) => {
  const [prompts, setPrompts] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch('http://localhost:8000/prompts')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPrompts(data)
        } else {
          setPrompts(PLACEHOLDER_PROMPTS)
        }
        setLoading(false)
      })
      .catch(() => {
        setPrompts(PLACEHOLDER_PROMPTS)
        setError('Using offline mode. Some features may be limited.')
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentPrompt < prompts.length - 1) {
      setCurrentPrompt(prev => prev + 1)
      setAnswer('')
    } else {
      onComplete && onComplete()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{ maxWidth: '600px', margin: '2rem auto', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', background: 'var(--card-color)', color: 'var(--text-color)' }}
    >
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)', fontWeight: 700, fontSize: '1.4rem' }}>
        Welcome to MindMate
      </h2>
      {error && <p style={{ color: 'var(--primary-hover)', marginBottom: '1rem' }}>{error}</p>}
      <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
        {prompts[currentPrompt]}
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          style={{ width: '100%', minHeight: '90px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.95)', color: 'var(--text-color)', fontSize: '1rem', padding: '0.5rem 1rem' }}
        />
        <button type="submit" style={{ alignSelf: 'flex-end', minWidth: 120 }}>
          {currentPrompt < prompts.length - 1 ? 'Next' : 'Get Started'}
        </button>
      </form>
    </motion.div>
  )
}

export default WelcomePrompts 