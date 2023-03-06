const prompt = require("prompt-sync")();


// Slot Global Variables

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
    ROSE: 2,
    BEE: 4,
    BRANCH: 6,
    LEAF: 8
}

const SYMBOLS_VALUES = {
    ROSE: 10,
    BEE: 7.5,
    BRANCH: 5,
    LEAF: 2.5
}

// BEGIN 

const deposit = () => {
    while (true) {
    const depositAmount = prompt("How much money do you want to deposit?: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Please enter a valid number !!");
    } else {
        return numberDepositAmount;
}
}
};




const getLinesBet = () => {
    while (true) {
    const lines = prompt("How many lines do you want to bet on? 1,2 or 3?: ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        console.log("Please pick a line number between 1 & 3 !!");
    } else {
        return numberOfLines;
}
}
};




const getBetAmount = (playerBalance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const betAmount = parseFloat(bet);
    
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > playerBalance / lines) {
            console.log("BET INVALID !!");
        } else {
            return betAmount;
    }
 }
};



const spinWheel = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i < COLUMNS; i++) {
        reels.push([]);
        const wheelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * wheelSymbols.length);
            const selectedSymbol = wheelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            wheelSymbols.splice(randomIndex, 1);
        }   
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLUMNS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
  };
  
  const printRows = (rows) => {
    for (const row of rows) {
      let rowString = "";
      for (const [i, symbol] of row.entries()) {
        rowString += symbol;
        if (i != row.length - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
    }
  };



  const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allMatch = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allMatch = false;
                break;
            }
        }

        if (allMatch) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
}

return winnings;

};


const game = () => {
  


while (true) {
    console.log("Welcome to the SLOTS OF SLOTS!");
    let playerBalance = deposit();
    console.log("You have " + playerBalance + "£ in your account.");

const numberOfLines = getLinesBet();
const bet = getBetAmount(playerBalance, numberOfLines);

playerBalance -= bet * numberOfLines;

const reels = spinWheel();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
playerBalance += winnings;
console.log(" YOU WON, " + winnings.toString()+ "£" + "       Your new total balance is " + parseInt((winnings+playerBalance), 10).toString() + "£");


if (playerBalance <= 0) {
    console.log("NO FUNDS REMAINING!!");
    break;
}

const replay = prompt("Would you like to play again? (y/n)? : ");

if (replay === "y") {
    console.log("New Game");
    game();
    } else if (replay === "n") {
        console.log("Thanks for playing!");
        break;
}
}
}

game();
