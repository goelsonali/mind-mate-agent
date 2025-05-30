import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const steps = [
  {
    emoji: '🧠',
    title: 'Start the Conversation',
    description: 'A gentle chatbot greets you and asks how you\'re feeling. Share your thoughts in a safe, judgment-free space.',
    color: '#7CAEFF'
  },
  {
    emoji: '😊',
    title: 'Track Your Mood',
    description: 'Choose an emoji that reflects how you feel today. Watch your emotional journey unfold over time.',
    color: '#C2B5FD'
  },
  {
    emoji: '🧘‍♀️',
    title: 'Practice Self-Care',
    description: 'Try calming activities like breathing exercises, journaling, or listening to soothing music.',
    color: '#B0FFCC'
  },
  {
    emoji: '📊',
    title: 'Reflect Through Insights',
    description: 'Your weekly mood trend is visualized in a helpful chart, helping you understand your emotional patterns.',
    color: '#FFB7B2'
  }
]

const HowItWorks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: '#1e1e2f',
        padding: 'var(--spacing-xl)',
        color: '#eaeaea'
      }}
    >
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 'var(--spacing-xl)'
      }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            marginBottom: 'var(--spacing-xl)',
            textAlign: 'center'
          }}
        >
          <motion.h1 
            style={{
              fontSize: '2.5rem',
              marginBottom: 'var(--spacing-md)',
              color: '#b0ffcc',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(176, 255, 204, 0.3)',
              fontFamily: 'var(--font-family-primary)'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            How It Works
          </motion.h1>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: '#dddddd',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.5,
            fontFamily: 'var(--font-family-primary)'
          }}>
            Discover how MindMate helps you reflect, relax, and recharge.🌿
          </h3>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: 'var(--spacing-xl)'
        }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
              }}
              style={{
                background: '#2b2b45',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: 'var(--spacing-sm)',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))'
              }}>
                {step.emoji}
              </div>
              <h2 style={{
                color: '#b0ffcc',
                fontSize: '1.5rem',
                marginBottom: 'var(--spacing-sm)',
                fontWeight: 600,
                fontFamily: 'var(--font-family-primary)'
              }}>
                {step.title}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.5,
                color: '#dddddd',
                fontWeight: 400,
                fontFamily: 'var(--font-family-primary)'
              }}>
                {step.description}
              </p>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: step.color,
                opacity: 0.8,
                boxShadow: `0 0 12px ${step.color}`
              }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-xl)'
          }}
        >
          <blockquote style={{
            fontSize: '1.5rem',
            color: '#b0ffcc',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto',
            padding: 'var(--spacing-lg)',
            borderLeft: '4px solid #7CAEFF',
            background: 'rgba(124, 174, 255, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 500
          }}>
            "One small check-in a day can make a big difference."
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center'
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: '0.75rem 1.5rem',
              background: '#7CAEFF',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.1rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(124, 174, 255, 0.3)',
              fontFamily: 'var(--font-family-primary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(124, 174, 255, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 174, 255, 0.3)'
            }}
          >
            ← Back to Chat
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HowItWorks 