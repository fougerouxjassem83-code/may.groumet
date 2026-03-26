// On importe le module Express (framework pour créer un serveur web en Node.js)
const express = require('express');

// On crée l'application Express
const app = express();

// On importe mysql2 pour se connecter à la base de données MySQL
const mysql2 = require("mysql2");

// On importe express-myconnection pour gérer facilement les connexions à MySQL
const myConnection = require('express-myconnection');


// ================================
// CONFIG BDD
// ================================

// Options de connexion à la base de données MySQL
const optionConnectionBasedeDonnees = {
    host: "localhost",      // Adresse du serveur MySQL (ici, la même machine)
    user: "root",           // Nom d'utilisateur MySQL
    password: "Thevie@976", // Mot de passe MySQL
    database: "maygourmet", // Nom de la base de données
    port: 3306              // Port MySQL par défaut
};

// On dit à Express d'utiliser express-myconnection avec mysql2
// "pool" permet de réutiliser des connexions plutôt que d'en recréer à chaque fois
app.use(myConnection(mysql2, optionConnectionBasedeDonnees, "pool"));


// ================================
// MIDDLEWARES
// ================================

// Permet de lire les données envoyées par les formulaires (req.body)
app.use(express.urlencoded({ extended: false }));

// Permet de lire les données envoyées en JSON
app.use(express.json());

// Permet de servir les fichiers statiques (CSS, images, JS) depuis le dossier "public"
app.use(express.static('public'));

// On indique à Express où se trouvent les vues EJS
app.set('views', './views');

// On indique qu'on utilise EJS comme moteur de vues
app.set('view engine', 'ejs');


// ================================
// ROUTES ACCUEIL
// ================================

// Route pour afficher la page d'accueil
app.get('/api/acceuil', (req, res) => {
    console.log("Route /api/acceuil");
    // On affiche la vue "acceuil.ejs"
    res.render('acceuil');
});


// ================================
// ROUTES EQUIPE
// ================================

// Route pour afficher la liste de l'équipe
app.get('/api/equipe', (req, res) => {   
    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // On exécute la requête SQL pour récupérer tous les membres de la table "equipe"
        connection.query("SELECT * FROM equipe", [], (err, resultatEquipe) => {
            if (err) return console.log(err);

            // On envoie les résultats à la vue "equipe.ejs"
            // resultatEquipe sera utilisé dans le template EJS
            res.render("equipe", { resultatEquipe });
        });
    });
});


// Route pour MODIFIER un membre de l'équipe
app.put('/api/equipe/:id', (req, res) => {
    // On récupère les données envoyées par le client (formulaire ou AJAX)
    const { nom, prenom, mail, telephone, poste, presentation, date_revrutrment } = req.body;

    // On récupère l'id du membre dans l'URL
    const { id } = req.params;

    // Requête SQL pour mettre à jour le membre
    const sql = `
        UPDATE equipe
        SET nom = ?, prenom = ?, mail = ?, telephone = ?, poste = ?, presentation = ?, date_revrutrment = ?
        WHERE id = ?
    `;

    // Tableau des valeurs à insérer dans la requête SQL
    const values = [nom, prenom, mail, telephone, poste, presentation, date_revrutrment, id];

    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            // On renvoie une réponse JSON en cas d'erreur de connexion
            return res.status(500).json({ success: false, message: "Erreur de connexion BDD" });
        }

        // On exécute la requête SQL UPDATE
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                // On renvoie une réponse JSON en cas d'erreur SQL
                return res.status(500).json({ success: false, message: "Erreur SQL" });
            }

            // Si tout va bien, on renvoie une réponse JSON de succès
            res.json({ success: true });
        });
    });
});


// Route pour SUPPRIMER un membre de l'équipe
app.delete('/api/equipe/:id', (req, res) => {
    // On récupère l'id du membre à supprimer
    const id = req.params.id;

    // Requête SQL pour supprimer le membre
    const sql = "DELETE FROM equipe WHERE id = ?";

    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // On exécute la requête SQL DELETE
        connection.query(sql, [id], (err, result) => {
            if (err) return console.log(err);

            // Après suppression, on redirige vers la liste de l'équipe
            res.status(200).json({ success: true });
        });
    });
});


