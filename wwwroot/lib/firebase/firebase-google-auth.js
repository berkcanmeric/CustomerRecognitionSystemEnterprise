import app from "./firebase-config.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const auth = getAuth();
const googleSignInLink = document.getElementById('google-sign-in');
googleSignInLink.addEventListener('click', () => {
    // Call the signInWithPopup method with GoogleAuthProvider
    signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            // Display success message to the user using Swal
            Swal.fire({
                icon: 'success',
                title: 'Google Login successful!',
                text: 'You will now be redirected to the cafe management page.',
                timer: 1500,
                timerProgressBar: true
            }).then(() => {
                window.location.href = "/CafeManagement/Index";
            });
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        // Display error message to the user using Swal
        Swal.fire({
            icon: 'error',
            title: 'Google Login failed',
            text: 'Please try again later.'
        });
    });
});


