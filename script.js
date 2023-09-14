// Get references to HTML elements
const collectedInput = document.getElementById("collected");
const spentInput = document.getElementById("spent");
const addCollectedBtn = document.getElementById("addCollected");
const addSpentBtn = document.getElementById("addSpent");
const totalDisplay = document.getElementById("total");
const historyList = document.getElementById("history");

// Initialize total primogems
let totalPrimogems = 0;

// Load transaction history from local storage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Function to update the total primogems display
function updateTotal() {
    totalDisplay.textContent = totalPrimogems;
}

// Function to add a transaction
function addTransaction(amount, type) {
    const transaction = { amount, type, timestamp: new Date().toLocaleString() };
    transactions.unshift(transaction); // Add to the beginning of the array
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Update total and history display
    if (type === "collected") {
        totalPrimogems += amount;
    } else {
        totalPrimogems -= amount;
    }
    updateTotal();
    displayTransactions();
}

// Function to display transaction history
function displayTransactions() {
    historyList.innerHTML = "";
    transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ${transaction.amount} (${transaction.timestamp})`;
        historyList.appendChild(listItem);
    });
}

// Event listeners for adding transactions
addCollectedBtn.addEventListener("click", () => {
    const amount = parseInt(collectedInput.value);
    if (!isNaN(amount) && amount > 0) {
        addTransaction(amount, "collected");
        collectedInput.value = ""; // Clear the input field
    }
});

addSpentBtn.addEventListener("click", () => {
    const amount = parseInt(spentInput.value);
    if (!isNaN(amount) && amount > 0) {
        addTransaction(amount, "spent");
        spentInput.value = ""; // Clear the input field
    }
});

// Initial display
updateTotal();
displayTransactions();
