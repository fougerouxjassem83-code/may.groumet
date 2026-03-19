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



///////////////////////////////////////////////////////////////////////


///**ici on a créer un api qui consistera de supprimer un membre de l'équipe
// la Methode : DELETE
// EXEMPLE : localhost : 2007/api/equipe/4  */

app.delete('/api/equipe/:id',(req,res) =>{
    const idMembreEquipe = req.params.id;
     const queryDelete = "DELETE FROM EQUIPE WHERE id = ?";
    req.getConnection((erreur,connection) => {
            if(erreur){
                console.log("erreur supression equipe");

            }else{
            connection.query(queryDelete,[idMembreEquipe],(erreur,resultat) => {
            if(erreur){
                console.log("erreur requete suppression :", erreur);
            
            }else{
                console.log("bravo! le membre est supprimé dans laa table ")

            
                res.status(200).redirect("/api/acceuil");
            
            }


            }
        )
            }

        }
       
    )

    }
);



///////////////////////////////////////////////////////////////////////////////////////////////////////



app.post('/api/fournisseur', (req, res) => {
console.log("corps de la requete :", req.body);

const nomFournisseur = req.body.nomFournisseur;
const responsableFournisseur = req.body.responsableFournisseur;
const emailFournisseur = req.body.mailFournisseur;
const telephoneFournisseur = req.body.telephoneFournisseur;
const adressePostaleFournissseur = req.body.adresseFournisseur;

const requeteSql = "INSERT INTO fournisseur (nom, responsable, tel, mail, adresse_postale) VALUES (?, ?, ?, ?, ?)";

const Ordreschamps = [
    nomFournisseur,
    responsableFournisseur,
    telephoneFournisseur,
    emailFournisseur,
    adressePostaleFournissseur
];

req.getConnection((erreur, connection) => {

    if (erreur) {
        console.log("erreur de connection a la bdd :", erreur);
    } else {

        connection.query(requeteSql, Ordreschamps, (erreur, nouveaufournisseur) => {

            if (erreur) {
                console.log("erreur d'ajout fournisseur :", erreur);
            } else {
                console.log("Bravo Nouveau fournisseur ajouté");
                res.redirect("/api/fournisseur");
            }

        });

    }

});
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.get('/api/fournisseur', (req, res) => {

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

/******************************************************************************************************* */
/*ICI j'ajoute un fournisseur a ma table fournisseur
"POST" signifie  par la suite post signifie l'endroit ou je peut faire nouveau*/
/******************************************************************************************************* */

app.post('/api/fournisseur', (req,res) => {
  res.send("POST reçu",req.body);
});

app.get('/api/fournisseur', (req,res) => {
  res.render("fournisseur");
});







/*************************************************************************** */
/**ici je veux récuperer les informations DE MON MODAL de formulaire coté backend */
/************************************************************************** */

app.post('/api/equipe', (req, res) => {
console.log("corps de la requete :", req.body);

const nomEquipe = req.body.nomEquipe;
const responsableEquipe = req.body.responsableEquipe;
const emailEquipe = req.body.mailEquipe;
const telephoneEquipe = req.body.telephoneEquipe;
const adressePostaleEquipe = req.body.adressePostaleEquipe;

const requeteSql = "INSERT INTO equipe (nom, responsable, tel, mail, adresse_postale) VALUES (?, ?, ?, ?, ?)";

const Ordreschamps = [
    nomEquipe,
    responsableEquipe,
    telephoneEquipe,
    emailEquipe,
    adressePostaleEquipe
];

req.getConnection((erreur, connection) => {

    if (erreur) {
        console.log("erreur de connection a la bdd :", erreur);
    } else {

        connection.query(requeteSql, Ordreschamps, (erreur, nouveauequipier ) => {

            if (erreur) {
                console.log("erreur d'ajout équipier :", erreur);
            } else {
                console.log("Bravo Nouveau équipier ajouté");
                res.redirect("/api/equipe");
            }

        });

    }

});
});

/*ici c'est pour rester a ma page apres l'envoi*/ 
app.post('/ajouter-membre', (req, res) => {
  console.log(req.body);
  res.redirect('/equipe');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/equipe', (req, res) => {

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM equipe", [], (erreur, resultatequipe) => {
                if (erreur){
                    console.log("Erreur dans la requete", erreur);
                } else {
                    console.log("equipe : ", resultatequipe);
                    res.render("equipe", { resultatequipe });
                }
            });
        }
    });

});

/*********************************************************************************************** */
/*********************************************************************************************** */






































module.exports = app;



