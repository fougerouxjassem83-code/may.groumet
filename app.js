const express = require('express');




const app = express();

// Je précise que les vues sont dans le dossier views
app.set('views','./views');


app.set('view engine', 'ejs')




// j'ai dit appJS pour qu'il va sur le dossier public.

app.use(express.static('public'));









/** */
app.get('/api/acceuil', (req, res) => {
    console.log("Je passe dans /api/acceuil");
    res.render('acceuil');
});






module.exports = app;

