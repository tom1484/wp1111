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

const submit = async (code) => {
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

export { startGame, submit, restart };