import axios  from 'axios'
import jwt    from 'jsonwebtoken'
import User   from '../models/User.js'
import Repo   from '../models/Repo.js'

// Step 1 — redirect to GitHub
export const githubLogin = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user,user:email,repo`
  res.redirect(url)
}

// Step 2 — GitHub redirects back with code
export const githubCallback = async (req, res) => {
  const { code } = req.query

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    )

    const accessToken = tokenRes.data.access_token

    // Get GitHub user data
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const { id, login, name, email, avatar_url, bio } = userRes.data

    // Save or update user in DB
    let user = await User.findOne({ githubId: id })
    if (!user) {
      user = await User.create({
        githubId:    id,
        username:    login,
        name,
        email,
        avatar:      avatar_url,
        bio,
        githubToken: accessToken,
      })
    } else {
      user.githubToken = accessToken
      await user.save()
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    // Send token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge:   7 * 24 * 60 * 60 * 1000,
    })

    res.redirect('http://localhost:5173/profile')

  } catch (err) {
    // console.error(err)
    // res.redirect('http://localhost:5173/auth?error=github_failed')
     console.error('GitHub callback error:', err.message) // add this
    console.error('Full error:', err)                    // add this
    res.redirect(`${process.env.CLIENT_URL}/auth?error=github_failed`)
  }
}

// Get logged in user
export const getMe = async (req, res) => {
  res.json(req.user)
}

// Logout
export const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
}

export const updateSocials = async (req, res) => {
  try {
    // Destructure from req.body.socials because that's what the frontend sends
    const { linkedin, twitter, website, phone, email } = req.body.socials;

    // Optional: If you also want to update the top-level email in the User model:
    const topLevelEmail = req.body.email;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        // Update the top-level email if provided
        email: topLevelEmail, 
        // Update the nested socials object
        socials: { linkedin, twitter, website, phone, email } 
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the full user or just socials so the frontend can update state
    res.json(user); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update socials' });
  }
}

export const disconnectGithub = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.githubToken = null
    await user.save()

    res.json({ message: 'GitHub disconnected', user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to disconnect GitHub' })
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id

    await Repo.deleteMany({ user: userId })
    await User.findByIdAndDelete(userId)

    res.clearCookie('token')
    res.json({ message: 'Account deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete account' })
  }
}