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
        buttonRadio(data);
    })
    .catch(error => {
        console.error(error);
    });