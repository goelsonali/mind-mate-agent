import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import { useAuth } from '../context/AuthContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const moods = [
  { emoji: '😊', label: 'Great' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Down' },
  { emoji: '😢', label: 'Sad' }
]

const SAMPLE_HISTORY = [
  { date: 'Mon', value: 5 },
  { date: 'Tue', value: 4 },
  { date: 'Wed', value: 3 },
  { date: 'Thu', value: 4 },
  { date: 'Fri', value: 2 },
  { date: 'Sat', value: 3 },
  { date: 'Sun', value: 4 }
]

const MoodTracker = ({ setMood }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodHistory, setMoodHistory] = useState(SAMPLE_HISTORY)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:8000/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.mood_history && data.mood_history.length > 0) {
          const history = data.mood_history.map(entry => ({
            date: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
            value: moods.findIndex(m => m.label.toLowerCase() === entry.mood.toLowerCase()) + 1
          }));
          setMoodHistory(history);
        }
      })
      .catch((err) => {
        console.error('Error fetching mood history:', err);
        setError('Failed to load mood history.');
      });
  }, [token])

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setMood(mood.label)
  }

  const handleSaveMood = async () => {
    if (!selectedMood || !token) return;
    
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/user/mood', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mood: selectedMood.label })
      });

      if (!response.ok) {
        throw new Error('Failed to save mood');
      }

      // Add new mood to history
      const newEntry = {
        date: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        value: moods.findIndex(m => m === selectedMood) + 1
      };
      setMoodHistory([...moodHistory.slice(-6), newEntry]);
    } catch (err) {
      console.error('Error saving mood:', err);
      setError('Failed to save mood. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  const chartData = {
    labels: moodHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood',
        data: moodHistory.map(entry => entry.value),
        borderColor: 'var(--primary)',
        backgroundColor: 'rgba(124, 174, 255, 0.1)',
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'var(--text)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'var(--text)'
        }
      }
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>How are you feeling today?</h2>
      {error && <p style={{ color: 'var(--accent)', marginBottom: '1rem' }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood)}
            style={{
              background: selectedMood?.label === mood.label ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mood.emoji}
          </motion.button>
        ))}
        </div>
        {selectedMood && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSaveMood}
            disabled={isSaving}
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? 'Saving...' : 'Save Mood'}
          </motion.button>
        )}
      </div>
      {moodHistory.length > 0 && (
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  )
}

export default MoodTracker 