// Initialize empty score arrays for both players
let player1Score = [];
let player2Score = [];
// Initialize empty dice arrays for both players
let player1Dice = [];
let player2Dice = [];
// Initialize roll and round counts
let rollCount = 0;
let roundCount = 0;
// Initialize the currently selected scoring row
let onlyPossibleRow = "blank";
// Initialize a flag to track the use of the Joker card
let jokerCard = false;
// Initialize a flag to determine the current player's turn
let isPlayerOneTurn = true;
// Define transformation values for dice animation
let transformValues = [[0, 30], [-5, 40], [0, 35], [5, 40], [0, 30]];
// Get references to player containers, dice elements, and the roll button
const player1Container = document.getElementById("player1Container");
const player2Container = document.getElementById("player2Container");
const diceElements = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll");
// Get references to all HTML elements with the class "cell"
const scoreTableCells = document.querySelectorAll(".cell");
// Add a click event listener to the roll button
rollButton.addEventListener("click", rollDice);
// Initialize a roll sound
let rollSound = new Audio("roll.wav");


// Function to roll the dice
function rollDice() {
    rollCount++; // Increment the roll count
    let diceArr = [1, 2, 3, 4, 5]; // Array to represent each of the 5 dice
    let randomDice = []; // Initialize an array to store random dice values
  
    // Generate random dice values for each of the 5 dice
    for (let i = 0; i < diceArr.length; i++) {
      randomDice.push(Math.floor(Math.random() * 6) + 1);
    }
  
    // Get references to HTML elements
    const playArea = document.getElementById("playArea");
    const diceContainer = document.getElementById("player1Container");
  
    // Get the number of dice in the container
    let numDice = diceContainer.children.length;
    let counter = 0;
  
    // Iterate through each dice element
    diceElements.forEach(function (diceElement, index) {
      // Check if the dice is active or if it's the first roll
      if (diceElement.classList.contains("active") || rollCount == 1) {
        resetDicePositions(); // Reset dice positions
  
        const x = transformValues[index][0];
        const y = transformValues[index][1];
  
        // Set a timeout for the dice animation
        setTimeout(function () {
          counter++;
          changeDiePosition(diceElement, x, y);
          changeDiceFaces(randomDice);
  
          if (counter == 1) {
            if (isPlayerOneTurn) writeTempValuesInScoreTable(player1Dice);
            else writeTempValuesInScoreTable(player2Dice);
          }
  
          // Disable the roll button after 3 rolls and play a roll sound
          if (rollCount == 3) {
            rollButton.disabled = true;
            rollButton.style.opacity = 0.5;
          }
          rollSound.play();
        }, 500);
      }
    });
  }

// Function to reset dice positions
function resetDicePositions() {
    // Iterate through all dice elements and reset their transformation
    diceElements.forEach(function (diceElement) {
      diceElement.style.transform = "none";
    });
  }
  
  // Function to change the position and rotation of a die
  function changeDiePosition(diceElement, x, y) {
    let angle = 135 * Math.floor(Math.random() * 10);
    let diceRollDirection = -1;
  
    // Change the dice roll direction based on the player's turn
    if (!isPlayerOneTurn) {
      diceRollDirection = 1;
    }
  
    angle = 135 * Math.floor(Math.random() * 10);
    diceElement.style.transform =
      "translateX(" +
      x + "vw) translateY(" + diceRollDirection * y +
      "vh) rotate(" + angle + "deg)";
  }
  
  // Function to change the faces of the dice based on random values
  function changeDiceFaces(randomDice) {
    for (let i = 0; i < diceElements.length; i++) {
      // Add the "active" class to the dice if it's the first roll
      if (rollCount === 1) {
        diceElements[i].classList.add("active");
      }
  
      // Check if the dice is "active"
      if (diceElements[i].classList.contains("active")) {
        // Store the dice value in the appropriate player's dice array
        if (isPlayerOneTurn) {
          player1Dice[i] = randomDice[i];
        } else {
          player2Dice[i] = randomDice[i];
        }
  
        // Get the dice face element and change its source to match the random value
        let face = diceElements[i].getElementsByClassName("face")[0];
        face.src = "dice" + randomDice[i] + ".png";
      }
    }
  }
  
  // Function to reset the faces and "active" status of the dice
  function resetDiceFaces() {
    for (let i = 0; i < diceElements.length; i++) {
      let face = diceElements[i].getElementsByClassName("face")[0];
      diceElements[i].classList.remove("active");
      let diceNumber = i + 1;
      face.src = "dice" + diceNumber + ".png";
    }
  }
  
