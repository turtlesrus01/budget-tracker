//import chart.js
//const { Chart } = require("../../node_modules/chart.js");
//const { Chart } = await import('chart.js');

//fetch expenses from server
(async function () {
  
  const response = await fetch("/expenses");
  console.log(response);
  const expensesData = await response.json();
  console.log("Response"+expensesData);

  //group the expenses by category
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

  //get the chart canvas element
  const chartCanvas = document.getElementById("expenses-chart");

  //create the chart
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
})();
