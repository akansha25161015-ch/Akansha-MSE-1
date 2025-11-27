const display = document.getElementById("display");
const keys = document.querySelectorAll(".key");

let expression = "";

keys.forEach(key => {
  key.addEventListener("click", () => {
    const value = key.dataset.value;
    const action = key.dataset.action;

    if (action === "clear") {
      expression = "";
      display.textContent = "0";
      return;
    }

    if (action === "back") {
      expression = expression.slice(0, -1);
      display.textContent = expression || "0";
      return;
    }

    if (action === "equals") {
      try {
        expression = eval(expression).toString();
        display.textContent = expression;
      } catch {
        display.textContent = "Error";
      }
      return;
    }

    if (value) {
      expression += value;
      display.textContent = expression;
    }
  });
});