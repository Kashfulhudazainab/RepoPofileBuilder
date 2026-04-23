import api from './axios'

// Sync repos from GitHub and save to DB
export const syncRepos = async () => {
  const res = await api.get('/api/repos/sync')
  return res.data
}

// Get all repos of logged in user
export const getMyRepos = async () => {
  const res = await api.get('/api/repos/mine')
  return res.data
}

// Toggle featured on/off
export const toggleFeatured = async (repoId) => {
  const res = await api.patch(`/api/repos/${repoId}/featured`)
  return res.data
}

// Get featured repos for a public profile (no auth needed)
export const getFeaturedRepos = async (userId) => {
  const res = await api.get(`/api/repos/featured/${userId}`)
  return res.data
}