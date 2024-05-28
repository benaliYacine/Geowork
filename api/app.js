const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const cookieParser = require('cookie-parser');
const RouterClient = require("./router/client");
const RouterProfessionnel = require("./router/professionnel");
const methodOverride = require("method-override");
const RouterJob = require("./router/job");
const RouterpasswordRecuperation = require("./router/passwordRecuperation");
const RouterAuth = require("./router/auhGoogle");
const RouterVerifyEmail = require("./router/verifyEmail");
const AppError = require("./AppError");
const Client = require("./models/client");
const Professionnel = require("./models/professionnel");
const Job = require("./models/job");
const Message = require("./models/message");
const middlewars = require("./utils/middlewars");
const { userInfo } = require("os");
const app = express();
const Token = require("./models/token");
const sendEmail = require("./utils/sendEmail");
const crypto = require("crypto");
const cors = require("cors");
const WebSocket = require("ws");
const { cloudinary, storage } = require("./cloudinary/index");
const multer = require("multer");
const upload = multer({ storage });
const jwt = require("jsonwebtoken");
let user_id;
let user_type;
const bcrypt = require("bcrypt");
app.use(methodOverride("_method"));

//const uploadjobs = multer({ storageJobs });

mongoose
    .connect("mongodb://127.0.0.1:27017/Geolans") //criation de la base de donne ismha shopApp
    //virification de connection de mongodb to mongo server
    .then(() => {
        console.log("CONNECTION OPEN");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(
    session({
        secret: "goodsecret",
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false, // Cookie envoyé uniquement sur HTTPS ki tkon true
            httpOnly: false, // Cookie accessible uniquement via HTTP(S) ki tkon true
            sameSite: "lax", // Restreint l'envoi du cookie aux requêtes du même site badalna strict l lax bh ki y5rj bg ydir auth google matatna7ach la session
            maxAge: 24 * 60 * 60 * 1000, // Durée de vie du cookie en millisecondes (ici, 24 heures)
        },
    })
);

app.use((req, res, next) => {
    user_id = req.session.user_id;
    user_type = req.session.user_type;
    console.log(req.session.user_id);
    next();
});

app.set("view engine", "ejs");
//app.set('views', 'views');
app.set("views", path.join(__dirname, "/views"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Remplacez 'votre-domaine.com' par le domaine de votre application React
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//app.use(session({ secret: 'goodsecret', resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ limit: "10 mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from this origin
        credentials: true, // Allow credentials to be sent with requests
    })
);
app.use("/api/clients/", RouterClient); //tasta3mal request li waslatak men client
app.use("/api/professionnels/", RouterProfessionnel);
app.use("/api/jobs/", RouterJob);
app.use("/", RouterAuth);
app.use("/", RouterVerifyEmail);
app.use("/", RouterpasswordRecuperation); //tasta3mal request li waslatak men client
app.use((req, res, next) => {
    //bah fi kol request fi body yab3at id t3 client wla professionnel
    //req.body.id = id;
    next(); // Passer au middleware suivant dans la chaîne
});

