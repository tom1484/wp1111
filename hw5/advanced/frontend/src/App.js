import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { startGame, judge, guess, restart } from './axios';

import GameBoard from './components/GameBoard';
import StartPanel from './components/StartPanel';
import RestartPanel from './components/RestartPanel';


function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [gameMode, setGameMode] = useState('');

    const [status, setStatus] = useState({ valid: true });
    const [answer, setAnswer] = useState('');

    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    function extractHttpResponse(res) {
        if (axios.isAxiosError(res)) {
            return { axiosError: res.code, httpResponse: res.response }
        }
        else {
            return { axiosError: 'SUCCESSFUL', httpResponse: res }
        }
    }

    function startOnClick(mode) {
        startGame(mode)
            .then(res => {
                let err = false;
                const { axiosError, httpResponse } = extractHttpResponse(res);
                if (axiosError === 'SUCCESSFUL' && httpResponse.status == 200) {
                    if (mode === 'JUDGE') {
                        // const guess = httpResponse.data.guess;
                        setStatus({ valid: true, guess: httpResponse.data.guess });
                    }
                    setHasStarted(true);
                    setGameMode(mode);
                }
                else {
                    err = true;
                    if (axiosError === 'ERR_NETWORK') {
                        setErrorMsg('AXIOS ERROR: ERR_NETWORK');
                    }
                    else if (axiosError === 'ERR_BAD_REQUEST') {
                        setErrorMsg(`HTTP ERROR ${httpResponse.status}`);
                    }
                    else {
                        setErrorMsg('UNKNOWN ERROR');
                    }
                }
                if (hasError ^ err) {
                    setHasError(err);
                }
            });
    }

    function restartOnClick() {
        restart()
            .then(res => {
                let err = false;
                const { axiosError, httpResponse } = extractHttpResponse(res);
                console.log(axiosError)
                if (axiosError === 'SUCCESSFUL' && httpResponse.status == 200) {
                    setHasStarted(false);
                    setHasWon(false);
                }
                else {
                    err = true;
                    if (axiosError === 'ERR_NETWORK') {
                        setErrorMsg('AXIOS ERROR: ERR_NETWORK');
                    }
                    else if (axiosError === 'ERR_BAD_REQUEST') {
                        setErrorMsg(`HTTP ERROR ${httpResponse.status}`);
                    }
                    else {
                        setErrorMsg('UNKNOWN ERROR');
                    }
                }
                if (hasError ^ err) {
                    setHasError(err);
                }
            });
    }

    function onJudge(code, addHistory) {
        judge(code)
            .then(res => {
                let err = false;
                const { axiosError, httpResponse } = extractHttpResponse(res);
                console.log(axiosError);
                if (axiosError === 'SUCCESSFUL' && httpResponse.status == 200) {
                    const guess = httpResponse.data.guess;
                    addHistory(status.guess, code);
                    setStatus({ valid: true, guess: guess });
                }
                else if (axiosError === 'ERR_BAD_REQUEST' && httpResponse.status == 406) {
                    setStatus({ valid: false });
                }
                else {
                    err = true;
                    if (axiosError === 'ERR_NETWORK') {
                        setErrorMsg('AXIOS ERROR: ERR_NETWORK');
                    }
                    else if (axiosError === 'ERR_BAD_REQUEST') {
                        setErrorMsg(`HTTP ERROR ${httpResponse.status}`);
                    }
                    else {
                        setErrorMsg('UNKNOWN ERROR');
                    }
                }
                if (hasError ^ err) {
                    setHasError(err);
                }
            });
    }

    function onGuess(code, addHistory) {
        guess(code) 
            .then(res => {
                let err = false;
                const { axiosError, httpResponse } = extractHttpResponse(res);
                console.log(axiosError)
                if (axiosError === 'SUCCESSFUL' && httpResponse.status == 200) {
                    const judge = httpResponse.data.status;
                    if (judge === '4A0B') {
                        setHasStarted(false);
                        setHasWon(true);
                        setAnswer(code);
                    }
                    else {
                        addHistory(code, judge);
                        setStatus({ valid: true, judge: judge });
                    }
                }
                else if (axiosError === 'ERR_BAD_REQUEST' && httpResponse.status == 406) {
                    setStatus({ valid: false });
                }
                else {
                    err = true;
                    if (axiosError === 'ERR_NETWORK') {
                        setErrorMsg('AXIOS ERROR: ERR_NETWORK');
                    }
                    else if (axiosError === 'ERR_BAD_REQUEST') {
                        setErrorMsg(`HTTP ERROR ${httpResponse.status}`);
                    }
                    else {
                        setErrorMsg('UNKNOWN ERROR');
                    }
                }
                if (hasError ^ err) {
                    setHasError(err);
                }
            });
    }

    return (
        <div className='guess-root'>
        {(() => {
            if (hasStarted) {
                return (
                    <GameBoard
                        gameMode={ gameMode }
                        status={ status }
                        onGuess={ onGuess }
                        onJudge={ onJudge }
                    />
                );
            }
            else {
                if (hasWon) {
                    return (
                        <RestartPanel
                            message={ 'You won! The number is ' + answer }
                            restartOnClick={ restartOnClick }
                        />
                    );
                }
                else {
                    return (
                        <StartPanel
                            message='Click to start'
                            startOnClick={ startOnClick }
                        />
                    );
                }
            }
        })()}
        {
            hasError ? 
            <h1 className='error'>
                { errorMsg }
            </h1> :
            null 
        }
        </div>
    );
}

export default App;
