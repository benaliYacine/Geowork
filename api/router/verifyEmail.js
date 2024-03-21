const Client = require('../models/client');
const Professionnel = require('../models/professionnel');
const express = require('express');
const router = express.Router();
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const middlewars = require('../utils/middlewars');
router.get('/:type/:id/verify/:tokenId', async (req, res) => {
    try {
        const { type, id, tokenId } = req.params;
        let user;
        if (type == 'clients') {
            user = await Client.findById(id);
        } else if (type == "professionnels") {
            user = await Professionnel.findById(id);
        }
        if (!user) return res.status(400).send({ message: 'Invalid link' });
        const token = await Token.findOne({ userId: id, token: tokenId });
        if (!token) return res.status(400).send({ message: 'Invalid link' });
        if (type == 'clients') {
            await Client.findByIdAndUpdate(id, { verified: true });
        } else if (type == "professionnels") {
            await Professionnel.findByIdAndUpdate(id, { verified: true });
        }
        await Token.findOneAndDelete({ userId: id, token: tokenId });
        res.status(200).send({ message: 'Email verified successfully' });
    } catch (error) {

    }
})
router.get('/verifyEmail', async (req, res) => {
    let user;
    const id = req.session.user_id;
    if(req.session.user_id){
    if (req.session.user_type == 'Client') {
        user = await Client.findById(id);
    } else
        if (req.session.user_type == 'Professionnel') {
            user = await Professionnel.findById(id);
        }
    if (user && user.verified) res.redirect('dashboard');
    else
        res.render('verifyEmail', user);
    }else res.redirect('/login');
});

router.post('/verifyEmail', async (req, res) => {
    const id = req.session.user_id;
    let user;
    let url;
    if (req.session.user_type == 'Client') {
        const token = await new Token({
            userId: id,
            userType: 'Client',
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        user = await Client.findById(id);
        url = `${process.env.BASE_URL}clients/${id}/verify/${token.token}`;
    } else {
        const token = await new Token({
            userId: id,
            userType: 'Professionnel',
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        user = await Professionnel.findById(id);
        url = `${process.env.BASE_URL}professionnels/${id}/verify/${token.token}`;
    }
    console.log(user.email);
    console.log(url);
    await sendEmail(user.email, "Verify Email", url);
    return res.status(201).json("An Email sent to verify your account");
});
module.exports = router;