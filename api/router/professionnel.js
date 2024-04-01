//hna router tb3t mno des request lel app.js
const express = require('express');
const router = express.Router();
const session = require('express-session');
const multer = require('multer');
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


const ProfessionnelCtrl = require('../controllers/professionnel')

router.patch('/changePhotoDeProfile/:id', middlewars.isAccessible, upload.single('image'), ProfessionnelCtrl.changePhotoDeProfile);
router.patch('/changeDetailleProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeDetailleProfessionnel);
router.post('/createProfessionnel', ProfessionnelCtrl.createProfessionnel);
/* router.post('/loginProfessionnel', ProfessionnelCtrl.loginProfessionnel); */
/* router.patch('/changePasswordProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changePasswordProfessionnel);
 */router.patch('/addProfileProfessionnel', upload.single('image'), ProfessionnelCtrl.addProfileProfessionnel);
/* router.patch('/changeNameProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeNameProfessionnel);
router.patch('/changeEmailProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeEmailProfessionnel);
router.patch('/changeDescriptionProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeDescriptionProfessionnel);
router.patch('/changeAlocationProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeAlocationProfessionnel); */
router.patch('/addEmployment/:id', middlewars.isAccessible, ProfessionnelCtrl.addEmployment);
router.patch('/addEducation/:id', middlewars.isAccessible, ProfessionnelCtrl.addEducation);
router.patch('/addExperience/:id', middlewars.isAccessible, ProfessionnelCtrl.addExperience);
router.patch('/changeProfileProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeProfileProfessionnel);
/* router.put('/changeProfessionnel', ProfessionnelCtrl.changeProfessionnel); */
router.delete('/deleteProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.deleteProfessionnel);
router.patch('/suppEducation/:id', middlewars.isAccessible, ProfessionnelCtrl.suppEducation);
router.patch('/suppExperience/:id', middlewars.isAccessible, ProfessionnelCtrl.suppExperience);
router.patch('/suppEmployment/:id', middlewars.isAccessible, ProfessionnelCtrl.suppEmployment);
module.exports = router //dir export lel request