import { API_ENDPOINTS } from "./config";

export const fetchChatResponse = async (userId, message) => {
  const response = await fetch(API_ENDPOINTS.chat, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, message }),
  });
  return response.json();
};

export const fetchDailyActivity = async (userId, mood) => {
  const response = await fetch(API_ENDPOINTS.dailyActivity(userId, mood), {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch daily activity");
  }

  return await response.json();
};

export const logMood = async (userId, mood, journal, trackingDate) => {
  const response = await fetch(API_ENDPOINTS.logMood, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, mood, journal, tracking_date: trackingDate }),
  });
  return response.json();
};

export const fetchMoodHistory = async (userId) => {
  const response = await fetch(API_ENDPOINTS.moodHistory(userId));
  return response.json();
};

export const fetchMoodCollage = async (userId) => {
  const response = await fetch(API_ENDPOINTS.moodCollage(userId));
  return response.json();
};