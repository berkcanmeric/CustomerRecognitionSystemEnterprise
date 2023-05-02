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

        // Function to create and append a button to a table cell
        function createButtonAndAppendToCell(buttonText, buttonClass, cell, clickHandler) {
            const button = document.createElement("button");
            button.innerHTML = buttonText;
            button.classList.add(buttonClass);
            cell.appendChild(button);
            button.addEventListener("click", clickHandler);
        }

        // Function to open a modal and add a close button event listener
        function openModal(modalId) {
            console.log(`${modalId} modal opened`);
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
            const closeButton = modal.getElementsByClassName("close")[0];
            closeButton.removeEventListener("click", closeModal);
            closeButton.addEventListener("click", closeModal);

            function closeModal() {
                modal.style.display = "none";
            }
        }

        // Function to pre-fill the edit form with customer data and open the edit modal
        function openEditModal(docc, data) {
            console.log("Edit button clicked");
            const editForm = document.getElementById("edit-form");
            editForm.elements.name.value = data.name;
            editForm.elements.surname.value = data.surname;
            editForm.elements.email.value = data.email;
            editForm.elements.birthdate.value = data.birthdate;
            editForm.elements.photoUrl.value = data.photoUrl;
            editForm.dataset.docId = docc.id;
            openModal("edit-modal");
        }

        // Function to delete a customer data and reload the table data
        async function deleteCustomerData(docc) {
            console.log("Delete button clicked");
            try {
                await deleteDoc(doc(db, "User", docc.id));
                await getData();
            } catch (err) {
                console.error("Error deleting document:", err);
            }
        }

        // Function to open the add modal and reset the form fields
        function openAddModal() {
            console.log("Add button clicked");
            const addForm = document.getElementById("add-form");
            addForm.reset();
            openModal("add-modal");
        }

        // Loop through the query snapshot and append the customer data to the table
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
            img.classList.add("user-photo");
            photoCell.appendChild(img);

            createButtonAndAppendToCell("Edit", "edit-button", row.insertCell(), () => {
                openEditModal(docc, data);
            });

            createButtonAndAppendToCell("Delete", "delete-button", row.insertCell(), () => {
                deleteCustomerData(docc);
            });
        });

        // Replace the existing add button with a new one and add an event listener
        const oldAddButton = document.getElementById("add-button");
        const newAddButton = oldAddButton.cloneNode(true);
        oldAddButton.parentNode.replaceChild(newAddButton, oldAddButton);
        newAddButton.addEventListener("click", openAddModal);
        newAddButton.id = "add-button";

        // Clone and replace the existing edit form and add form
        const oldEditForm = document.getElementById("edit-form");
        const newEditForm = oldEditForm.cloneNode(true);
        oldEditForm.parentNode.replaceChild(newEditForm, oldEditForm);
        const oldAddForm = document.getElementById("add-form");
        const newAddForm = oldAddForm.cloneNode(true);
        oldAddForm.parentNode.replaceChild(newAddForm, oldAddForm);

        replaceForm(
            document.getElementById("edit-form"),
            newEditForm,
            "edit",
            submitEditForm
        );

        replaceForm(
            document.getElementById("add-form"),
            newAddForm,
            "add",
            submitAddForm
        );

        async function submitEditForm() {
            event.preventDefault();
            console.log("Edit form submitted");
            // Get the edited customer data from the form
            const editedData = {
                name: newEditForm.elements.name.value,
                surname: newEditForm.elements.surname.value,
                email: newEditForm.elements.email.value,
                birthdate: newEditForm.elements.birthdate.value,
                photoUrl: newEditForm.elements.photoUrl.value,
            };
            console.log("Edited customer data: ", editedData);
            const docId = newEditForm.dataset.docId;
            console.log("Document ID: ", docId);
            try {
                // Update the customer data in the Firestore database
                await updateDoc(doc(db, "User", docId), editedData);
                console.log("Customer data updated successfully");
                // Close the modal
                const modal = document.getElementById("edit-modal");
                modal.style.display = "none";
                // Reload the table data to show the updated customer info
                await getData();
                console.log("Table data reloaded");
            } catch (err) {
                console.error("Error updating document:", err);
            }
        }

        async function submitAddForm() {
            event.preventDefault();
            console.log("Add form submitted");
            // Get the new customer data from the form
            const newData = {
                name: newAddForm.elements.name.value,
                surname: newAddForm.elements.surname.value,
                email: newAddForm.elements.email.value,
                birthdate: newAddForm.elements.birthdate.value,
                photoUrl: newAddForm.elements.photoUrl.value,
            };
            console.log("New customer data: ", newData);

            // Check if a customer with the same email already exists
            const exists = await customerExists(newData.email);
            console.log("Customer exists: ", exists);
            if (exists) {
                // Display a message to inform the user that the customer already exists
                alert("A customer with this email already exists. Please enter a different email.");
            } else {
                try {
                    // Add the new customer data to the Firestore database
                    await addDoc(collection(db, "User"), newData);
                    console.log("New customer data added successfully");
                    // Close the modal
                    const modal = document.getElementById("add-modal");
                    modal.style.display = "none";
                    // Reload the table data to show the updated customer info
                    await getData();
                    console.log("Table data reloaded");
                } catch (err) {
                    console.error("Error adding document:", err);
                }
            }
        }

        function replaceForm(oldForm, newForm, formType, submitCallback) {
            // Clone the old form and remove event listeners
            const clonedForm = oldForm.cloneNode(true);
            oldForm.parentNode.replaceChild(clonedForm, oldForm);

            // Add a new event listener to the new form
            newForm.addEventListener("submit", submitCallback);

            // Replace the cloned form with the new, fully-functional form
            newForm.id = formType + "-form";
            clonedForm.parentNode.replaceChild(newForm, clonedForm);
        }
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