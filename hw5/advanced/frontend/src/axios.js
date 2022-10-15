import axios from 'axios'


export const ACCEPTED        = 0;
export const ERR_BAD_REQUEST = 1;
export const ERR_NETWORK     = 2;
export const ERR_UNKNOWN     = 3;

const requestSender = axios.create({
    baseURL: 'http://localhost:4000/api/guess'
});

function filterError(axiosResponse) {
    const errorCode = axiosResponse.code;
    switch (errorCode) {
        case 'ERR_BAD_REQUEST':
            return { axiosStatus: ERR_BAD_REQUEST, httpResponse: axiosResponse.response };
        case 'ERR_NETWORK':
            return { axiosStatus: ERR_NETWORK, httpResponse: null };
        default:
            return { axiosStatus: ERR_UNKNOWN, httpResponse: null };
    }
}

export const requestStartGame = async (mode) => {
    try {
        const response = await requestSender.post('/start', {
             gameMode: mode
        });
        return { axiosStatus: ACCEPTED, httpResponse: response };
    }
    catch (e) {
        return filterError(e);
    }
};

export const requestJudge = async (judge) => {
    try {
        const response = await requestSender.get('/judge', {
            params: { judge }
        })
        return { axiosStatus: ACCEPTED, httpResponse: response };
    }
    catch(e) {
        return filterError(e);
    }
}

export const requestGuess = async (code) => {
    try {
        const response = await requestSender.get('/guess', {
            params: { code }
        });
        return { axiosStatus: ACCEPTED, httpResponse: response };
    }
    catch (e) {
        return filterError(e);
    }
};

export const requestRestartGame = async () => {
    try {
        const response = await requestSender.post('/restart');
        return { axiosStatus: ACCEPTED, httpResponse: response };
    }
    catch (e) {
        return filterError(e);
    }
};

// export { startGame, judge, guess, restart };