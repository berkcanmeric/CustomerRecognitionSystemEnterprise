
// Import the functions you need from the SDKs you need
import app from "./firebase-config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";



const auth = getAuth();
const database = getDatabase(app);

submitData.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user created successfully');

                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });
});
signInButton.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    // log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user logged in successfully');

                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
   
});
signOutButton.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
});
 

  


