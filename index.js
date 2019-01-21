const totalDisplayElt = document.querySelector("#total-display");
totalDisplayElt.defaultValue = 0;

const inputElts = document.querySelectorAll(".calculator-input");

// Alway keep track of the total
let total = 0;
let newNumberReady = false;
let prevOperation = null;

inputElts.forEach(elt => {
  elt.addEventListener("click", () => {
      
    // If a number or a dot, we are still building a new number
    if (elt.value.match("[0-9]+") || elt.value === ".") {
      // If the default value is still 0, replace the value with
      // new input or if an operation was set.
      if (totalDisplayElt.value === "0" || newNumberReady) {
        totalDisplayElt.value = elt.value;
        newNumberReady = false;
      } else {
        totalDisplayElt.value += elt.value;
      }
    }
    // Otherwise we are calling an operation
    else {
        // Operations to be aapplied right away
      if (elt.value === "clear") {
        total = 0;
        totalDisplayElt.value = total;
        prevOperation = null;
      } else {
        // Operations to be applied to the calculator with a delay of one operation
        switch (prevOperation) {
          case null:
            total = Number(totalDisplayElt.value);
            break;

          case "add":
            total += Number(totalDisplayElt.value);
            break;

          case "minus":
            total -= Number(totalDisplayElt.value);
            break;

          case "multiply":
            total *= Number(totalDisplayElt.value);
            break;

          case "divide":
            total /= Number(totalDisplayElt.value);
            break;
        }

        newNumberReady = true;
        prevOperation = elt.value;
        
        if(elt.value === "equal"){
            totalDisplayElt.value = total;
        }
      }
    }
  });
});
