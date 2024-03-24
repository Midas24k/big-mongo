const mongoose = require('mongoose');
const { Schema} = mongoose;
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema({
    reactionsId: {
        type:Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required:true,
        maxlength:280
    },
    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength:280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => new Date(createdAtVal).toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
 }); 
 
 thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;

 });
 const Thought = mongoose.model('Thought', thoughtSchema);

 module.exports = Thought;