import express from 'express';
import { 
  getAllPosts, 
  createPost, 
  updatePost, 
  likePost, 
  addComment, 
  deletePost,
  getPostById
} from '../controllar/postControllar.js';

const router = express.Router();

// CRUD Routes
router.get('/', getAllPosts);
router.get('/:id' , getPostById);
router.post('/', createPost);
router.put('/:postId', updatePost);
router.delete('/:postId' , deletePost);

// Like and Comment Routes
router.post('/:postId/like', likePost);
router.post('/:postId/comment', addComment);

export default router;
