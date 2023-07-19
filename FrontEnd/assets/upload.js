const fileInput = document.getElementById("addingUploadImageInput");
const fileContainer = document.getElementsByClassName("addingUploadImage");

const svgFile = document.getElementById("addingUploadImageSVG");
const labelFile = document.getElementById("addingUploadImageLabel");
const inputFile = document.getElementById("addingUploadImageInput");
const pFile = document.getElementById("addingUploadImageP");

fileInput.addEventListener("change", (event) => {
    const selectFile = event.target.files[0];

    var file = fileInput.files[0];

    if (file) {
        var fileSize = file.size;
        var fileSizeInMB = fileSize / (1024 * 1024);

        if (fileSizeInMB > 4) {
            alert("Fichier trop volumineuux.");
            fileInput.value = "";
        }
    }

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
        handleInputsChange();

    }
});

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("select");
const validateBtn = document.getElementById("buttonValidateAdding");

titleInput.addEventListener("input", handleInputsChange);
categoryInput.addEventListener("change", handleInputsChange);

document.addEventListener("DOMContentLoaded", handleInputsChange);

function handleInputsChange() {
    const button = document.getElementById("buttonValidateAdding");

    const isTitleInputFilled = titleInput.value.trim() !== "";
    const isCategoryInputFilled = categoryInput.value.trim() !== "";
    const isFileInputFilled = fileInput.files && fileInput.files.length > 0;

    if (isTitleInputFilled && isCategoryInputFilled && isFileInputFilled) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

const containImgPage = document.getElementsByClassName('gallery')[0];
const containImgModalPage = document.getElementsByClassName('bodyModale')[0];
const containFormPage = document.getElementsByClassName('formPortfolio')[0];

validateBtn.addEventListener("click", async () => {
    const valueTitle = titleInput.value;
    const filesInput = inputFile.files[0];
    const inputCategory = categoryInput.value;
  
    const errorNotification = document.querySelector('#errorNotification');
    errorNotification.textContent = '';
    errorNotification.style.display = 'none';
  
    let isError = false;
  
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
  
    const formData = new FormData();
  
    formData.append("title", valueTitle);
    formData.append("category", inputCategory);
    formData.append("image", filesInput);
  
    try {
      const response = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Nouvel élément :", data);
  
        containImgPage.innerHTML = "";
        containImgModalPage.innerHTML = "";
        containFormPage.innerHTML = "";
        fetchGetElement();
  
        // Réinitialiser les champs de la modale
        titleInput.value = "";
        inputFile.value = null;
        // Réinitialiser l'aperçu de l'image dans la modale
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
  
  