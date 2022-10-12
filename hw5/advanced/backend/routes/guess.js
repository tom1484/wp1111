import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router(); 

function checkGuess(guess) {
    if (isNaN(guess)) {
        return false;
    }
    else {
        guess = parseInt(guess);
        if (1 <= guess && guess <= 100) {
            return true;
        }
        else {
            return false;
        }
    }
}

router.get('/guess', (req, res) => {
    const guess = req.query.number;

    if (checkGuess(guess)) {
        const number = getNumber();
        if (guess < number) {
            res.json({ status: 'bigger' });
        }
        else if (guess > number) {
            res.json({ status: 'smaller' });
        }
        else {
            res.json({ status: 'bingo' });
        }
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