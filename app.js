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





/**ici je recupzerer un a un les information */
app.post('/api/fournisseur', (req, res) => {
    console.log("je passe dans la route api rest /api/fournisseur",req.body);
    console.log("nom Fourrnisseur :",req.body.Nom);
    console.log("ici je récupère le prenom:",req.body.Prénom)
    console.log("emailFournisseur :",req.body.email)
    console.log("présentation du fournisseur:",req.body.Presentation)

/**ici on envoie les infos sur sql */
const nomFournisseur = req.body.Nom
const emailFournisseur = req.body.emailFournisseur
const telephoneFournisseur = req.body.telephoneFournisseur
const ad






/**ici on fais des configue pour reussir a lles envoyer sur ma bases de données  */
const requeteSql = VALUES("?,?,?,?");







const Ordreschamps = 





///**il me connect a la bases de données */

req.getConnection((erreur,connection) => {

if(erreur){ // si il ya une erreur
console.log("erreur de connection a la bdd : ")
    }else{//si jai reussi a me connecter a la bdd
connection.query(requeteSql,Ordreschamps,)

}



});






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
"POST" signifie  par la suite post signifie l'endroit ou je peut fairenouveau*/

app.post('/api/fournisseur', (req,res) => {
  res.send("POST reçu",req.body);
});

app.get('/api/fournisseur', (req,res) => {
  res.render("fournisseur");
});

//ici j'essaye d'afficherles information









module.exports = app;



