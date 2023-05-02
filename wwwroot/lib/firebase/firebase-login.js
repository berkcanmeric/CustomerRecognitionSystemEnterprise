import app from "./firebase-config.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const auth = getAuth();
const loginButton = document.getElementById('loginButton');
const rememberMe = document.getElementById('remember');

// Get the password input field and the toggle password button
const passwordInput = document.getElementById('psw');
const togglePasswordButton = document.querySelector('.toggle-password');

// Add an event listener to the toggle password button
togglePasswordButton.addEventListener('click', function() {
    // Toggle the type attribute of the password input field
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle the icon of the toggle password button
    const icon = togglePasswordButton.querySelector('span');
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');
});

loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    var email = document.getElementById('email').value;
    var password = passwordInput.value;
    console.log("email: " + email);
    console.log("password: " + password);
    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user logged in:', cred.user)
            Swal.fire({
                icon: 'success',
                title: 'Giriş Başarılı!',
                text: 'Kafe yönetim sayfasına yönlendiriliyorsunuz.',
                timer: 1500,
                timerProgressBar: true
            }).then(() => {
                window.location.href = "/CafeManagement/Index";
            });
        })
        .catch(err => {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Giriş Başarısız!',
                text: 'Lütfen e-posta ve şifrenizi kontrol edip tekrar deneyin.'
            });
        });
});