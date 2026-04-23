import api from './axios'

// Redirect to GitHub OAuth
// client/src/api/authApi.js
export const loginWithGithub = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`
}

// Get logged in user
export const getMe = async () => {
  const res = await api.get('/api/auth/me')
  return res.data
}

// Logout
export const logout = async () => {
  const res = await api.get('/api/auth/logout')
  return res.data
}