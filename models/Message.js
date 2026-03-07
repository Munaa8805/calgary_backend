const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    content: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
        trim: true,

    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 12,
        trim: true,
        default: "",
        match: [/^[0-9]+$/, "Please enter a valid phone number"],
    },
    solved: {
        type: Boolean,
        default: false,
    },
    comment: {
        type: String,
        default: "",
        minlength: 0,
        maxlength: 500,
        trim: true,
    },
    whoSolved: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    whenSolved: {
        type: Date,
        default: null,
    },
}, { timestamps: true });



const Message = mongoose.model("Message", messageSchema);

module.exports = Message;