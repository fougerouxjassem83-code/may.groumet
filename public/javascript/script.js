document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // Modal Ajouter
  // -------------------------------
  const modalAdd = document.getElementById("myModal");
  const btnAdd   = document.getElementById("myBtn");
  const closeAdd = modalAdd.querySelector(".close");

  btnAdd.onclick  = () => { modalAdd.style.display = "block"; };
  closeAdd.onclick = () => { modalAdd.style.display = "none"; };

  // -------------------------------
  // Modal Modifier
  // -------------------------------
  const modal2        = document.getElementById("myModal2");
  const openModalBtns = document.querySelectorAll(".openModalBtn");

  const editId           = document.getElementById("editId");
  const editNom          = document.getElementById("editNom");
  const editPrenom       = document.getElementById("editPrenom");
  const editMail         = document.getElementById("editMail");
  const editTelephone    = document.getElementById("editTelephone");
  const editPoste        = document.getElementById("editPoste");
  const editPresentation = document.getElementById("editPresentation");
  const editAdresse      = document.getElementById("editdate_revrutrment");

  openModalBtns.forEach(button => {
    button.addEventListener("click", function () {
      modal2.style.display = "block";

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
  async function modifierMembre(id, data) {
    try {
      const response = await fetch(`/api/equipe/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur serveur : ${errText}`);
      }

      const result = await response.json();
      if (result.success) {
        modal2.style.display = "none";
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
      alert('Impossible de modifier le membre, vérifie les champs et réessaie.');
    }
  }

  // Écoute du formulaire modifier
  const formModifier = document.getElementById('form-modifier-membre');
  formModifier.addEventListener('submit', (e) => {
    e.preventDefault();

    const id   = editId.value;
    const data = {
      nom:              editNom.value,
      prenom:           editPrenom.value,
      mail:             editMail.value,
      telephone:        editTelephone.value,
      poste:            editPoste.value,
      presentation:     editPresentation.value,
      date_revrutrment: editAdresse.value
    };

    modifierMembre(id, data);
  });

  // -------------------------------
  // Fermer modals
  // -------------------------------
  document.querySelector("#myModal2 .close").onclick = function () {
    modal2.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal2)   modal2.style.display   = "none";
    if (event.target == modalAdd) modalAdd.style.display = "none";
  };

}); // fin DOMContentLoaded