/* const middlewars.requireLogin = (req, res, next) => {
    if (req.session && req.session.user_id) {
        next();
    } else {
        console.log(req.session);
        return res.redirect('/login');
    }
}; */

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
function wrapAsync(fn) {
    //fonction pour les erreur pour les fonction asynchrone
    return function (req, res, next) {
        fn(req, res, next).catch((e) => next(e));
    };
}
app.get("/", async (req, res) => {
    if (req.session.user_id) {
        res.json({ redirectUrl: "/dashboard" });
    } else res.json({});
});
app.get("/userId", (req, res) => {
    res.json({ user_id: req.session.user_id });
});
app.get("/header", async (req, res) => {
    let user;
    let responseData = {};
    if (req.session.user_type == "Client") {
        user = await Client.findById(req.session.user_id);
        responseData.name = `${user.name.first} ${user.name.last}`;
        responseData.pro = false;
        responseData.logedIn = true;
        responseData.isClient = true;
    } else if (req.session.user_type == "Professionnel") {
        user = await Professionnel.findById(req.session.user_id);
        responseData.name = `${user.name.first} ${user.name.last}`;
        responseData.photoProfile = user.profile.photoProfile.url;
        responseData.pro = true;
        responseData.logedIn = true;
        responseData.isClient = false;
    } else {
        responseData.logedIn = false;
    }
    return res.json(responseData);
});
app.get("/logout", (req, res) => {
    // Détruire la session côté serveur
    res.render("logout");
});
app.get(
    "/profileSlides",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const pro = await Professionnel.findById(req.session.user_id);
        if (pro.profile.added) return res.json({ redirectUrl: "/dashboard" });
        res.json("");
    }
);
app.post("/logout", (req, res) => {
    // Détruire la session côté serveur
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la destruction de la session :", err);
            res.status(500).json({ error: "Erreur lors de la déconnexion" });
        } else {
            res.json({ redirectUrl: "/login" });
        }
    });
});
app.get("/settings", middlewars.isLoginIn, async (req, res) => {
    if (req.session.user_type == "Client")
        res.json(await Client.findById(req.session.user_id));
    if (req.session.user_type == "Professionnel")
        res.json(await Professionnel.findById(req.session.user_id));
});
app.post("/verifyOldPassword", async (req, res) => {
    const { oldPassword, password } = req.body;
    return res.json({
        passwordVerify: await bcrypt.compare(oldPassword, password),
    });
});
app.post("/login", async (req, res) => {
    const { password, email } = req.body;
    let foundUser = await Professionnel.findAndValidate(email, password);
    if (!foundUser) {
        foundUser = await Client.findAndValidate(email, password);
        if (foundUser) {
            //generateToken(foundUser._id);
            if (req.session) {
                req.session.user_id = foundUser._id;
                req.session.user_type = "Client";
                req.session.save();
                //console.log(req.session.user_id);
                //res.json('hello');
                if (foundUser.verified) res.json({ redirectUrl: "/dashboard" });
                //res.redirect('/dashboard' );
                else res.json({ redirectUrl: "/verifyEmail" });
            } else res.send("err");
        } else {
            res.status(401).json({ message: "email or password incorrect" });
        }
    } else {
        //generateToken(foundUser._id);
        if (req.session) {
            req.session.user_id = foundUser._id;
            req.session.user_type = "Professionnel";
            req.session.save();
            res.json({ redirectUrl: "/dashboard" });
        } else res.send("err");
    }
});

app.get("/photo", (req, res) => {
    res.render("import");
});
app.get("/", (req, res) => {
    //console.log(req.session.user_id);
    res.send("HELOO WORLD !!!");
});
app.get("/signup", middlewars.requireLogin, (req, res) => {
    res.json("");
});
app.get("/login", middlewars.requireLogin, (req, res) => {
    //res.render('login');
    res.json("");
    //res.render('login');
});
app.get(
    "/profileProfessionnel",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const pro = await Professionnel.findById(req.session.user_id).populate(
            "profile.jobs"
        );
        console.log(pro);
        res.json(pro);
    }
);

app.get(
    "/dashboard",
    middlewars.isLoginIn,
    middlewars.verifyProfessionnelProfil,
    async (req, res) => {
        //console.log(req.session);
        if (req.session.user_type == "Client") {
            const cli = await Client.findById(req.session.user_id).populate(
                "jobs"
            );
            if (!cli.jobs || (cli.jobs && cli.jobs.length == 0))
                return res.json({ redirectUrl: "/welcomeCli" });

            console.log(cli);
            res.json(cli);
        } else {
            const pro = await Professionnel.findById(
                req.session.user_id
            ).populate("profile.jobs");
            console.log(pro);
            res.json(pro);
        }
        //res.render('clients/dashboard');
    }
);
app.get("/client", async (req, res) => {
    if (req.session.user_type == "Client") {
        const cli = await Client.findById(req.session.user_id).populate("jobs");
        res.json(cli.jobs);
    } else res.json({});
});
app.post("/clientinfo", async (req, res) => {
    const { id } = req.body;
    const job = await Job.findById(id);
    console.log("job", job);
    const cli = await Client.findById(job.idClient);
    if (cli) {
        return res.json(cli);
    } else {
        return res.json({});
    }
});
app.get("/welcomeCli", middlewars.requireLoginClient, async (req, res) => {
    const cli = await Client.findById(req.session.user_id).populate("jobs");
    if (cli.jobs && cli.jobs.length != 0)
        return res.json({ redirectUrl: "/dashboard" });
    res.json(cli);
});

app.get(
    "/info",
    middlewars.isLoginIn,
    middlewars.verifyProfessionnelProfil,
    async (req, res) => {
        let foundUser;
        if (req.session && req.session.user_type == "Client") {
            foundUser = await Client.findById(req.session.user_id);
        } else {
            foundUser = await Professionnel.findById(req.session.user_id);
        }
        res.json(foundUser);

        //res.render('professionnel/dashboard');
    }
);

app.get("/InputWilayaCity", middlewars.requireLogin, (req, res) => {
    res.json("");
});
app.get("/chat", middlewars.isLoginIn, (req, res) => {
    res.json("");
});

