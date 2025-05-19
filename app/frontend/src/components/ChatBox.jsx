import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchChatResponse } from "../api/api"

const SAMPLE_MESSAGES = [
  { text: "Hi, I'm MindMate! How can I support you today?", sender: 'ai' }
]

const ChatBox = () => {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Try backend, fallback to dummy reply
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
    <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}
            >
              <div
                style={{
                  background: message.sender === 'user' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius)',
                  maxWidth: '70%'
                }}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}
          >
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1 }}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox 