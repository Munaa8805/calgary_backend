const mongoose = require("mongoose");

const VolunteerModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 12,
        match: [/^[0-9]+$/, "Please enter a valid phone number"],
    },
    position: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10,
    },
    special: {
        type: Boolean,
        default: false,
        trim: true,
    }
}, { timestamps: true });

const Volunteer = mongoose.model("Volunteer", VolunteerModel);

module.exports = Volunteer;