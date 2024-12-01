import Post from '../models/postModel.js';
import User from "../models/userModel.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('User')
      .populate('comments.user')
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate('User') 
      .populate('comments.user'); 
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

    
    
    // Create a new post
export const createPost = async (req, res) => {
  try {
    const { email, content , caption } = req.body;

    // Create a new post
    const userToUpdate = await User.findOne({email});
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }


    const ID = userToUpdate._id;
    console.log(ID);
    
    
    const post = new Post({User: ID  , content , caption});
    await post.save();

    // Find the user and add the new post to their posts array
    

    userToUpdate.posts.push(post._id);  // Add the new post's ID to the user's posts array
    userToUpdate.totalPosts += 1;  // Optionally, increment the user's totalPosts count
    await userToUpdate.save();  // Save the updated user document

    res.status(201).json(post);  // Send the post as the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const {caption } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption },
      { new: true } // Returns the updated post
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'User already liked this post' });
    }

    post.likes.push(userId);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a post
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post to delete
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the user who created the post
    const user = await User.findById(post.User);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the post ID from the user's posts array
    user.posts = user.posts.filter(post => post !== postId);
    user.totalPosts -= 1; 
    await user.save(); 

    // Delete the post from the Post collection
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
