const asyncHandler = require("../utils/asyncHandler");
const Event = require("../models/Event");

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.status(200).json({ success: true, events });
});

const createEvent = asyncHandler(async (req, res) => {

    const { title, description, date, location, time } = req.body;
    if (!title || !description || !date || !location || !time) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (date < new Date()) {
        return res.status(400).json({ success: false, message: "Date cannot be in the past" });
    }
    const event = await Event.create({
        title, description, date, location, time, organizer: req.user._id
    });
    res.status(201).json({ success: true, event });
});

const updateEvent = asyncHandler(async (req, res) => {

    const { title, description, date, location, time } = req.body;

    if (date < new Date()) {
        return res.status(400).json({ success: false, message: "Date cannot be in the past" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: "You are not authorized to update this event" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.time = time || event.time;
    event.updatedAt = Date.now();
    await event.save();

    res.status(200).json({ success: true, message: "Event updated successfully", event });
});

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
    }
    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: "You are not authorized to delete this event" });
    }
    await event.deleteOne();
    res.status(200).json({ success: true, message: "Event deleted successfully" });
});

const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.status(200).json({ success: true, event });
});

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, getEventById };