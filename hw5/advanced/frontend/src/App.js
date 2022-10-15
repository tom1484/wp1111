import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

import { requestStartGame, requestJudge, requestGuess, requestRestartGame } from './axios';
import { ACCEPTED, ERR_BAD_REQUEST, ERR_NETWORK, ERR_UNKNOWN } from './axios';

import GameBoard from './components/GameBoard';
import { MODE_GUESS, MODE_JUDGE } from './components/GameBoard';

import StartPanel from './components/StartPanel';
import RestartPanel from './components/RestartPanel';


function App() {
    const GAME_SUSPENDED = 0;
    const GAME_PLAYING   = 1;
    const GAME_WON       = 2;
    const GAME_LOST      = 3;


    const [gameStatus, setGameStatus] = useState(GAME_SUSPENDED);
    const [gameMode, setGameMode] = useState('');
    const [restartMsg, setRestartMsg] = useState('');

    const [prevInput, setPrevInput] = useState('');

    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    function processError(errorStatus, httpResponse) {
        if (errorStatus == ERR_NETWORK) {
            setErrorMsg('AXIOS ERROR: ERR_NETWORK');
        }
        else if (errorStatus == ERR_BAD_REQUEST) {
            setErrorMsg(`HTTP ERROR ${httpResponse.status}`);
        }
        else if (errorStatus == ERR_UNKNOWN) {
            setErrorMsg('UNKNOWN ERROR');
        }
    }

    function startOnClick(mode) {
        requestStartGame(mode)
            .then(result => {
                const { axiosStatus, httpResponse } = result;
                let errorOccured = false;
                
                if (axiosStatus == ACCEPTED && httpResponse.status == 200) {
                    switch (mode) {
                        case 'JUDGE':
                            setGameMode(MODE_JUDGE);
                            break;
                        case 'GUESS':
                            setGameMode(MODE_GUESS);
                            break;
                    }
                    setGameStatus(GAME_PLAYING);
                }
                else {
                    errorOccured = true;
                    processError(axiosStatus, httpResponse);
                }
                setHasError(errorOccured);
            });
    }

    function restartOnClick() {
        requestRestartGame()
            .then(result => {
                const { axiosStatus, httpResponse } = result;
                let errorOccured = false;
                
                if (axiosStatus == ACCEPTED && httpResponse.status == 200) {
                    setGameStatus(GAME_SUSPENDED);
                }
                else {
                    errorOccured = true;
                    processError(axiosStatus, httpResponse);
                }
                setHasError(errorOccured);
            });
    }

    function sendJudge(judge, completeRound) {
        if (judge === '4A0B') {
            setGameStatus(GAME_LOST);
            setRestartMsg(`You lost! Server knows it's ${prevInput}`);
            return;
        }
        return requestJudge(judge)
            .then(result => {
                const { axiosStatus, httpResponse } = result;
                let errorOccured = false;
                
                if (axiosStatus == ACCEPTED && httpResponse.status == 200) {
                    const contradicted = httpResponse.data.contradicted;
                    if (!contradicted) {
                        const newGuess = httpResponse.data.guess;
                        completeRound(true, newGuess, judge);
                        setPrevInput(newGuess);
                    }
                    else {
                        setGameStatus(GAME_LOST);
                        setRestartMsg(`You lost! Your judges caused contradiction`);
                    }
                }
                else if (axiosStatus == ERR_BAD_REQUEST && httpResponse.status == 406) {
                    completeRound(false, null, null);
                }
                else {
                    errorOccured = true;
                    processError(axiosStatus, httpResponse);
                }
                setHasError(errorOccured);
            });
    }

    function sendGuess(guess, completeRound) {
        requestGuess(guess) 
            .then(result => {
                const { axiosStatus, httpResponse } = result;
                let errorOccured = false;
                
                if (axiosStatus == ACCEPTED && httpResponse.status == 200) {
                    const judge = httpResponse.data.status;
                    if (judge === '4A0B') {
                        setGameStatus(GAME_WON);
                        setRestartMsg(`You won! The number is ${guess}`);
                    }
                    else {
                        completeRound(true, guess, judge);
                    }
                }
                else if (axiosStatus == ERR_BAD_REQUEST && httpResponse.status == 406) {
                    completeRound(false, null, null);
                }
                else {
                    errorOccured = true;
                    processError(axiosStatus, httpResponse);
                }
                setHasError(errorOccured);
            });
    }

    return (
        <div className='guess-root'>
        {(() => {
            switch (gameStatus) {
                case GAME_SUSPENDED:
                    return (
                        <StartPanel
                            message='Click to start'
                            startOnClick={ startOnClick }
                        />
                    );
                case GAME_PLAYING:
                    return (
                        <GameBoard
                            gameMode={ gameMode }
                            sendGuess={ sendGuess }
                            sendJudge={ sendJudge }
                        />
                    );
                case GAME_WON:
                    switch (gameMode) {
                        case MODE_GUESS:
                            return (
                                <RestartPanel
                                    message={ restartMsg }
                                    restartOnClick={ restartOnClick }
                                />
                            );
                        case MODE_JUDGE:
                            return (
                                <RestartPanel
                                    message={ restartMsg }
                                    restartOnClick={ restartOnClick }
                                />
                            );
                    }
                case GAME_LOST:
                    switch (gameMode) {
                        case MODE_GUESS:
                            return (
                                <RestartPanel
                                    message={ restartMsg }
                                    restartOnClick={ restartOnClick }
                                />
                            );
                        case MODE_JUDGE:
                            return (
                                <RestartPanel
                                message={ restartMsg }
                                    restartOnClick={ restartOnClick }
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
