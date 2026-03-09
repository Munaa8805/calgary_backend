const asyncHandler = require("../utils/asyncHandler");
const Volunteer = require("../models/Volunteer");

const getVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find({});
    res.status(200).json({ success: true, volunteers });
});

const createVolunteer = asyncHandler(async (req, res) => {
    const { name, email, phone, position, special = false } = req.body;
    if (!name || !email || !phone || !position) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address !!!" });
    }
    if (phone.length !== 10) {
        return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }
    if (position.length < 3) {
        return res.status(400).json({ success: false, message: "Please enter a valid position" });
    }
    if (special !== true && special !== false) {
        return res.status(400).json({ success: false, message: "Please enter a valid special" });
    }
    const volunteer = await Volunteer.create({ name, email, phone, position, special });
    res.status(201).json({ success: true, volunteer });
});


const deleteVolunteer = asyncHandler(async (req, res) => {
    const volunteerId = req.params.id;
    if (!volunteerId) {
        return res.status(400).json({ success: false, message: "Volunteer ID is required" });
    }

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        return res.status(404).json({ success: false, message: "Volunteer not found" });
    }
    await volunteer.deleteOne();

    res.status(200).json({ success: true, message: "Volunteer deleted successfully" });
});

const updateVolunteer = asyncHandler(async (req, res) => {
    const volunteerId = req.body
    if (!volunteerId) {
        return res.status(400).json({ success: false, message: "Volunteer ID is required" });
    }
    if (req.user.role !== "admin") {
        return res.status(401).json({ success: false, message: "You are not authorized to update this volunteer" });
    }

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        return res.status(404).json({ success: false, message: "Volunteer not found" });
    }
    volunteer.name = req.body.name || volunteer.name;
    volunteer.email = req.body.email || volunteer.email;
    volunteer.phone = req.body.phone || volunteer.phone;
    volunteer.position = req.body.position || volunteer.position;
    volunteer.updatedAt = Date.now();
    await volunteer.save();

    res.status(200).json({ success: true, message: "Volunteer updated successfully", volunteer });
});


const getSpecialVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find({ special: true });
    res.status(200).json({ success: true, volunteers });
});

module.exports = { getVolunteers, createVolunteer, deleteVolunteer, updateVolunteer, getSpecialVolunteers };