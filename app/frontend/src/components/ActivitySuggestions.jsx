import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchDailyActivity } from "../api/api" // Import the API utility function

const ActivitySuggestions = ({ userId = "user123", mood = "happy" }) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getActivitySuggestion = async () => {
      setLoading(true)
      setError(null)

      try {
        // Invoke the API to fetch the daily activity suggestion
        const data = await fetchDailyActivity(userId, mood)
        if (data && data.activities) {
          setActivities(data.activities) // Assuming the backend returns { activity: "..." }
        } else {
          setError("No activity suggestions available at the moment.")
        }
      } catch (err) {
        setError("Unable to fetch activity suggestions. Please try again later.")
      } finally {
        setLoading(false);
      }
    }

    getActivitySuggestion();
  }, [userId, mood]) // Re-run the effect when userId or mood changes

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
      <h2 className="text-accent" style={{ marginBottom: 'var(--spacing-lg)' }}>
        Activity Suggestions
      </h2>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted"
            style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: '24px',
                height: '24px',
                border: '2px solid var(--color-text-muted)',
                borderTopColor: 'var(--color-button-primary)',
                borderRadius: '50%',
                margin: '0 auto var(--spacing-md)'
              }}
            />
            Loading suggestions...
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted"
            style={{ 
              textAlign: 'center',
              padding: 'var(--spacing-lg)',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-md)'
            }}
          >
            {error}
          </motion.div>
        ) : activities.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted"
            style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}
          >
            No activities to display at the moment.
          </motion.div>
        ) : (
          <motion.ul
            key="activities"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)'
            }}
          >
            {activities.map((activity, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-lg)',
                  transition: 'transform var(--transition-fast)'
                }}
                whileHover={{ 
                  scale: 1.02,
                  background: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <h3 style={{ 
                  margin: '0 0 var(--spacing-sm) 0',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.25rem',
                  fontWeight: 600
                }}>
                  {activity.title}
                </h3>
                <p style={{ 
                  margin: 0,
                  color: 'var(--color-text-muted)',
                  fontSize: '1rem',
                  lineHeight: 1.5
                }}>
                  {activity.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ActivitySuggestions