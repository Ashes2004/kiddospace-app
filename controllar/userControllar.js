import User from "../models/userModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a userbyid
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserBymail = async (req, res) => {
  const { email } = req.body;

  try {
    // Use case-insensitive regex for email search
    const user = await User.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } }).populate('posts').populate('following').populate('followers');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new user
export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({email});
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { email, name, bio, profilePicture, totalPosts, followersCount, followingCount } = req.body;

  // Ensure at least one field is provided
  if (!name && !bio && !profilePicture && totalPosts === undefined ) {
    return res.status(400).json({
      message: 'You must provide at least one field to update: name, bio, profilePicture, totalPosts, ',
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;
    if (totalPosts !== undefined) user.totalPosts = totalPosts;
  

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};



export const followUser = async (req, res) => {
  const { userEmail, followEmail } = req.body; 

  if (!userEmail || !followEmail) {
    return res.status(400).json({ error: 'Both userId and followId are required.' });
  }

  try {
    // Find both users
    const user = await User.findOne({email:userEmail});
    const userToFollow = await User.findOne({email: followEmail});

    if (!user || !userToFollow) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.following.includes(userToFollow._id)) {
      return res.status(400).json({ error: 'You are already following this user.' });
    }

    // Add userToFollow's ObjectId to the user's following array
    user.following.push(userToFollow._id);

    // Add user's ObjectId to the userToFollow's followers array
    userToFollow.followers.push(user._id);
    await user.save();
    await userToFollow.save();

    return res.status(200).json({
      message: `You are now following ${userToFollow.name || 'the user'}.`,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong.', details: error.message });
  }
};
