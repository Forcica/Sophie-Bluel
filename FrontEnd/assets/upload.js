const API_URL = window.location.hostname === 'forcica.github.io' 
  ? 'https://sophie-bluel-api.herokuapp.com/api'
  : 'http://localhost:5678/api';

// Récupération des éléments du DOM
const fileInput = document.getElementById("addingUploadImageInput");
const fileContainer = document.getElementsByClassName("addingUploadImage");

const svgFile = document.getElementById("addingUploadImageSVG");
const labelFile = document.getElementById("addingUploadImageLabel");
const inputFile = document.getElementById("addingUploadImageInput");
const pFile = document.getElementById("addingUploadImageP");

// Ajout d'un écouteur d'événement pour le changement de valeur du champ de fichier
fileInput.addEventListener("change", (event) => {
    const selectFile = event.target.files[0];

    var file = fileInput.files[0];

    // Vérification de la taille du fichier
    if (file) {
        var fileSize = file.size;
        var fileSizeInMB = fileSize / (1024 * 1024);

        if (fileSizeInMB > 4) {
            alert("Fichier trop volumineuux.");
            fileInput.value = "";
        }
    }

    // Vérification si le fichier sélectionné est une image
    if (selectFile && selectFile.type.startsWith('image/')) {
        const reader = new FileReader();

        // Lecture de l'image sélectionnée pour afficher un aperçu
        reader.addEventListener("load", (loadEvent) => {
            const imageUrl = loadEvent.target.result;

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.classList.add("inputFileImg");
            fileContainer[0].appendChild(imageElement)

            // Masquage des éléments d'ajout de fichier après avoir sélectionné une image
            svgFile.style.display = "none";
            labelFile.style.display = "none";
            inputFile.style.display = "none";
            pFile.style.display = "none";
        });
        reader.readAsDataURL(selectFile);
        handleInputsChange(); // Appel de la fonction pour gérer le changement d'état des champs d'entrée
    }
});

// Récupération des éléments du DOM pour les champs titre, catégorie et bouton de validation
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("select");
const validateBtn = document.getElementById("buttonValidateAdding");

// Ajout d'écouteurs d'événements pour gérer les changements dans les champs d'entrée
titleInput.addEventListener("input", handleInputsChange);
categoryInput.addEventListener("change", handleInputsChange);
document.addEventListener("DOMContentLoaded", handleInputsChange);

// Fonction pour gérer le changement d'état des champs d'entrée
function handleInputsChange() {
    const button = document.getElementById("buttonValidateAdding");

    // Vérification si les champs titre, catégorie et fichier sont remplis
    const isTitleInputFilled = titleInput.value.trim() !== "";
    const isCategoryInputFilled = categoryInput.value.trim() !== "";
    const isFileInputFilled = fileInput.files && fileInput.files.length > 0;

    // Ajout ou retrait de la classe "active" sur le bouton de validation en fonction de l'état des champs d'entrée
    if (isTitleInputFilled && isCategoryInputFilled && isFileInputFilled) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

// Récupération des éléments du DOM pour l'affichage de la galerie et de la modale
const containImgPage = document.getElementsByClassName('gallery')[0];
const containImgModalPage = document.getElementsByClassName('bodyModale')[0];
const containFormPage = document.getElementsByClassName('formPortfolio')[0];

// Ajout d'un écouteur d'événement pour le clic sur le bouton de validation
validateBtn.addEventListener("click", async () => {
    // Récupération des valeurs du titre, de la catégorie et du fichier
    const valueTitle = titleInput.value;
    const filesInput = inputFile.files[0];
    const inputCategory = categoryInput.value;
  
    const errorNotification = document.querySelector('#errorNotification');
    errorNotification.textContent = '';
    errorNotification.style.display = 'none';
  
    let isError = false;
  
    // Vérification si le titre et le fichier sont remplis
    if (!valueTitle) {
        errorNotification.textContent = 'Veuillez entrer un titre.';
        errorNotification.style.display = 'block';
        isError = true;
    }
  
    if (!filesInput) {
        errorNotification.textContent = 'Veuillez sélectionner une image.';
        errorNotification.style.display = 'block';
        isError = true;
    }
  
    if (isError) {
        return;
    }
  
    // Création d'un objet FormData pour envoyer les données au serveur
    const formData = new FormData();
    formData.append("title", valueTitle);
    formData.append("category", inputCategory);
    formData.append("image", filesInput);
  
    try {
        // Envoi des données au serveur via une requête POST
        const response = await fetch(`${API_URL}/works`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Envoie le token dans l'en-tête de la requête pour l'authentification
            },
            body: formData,
        });
  
        // Gestion de la réponse du serveur
        if (response.ok) {
            const data = await response.json();
            console.log("Nouvel élément :", data);
  
            // Effacement des éléments de la galerie et de la modale
            containImgPage.innerHTML = "";
            containImgModalPage.innerHTML = "";
            containFormPage.innerHTML = "";
            fetchGetElement(); // Chargement des nouvelles données pour rafraîchir la galerie
  
            // Réinitialisation des champs et de l'aperçu de l'image dans la modale
            titleInput.value = "";
            inputFile.value = null;
            const inputFileImg = document.querySelector('.inputFileImg');
            if (inputFileImg) {
                inputFileImg.remove();
            }
            svgFile.style.display = "block";
            labelFile.style.display = "block";
            inputFile.style.display = "block";
            pFile.style.display = "block";
        } else {
            const errorMessage = await response.text();
            console.log("Erreur :", response.status, errorMessage);
        }
    } catch (error) {
        console.error("Erreur :", error);
    }
});
