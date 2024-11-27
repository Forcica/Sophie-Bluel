// Import des images via JS

// Fonction pour créer et afficher les images dans la galerie principale
function createImg(data) {
    const containImg = document.getElementsByClassName('gallery')[0];

    // Parcours des données pour chaque élément
    data.forEach(item => {
        const figure = document.createElement('figure');
        containImg.appendChild(figure);
        figure.dataset.category = item.category.name;

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.appendChild(img);

        const figCaption = document.createElement('figcaption');
        figCaption.textContent = item.title;
        figure.appendChild(figCaption);
    });
}

// Fonction pour créer et afficher les images dans la modale
function createImgModal(data) {
    const containImg = document.getElementsByClassName('bodyModale')[0];

    // Parcours des données pour chaque élément
    data.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('imageTestModale');
        containImg.appendChild(article);
        article.dataset.category = item.category.name;

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        article.appendChild(img);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('buttonMovingDelete');
        article.appendChild(deleteDiv);

        // Ajout du bouton modifier emplacement image
        const moveImgBtn = document.createElement('button');
        moveImgBtn.type = 'button';
        moveImgBtn.classList.add('moveImage');
        deleteDiv.appendChild(moveImgBtn);

        // Ajout de l'icône supprimer bouger
        const moveImgIcon = document.createElement('i');
        moveImgIcon.classList.add('fa-solid', 'fa-up-down-left-right');
        moveImgBtn.appendChild(moveImgIcon);

        // Ajout du bouton supprimer image 
        const deleteImageBtn = document.createElement('button');
        deleteImageBtn.type = 'button';
        deleteImageBtn.classList.add('deleteImage');
        deleteDiv.appendChild(deleteImageBtn);

        // Ajout d'un écouteur d'événement pour la suppression d'une image
        deleteImageBtn.addEventListener('click', () => {
            const index = data.findIndex(item => item.id === item.id);

            const containImgSuppr = document.getElementsByClassName('gallery')[0];
            const containImgModalSuppr = document.getElementsByClassName('bodyModale')[0];
            const containFormSuppr = document.getElementsByClassName('formPortfolio')[0];

            if (index !== -1) {
               // Appel de la fonction deleteItemAPI pour supprimer l'image de l'API
               deleteItemAPI(item.id)
                  .then(() => {
                     // Suppression de l'élément de la modale et des tableaux de données
                     article.remove();
                     data.splice(index, 1);
                     // Nettoyage des conteneurs principaux pour recharger les données
                     containImgSuppr.innerHTML = "";
                     containImgModalSuppr.innerHTML = "";
                     containFormSuppr.innerHTML = "";
                     fetchGetElement(); // Recharge les données après la suppression
                  })
                  .catch(error => {
                     console.log("ERROR");
                  });
            }
        });

        // Ajout de l'icône supprimer image
        const deleteImgIcon = document.createElement('i');
        deleteImgIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteImageBtn.appendChild(deleteImgIcon);

        const editImageBtn = document.createElement('button');
        editImageBtn.type = 'button';
        editImageBtn.classList.add('editImage');
        editImageBtn.textContent = 'éditer';
        article.appendChild(editImageBtn);
    });
}

// Fonction pour supprimer une image en appelant l'API avec une requête DELETE
function deleteItemAPI(itemId) {
    const url = `${API_URL}/works/${itemId}`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`, // Supposons que la variable token soit définie ailleurs dans le code
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Element bien supprimé');
        } else {
            throw new Error('Vous rencontrez une erreur');
        }
    });
}
// Fonction pour ajouter les filtres permettant de classifier les images
function buttonRadio(data) {
    // Récupère le conteneur pour le formulaire
    const containForm = document.getElementsByClassName('formPortfolio')[0];
    const categorySet = new Set();

    // Récupère tous les éléments figure de la galerie principale
    const figures = document.querySelectorAll('.gallery figure');

    // Fonction de filtrage des images basée sur les boutons radio
    const filterImages = (event) => {
        const selectCategory = event.target.id;

        // Parcours des figures et affichage/masquage en fonction du filtre sélectionné
        figures.forEach(figure => {
            if (selectCategory === 'filterCategorieAll' || figure.dataset.category === selectCategory) {
                figure.style.display = 'block';
            } else {
                figure.style.display = 'none';
            }
        });
    };

    // Création du bouton radio "Toutes"
    const inputAllFilter = document.createElement('input');
    inputAllFilter.type = 'radio';
    inputAllFilter.name = 'filtreCategorie';
    inputAllFilter.id = 'filterCategorieAll';
    inputAllFilter.addEventListener('change', filterImages);
    containForm.appendChild(inputAllFilter);

    const labelAllFilter = document.createElement('label');
    labelAllFilter.htmlFor = 'filterCategorieAll';
    labelAllFilter.textContent = 'Toutes';
    containForm.appendChild(labelAllFilter);

    // Création des autres boutons radio en fonction des catégories présentes dans les données
    data.forEach(item => {
        const categoryName = item.category.name;

        if (!categorySet.has(categoryName)) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'filtreCategorie';
            input.id = categoryName;
            input.addEventListener('change', filterImages);
            containForm.appendChild(input);

            const label = document.createElement('label');
            label.htmlFor = categoryName;
            label.textContent = categoryName;
            containForm.appendChild(label);

            categorySet.add(categoryName);
        }
    });
}

// Définition de l'URL de l'API selon l'environnement
const API_URL = window.location.hostname === 'forcica.github.io' 
  ? 'https://sophie-bluel-api.herokuapp.com/api' // URL de l'API en production
  : 'http://localhost:5678/api'; // URL de l'API en local

// Fonction principale pour récupérer les données de l'API et initialiser l'affichage
const fetchGetElement = async () => {
    try {
        const response = await fetch(`${API_URL}/works`);
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        const data = await response.json();
        createImg(data);
        createImgModal(data);
        buttonRadio(data);
        document.querySelector('.modaleAddingPictures').style.display = "none";
    } catch (error) {
        console.error(error);
        // En cas d'erreur, utiliser des données statiques pour GitHub Pages
        if (window.location.hostname === 'forcica.github.io') {
            const staticData = [
                {
                    id: 1,
                    title: "Exemple 1",
                    imageUrl: "./assets/images/abajour-tahina.png",
                    categoryId: 1,
                    category: { id: 1, name: "Objets" }
                },
                // Ajoutez d'autres exemples statiques ici
            ];
            createImg(staticData);
            createImgModal(staticData);
            buttonRadio(staticData);
        }
    }
};

// Appel de la fonction principale pour récupérer les données et initialiser l'affichage
fetchGetElement();
