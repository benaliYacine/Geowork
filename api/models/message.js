const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userType",
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userType",
    },
    senderType: {
        type: String,
        required: true,
        enum: ["Client", "Professionnel"],
    },
    recipientType: {
        type: String,
        required: true,
        enum: ["Client", "Professionnel"],
    },
    message: {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        type: {
            type: String,
            enum: [
                "text",
                "image",
                "file",
                "budgetEdit",
                "proposal",
                "invitation",
                "jobLocation",
            ],
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        },
        state: {
            type: String,
            default:"waiting"
        },
        budget: {
            type: String,
        },
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        coverLetter: {
            type: String,
            default: "",
        },

        url: {
            type: String,
            default: "",
        },
        filename: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messageSchema);
