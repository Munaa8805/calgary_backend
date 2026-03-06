const asyncHandler = require("../utils/asyncHandler");
const Event = require("../models/Event");

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.status(200).json({ success: true, events });
});

const createEvent = asyncHandler(async (req, res) => {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
});

const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, event });
});

const deleteEvent = asyncHandler(async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Event deleted successfully" });
});

const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.status(200).json({ success: true, event });
});

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, getEventById };