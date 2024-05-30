const Client = require("../models/client");
const Professionnel = require("../models/professionnel");
const express = require("express");
const router = express.Router();
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const middlewars = require("../utils/middlewars");
router.get(
    "/:type/:id/verify/:tokenId",
    async (req, res) => {
        try {
            const { type, id, tokenId } = req.params;
            let user;
            if (type == "clients") {
                user = await Client.findById(id);
            } else if (type == "professionnels") {
                user = await Professionnel.findById(id);
            }
            if (!user) return res.status(200).json({ message: "Invalid link" });
            console.log("user.verified", user.verified);
            if (user.verified) {
                return res.json({ redirectUrl: "/dashboard" });
            }
            const token = await Token.findOne({ userId: id, token: tokenId });
            if (!token)
                return res.status(200).json({ message: "Invalid link" });
            if (type == "clients") {
                await Client.findByIdAndUpdate(id, { verified: true });
            } else if (type == "professionnels") {
                await Professionnel.findByIdAndUpdate(id, { verified: true });
            }
            await Token.findOneAndDelete({ userId: id, token: tokenId });
            return res
                .status(200)
                .json({ message: "Email verified successfully" });
        } catch (error) {}
    }
);
router.get("/verifyEmail", async (req, res) => {
    try{
    let user;
    const id = req.session.user_id;
    if (req.session.user_type == "Client") {
        user = await Client.findById(id);
    } else if (req.session.user_type == "Professionnel") {
        user = await Professionnel.findById(id);
    } else return res.json({ redirectUrl: "/login" });
    if (user && user.verified) return res.json({ redirectUrl: "/dashboard" });
    else return res.json({ emailAddress: user.email });
}catch(e){
    console.log("Error", e);
}
});

router.post("/verifyEmail", async (req, res) => {
    try{
    const id = req.session.user_id;
    let user;
    let url;
    if (req.session.user_type == "Client") {
        const token = await new Token({
            userId: id,
            userType: "Client",
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        user = await Client.findById(id);
        url = `${process.env.BASE_URL}clients/${id}/verify/${token.token}`;
    } else {
        const token = await new Token({
            userId: id,
            userType: "Professionnel",
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        user = await Professionnel.findById(id);
        url = `${process.env.BASE_URL}professionnels/${id}/verify/${token.token}`;
    }
    console.log(user.email);
    console.log(url);
    const error = await sendEmail(user.email, "Verify Email", url);
    if (error) {
        return res.json({ error: error });
    }
    return res
        .status(201)
        .json({ message: "An Email sent to verify your account" });
}catch(e){
    console.log("Error", e);
}
});
module.exports = router;
