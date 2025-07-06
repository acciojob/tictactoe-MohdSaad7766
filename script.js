document.getElementById("calculateBtn").addEventListener("click", () => {
  const priceElements = document.querySelectorAll(".price");
  let total = 0;

  priceElements.forEach(priceEl => {
    const value = Number(priceEl.textContent.trim());
    if (!isNaN(value)) total += value;
  });

  const table = document.querySelector("table");

  // Remove existing total row if present
  const oldAns = document.getElementById("ans");
  if (oldAns) oldAns.parentElement.remove();

  const newRow = document.createElement("tr");
  const newCell = document.createElement("td");

  newCell.colSpan = 2;
  newCell.id = "ans";
  newCell.textContent = `Total Price: Rs ${total}`;
  newCell.style.fontWeight = "bold";
  newCell.style.textAlign = "right";

  newRow.appendChild(newCell);
  table.appendChild(newRow);
});
