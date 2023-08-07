// Récupération de l'élément bouton "Connecter"
const connect = document.querySelector("input[type=submit]");

// Ajout d'un écouteur d'événement pour le clic sur le bouton "Connecter"
connect.addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton (évite de soumettre un formulaire)
    loginUser(); // Appel de la fonction loginUser pour se connecter
});

// Fonction asynchrone pour gérer la connexion de l'utilisateur
async function loginUser() {
    // Récupération des valeurs des champs email et mot de passe
    const email = document.getElementById("mailBox").value;
    const password = document.getElementById("passwordBox").value;

    // URL de l'API pour la connexion
    const url = "http://localhost:5678/api/users/login";

    let isError = false; // Variable pour vérifier s'il y a eu une erreur lors de la connexion

    // Appel de l'API en utilisant fetch pour se connecter avec les données email et mot de passe
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

    // Gestion de la réponse de l'API
    .then((response) => {
        if (response.ok) {
            window.location.href = "../index.html"; // Redirige vers la page principale si la connexion est réussie
            return response.json();
        } else {
            isError = true; // Marque l'erreur s'il y a un problème de connexion
        }
    })

    // Récupération du token de l'utilisateur connecté et stockage dans le localStorage
    .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data.token); // Affiche le token dans la console (pour le débogage)
    })

    .catch((error) => console.error(error)); // Gestion des erreurs en cas de problème lors de la connexion

    // Vérification si une erreur s'est produite lors de la connexion
    if (isError) {
        document.querySelector("#errorMailMdp").style.display = "block"; // Affiche un message d'erreur à l'utilisateur
        return;
    }

    // Récupération du token de l'utilisateur depuis le localStorage
    const token = localStorage.token;

    // Vérification si un token existe (c'est-à-dire si l'utilisateur est connecté)
    if (token) {
        // Appel de l'API pour récupérer les données de l'utilisateur connecté (dans cet exemple, les "works")
        fetch("http://localhost:5678/api/works", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // Envoie le token dans l'en-tête de la requête pour l'authentification
            },
        })

        // Gestion de la réponse de l'API
        .then((response) => {
            if (response.ok) {
                return response.json(); // Récupère les données renvoyées par l'API (dans cet exemple, les "works")
            } else {
                throw new Error("Erreur lors de la récupération des données."); // Lance une erreur en cas de problème
            }
        })

        .then((data) => {
            // Ici, vous pouvez traiter les données renvoyées par l'API si nécessaire
        })

        .catch((error) => {
            console.log(error); // Affiche l'erreur dans la console en cas de problème avec l'API
        });
    }
}
