if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); //hadi la methode t3 importation l dotenv ma3naha dir import liha ki tkon fi developpmetn mode 
}
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Client = require('../models/client');
const Professionnel = require('../models/professionnel');
router.use(passport.initialize());
let Session = {
    loggedInUserId: '',
    loggedInUserType: '',
    signup: {
        value: false,
        type: ''
    }
}
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

let dataUser;
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['profile', 'email']
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await Client.findOne({ googleId: profile.id });
            if (!user) {
                user = await Professionnel.findOne({ googleId: profile.id });
                if (!user) {
                    dataUser = {
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        city: 'city',
                        wilaya: 'Wilaya',
                        name: {
                            first: profile.name.familyName,
                            last: profile.name.givenName
                        },
                        verified: true
                    }
                    Session.signup.value = true;
                }


            }
            if (!user) {
                Session.signup.value = true;
            }
            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    }
));


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/InputWilayaCity' }),
    function (req, res) {
        if (Session.loggedInUserId !== '') {
            req.session.user_id = Session.loggedInUserId;
            req.session.user_type = Session.loggedInUserType;
        }
        //console.log(req.session);
        if (Session.signup.value == true)
            return res.redirect('http://localhost:5173/InputWilayaCity'); //hna t5ayar type ida client wla professionnel
        console.log(Session);
        return res.redirect('http://localhost:5173/dashboard');
    }
);

router.get('/continueSignup', (req, res) => {
    res.render('addWC');
});

router.post('/continueSignup', async (req, res) => {
    let user;
    console.log(req.body.type);
    if (req.body.type == 'Client') {
        user = new Client({ _id: new mongoose.Types.ObjectId(), ...dataUser, wilaya: req.body.wilaya, city: req.body.city });
        console.log(user);
        Session.signup.value = false;
        Session.loggedInUserId = '';
        Session.loggedInUserType = '';
        Session.signup.type = '';
        const foundUser = await user.save();
        req.session.user_id = user._id;
        req.session.user_type = 'Client';
        return res.json({ redirectUrl: '/dashboard' });
    } else if (req.body.type == 'Professionnel') {
        user = new Professionnel({ _id: new mongoose.Types.ObjectId(), ...dataUser, wilaya: req.body.wilaya, city: req.body.city });
        Session.loggedInUserId = '';
        Session.loggedInUserType = '';
        Session.signup.value = false;
        Session.signup.type = '';
        const foundUser = await user.save();
        req.session.user_id = user._id;
        req.session.user_type = 'Professionnel';
        res.json({ redirectUrl: '/pr/addProfile' });
    } else {
        // Handle other user types or unhandled condition here
        res.json({ redirectUrl: '/' });
    }
});

/* router.get('/signup/google/type', (req, res) => {
    res.render('type');
}); */
router.post('/signup/google/type', (req, res) => {
    const { type } = req.body;
    Session.signup.type = type;
    res.json({ redirectUrl: 'http://localhost:3000/auth/google/callback' })
});

module.exports = router;