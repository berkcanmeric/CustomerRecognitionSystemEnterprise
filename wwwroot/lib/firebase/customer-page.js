// Import Firebase libraries
import app from "./firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore(app);

// Get a reference to the Firestore collection
const usersRef = collection(db, "User");

async function getData() {
    try {
        const querySnapshot = await getDocs(usersRef);

        // Get a reference to the table element
        const table = document.getElementById("customer-table");

        // Loop through each document and create a table row
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = table.insertRow();
            row.insertCell().textContent = data.name;
            row.insertCell().textContent = data.surname;
            row.insertCell().textContent = data.email;
            row.insertCell().textContent = data.birthdate;
            const img = document.createElement("img");
            img.src = data.photoUrl;
            img.alt = "User Photo";
            img.classList.add("user-photo"); // Apply the user-photo class to the img element
            row.insertCell().appendChild(img);
        });
    } catch (err) {
        console.error("Error getting documents:", err);
    }
}

getData();