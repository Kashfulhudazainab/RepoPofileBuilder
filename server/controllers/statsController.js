import axios from 'axios'
import Repo  from '../models/Repo.js'

export const getMyStats = async (req, res) => {
  try {
    const { githubToken, username, _id } = req.user

    const headers = { Authorization: `Bearer ${githubToken}` }

    // --- Total Stars (from your saved repos in DB) ---
    const repos = await Repo.find({ user: _id })
    const totalStars = repos.reduce((sum, r) => sum + (r.stars || 0), 0)

    // --- Commits (last 52 weeks from GitHub) ---
    const commitsRes = await axios.get(
      `https://api.github.com/search/commits?q=author:${username}`,
      {
        headers: {
          ...headers,
          Accept: 'application/vnd.github.cloak-preview', // required for commit search
        },
      }
    )
    const totalCommits = commitsRes.data.total_count

    // --- Pull Requests ---
    const prsRes = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+type:pr`,
      { headers }
    )
    const totalPRs = prsRes.data.total_count

    // --- OSS Contributions (PRs to repos not owned by user) ---
    const ossRes = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+-user:${username}`,
      { headers }
    )
    const ossContributions = ossRes.data.total_count

    res.json({
      commits:      totalCommits,
      stars:        totalStars,
      pullRequests: totalPRs,
      oss:          ossContributions,
    })

  } catch (err) {
    console.error('Stats error:', err.message)
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
}