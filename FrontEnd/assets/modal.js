// Récupération du token stocké dans le local storage
const token = localStorage.token;

// Récupération des éléments du DOM
const editPart = document.querySelectorAll(".edit");
const editTop = document.querySelector(".editionMode");
const btnFilter = document.querySelector(".btn-filter");
const login = document.querySelector("#loginBtn");
const addPhotoFrame = document.querySelector("#buttonAjoutPhoto");
const retourModale = document.querySelector('#buttonReturnModale');
const modaleBackground = document.querySelector('.modaleBackground');

// Vérification si un token existe, si oui, affichage des éléments d'édition et du bouton logout
if (token) {
  editPart.forEach((editPart) => {
    editPart.style.display = "flex";
    editTop.style.display = "flex";
  });
  login.innerHTML = "<li>logout</li>";
  login.href = './index.html';
}

// Écouteur d'événement pour le bouton logout
login.addEventListener("click", () => {
  if (token) {
    localStorage.removeItem("token");
  }
});

// Fonction asynchrone pour créer les options du sélecteur de catégories
async function createOptions() {
  // Récupération des catégories depuis l'API
  const response = await fetch("http://" + window.location.hostname + ":5678/api/categories");
  const categories = await response.json();

  // Création des options pour le sélecteur de catégories
  const selectElement = document.getElementById('select');
  categories.forEach(category => {
      const option = document.createElement('option');
      option.textContent = category.name;
      option.value = category.id;
      selectElement.appendChild(option);
  });
}

// Première Modale = Galerie Photo

// Fonction pour ouvrir la première modale
function openModal() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'visible';
  document.querySelector('.modaleBackground').style.opacity = '1';

  document.querySelector('.modaleManagePictures').style.transform = 'translateY(0)';
  document.querySelector('.modaleManagePictures').style.opacity = '1';
}

// Fonction pour fermer la première modale
function closeModal() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'none';
  document.querySelector('.modaleBackground').style.opacity = '0';

  document.querySelector('.modaleManagePictures').style.transform = 'translateY(20px)';
  document.querySelector('.modaleManagePictures').style.opacity = '0';

  document.querySelector('.modaleAddingPictures').style.transform = 'translateY(20px)';
  document.querySelector('.modaleAddingPictures').style.opacity = '0';
}

// Ajout des écouteurs d'événement pour ouvrir et fermer la première modale
document.getElementById('openModal').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);

// Ajout d'un écouteur d'événement pour le bouton "Ajouter une photo"
addPhotoFrame.addEventListener("click", () => {
  document.querySelector('.modaleAddingPictures').style.display = 'flex';
  createOptions(); // Création des options du sélecteur de catégories dans la modale d'ajout d'une photo
});

// Écouteur d'événement pour fermer la modale en cliquant sur l'arrière-plan
modaleBackground.addEventListener('click', function(event) {
  if (event.target === modaleBackground) {
    closeModal();
    closeModal2(); // Fermeture de la deuxième modale si elle est ouverte
  } 
});

// Deuxième modale = Ajout d'une photo

// Fonction pour ouvrir la deuxième modale
function openModal2() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'visible';
  document.querySelector('.modaleBackground').style.opacity = '1';

  document.querySelector('.modaleAddingPictures').style.transform = 'translateY(0)';
  document.querySelector('.modaleAddingPictures').style.opacity = '1';
}

// Fonction pour fermer la deuxième modale
function closeModal2() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'none';
  document.querySelector('.modaleBackground').style.opacity = '0';

  document.querySelector('.modaleAddingPictures').style.transform = 'translateY(20px)';
  document.querySelector('.modaleAddingPictures').style.opacity = '0';
  document.querySelector('.modaleAddingPictures').style.display = 'none';
}

// Ajout des écouteurs d'événement pour ouvrir et fermer la deuxième modale
document.getElementById('openModal').addEventListener('click', openModal2);
document.getElementById('closeModal2').addEventListener('click', closeModal2);

// Écouteur d'événement pour le bouton "Retour" dans la modale d'ajout d'une photo
retourModale.addEventListener('click', () => {
  document.querySelector('.modaleAddingPictures').style.display = 'none';
});
