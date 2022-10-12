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
                { status.valid ? 'Guess a distince 4-digit number' : 'Must be a distince 4-digit number!' }
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


export default Game;