app.get(
    "/welcomePro",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        try {
            const pro = await Professionnel.findById(req.session.user_id);
            if (!pro.profile.added)
                res.json(pro); // Sending JSON response using `res` object
            else req.json({ redirectUrl: "/dashboard" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" }); // Sending error response if there's an issue
        }
    }
);

app.get(
    "/savedJobs",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        if (req.session.user_type == "Professionnel") {
            let pro = await Professionnel.findById(req.session.user_id)
                .populate({
                    path: "profile.savedJobs",
                    populate: {
                        path: "idClient",
                        populate: {
                            path: "jobs", // Correctly populates the jobs array within idClient
                        },
                    },
                })
                .lean();
            console.log("pro", pro);
            let jobs = pro.profile.savedJobs;
            if (jobs)
                jobs = jobs.map((j) => {
                    return {
                        ...j,
                        id: j._id,
                        heart: true,
                        isExpert: true,
                        images: j.images.map((i) => i.url),
                        client: j.idClient,
                    };
                });
            console.log(jobs);
            res.json(jobs);
        }
    }
);
app.get("/savedExperts", middlewars.requireLoginClient, async (req, res) => {
    if (req.session.user_type == "Client") {
        let cli = await Client.findById(req.session.user_id)
            .populate("savedProfessionnel")
            .lean();
        console.log("cli", cli);
        let pro = cli.savedProfessionnel;
        console.log(pro);
        res.json(pro);
    }
});
app.get("/idClient", (req, res) => {
    if (req.session && req.session.user_id) {
        return res.json({ idClient: req.session.user_id });
    }
});
app.get("/jobPostPage/:id", async (req, res) => {
    const { id } = req.params;
    let foundJob = await Job.findById(id);
    if (!foundJob) {
        return res.json({ redirectUrl: "/dashboard" });
    }
    const client = await Client.findById(foundJob.idClient).populate("jobs");
    let apply = true;
    if (foundJob) {
        if (req.session.user_type == "Professionnel") {
            const pro = await Professionnel.findById(req.session.user_id);
            if (pro) {
                const savedJobIds = pro.profile.savedJobs.map((j) =>
                    j.toString()
                ); // Assuming _id is an ObjectId
                if (savedJobIds.length > 0) {
                    console.log(savedJobIds);
                    foundJob.heart = savedJobIds.includes(
                        foundJob.id.toString()
                    );
                    console.log(foundJob.heart);
                } else {
                    foundJob.heart = false;
                }
            } else {
                foundJob.heart = false; // User not found
            }
        } else {
            apply = false;
            foundJob.heart = false; // User is not a professional
        }
        console.log("foundJob.heart", foundJob.heart);
        console.log(foundJob);
        const job = { ...foundJob };
        job._doc.heart = foundJob.heart;
        console.log(job);

        res.json({ ...job._doc, apply, client: client });
    } else {
        res.status(400).json({ message: "Invalid Job Id" });
    }
});

app.get("/jobSlides", middlewars.requireLoginClient, async (req, res) => {
    res.json();
});
app.get("/job/:id/edit", middlewars.isAuthor, async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.json({ redirectUrl: "/dashboard" });
    }
    if (job) {
        console.log(job._id);
        res.render("importJob", { job });
    } else console.log("Job n'exist pas");
});

/* app.get('/job/createJob', async (req, res) => {
    res.send("creation job");
}) */
// app.get('/expert/:id',async(req,res)=>{
//     const {id}=req.params;
//     const pro=await Professionnel.findById(id).populate("profile.jobs");4
//     if(!pro){
//         return res.json({redirectUrl:'/dashboard'})
//     }
//     res.json(pro);
// })
app.get("/findWork", middlewars.requireLoginProfessionnel, async (req, res) => {
    const pro = await Professionnel.findById(req.session.user_id);
    const searchCriteria = {
        wilaya: pro.wilaya,
        city: pro.city,
        category: pro.profile.category,
        subCategory: pro.profile.subCategory,
    };
    let jobs = await Job.find(searchCriteria);
    const savedJobIds = pro.profile.savedJobs.map((j) => j.toString()); // Assuming _id is an ObjectId
    if (savedJobIds)
        jobs = await Promise.all(
            jobs.map(async (j) => {
                const client = await Client.findById(j.idClient).populate(
                    "jobs"
                );
                const heart = savedJobIds.includes(j._id.toString());
                return { ...j.toObject(), heart, client: client }; // Convert toObject() if p is a mongoose document
            })
        );
    else
        jobs = await Promise.all(
            jobs.map(async (j) => {
                const client = await Client.findById(j.idClient).populate(
                    "jobs"
                );
                const heart = savedJobIds.includes(j._id.toString());
                return { ...j.toObject(), heart, client: client }; // Convert toObject() if p is a mongoose document
            })
        );
    jobs = jobs.map((j) => ({ ...j, images: j.images.map((i) => i.url) }));
    console.log("jobsssssssssssss", jobs);
    res.json(jobs);
});

