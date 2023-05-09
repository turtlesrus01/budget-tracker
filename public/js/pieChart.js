//import chart.js
const { Chart } = require("../../node_modules/chart.js");

//fetch expenses from server
async function fetchData() {
  const expensesData = await fetch("/api/expenses", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).json();

  // Group the expenses by category
  const expensesByCategory = expensesData.reduce((acc, expense) => {
    if (acc[expense.category_id]) {
      acc[expense.category_id].amount += expense.amount;
    } else {
      acc[expense.category_id] = {
        amount: expense.amount,
        name: expense.Category.name,
        color: expense.Category.color,
      };
    }
    return acc;
  }, {});

  // Get the chart canvas element
  const chartCanvas = document.getElementById("expenses-chart");

  // Create the chart
  const expensesChart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels: Object.keys(expensesByCategory).map(
        (key) => expensesByCategory[key].name
      ),
      datasets: [
        {
          data: Object.keys(expensesByCategory).map(
            (key) => expensesByCategory[key].amount
          ),
          backgroundColor: Object.keys(expensesByCategory).map(
            (key) => expensesByCategory[key].color
          ),
        },
      ],
    },
  });
}
