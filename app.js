const express = require('express');
const app = express();

                                                    1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*ici j'appelle mysql pour intéroger ma bases de données*
donc afin de bien utiliser j'appelle mes 2 aplication pour pouvoir me connecter a ma base de données */
const mysql2 = require("mysql2");



const myConnection = require('express-myconnection');
const connection = require('express-myconnection');



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**ce code me permet de récuperer les information saisi  */
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//**ici je configure les élements attendus pour se connecter a ma base de données */

const optionConnectionBasedeDonnees =  {

    host:"localhost",
    user:"root",
    password:"Thevie@976",
    database:"maygourmet",
    port:3306

};


//ici on vas utiliser un middleware pour se connecter  à la bdd
app.use (myConnection(mysql2, optionConnectionBasedeDonnees, "pool"));




                                                2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Je précise que les vues sont dans le dossier views
app.set('views','./views');


app.set('view engine', 'ejs')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// j'ai dit appJS pour qu'il va sur le dossier public.

app.use(express.static('public'));





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/** */
app.get('/api/acceuil', (req, res) => {
    console.log("Je passe dans /api/acceuil");
    res.render('acceuil');
});



////////////////////////////////////////
//**je me connecte a a la bdd grace a la méthode get connect// */
app.get('/api/equipe', (req, res) => {
    console.log("je passe dans la route api rest /api/equipe");

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM equipe",[], (erreur, resultatEquipe) => {
            if (erreur){
                console.log("Erreur dans la requete",erreur);
            }else{
                console.log("mon equipe : ",resultatEquipe)
                res.render("equipe", {resultatEquipe}); /// ici je renvois les résultats 
            }
          });
        }
    });
    
});






/////////////////////////////////////////////////////////////////////////






app.post('/api/fournisseur', (req, res) => {
    console.log("je passe dans la route api rest /api/fournisseur",req.body);
    console.log("nom fourrnisseur :",req.body.Nom)
    console.log("prenom fournisseur :",req.body.emal)
    
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM fournisseur", [], (erreur, resultatfournisseur) => {
                if (erreur){
                    console.log("Erreur dans la requete", erreur);
                } else {
                    console.log("fournisseur : ", resultatfournisseur);
                    res.render("fournisseur", { resultatfournisseur });
                }
            });
        }
    });
});




/*ICI j'ajoute un fournisseur a ma table fournisseur
"POST" signifie nouveau*/

app.post('/api/fournisseur', (req,res) => {
  res.send("POST reçu",req.body);
});

app.get('/api/fournisseur', (req,res) => {
  res.render("fournisseur");
});

//ici j'essaye d'afficherles information









module.exports = app;