app.get("/jobsSearch", async (req, res) => {
    try {
        // Extraire les valeurs des paramètres de la requête
        const { category, subCategory, wilaya, city } = req.query;
        console.log("req.query", req.query);
        // Vérifier si au moins un paramètre est fourni
        // if (!category && !subCategory && !wilaya && !city) {
        //     return res.status(400).json({
        //         error: "Au moins un paramètre de recherche est requis.",
        //     });
        // }

        // Construire la recherche en fonction des paramètres fournis
        const searchCriteria = {};

        if (Object.keys(req.query).length == 0) {
            let user;
            if (req.session.user_type == "Professionnel") {
                user = await Professionnel.findById(req.session.user_id);
                searchCriteria.category = user.profile.category;
                searchCriteria.subCategory = user.profile.subCategory;
                searchCriteria.wilaya = user.wilaya;
                searchCriteria.city = user.city;
                return res.json({
                    redirectUrl: `?category=${user.profile.category}&subCategory=${user.profile.subCategory}&wilaya=${user.wilaya}&city=${user.city}`,
                });
            } else if (req.session.user_type == "Client") {
                user = await Client.findById(req.session.user_id);
                return res.json({
                    redirectUrl: `?wilaya=${user.wilaya}&city=${user.city}`,
                });
            }
        }

        if (category) searchCriteria.category = category;
        if (subCategory) searchCriteria.subCategory = subCategory;
        if (wilaya) searchCriteria.wilaya = wilaya;
        if (city) searchCriteria.city = city;
        console.log("searchCriteria", searchCriteria);
        //Effectuer la recherche dans la base de données

        let jobs = await Job.find(searchCriteria);
        console.log(jobs);
        if (req.session.user_type == "Professionnel") {
            const pro = await Professionnel.findById(req.session.user_id);
            const savedJobIds = pro.profile.savedJobs.map((j) => j.toString()); // Assuming _id is an ObjectId
            if (savedJobIds)
                jobs = await Promise.all(
                    jobs.map(async (j) => {
                        const heart = savedJobIds.includes(j._id.toString());
                        return {
                            ...j.toObject(),
                            heart,
                            isExpert: true,
                        }; // Convert toObject() if p is a mongoose document
                    })
                );
            else
                jobs = await Promise.all(
                    jobs.map(async (j) => {
                        const heart = savedJobIds.includes(j._id.toString());
                        return {
                            ...j.toObject(),
                            heart,
                            isExpert: true,
                            
                        }; // Convert toObject() if p is a mongoose document
                    })
                );
        }
        jobs = await Promise.all(
            jobs.map(async (j) => {
                const client = await Client.findById(j.idClient).populate(
                    "jobs"
                );
                return { ...j.toObject(), client: client };
            })
        );
        console.log("job+heart", jobs);
        // Retourner les résultats de la recherche
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Une erreur est survenue lors de la recherche d'emplois.",
        });
    }
});
app.get("/expertInfo/:id", async (req, res) => {
    const { id } = req.params;
    console.log("iddddddd", id);
    const pro = await Professionnel.findById(id)
        .populate("profile.jobs")
        .lean();
    if (!pro) {
        return res.json({ redirectUrl: "/dashboard" });
    }
    console.log("professionnel", pro);
    res.json({
        ...pro,
        isExpert: req.session.user_type == "Professionnel" ? true : false,
    });
});
/* app.get('/header', (req, res) => {
    let info;
    if (req.session.user_id) {
        info.logedIn = true
    } else {
        info.logedIn = false
    }
    if (req.session.user_type == 'Client') {
        info.isClient = true;
    } else
        info.isClient = false;
    console.log("headerInfo",info);
    res.json(info);
}) */
app.get("/expertsSearch", async (req, res) => {
    try {
        // Extraire les valeurs des paramètres de la requête
        const { category, subCategory, wilaya, city } = req.query;
        console.log("wilaya", wilaya);
        // Vérifier si au moins un paramètre est fourni
        if (!category && !subCategory && !wilaya && !city) {
            return res.status(400).json({
                error: "Au moins un paramètre de recherche est requis.",
            });
        }

        // Construire la recherche en fonction des paramètres fournis
        let searchCriteria = {};
        if (category) searchCriteria["profile.category"] = category;
        if (subCategory) searchCriteria["profile.subCategory"] = subCategory;
        if (wilaya) searchCriteria.wilaya = wilaya;
        if (city) searchCriteria.city = city;
        console.log("searchCriteria", searchCriteria);
        // Effectuer la recherche dans la base de données
        let professionnels =
            await Professionnel.find(searchCriteria).populate("profile.jobs");
        console.log(professionnels);
        // Retourner les résultats de la recherche
        if (req.session.user_type == "Client") {
            const cli = await Client.findById(req.session.user_id);
            const savedProfessionalIds = cli.savedProfessionnel.map((p) =>
                p.toString()
            ); // Assuming _id is an ObjectId
            professionnels = await Promise.all(
                professionnels.map(async (p) => {
                    const heart = savedProfessionalIds.includes(
                        p._id.toString()
                    );
                    return { ...p.toObject(), heart, isClient: true }; // Convert toObject() if p is a mongoose document
                })
            );
        }
        console.log("expert+heart", professionnels);
        res.json(professionnels);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Une erreur est survenue lors de la recherche d'emplois.",
        });
    }
});

