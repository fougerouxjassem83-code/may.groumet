// -------------------------------
// Modal Ajouter
// -------------------------------
const modalAdd = document.getElementById("myModal");    // modal Ajouter
const btnAdd = document.getElementById("myBtn");       // bouton Ajouter
const closeAdd = modalAdd.querySelector(".close");     // bouton fermer

btnAdd.onclick = () => {
  modalAdd.style.display = "block";
};

closeAdd.onclick = () => {
  modalAdd.style.display = "none";
};









// récupérer le modal modifier
const modal2 = document.getElementById("myModal2");

// boutons "modifier"
const openModalBtns = document.querySelectorAll(".openModalBtn");

// champs du formulaire
const editId = document.getElementById("editId");
const editNom = document.getElementById("editNom");
const editPrenom = document.getElementById("editPrenom");
const editMail = document.getElementById("editMail");
const editTelephone = document.getElementById("editTelephone");
const editAdresse = document.getElementById("editAdresse");

// ouvrir + remplir
openModalBtns.forEach(button => {
  button.addEventListener("click", function () {
    modal2.style.display = "block";

    editId.value = this.dataset.id || "";
    editNom.value = this.dataset.nom || "";
    editPrenom.value = this.dataset.prenom || "";
    editMail.value = this.dataset.mail || "";
    editTelephone.value = this.dataset.telephone || "";
    editAdresse.value = this.dataset.adresse || "";
  });
});





// Fonction fetch PUT pour modifier un membre
async function modifierMembre(id, data) {
    try {
        const response = await fetch(`/api/equipe/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Erreur serveur : ${errText}`);
        }

        console.log('Membre modifié avec succès');
        window.location.reload(); // recharge la page ou mettre à jour l'UI dynamiquement
    } catch (error) {
        console.error('Erreur lors de la modification :', error);
        alert('Impossible de modifier le membre, vérifie les champs et réessaie.');
    }
}

// Écoute du formulaire
const formModifier = document.getElementById('form-modifier-membre');
formModifier.addEventListener('submit', (e) => {
    e.preventDefault(); // empêche le submit classique

    const id = document.getElementById('editId').value;
    const data = {
        nom: document.getElementById('editNom').value,
        prenom: document.getElementById('editPrenom').value,
        mail: document.getElementById('editMail').value,
        telephone: document.getElementById('editTelephone').value,
        poste: document.getElementById('editAdresse').value, // ou poste selon ta table
        presentation: '', // si tu as un champ présentation, sinon vide
        date_revrutrment: new Date().toISOString().split('T')[0] // exemple, ou récupérer d'un input
    };

    modifierMembre(id, data);
});















// fermer
document.querySelector("#myModal2 .close").onclick = function () {
  modal2.style.display = "none";
};

// fermer en cliquant dehors
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

