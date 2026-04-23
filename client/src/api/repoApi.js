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

export const getMyLanguages   = async () => {
  const res = await api.get('/api/repos/languages')
  return res.data
}


export const getFeaturedRepos = async () => {
  const res = await api.get('/api/repos/my')
  return res.data.filter(r => r.featured)
}

// Toggle featured on/off
export const toggleFeatured = async (repoId) => {
  const res = await api.patch(`/api/repos/${repoId}/featured`)
  return res.data
}

