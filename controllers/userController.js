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
    
}