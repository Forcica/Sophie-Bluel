const token = localStorage.token;
const editPart = document.querySelectorAll(".edit");
const editTop = document.querySelector(".editionMode");
const btnFilter = document.querySelector(".btn-filter");
const login = document.querySelector("#loginBtn");
const addPhotoFrame = document.querySelector("#buttonAjoutPhoto");
const retourModale = document.querySelector('#buttonReturnModale');
const modaleBackground = document.querySelector('.modaleBackground');

if (token) {
  editPart.forEach((editPart) => {
    editPart.style.display = "flex";
    editTop.style.display = "flex";
  });
  login.innerHTML = "<li>logout</li>";
  login.href = './index.html';
}

login.addEventListener("click", () => {
  if (token) {
    localStorage.removeItem("token");
  }
});

// Première Modale 

function openModal() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'visible';
  document.querySelector('.modaleBackground').style.opacity = '1';

  document.querySelector('.modaleManagePictures').style.transform = 'translateY(0)';
  document.querySelector('.modaleManagePictures').style.opacity = '1';
}

function closeModal() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'none';
  document.querySelector('.modaleBackground').style.opacity = '0';

  document.querySelector('.modaleManagePictures').style.transform = 'translateY(20px)';
  document.querySelector('.modaleManagePictures').style.opacity = '0';
}

document.getElementById('openModal').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);

addPhotoFrame.addEventListener("click", () => {
  document.querySelector('.modaleAddingPictures').style.display = 'flex';
});

modaleBackground.addEventListener('click', function(event) {
  if (event.target === modaleBackground) {
    closeModal();
  } 
});

// Deuxième modale 

function openModal2() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'visible';
  document.querySelector('.modaleBackground').style.opacity = '1';

  document.querySelector('.modaleAddingPictures').style.transform = 'translateY(0)';
  document.querySelector('.modaleAddingPictures').style.opacity = '1';
}

function closeModal2() {
  document.querySelector('.modaleBackground').style.pointerEvents = 'none';
  document.querySelector('.modaleBackground').style.opacity = '0';

  document.querySelector('.modaleAddingPictures').style.transform = 'translateY(20px)';
  document.querySelector('.modaleAddingPictures').style.opacity = '0';
}

document.getElementById('openModal').addEventListener('click', openModal2);
document.getElementById('closeModal2').addEventListener('click', closeModal2);

retourModale.addEventListener('click', () => {
  document.querySelector('.modaleAddingPictures').style.display = 'none';
});

