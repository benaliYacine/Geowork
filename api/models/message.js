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
    text: String,
    time: {
        type:Date,
        default:Date.now
    },
    file: String,
});

module.exports = mongoose.model("Message", messageSchema);