// Add event listeners to dice elements
diceElements.forEach(function (diceElement, index) {
    diceElement.addEventListener("click", function () {
      // Prevent dice selection if it's the first roll
      if (rollCount === 0) return;
  
      // Toggle the "active" class for the selected dice
      diceElement.classList.toggle("active");
  
      // Reset the dice transformation if it's not active, or change its position
      if (!diceElement.classList.contains("active")) {
        diceElement.style.transform = "none";
      } else {
        const diceNumber = diceElement.id.charAt(3);
        const x = transformValues[diceNumber - 1][0];
        const y = transformValues[diceNumber - 1][1];
        changeDiePosition(diceElement, x, y);
      }
    });
  });
  
// Function to write temporary values in the score table
function writeTempValuesInScoreTable(dice) {
    let scoreTable = [];
    scoreTable = player1Score.slice();
    let playerNumber = 1;
  
    // Check the player's turn
    if (!isPlayerOneTurn) {
      scoreTable = [];
      playerNumber = 2;
      scoreTable = player2Score.slice();
    }
  
    // used to track whether a joker card is available
    let jokerCard = false;
    // is set to "blank" by default and is used to identify the only possible row for scoring.
    let onlyPossibleRow = "blank";
    // is calculated using the calculateYahtzee function.
    let yahtzeeScore = calculateYahtzee(dice);
    // is a reference to the Yahtzee cell in the score table.
    const yahtzeeElement = document.querySelector("#yahtzee" + playerNumber);
  
    // The code then checks whether the Yahtzee row in the score table is empty 
    if (scoreTable[12] === undefined) {
      yahtzeeElement.innerHTML = yahtzeeScore;

    } else if (yahtzeeScore > 0 && scoreTable[12]) {
      yahtzeeScore = parseInt(yahtzeeElement.innerHTML) + 100;
      yahtzeeElement.innerHTML = yahtzeeScore;
    }
  
    if (yahtzeeScore > 0 && scoreTable[dice[0] - 1] !== undefined && scoreTable[12] !== undefined) {
      jokerCard = true;
    }
  
    if (yahtzeeScore > 0 && scoreTable[dice[0] - 1] === undefined && scoreTable[12] !== undefined) {
      onlyPossibleRow = dice[0];
      writeTempValueOnOnlyPossibleRaw(dice, playerNumber);
      return;
    }

  //------------------------------------------------------------
  
  // Check if the Ones row in the score table is available
if (scoreTable[0] === undefined) {
    // Calculate the score for Ones category
    let onesScore = calculateOnes(dice);
    // Update the Ones cell in the score table for the current player
    document.getElementById("ones" + playerNumber).innerHTML = onesScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Twos row in the score table is available
  if (scoreTable[1] === undefined) {
    // Calculate the score for Twos category
    let twosScore = calculateTwos(dice);
    // Update the Twos cell in the score table for the current player
    document.getElementById("twos" + playerNumber).innerHTML = twosScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Threes row in the score table is available
  if (scoreTable[2] === undefined) {
    // Calculate the score for Threes category
    let threesScore = calculateThrees(dice);
    // Update the Threes cell in the score table for the current player
    document.getElementById("threes" + playerNumber).innerHTML = threesScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Fours row in the score table is available
  if (scoreTable[3] === undefined) {
    // Calculate the score for Fours category
    let foursScore = calculateFours(dice);
    // Update the Fours cell in the score table for the current player
    document.getElementById("fours" + playerNumber).innerHTML = foursScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Fives row in the score table is available
  if (scoreTable[4] === undefined) {
    // Calculate the score for Fives category
    let fivesScore = calculateFives(dice);
    // Update the Fives cell in the score table for the current player
    document.getElementById("fives" + playerNumber).innerHTML = fivesScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Sixes row in the score table is available
  if (scoreTable[5] === undefined) {
    // Calculate the score for Sixes category
    let sixesScore = calculateSixes(dice);
    // Update the Sixes cell in the score table for the current player
    document.getElementById("sixes" + playerNumber).innerHTML = sixesScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Three of a Kind row in the score table is available
  if (scoreTable[6] === undefined) {
    // Calculate the score for Three of a Kind category
    let threeOfAKindScore = calculateThreeOfAKind(dice);
    // Update the Three of a Kind cell in the score table for the current player
    document.getElementById("threeOfAKind" + playerNumber).innerHTML = threeOfAKindScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Four of a Kind row in the score table is available
  if (scoreTable[7] === undefined) {
    // Calculate the score for Four of a Kind category
    let fourOfAKindScore = calculateFourOfAKind(dice);
    // Update the Four of a Kind cell in the score table for the current player
    document.getElementById("fourOfAKind" + playerNumber).innerHTML = fourOfAKindScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Full House row in the score table is available
  if (scoreTable[8] === undefined) {
    // Calculate the score for Full House category
    let fullHouseScore = calculateFullHouse(dice);
    // Update the Full House cell in the score table for the current player
    document.getElementById("fullHouse" + playerNumber).innerHTML = fullHouseScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Small Straight row in the score table is available
  if (scoreTable[9] === undefined) {
    // Calculate the score for Small Straight category, considering the joker card
    let smallStraightScore = jokerCard ? 30 : calculateSmallStraight(dice);
    // Update the Small Straight cell in the score table for the current player
    document.getElementById("smallStraight" + playerNumber).innerHTML = smallStraightScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Large Straight row in the score table is available
  if (scoreTable[10] === undefined) {
    // Calculate the score for Large Straight category, considering the joker card
    let largeStraightScore = jokerCard ? 40 : calculateLargeStraight(dice);
    // Update the Large Straight cell in the score table for the current player
    document.getElementById("largeStraight" + playerNumber).innerHTML = largeStraightScore;
    document.getElementById(scoreTable);
  }
  
  // Check if the Chance row in the score table is available
  if (scoreTable[11] === undefined) {
    // Calculate the score for Chance category
    let chanceScore = calculateChance(dice);
    // Update the Chance cell in the score table for the current player
    document.getElementById("chance" + playerNumber).innerHTML = chanceScore;
    document.getElementById(scoreTable);
  }
  
function writeTempValueOnOnlyPossibleRaw(dice,playerNumber) {
  if(dice[0]==1) {
    // Calculate the score for Ones and update the corresponding cell in the score table
    let score=calculateOnes(dice);
    document.getElementById("ones"+playerNumber).innerHTML=score;
  }
  if(dice[0]==2) {
    // Calculate the score for Twos and update the corresponding cell in the score table
    let score=calculateTwos(dice);
    document.getElementById("twos"+playerNumber).innerHTML=score;
  }
  if(dice[0]==3) {
    // Calculate the score for Threes and update the corresponding cell in the score table
    let score=calculateThrees(dice);
    document.getElementById("threes"+playerNumber).innerHTML=score;
  }
  if(dice[0]==4) {
    // Calculate the score for Fours and update the corresponding cell in the score table
    let score=calculateFours(dice);
    document.getElementById("fours"+playerNumber).innerHTML=score;
  }
  if(dice[0]==5) {
    // Calculate the score for Fives and update the corresponding cell in the score table
    let score=calculateFives(dice);
    document.getElementById("fives"+playerNumber).innerHTML=score;
  }
  if(dice[0]==6) {
    // Calculate the score for Sixes and update the corresponding cell in the score table
    let score=calculateSixes(dice);
    document.getElementById("sixes"+playerNumber).innerHTML=score;
  }
}

// Attach a click event listener to each cell in the score table.
scoreTableCells.forEach(function (cell) {
    cell.addEventListener("click", onCellClick);
  });
  
  // Event handler for cell click events.
function onCellClick() {
    let row = this.getAttribute("data-row");
    let column = this.getAttribute("data-column");
  
    // Check if the cell can be clicked based on various conditions
    if (
      rollCount === 0 || // Prevent cell click if no rolls have occurred
      row === null || // Skip if the cell doesn't have a "data-row" attribute
      (onlyPossibleRow !== "blank" && row != onlyPossibleRow) // Skip if there's a specific row to be filled, and this cell is not in that row
    ) {
      return;
    }
  
    if (isPlayerOneTurn && column == 1) {
      // Update the score for Player 1 in the score table
      player1Score[row - 1] = parseInt(this.innerHTML);
  
      // Calculate scores for Player 1
      let upperSectionScore1 = calculateUpperSection(player1Score);
      let bonusScore1 = upperSectionScore1 > 63 ? 35 : 0;
      let lowerSectionScore1 = calculateLowerSectionScore(player1Score);
      let totalScore1 = upperSectionScore1 + lowerSectionScore1 + bonusScore1;
  
      // Update the corresponding cells in the score table and change their colors to green
      sum1.innerHTML = upperSectionScore1;
      bonus1.innerHTML = bonusScore1;
      total1.innerHTML = totalScore1;
  
      // Remove the click event listener for this cell and change its text color to green
      this.removeEventListener("click", onCellClick);
      this.style.color = "green";
      sum1.style.color = "green";
      bonus1.style.color = "green";
      total1.style.color = "green";
  
      // Switch to the other player's turn
      changeTurn();
    }
  
  
    if (!isPlayerOneTurn && column == 2) {
        // Update the score for Player 2 in the score table
        player2Score[row - 1] = parseInt(this.innerHTML);
      
        // Calculate scores for Player 2
        let upperSectionScore2 = calculateUpperSection(player2Score);
        let bonusScore2 = upperSectionScore2 > 63 ? 35 : 0;
        let lowerSectionScore2 = calculateLowerSectionScore(player2Score);
        let totalScore2 = upperSectionScore2 + lowerSectionScore2 + bonusScore2;
      
        // Update the corresponding cells in the score table and change their colors to green
        sum2.innerHTML = upperSectionScore2;
        bonus2.innerHTML = bonusScore2;
        total2.innerHTML = totalScore2;
      
        // Remove the click event listener for this cell and change its text color to green
        this.removeEventListener("click", onCellClick);
        this.style.color = "green";
        sum2.style.color = "green";
        bonus2.style.color = "green";
        total2.style.color = "green";
      
        // Switch to the other player's turn
        changeTurn();
      }
      

function changeTurn() {
        // Increment the round count
        roundCount++;
        // Update the score table with the current scores
        updateScoreTable();
        // Reset the faces of the dice to their initial state
        resetDiceFaces();
        // Toggle the turn to the other player
        isPlayerOneTurn = !isPlayerOneTurn;
        // Reset the roll count to 0
        rollCount = 0;
        // Move the dice between player containers based on the current turn
        if (isPlayerOneTurn) {
          const player2ContainerDice = player2Container.querySelectorAll(".dice");
          player2ContainerDice.forEach((diceElement) => {
            // Reset the dice position
            diceElement.style.transform = "none";
            // Remove the dice from Player 2's container and add it to Player 1's container
            player2Container.removeChild(diceElement);
            player1Container.appendChild(diceElement);
          });

        } else {
          const player1ContainerDice = player1Container.querySelectorAll(".dice");
          player1ContainerDice.forEach((diceElement) => {
            // Reset the dice position
            diceElement.style.transform = "none";
            // Remove the dice from Player 1's container and add it to Player 2's container
            player1Container.removeChild(diceElement);
            player2Container.appendChild(diceElement);
          });
        }

        // Check if the game has reached its end after 26 rounds
        if (roundCount == 26) {
          calculateEndGameScore();
          return;
        }

        // Enable the roll button for the next turn
        rollButton.disabled = false;
        rollButton.style.opacity = 1;
      }
      
function updateScoreTable() {
     // Create an array to hold the current player's score table
    let scoreTable = [];
      
    // Initialize the scoreTable with Player 1's scores by default
    scoreTable = player1Score.slice();
      
    // Set the default column to 1 (Player 1)
    let column = 1;
      
    // If it's Player 2's turn, switch to their score table and column
    if (!isPlayerOneTurn) {
        scoreTable = [];
        scoreTable = player2Score.slice();
        column = 2;
    }
      
    // Get all the score cells in the current player's column
    let scoreCells = document.querySelectorAll('[data-column="' + column + '"]');
      
    // Iterate through the score cells and update their content
    for (let i = 0; i < scoreCells.length; i++) {
    // If the score is undefined, display an empty cell
    if (scoreTable[i] === undefined) {
        scoreCells[i].innerHTML = "";
        }
    }
}

function calculateEndGameScore() {
    // Get the total scores for both Player 1 and Player 2
    let player1Total = parseInt(document.getElementById("total1").innerHTML);
    let player2Total = parseInt(document.getElementById("total2").innerHTML);
  
    // Determine the end game message based on the total scores
    const endGameMessage =
      player1Total === player2Total ? "Draw" : player1Total > player2Total ? "Player 1 Wins" : "Player 2 Wins";
  
    // Update the end game message in the document
    document.getElementById("endGameMessage").innerHTML = endGameMessage;
  
    // Disable the roll button and reduce its opacity to indicate the end of the game
    rollButton.disabled = true;
    rollButton.style.opacity = 0.5;
  }

//--------------------------------------------------------------

function calculateOnes(dice) {
    // Calculate the score for the Ones category
    let score = 0;
    // Loop through the dice values and add 1 point for each die with a value of 1
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === 1) {
        score += 1;
      }
    }
    return score;
  }
  
function calculateTwos(dice) {
    // Calculate the score for the Twos category
    let score = 0;
    // Loop through the dice values and add 2 points for each die with a value of 2
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === 2) {
        score += 2;
      }
    }
    return score;
  }
  
function calculateThrees(dice) {
    // Calculate the score for the Threes category
    let score = 0;
    // Loop through the dice values and add 3 points for each die with a value of 3
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === 3) {
        score += 3;
      }
    }
    return score;
  }
  
function calculateFours(dice) {
    // Calculate the score for the Fours category
    let score = 0;
    // Loop through the dice values and add 4 points for each die with a value of 4
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === 4) {
        score += 4;
      }
    }
    return score;
  }
  
function calculateFives(dice) {
    // Calculate the score for the Fives category
    let score = 0;
    // Loop through the dice values and add 5 points for each die with a value of 5
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === 5) {
        score += 5;
      }
    }
    return score;
  }
  
function calculateSixes(dice) {
    // Calculate the score for the Sixes category
    let score = 0;
    // Loop through the dice values and add 6 points for each die with a value of 6
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] === 6) {
        score += 6;
      }
    }
    return score;
  }
  
  function calculateChance(dice) {
    // Calculate the score for the Chance category
    let score = 0;
  
    // Sum up all the dice values
    for (let i = 0; i < dice.length; i++) {
      score += dice[i];
    }
    return score;
  }
  
  function calculateYahtzee(dice) {
    // Calculate the score for the Yahtzee category
    let firstDie = dice[0];
    let score = 50;
  
    // Check if all dice have the same value (Yahtzee)
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] !== firstDie) {
        score = 0;
        break;
      }
    }
    return score;
  }
  
