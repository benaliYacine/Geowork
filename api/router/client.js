if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); //hadi la methode t3 importation l dotenv ma3naha dir import liha ki tkon fi developpmetn mode 
}
//hna router tb3t mno des request lel app.js
const multer = require('multer');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { cloudinary, storage } = require('../cloudinary/index');
const upload = multer({ storage });
const methodOverride = require('method-override');
const middlewars = require('../utils/middlewars');

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



const ClientCtrl = require('../controllers/client')
router.patch('/changePhotoDeProfile/:id', middlewars.isAccessible, upload.single('image'), ClientCtrl.changePhotoDeProfile);
router.post('/createClient', ClientCtrl.createClient);
/* router.post('/loginClient', ClientCtrl.loginClient); */
/* router.patch('/changePasswordClient/:id', middlewars.isAccessible, ClientCtrl.changePasswordClient);
router.patch('/changeNameClient/:id', middlewars.isAccessible, ClientCtrl.changeNameClient);
router.patch('/changeEmailClient/:id', middlewars.isAccessible, ClientCtrl.changeEmailClient);
router.patch('/changeDescriptionClient/:id', middlewars.isAccessible, ClientCtrl.changeDescriptionClient);
router.patch('/changeAlocationClient/:id', middlewars.isAccessible, ClientCtrl.changeAlocationClient); */
router.patch('/changeDetailleClient', ClientCtrl.changeDetailleClient);
router.delete('/deleteClient', ClientCtrl.deleteClient);
module.exports = router //dir export lel request