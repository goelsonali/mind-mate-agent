import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const MOTIVATIONAL_QUOTES = [
  "You've survived 100% of your worst days.",
  "Every day is a fresh start.",
  "You are stronger than you think.",
  "Small steps lead to big changes.",
  "Your feelings are valid and important."
]

const ACTIVITY_SUGGESTIONS = [
  { title: "Take a Short Walk", description: "A 5-minute walk can help clear your mind and boost your mood." },
  { title: "Listen to Calm Music", description: "Put on some soothing tunes and take a moment to relax." },
  { title: "Practice Breathing", description: "Take 2 minutes to focus on your breath and center yourself." },
  { title: "Stretch Your Body", description: "Simple stretches can help release tension and improve your mood." }
]

const BreathingExercise = ({ onClose }) => {
  const [phase, setPhase] = useState('inhale') // 'inhale', 'hold', 'exhale'
  const [cycle, setCycle] = useState(0)

  const startBreathing = () => {
    const phases = ['inhale', 'hold', 'exhale']
    let currentPhase = 0
    let currentCycle = 0

    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % phases.length
      if (currentPhase === 0) {
        currentCycle++
        setCycle(currentCycle)
      }
      setPhase(phases[currentPhase])

      if (currentCycle >= 3) {
        clearInterval(interval)
        setTimeout(onClose, 1000)
      }
    }, 4000)
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '400px',
        textAlign: 'center',
        padding: 'var(--spacing-xl)'
      }}
    >
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.2 : 1,
          opacity: phase === 'hold' ? 0.8 : 1
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        style={{
          width: '150px',
          height: '150px',
          margin: '0 auto var(--spacing-lg)',
          borderRadius: '50%',
          background: 'var(--color-button-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
      </motion.div>
      <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-secondary)' }}>
        Cycle {cycle + 1} of 3
      </p>
      {cycle === 0 && (
        <motion.button
          className="button"
          onClick={startBreathing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Breathing Exercise
        </motion.button>
      )}
    </motion.div>
  )
}

const JournalPrompt = ({ onClose }) => {
  const [entry, setEntry] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('journalEntry', entry)
    setSaved(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '500px',
        width: '90%',
        padding: 'var(--spacing-xl)'
      }}
    >
      <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-text-accent)' }}>
        Journal Your Thoughts
      </h3>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="How are you feeling right now? What's on your mind?"
        className="input"
        style={{ minHeight: '200px', marginBottom: 'var(--spacing-lg)' }}
      />
      <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
        <motion.button
          className="button secondary"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          className="button"
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={saved}
        >
          {saved ? 'Saved!' : 'Save Entry'}
        </motion.button>
      </div>
    </motion.div>
  )
}

const QuoteCard = ({ onClose }) => {
  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '400px',
        textAlign: 'center',
        padding: 'var(--spacing-xl)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 'var(--spacing-lg)' }}
      >
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--color-text-accent)',
          fontStyle: 'italic',
          lineHeight: 1.6
        }}>
          "{randomQuote}"
        </p>
      </motion.div>
      <motion.button
        className="button"
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Close
      </motion.button>
    </motion.div>
  )
}

const ActivityCard = ({ onClose }) => {
  const { user } = useAuth()
  const randomActivity = ACTIVITY_SUGGESTIONS[Math.floor(Math.random() * ACTIVITY_SUGGESTIONS.length)]

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '400px',
        padding: 'var(--spacing-xl)'
      }}
    >
      <h3 style={{ 
        marginBottom: 'var(--spacing-md)',
        color: 'var(--color-text-accent)'
      }}>
        {user?.name ? `${user.name}, here's a suggested activity` : 'Suggested Activity'}
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 style={{ 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-text-primary)'
        }}>
          {randomActivity.title}
        </h4>
        <p style={{ 
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          {randomActivity.description}
        </p>
      </motion.div>
      <motion.button
        className="button"
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Try This Activity
      </motion.button>
    </motion.div>
  )
}

const ClosingMessage = ({ onReset }) => {
  const { user } = useAuth()

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        marginTop: 'var(--spacing-lg)',
        padding: 'var(--spacing-xl)',
        textAlign: 'center'
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '1.2rem',
          color: 'var(--color-text-accent)',
          marginBottom: 'var(--spacing-lg)'
        }}
      >
        {user?.name 
          ? `Thank you for checking in, ${user.name}. I'm always here when you need to talk.`
          : "Thank you for checking in. I'm always here when you need to talk."}
      </motion.p>
      <motion.button
        className="button"
        onClick={onReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          margin: '0 auto'
        }}
      >
        <span>🔄</span>
        Talk to MindMate again
      </motion.button>
    </motion.div>
  )
}

const PostChatSuggestions = ({ onClose, onReset }) => {
  const { user } = useAuth()
  const [activeModal, setActiveModal] = useState(null)
  const [showClosingMessage, setShowClosingMessage] = useState(false)

  const handleModalClose = () => {
    setActiveModal(null)
    setShowClosingMessage(true)
  }

  const suggestions = [
    { id: 'breathing', icon: '🧘', label: 'Start Breathing', component: BreathingExercise },
    { id: 'journal', icon: '📓', label: 'Write in Journal', component: JournalPrompt },
    { id: 'quote', icon: '💬', label: 'Inspire Me', component: QuoteCard },
    { id: 'activity', icon: '🎯', label: 'Suggest an Activity', component: ActivityCard }
  ]

  if (showClosingMessage) {
    return <ClosingMessage onReset={onReset} />
  }

  return (
    <>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        style={{
          marginTop: 'var(--spacing-lg)',
          padding: 'var(--spacing-xl)'
        }}
      >
        <h3 style={{ 
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-accent)',
          textAlign: 'center'
        }}>
          {user?.name 
            ? `${user.name}, would you like to try one of these self-care activities?`
            : "Thank you for sharing. Would you like to try one of these self-care activities?"}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-md)',
          padding: 'var(--spacing-md)'
        }}>
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion.id}
              className="button secondary"
              onClick={() => setActiveModal(suggestion.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md)',
                fontSize: '1.1rem'
              }}
            >
              <span>{suggestion.icon}</span>
              {suggestion.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeModal && (
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
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 999
            }}
            onClick={() => setActiveModal(null)}
          >
            {suggestions.find(s => s.id === activeModal)?.component({
              onClose: handleModalClose
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PostChatSuggestions 