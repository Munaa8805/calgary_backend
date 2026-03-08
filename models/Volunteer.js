const mongoose = require("mongoose");

const VolunteerModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Volunteer = mongoose.model("Volunteer", VolunteerModel);

module.exports = Volunteer;