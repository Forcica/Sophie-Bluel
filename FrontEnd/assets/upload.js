const fileInput = document.getElementById("addingUploadImageInput");
const fileContainer = document.getElementsByClassName("addingUploadImage");

const svgFile = document.getElementById("addingUploadImageSVG");
const labelFile = document.getElementById("addingUploadImageLabel");
const inputFile = document.getElementById("addingUploadImageInput");
const pFile = document.getElementById("addingUploadImageP");

fileInput.addEventListener("change", (event) => {
    const selectFile = event.target.files[0];

    if (selectFile && selectFile.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.addEventListener("load", (loadEvent) => {
            const imageUrl = loadEvent.target.result;

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.classList.add("inputFileImg");
            fileContainer[0].appendChild(imageElement)

            svgFile.style.display = "none";
            labelFile.style.display = "none";
            inputFile.style.display = "none";
            pFile.style.display = "none";
        });
        reader.readAsDataURL(selectFile);
    }
});

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("select");
const validateBtn = document.getElementById("buttonValidateAdding");

validateBtn.addEventListener("click", async () => {
    const valueTitle = titleInput.value;
    const filesInput = inputFile.files[0];
    const inputCategory = categoryInput.value;

    if (valueTitle && filesInput && inputCategory) {
        const formData = new FormData();
        
        formData.append("title", valueTitle);
        formData.append("category", inputCategory);
        formData.append("image", filesInput);

        console.log("title",valueTitle)
        console.log("category", inputCategory)
        console.log("image", filesInput)

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if(response.ok) {
                const data = await response.json();
                console.log("Nouvel élémént", data);
            } else {
                console.log("Erreur", response.status);
            }
        } catch (error) {
            console.error("Erreur ", error);
        }
    } else {
        alert('Formulaire incomplet')
    }

    // --> Mettre à jour l'HTML de ma galeriepour que le refresh après l'ajout d'une image se fasse dynamiquement 
    // --> Mettre à jour en même temps la modale

})