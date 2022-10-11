import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router(); 

router.get('/guess', (req, res) => {
    const guessNumber = req.query.number;

    const number = getNumber();
    if (guessNumber < number) {
        res.json({ status: 'bigger' });
    }
    else if (guessNumber > number) {
        res.json({ status: 'smaller' });
    }
    else {
        res.json({ status: 'bingo' });
    }
});

router.post('/start', (req, res) => {
    genNumber();
    res.json({ msg: 'started' });
})

export default router;