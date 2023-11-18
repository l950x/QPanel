document.addEventListener("DOMContentLoaded", function () {
  // Récupérez les éléments HTML pertinents
  const editProfileBtn = document.querySelector(".edit button");
  const editProfileForm = document.getElementById("editProfileForm");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const saveProfileBtn = document.getElementById("saveProfileBtn");

  // Ajoutez un gestionnaire d'événements pour le bouton "Edit the profile"
  editProfileBtn.addEventListener("click", function () {
    // Masquez l'affichage du profil
    document.querySelectorAll(".profile-element").forEach(function (element) {
      element.style.display = "none";
    });

    // Affichez le formulaire d'édition
    editProfileForm.style.display = "block";
  });

  // Ajoutez un gestionnaire d'événements pour le bouton "Cancel"
  cancelEditBtn.addEventListener("click", function () {
    // Masquez le formulaire d'édition
    editProfileForm.style.display = "none";

    // Affichez à nouveau l'affichage du profil
    document.querySelectorAll(".profile-element").forEach(function (element) {
      element.style.display = "block";
    });
  });

  // Ajoutez un gestionnaire d'événements pour le bouton "Save"
  saveProfileBtn.addEventListener("click", function () {
    // Placez ici la logique pour enregistrer les modifications du profil (par exemple, via une requête AJAX)

    // Une fois que les modifications sont enregistrées, masquez le formulaire d'édition
    editProfileForm.style.display = "none";

    // Affichez à nouveau l'affichage du profil
    document.querySelectorAll(".profile-element").forEach(function (element) {
      element.style.display = "block";
    });
  });
});
