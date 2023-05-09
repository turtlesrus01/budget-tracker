const loginFormHandler = async (event) => {
    event.preventDefault();

        const amount = document.querySelector("amountInput").value;
        const user_id = document.querySelector("userIdInput").value;
        const category_id = document.querySelector("categoryIdInput").value;
      
        const response = await fetch("/api/users/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount, user_id, category_id }),
        });
      
        if (response.ok) {
          const expense = await response.json();
          console.log("New expense created:", expense);
        } else {
          console.error("Failed to create expense:", response.status);
        }
      }
      
      // Function to get all expenses
      async function getAllExpenses() {
        const response = await fetch("api/users/expenses");
      
        if (response.ok) {
          const expenses = await response.json();
          console.log("All expenses:", expenses);
        } else {
          console.error("Failed to get expenses:", response.status);
        }
      }
      
      // Function to delete an expense
      async function deleteExpense(expenseId) {
        const response = await fetch(`/api/users/expenses/${expenseId}`, {
          method: "DELETE",
        });
      
        if (response.ok) {
          console.log("Expense deleted");
        } else {
          console.error("Failed to delete expense:", response.status);
        }
      }