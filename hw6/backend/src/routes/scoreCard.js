import Router from 'express';
import ScoreCard from '../models/ScoreCard';


const router = Router();

const mongooseErrHandler = (res) => {
    res.status(200);
}

router.delete("/cards", (req, res) => {
    console.log("DELETE");
    res.status(200);
});

router.post("/card", (req, res) => {
    const {name, subject, score} = req.body;

    ScoreCard.find({ name: name, subject: subject }, (err, scoreCards) => {
        if (err) mongooseErrHandler(res);

        if (scoreCards.length == 0) {
            let scoreCard = new ScoreCard({
                name: name, 
                subject: subject, 
                score: score
            });
            scoreCard.save((err) => {
                if (err) mongooseErrHandler(res);
                res.status(200).json({
                    message: "Inserted", 
                    card: scoreCard, 
                });
            });
        }
        else {
            let scoreCard = scoreCards[0];
            if (scoreCard.score != score) {
                scoreCard.score = score;
                scoreCard.save((err) => {
                    if (err) mongooseErrHandler(res);
                    res.status(200).json({
                        message: "Updated", 
                        card: scoreCard, 
                    });
                });
            }
            else {
                res.status(200).json({
                    message: "No need to update", 
                    card: scoreCard, 
                });
            }
        }
    });
});

router.get("/cards", (req, res) => {
    console.log("GET");
    res.status(200);
});

export default router;