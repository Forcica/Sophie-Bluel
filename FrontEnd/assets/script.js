function createImg(data) {
    const containImg = document.getElementsByClassName('gallery')[0];

    data.forEach(item => {
        const figure = document.createElement('figure');
        containImg.appendChild(figure)

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.appendChild(img)

        const figCaption = document.createElement('figcaption');
        figCaption.textContent = item.title;
        figure.appendChild(figCaption)
    });
}

function buttonRadio(data) {
    const containForm = document.getElementsByClassName('formPortfolio')[0];
    const categoryNames = data.map(item => item.category.name);

    categoryNames.forEach(categoryName => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'filtreCategorie';
        input.id = categoryName;
        containForm.appendChild(input)

        const label = document.createElement('label');
        label.for = categoryName;
        label.textContent = categoryName;
        containForm.appendChild(label)
    });
}

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        createImg(data);
        buttonRadio(data);
    })
    .catch(error => {
        console.error(error);
    });