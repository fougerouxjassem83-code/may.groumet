// On attend que tout le HTML soit chargé avant d'exécuter le code JavaScript
document.addEventListener("DOMContentLoaded", () => {
 
  // -------------------------------
  // Modal Ajouter
  // -------------------------------
 
  // Récupère la modale d'ajout (la fenêtre qui s'ouvre pour ajouter un membre)
  const modalAdd = document.getElementById("myModal");
 
  // Récupère le bouton "Ajouter un membre !" qui ouvre la modale
  const btnAdd   = document.getElementById("myBtn");
 
  // Récupère le bouton de fermeture (la croix) dans la modale d'ajout
  const closeAdd = modalAdd.querySelector(".close");
 
  // Quand on clique sur le bouton "Ajouter un membre !", on affiche la modale
  btnAdd.onclick  = () => {
    modalAdd.style.display = "block";
  };
 
  // Quand on clique sur la croix, on ferme la modale
  closeAdd.onclick = () => {
    modalAdd.style.display = "none";
  };
 
 
  // -------------------------------
  // Modal Modifier
  // -------------------------------
 
  // Récupère la modale de modification de membre
  const modal2        = document.getElementById("myModal2");
 
  // Récupère tous les boutons "Modifier" présents dans chaque carte membre
  const openModalBtns = document.querySelectorAll(".openModalBtn");
 
  // Récupère tous les champs du formulaire de modification
  const editId            = document.getElementById("editId");
  const editNom           = document.getElementById("editNom");
  const editPrenom        = document.getElementById("editPrenom");
  const editMail          = document.getElementById("editMail");
  const editTelephone     = document.getElementById("editTelephone");
  const editPoste         = document.getElementById("editPoste");
  const editPresentation  = document.getElementById("editPresentation");
  const editAdresse       = document.getElementById("editdate_revrutrment");
 
  // Pour chaque bouton "Modifier" de la liste
  openModalBtns.forEach(button => {
    button.addEventListener("click", function () {
      // On affiche la modale de modification
      modal2.style.display = "block";
 
      // On remplit les champs du formulaire avec les données du membre
      // Les données viennent des attributs data-* dans le HTML (data-id, data-nom, etc.)
      editId.value           = this.dataset.id               || "";
      editNom.value          = this.dataset.nom              || "";
      editPrenom.value       = this.dataset.prenom           || "";
      editMail.value         = this.dataset.mail             || "";
      editTelephone.value    = this.dataset.telephone        || "";
      editPoste.value        = this.dataset.poste            || "";
      editPresentation.value = this.dataset.presentation     || "";
      editAdresse.value      = this.dataset.date_revrutrment || "";
    });
  });
 
 
  // -------------------------------
  // Fonction PUT modifier membre
  // -------------------------------
 
  // Fonction asynchrone pour envoyer les données au serveur et modifier un membre
  async function modifierMembre(id, data) {
    try {
      // On envoie une requête HTTP de type PUT vers /api/equipe/:id
      const response = await fetch(`/api/equipe/${id}`, {
        method: 'PUT', // méthode HTTP PUT pour modifier
        headers: { 'Content-Type': 'application/json' }, // on envoie du JSON
        body: JSON.stringify(data) // on convertit l'objet JS en JSON
      });
 
      // Si la réponse n'est pas "OK" (code 200-299), on considère que c'est une erreur
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur serveur : ${errText}`);
      }
 
      // On récupère la réponse JSON envoyée par le serveur
      const result = await response.json();
 
      // Si le serveur renvoie success: true
      if (result.success) {
        // On ferme la modale
        modal2.style.display = "none";
        // On recharge la page pour afficher les nouvelles données
        window.location.reload();
      }
    } catch (error) {
      // En cas d'erreur (réseau, serveur, etc.), on affiche un message dans la console
      console.error('Erreur lors de la modification :', error);
      // Et on prévient l'utilisateur avec une alerte
      alert('Impossible de modifier le membre, vérifie les champs et réessaie.');
    }
  }
 
 
  // -------------------------------
  // Écoute du formulaire modifier
  // -------------------------------
 
  // On récupère le formulaire de modification
  const formModifier = document.getElementById('form-modifier-membre');
 
  // Quand on soumet le formulaire de modification
  formModifier.addEventListener('submit', (e) => {
    // On empêche le rechargement automatique de la page
    e.preventDefault();
 
    // On récupère l'id du membre à modifier
    const id = editId.value;
 
    // On crée un objet avec toutes les nouvelles valeurs du formulaire
    const data = {
      nom:               editNom.value,
      prenom:            editPrenom.value,
      mail:              editMail.value,
      telephone:         editTelephone.value,
      poste:             editPoste.value,
      presentation:      editPresentation.value,
      date_revrutrment:  editAdresse.value
    };
 
    // On appelle la fonction qui envoie la requête PUT au serveur
    modifierMembre(id, data);
  });
 
 
  // -------------------------------
  // Fermer modals
  // -------------------------------
 
  // Quand on clique sur la croix de la modale de modification, on la ferme
  document.querySelector("#myModal2 .close").onclick = function () {
    modal2.style.display = "none";
  };
 
  // Quand on clique en dehors des modales, on les ferme aussi
  window.onclick = function (event) {
    if (event.target == modal2)   modal2.style.display   = "none";
    if (event.target == modalAdd) modalAdd.style.display = "none";
  };
 
}); // fin DOMContentLoaded
 
 
 
 
//------------------------------------------------------------------------------------------------------
 
 
  // -------------------------------
  // Supprimer un membre
  // -------------------------------
 
  document.querySelectorAll(".supprimerBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;
      if (!confirm("Voulez-vous vraiment supprimer ce membre ?")) return;
 
      try {
        const response = await fetch(`/api/equipe/${id}`, { method: "DELETE" });
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression.");
        }
      } catch (error) {
        console.error("Erreur suppression :", error);
        alert("Impossible de supprimer le membre.");
      }
    });
  });
 
 
//---------------------------------
// ici je personalise ma navbar pour le bon affichage de mes pages
// ---------------------------------








































//***ici je vais personnalier mon modal plats que jai créer pour pouvoir l'ouvrir et le fermer */
// -------------------------------
  // Modal Ajouter un nouveaux plats
  // -------------------------------
 
  // Récupère la modale d'ajout (la fenêtre qui s'ouvre pour ajouter un membre)
  const mymodalplats = document.getElementById("myModalplats");
 
  // Récupère le bouton "Ajouter un membre !" qui ouvre la modale
  const btnAdd   = document.getElementById("myBtn");
 
  // Récupère le bouton de fermeture (la croix) dans la modale d'ajout
  const closeAdd = modalAdd.querySelector(".close");
 
  // Quand on clique sur le bouton "Ajouter un membre !", on affiche la modale
  btnAdd.onclick  = () => {
    modalAdd.style.display = "block";
  };
 
  // Quand on clique sur la croix, on ferme la modale
  closeAdd.onclick = () => {
    modalAdd.style.display = "none";
  };
 
 