// Import des images via JS

function createImg(data) {
    const containImg = document.getElementsByClassName('gallery')[0];

    data.forEach(item => {
        const figure = document.createElement('figure');
        containImg.appendChild(figure)
        figure.dataset.category = item.category.name;

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.appendChild(img)

        const figCaption = document.createElement('figcaption');
        figCaption.textContent = item.title;
        figure.appendChild(figCaption)
    });
}

function createImgModal(data) {
    const containImg = document.getElementsByClassName('bodyModale')[0];

    data.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('imageTestModale')
        containImg.appendChild(article)
        article.dataset.category = item.category.name;

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        article.appendChild(img)

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('buttonMovingDelete')
        article.appendChild(deleteDiv)

        // Ajout du bouton modifier emplacement image
        const moveImgBtn = document.createElement('button');
        moveImgBtn.type = 'button'
        moveImgBtn.classList.add('moveImage')
        deleteDiv.appendChild(moveImgBtn)

        // Ajout de l'icone supprimer bouger
        const moveImgIcon = document.createElement('i');
        moveImgIcon.classList.add('fa-solid', 'fa-up-down-left-right')
        moveImgBtn.appendChild(moveImgIcon)

        // Ajout du bouton supprimer image 
        const deleteImageBtn = document.createElement('button');
        deleteImageBtn.type = 'button'
        deleteImageBtn.classList.add('deleteImage')
        deleteDiv.appendChild(deleteImageBtn)

        deleteImageBtn.addEventListener('click', () => {
            const index = data.findIndex(item => item.id === item.id);

            if (index !== -1) {
                deleteItemAPI(item.id)
                    .then(() => {
                        article.remove();
                        data.splice(index, 1);
                    })
                    .catch(error => {
                        console.log("ERROR");
                    });
            }
        });

        // Ajout de l'icone supprimer image
        const deleteImgIcon = document.createElement('i');
        deleteImgIcon.classList.add('fa-solid', 'fa-trash-can')
        deleteImageBtn.appendChild(deleteImgIcon)

        const editImageBtn = document.createElement('button');
        editImageBtn.type = 'button'
        editImageBtn.classList.add('editImage')
        editImageBtn.textContent = 'éditer';
        article.appendChild(editImageBtn)
    });
}

function deleteItemAPI(itemId) {
    const url = `http://localhost:5678/api/works/${itemId}`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
    })
    .then(response => {
        if (response.ok) {
            console.log('connard, élément suppr');
        } else {
            throw new Error('Erreur sale pd');
        }
    });
}

// Ajout des filtres pour classifier les images

function buttonRadio(data) {
    // Recupère le nom de class 'formPortfolio' pour créer la variable 'containForm'
    const containForm = document.getElementsByClassName('formPortfolio')[0];
    const categorySet = new Set();

    // Recupère une class et une balise HTML pour créer la variable 'figures'
    const figures = document.querySelectorAll('.gallery figure');

    // Création de la variable 'filterImages' permettant l'ajout de l'event listener cf L.49
    const filterImages = (event) => {
        const selectCategory = event.target.id;

        figures.forEach(figure => {
            if (selectCategory === 'filterCategorieAll' || figure.dataset.category === selectCategory) {
                figure.style.display = 'block';
            } else {
                figure.style.display = 'none';
            }
        });
    };

    // Recupération des filtres avec les éléments présents dans l'API
    const inputAllFilter = document.createElement('input');
    inputAllFilter.type = 'radio';
    inputAllFilter.name = 'filtreCategorie';
    inputAllFilter.id = 'filterCategorieAll';
    inputAllFilter.addEventListener('change', filterImages);
    containForm.appendChild(inputAllFilter)

    const labelAllFilter = document.createElement('label');
    labelAllFilter.htmlFor = 'filterCategorieAll';
    labelAllFilter.textContent = 'Toutes';
    containForm.appendChild(labelAllFilter)

    // Vérification pour chaque filtre / image si il contient les informations adéquates 
    data.forEach(item => {
        const categoryName = item.category.name;

        if(!categorySet.has(categoryName)) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'filtreCategorie';
            input.id = categoryName;
            input.addEventListener('change', filterImages);
            containForm.appendChild(input)
    
            const label = document.createElement('label');
            label.htmlFor = categoryName;
            label.textContent = categoryName;
            containForm.appendChild(label)

            categorySet.add(categoryName)
        }
    });
}

// Connexion à l'API pour la page principale

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        createImg(data);
        createImgModal(data);
        buttonRadio(data);
    })
    .catch(error => {
        console.error(error);
    });