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
                .populate("profile.savedJobs")
                .lean();
            console.log("pro", pro);
            let jobs = pro.profile.savedJobs;
            if (jobs)
                jobs = jobs.map((j) => ({
                    ...j,
                    id: j._id,
                    heart: true,
                    isExpert: true,
                    images: j.images.map((i) => i.url),
                }));
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
app.get("/jobPostPage/:id", async (req, res) => {
    const { id } = req.params;
    let foundJob = await Job.findById(id);
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

        res.json({ ...job._doc, apply });
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
    if (job) {
        console.log(job._id);
        res.render("importJob", { job });
    } else console.log("Job n'exist pas");
});

/* app.get('/job/createJob', async (req, res) => {
    res.send("creation job");
}) */

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
                const heart = savedJobIds.includes(j._id.toString());
                return { ...j.toObject(), heart }; // Convert toObject() if p is a mongoose document
            })
        );
    else
        jobs = await Promise.all(
            jobs.map(async (j) => {
                const heart = savedJobIds.includes(j._id.toString());
                return { ...j.toObject(), heart }; // Convert toObject() if p is a mongoose document
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
        if (!category && !subCategory && !wilaya && !city) {
            return res.status(400).json({
                error: "Au moins un paramètre de recherche est requis.",
            });
        }

        // Construire la recherche en fonction des paramètres fournis
        const searchCriteria = {};
        if (category) searchCriteria.category = category;
        if (subCategory) searchCriteria.subCategory = subCategory;
        if (wilaya) searchCriteria.wilaya = wilaya;
        if (city) searchCriteria.city = city;
        console.log("searchCriteria", searchCriteria);
        // Effectuer la recherche dans la base de données
        let jobs = await Job.find(searchCriteria);
        console.log(jobs);
        if (req.session.user_type == "Professionnel") {
            const pro = await Professionnel.findById(req.session.user_id);
            const savedJobIds = pro.profile.savedJobs.map((j) => j.toString()); // Assuming _id is an ObjectId
            if (savedJobIds)
                jobs = await Promise.all(
                    jobs.map(async (j) => {
                        const heart = savedJobIds.includes(j._id.toString());
                        return { ...j.toObject(), heart, isExpert: true }; // Convert toObject() if p is a mongoose document
                    })
                );
            else
                jobs = await Promise.all(
                    jobs.map(async (j) => {
                        const heart = savedJobIds.includes(j._id.toString());
                        return { ...j.toObject(), heart, isExpert: true }; // Convert toObject() if p is a mongoose document
                    })
                );
        }
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
    const pro = await Professionnel.findById(id);
    console.log("professionnel", pro);
    res.json(pro);
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
        let professionnels = await Professionnel.find(searchCriteria);
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
app.get("/SubmitProposal/:id", async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.json(job);
});
app.patch(
    "/changeProposalBudget",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const { id, budget } = req.body;
        const message = await Message.findById(id);
        if (message) {
            message.message.budget = budget;
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
            message.message.state = "withrawed";
        }
        const saveMessage = await message.save();
        res.json(saveMessage);
    }
);
app.get(
    "/expertProposalPage/:id",
    middlewars.requireLoginProfessionnel,
    async (req, res) => {
        const { id } = req.params;

        const message = await Message.findById(id)
            .populate("message.jobId")
            .lean();
        if (message && message.senderId != req.session.user_id)
            res.json({ redirectUrl: "/dashboard" });
        console.log("okkkkk");
        console.log("Message---------", message);
        res.json({
            ...message.message.jobId,
            budgetProposal: message.message.budget,
            coverLetter: message.message.coverLetter,
        });
    }
);
app.post("/addMessage", async (req, res) => {
    let recipientId = req.body.id;
    const senderId = req.session.user_id;
    const senderType = req.session.user_type;
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
        if (c.contactId == senderId || c.contactId == recipientId) {
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
        if (c.contactId == senderId || c.contactId == recipientId) {
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

/* app.post("/addMessage", async (req, res) => {
    try {
        // const cli=await Client.findById(req.body.recipientId);
        // const pro=await Professionnel.findById(req.body.senderId);
        recipientId = req.body.id;
        senderId = req.session.user_id;
        senderType = req.session.user_type;
        const jobId = req.body.message.job;
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
        await cli.save();
        await pro.save();
        res.json(saveMessage);
    } catch (e) {
        console.error(e);
    }
}); */
const socketIo = require("socket.io");
const http = require("http");
//const { JsonWebTokenError } = require('jsonwebtoken');
const server = http.createServer(app);
const io = socketIo(server, {
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
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.user_id == message.id);
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
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});
// wss.on('connection', (connection) => {

//     if (user_id) {
//         connection.user_id = user_id;
//         connection.user_type = user_type;
//     }

//     // Envoyer les informations de tous les clients connectés à tous les clients
//     const clientInfo = { online: [...wss.clients].map(c => ({ user_id: c.user_id, user_type: c.user_type })) };
//     [...wss.clients].forEach(client =>
//         client.send(JSON.stringify(clientInfo))
//     );
//     /* connection.isAlive = true;

//     connection.timer = setInterval(() => {
//         connection.ping();
//         connection.deathTimer = setTimeout(() => {
//             connection.isAlive = false;
//             clearInterval(connection.timer);
//             connection.terminate();
//             //notifyAboutOnlinePeople();
//             console.log('dead');
//         }, 1000);
//     }, 5000);

//     connection.on('pong', () => {
//         clearTimeout(connection.deathTimer);
//     }) */
//     connection.on('message', async (message) => {
//         const messageData = JSON.parse(message.toString());
//         console.log(messageData);

//         //console.log("wsss", ...wss.clients);
//         const recipientClient = [...wss.clients].find(c => c.user_id === messageData.recipientId);

//         if (recipientClient) {
//             await recipientClient.send(JSON.stringify(messageData));
//         } else {
//             console.log(`Aucun client trouvé avec l'ID du destinataire ${messageData.recipientId}`);
//         }
//         connection.on('error', (error) => {
//             console.error('WebSocket connection error:', error);
//         });
//         //const recipientClient = [...wss.clients].find(c => c.user_id === messageData.recipientId);

//         /* if (recipientClient) {
//             recipientClient.send(JSON.stringify(messageData));
//         } else {
//             console.log(`Aucun client trouvé avec l'ID du destinataire ${messageData.recipientId}`);
//         } */

//         //console.log("le resulta",resultat);

//         //console.log("clientInfo", clientInfo);
//         /* .forEach(c => c.send(JSON.stringify({
//           _id:messageData._id,
//         }))); */
//         /* const {id,message}=messageData;
//         if(id && message){
//             console.log('created message');
//             [...wss.clients]
//               .filter(c => c.userId === id)
//               .forEach(c => c.send(JSON.stringify({
//                 id: id, // Assurez-vous d'avoir une variable id définie quelque part
//                 message: message,
//                 isOwnMessage: true,
//               }
//             )
//         )
//     );
//       } */
//     })

// });

server.listen(3000, () => {
    console.log("Server is running at localhost:3000");
});

module.exports = app;
