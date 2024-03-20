
const User = require('/models/User');
const Thought = require('/models/Thought');

// Define the userController object
const userController = {
    // Method to get all users
    getAllUsers: async (req, res) => {
        try {
            // Find all users and populate their thoughts and friends
            const users = await User.find().populate('thoughts').populate('friends');
            // Send the users as a response
            res.json(users);
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Method to get a user by ID
    getUserById: async (req,res) => {
        try {
            // Find the user by ID and populate their thoughts and friends
            const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
            if (!user) {
                // If no user is found, send a 404 response
                res.status(404),json({ message: 'No user found with this id!'});
                return;
            }
            // Send the user as a response
            res.json(user);
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Method to create a user
    createUser: async (req, res) => {
        try {
            // Create a new user with the request body
            const user = await User.create(req.body);
            // Send the new user as a response
            res.status(200).json(user);
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(400).json(err);
        }
    },
    // Method to update a user
    updateUser: async (req, res) => {
        try {
            // Find the user by ID and update them with the request body
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true});
            if (!user) {
                // If no user is found, send a 404 response
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            // Send the updated user as a response
            res.json(user);
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(400).json(err);
        }
    },
    // Method to delete a user
    deleteUser: async (req, res) => {
        try {
            // Find the user by ID and delete them
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                // If no user is found, send a 404 response
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            // Delete all thoughts associated with the user
            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            // Send a success message as a response
            res.json({ message: 'User and associated thoughts deleted!'});
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(400).json(err);
        }
    },
    // Method to add a friend to a user
    addFriend: async (req, res) => {
        try {
            // Find the user by ID
            const user = await User.findById(req.params.userId);
            if (!user) {
                // If no user is found, send a 404 response
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            // Add the friend to the user's friends list
            user.friends.push(req.params.friendId);
            // Save the user
            await user.save();
            // Send the updated user as a response
            res.json(user);
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(400).json(err);
        }
    },
    // Method to remove a friend from a user
    removeFriend: async (req, res) => {
        try {
            // Find the user by ID
            const user = await User.findById(req.params.userId);
            if (!user) {
                // If no user is found, send a 404 response
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            // Remove the friend from the user's friends list
            user.friends.pull(req.params.friendId);
            // Save the user
            await user.save();
            // Send the updated user as a response
            res.json(user);
        } catch (err) {
            // Log the error and send it as a response
            console.error(err);
            res.status(400).json(err);
        }
    }
};


module.exports = userController;