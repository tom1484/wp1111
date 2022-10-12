import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router(); 

function checkGuess(guess) {
    if (guess.length == 4) {
        for (let digit of guess) {
            if (isNaN(digit)) {
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
    const guess = req.query.code;
    console.log(guess);

    if (checkGuess(guess)) {
        const number = getNumber();
        res.json({ status: '1A1B' });
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