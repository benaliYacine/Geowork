//hna router tb3t mno des request lel app.js
const express = require('express');
const router = express.Router();
const middlewars = require('../utils/middlewars');
const multer = require('multer');
const session = require('express-session');
const { cloudinary, storage } = require('../cloudinary/index');
const upload = multer({ storage });
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.use(session({
    secret: 'goodsecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cookie envoyé uniquement sur HTTPS ki tkon true
        httpOnly: false, // Cookie accessible uniquement via HTTP(S) ki tkon true
        sameSite: 'strict', // Restreint l'envoi du cookie aux requêtes du même site
        maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie en millisecondes (ici, 24 heures)
    }
}));


const JobCtrl = require('../controllers/job')


router.post('/addImage', upload.single('image'), JobCtrl.addImage); //single tarja3 array ki n7oto des photo bzf
router.patch('/deleteImage/:id', middlewars.isAuthor, JobCtrl.deletePhoto);
router.post('/createJob',upload.array('images'), JobCtrl.createJob);
router.patch('/changeJob/:id', JobCtrl.changeJob);
router.patch('/addSavedJob', JobCtrl.addSavedJob);
router.patch('/suppSavedJob', JobCtrl.suppSavedJob);
router.patch('/addProfessionnelToJob', JobCtrl.addProfessionnelToJob); //mazal ndir middlewar t3 hadi
router.patch('/addFeedback/:id', middlewars.isAuthor, JobCtrl.addFeedback);
router.delete('/deleteJob/:id', middlewars.isAuthor, JobCtrl.deleteJob);
router.get('/searchJob', JobCtrl.chercheJob);

module.exports = router //dir export lel request