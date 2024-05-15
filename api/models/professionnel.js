//hna dir schema t3 collection client
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const professionnelSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    
    googleId: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
    },
    wilaya: {
        type: String,
        //required: true
    },
    city: {
        type: String,
        //required: true
},
    profile: {
        streetAdress: {
            type: String
        },
        added: {
            type: Boolean,
            default: false
        },
        roleTitle: {
            type: String,
        },
        category: {
            type: String,
            //enum:[]//hadi nzidha ki natfahmo 3la les category
        },
        subCategory: {
            type: String,
            //enum:[]//hadi nzidha ki natfahmo 3la les category
        },
        employments: [{
            title: {
                type: String,

            },
            company: {
                type: String,
            },
            Location: {
                type: String,
            },
            currentlyIn: {
                type: Boolean,
                default: false
            },
            date: {
                start: {
                    month: {
                        type: Number,
                        min: 1,
                        max: 12
                    },
                    year: {
                        type: Number,
                        min: 1990,
                    }
                },
                end: {
                    month: {
                        type: Number,
                        min: 1,
                        max: 12,
                        default: 1
                    },
                    year: {
                        type: Number,
                        min: 1990,
                        default: 2000
                    }
                }
            },
            description: {
                type: String,
            }
        }],
        experiences: [{
            title: {
                type: String
            },
            description: {
                type: String
            }
        }],
        educations: [{
            school: {
                type: String
            },
            degree: {
                type: String
            },
            fieldOfStudy: {
                type: String
            },
            datesAttended: {
                start: {
                    type: Number
                },
                end: {
                    type: Number
                }
            },
            description: {
                type: String
            }
        }
        ],
        Bio: {
            type: String
        },
        photoProfile: {
            url: {
                type: String,
                default: ''
            },
            filename: {
                type: String,
                default: ''
            },
        },
        dateBirthday: {
            jour: Number,
            mois: Number,
            anne: Number
        },
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
        ,
        savedJobs:[{type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
        ,
        rate: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        phone: {
            type: String
        }

    },
    contacts: [{
        contactId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Client'
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: 'Message'
        }]
    }],

})
professionnelSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email });

    if (!foundUser) {
        return false; // L'utilisateur n'a pas été trouvé, retourne false ou effectue une action appropriée
    }

    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}


professionnelSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})
module.exports = mongoose.model("Professionnel", professionnelSchema); //dir export lemodel li hya class fiha des attribue w des methods