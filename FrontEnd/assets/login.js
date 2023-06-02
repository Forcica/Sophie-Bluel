const connect = document.querySelector("input[type=submit]");

connect.addEventListener("click", function (event) {
  event.preventDefault();
  loginUser();
});

async function loginUser() {
  const email = document.getElementById("mailBox").value;
  const password = document.getElementById("passwordBox").value;

  const url = "http://localhost:5678/api/users/login";

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/FrontEnd/index.html";
        return response.json();
      } else {
        alert("Email ou mot de passe erronés");
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      console.log(data.token);
    })
    .catch((error) => console.error(error));

  const token = localStorage.token;
  if (token) {
    fetch("http://localhost:5678/api/works", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erreur lors de la récupération des données.");
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  }
}