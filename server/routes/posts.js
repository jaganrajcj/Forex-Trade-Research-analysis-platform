import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { getPosts } from '../controllers/posts/getPosts.js'
import { createPost, uploadPostImage, upLoadImage } from '../controllers/posts/postOperations.js'
import { viewPost } from '../controllers/posts/viewPost.js'

const router = express.Router()

router.get('/', userAuth, getPosts)
router.post('/new-post', userAuth, createPost)
router.post('/new-post/image', uploadPostImage.single('file'), upLoadImage)
router.get('/view-post', userAuth, viewPost)

export default router