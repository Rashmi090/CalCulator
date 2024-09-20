let inputValue = document.getElementById("user-input");
let currentExpression = ""; // This will hold the current input/expression

// Add event listener to number buttons
document.querySelectorAll(".number").forEach(function (item) {
  item.addEventListener("click", function (e) {
    // Replace '0' with the clicked number, otherwise append the number
    if (inputValue.innerText === "0" && e.target.innerHTML !== ".") {
      inputValue.innerText = e.target.innerHTML.trim();
      currentExpression = inputValue.innerText;
    } else {
      inputValue.innerText += e.target.innerHTML.trim();
      currentExpression += e.target.innerHTML.trim();
    }
  });
});

// Add event listener to operation buttons
document.querySelectorAll(".operations").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const operator = e.target.innerHTML.trim();
    const lastChar = currentExpression.slice(-1);

    // Handle 'AC' (All Clear)
    if (operator === "AC") {
      inputValue.innerText = "0";
      currentExpression = "";
    } 
    // Handle 'DEL' (Delete Last Character)
    else if (operator === "DEL") {
      currentExpression = currentExpression.slice(0, -1);
      inputValue.innerText = currentExpression || "0";
    } 
    // Handle '=' (Evaluate Expression)
    else if (operator === "=") {
      try {
        const result = eval(currentExpression); // Safely evaluate the expression
        inputValue.innerText = result;
        currentExpression = result.toString();
      } catch (error) {
        inputValue.innerText = "Error";
        currentExpression = "";
      }
    } 
    // Prevent operators from being duplicated (e.g., '++' or '*/')
    else if (!isNaN(lastChar) || operator === "%") {
      currentExpression += operator;
      inputValue.innerText = currentExpression;
    }
  });
});
