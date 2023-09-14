// Initialize totalPrimogems from local storage or default to 0
let totalPrimogems = parseInt(localStorage.getItem("totalPrimogems")) || 0;

// Initialize transactions from local storage or default to an empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Get references to HTML elements
const totalPrimogemsDisplay = document.getElementById("total-primogems");
const transactionList = document.getElementById("transaction-list");
const transactionAmountInput = document.getElementById("transaction-amount");
const addCollectedButton = document.getElementById("add-collected");
const addSpentButton = document.getElementById("add-spent");
const wipeDataButton = document.getElementById("wipe-data");

// Function to update the total primogems display
function updateTotal() {
    totalPrimogemsDisplay.textContent = totalPrimogems;
}

// Function to display transactions in the history
function displayTransactions() {
    transactionList.innerHTML = "";
    transactions.forEach((transaction, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type === "collected" ? "Collected" : "Spent"} ${transaction.amount} primogems`;
        listItem.addEventListener("click", () => removeTransaction(index));
        transactionList.appendChild(listItem);
    });
}

// Function to save totalPrimogems to local storage
function saveTotal() {
    localStorage.setItem("totalPrimogems", totalPrimogems);
}

// Function to save transactions to local storage
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to add a transaction
function addTransaction(type, amount) {
    if (amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    let error = false;

    if (type === "spent" && amount > totalPrimogems) {
        alert("You can't remove more primogems than you have in total.");
        error = true;
    }

    if (!error) {
        transactions.push({ type, amount });
        saveTransactions();

        if (type === "collected") {
            totalPrimogems += amount;
        } else {
            totalPrimogems -= amount;
        }

        saveTotal();
        updateTotal();
        displayTransactions();
    }
}

// Function to remove a transaction
function removeTransaction(index) {
    if (index < 0 || index >= transactions.length) {
        return; // Invalid index
    }

    const transaction = transactions[index];

    if (transaction.type === "spent" && transaction.amount > totalPrimogems) {
        alert("You can't remove more primogems than you have in total.");
        return;
    }

    if (transaction.type === "collected") {
        totalPrimogems -= transaction.amount;
    } else {
        totalPrimogems += transaction.amount;
    }

    transactions.splice(index, 1);
    saveTransactions();
    saveTotal();
    updateTotal();
    displayTransactions();
}

// Event listener for the "Add Collected" button
addCollectedButton.addEventListener("click", () => {
    const amount = parseInt(transactionAmountInput.value);
    addTransaction("collected", amount);
    transactionAmountInput.value = "";
});

// Event listener for the "Add Spent" button
addSpentButton.addEventListener("click", () => {
    const amount = parseInt(transactionAmountInput.value);
    addTransaction("spent", amount);
    transactionAmountInput.value = "";
});

// Event listener for the "Wipe All Data" button
wipeDataButton.addEventListener("click", () => {
    localStorage.removeItem("totalPrimogems");
    localStorage.removeItem("transactions");
    totalPrimogems = 0;
    transactions = [];
    updateTotal();
    displayTransactions();
});

// Initial setup
updateTotal();
displayTransactions();