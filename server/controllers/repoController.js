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

    // 👇 Auto-feature top 3 most starred repos
    // First unfeatured all
    await Repo.updateMany({ user: _id }, { featured: false })

    // Then get top 3 by stars and mark featured
    const top3 = await Repo.find({ user: _id })
      .sort({ stars: -1 })
      .limit(3)

    for (const repo of top3) {
      repo.featured = true
      await repo.save()
    }

    res.json({ message: `${repos.length} repos synced, top 3 featured` })

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

// Toggle featured
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

// 👇 NEW — get unique languages from user's repos
export const getMyLanguages = async (req, res) => {
  try {
    const langs = await Repo.distinct('language', {
      user:     req.user._id,
      language: { $ne: null },  // exclude null languages
    })
    res.json(langs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch languages' })
  }
}





