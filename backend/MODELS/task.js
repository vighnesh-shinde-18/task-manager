const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"high"
    }
}, {
    timestamps: true
})



const task = mongoose.model("task", taskSchema)

module.exports = task;