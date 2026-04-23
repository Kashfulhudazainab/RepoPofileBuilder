import express                                                        from 'express'
import { syncRepos, getMyRepos, toggleFeatured,
         getFeaturedRepos, getMyLanguages }                           from '../controllers/repoController.js'
import protect                                                        from '../middleware/protect.js'

const router = express.Router()

router.get('/sync',                protect, syncRepos)
router.get('/my',                  protect, getMyRepos)
router.get('/languages',           protect, getMyLanguages)         // 👈 new
router.patch('/:id/featured',      protect, toggleFeatured)
router.get('/featured/:userId',            getFeaturedRepos)

export default router