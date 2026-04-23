import express                                                    from 'express'
import { syncRepos, getMyRepos, toggleFeatured, getFeaturedRepos } from '../controllers/repoController.js'
import protect                                                    from '../middleware/protect.js'

const router = express.Router()

router.get('/sync',                protect, syncRepos)
router.get('/mine',                protect, getMyRepos)
router.patch('/:id/featured',      protect, toggleFeatured)
router.get('/featured/:userId',            getFeaturedRepos)

export default router