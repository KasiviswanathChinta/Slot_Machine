const prompt = require('prompt-sync')();
// by giving the parenthesis at end of above line of code we importing the package into the project.

const ROWS = 3;
const COLS = 3;

const symbolCount = {
    A:2,
    B:4,
    C:6,
    D:8
};

const symbolValues = {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit =  () => {
    while(true){
        const depositAmount =  prompt('Enter the deposit amount: ');
        const numberDepositAmount =  parseFloat(depositAmount);
        //parseFloat(): it is used to convert the string into a float.

        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log('Invaild deposit amount, try again.');
        }
        else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true){
        const lines =  prompt('Enter the number of lines to bet on (1-3): ');
        const numberOfLines =  parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines > 3){
            console.log('Invaild number of lines, try again.');
        }
        else{
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while(true){
        const bet =  prompt('Enter the Bet per the line: ');
        const numberBet =  parseFloat(bet);

        if(isNaN(numberBet) || numberBet<=0 || numberBet > (balance / lines)){
            console.log('Invaild Bet Amount, try again.');
        }
        else{
            return numberBet;
        }
  }
};

const spin = () => {

    const symbols = [];
    // getting the symbols from symbolscount and pushing the symbol variable in symbols array.
    for (const [symbol,count] of Object.entries(symbolCount)){
        for(let i = 0;i<count;i++){
            symbols.push(symbol);
        }
    }
    
    // getting the reels in columnwise result by creating a reels array and assigning the symbols array to reelsymbols variable, pushing symbols into the reels array.
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j =0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

// below code is used to converting the columnwise result into the rows.
const transpose = (reels) => {
    const rows  = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows
};

//then adding ' | ' between the symbols in each row and when last symbol in rows don n't have the '|'.

const printRows = (rows) => {
    for(const row of rows){
        let rowString = '';
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString += ' | ';
            }
        }
        console.log(rowString);
    }
};

const getWinnigs = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines ; row++){
        const symbols = rows[row];
        let allSame = true;

        //it is created symbol variable which is used to comaparing every symbols is same as first symbol then all symbols are same.

        for(const symbol of symbols) {
            if(symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        // if all symbols are same then we are calcuting winning price by bet and symbolvalue for the symbol present in first index.

        if(allSame) {
            winnings += bet * symbolValues[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let balance = deposit();
  
    while (true) {
      console.log("You have a balance of $" + balance);
      const numberOfLines = getNumberOfLines();
      const bet = getBet(balance, numberOfLines);
      balance -= bet * numberOfLines;
      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);
      const winnings = getWinnigs(rows, bet, numberOfLines);
      balance += winnings;
      console.log("You won, $" + winnings.toString());
  
      if (balance <= 0) {
        console.log("You ran out of money!");
        break;
      }
  
      const playAgain = prompt("Do you want to play again (y/n)? ");
  
      if (playAgain != "y") break;
    }
};
  
  game();

