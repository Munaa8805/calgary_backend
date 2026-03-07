const asyncHandler = require("../utils/asyncHandler");
const Volunteer = require("../models/Volunteer");

const getVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find({});
    res.status(200).json({ success: true, volunteers });
});

const createVolunteer = asyncHandler(async (req, res) => {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({ success: true, volunteer });
});

module.exports = { getVolunteers, createVolunteer };