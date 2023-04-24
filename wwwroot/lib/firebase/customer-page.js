// Import Firebase libraries
import app from "./firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    query,
    where,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore(app);

// Get a reference to the Firestore collection
const usersRef = collection(db, "User");

// Get a reference to the table element
const table = document.getElementById("customer-table");

// Add the table headers
const headerRow = table.insertRow();
headerRow.insertCell().textContent = "Name";
headerRow.insertCell().textContent = "Surname";
headerRow.insertCell().textContent = "Email";
headerRow.insertCell().textContent = "Birthdate";
headerRow.insertCell().textContent = "Photo";
headerRow.insertCell(); // Empty cell for the edit button
headerRow.insertCell(); // Empty cell for the delete button

async function getData() {
    try {
        const querySnapshot = await getDocs(usersRef);

        // Clear the table before adding new data (except for the headers)
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Loop through each document and create a table row
        querySnapshot.forEach((docc) => {
            const data = docc.data();
            const row = table.insertRow();
            row.insertCell().textContent = data.name;
            row.insertCell().textContent = data.surname;
            row.insertCell().textContent = data.email;
            row.insertCell().textContent = data.birthdate;
            const photoCell = row.insertCell();
            const img = document.createElement("img");
            img.src = data.photoUrl;
            img.alt = "User Photo";
            img.classList.add("user-photo"); // Apply the user-photo class to the img element
            photoCell.appendChild(img);

            const editButton = document.createElement("button");
            editButton.innerHTML = '<i class="fas fa-edit"></i>Edit';
            editButton.classList.add("edit-button");
            const editCell = row.insertCell();
            editCell.appendChild(editButton);

            // Add an event listener to the edit button to open the modal
            editButton.addEventListener("click", () => {
                // Get a reference to the edit form in the modal
                const editForm = document.getElementById("edit-form");

                // Pre-fill the form fields with the customer data
                editForm.elements.name.value = data.name;
                editForm.elements.surname.value = data.surname;
                editForm.elements.email.value = data.email;
                editForm.elements.birthdate.value = data.birthdate;
                editForm.elements.photoUrl.value = data.photoUrl;

                // Set the doc ID as a data attribute on the form
                editForm.dataset.docId = docc.id;

                // Show the modal
                const modal = document.getElementById("edit-modal");
                modal.style.display = "block";

                // Add an event listener to the close button in the modal to close it
                const closeButton = document.getElementsByClassName("close")[0];
                closeButton.removeEventListener("click", closeModal);

                // Add a new event listener to the close button in the modal to close it
                closeButton.addEventListener("click", closeModal);

                function closeModal() {
                    modal.style.display = "none";
                }
            });
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>Delete';
            deleteButton.classList.add("delete-button");
            const deleteCell = row.insertCell();
            deleteCell.appendChild(deleteButton);

            // Add an event listener to the delete button to delete the customer data
            deleteButton.addEventListener("click", async () => {
                try {
                    await deleteDoc(doc(db, "User", docc.id));
                    await getData(); // Reload the table data to show the updated customer info
                } catch (err) {
                    console.error("Error deleting document:", err);
                }
            });
        });
        const addCustomerButton = document.getElementById("add-button");
        addCustomerButton.removeEventListener("click", openAddModal); // Remove the previous event listener
        addCustomerButton.addEventListener("click", openAddModal); // Add a new event listener

        function openAddModal() {
            // Get a reference to the add form in the modal
            const addForm = document.getElementById("add-form");

            // Reset the form fields
            addForm.reset();

            // Show the modal
            const modal = document.getElementById("add-modal");
            modal.style.display = "block";

            // Remove the previous event listener for the close button
            const closeButton = document.getElementsByClassName("close")[1];
            closeButton.removeEventListener("click", closeModal);

            // Add a new event listener to the close button in the modal to close it
            closeButton.addEventListener("click", closeModal);

            function closeModal() {
                modal.style.display = "none";
            }
        }

        // Add an event listener to the edit form to handle the form submission
        const editForm = document.getElementById("edit-form");
        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            // Get the edited customer data from the form
            const editedData = {
                name: editForm.elements.name.value,
                surname: editForm.elements.surname.value,
                email: editForm.elements.email.value,
                birthdate: editForm.elements.birthdate.value,
                photoUrl: editForm.elements.photoUrl.value,
            };
            const docId = editForm.dataset.docId;
            try {
                // Update the customer data in the Firestore database
                await updateDoc(doc(db, "User", docId), editedData);
                // Close the modal
                const modal = document.getElementById("edit-modal");
                modal.style.display = "none";
                // Reload the table data to show the updated customer info
                await getData();
            } catch (err) {
                console.error("Error updating document:", err);
            }
        });
        const addForm = document.getElementById("add-form");
        addForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            // Get the new customer data from the form
            const newData = {
                name: addForm.elements.name.value,
                surname: addForm.elements.surname.value,
                email: addForm.elements.email.value,
                birthdate: addForm.elements.birthdate.value,
                photoUrl: addForm.elements.photoUrl.value,
            };

            // Check if a customer with the same email already exists
            const exists = await customerExists(newData.email);
            if (exists) {
                // Display a message to inform the user that the customer already exists
                alert("A customer with this email already exists. Please enter a different email.");
            } else {
                try {
                    // Add the new customer data to the Firestore database
                    await addDoc(collection(db, "User"), newData);
                    // Close the modal
                    const modal = document.getElementById("add-modal");
                    modal.style.display = "none";
                    // Reload the table data to show the updated customer info
                    await getData();
                } catch (err) {
                    console.error("Error adding document:", err);
                }
            }
        });
    } catch (err) {
        console.error("Error getting documents:", err);
    }
}

async function customerExists(email) {
    const querySnapshot = await getDocs(query(usersRef, where('email', '==', email)));
    return !querySnapshot.empty;
}

// Call the getData function to load the initial table data
getData();