const { session } = require("passport");
const Professionnel = require("../models/professionnel");
const Job = require("../models/job");
const Client = require("../models/client");

exports.requireLoginClient = (req, res, next) => {
    try {
        if (req.session && req.session.user_id && req.session.user_type === 'Client') {
            return next();
        } else {
            if (req.session && req.session.user_type === 'Professionnel') {
                // Si l'utilisateur est un professionnel mais tente d'accéder à une route client, rediriger vers la page d'accueil
                return res.json({ redirectUrl: '/dashboard' });
            } else {
                // Si aucun utilisateur n'est connecté ou si l'utilisateur n'est pas un client, rediriger vers la page de connexion
                return res.json({ redirectUrl: '/login' });
            }
        }
    } catch (error) {
        console.error('Erreur dans le middleware requireLoginClient:', error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};

exports.requireLoginProfessionnel = (req, res, next) => {
    try {
        if (req.session && req.session.user_id && req.session.user_type === 'Professionnel') {
            return next();
        } else {
            if (req.session && req.session.user_type === 'Client') {
                // Si l'utilisateur est un client mais tente d'accéder à une route professionnel, rediriger vers la page d'accueil
                return res.json({ redirectUrl: '/dashboard' });
            } else {
                // Si aucun utilisateur n'est connecté ou si l'utilisateur n'est pas un professionnel, rediriger vers la page de connexion
                return res.json({ redirectUrl: '/login' });
            }
        }
    } catch (error) {
        console.error('Erreur dans le middleware requireLoginProfessionnel:', error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};


exports.requireLogin = (req, res, next) => {
    try {
        // Vérifier si un utilisateur est connecté
        if (req.session && req.session.user_id) {
            // Si un utilisateur est connecté, rediriger vers le tableau de bord
            return res.json({ redirectUrl: '/dashboard' });
            //return res.redirect('/dashboard');
        }

        // Si aucun utilisateur n'est connecté, passer au middleware suivant
        return next();
    } catch (error) {
        // Gérer les erreurs de manière appropriée
        console.error('Erreur dans le middleware requireLogin:', error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};

exports.verifyProfessionnelProfil = async (req, res, next) => {
    try {
        if (req.session.user_type === 'Professionnel') {
            // Vérifier si l'utilisateur est un professionnel
            const pro = await Professionnel.findById(req.session.user_id);

            if (!pro) {
                // S'il n'y a pas de professionnel correspondant à cet utilisateur, gérer l'erreur
                return res.status(404).json({ error: "Profil professionnel introuvable." });
            }

            if (!pro.profile.added) {
                // Si le profil n'a pas été ajouté, rediriger vers la page pour ajouter le profil professionnel
                return res.json({ redirectUrl: '/welcomePro' });
            }
        }

        // Si l'utilisateur n'est pas un professionnel ou si le profil a été ajouté, passer au middleware suivant
        return next();
    } catch (error) {
        // Gérer les erreurs de manière appropriée
        console.error('Erreur dans le middleware verifyProfessionnelProfil:', error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};
exports.isLoginIn = async (req, res, next) => {
    try {
        // Vérifier si un utilisateur est connecté
        if (req.session && req.session.user_id) {
            // Si un utilisateur est connecté, passer au middleware suivant
            if (req.session.user_type == 'Client') {
                const user = await Client.findById(req.session.user_id);
                if (!user) return res.status(400).json({ error: 'Cannot find User' });
                if (!user.verified) return res.json({ redirectUrl: '/verifyEmail' });
            } else if (req.session.user_type == 'Professionnel') {
                const user = await Professionnel.findById(req.session.user_id);
                if (!user) return res.status(400).json({ error: 'Cannot find User' });
                if (!user.verified) return res.json({ redirectUrl: '/verifyEmail' });
            }else return res.status(400).json({ error: 'Cannot find User' });
            return next();
        } else {
            // Si aucun utilisateur n'est connecté, rediriger vers la page de connexion
            return res.json({ redirectUrl: '/login' });
        }
    } catch (error) {
        // Gérer les erreurs de manière appropriée
        console.error('Erreur dans le middleware isLoginIn:', error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};

exports.isAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Rechercher le job dans la base de données
        const job = await Job.findById(id);

        // Vérifier si le job existe
        if (!job) {
            return res.status(404).json({ error: "Job introuvable." });
        }

        // Vérifier si l'utilisateur est l'auteur du job
        if (req.session.user_id === job.idClient) {
            // Si l'utilisateur est l'auteur du job, passer au middleware suivant
            return next();
        } else {
            // Sinon, renvoyer une erreur d'accès non autorisé
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier ce job." });
        }
    } catch (error) {
        // Gérer les erreurs de manière appropriée
        console.error('Erreur dans le middleware isAuthor:', error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};

exports.isAccessible = async (req, res, next) => {
    try {
        const userId = req.session.user_id; // Récupérer l'ID de l'utilisateur depuis la session

        // Vérifier si l'utilisateur est connecté
        if (!userId) {
            return res.status(401).json({ message: 'Accès non autorisé. Veuillez vous connecter.' });
        }

        // Récupérer l'ID de l'utilisateur à partir de la requête (par exemple, s'il essaie de modifier un profil)
        const requestedUserId = req.params.id; // À adapter en fonction de votre route

        // Vérifier si l'utilisateur essaye de modifier son propre profil
        if (userId !== requestedUserId) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce profil." });
        }

        // Si l'utilisateur est authentifié et tente de modifier son propre profil, passer au prochain middleware
        next();
    } catch (error) {
        console.error('Erreur dans le middleware isAccessible :', error);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

//isLoginIn
//isAcecssible //hadi les request t3 professionnel w client
//isAuthor hadi t3 les request t3 jobs