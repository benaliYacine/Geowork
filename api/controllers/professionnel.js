const Professionnel = require('../models/professionnel');
const { cloudinary } = require('../cloudinary/index');
const bcrypt = require('bcrypt');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

/* exports.loginProfessionnel = async (req, res) => {
    const { password, email } = req.body;
    const foundUser = await Professionnel.findAndValidate(email, password);
    console.log(foundUser.password);
    if (foundUser) {
        if (req.session) {
            req.session.user_id = foundUser._id;
            res.redirect('/pr/dashboard');
        } else res.send('err');
    } else {
        res.redirect('/login');
    }
} */

exports.changePhotoDeProfile = async (req, res) => {
    try {
        if (req.file) {
            const dataImage = { url: req.file.path, filename: req.file.filename };
            console.log(dataImage);

            // Find the professionnel by user ID
            const professionnel = await Professionnel.findById(req.session.user_id);
            if (!professionnel) {
                return res.status(404).json({ error: "Professionnel not found" });
            }

            // Delete the old profile photo from Cloudinary
            const filename = professionnel.profile.photoProfile.filename;
            await cloudinary.uploader.destroy(filename);

            // Update the profile photo with the new one
            professionnel.profile.photoProfile = dataImage;

            // Save the updated professionnel document
            await professionnel.save();

            return res.json(professionnel);
        } else {
            return res.status(400).json({ error: "No file uploaded" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.createProfessionnel = async (req, res) => {
    try {
        const professionnel = new Professionnel(req.body);
        const exist = await Professionnel.findOne({ email: professionnel.email });
        if (exist) return res.status(409).json({ message: "email exist deja" });
        const pro = await professionnel.save();
        console.log(pro);
        if (req.session) {
            req.session.user_id = pro._id;
            req.session.user_type = 'Professionnel';
            await req.session.save();
        } else res.send('err');
        const token = await new Token({
            userId: pro._id,
            userType: 'Professionnel',
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        const url = `${process.env.BASE_URL}professionnels/${pro._id}/verify/${token.token}`;
        console.log(pro.email);
        console.log(url);
        await sendEmail(pro.email, "Verify Email", url);
        return res.json({ redirectUrl: '/verifyEmail', message: "An Email sent to verify your account" });
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.addProfileProfessionnel = async (req, res) => {
    try {
        console.log("req.file: ", req.file);
        const id = req.session.user_id;
        req.body.added = true;
        //const { id } = req.params;
        //const { id } = req.body;

        req.body = JSON.parse(JSON.stringify(req.body));

        console.log("req.body", req.body);
        console.log(id);

        const pro = await Professionnel.findByIdAndUpdate(id, { profile: req.body });
        if (req.file) {
            pro.profile.photoProfile.url = req.file.path;
            pro.profile.photoProfile.filename = req.file.filename;
            console.log("photoProfile", pro.profile.photoProfile);
        }



        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
};

/* exports.changePasswordProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { password } = req.body;
        const pro = await Professionnel.findByIdAndUpdate(id, { password: password }, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.changeNameProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        //const { id } = req.body;
        const { first, last } = req.body.name;
        const pro = await Professionnel.findByIdAndUpdate(id, { "name.first": first, "name.last": last }, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.changeEmailProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { email } = req.body;
        const pro = await Professionnel.findByIdAndUpdate(id, { email: email }, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}; */
exports.changeDetailleProfessionnel = async (req, res) => {
    try {
        id = req.session.user_id;
        //const { id } = req.params;
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
        let pro;
        if ('phone' in req.body) {
            pro = await Professionnel.findById(id);
            pro.profile.phone = req.body.phone;
            await pro.save();
        }
        else if ('streetAdress' in req.body) {
            pro = await Professionnel.findById(id);
            pro.profile.streetAdress = req.body.streetAdress;
            await pro.save();
        } else
            pro = await Professionnel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
};

/* exports.changeDescriptionProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { description } = req.body;
        const pro = await Professionnel.findByIdAndUpdate(id, { description: description }, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.changeAlocationProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { wilaya, city } = req.body;
        const pro = await Professionnel.findByIdAndUpdate(id, { wilaya: wilaya, city: city }, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}; */

/* exports.changeProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.body;
        delete req.body.id;
        const pro = await Professionnel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}; */

//hado 5 li ta7t b3d mavirifithmch
exports.addEmployment = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.body;
        //const { id } = req.params;
        const employment = req.body;
        if(employment.currentlyIn){
            employment.date.end.month=1;
            employment.date.end.year=2000;
        }
        console.log(employment);
        const pro = await Professionnel.findById(id);
        if (employment)
            pro.profile.employments.push(employment);
        console.log(pro);
        await pro.save();
        
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}
exports.modifyEmployment = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.body;
        //const { id } = req.params;
        const employments = req.body;
        const pro = await Professionnel.findById(id);
        if (employments)
            pro.profile.employments = employments;
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}
exports.modifyEducation = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.body;
        //const { id } = req.params;
        const Educations = req.body;
        const pro = await Professionnel.findById(id);
        if (Educations)
            pro.profile.educations = Educations;
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}
exports.modifyExperience = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.body;
        //const { id } = req.params;
        const Experiences = req.body;
        const pro = await Professionnel.findById(id);
        if (Experiences)
            pro.profile.experiences = Experiences;
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.suppEmployment = async (req, res) => {
    try {
        const { id } = req.params;
        const employmentId = req.body.employmentId; // Utiliser employmentId au lieu de employment
        const pro = await Professionnel.findById(id);
        pro.profile.employments = await pro.profile.employments.filter(employment => employment._id != employmentId);
        await pro.save();
        return res.status(200).json(pro); // Utiliser le code d'état 200 pour une suppression réussie
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.addEducation = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.params;
        const education = req.body;
        const pro = await Professionnel.findById(id);
        pro.profile.educations.push(education);
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.suppEducation = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const educationId = req.body.educationId;
        const pro = await Professionnel.findById(id);
        pro.profile.educations = pro.profile.educations.filter(edu => edu._id != educationId);
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}
exports.addExperience = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.params;
        const experience = req.body;
        const pro = await Professionnel.findById(id);
        if (experience)
            pro.profile.experiences.push(experience);
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.suppExperience = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const experienceId = req.body.experienceId;
        const pro = await Professionnel.findById(id);
        pro.profile.experiences = pro.profile.experiences.filter(exp => exp._id != experienceId);
        await pro.save();
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.changeProfileProfessionnel = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        //const { id } = req.body;
        delete req.body.id;
        const pro = await Professionnel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
}

////////////////
exports.deleteProfessionnel = async (req, res) => {
    try {
        const id = req.session.user_id;
        //const { id } = req.params;
        //const { id } = req.body;
        const pro = await Professionnel.findByIdAndDelete(id);
        if (pro.profile.photoProfile.filename) {
            const filename = pro.profile.photoProfile.filename;
            await cloudinary.uploader.destroy(filename);
        }
        return res.status(201).json(pro);
    } catch (err) {
        return res.status(400).json(err);
    }
};