function calculateThreeOfAKind(dice) {
    // Calculate the score for the Three of a Kind category
    let score = 0;
  
    for (let i = 0; i < dice.length; i++) {
      let count = 1;
      // Count the number of dice with the same value
    for (let j = 0; j < dice.length; j++) {
    if (j !== i && dice[i] === dice[j]) {
         count++;
    }
}
    if (count >= 3) {
    // If there are at least three dice with the same value, sum all dice values
    score = dice.reduce((acc, val) => acc + val);
    break;
      }
    }
    return score;
}
  
function calculateFourOfAKind(dice) {
    // Calculate the score for the Four of a Kind category
    let score = 0;

    for (let i = 0; i < dice.length; i++) {
      let count = 1;
    // Count the number of dice with the same value
    for (let j = 0; j < dice.length; j++) {
    if (j !== i && dice[i] === dice[j]) {
        count++;
    }
}
    if (count >= 4) {
    // If there are at least four dice with the same value, sum all dice values
    score = dice.reduce((acc, val) => acc + val);
    break;
    }
}
    return score;
}
  
function calculateFullHouse(dice) {
    // Calculate the score for the Full House category
    let score = 0;
    // Create a copy of the dice array and sort it
    let diceCopy = dice.slice();
    diceCopy.sort();
  
    // Check if the dice combination meets the criteria for a Full House
    if (
      (diceCopy[0] == diceCopy[1] && diceCopy[1] == diceCopy[2] && diceCopy[3] == diceCopy[4]) ||
      (diceCopy[0] == diceCopy[1] && diceCopy[2] == diceCopy[3] && diceCopy[3] == diceCopy[4])
    ) {
      score = 25;
    }
  
    return score;
  }
  
