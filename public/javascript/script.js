// modal
const modal = document.getElementById("myModal");

// bouton ajouter
const btnAdd = document.getElementById("myBtn");

// boutons contacter
const contactBtns = document.querySelectorAll(".openModalBtn");

// bouton fermer
const span = document.querySelector(".close");

// ouvrir modal (ajouter)
btnAdd.onclick = function () {
  modal.style.display = "block";
};

// ouvrir modal (contacter)
contactBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    modal.style.display = "block";

    const prenom = btn.getAttribute("data-prenom");
    const nom = btn.getAttribute("data-nom");

    console.log("Contact :", prenom, nom);
  });
});

// fermer
span.onclick = function () {
  modal.style.display = "none";
};

// fermer dehors
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";}};



