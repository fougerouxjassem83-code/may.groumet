//ici on vas créer notre application expressjs
const express = require('express');




//ici j'importe le framwork Expressjs
const app = express();



//on va installer des MIDDELWARRE c'est à dire en définis les routes localhost:2007
//j'utilise un Middleware1 pour
app.use((req,res,next) => {
    console.log("salut c'est encore moi fiji!");
    
    next();
}); 







//**ici je vais créer des meddleware pour des route en html
// ca va nous permettre de  */

















    //**ici on créer des routes */
app.get('/',(req,res) => {
    res.write("<h1>bienvenue chez maygouret</h1>");
    res.end();
});


app.get('/api/acceuil',(req,res,) => {
    console.log("je vais dans l'acceuil");
    res.write("<p>je suis dans l'acceuil</p>")
    res.end();
});

/*
app.get('/api/plats',(req,res,) => {
    console.log("je vais dans les plats");
    res.write("<p>je suis dans les plats</p>")
    res.end();
});

app.get('/api/contact',(req,res,) => {
    console.log("je vais dans le contact");
    res.write("<p>je suis dans le contact</p>")
    res.end();
});

*/








module.exports = app;