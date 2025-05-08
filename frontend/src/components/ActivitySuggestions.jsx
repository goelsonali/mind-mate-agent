import { motion } from 'framer-motion'

const activities = [
  {
    title: 'Breathing Exercise',
    description: 'Take a moment to breathe deeply and center yourself',
    icon: '🫁',
    action: 'onBreathingClick'
  },
  {
    title: 'Journal Entry',
    description: 'Write down your thoughts and feelings',
    icon: '📝',
    action: 'onJournalClick'
  },
  {
    title: 'Mindful Walk',
    description: 'Take a short walk and notice your surroundings',
    icon: '🚶',
    action: 'onWalkClick'
  }
]

const ActivitySuggestions = ({ onBreathingClick }) => {
  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Suggested Activities</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--border-radius)',
              padding: '1.5rem',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (activity.action === 'onBreathingClick') {
                onBreathingClick()
              }
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{activity.icon}</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text)' }}>{activity.title}</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
              {activity.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ActivitySuggestions 