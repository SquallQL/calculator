const totalDisplayElt = document.querySelector("#total-display");
totalDisplayElt.innerHTML = 0;

const inputElts = document.querySelectorAll(".calculator-input");
const historyElt = document.querySelector("#history-display");

let history = [];

let total = 0;
let newOperationSelected = false;
let prevOperation = null;
let isEqualPressed = false;

inputElts.forEach(elt => {
  elt.addEventListener("click", () => {
    totalDisplayElt.scrollLeft = totalDisplayElt.scrollWidth;

    // If a number or a dot, we are still building a new number
    if (elt.value.match("[0-9]+") || elt.innerHTML === ".") {
      // If Equal was pressed and followed by a number,
      // We should assume we are starting a new set of operations.
      if (isEqualPressed) {
        clear();
        isEqualPressed = false;
      }
      // If the default value is still 0 or if an operation was set
      // replace the value with new input .
      if (totalDisplayElt.innerHTML === "0" || newOperationSelected) {
        if (elt.innerHTML === ".") {
          totalDisplayElt.innerHTML = `0${elt.innerHTML}`;
        } else {
          totalDisplayElt.innerHTML = elt.innerHTML;
        }
        newOperationSelected = false;
      } else {
        totalDisplayElt.innerHTML += elt.innerHTML;
      }
    }
    // Otherwise we are calling an operation
    else {
      // Operations to be applied right away
      if (elt.value === "clear") {
        clear();
      } else {
        const totalEltValue = Number(totalDisplayElt.innerHTML);

        flickerTotalInput(totalEltValue);

        // Operations to be applied to the calculator with a delay of one operation
        // If newNumber is ready, it means one operation is already selectioned.
        if (!newOperationSelected) {
          !isEqualPressed && history.push(totalEltValue);
          history.push(elt.value);

          switch (prevOperation) {
            case null:
              total = totalEltValue;
              break;

            case "+":
              total += totalEltValue;
              break;

            case "-":
              total -= totalEltValue;
              break;

            case "*":
              total *= totalEltValue;
              break;

            case "/":
              total /= totalEltValue;
              break;
          }
        } else if (!isEqualPressed) {
          history[history.length - 1] = elt.value;
        }

        // If operation was =, then we display the total
        // after all operations are applied
        if (elt.value === "=" && prevOperation !== "=") {
          history.push(total);
          flickerTotalInput(total);
          isEqualPressed = true;
        } else {
          isEqualPressed = false;
          newOperationSelected = true;
        }

        prevOperation = elt.value;
      }
    }

    historyElt.innerHTML = history.join(" ");
    historyElt.scrollLeft = historyElt.scrollWidth;

  });

  function clear() {
    total = 0;
    totalDisplayElt.innerHTML = total;
    prevOperation = null;
    history = [];
  }

  function flickerTotalInput(newValue) {
    totalDisplayElt.innerHTML = "";

    window.setTimeout(() => {
      totalDisplayElt.innerHTML = newValue;
    }, 20);
  }
});
