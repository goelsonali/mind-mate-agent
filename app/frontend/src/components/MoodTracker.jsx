import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const moods = [
  { emoji: '😄', label: 'Happy', value: 5, color: '#B4F8C8' },
  { emoji: '🙂', label: 'Okay', value: 4, color: '#A0E7E5' },
  { emoji: '😐', label: 'Neutral', value: 3, color: '#A094F7' },
  { emoji: '😔', label: 'Tired', value: 2, color: '#8D7EFC' },
  { emoji: '😢', label: 'Sad', value: 1, color: '#7B68EE' }
]

const SAMPLE_HISTORY = [
  { date: 'Monday', value: 5, emoji: '😄' },
  { date: 'Tuesday', value: 4, emoji: '🙂' },
  { date: 'Wednesday', value: 3, emoji: '😐' },
  { date: 'Thursday', value: 4, emoji: '🙂' },
  { date: 'Friday', value: 2, emoji: '😔' },
  { date: 'Saturday', value: 3, emoji: '😐' },
  { date: 'Sunday', value: 4, emoji: '🙂' }
]

const MoodTracker = ({ setMood }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodHistory, setMoodHistory] = useState(SAMPLE_HISTORY)
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    fetch(API_URL + '/mood')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMoodHistory(data)
        } else {
          setMoodHistory(SAMPLE_HISTORY)
          setIsOffline(true)
        }
      })
      .catch(() => {
        setMoodHistory(SAMPLE_HISTORY)
        setIsOffline(true)
      })
  }, [])

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood)
    setMood(mood.label)
  }

  const getGradientColor = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(160, 148, 247, 0.2)')
    gradient.addColorStop(1, 'rgba(160, 148, 247, 0)')
    return gradient
  }

  const getMoodLabel = (value) => {
    const mood = moods.find(m => m.value === value)
    return mood ? `${mood.emoji} ${mood.label}` : ''
  }

  const chartData = {
    labels: moodHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood',
        data: moodHistory.map(entry => entry.value),
        borderColor: 'var(--color-button-primary)',
        backgroundColor: (context) => getGradientColor(context.chart.ctx),
        tension: 0.4,
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: 'var(--color-button-primary)',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
      axis: 'x'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#2E2C4D',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#a094f7',
        borderWidth: 1,
        cornerRadius: 6,
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: 'var(--font-family-primary)'
        },
        bodyFont: {
          size: 13,
          family: 'var(--font-family-primary)'
        },
        callbacks: {
          title: (context) => {
            const entry = moodHistory[context[0].dataIndex]
            return entry.date
          },
          label: (context) => {
            const entry = moodHistory[context.dataIndex]
            const moodLabel = getMoodLabel(entry.value)
            return `${moodLabel} (${entry.value}/5)`
          }
        },
        animation: {
          duration: 200
        },
        custom: (context) => {
          const tooltipEl = context.tooltipEl
          if (tooltipEl) {
            tooltipEl.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)'
            tooltipEl.style.transition = 'all 0.2s ease'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#E0E0E0',
          font: {
            family: 'var(--font-family-primary)',
            size: 12,
            weight: '500'
          },
          stepSize: 1,
          padding: 8
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#E0E0E0',
          font: {
            family: 'var(--font-family-primary)',
            size: 12,
            weight: '500'
          },
          padding: 8,
          maxRotation: 0
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  }

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: 'var(--spacing-xl)'
      }}
    >
      <motion.h2 
        className="text-accent" 
        style={{ 
          marginBottom: 'var(--spacing-md)',
          textAlign: 'center'
        }}
      >
        How are you feeling today?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          textAlign: 'center',
          color: '#B4F8C8',
          fontStyle: 'italic',
          marginBottom: 'var(--spacing-lg)',
          fontSize: '1.1rem'
        }}
      >
        It's okay to feel different every day. Let's keep tracking together.
      </motion.p>
      
      {isOffline && null}

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 'var(--spacing-lg)', 
        marginBottom: 'var(--spacing-xl)',
        flexWrap: 'wrap'
      }}>
        {moods.map((mood) => (
          <motion.div
            key={mood.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMoodSelect(mood)}
              style={{
                width: '72px',
                height: '72px',
                fontSize: '2.5rem',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: selectedMood?.label === mood.label 
                  ? `linear-gradient(135deg, ${mood.color}, var(--color-button-primary))`
                  : 'var(--color-button-secondary)',
                boxShadow: selectedMood?.label === mood.label 
                  ? `0 0 20px ${mood.color}40` 
                  : 'var(--shadow-sm)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title={mood.label}
            >
              {mood.emoji}
            </motion.button>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem'
              }}
            >
              {mood.label}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {moodHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              height: '300px',
              padding: 'var(--spacing-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MoodTracker 