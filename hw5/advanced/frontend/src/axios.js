import axios, { AxiosError } from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:4000/api/guess'
});

const startGame = async () => {
    try {
        const res = await instance.post('/start');
        return res;
    }
    catch (e) {
        return e;
    }
};

const guess = async (number) => {
    try {
        const res = await instance.get('/guess', {
            params: { number }
        });
        return res;
    }
    catch (e) {
        return e;
    }
};

const restart = async () => {
    try {
        const res = await instance.post('/restart');
        return res;
    }
    catch (e) {
        return e;
    }
};

export { startGame, guess, restart };