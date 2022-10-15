import './GameBoard.css';
import React, { useState, useEffect, useRef } from 'react'


export const MODE_GUESS = 0;
export const MODE_JUDGE = 1;


function GameBoard({ gameMode, sendGuess, sendJudge }) {
    const [input, setInput] = useState('');
    const [valid, setValid] = useState(true);
    const [serverGuess, setServerGuess] = useState('');
    const [history, setHistory] = useState([]);

    const inputRef = useRef();
    const initiatedRef = useRef(false);

    
    useEffect(() => {
        const initiate = () => {
            if (gameMode == MODE_JUDGE && !initiatedRef.current) {
                sendJudge('0A0B', completeRound)
                    .then(() => {
                        if (!initiatedRef.current) {
                            initiate();
                        }
                    });
            }
        }
        initiate();
        return () => { initiatedRef.current = false }
    }, []);


    function inputSubmit() {
        switch (gameMode) {
            case MODE_GUESS:
                sendGuess(input, completeRound);
                break;
            case MODE_JUDGE:
                sendJudge(input, completeRound);
                break;
        }
        inputRef.current.value = "";
        setInput('');
    }

    function completeRound(inputValid, guess, judge) {
        if (inputValid) {
            switch (gameMode) {
                case MODE_JUDGE:
                    setServerGuess(guess);
                    if (initiatedRef.current) {
                        setHistory([
                            { guess: serverGuess, result: input }, 
                            ...history
                        ]);
                    }
                    else {
                        initiatedRef.current = true;
                    }
                    break;
                case MODE_GUESS:
                    setHistory([
                        { guess: guess, result: judge }, 
                        ...history
                    ]);
                    break;
            }
            setValid(true);
        }
        else {
            setValid(false);
        }
    }

    return (
        <div className='game-wrapper'>
            <h1 className='title' error={ (!valid).toString() }>
            {
                gameMode == MODE_GUESS ? 
                (valid ? 'Guess a distinct 4-digit number' : 'Must be a distinct 4-digit number!') :
                (valid ? `The server guessed ${serverGuess}` : 'Not a valid judgement!')
            }
            </h1>
            <div className='input-wrapper'>
                <input
                    type='text'
                    className='input'
                    ref={ inputRef }
                    onChange={ (e) => setInput(e.target.value) }
                    onKeyDown={ (e) => {
                        if (e.key == 'Enter' && input !== '') {
                            inputSubmit();
                        }
                    } }
                />
                <button
                    className='submit'
                    disabled={ input === '' }
                    onClick={ inputSubmit }
                >
                    Submit
                </button>
            </div>
            <table className='history-table'>
                <thead className='history-head'>
                    <tr className='history' title='true'>
                        <th width='20%'>TRY</th>
                        <th width='40%'>GUESS</th>
                        <th width='40%'>RESULT</th>
                    </tr>
                </thead>
                <tbody className='history-body'>
                {
                    history.map((record, idx) => {
                        const index = history.length - idx;
                        const guess = record.guess;
                        const result = record.result;
                        return (
                            <tr key={ index } className='history'>
                                <td width='20%'>{ index }</td>
                                <td width='40%'>{ guess }</td>
                                <td width='40%'>{ result }</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}


export default GameBoard;