const asyncHandler = require("../utils/asyncHandler");
const Residence = require("../models/Residence");

const getResidences = asyncHandler(async (req, res) => {
    const residences = await Residence.find({});
    res.status(200).json({ success: true, residences });
});

const createResidence = asyncHandler(async (req, res) => {
    const residence = await Residence.create(req.body);
    res.status(201).json({ success: true, residence });
});

module.exports = { getResidences, createResidence };



