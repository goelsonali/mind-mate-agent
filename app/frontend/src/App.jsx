import React, { useState } from 'react'
import Navbar from './components/Navbar'
import WelcomePrompts from './components/WelcomePrompts'
import ChatBox from './components/ChatBox'
import MoodTracker from './components/MoodTracker'
import ActivitySuggestions from './components/ActivitySuggestions'
import './styles/global.css'

function App() {
  const [mood, setMood] = useState("happy")

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <WelcomePrompts />
        <MoodTracker setMood={setMood} />
        <ActivitySuggestions mood={mood} />
        <ChatBox />
      </main>
    </div>
  )
}

export default App
