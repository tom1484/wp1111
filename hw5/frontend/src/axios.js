import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:4000/api/guess'
});

const startGame = async () => {
    const res = await instance.post('/start');
    return res;
}

const guess = async (number) => {
    const res = await instance.get('/guess', {
        params: { number }
    });
    return res;
}

const restart = async () => {

}

export { startGame, guess, restart };