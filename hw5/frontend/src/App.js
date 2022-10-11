import './App.css';
import React, { useState } from 'react'
import { startGame, guess, restart } from './axios'
import axios from 'axios';

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');

    const [lastInput, setLastInput] = useState('');
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

    function handleGuessResult(res) {
        res = handleAXiosResponse(res);

        if (res) {
            const httpStatus = res.status;
            if (httpStatus == 200) {
                const guessRes = res.data.status;
                switch (guessRes) {
                    case 'smaller':
                        setStatus('smaller');
                        break;
                    case 'bigger':
                        setStatus('bigger');
                        break;
                    case 'bingo':
                        setStatus('');
                        setHasStarted(false);
                        setHasWon(true);
                        setLastInput(number);
                        break;
                }
                setHasError(false);
            }
            else if (httpStatus == 406) {
                setStatus('invalid');
                setHasError(false);
            }
            else {
                setHasError(true);
            }
        }
        else {
            setHasError(true);
        }
    }

    function guessOnClick() {
        if (number === '') {
            return;
        }
        guess(number)
            .then(res => {
                console.log(res);
                handleGuessResult(res);
                document.getElementsByClassName('input')[0].value = "";
                setLastInput(number);
                setNumber('');
            })
            // .catch(res => {
            //     console.log(res);
            //     handleGuessResult(res.response);
            //     document.getElementsByClassName('input')[0].value = "";
            //     setLastInput(number);
            //     setNumber('');
            // });
    }

    function numberOnChange(value) {
        setNumber(value);
    }

    return (
        <div className='guess-root'>
        {(() => {
            if (hasStarted) {
                return (
                    <div className='game-wrapper'>
                        <h1 className='title'>
                            Guess a number bwtween 1 to 100
                        </h1>
                        <div className='input-wrapper'>
                            <input
                                type='text' className='input'
                                onChange={(e) => numberOnChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter')
                                        guessOnClick();
                                }}
                            />
                            <button
                                className='guess'
                                onClick={() => guessOnClick()}
                                disabled={ number === '' }
                            >
                                Guess!
                            </button>
                        </div>
                        <h1 className='hint' style={ { color: (status === 'invalid' ? 'red' : 'black') } }>
                        {
                            (() => {
                                switch (status) {
                                    case 'smaller':
                                        return 'Smaller than ' + lastInput;
                                    case 'bigger':
                                        return 'Bigger than ' + lastInput;
                                    case 'invalid':
                                        return lastInput + ' is not a valid number (1-100)!';
                                    default:
                                        return null;
                                }
                            })()
                        }
                        </h1>
                    </div>
                );
            }
            else {
                if (hasWon) {
                    return (
                        <div className='restart-wrapper'>
                            <h1 className='restart-msg'>
                                You won! The number is ' + lastInput
                            </h1>
                            <button className='restart' onClick={() => restartOnClick()}>
                                restart game
                            </button>
                        </div>
                    );
                }
                else {
                    return (
                        <div className='start-wrapper'>
                            <h1 className='start-msg'>
                                Click to start
                            </h1>
                            <button className='start' onClick={() => startOnClick()}>
                                start game
                            </button>
                        </div>
                    );
                }
            }
        })()}
        { hasError ? <h1 className='error'>{ errorMsg }</h1> : null }
        </div>
    );
}

export default App;
