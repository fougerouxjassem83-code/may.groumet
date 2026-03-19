
// Récupérer le modal
var modal = document.getElementById("myModal");

// Récupérer le bouton qui ouvre le modal
var btn = document.getElementById("myBtn");

// Récupérer le <span> qui ferme le modal
var span = document.getElementsByClassName("close")[0];

// Quand l'utilisateur clique sur le bouton, ouvrir le modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Quand l'utilisateur clique sur <span> (x), fermer le modal
span.onclick = function() {
  modal.style.display = "none";
}

// Quand l'utilisateur clique n'importe où en dehors du modal, fermer le modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




app.post('/ajouter-membre', (req, res) => {
  console.log(req.body);
  res.redirect('/equipe');
});