const asyncHandler = require("../utils/asyncHandler");
const Message = require("../models/Message");

const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({});
    res.status(200).json({ success: true, messages });
});

const createMessage = asyncHandler(async (req, res) => {
    const { name, email, content, phone } = req.body;

    if (!name || !email || !content || !phone) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (email.includes("@") && email.includes(".")) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    const message = await Message.create({ name, email, content, phone, solved: false, comment: "" });
    res.status(201).json({ success: true, message });
});

const updateMessage = asyncHandler(async (req, res) => {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message });
});



const getMessageById = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    res.status(200).json({ success: true, message });
});
module.exports = { getMessages, createMessage, updateMessage, getMessageById };