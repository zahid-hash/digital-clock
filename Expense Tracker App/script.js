// DOM elements
const amountInput = document.getElementById("amount");
const descInput = document.getElementById("description");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("addTransaction");
const transactionList = document.getElementById("transactionList");
const balanceDisplay = document.getElementById("balance");

// Get data from localStorage or start with empty
let transaction = JSON.parse(localStorage.getItem("transaction")) || [];

// Show transactions on page load
renderTransaction();
updateBalane();

// Add button click
addBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value.trim());
    const description = descInput.value.trim();
    const type = typeInput.value;

    if (amount && description) {
        const newTransaction = {
            id: Date.now(),
            amount: type === "expense" ? -amount : amount,
            description,
            type
        };
        transaction.push(newTransaction);
        saveAndRender();
        clearInput();
    }
});

// Clear input fields
function clearInput() {
    amountInput.value = "";
    descInput.value = "";
    typeInput.value = "income";
}

// Delete transaction
function deleteTRansaction(id) {
    transaction = transaction.filter(t => t.id !== id);
    saveAndRender();
}

// Save to localStorage + render
function saveAndRender() {
    localStorage.setItem("transaction", JSON.stringify(transaction));
    renderTransaction();
    updateBalane();
}

// Render transaction list
function renderTransaction() {
    transactionList.innerHTML = "";
    transaction.forEach(t => {
        const li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-center ${t.type}`;
        li.innerHTML = `
            <div>
                <strong>${t.description}</strong> <br/>
                <small>${t.amount < 0 ? "Expense" : "Income"}: Rs.${Math.abs(t.amount)}</small>
            </div>
            <button class="btn btn-sm btn-danger" onclick="deleteTRansaction(${t.id})">🗑️</button>
        `;
        transactionList.appendChild(li);
    });
}

// Update balance
function updateBalane() {
    const total = transaction.reduce((sum, t) => sum + t.amount, 0);
    balanceDisplay.textContent = `Rs.${total}`;
    balanceDisplay.style.color = total >= 0 ? "green" : "red";
}
