const express = require('express');
const app = express();
const mysql2 = require("mysql2");
const myConnection = require('express-myconnection');

// ================================
// CONFIG BDD
// ================================
const optionConnectionBasedeDonnees =  {
    host: "localhost",
    user: "root",
    password: "Thevie@976",
    database: "maygourmet",
    port: 3306
};
app.use(myConnection(mysql2, optionConnectionBasedeDonnees, "pool"));

// ================================
// MIDDLEWARES
// ================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','ejs');

// ================================
// ROUTES ACCUEIL
// ================================
app.get('/api/acceuil', (req, res) => {
    console.log("Route /api/acceuil");
    res.render('acceuil');
});

// ================================
// ROUTES EQUIPE
// ================================

// Liste équipe
app.get('/api/equipe', (req, res) => {
    req.getConnection((err, connection) => {
        if(err) return console.log(err);
        connection.query("SELECT * FROM equipe", [], (err, resultatEquipe) => {
            if(err) return console.log(err);
            res.render("equipe", { resultatEquipe });
        });
    });
});

// Modifier membre
app.put('/api/equipe/:id', (req, res) => {
    const { nom, prenom, mail, telephone, poste, presentation, date_revrutrment } = req.body;
    const { id } = req.params; // <- récupère l'ID depuis l'URL

    const sql = `
        UPDATE equipe
        SET prenom = ?, nom = ?, mail = ?, telephone = ?, poste = ?, presentation = ?, date_revrutment = ?
        WHERE id = ?
    `;

    // Mettre les valeurs dans le même ordre que les ? de la requête
    const values = [prenom, nom, mail, telephone, poste, presentation, date_revrutrment, id];

    req.getConnection((err, connection) => {
        if(err) return console.log(err);

        console.log(values); // vérifie que toutes les valeurs sont bien définies
        connection.query(sql, values, (err, result) => {
            if(err) return console.log(err);
            res.redirect('/api/equipe');
        });
    });
});// Modifier membre
app.put('/api/equipe/:id', (req, res) => {
    const { nom, prenom, mail, telephone, poste, presentation, date_revrutrment } = req.body;
    const { id } = req.params; // <- récupère l'ID depuis l'URL

    const sql = `
        UPDATE equipe
        SET prenom = ?, nom = ?, mail = ?, telephone = ?, poste = ?, presentation = ?, date_revrutment = ?
        WHERE id = ?
    `;

    // Mettre les valeurs dans le même ordre que les ? de la requête
    const values = [prenom, nom, mail, telephone, poste, presentation, date_revrutrment, id];

    req.getConnection((err, connection) => {
        if(err) return console.log(err);

        console.log(values); // vérifie que toutes les valeurs sont bien définies
        connection.query(sql, values, (err, result) => {
            if(err) return console.log(err);
            res.redirect('/api/equipe');
        });
    });
});

// Supprimer membre
app.delete('/api/equipe/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM equipe WHERE id = ?";

    req.getConnection((err, connection) => {
        if(err) return console.log(err);
        connection.query(sql, [id], (err, result) => {
            if(err) return console.log(err);
            res.status(200).redirect("/api/equipe");
        });
    });
});

// ================================
// ROUTES FOURNISSEUR
// ================================

// Liste fournisseurs
app.get('/api/fournisseur', (req, res) => {
    req.getConnection((err, connection) => {
        if(err) return console.log(err);
        connection.query("SELECT * FROM fournisseur", [], (err, resultatfournisseur) => {
            if(err) return console.log(err);
            res.render("fournisseur", { resultatfournisseur });
        });
    });
});

// Ajouter fournisseur
app.post('/api/fournisseur', (req, res) => {
    const { nomFournisseur, responsableFournisseur, mailFournisseur, telephoneFournisseur, adresseFournisseur } = req.body;
    const sql = "INSERT INTO fournisseur (nom, responsable, tel, mail, adresse_postale) VALUES (?, ?, ?, ?, ?)";
    const values = [nomFournisseur, responsableFournisseur, telephoneFournisseur, mailFournisseur, adresseFournisseur];

    req.getConnection((err, connection) => {
        if(err) return console.log(err);
        connection.query(sql, values, (err, result) => {
            if(err) return console.log(err);
            res.redirect("/api/fournisseur");
        });
    });
});

// ================================
// ROUTES PLATS
// ================================

// Liste plats
app.get('/api/plats', (req, res) => {
    req.getConnection((err, connection) => {
        if(err) return console.log(err);
        connection.query("SELECT * FROM plats", [], (err, resultatPlats) => {
            if(err) return console.log(err);
            res.render("plats", { resultatPlats });
        });
    });
});

// Ajouter plat
app.post('/api/plats', (req, res) => {
    const { nomPlat, descriptionPlat, prixPlat, combienPlat, quantitéPlat, ingrédientPlat, fait_maisonPlat } = req.body;
    const sql = "INSERT INTO plats (nom, description, prix, combien, quantité, ingrédient, fait_maison) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [nomPlat, descriptionPlat, prixPlat, combienPlat, quantitéPlat, ingrédientPlat, fait_maisonPlat];

    req.getConnection((err, connection) => {
        if(err) return console.log(err);
        connection.query(sql, values, (err, result) => {
            if(err) return console.log(err);
            res.redirect("/api/plats");
        });
    });
});

// Ajouter membre
app.post('/api/equipe', (req, res) => {

    const nomEquipe = req.body.nomEquipe;
    const prenomEquipe = req.body.prenomEquipe;
    const mailEquipe = req.body.mailEquipe;
    const telephoneEquipe = req.body.telephoneEquipe;
    const adressePostaleEquipe = req.body.adressePostaleEquipe;

    const sql = `
    INSERT INTO equipe (nom, prenom, mail, telephone, poste, presentation, date_recrutement)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        nomEquipe,
        prenomEquipe,
        mailEquipe,
        telephoneEquipe,
        mailEquipe,
        adressePostaleEquipe
    ];

    req.getConnection((err, connection) => {
        if(err) return console.log(err);

        connection.query(sql, values, (err, result) => {
            if(err){
                console.log("ERREUR SQL :", err);
            } else {
                console.log("Membre ajouté");
                res.redirect("/api/equipe");
            }
        });
    });
});

module.exports = app;