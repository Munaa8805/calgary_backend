const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true, trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: "",
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;