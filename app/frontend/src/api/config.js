// Get API URL from environment variables with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/chat`,
  dailyActivity: (userId, mood) => `${API_BASE_URL}/daily-activity/${userId}?mood=${mood}`,
  rateActivity: `${API_BASE_URL}/daily-activity/rate`,
  logMood: `${API_BASE_URL}/mood`,
  moodHistory: (userId) => `${API_BASE_URL}/mood/${userId}`,
  todayMood: (userId) => `${API_BASE_URL}/mood/today/${userId}`,
  moodCollage: (userId) => `${API_BASE_URL}/mood/collage/${userId}`,
  image: (imageName) => `${API_BASE_URL}/image/${imageName}`,
};