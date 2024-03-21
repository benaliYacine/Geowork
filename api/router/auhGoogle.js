if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); //hadi la methode t3 importation l dotenv ma3naha dir import liha ki tkon fi developpmetn mode 
}
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


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await Client.findOne({ googleId: profile.id }).exec();
            if (!user) {
                user = await Professionnel.findOne({ googleId: profile.id }).exec();
                if (!user) {
                    if (Session.signup.type == 'Client') {
                        user = await Client.create({
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            ville: 'Ville',
                            wilaya: 'Wilaya',
                            name: {
                                first: profile.name.familyName,
                                last: profile.name.givenName
                            },
                            verified:true
                        });
                        Session.loggedInUserId = user.id;
                        Session.loggedInUserType = 'Client';
                        //Session.signup.value=false;
                    } else if (Session.signup.type == 'Professionnel') {
                        user = await Professionnel.create({
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            ville: 'Ville',
                            wilaya: 'Wilaya',
                            name: {
                                first: profile.name.familyName,
                                last: profile.name.givenName
                            },
                            verified:true
                        })
                        Session.loggedInUserId = user.id;
                        Session.loggedInUserType = 'Professionnel';
                        //Session.signup.value=false;
                    } else
                        Session.signup.value = true;
                }
                else {
                    if (user.wilaya == 'Wilaya' || user.ville == 'Ville') {
                        Session.signup.value = true;
                    }
                    Session.loggedInUserId = user._id;
                    Session.loggedInUserType = 'Professionnel';
                }
            }
            else {
                if (user.wilaya == 'Wilaya' || user.ville == 'Ville') {
                    Session.signup.value = true;
                }
                Session.loggedInUserId = user._id;
                Session.loggedInUserType = 'Client';
            }
            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    }
));


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signup/google/type' }),
    function (req, res) {
        req.session.user_id = Session.loggedInUserId;
        req.session.user_type = Session.loggedInUserType;
        //console.log(req.session);
        if (Session.signup.value == true)
            return res.redirect('/continueSignup'); //hna t5ayar type ida client wla professionnel
        console.log(Session);
        res.redirect('/dashboard');
    }
);

router.get('/continueSignup', (req, res) => {
    res.render('addWC');
});
router.patch('/continueSignup', async (req, res) => {
    let user;
    if (req.session.user_type == 'Client') {
        user = await Client.findByIdAndUpdate(req.session.user_id, { wilaya: req.body.wilaya, ville: req.body.ville });
        Session.signup.value = false;
        Session.loggedInUserId = '';
        Session.loggedInUserType = '';
        Session.signup.type = '';
        res.redirect('/dashboard');
    } else if (req.session.user_type == 'Professionnel') {
        user = await Professionnel.findByIdAndUpdate(req.session.user_id, { wilaya: req.body.wilaya, ville: req.body.ville });
        Session.loggedInUserId = '';
        Session.loggedInUserType = '';
        Session.signup.value = false;
        Session.signup.type = '';
        res.redirect('/pr/addProfile');
    } else {
        // Gérer d'autres types d'utilisateur ou une condition non gérée ici
        res.redirect('/');
    }
});

router.get('/signup/google/type', (req, res) => {
    res.render('type');
});
router.post('/signup/google/type', (req, res) => {
    const { type } = req.body;
    Session.signup.type = type;
    res.redirect('/auth/google')
});

module.exports = router;