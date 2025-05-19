import React, { useState, useEffect } from "react"
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
          setError("No activity suggestion available.")
        }
      } catch (err) {
        setError("Failed to fetch activity suggestion.")
      } finally {
        setLoading(false);
      }
    }

    getActivitySuggestion();
  }, [userId, mood]) // Re-run the effect when userId or mood changes

  return (
    <div className="activity-suggestions">
      <h2>Activity Suggestions</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities to display.</p>}
      <ul>
        {activities.map((activity, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>{activity.title}</h3>
            <p style={{ margin: "0", color: "#7f8c8d" }}>{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivitySuggestions