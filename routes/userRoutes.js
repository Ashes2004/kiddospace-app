import express from 'express';
import { getAllUsers, createUser, getUserBymail, updateUser, followUser, unfollowUser } from '../controllar/userControllar.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/mail', getUserBymail);
router.post('/', createUser);
router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);
router.patch('/update',updateUser);


export default router;