function calculateSmallStraight(dice) {
    // Calculate the score for the Small Straight category
    let score = 0;
    // Create a copy of the dice array, remove duplicates, and sort it
    let diceCopy = [...new Set(dice)];
    diceCopy.sort();
  
    // Check if the dice combination meets the criteria for a Small Straight
    if (
      (diceCopy[1] == diceCopy[0] + 1 && diceCopy[2] == diceCopy[1] + 1 && diceCopy[3] == diceCopy[2] + 1) ||
      (diceCopy[2] == diceCopy[1] + 1 && diceCopy[3] == diceCopy[2] + 1 && diceCopy[4] == diceCopy[3] + 1)
    ) {
      score = 30;
    }
  
    return score;
  }
  
function calculateLargeStraight(dice) {
    // Calculate the score for the Large Straight category
    let score = 0;
  
    // Create a copy of the dice array, remove duplicates, and sort it
    let diceCopy = [...new Set(dice)];
    diceCopy.sort();
  
    // Check if the dice combination meets the criteria for a Large Straight
    if (
      diceCopy[1] == diceCopy[0] + 1 &&
      diceCopy[2] == diceCopy[1] + 1 &&
      diceCopy[3] == diceCopy[2] + 1 &&
      diceCopy[4] == diceCopy[3] + 1
    ) {
      score = 40;
    }
  
    return score;
  }
  

