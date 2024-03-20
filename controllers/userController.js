const User = require('/models/User');
const Thought = require('/models/Thought');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    getUserById: async (req,res) => {
        try {
            const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404),json({ message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true});
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            // Delete all thoughts associated with the user
            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User and associated thoughts deleted!'});
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
    addFriend: async (req, res) => {
        try {
            const user =- await User.findByIdAndUpdate(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            user.friends.push(req.params.friendId);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
    removeFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            user.friends.pull(req.params.friendId);
            await user.save();
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }

    }
};

module.exports = userController;