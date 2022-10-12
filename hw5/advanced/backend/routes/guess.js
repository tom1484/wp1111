import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

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

router.get('/guess', (req, res) => {
    let guess = req.query.code;
    console.log(guess);

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

router.post('/start', (req, res) => {
    genNumber();
    // res.sendStatus(404);
    res.json({ msg: 'started' });
});

router.post('/restart', (req, res) => {
    genNumber();
    // res.sendStatus(404);
    res.json({ msg: 'restarted' });
});

export default router;