import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const PLACEHOLDER_PROMPTS = [
  "What's your name?",
  "How are you feeling today?",
  "What would you like to achieve with MindMate?"
]
// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
// Helper for random star positions/colors
const STAR_COLORS = ['blue', 'lavender', 'mint']
const STAR_COUNT = 18
const getRandom = (min, max) => Math.random() * (max - min) + min
const generateStars = () => Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  left: `${getRandom(2, 98)}vw`,
  size: `${getRandom(8, 18)}px`,
  delay: `${getRandom(0, 12)}s`,
  bottom: `${getRandom(-10, 60)}vh`
}))

const WelcomePrompts = ({ onComplete }) => {
  const [prompts, setPrompts] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stars] = useState(generateStars())
  const [typedText, setTypedText] = useState('')
  const [responses, setResponses] = useState({})
  const [savingResponses, setSavingResponses] = useState(false)
  const { user, isAuthenticated, updateUser } = useAuth()

  // Add a separate effect to log authentication status for debugging
  useEffect(() => {
    console.log('Authentication status:', { isAuthenticated, user })
  }, [isAuthenticated, user])

  useEffect(() => {
    setLoading(true)
    setError(null)
    console.log('Setting up prompts with auth status:', isAuthenticated)
    
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Process prompts based on authentication status
          let processedData = [...data];
          
          if (isAuthenticated) {
            console.log('User is authenticated, personalizing prompts')
            // Filter out name prompt if user is logged in
            processedData = processedData.filter(prompt => prompt !== "What's your name?");
            
            // Personalize the "How are you feeling today?" prompt
            const feelingIndex = processedData.findIndex(prompt => prompt === "How are you feeling today?");
            if (feelingIndex !== -1) {
              processedData[feelingIndex] = `Hello ${user?.name || 'there'}, how are you feeling today?`;
            }
          } else {
            console.log('User is not authenticated, showing all prompts')
          }
          
          setPrompts(processedData);
        } else {
          // Process placeholder prompts based on authentication status
          let processedPrompts = [...PLACEHOLDER_PROMPTS];
          
          if (isAuthenticated) {
            console.log('User is authenticated, personalizing placeholder prompts')
            // Filter out name prompt if user is logged in
            processedPrompts = processedPrompts.filter(prompt => prompt !== "What's your name?");
            
            // Personalize the "How are you feeling today?" prompt
            const feelingIndex = processedPrompts.findIndex(prompt => prompt === "How are you feeling today?");
            if (feelingIndex !== -1) {
              processedPrompts[feelingIndex] = `Hello ${user?.name || 'there'}, how are you feeling today?`;
            }
          } else {
            console.log('User is not authenticated, showing all placeholder prompts')
          }
          
          setPrompts(processedPrompts);
        }
        setLoading(false)
      })
      .catch(() => {
        // Process placeholder prompts based on authentication status
        let processedPrompts = [...PLACEHOLDER_PROMPTS];
        
        if (isAuthenticated) {
          console.log('User is authenticated (offline mode), personalizing prompts')
          // Filter out name prompt if user is logged in
          processedPrompts = processedPrompts.filter(prompt => prompt !== "What's your name?");
          
          // Personalize the "How are you feeling today?" prompt
          const feelingIndex = processedPrompts.findIndex(prompt => prompt === "How are you feeling today?");
          if (feelingIndex !== -1) {
            processedPrompts[feelingIndex] = `Hello ${user?.name || 'there'}, how are you feeling today?`;
          }
        } else {
          console.log('User is not authenticated (offline mode), showing all prompts')
        }
        
        setPrompts(processedPrompts);
        setError('offline')
        setLoading(false)
      })
  }, [isAuthenticated, user])

  // Typewriter effect for first prompt
  useEffect(() => {
    if (currentPrompt === 0 && prompts[0]) {
      setTypedText('')
      let i = 0
      const interval = setInterval(() => {
        setTypedText(prompts[0].slice(0, i + 1))
        i++
        if (i === prompts[0].length) clearInterval(interval)
      }, 55)
      return () => clearInterval(interval)
    }
  }, [currentPrompt, prompts])

  // Function to save responses to the backend
  const saveResponsesToBackend = async () => {
    if (!isAuthenticated || !user?.user_id) {
      console.warn('User not authenticated, responses will not be saved')
      onComplete && onComplete()
      return
    }
    
    try {
      setSavingResponses(true)
      
      // Prepare the data to send to the backend
      const responseData = {
        user_id: user.user_id,
        responses: responses,
        timestamp: new Date().toISOString()
      }
      
      console.log('Saving user responses:', responseData)
      
      // Send the data to the backend
      const response = await fetch(`${API_URL}/user/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(responseData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save responses')
      }
      
      console.log('Responses saved successfully')
      onComplete && onComplete()
    } catch (error) {
      console.error('Error saving responses:', error)
      // Still call onComplete even if saving fails
      onComplete && onComplete()
    } finally {
      setSavingResponses(false)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Save the current answer to responses object
    if (prompts[currentPrompt]) {
      const currentResponse = {
        ...responses,
        [prompts[currentPrompt]]: answer
      }
      setResponses(currentResponse)

      // If this is the name prompt, update the user's name
      if (prompts[currentPrompt] === "What's your name?" && answer.trim()) {
        updateUser({ ...user, name: answer.trim() })
      }
    }
    
    if (currentPrompt < prompts.length - 1) {
      setCurrentPrompt(prev => prev + 1)
      setAnswer('')
    } else {
      // We've reached the last prompt, save responses and complete
      saveResponsesToBackend()
    }
  }

  return (
    <>
      {/* Animated floating stars background */}
      <div className="welcome-bg-stars">
        {stars.map(star => (
          <div
            key={star.id}
            className={`welcome-star ${star.color}`}
            style={{
              left: star.left,
              width: star.size,
              height: star.size,
              bottom: star.bottom,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>
      <motion.div
        className="card glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          maxWidth: '600px', 
          margin: 'var(--spacing-xl) auto',
          padding: 0,
          zIndex: 1,
          position: 'relative',
          background: 'rgba(43,43,69,0.98)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--color-button-primary), var(--color-text-accent))',
            borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
          }}
        />

        <div style={{ padding: 'var(--spacing-xl)' }}>
          <motion.h2 
            className="text-accent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ 
              marginBottom: 'var(--spacing-lg)',
              fontSize: '1.75rem',
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
            Welcome to MindMate
          </motion.h2>

          {error === 'offline' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                marginBottom: 'var(--spacing-md)',
                textAlign: 'center',
                padding: 'var(--spacing-md)',
                color: '#B8C1EC',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Your mind matters. Every day.
            </motion.p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPrompt}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ 
                marginBottom: 'var(--spacing-lg)',
                fontSize: '1.1rem',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                lineHeight: 1.6,
                minHeight: '2.5em'
              }}>
                {currentPrompt === 0 ? (
                  <span className="typewriter">{typedText}</span>
                ) : (
                  prompts[currentPrompt]
                )}
              </p>

              <form onSubmit={handleSubmit} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'var(--spacing-lg)'
              }}>
                <motion.textarea
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="input"
                  style={{ 
                    width: '100%',
                    minHeight: '120px'
                  }}
                />

                <motion.button
                  type="submit"
                  className="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    alignSelf: 'flex-end',
                    minWidth: '140px'
                  }}
                >
                  {currentPrompt < prompts.length - 1 ? 'Next' : 'Get Started'}
                </motion.button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

export default WelcomePrompts 