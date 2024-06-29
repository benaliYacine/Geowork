//hna router tb3t mno des request lel app.js
const express = require("express");
const router = express.Router();
const session = require("express-session");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudinary/index");
const upload = multer({ storage });
const methodOverride = require("method-override");
const middlewars = require("../utils/middlewars");
router.use(methodOverride("_method"));
const MongoStore = require("connect-mongo");
router.use(
    session({
        secret: "goodsecret",
        resave: true, // Should be false in most cases to avoid race conditions
        saveUninitialized: true, // False to comply with laws that require permission before setting cookies
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://benali:Kqt4laZUdpkxe3PR@cluster0.1ijroxg.mongodb.net/?appName=Cluster0",
            ttl: 24 * 60 * 60 * 30, // = 30 day. TTL in seconds
        }),
        cookie: {
            secure: true, // Set to true if using https
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: "strict", // Lax to prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 * 30, // 24 hours * 30 in milliseconds
        },
    })
);

const ProfessionnelCtrl = require("../controllers/professionnel");

router.patch(
    "/changePhotoDeProfile",
    upload.single("image"),
    ProfessionnelCtrl.changePhotoDeProfile
);
router.patch(
    "/changeDetailleProfessionnel",
    ProfessionnelCtrl.changeDetailleProfessionnel
);
router.post("/createProfessionnel", ProfessionnelCtrl.createProfessionnel);
/* router.post('/loginProfessionnel', ProfessionnelCtrl.loginProfessionnel); */
/* router.patch('/changePasswordProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changePasswordProfessionnel);
 */ router.patch(
    "/addProfileProfessionnel",
    upload.single("image"),
    ProfessionnelCtrl.addProfileProfessionnel
);
/* router.patch('/changeNameProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeNameProfessionnel);
router.patch('/changeEmailProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeEmailProfessionnel);
router.patch('/changeDescriptionProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeDescriptionProfessionnel);
router.patch('/changeAlocationProfessionnel/:id', middlewars.isAccessible, ProfessionnelCtrl.changeAlocationProfessionnel); */
router.patch("/addEmployment", ProfessionnelCtrl.addEmployment);
router.patch("/modifyEmployment", ProfessionnelCtrl.modifyEmployment);
router.patch("/addEducation", ProfessionnelCtrl.addEducation);
router.patch("/modifyEducation", ProfessionnelCtrl.modifyEducation);
router.patch("/addExperience", ProfessionnelCtrl.addExperience);
router.patch("/addSavedProfessionnel", ProfessionnelCtrl.addSavedProfessionnel);
router.patch(
    "/suppSavedProfessionnel",
    ProfessionnelCtrl.suppSavedProfessionnel
);
router.patch("/modifyExperience", ProfessionnelCtrl.modifyExperience);
router.patch(
    "/changeProfileProfessionnel",
    ProfessionnelCtrl.changeProfileProfessionnel
);
/* router.put('/changeProfessionnel', ProfessionnelCtrl.changeProfessionnel); */
router.delete("/deleteProfessionnel", ProfessionnelCtrl.deleteProfessionnel);
router.patch("/suppEducation", ProfessionnelCtrl.suppEducation);
router.patch("/suppExperience", ProfessionnelCtrl.suppExperience);
router.patch("/suppEmployment", ProfessionnelCtrl.suppEmployment);
module.exports = router; //dir export lel request
