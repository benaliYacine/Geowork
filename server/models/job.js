const mongoose = require("mongoose");
const jobsSchema = new mongoose.Schema({
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    idProfessionnel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professionnel",
    },
    title: {
        type: String,
    },
    category: {
        type: String,
        //enum:
    },
    subCategory: {
        type: String,
        //enum:[]//hadi nzidha ki natfahmo 3la les category
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    closed: {
        type: Boolean,
        default: false,
    },
    /* level: {
        type: String
        //enum:
    }, */
    /* duree: {
        type: String
    }, */
    wilaya: {
        type: String,
        //required: true
    },
    city: {
        type: String,
        //required: true
    },
    budget: {
        type: String,
    },
    description: {
        type: String,
        require: true,
    },
    images: [
        {
            url: String,
            filename: String,
        },
    ],
    clientFeedback: {
        type: String,
    },
    professionnelFeedback: {
        type: String,
    },
    clientRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    professionnelRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    hired: {
        type: Boolean,
        default: false,
    },
    proposals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professionnel",
        },
    ],
    hires: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professionnel",
        },
    ],
});

module.exports = mongoose.model("Job", jobsSchema); //dir export lemodel li hya class fiha des attribue w des methods
