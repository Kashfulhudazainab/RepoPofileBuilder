import express                                        from 'express'
import { githubLogin, githubCallback, getMe, logout } from '../controllers/authController.js'
import protect                                        from '../middleware/protect.js'

const router = express.Router()

router.get('/github',          githubLogin)
router.get('/github/callback', githubCallback)
router.get('/me',              protect, getMe)
router.get('/logout',          protect, logout)

export default router