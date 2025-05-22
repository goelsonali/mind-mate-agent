import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import WelcomePrompts from './components/WelcomePrompts'
import ChatBox from './components/ChatBox'
import MoodTracker from './components/MoodTracker'
import ActivitySuggestions from './components/ActivitySuggestions'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import './styles/global.css'

const MainContent = () => {
  const [mood, setMood] = useState("happy")
  const [showWelcome, setShowWelcome] = useState(true)
  const location = useLocation()

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  return (
    <main className="container">
      <AnimatePresence mode="wait">
        {showWelcome && location.pathname === '/' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomePrompts onComplete={handleWelcomeComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-xl)'
            }}
          >
            {location.pathname === '/' && (
              <>
                <MoodTracker setMood={setMood} />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--spacing-xl)',
                  '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr'
                  }
                }}>
                  <ActivitySuggestions mood={mood} />
                  <ChatBox />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
        <footer className="footer">
          <p>This app is not a substitute for professional mental health care.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
