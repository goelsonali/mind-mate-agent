import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
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

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodHistory, setMoodHistory] = useState(SAMPLE_HISTORY)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/mood')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMoodHistory(data)
        } else {
          setMoodHistory(SAMPLE_HISTORY)
        }
      })
      .catch(() => {
        setMoodHistory(SAMPLE_HISTORY)
        setError('Offline mode: showing sample data.')
      })
  }, [])

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood)
    // In offline mode, just update UI
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
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
      {moodHistory.length > 0 && (
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  )
}

export default MoodTracker 