app.post("/contact", middlewars.isLoginIn, async (req, res) => {
    let user;

    if (req.session.user_type == "Client") {
        user = await Client.findById(req.session.user_id)
            .populate("contacts.contactId")
            .populate("contacts.messages.message");
    } else if (req.session.user_type == "Professionnel") {
        user = await Professionnel.findById(req.session.user_id)
            .populate("contacts.contactId")
            .populate("contacts.messages.message");
    }

    let array = user.contacts.map((c) => {
        const lastMessage =
            c.messages.length > 0
                ? c.messages[c.messages.length - 1].message[
                      c.messages[c.messages.length - 1].message.length - 1
                  ].message.content
                : "";
        const lastMessageTime =
            c.messages.length > 0
                ? c.messages[c.messages.length - 1].message[
                      c.messages[c.messages.length - 1].message.length - 1
                  ].time
                : "";

        if (!c.contactId) {
            c.contactId = {};
        }
        console.log("lastMessage", lastMessage);
        console.log("lastMessage", lastMessageTime);
        c.contactId.id = c._id;
        c.contactId.message = lastMessage;
        c.contactId.time = lastMessageTime;

        return c.contactId;
    });

    const compareDates = (a, b) => {
        if (a.time < b.time) {
            return 1;
        }
        if (a.time >= b.time) {
            return -1;
        }
        return 0;
    };
    array.sort(compareDates);

    array = array.map((c) => {
        const avatarUrl =
            req.session.user_type == "Professionnel"
                ? c.photoProfile.url
                : c.profile.photoProfile.url;
        let time = c.time;
        /* const currentTime = new Date(); // Current date and time
        const messageTime = new Date(c.time); // Time of the message

        // Check if the message is from the current day
        if (currentTime.toDateString() === messageTime.toDateString()) {
            // Format time as "HH:mm AM/PM"
            time = `${messageTime.getHours()}:${messageTime.getMinutes()} `;/* ${messageTime.getHours() >= 12 ? 'PM' : 'AM' }*/
        /*} else {
            // Format time as "Day Month HH:mm AM/PM" if not from current day
            const dayOfMonth = messageTime.getDate();
            const month = messageTime.toLocaleString('default', { month: 'long' });
            time = `${dayOfMonth} ${month}`;
        } */
        let isActive = false;
        if (req.body.people)
            isActive = req.body.people.some((p) => p.user_id == c._id);
        //hada id de type objectId w ki na7i _ ywali string
        return {
            id: c._id,
            name: `${c.name.first} ${c.name.last}`,
            message: c.message,
            avatarUrl: avatarUrl,
            isActive: isActive,
            time: time,
        };
    });
    console.log("array", array);
    res.json(array);
});
app.get("/messages/:id", middlewars.isLoginIn, async (req, res) => {
    try {
        const { id } = req.params;

        if (id == 1) {
            return res.json("");
        }

        let user;

        // Determine user type from session
        if (req.session.user_type === "Client") {
            user = await Professionnel.findById(id)
                .populate("contacts.messages.message")
                .populate({
                    path: "contacts.messages.message", // Popule le champ "message" des messages dans les contacts
                    populate: {
                        path: "message.jobId", // Popule le champ "jobId" dans les messages peuplés précédemment
                        model: "Job", // Assurez-vous que "Job" est le bon modèle pour "jobId"
                    },
                });
            if (!user) {
                return res.json({ redirectUrl: "/dashboard" });
            }
        } else if (req.session.user_type === "Professionnel") {
            user = await Client.findById(id)
                .populate("contacts.messages.message")
                .populate({
                    path: "contacts.messages.message", // Popule le champ "message" des messages dans les contacts
                    populate: {
                        path: "message.jobId", // Popule le champ "jobId" dans les messages peuplés précédemment
                        model: "Job", // Assurez-vous que "Job" est le bon modèle pour "jobId"
                    },
                });
            if (!user) {
                return res.json({ redirectUrl: "/dashboard" });
            }
        }

        if (!user) {
            return res.json({ redirectUrl: "/messages/1" });
        } else {
            const newUser = { ...user._doc, user_id: req.session.user_id };

            res.json(newUser);
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get(
    "/SubmitProposal/:id",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.json({ redirectUrl: "/dashboard" });
        }
        res.json(job);
    }
);
app.patch(
    "/changeProposalBudget",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const { id, budget, coverLetter } = req.body;
        const message = await Message.findById(id);
        if (message) {
            message.message.budget = budget;
            message.message.coverLetter = coverLetter;
        }
        const saveMessage = await message.save();
        res.json(saveMessage);
    }
);
app.patch(
    "/withrawProposal",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const { id } = req.body;
        const message = await Message.findById(id);
        if (message) {
            message.message.state = "withdrawn";
        }
        const saveMessage = await message.save();
        // const job = await Job.findById(message.message.jobId);
        // job.proposals = job.proposals.filter((p) => p != req.session.user_id);
        // await job.save();
        res.json(saveMessage);
    }
);
app.patch("/cancelBudgetEdit", async (req, res) => {
    const { id } = req.body;
    const foundMessage = await Message.findById(id);
    if (foundMessage) foundMessage.message.state = "withdrawn";
    const saveMessage = await foundMessage.save();
    res.json(saveMessage);
});
app.patch("/cancelInvitation", async (req, res) => {
    const { id } = req.body;
    const foundMessage = await Message.findById(id);
    if (foundMessage) foundMessage.message.state = "withdrawn";
    const saveMessage = await foundMessage.save();
    res.json(saveMessage);
});
app.patch("/denyInvitation", async (req, res) => {
    const { id } = req.body;
    console.log("id", id);
    const foundMessage = await Message.findById(id);
    console.log("foundMessage", foundMessage);
    if (foundMessage) foundMessage.message.state = "denied";
    await foundMessage.save();
    res.json(foundMessage);
});
app.patch("/denyProposal", async (req, res) => {
    const { id } = req.body;
    console.log("id", id);
    const foundMessage = await Message.findById(id);
    console.log("foundMessage", foundMessage);
    if (foundMessage) foundMessage.message.state = "denied";
    await foundMessage.save();
    res.json(foundMessage);
});
app.patch("/denyBudgetEdit", async (req, res) => {
    const { id } = req.body;
    console.log("id", id);
    const foundMessage = await Message.findById(id);
    console.log("foundMessage", foundMessage);
    if (foundMessage) foundMessage.message.state = "denied";
    await foundMessage.save();
    res.json(foundMessage);
});
app.patch("/editLocation", async (req, res) => {
    let message = await Message.findById(req.body.id);
    if (message) {
        message.message.location = req.body.location;
    }
    await message.save();
    return res.json(message);
});
app.get("/fetchWilayaData", middlewars.isLoginIn, async (req, res) => {
    const user =
        req.session.user_type == "Client"
            ? await Client.findById(req.session.user_id)
            : await Professionnel.findById(req.session.user_id);
    if (user) {
        return res.json({ wilaya: user.wilaya });
    }
});
app.patch("/closeJob", async (req, res) => {
    const message = await Message.findById(req.body.id);
    const job = await Job.findById(req.body.jobId);
    message.message.state = "closed";
    job.clientFeedback = req.body.description;
    job.clientRating = req.body.rating;
    job.closed = true;
    const user = await Professionnel.findById(job.idProfessionnel).populate(
        "profile.jobs"
    );

    const jobclosed = user.profile.jobs.filter((j) => j.closed);

    console.log("jobclosed", jobclosed);
    let numJobClosed = 0;
    for (let i = 0; i < jobclosed.length; i++) {
        numJobClosed++;
    }
    user.profile.rating =
        (numJobClosed * user.profile.rating + req.body.rating) /
        (numJobClosed + 1);
    // console.log("user",user);
    console.log("numJobClosed", numJobClosed);
    // console.log("jobclosed", jobclosed);
    // console.log("new professionnel rating", user.profile.rate);
    // console.log(message);
    // console.log(job);
    await message.save();
    await job.save();
    await user.save();
    res.json(message);
});
app.patch("/cancelJob", async (req, res) => {
    const message = await Message.findById(req.body.id);
    const job = await Job.findById(req.body.jobId);
    message.message.state = "canceled";
    const user = await Professionnel.findById(job.idProfessionnel);
    user.profile.numJobCanceled++;
    user.profile.jobs = user.profile.jobs.filter((j) => j != req.body.jobId);
    console.log("user.profile.numJobCanceled", user.profile.numJobCanceled);
    console.log("job.idProfessionnel", job.idProfessionnel);
    job.idProfessionnel = null;
    await message.save();
    await job.save();
    await user.save();
    res.json(message);
});
app.patch("/leaveFeedback", async (req, res) => {
    const { jobId, id, description, rating } = req.body;
    const job = await Job.findById(jobId);
    const message = await Message.findById(id);
    job.professionnelFeedback = description;
    job.professionnelRating = rating;
    message.message.state = "feedback";
    const client = await Client.findById(job.idClient).populate("jobs");
    const numberJobClose = client.jobs.filter((j) => j.closed).length;

    client.rating =
        (client.rating * (numberJobClose - 1) + rating) / numberJobClose;
    await message.save();
    await job.save();
    await client.save();
    res.json({ job, client });
});
app.get("/expertProposalPage/:id", async (req, res) => {
    const { id } = req.params;

    const message = await Message.findById(id).populate("message.jobId").lean();
    if (!message || message == {}) {
        return res.json({ redirectUrl: "/dashboard" });
    }
    console.log("okkkkk");
    console.log("Message---------", message);
    return res.json({
        ...message.message.jobId,
        budgetProposal: message.message.budget,
        coverLetter: message.message.coverLetter,
    });
});
app.post("/addMessage", async (req, res) => {
    let recipientId = req.body.id;
    const senderId = req.session.user_id;
    const senderType = req.session.user_type;
    const jobId =
        req.body.message && req.body.message.jobId
            ? req.body.message.jobId
            : null;
    let job;
    console.log("add proposal Message", req.body);
    if (jobId) {
        job = await Job.findById(jobId);
        if (!recipientId && req.body.message.type == "proposal") {
            recipientId = job.idClient;
        }
    }
    const message = new Message({
        senderId: senderId,
        recipientId: recipientId,
        senderType: senderType,
        recipientType:
            senderType == "Professionnel" ? "Client" : "Professionnel",
        message: req.body.message,
    });
    const saveMessage = await message.save();
    const cli =
        senderType == "Client"
            ? await Client.findById(senderId)
            : await Client.findById(recipientId);
    const pro =
        senderType == "Professionnel"
            ? await Professionnel.findById(senderId)
            : await Professionnel.findById(recipientId);
    let existJob = false;
    let exist = false;
    cli.contacts.map((c) => {
        if (
            c.contactId.toString() == senderId.toString() ||
            c.contactId.toString() == recipientId.toString()
        ) {
            if (jobId) {
                c.messages.map((m) => {
                    if (m.job == jobId) {
                        m.message.push(saveMessage._id);
                        existJob = true;
                    }
                });
                if (!existJob) {
                    c.messages.push({
                        job: jobId,
                        message: [saveMessage._id],
                    });
                }
            } else
                c.messages[c.messages.length - 1].message.push(saveMessage._id);
            exist = true;
        }
    });
    if (!exist) {
        const contactId = senderType == "Client" ? recipientId : senderId;
        cli.contacts.push({
            contactId: contactId,
            messages: [
                {
                    job: jobId,
                    message: [saveMessage._id],
                },
            ],
        });
    }
    existJob = false;
    exist = false;
    pro.contacts.map((c) => {
        console.log("je suis la");
        console.log("c.contactId", c.contactId, senderId, recipientId);
        console.log(
            c.contactId.toString() == senderId.toString() ||
                c.contactId.toString() == recipientId.toString()
        );
        if (
            c.contactId.toString() == senderId.toString() ||
            c.contactId.toString() == recipientId.toString()
        ) {
            if (jobId) {
                c.messages.map((m) => {
                    if (m.job == jobId) {
                        m.message.push(saveMessage._id);
                        existJob = true;
                    }
                });
                if (!existJob) {
                    c.messages.push({
                        job: jobId,
                        message: [saveMessage._id],
                    });
                }
            } else {
                c.messages[c.messages.length - 1].message.push(saveMessage._id);
            }
            exist = true;
        }
    });
    console.log("exist", exist);
    if (!exist) {
        const contactId =
            senderType == "Professionnel" ? recipientId : senderId;
        pro.contacts.push({
            contactId: contactId,
            messages: [
                {
                    job: jobId,
                    message: [saveMessage._id],
                },
            ],
        });
    }
    if (
        req.body.message.type == "proposal" &&
        !job.proposals.includes(senderId)
    )
        job.proposals.push(senderId);
    else if (
        req.body.message.type == "invitation" &&
        !job.proposals.includes(recipientId)
    )
        job.hires.push(recipientId);
    await cli.save();
    await pro.save();
    if (jobId) await job.save();
    console.log("saveMessage", saveMessage);
    console.log("Professionnel", pro);
    console.log("Client", cli);
    console.log("Job", job);
    res.json(saveMessage);
});

