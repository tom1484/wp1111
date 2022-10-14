import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import guessRoute from './routes/guess'

var app = express();
// app.configure(() => {
//     app.use(express.bodyParser());
// });

app.use(cors());
app.use(bodyParser.urlencoded({ type: 'application/json' }));

app.use('/api/guess', guessRoute);

const port = process.env.port || 4000;
app.listen(port, () => {
    console.log("Server is up on port " + port);
});