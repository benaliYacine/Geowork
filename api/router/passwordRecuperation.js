const Client = require('../models/client');
const Professionnel = require('../models/professionnel');
const express = require('express');
const router = express.Router();
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const middlewars = require('../utils/middlewars');
const bcrypt = require('bcrypt');
router.get('/:type/:id/password/:tokenId', async (req, res) => {
    try {
        const { type, id, tokenId } = req.params;
        let foundUser = await Client.findById(id);
        if (!foundUser)
            foundUser = await Professionnel.findById(id);
        if (!foundUser)
            return res.redirect('/login');
        res.render('recovery', { type, id, tokenId });
    } catch (error) {

    }
})
router.post('/:type/:id/password/:tokenId', async (req, res) => {
    try {
        const { type, id, tokenId } = req.params;
        if (req.body.password != req.body.verifyPassword)
            return res.redirect(`/${type}/${id}/password/${tokenId}`);
        req.body.password = await bcrypt.hash(req.body.password, 12);
        if (type == 'clients')
            await Client.findByIdAndUpdate(id, { password: req.body.password });
        else if (type == 'professionnels')
            await Professionnel.findByIdAndUpdate(id, { password: req.body.password });
        else
            res.json('type user error');
        await Token.findOneAndDelete({ userId: id, token: tokenId });
        res.status(200).send({ message: 'Password change successfully' });
    } catch (error) {

    }
})
// router.get('/recuperatePassword', async (req, res) => {
//     res.render('passwordRecuperation');
// });
router.post('/recuperatePassword', async (req, res) => {
    try{
    let email = req.body.email;
    let foundUser = await Client.findOne({ email });
    let type='Client';
    if (!foundUser){
        foundUser = await Professionnel.findOne({ email });
        type='Professionnel'
    }
    if (!foundUser)
        res.json('User introuvable');
    const id=foundUser._id;
    console.log(foundUser);
    let url;
    if (type == 'Client') {
        const token = await new Token({
            userId: foundUser._id,
            userType: 'Client',
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        url = `${process.env.BASE_URL}clients/${foundUser._id}/password/${token.token}`;
    } else {
        const token = await new Token({
            userId: foundUser._id,
            userType: 'Professionnel',
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        url = `${process.env.BASE_URL}professionnels/${foundUser._id}/password/${token.token}`;
    }
    console.log(foundUser.email);
    console.log(url);
    await sendEmail(foundUser.email, "Recuperation Password", url);
    return res.status(201).json("An Email sent to recuperate your password");
}catch(e){
    console.log("Error", e);
}
});
module.exports = router;