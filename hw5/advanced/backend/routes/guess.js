import express from 'express'
import { getNumber, genNumber, guessNewNumber, initialGuess } from '../core/getNumber'

const router = express.Router(); 

function checkGuess(guess) {
    if (guess.length == 4) {
        for (let digit of guess) {
            if (isNaN(digit) || guess.split(digit).length > 2) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

function checkJudge(judge) {
    if (judge.length != 4) {
        return false;
    }
    if (judge[1] !== 'A' || judge[3] !== 'B' || isNaN(judge[0]) || isNaN(judge[2])) {
        return false;
    }
}

// function initialGuess() {
//     return '1234';
// }

router.get('/guess', (req, res) => {
    let guess = req.query.code;
    // console.log(guess);

    if (checkGuess(guess)) {
        let number = getNumber();
        let A = 0, B = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === number[i]) {
                A += 1;
            }
            else if (number.includes(guess[i])) {
                B += 1;
            }
        }
        res.json({ status: `${A}A${B}B` });
    }
    else {
        res.sendStatus(406);
    } 
});

router.get('/judge', (req, res) => {
    const judge = req.query.judge;
    const guess = guessNewNumber(judge);

    res.json({ guess: guess });
});

router.post('/start', (req, res) => {
    const data = JSON.parse(Object.keys(req.body));
    const gameMode = data.gameMode;
    console.log(gameMode);
    if (gameMode === 'GUESS') {
        genNumber();
        res.json({ msg: 'started' });
    }
    else {
        const guess = initialGuess();
        res.json({ msg: 'started', guess: guess });
    }
});

router.post('/restart', (req, res) => {
    genNumber();
    // res.sendStatus(404);
    res.json({ msg: 'restarted' });
});

export default router;