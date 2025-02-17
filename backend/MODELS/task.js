const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    }
},{
    timestamps: true
})



const task = mongoose.model("task", taskSchema)

module.exports = task;