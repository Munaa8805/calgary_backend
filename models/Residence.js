const mongoose = require("mongoose");


const MemberSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },

        name: {
            type: String,
            required: true,
            trim: true,

        },

        relationship: {
            type: String,
            required: true,
            enum: ["child", "parent", "husband", "wife", "grandparent", "other"],
            required: true,
            default: "child",
        },

        age: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },
        education: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        occupation: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        phone: {
            type: String,
            minlength: 10,
            maxlength: 12,
            trim: true,
            match: [/^[0-9]+$/, "Please enter a valid phone number"],
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
        },

        notes: {
            type: String,
            minlength: 0,
            maxlength: 500,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const ResidenceModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 10,
        trim: true,
    },
    zip: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 6,
        trim: true,
        uppercase: true,
    },
    country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        uppercase: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 12,
        trim: true,
        match: [/^[0-9]+$/, "Please enter a valid phone number"],
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    occupation: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        maxlength: 10,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    education: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
    },
    members: [
        {
            type: MemberSchema,
            required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Residence = mongoose.model("Residence", ResidenceModel);

module.exports = Residence;