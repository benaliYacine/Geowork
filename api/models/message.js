const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        refPath: 'userType'
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        refPath: 'userType'
    },
    senderType: {
        type: String,
        //required: true,
        enum: ['Client', 'Professionnel']
    },
    recipientType: {
        type: String,
        //required: true,
        enum: ['Client', 'Professionnel']
    },
    message: {
        type: {
            type: String,
            enum:['text','image','file']
        },
        url: {
            type: String
        },
        filename: {
            type: String
        },
        content:{
            type: String
        },
    },
    time: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Message", messageSchema);