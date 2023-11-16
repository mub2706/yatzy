// this is the server file

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

let rollNumber = 0;
let roundNumber = 1;

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    res.on('finish', () => {
        console.log(`Outgoing response: ${res.statusCode} ${res.statusMessage}`);
    });
    next();
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/rollDice', (req, res) => {
    let numberOfDice = req.body.numberOfDice || 1;
    let results = [];
    for (let i = 0; i < numberOfDice; i++) {
        results.push(Math.floor(Math.random() * 6) + 1);
    }
    console.log(`Returning response from /rollDie with results: ${results}`);
    res.json({ diceResults: results });
});

app.get('/play', (req, res) => {
    const filePath = 'C:\\Users\\13437\\Downloads\\public\\play.html';
}); 
  
  app.get('/dice1.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'dice1.png'));
  });
  
  app.get('/dice2.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'dice2.png'));
  });

  app.get('/dice3.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'dice3.png'));
  });

  app.get('/dice4.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'dice4.png'));
  });

  app.get('/dice5.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'dice5.png'));
  });


app.post('/updateScores', (req, res) => {
    const diceSelected = req.body.diceSelected;
    let scores = {};
    let duplicates = {};

    // Helper function to check if value exists in an array
    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    // Helper function to get sum of an array
    function sumArray(array) {
        return array.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    // Helper function to get sum of specific duplicates in an array
    function sumDuplicates(value, array) {
        return array.filter(item => item === value).length * value;
    }

    // Helper function to count duplicates in an array
    function countDuplicates(array) {
        array.forEach(i => {
            duplicates[i] = (duplicates[i] || 0) + 1;
        });
    }

    countDuplicates(diceSelected);

    // Calculate scores for Aces to Sixes
    for (let i = 1; i <= 6; i++) {
        if (isInArray(i, diceSelected)) {
            scores['number' + i] = sumDuplicates(i, diceSelected);
        }
    }

    // Calculate scores for Three-of-a-kind and Four-of-a-kind
    for (let value in duplicates) {
        if (duplicates[value] >= 3) {
            scores['threeOfAKind'] = sumArray(diceSelected);
        }
        if (duplicates[value] >= 4) {
            scores['fourOfAKind'] = sumArray(diceSelected);
        }
    }

    // Calculate scores for Full House
    let hasPair = Object.values(duplicates).includes(2);
    let hasTriple = Object.values(duplicates).includes(3);
    if (hasPair && hasTriple) {
        scores['fullHouse'] = 25;
    }

    // Calculate scores for Small Straight and Large Straight
    let uniqueSortedDice = [...new Set(diceSelected)].sort();
    if (uniqueSortedDice.join(',').includes('1,2,3,4') || uniqueSortedDice.join(',').includes('2,3,4,5') || uniqueSortedDice.join(',').includes('3,4,5,6')) {
        scores['smallStraight'] = 30;
    }
    if (uniqueSortedDice.join(',') === '1,2,3,4,5' || uniqueSortedDice.join(',') === '2,3,4,5,6') {
        scores['largeStraight'] = 40;
    }

    // Calculate scores for Chance
    scores['chance'] = sumArray(diceSelected);

    // Calculate scores for Yahtzee
    if (Object.values(duplicates).includes(5)) {
        scores['yahtzee'] = 50;
    }

    res.json({ scores: scores });
});

app.post('/countFinalScore', (req, res) => {
    const scores = req.body.scores;

    // Calculate the final score by summing up the individual scores.
    let finalScore = 0;
    for (let key in scores) {
        finalScore += scores[key];
    }

    // Add the upper section bonus if conditions are met.
    const upperBonus = Object.keys(scores).reduce((acc, current) => {
        if (["number1", "number2", "number3", "number4", "number5", "number6"].includes(current)) {
            return acc + scores[current];
        }
        return acc;
    }, 0);
    
    if (upperBonus >= 63) {
        finalScore += 35;
    }

    console.log(`Returning response from /calculateScore with final score: ${finalScore}`);
    res.json({ finalScore: finalScore });
});

// Endpoint to get the current roll and round numbers
app.get('/gameState', (req, res) => {
    console.log(`Returning response from /gameState with roll number: ${rollNumber} and round number: ${roundNumber}`);
    res.json({
        rollNumber: rollNumber,
        roundNumber: roundNumber
    });
});

// Endpoint to update the roll number
app.post('/updateRoll', (req, res) => {
    rollNumber++;
    if (rollNumber > 3) {
        rollNumber = 0;
        roundNumber++;
    }
    console.log(`Returning response from /updateRoll with roll number: ${rollNumber} and round number: ${roundNumber}`);
    res.json({
        rollNumber: rollNumber,
        roundNumber: roundNumber
    });
});

// Endpoint to reset the game state
app.post('/resetGame', (req, res) => {
    rollNumber = 0;
    roundNumber = 1;
    res.sendStatus(200);
});     

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
