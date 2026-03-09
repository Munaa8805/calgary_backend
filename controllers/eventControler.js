const asyncHandler = require("../utils/asyncHandler");
const Event = require("../models/Event");

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({}).populate("organizer", "name");
    res.status(200).json({ success: true, events });
});

const createEvent = asyncHandler(async (req, res) => {

    const { name, description, date, location, time, featured } = req.body;
    if (!name || !description || !date || !location || !time) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (date < new Date()) {
        return res.status(400).json({ success: false, message: "Date cannot be in the past" });
    }
    const event = await Event.create({
        name, description, date, location, time, organizer: req.user._id, featured
    });
    res.status(201).json({ success: true, event });
});

const updateEvent = asyncHandler(async (req, res) => {


    const { name, description, date, location, time, featured } = req.body;
    // console.log("req.body", featured);
    if (date < new Date()) {
        return res.status(400).json({ success: false, message: "Date cannot be in the past" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
    }


    event.name = name ?? event.name;
    event.description = description ?? event.description;
    event.date = date ?? event.date;
    event.location = location ?? event.location;
    event.time = time ?? event.time;
    event.updatedAt = Date.now();
    event.organizer = req.user._id;
    event.featured = typeof featured === "boolean" ? featured : event.featured;
    // console.log("event", event);
    await event.save();

    res.status(200).json({ success: true, message: "Event updated successfully", event });
});

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, message: "Event deleted successfully" });
});

const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id).populate("organizer", "name");
    res.status(200).json({ success: true, event });
});

const getFeaturedEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({ featured: true }).populate("organizer", "name");
    res.status(200).json({ success: true, events });
});

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, getEventById, getFeaturedEvents };