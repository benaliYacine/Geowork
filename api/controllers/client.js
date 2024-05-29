//dir les methode t3 creation .....
const Client = require("../models/client");
const { cloudinary } = require("../cloudinary/index");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

/* exports.loginClient = async (req, res) => {
    const { password, email } = req.body;
    const foundUser = await Client.findAndValidate(email, password);
    console.log(foundUser.password);
    if (foundUser) {
        if (req.session) {
            req.session.user_id = foundUser._id;
            console.log(req.session.user_id)
            res.redirect('/cl/dashboard');
        } else res.send('error')
    } else {
        res.redirect('/login');
    }
} */

exports.changePhotoDeProfile = async (req, res) => {
    try {
        if (req.file) {
            dataImage = { url: req.file.path, filename: req.file.filename };
            console.log(dataImage);
            const client = await Client.findById(req.session.user_id);
            const filename = client.photoProfile.filename;
            if (filename) {
                await cloudinary.uploader.destroy(filename);
            }
            client.photoProfile = dataImage;
            client.save();
            return res.json(client);
        } else {
            return res.status(400).json({ error: "No file uploaded" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        const exist = await Client.findOne({ email: client.email });
        if (exist) return res.status(409).json({ message: "email exist deja" });
        let savedClient = await client.save();
        if (req.session) {
            req.session.user_id = savedClient._id;
            req.session.user_type = "Client";
            await req.session.save();
        } else res.send("err");
        const token = await new Token({
            userId: savedClient._id,
            userType: "Client",
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}clients/${savedClient._id}/verify/${token.token}`;
        console.log(savedClient.email);
        console.log(url);
        await sendEmail(savedClient.email, "Verify Email", url);
        return res.json({
            redirectUrl: "/verifyEmail",
            message: "An Email sent to verify your account",
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

/* exports.changePasswordClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { password } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, { password: password }, { new: true });
        return res.status(201).json(updatedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.changeNameClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { name } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, { name: name }, { new: true });
        return res.status(201).json(updatedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.changeEmailClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { email } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, { email: email }, { new: true });
        return res.status(201).json(updatedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.changeDescriptionClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params;
        const { description } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, { description: description }, { new: true });
        return res.status(201).json(updatedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.changeAlocationClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const { id } = req.params
        const { wilaya, city } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, { wilaya: wilaya, city: city }, { new: true });
        return res.status(201).json(updatedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}; */

exports.changeDetailleClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const id = req.session.user_id;
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
        const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(201).json(updatedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        //id=req.session.user_id;
        const id = req.session.user_id;
        const deletedClient = await Client.findByIdAndDelete(id);
        return res.status(201).json(deletedClient);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

//badalt id=req.body b req.params w mavirifitch ida mazalhm yamcho