function calculateUpperSection(playerScore) {
    // Calculate the score for the upper section of the score table
    let score = 0;
    // Get the scores for each category in the upper section
    let ones = playerScore[0] === undefined ? 0 : playerScore[0];
    let twos = playerScore[1] === undefined ? 0 : playerScore[1];
    let threes = playerScore[2] === undefined ? 0 : playerScore[2];
    let fours = playerScore[3] === undefined ? 0 : playerScore[3];
    let fives = playerScore[4] === undefined ? 0 : playerScore[4];
    let sixes = playerScore[5] === undefined ? 0 : playerScore[5];
  
    // Calculate the total score for the upper section
    score = ones + twos + threes + fours + fives + sixes;
  
    return score;
}
  
function calculateLowerSectionScore(playerScore) {
    // Calculate the score for the lower section of the score table
    let lowerSectionScore = 0;
    // Get the scores for each category in the lower section
    let threeOfAKind = playerScore[6] === undefined ? 0 : playerScore[6];
    let fourOfAKind = playerScore[7] === undefined ? 0 : playerScore[7];
    let fullHouse = playerScore[8] === undefined ? 0 : playerScore[8];
    let smallStraight = playerScore[9] === undefined ? 0 : playerScore[9];
    let largeStraight = playerScore[10] === undefined ? 0 : playerScore[10];
    let chance = playerScore[11] === undefined ? 0 : playerScore[11];
    let yahtzee = playerScore[12] === undefined ? 0 : playerScore[12];
  
    // Check if a Yahtzee has been scored, and if so, get its value from the displayed score
    if (yahtzee > 0) {
      const playerNumber = isPlayerOneTurn ? 1 : 2;
      yahtzee = parseInt(document.getElementById("yahtzee" + playerNumber).innerHTML);
    }
  
    // Calculate the total score for the lower section
    lowerSectionScore = threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + chance + yahtzee;
  
    return lowerSectionScore;
  }
}
}
