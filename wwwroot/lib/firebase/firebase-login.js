import app from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const auth = getAuth();
const loginButton = document.getElementById('loginButton');
const rememberMe = document.getElementById('remember');

loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    console.log("email: " + email);
    console.log("password: " + password);
    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user logged in:', cred.user)
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                text: 'You will now be redirected to the cafe management page.',
                timer: 1500,
                timerProgressBar: true
            }).then(() => {
                window.location.href = "/Home/CafeManagement";
            });
        })
        .catch(err => {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Please check your email and password and try again.'
            });
        });
});
