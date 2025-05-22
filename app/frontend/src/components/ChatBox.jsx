import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchChatResponse } from "../api/api"
import PostChatSuggestions from './PostChatSuggestions'

const SAMPLE_MESSAGES = [
  { text: "Hi, I'm MindMate! How can I support you today?", sender: 'ai' }
]

const INACTIVITY_TIMEOUT = 30000 // 30 seconds of inactivity before showing suggestions

const ChatBox = () => {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const messagesEndRef = useRef(null)
  const inactivityTimerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Reset inactivity timer on any user activity
    const resetTimer = () => {
      setLastActivity(Date.now())
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      inactivityTimerRef.current = setTimeout(() => {
        if (!showSuggestions && messages.length > 1) {
          setShowSuggestions(true)
        }
      }, INACTIVITY_TIMEOUT)
    }

    // Add activity listeners
    const handleActivity = () => {
      resetTimer()
    }

    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('keydown', handleActivity)
    window.addEventListener('click', handleActivity)
    window.addEventListener('scroll', handleActivity)

    // Initial timer setup
    resetTimer()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('scroll', handleActivity)
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [showSuggestions, messages.length])

  const handleReset = () => {
    setMessages(SAMPLE_MESSAGES)
    setInput('')
    setIsTyping(false)
    setShowSuggestions(false)
    setLastActivity(Date.now())
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (messages.length > 1) {
        setShowSuggestions(true)
      }
    }, INACTIVITY_TIMEOUT)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setShowSuggestions(false) // Hide suggestions when user sends a new message

    try {
      const response = await fetchChatResponse('user123', input)
      setMessages((prev) => [...prev, { text: response.reply, sender: "ai" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "(Offline) I'm here for you!", sender: "ai" }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        height: '500px', 
        display: 'flex', 
        flexDirection: 'column',
        padding: 0
      }}
    >
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)'
      }}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  background: message.sender === 'user' 
                    ? 'var(--color-button-primary)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  borderRadius: message.sender === 'user' 
                    ? 'var(--radius-md) var(--radius-md) 0 var(--radius-md)'
                    : 'var(--radius-md) var(--radius-md) var(--radius-md) 0',
                  maxWidth: '70%',
                  boxShadow: 'var(--shadow-sm)',
                  color: 'var(--color-text-primary)',
                  fontSize: '1rem',
                  lineHeight: 1.5
                }}
              >
                {message.text}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              display: 'flex', 
              gap: 'var(--spacing-xs)',
              padding: 'var(--spacing-md)',
              alignSelf: 'flex-start'
            }}
          >
            <motion.div 
              className="typing-dot"
              animate={{ 
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: '8px',
                height: '8px',
                background: 'var(--color-text-muted)',
                borderRadius: '50%'
              }}
            />
            <motion.div 
              className="typing-dot"
              animate={{ 
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              style={{
                width: '8px',
                height: '8px',
                background: 'var(--color-text-muted)',
                borderRadius: '50%'
              }}
            />
            <motion.div 
              className="typing-dot"
              animate={{ 
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4
              }}
              style={{
                width: '8px',
                height: '8px',
                background: 'var(--color-text-muted)',
                borderRadius: '50%'
              }}
            />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <PostChatSuggestions 
            onClose={() => setShowSuggestions(false)} 
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      <form 
        onSubmit={handleSubmit} 
        style={{ 
          padding: 'var(--spacing-lg)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md)',
          position: 'relative'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input"
            style={{ 
              flex: 1,
              minHeight: '44px'
            }}
          />
          <motion.button
            type="submit"
            className="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              minWidth: '100px'
            }}
          >
            Send
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default ChatBox 