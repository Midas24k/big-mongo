
// Importing the Thought and User models
const Thought = require('../models/Thought.js');
const User = require('../models/User.js');

// Defining the thoughtController object
const thoughtController = {
    // Method to get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            // Fetch all thoughts from the database
            const thoughts = await Thought.find();
            // Send the thoughts as a response
            res.json(thoughts);
        } catch (err) {
            // Log the error and send it as a response with status 500
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Method to get a thought by its ID
    getThoughtById: async (req, res) => {
        try {
            // Fetch the thought from the database using its ID
            const thought = await Thought.findById(req.params.id);
            // If the thought doesn't exist, send a 404 response
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            // Send the thought as a response
            res.json(thought);
        } catch (err) {
            // Log the error and send it as a response with status 500
            console.error(err);
            res.status(500).json(err);
        }
    },
    // Method to create a new thought
    createThought: async (req, res) => {
        try {
            // Create a new thought in the database using the request body
            const thought = await Thought.create(req.body);
            // Add the new thought to the user's thoughts array
            const user = await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            // If the user doesn't exist, send a 404 response
            if (!user) {
                res.status(404).json({ message: ' User not found!' });
                return;
            }
            // Send the new thought as a response
            res.status(200).json(thought);
        } catch (err) {
            // Log the error and send it as a response with status 400
            console.error(err);
            res.status(400).json(err);
        }
    },
    // Method to update a thought
    updateThought: async (res, req) => {
        try {
            // Update the thought in the database using its ID and the request body
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            // If the thought doesn't exist, send a 404 response
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            // Send the updated thought as a response
            res.json(thought);
        } catch (err) {
            // Log the error and send it as a response with status 400
            console.error(err);
            res.status(400).json(err);
        }
    },
    // Method to delete reactions from a thought
    deleteReaction: async (req, res) => {
        try {
            // Delete the thought from the database using its ID
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            // If the thought doesn't exist, send a 404 response
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            // Remove the reaction from the thought's reactions array
            thought.reactions.pull({ reactionsId: req.body.reactionsId });
            // Save the updated thought to the database
            await thought.save();
            // Send the updated thought as a response
            res.json(thought);
        } catch (err) {
            // Log the error and send it as a response with status 400
            console.error(err);
            res.status(400).json(err);
        }
    }
};

// Export the thoughtController object
module.exports = thoughtController;