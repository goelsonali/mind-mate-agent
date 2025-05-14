import Navbar from './components/Navbar'
import WelcomePrompts from './components/WelcomePrompts'
import ChatBox from './components/ChatBox'
import MoodTracker from './components/MoodTracker'
import './styles/global.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <WelcomePrompts />
        <MoodTracker />
        <ChatBox />
      </main>
    </div>
  )
}

export default App
