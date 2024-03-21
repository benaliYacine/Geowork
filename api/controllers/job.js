const Job = require('../models/job');
const Client = require("../models/client");
const Professionnel = require("../models/professionnel");
const { cloudinary } = require('../cloudinary');


exports.addPhoto = async (req, res) => {
    try {
        if (req.file) {
            const { id } = req.params;
            const dataImage = { url: req.file.path, filename: req.file.filename };
            //console.log('Received file:', dataImage);
            const job = await Job.findById(id);
            /* for (image of req.file) { //importation plusieur image
                job.photos.push({ url: image.path, filename: image.filename });
            } */
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
        // Crée un nouvel emploi en utilisant les données du corps de la requête
        const job = new Job(req.body);
        // Recherche le client associé à l'ID fourni dans le corps de la requête
        const client = await Client.findById(req.body.idClient);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Enregistre l'emploi dans la base de données
        const savedJob = await job.save();

        // Ajoute l'emploi à la liste des emplois du client
        client.jobs.push(savedJob._id);

        // Enregistre les modifications apportées au client dans la base de données
        await client.save();

        // Renvoie la réponse avec l'emploi créé
        return res.status(201).json(savedJob);
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
        const { id } = req.body;
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(updatedJob);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedJob = await Job.findByIdAndDelete(id);
        return res.status(201).json(deletedJob);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


exports.chercheJob = async (req, res) => {
    try {
        const { category, wilaya, ville } = req.query;
        let query = {};

        // Construit la requête en fonction des paramètres fournis
        if (category && category !== "ALL") {
            query.category = category;
        }
        if (wilaya) {
            query.wilaya = wilaya;
        }
        if (ville) {
            query.ville = ville;
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

