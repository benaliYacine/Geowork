//hna dir schema t3 collection client
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const clientSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            //required: true
        },
    },
    email: {
        type: String,
        required: true,
    },
    googleId: String,
    password: {
        type: String,
        //required: true
    },
    wilaya: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    photoProfile: {
        url: {
            type: String,
            default: "",
        },
        filename: {
            type: String,
            default: "",
        },
    },
    verified: {
        type: Boolean,
        default: false,
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    savedProfessionnel: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Professionnel" },
    ],
    contacts: [
        {
            contactId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Professionnel",
            },
            messages: [
                {
                    job:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Job"
                    },
                    message:[{
                        type: mongoose.Schema.Types.ObjectId,
                    //required: true,
                    ref: "Message",
                    }
                ]
                },
            ],
        },
    ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
});

clientSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email });

    if (!foundUser) {
        return false; // L'utilisateur n'a pas été trouvé, retourne false ou effectue une action appropriée
    }

    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
};

clientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
module.exports = mongoose.model("Client", clientSchema); //dir export lemodel li hya class fiha des attribue w des methods
