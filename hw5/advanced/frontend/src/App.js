import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { startGame, submit, restart } from './axios';

import Game from './components/Game';
import StartPanel from './components/StartPanel';
import RestartPanel from './components/RestartPanel';


function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [status, setStatus] = useState({ valid: true });

    const [answer, setAnswer] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    function handleAXiosResponse(res) {
        console.log(res);
        if (axios.isAxiosError(res)) {
            if (res.code === 'ERR_NETWORK') {
                setErrorMsg('AXIOS ERROR: ERR_NETWORK');
                return null;
            }
            else if (res.code === 'ERR_BAD_REQUEST') {
                setErrorMsg('HTTP ERROR ' + res.response.status);
                return res.response;
            }
        }
        else {
            return res;
        }
    }

    function startOnClick() {
        startGame()
            .then(res => {
                res = handleAXiosResponse(res);
                if (res && res.status == 200) {
                    setHasStarted(true);
                    setHasError(false);
                }
                else {
                    setHasError(true);
                }
            });
    }

    function restartOnClick() {
        restart()
            .then(res => {
                res = handleAXiosResponse(res);
                if (res && res.status == 200) {
                    setHasStarted(true);
                    setHasWon(false);
                    setHasError(false);
                }
                else {
                    setHasError(true);
                }
            });
    }

    function onSubmit(code, addHistory) {
        submit(code)
            .then(res => {
                res = handleAXiosResponse(res);

                if (res) {
                    const httpStatus = res.status;
                    if (httpStatus == 200) {
                        const judge = res.data.status;
                        console.log(res.data.status);
                        if (judge === '4A0B') {
                            setHasStarted(false);
                            setHasWon(true);
                            setErrorMsg(false);
                            setAnswer(code);
                        }
                        addHistory(code, judge);
                        setStatus({ valid: true, judge: judge });
                        setHasError(false);
                    }
                    else if (httpStatus == 406) {
                        setStatus({ valid: false });
                        setHasError(false);
                    }
                    else {
                        setHasError(true);
                    }
                }
                else {
                    setHasError(true);
                }
            });
    }

    return (
        <div className='guess-root'>
        {(() => {
            if (hasStarted) {
                return (
                    <Game
                        status={ status }
                        onSubmit={ onSubmit }
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
