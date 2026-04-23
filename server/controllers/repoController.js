import axios from 'axios'
import Repo  from '../models/Repo.js'

// Fetch from GitHub and save to DB
export const syncRepos = async (req, res) => {
  try {
    const { githubToken, _id } = req.user

    const { data } = await axios.get('https://api.github.com/user/repos?per_page=100&sort=updated', {
      headers: { Authorization: `Bearer ${githubToken}` },
    })

    const repos = data.map((r) => ({
      user:        _id,
      githubId:    r.id,
      name:        r.name,
      description: r.description,
      stars:       r.stargazers_count,
      forks:       r.forks_count,
      language:    r.language,
      url:         r.html_url,
      homepage:    r.homepage,
    }))

    // Upsert each repo
    for (const repo of repos) {
      await Repo.findOneAndUpdate(
        { githubId: repo.githubId, user: _id },
        repo,
        { upsert: true, new: true }
      )
    }

    res.json({ message: `${repos.length} repos synced` })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Sync failed' })
  }
}

// Get all repos for logged in user
export const getMyRepos = async (req, res) => {
  const repos = await Repo.find({ user: req.user._id }).sort({ stars: -1 })
  res.json(repos)
}

// Toggle featured (add to public profile)
export const toggleFeatured = async (req, res) => {
  const repo = await Repo.findOne({ _id: req.params.id, user: req.user._id })
  if (!repo) return res.status(404).json({ message: 'Repo not found' })

  repo.featured = !repo.featured
  await repo.save()
  res.json(repo)
}

// Get featured repos (public)
export const getFeaturedRepos = async (req, res) => {
  const repos = await Repo.find({ user: req.params.userId, featured: true })
  res.json(repos)
}