app.post("/addMessageFile", upload.array("files"), async (req, res) => {
    recipientId = req.body.id;
    senderId = req.session.user_id;
    senderType = req.session.user_type;
    const jobId =
        req.body.message && req.body.message.jobId
            ? req.body.message.jobId
            : null;
    let job;
    if (jobId) {
        job = await Job.findById(jobId);
        if (!recipientId && req.body.message.type == "proposal") {
            recipientId = job.idClient;
        }
    }
    const files = req.files;
    files.map(async (m) => {
        let message = new Message({
            senderId: req.session.user_id,
            recipientId: recipientId,
            senderType: senderType,
            recipientType:
                senderType == "Professionnel" ? "Client" : "Professionnel",
            message: { content: "Sent an image" },
        });
        message.message.type = req.body.type;
        message.message.url = m.path;
        message.message.filename = m.filename;
        const saveMessage = await message.save();

        const cli =
            senderType == "Client"
                ? await Client.findById(senderId)
                : await Client.findById(recipientId);
        const pro =
            senderType == "Professionnel"
                ? await Professionnel.findById(senderId)
                : await Professionnel.findById(recipientId);
        let exist = false;
        cli.contacts.map((c) => {
            if (c.contactId == senderId || c.contactId == recipientId) {
                c.messages[c.messages.length - 1].message.push(saveMessage._id);
                exist = true;
            }
        });
        if (!exist) {
            const contactId = senderType == "Client" ? recipientId : senderId;
            cli.contacts.push({
                contactId: contactId,
                messages: [
                    {
                        job: jobId,
                        message: [saveMessage._id],
                    },
                ],
            });
        }
        exist = false;
        pro.contacts.map((c) => {
            if (c.contactId == senderId || c.contactId == recipientId) {
                c.messages[c.messages.length - 1].message.push(saveMessage._id);
                exist = true;
            }
        });
        if (!exist) {
            const contactId =
                senderType == "Professionnel" ? recipientId : senderId;
            pro.contacts.push({
                contactId: contactId,
                messages: [
                    {
                        job: jobId,
                        message: [saveMessage._id],
                    },
                ],
            });
        }

        // user.contacts.map((c)=>{
        //     if(c.contactId==message.senderId||c.contactId==message.recipientId){
        //         c.messages.push(saveMessage._id);
        //     }
        // });
        const saveCli = await cli.save();

        const savePro = await pro.save();

        res.json(message);
    });
});

