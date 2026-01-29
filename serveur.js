
    //* ici je vais tout simplement créer mon serveur.


//**permez de de créer le fichier http
const http = require('http');

    /**je vais declarer mon app en la mettant ici  */
const app = require('./app')

/** jai décl */
 const numeroPort = 2007;


/**ici  */
app.set('port',numeroPort);



//* */
const serveur = http.createServer(app);

//*ici on appelle le serveur
serveur.listen(numeroPort, () => {
    console.log("le serveur tourne sur le port:",numeroPort);
});
