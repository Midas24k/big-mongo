const Thought = require('models/Thought.js');
const User = require('models/User.js');

const thoughtController = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }

    },
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            if (!user) {
                res.status(404).json({ message: ' User not found!' });
                return;
            } 
            res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
       
    },
    
}