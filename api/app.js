
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
const WebSocket = require('ws');

let user_id;
let user_type;



app.use(methodOverride('_method'));

//const uploadjobs = multer({ storageJobs });



mongoose.connect('mongodb://127.0.0.1:27017/Geolans')//criation de la base de donne ismha shopApp
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

app.use((req, res, next) => {

    user_id = req.session.user_id;
    user_type = req.session.user_type;
    console.log(req.session.user_id);
    next();
});



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
app.use(express.urlencoded({ limit: '10 mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
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
app.get('/userId', (req, res) => {
    res.json({ user_id: req.session.user_id });
})
app.get('/logout', (req, res) => {
    // Détruire la session côté serveur
    res.render('logout');
});
app.get('/profileSlides', middlewars.requireLoginProfessionnel, async (req, res) => {
    const pro = await Professionnel.findById(req.session.user_id);
    if (pro.profile.added)
        return res.json({ redirectUrl: '/dashboard' });
    res.json("");
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
                await req.session.save();
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
    res.json("");
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

app.get('/InputWilayaCity', middlewars.requireLogin, (req, res) => {
    res.json("");
});
app.get('/chat', middlewars.isLoginIn, (req, res) => {
    res.json("");
});

app.get('/welcomePro', middlewars.requireLoginProfessionnel, async (req, res) => {
    try {
        const pro = await Professionnel.findById(req.session.user_id);
        if (!pro.profile.added)
            res.json(pro); // Sending JSON response using `res` object
        else req.json({ redirectUrl: '/dashboard' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Sending error response if there's an issue
    }
});


app.get('/job/:id', async (req, res) => {
    const { id } = req.params;
    const foundJob = await Job.findById(id);
    if (foundJob)
        res.json(foundJob);
    else
        res.json("Job n'exist pas");
})
app.get('/jobSlides', middlewars.requireLoginClient, async (req, res) => {
    res.json();
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
const Message = require("./models/message");
app.post('/contact', middlewars.isLoginIn, async (req, res) => {
    let user;
    console.log(req.body.people);
    if (req.session.user_type == 'Client') {
        user = await Client.findById(req.session.user_id).populate('contacts.contactId').populate('contacts.messages');

    } else if (req.session.user_type == 'Professionnel') {
        user = await Professionnel.findById(req.session.user_id).populate('contacts.contactId').populate('contacts.messages');
    }
    console.log(user);
    let array = user.contacts.map((c) => {

        const lastMessage = c.messages.length > 0 ? c.messages[c.messages.length - 1].message.content : '';
        const lastMessageTime = c.messages.length > 0 ? c.messages[c.messages.length - 1].time : '';
        console.log(c._id);
        if (!c.contactId) {
            c.contactId = {};
        }
        c.contactId.id = c._id;
        c.contactId.message = lastMessage;
        c.contactId.time = lastMessageTime;

        console.log(lastMessage);
        return c.contactId;
    })
    console.log(array);
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
    console.log(array);
    array = array.map((c) => {
        const avatarUrl = req.session.user_type == 'Professionnel' ? c.photoProfile.url : c.profile.photoProfile.url;
        let time;
        const currentTime = new Date(); // Current date and time
        const messageTime = new Date(c.time); // Time of the message

        // Check if the message is from the current day
        if (currentTime.toDateString() === messageTime.toDateString()) {
            // Format time as "HH:mm AM/PM"
            time = `${messageTime.getHours()}:${messageTime.getMinutes()} `;/* ${messageTime.getHours() >= 12 ? 'PM' : 'AM' }*/
        } else {
            // Format time as "Day Month HH:mm AM/PM" if not from current day
            const dayOfMonth = messageTime.getDate();
            const month = messageTime.toLocaleString('default', { month: 'long' });
            time = `${dayOfMonth} ${month}`;
        }
        const isActive = req.body.people.some(p => p.user_id == c._id);
        console.log('fdaskjruigmflksadmfnuif', c._id); //hada id de type objectId w ki na7i _ ywali string
        return { id: c._id, name: `${c.name.first} ${c.name.last}`, message: c.message, avatarUrl: avatarUrl, isActive: isActive, time: time }
    })
    console.log(array);
    res.json(array);


});
app.get('/messages/:id', middlewars.isLoginIn, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Requested ID:", id);


        if (id == 1) {
            return res.json("");
        }

        let user;
        console.log('type user', req.session.user_type);
        // Determine user type from session
        if (req.session.user_type === 'Client') {
            user = await Professionnel.findById(id).populate('contacts.messages');
        } else if (req.session.user_type === 'Professionnel') {
            user = await Client.findById(id).populate('contacts.messages');
        }
        console.log("User:", user);
        if (!user) {
            return res.json({ redirectUrl: "/messages/1" });
        } else {
            console.log("User:", user);
            const newUser = { ...user._doc,user_id:req.session.user_id };
            console.log(newUser);
            res.json(newUser);
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/addMessage', async (req, res) => {
    try {
        // const cli=await Client.findById(req.body.recipientId);
        // const pro=await Professionnel.findById(req.body.senderId);
        recipientId = req.body.id;
        senderId = req.session.user_id;
        senderType = req.session.user_type;
        const message = new Message({
            senderId: req.session.user_id,
            recipientId: recipientId,
            senderType: senderType,
            recipientType: senderType == 'Professionnel' ? 'Client' : 'Professionnel',
            message: req.body.message,
        });
        console.log("newMessage", message);
        const saveMessage = await message.save();
        const cli = senderType == 'Client' ? await Client.findById(senderId) : await Client.findById(recipientId);
        const pro = senderType == 'Professionnel' ? await Professionnel.findById(senderId) : await Professionnel.findById(recipientId);
        console.log(cli);
        console.log(pro);
        let exist = false;
        cli.contacts.map((c) => {
            if (c.contactId == senderId || c.contactId == recipientId) {
                c.messages.push(saveMessage._id);
                exist = true
            }
        });
        if (!exist) {
            const contactId = senderType == 'Client' ? recipientId : senderId;
            cli.contacts.push({ contactId: contactId, messages: [saveMessage._id] })
        }
        exist = false;
        pro.contacts.map((c) => {
            if (c.contactId == senderId || c.contactId == recipientId) {
                c.messages.push(saveMessage._id);
                exist = true
            }
        });
        if (!exist) {
            const contactId = senderType == 'Professionnel' ? recipientId : senderId
            pro.contacts.push({ contactId: contactId, messages: [saveMessage._id] })
        }

        // user.contacts.map((c)=>{
        //     if(c.contactId==message.senderId||c.contactId==message.recipientId){
        //         c.messages.push(saveMessage._id);
        //     }
        // });
        await cli.save();
        await pro.save();
        res.json('message sended successfuly');
    } catch (e) {
        console.error(e);
    }
});

const server = app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});

app.use((err, req, res, next) => { //error hundler middlware
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});

const wss = new WebSocket.WebSocketServer({ server });



wss.on('connection', (connection) => {


    if (user_id) {
        connection.user_id = user_id;
        connection.user_type = user_type;
    }

    // Envoyer les informations de tous les clients connectés à tous les clients
    const clientInfo = { online: [...wss.clients].map(c => ({ user_id: c.user_id, user_type: c.user_type })) };
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify(clientInfo));
    });
    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        //notifyAboutOnlinePeople();
        console.log('dead');
      }, 1000);
    }, 5000);
  
    connection.on('pong', () => {
      clearTimeout(connection.deathTimer);
    })
});






module.exports = app;
