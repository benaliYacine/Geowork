const Job = require('../models/job');
const Client = require("../models/client");
const Professionnel = require("../models/professionnel");
const { cloudinary } = require('../cloudinary');


/* exports.addPhoto = async (req, res) => {
    try {
        if (req.file) {
            const { id } = req.params;
            const dataImage = { url: req.file.path, filename: req.file.filename };
            //console.log('Received file:', dataImage);
            const job = await Job.findById(id);
            /* for (image of req.file) { //importation plusieur image
                job.photos.push({ url: image.path, filename: image.filename });
            } 
            job.photos.push(dataImage);
            await job.save();
            return res.json(job);
        } else {
            console.error('No file uploaded');
            return res.status(400).json({ error: "No file uploaded" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}; */
exports.addImage = async (req, res) => {
    try {
        console.log("req.file:", req.file);
        if (req.file) {
            const { id } = req.params;
            const dataImage = { url: req.file.path, filename: req.file.filename };

            return res.json(dataImage.url);
        } else {
            console.error('No file uploaded');
            return res.status(400).json({ error: "No file uploaded" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { idP } = req.body;
        const job = await Job.findById(id);
        if (idP) {
            //const foundPhoto = job.photos.find(e => e._id == idP);
            //console.log(foundPhoto);
            job.photos = job.photos.filter(c => c._id != idP);
            await cloudinary.uploader.destroy(req.body.filename);
            await job.save(); // Move inside the if block
        }
        return res.json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//delete plusieur photos yamchi m3a deletephotos.ejs
/* exports.deletePhotos = async (req, res) => {
    try {
        const { id } = req.params;
        const { photoIds } = req.body; // Assuming photoIds is an array of photo IDs

        const job = await Job.findById(id);
        if (photoIds && photoIds.length > 0) {
            for (const idP of photoIds) {
                job.photos = job.photos.filter(c => c._id != idP);
                await cloudinary.uploader.destroy(req.body[idP].filename);
            }
            await job.save(); // Move inside the if block if needed
        }

        return res.json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
} */



exports.createJob = async (req, res) => {
    try {
        // Crée un nouvel emploi en utilisant les données du corps de la requête\
        delete req.body.images;
        req.body.idClient = req.session.user_id;
        console.log("body:", req.body);
        console.log("files:", req.files);
        const imageDataArray = req.files.map(fileData => ({
            url: fileData.path,
            filename: fileData.filename
        }));
        const job = new Job(req.body);
        imageDataArray.forEach(element => {
            job.images.push(element);
        });
        // Recherche le client associé à l'ID fourni dans le corps de la requête
        console.log("session", req.session.user_id);
        const client = await Client.findById(req.session.user_id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        //console.log("je suis la");
        // Enregistre l'emploi dans la base de données

        const savedJob = await job.save();



        // Ajoute l'emploi à la liste des emplois du client
        client.jobs.push(savedJob._id);

        // Enregistre les modifications apportées au client dans la base de données
        await client.save();
        console.log(savedJob);
        // Renvoie la réponse avec l'emploi créé
        return res.status(201).json({ ...savedJob, redirectUrl: `/jobPostPage/${savedJob._id}` });
    } catch (err) {
        // En cas d'erreur, renvoie une réponse avec le message d'erreur
        return res.status(400).json({ message: err.message });
    }
};


exports.addProfessionnelToJob = async (req, res) => {
    try {
        const { id, idProfessionnel } = req.body;

        // Input validation
        if (!id || !idProfessionnel) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedJob = await Job.findByIdAndUpdate(id, { idProfessionnel: idProfessionnel }, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        const professionnel = await Professionnel.findById(idProfessionnel);

        if (!professionnel) {
            return res.status(404).json({ message: "Professionnel not found" });
        }

        professionnel.profile.jobs.push(updatedJob._id); // Assuming jobs is an array of job IDs in Professionnel model
        await professionnel.save();

        return res.status(201).json(updatedJob);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.changeJob = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { id } = req.params;
        console.log("images", req.body.images)
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(updatedJob);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(id);
        console.log("deleted", deletedJob);
        await Promise.all(deletedJob.images.map(async (c) => {
            await cloudinary.uploader.destroy(c.filename);
        }));

        if (deletedJob.idProfessionnel) {
            const pro = await Professionnel.findById(deletedJob.idProfessionnel);
            pro.profile.jobs = pro.profile.jobs.filter((j) => (j.toString() !== deletedJob._id.toString()));
            await pro.save();
            console.log("pro");
        }
        const cli = await Client.findById(deletedJob.idClient);
        cli.jobs = cli.jobs.filter((j) => (j.toString() !== deletedJob._id.toString()));
        console.log("cli.jobs", cli.jobs);
        await cli.save();
        console.log("cli", cli);
        return res.status(201).json(deletedJob);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


exports.chercheJob = async (req, res) => {
    try {
        const { category, wilaya, city } = req.query;
        let query = {};

        // Construit la requête en fonction des paramètres fournis
        if (category && category !== "ALL") {
            query.category = category;
        }
        if (wilaya) {
            query.wilaya = wilaya;
        }
        if (city) {
            query.city = city;
        }

        // Recherche les emplois correspondant à la requête
        const foundJobs = await Job.find(query);

        // Renvoie les emplois trouvés dans la réponse
        return res.status(200).json(foundJobs);
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le message d'erreur
        return res.status(400).json({ message: error.message });
    }
};
exports.addFeedback = async (req, res) => {
    try {
        const { id, Feedback } = req.body;
        const Job = await Job.findByIdAndUpdate(id, { Feedback });
        return res.status(201).json(Job);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.addSavedJob = async (req, res) => {
    try {
        const { id } = req.body;
        const job = await Job.findById(id);
        const pro = await Professionnel.findById(req.session.user_id);
        pro.profile.savedJobs.push(job._id);
        const savedPro = await pro.save();
        return res.status(201).json(savedPro);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
exports.suppSavedJob = async (req, res) => {
    try {
        const { id } = req.body;
        const Job = await Job.findById(id);
        const pro = await Professionnel.findById(req.session.user_id);
        pro.profile.savedJobs = pro.profile.savedJobs.filter((j) => (j != job._id_));
        const savedPro = await pro.save();
        return res.status(201).json(savedPro);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

