    const ROWS = 3;
    const COLS = 3;
    const SYMBOLS_COUNT = { A: 2, B: 4, C: 6, D: 8 };
    const SYMBOL_VALUES = { A: 5, B: 4, C: 3, D: 2 };
    let balance = 0;

    function startGame() {
      const depositInput = document.getElementById("deposit");
      const deposit = parseFloat(depositInput.value);
      if (isNaN(deposit) || deposit <= 0) {
        alert("Enter a valid deposit amount.");
        return;
      }
      balance = deposit;
      document.getElementById("output").textContent = `Balance: $${balance}`;
      document.getElementById("gameControls").classList.remove("d-none");
    }

    function playRound() {
      const lines = parseInt(document.getElementById("lines").value);
      const bet = parseFloat(document.getElementById("bet").value);
      const output = document.getElementById("output");

      if (isNaN(lines) || lines < 1 || lines > 3) {
        alert("Enter valid number of lines (1-3).");
        return;
      }
      if (isNaN(bet) || bet <= 0 || bet * lines > balance) {
        alert("Invalid bet amount.");
        return;
      }

      balance -= bet * lines;

      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);

      const winnings = getWinnings(rows, bet, lines);
      balance += winnings;

      output.textContent = `You won: $${winnings}\nNew balance: $${balance}`;

if (balance <= 0) {
  alert("You ran out of money!");
  if (confirm("Do you want to play again?")) {
    location.reload(); // restart game
  } else {
    document.getElementById("gameControls").classList.add("d-none");
  }
  return;
  
}

    function spin() {
      const symbols = [];
      for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
          symbols.push(symbol);
        }
      }

      const reels = [];
      for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
          const index = Math.floor(Math.random() * reelSymbols.length);
          const symbol = reelSymbols[index];
          reels[i].push(symbol);
          reelSymbols.splice(index, 1);
        }
      }
      return reels;
    }

    function transpose(reels) {
      const rows = [];
      for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
          rows[i].push(reels[j][i]);
        }
      }
      return rows;
    }

    function printRows(rows) {
      const reelsDiv = document.getElementById("reelsOutput");
      let output = "";
      for (const row of rows) {
        output += row.join(" | ") + "<br>";
      }
      reelsDiv.innerHTML = output;
    }

    function getWinnings(rows, bet, lines) {
      let winnings = 0;
      for (let i = 0; i < lines; i++) {
        const row = rows[i];
        if (row.every(s => s === row[0])) {
          winnings += bet * SYMBOL_VALUES[row[0]];
        }
      }
      return winnings;
    }
}