const { Server } = require("socket.io");
const http = require("http");

//const { JsonWebTokenError } = require('jsonwebtoken');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "POST"], // Allow only specific HTTP methods
        credentials: true, // Allow credentials to be sent with requests
    },
});
app.use((err, req, res, next) => {
    //error hundler middlware
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

// wss = new WebSocket.WebSocketServer({ server });

let onlineUsers = [];
io.on("connection", (socket) => {
    console.log("new connection", socket.id);
    socket.on("addNewUser", () => {
        !onlineUsers.some((user) => user.userId === user_id) &&
            user_id &&
            onlineUsers.push({
                user_id: user_id,
                user_type: user_type,
                socketId: socket.id,
            });
        console.log(onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });
    //add message
    socket.on("sendMessage", async (message) => {
        if (
            !message.id &&
            message.message.type == "proposal" &&
            message.message.jobId
        ) {
            const job = await Job.findById(message.message.jobId);
            message.id = job.idClient;
        }
        if (
            message.message.type == "proposal" ||
            message.message.type == "invitation"
        ) {
            const job = await Job.findById(message.message.jobId).lean();
            message.message.jobId = job._id;
            delete job._id;
            delete job.hites;
            delete job.proposals;
            if (job.images) job.images = job.images.map((i) => i.url);
            message.message = { ...message.message, ...job };
        }
        const user = onlineUsers.find(
            (user) => user.user_id.toString() == message.id.toString()
        );
        if (user) {
            message = {
                ...message,
                id: user.user_id,
                isOwnMessage: false,
                senderId: user_id,
                timestamp: Date.now(),
            };
            io.to(user.socketId).emit("getMessage", message);
        }
    });
    socket.on("updateMessage", (message) => {
        console.log("updatedMessage", message);

        const user = onlineUsers.find((user) => user.user_id == message.userId);
        console.log("useruseruser", user);
        if (user) {
            console.log("Emitting getUpdateMessage event");
            io.to(user.socketId).emit("getUpdateMessage", {
                ...message,
                userId: user_id,
            });
        }
    });
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});

server.listen(3000, () => {
    console.log("Server is running at localhost:3000");
});

module.exports = app;
