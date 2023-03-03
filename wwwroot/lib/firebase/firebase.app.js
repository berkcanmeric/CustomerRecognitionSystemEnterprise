import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const auth = getAuth();

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user;
            console.log("User created successfully:", user);
        })
        .catch((error) => {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error creating user:", errorCode, errorMessage);
        });
});
