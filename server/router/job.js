//hna router tb3t mno des request lel app.js
const express = require("express");
const router = express.Router();
const middlewars = require("../utils/middlewars");
const multer = require("multer");
const session = require("express-session");
const { cloudinary, storage } = require("../cloudinary/index");
const upload = multer({ storage });
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

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

const JobCtrl = require("../controllers/job");

router.post("/addImage", upload.single("image"), JobCtrl.addImage); //single tarja3 array ki n7oto des photo bzf
router.patch("/deleteImage/:id", middlewars.isAuthor, JobCtrl.deletePhoto);
router.post("/createJob", upload.array("images"), JobCtrl.createJob);
router.patch("/changeJob/:id", JobCtrl.changeJob);
router.patch("/addSavedJob", JobCtrl.addSavedJob);
router.patch("/suppSavedJob", JobCtrl.suppSavedJob);
router.patch("/addProfessionnelToJob", JobCtrl.addProfessionnelToJob); //mazal ndir middlewar t3 hadi
router.patch("/addFeedback/:id", middlewars.isAuthor, JobCtrl.addFeedback);
router.delete("/deleteJob/:id", middlewars.isAuthor, JobCtrl.deleteJob);
router.get("/searchJob", JobCtrl.chercheJob);

module.exports = router; //dir export lel request