// Route pour AJOUTER un membre de l'équipe
app.post('/api/equipe', (req, res) => {
    // On récupère les champs du formulaire d'ajout
    const { nomEquipe, prenomEquipe, mailEquipe, telephoneEquipe, adressePostaleEquipe } = req.body;

    // Requête SQL pour insérer un nouveau membre
    const sql = `
        INSERT INTO equipe (nom, prenom, mail, telephone, poste, presentation, date_revrutrment)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // On met des valeurs pour chaque colonne :
    // poste = '' (vide pour l'instant)
    // presentation = adressePostaleEquipe (tu utilises l'adresse comme présentation)
    // date_revrutrment = '' (vide pour l'instant)
    const values = [nomEquipe, prenomEquipe, mailEquipe, telephoneEquipe, '', adressePostaleEquipe, ''];

    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // On exécute la requête SQL INSERT
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.log("ERREUR SQL :", err);
            } else {
                console.log("Membre ajouté");
                // Après l'ajout, on redirige vers la liste de l'équipe
                res.redirect("/api/equipe");
            }
        });
    });
});


// ================================
// ROUTES FOURNISSEUR
// ================================

// Route pour afficher la liste des fournisseurs
app.get('/api/fournisseur', (req, res) => {
    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // Requête SQL pour récupérer tous les fournisseurs
        connection.query("SELECT * FROM fournisseur", [], (err, resultatfournisseur) => {
            if (err) return console.log(err);

            // On affiche la vue "fournisseur.ejs" avec les données
            res.render("fournisseur", { resultatfournisseur });
        });
    });
});

// Route pour AJOUTER un fournisseur
app.post('/api/fournisseur', (req, res) => {
    // On récupère les champs du formulaire fournisseur
    const { nomFournisseur, responsableFournisseur, mailFournisseur, telephoneFournisseur, adresseFournisseur } = req.body;

    // Requête SQL pour insérer un fournisseur
    const sql = "INSERT INTO fournisseur (nom, responsable, tel, mail, adresse_postale) VALUES (?, ?, ?, ?, ?)";

    // Tableau des valeurs pour la requête
    const values = [nomFournisseur, responsableFournisseur, telephoneFournisseur, mailFournisseur, adresseFournisseur];

    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // On exécute la requête d'insertion
        connection.query(sql, values, (err, result) => {
            if (err) return console.log(err);

            // Après l'ajout, on redirige vers la liste des fournisseurs
            res.redirect("/api/fournisseur");
        });
    });
});


// ================================
// ROUTES PLATS
// ================================

// Route pour afficher la liste des plats
app.get('/api/plats', (req, res) => {
    
    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // Requête SQL pour récupérer tous les plats
        connection.query("SELECT * FROM plats", [], (err, resultatPlats) => {
            if (err) return console.log(err);

            // On affiche la vue "plats.ejs" avec les données
            res.render("plats", { resultatPlats });
        });
    });
});

// Route pour AJOUTER un plat
app.post('/api/plats', (req, res) => {
    // On récupère les champs du formulaire plats
    const { nomPlat, descriptionPlat, prixPlat, combienPlat, quantitéPlat, ingrédientPlat, fait_maisonPlat } = req.body;

    // Requête SQL pour insérer un plat
    const sql = "INSERT INTO plats (nom, description, prix, combien, quantité, ingrédient, fait_maison) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Tableau des valeurs pour la requête
    const values = [nomPlat, descriptionPlat, prixPlat, combienPlat, quantitéPlat, ingrédientPlat, fait_maisonPlat];

    // On récupère une connexion à la base
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        // On exécute la requête d'insertion
        connection.query(sql, values, (err, result) => {
            if (err) return console.log(err);

            // Après l'ajout, on redirige vers la liste des plats
            res.redirect("/api/plats");
        });
    });
});







// On exporte l'application pour pouvoir la démarrer dans un autre fichier (par exemple server.js)
module.exports = app;