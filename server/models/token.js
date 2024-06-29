const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        refPath: 'userType'
    },
    userType: {
        type: String,
        //required: true,
        enum: ['Client', 'Professionnel']
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
});

module.exports=mongoose.model("token",tokenSchema);