import axios, { AxiosError } from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:4000/api/guess'
});

const startGame = async (mode) => {
    try {
        const res = await instance.post('/start', {
             gameMode: mode
        });
        return res;
    }
    catch (e) {
        return e;
    }
};

const judge = async (judge) => {
    try {
        const res = await instance.get('/judge', {
            params: { judge }
        })
        return res;
    }
    catch(e) {
        return e;
    }
}

const guess = async (code) => {
    try {
        const res = await instance.get('/guess', {
            params: { code }
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

export { startGame, judge, guess, restart };