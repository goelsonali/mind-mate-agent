import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
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
        maxWidth: '800px',
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
            About MindMate
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
            Your AI-powered companion for emotional well-being.
          </h3>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
          }}
          style={{
            background: '#2b2b45',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            marginBottom: 'var(--spacing-xl)',
            transition: 'all 0.3s ease'
          }}
        >
          <h2 style={{
            color: '#b0ffcc',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '1.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family-primary)'
          }}>
            What is MindMate?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.5,
            color: '#dddddd',
            fontWeight: 400,
            fontFamily: 'var(--font-family-primary)'
          }}>
            MindMate is a mental health companion powered by AI, designed to support your emotional wellness through daily check-ins, mood tracking, and thoughtful conversations.
            It's not a replacement for professional help, but a friendly tool to help you reflect and feel supported every day.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
          }}
          style={{
            background: '#2b2b45',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            marginBottom: 'var(--spacing-xl)',
            transition: 'all 0.3s ease'
          }}
        >
          <h2 style={{
            color: '#b0ffcc',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '1.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family-primary)'
          }}>
            What Can You Do Here?
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Chat with an AI agent trained to respond gently',
              'Track your mood with emoji-based inputs',
              'View mood trends over the week',
              'Try breathing exercises and journaling',
              'Receive gentle prompts and motivational messages'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  marginBottom: 'var(--spacing-md)',
                  fontSize: '1.1rem',
                  color: '#dddddd',
                  fontWeight: 400,
                  fontFamily: 'var(--font-family-primary)',
                  lineHeight: 1.5
                }}
              >
                <span style={{ 
                  color: '#7CAEFF', 
                  fontSize: '1.5rem',
                  filter: 'drop-shadow(0 0 8px rgba(124, 174, 255, 0.3))'
                }}>✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
          }}
          style={{
            background: '#2b2b45',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            marginBottom: 'var(--spacing-xl)',
            transition: 'all 0.3s ease'
          }}
        >
          <h2 style={{
            color: '#b0ffcc',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '1.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family-primary)'
          }}>
            Privacy & Safety
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.5,
            color: '#dddddd',
            fontWeight: 400,
            fontFamily: 'var(--font-family-primary)'
          }}>
            MindMate does <strong style={{ color: '#7CAEFF' }}>not collect personal data</strong> or share your information.<br />
            All input is used locally to help you feel better.<br />
            This app is <em style={{ color: '#C2B5FD' }}>not a substitute for professional mental health support.</em>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
          }}
          style={{
            background: '#2b2b45',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            marginBottom: 'var(--spacing-xl)',
            transition: 'all 0.3s ease'
          }}
        >
          <h2 style={{
            color: '#b0ffcc',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '1.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family-primary)'
          }}>
            Who Is This For?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.5,
            color: '#dddddd',
            marginBottom: 'var(--spacing-lg)',
            fontWeight: 400,
            fontFamily: 'var(--font-family-primary)'
          }}>
            Whether you're feeling great, stressed, or anything in between, MindMate is here to listen, reflect, and support.
          </p>
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              borderLeft: '4px solid #7CAEFF',
              padding: 'var(--spacing-md) var(--spacing-lg)',
              margin: 0,
              background: 'rgba(124, 174, 255, 0.1)',
              borderRadius: '12px',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: '#b0ffcc',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              fontFamily: 'var(--font-family-primary)',
              fontWeight: 500
            }}
          >
            "Your feelings are valid. Your story matters. And you're not alone."
          </motion.blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            textAlign: 'center',
            marginTop: 'var(--spacing-xl)'
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

export default About 