
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const cookieParser = require('cookie-parser');
const RouterClient = require('./router/client');
const RouterProfessionnel = require('./router/professionnel');
const methodOverride = require('method-override');
const RouterJob = require('./router/job');
const RouterpasswordRecuperation = require('./router/passwordRecuperation');
const RouterAuth = require('./router/auhGoogle');
const RouterVerifyEmail = require('./router/verifyEmail');
const AppError = require('./AppError');
const Client = require("./models/client");
const Professionnel = require("./models/professionnel");
const Job = require("./models/job");
const middlewars = require('./utils/middlewars');
const { userInfo } = require('os');
const app = express();
const Token = require("./models/token");
const sendEmail = require('./utils/sendEmail');
const crypto = require('crypto');
const cors = require('cors');

app.use(methodOverride('_method'));

//const uploadjobs = multer({ storageJobs });



mongoose.connect(`mongodb+srv://Geolans:${process.env.MONGOPASS}@geolans.vyqnek2.mongodb.net/?retryWrites=true&w=majority&appName=Geolans`)//criation de la base de donne ismha shopApp
    //virification de connection de mongodb to mongo server
    .then(() => {
        console.log('CONNECTION OPEN');
    })
    .catch(err => {
        console.log(err)
    });

app.use(session({
    secret: 'goodsecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cookie envoyé uniquement sur HTTPS ki tkon true
        httpOnly: false, // Cookie accessible uniquement via HTTP(S) ki tkon true
        sameSite: 'lax', // Restreint l'envoi du cookie aux requêtes du même site badalna strict l lax bh ki y5rj bg ydir auth google matatna7ach la session 
        maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie en millisecondes (ici, 24 heures)
    }
}));

app.set('view engine', 'ejs');
//app.set('views', 'views');
app.set('views', path.join(__dirname, '/views'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Remplacez 'votre-domaine.com' par le domaine de votre application React
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//app.use(session({ secret: 'goodsecret', resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials to be sent with requests
}));
app.use('/api/clients/', RouterClient);//tasta3mal request li waslatak men client
app.use('/api/professionnels/', RouterProfessionnel);
app.use('/api/jobs/', RouterJob);
app.use('/', RouterAuth);
app.use('/', RouterVerifyEmail);
app.use('/', RouterpasswordRecuperation);//tasta3mal request li waslatak men client
app.use((req, res, next) => { //bah fi kol request fi body yab3at id t3 client wla professionnel
    //req.body.id = id;
    next();    // Passer au middleware suivant dans la chaîne
});

/* const middlewars.requireLogin = (req, res, next) => {
    if (req.session && req.session.user_id) {
        next();
    } else {
        console.log(req.session);
        return res.redirect('/login');
    }
}; */


function wrapAsync(fn) { //fonction pour les erreur pour les fonction asynchrone
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/logout', (req, res) => {
    // Détruire la session côté serveur
    res.render('logout');
});
app.post('/logout', (req, res) => {
    // Détruire la session côté serveur
    req.session.destroy();
    res.json({ redirectUrl: '/login' });
});

app.post('/login', async (req, res) => {
    const { password, email } = req.body;
    let foundUser = await Professionnel.findAndValidate(email, password);
    if (!foundUser) {
        foundUser = await Client.findAndValidate(email, password);
        if (foundUser) {
            if (req.session) {
                req.session.user_id = foundUser._id;
                req.session.user_type = 'Client';
                req.session.save();
                //console.log(req.session.user_id);
                //res.json('hello');
                if (foundUser.verified)
                    res.json({ redirectUrl: '/dashboard' });
                //res.redirect('/dashboard' );
                else res.json({ redirectUrl: '/verifyEmail' });
            } else res.send('err');
        } else {
            res.status(401).json({ message: 'email or password incorrect' });
        }
    } else {
        if (req.session) {
            req.session.user_id = foundUser._id;
            req.session.user_type = 'Professionnel';
            req.session.save();
            res.redirect('/dashboard');
        } else res.send('err');
    }
});

app.get('/photo', (req, res) => {
    res.render('import')
});
app.get('/', (req, res) => {
    //console.log(req.session.user_id);
    res.send("HELOO WORLD !!!");
})
app.get('/signup', middlewars.requireLogin, (req, res) => {

});
app.get('/login', middlewars.requireLogin, (req, res) => {

    //res.render('login');
    res.json("");
    //res.render('login');
});


app.get('/dashboard', middlewars.isLoginIn, middlewars.verifyProfessionnelProfil, (req, res) => {
    //console.log(req.session);
    if (req.session.user_type == 'Client')
        res.json('client dashbord');
    else res.json('professionnel dashbord');
    //res.render('clients/dashboard');
});


app.get('/info', middlewars.isLoginIn, middlewars.verifyProfessionnelProfil, async (req, res) => {
    let foundUser;
    if (req.session && req.session.user_type == 'Client') {
        foundUser = await Client.findById(req.session.user_id);
    }
    else {
        foundUser = await Professionnel.findById(req.session.user_id)
    }
    res.json(foundUser)

    //res.render('professionnel/dashboard');
});

app.get('/pr/addProfile', middlewars.requireLoginProfessionnel, (req, res) => {
    res.send('adding professionnel Profile');
    //res.render('professionnel/dashboard');
});

app.get('/job/:id', async (req, res) => {
    const { id } = req.params;
    const foundJob = await Job.findById(id);
    if (foundJob)
        res.json(foundJob);
    else
        res.json("Job n'exist pas");
})
app.get('/job/:id/edit', middlewars.isAuthor, async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id)
    if (job) {
        console.log(job._id);
        res.render('importJob', { job });
    }
    else console.log("Job n'exist pas")
})

/* app.get('/job/createJob', async (req, res) => {
    res.send("creation job");
}) */

app.get('/search', (req, res) => {
    const { category, wilaya, ville } = req.query;
    if (category !== "ALL") {
        if (wilaya != "") {
            if (ville != "") {
                const foundProfessionnel = Professionnel.find({ category: category, wilaya: wilaya, ville: ville });
                return;
            }
            const foundprofessionnel = Professionnel.find({ category: category, wilaya: wilaya });
            return;
        }
        const foundProfessionnel = Professionnel.find({ category: category });
    } else {
        const foundProfessionnel = Professionnel.find({});
    }
}
)


app.use((err, req, res, next) => { //error hundler middlware
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});
module.exports = app;
