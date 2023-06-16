const token = localStorage.token;
const editPart = document.querySelectorAll(".edit");
const editTop = document.querySelector(".editionMode");
const btnFilter = document.querySelector(".btn-filter");
const login = document.querySelector("#loginBtn");
const addPhotoFrame = document.querySelector("#buttonAjoutPhoto");

if (token) {
  editPart.forEach((editPart) => {
    editPart.style = "display: flex;";
    editTop.style = "display: flex;";
  });
  login.innerHTML = "<li>logout</li>";
  login.href = './index.html';
}

login.addEventListener("click", () => {
  if (token) {
    localStorage.removeItem("token");
  }
});

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
    closeModal()
  } 
});

 
