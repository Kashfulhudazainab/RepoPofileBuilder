import express                                                        from 'express'
import { syncRepos, getMyRepos, toggleFeatured,
         getFeaturedRepos, getMyLanguages, updateCustomLanguages }                           from '../controllers/repoController.js'
import protect                                                        from '../middleware/protect.js'

const router = express.Router()

router.get('/sync',                protect, syncRepos)
router.get('/my',                  protect, getMyRepos)

router.patch('/:id/featured',      protect, toggleFeatured)
router.get('/featured/:userId',            getFeaturedRepos)
router.get('/languages', protect, getMyLanguages); 
router.put('/languages/custom', protect, updateCustomLanguages); // 👈 NEW ROUTE

export default router