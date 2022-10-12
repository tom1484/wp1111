import './Game.css';
import React, { useState } from 'react'


function Game({ status, onSubmit }) {
    const [code, setCode] = useState('');

    const [history, setHistory] = useState([]);


    function submit() {
        onSubmit(code, addHistory);
        document.getElementsByClassName('input')[0].value = "";
        setCode('');
    }

    function addHistory(guess, result) {
        setHistory([
            { guess: guess, result: result }, 
            ...history
        ]);
    }


    return (
        <div className='game-wrapper'>
            <h1 className='title' error={ (!status.valid).toString() }>
                { status.valid ? 'Guess a 4-digit number' : 'Must be a 4-digit number!' }
            </h1>
            <div className='input-wrapper'>
                <input
                    type='text'
                    className='input'
                    onChange={ (e) => setCode(e.target.value) }
                    onKeyDown={ (e) => {
                        if (e.key == 'Enter' && code !== '') {
                            submit();
                        }
                    } }
                />
                <button
                    className='guess'
                    disabled={ code === '' }
                    onClick={ onSubmit }
                >
                    Submit
                </button>
            </div>
            <table className='history-list'>
                <tr className='history' title='true'>
                    <td className='history-index'>TRY</td>
                    <td className='history-guess'>GUESS</td>
                    <td className='history-result'>RESULT</td>
                </tr>
            {
                history.map((record, idx) => {
                    const index = history.length - idx;
                    const guess = record.guess;
                    const result = record.result;
                    return (
                        <tr key={ index } className='history'>
                            <td className='history-index'>{ index }</td>
                            <td className='history-guess'>{ guess }</td>
                            <td className='history-result'>{ result }</td>
                        </tr>
                    );
                })
            }
            </table>
        </div>
    );
}


export default Game;