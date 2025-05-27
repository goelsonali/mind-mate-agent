import React, { useState } from 'react'
import Navbar from './components/Navbar'
import WelcomePrompts from './components/WelcomePrompts'
import ChatBox from './components/ChatBox'
import MoodTracker from './components/MoodTracker'
import ActivitySuggestions from './components/ActivitySuggestions'
import './styles/global.css'
import { AuthProvider, useAuth } from './context/AuthContext';
import GoogleLogin from './components/GoogleLogin';

function Dashboard() {
  const [mood, setMood] = useState("happy")
  console.log('Dashboard rendering');
  const { user, logout } = useAuth();
  console.log('Dashboard user:', user);
  
  return (
    <div className="dashboard">
      <h1>Welcome to MindMate</h1>
      <p>Hello, {user?.name || 'User'}!</p>
      <button onClick={logout}>Logout</button>
      <Navbar />
      <main className="container">
        <WelcomePrompts />
        <MoodTracker setMood={setMood} />
        <ActivitySuggestions mood={mood} />
        <ChatBox />
      </main>
    </div>
  );
}

function AppContent() {
  console.log('AppContent rendering');
  const { isAuthenticated, loading } = useAuth();
  console.log('AppContent state:', { isAuthenticated, loading });
  
  if (loading) {
    console.log('AppContent showing loading state');
    return <div>Loading...</div>;
  }

  console.log('AppContent rendering main content');
  return (
    <div className="app-container">
      {isAuthenticated ? <Dashboard /> : <GoogleLogin />}
    </div>
  );
}

function App() {
  console.log('App rendering');
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;