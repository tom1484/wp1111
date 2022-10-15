import express from 'express'
import { getNumber, genNumber, getGuess, initializeCandidates, reset, getCount } from '../core/getNumber'

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
    const A = parseInt(judge[0]);
    const B = parseInt(judge[2]);
    if (A + B > 4) {
        return false;
    }
    return true;
}

router.get('/guess', (req, res) => {
    let guess = req.query.code;

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
        const count = getCount();
        res.json({ judge: `${A}A${B}B`, count: count });
    }
    else {
        res.sendStatus(406);
    } 
});

router.get('/judge', (req, res) => {
    const judge = req.query.judge;
    if (checkJudge(judge)) {
        const guess = getGuess(judge);
        if (guess) {
            const count = getCount();
            res.json({ contradicted: false, guess: guess, count: count });
        }
        else {
            res.json({ contradicted: true });
        }
    }
    else {
        res.sendStatus(406);
    }
});

router.post('/start', (req, res) => {
    reset();
    console.log("START");
    const gameMode = JSON.parse(Object.keys(req.body)).gameMode
    switch (gameMode) {
        case 'GUESS':
            genNumber();
            break;
        case 'JUDGE':
            initializeCandidates();
            break;
    }
    res.json({ msg: 'started' });
});

router.post('/restart', (req, res) => {
    res.json({ msg: 'restarted' });
});

export default router;