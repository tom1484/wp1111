import './App.css';
import React, { useState } from 'react'
import { startGame, guess, restart } from './axios'

function App() {
  const [ hasStarted, setHasStarted ] = useState(false);
  const [ hasWon, setHasWon ] = useState(false);
  const [ number, setNumber] = useState('');
  const [ status, setStatus ] = useState('');

  function hasStartedOnClick() {
    startGame()
      .then(res => {
        // console.log(res);
        setHasStarted(true);
      });
  }

  function handleGuessResult(res) {
    const httpStatus = res.status;
    const guessRes = res.data.status;
    if (httpStatus == 200) {
      switch (guessRes) {
        case 'smaller':
          setStatus('smaller');
          break;
        case 'bigger':
          setStatus('bigger');
          break;
        case 'bingo':
          setStatus('');
          // setHasStarted(false);
          setHasWon(true);
          break;
      }
    }
  }

  function guessOnClick() {
    guess(number)
      .then(res => {
        handleGuessResult(res);
      });
    
    document.getElementsByClassName('input')[0].value = "";
    setNumber(null);
  }

  function numberOnChange(value) {
    value = parseInt(value);
    if (!isNaN(value) && 1 <= value && value <= 100) {
      setNumber(value);
    }
    else {
      setNumber(null);
    }
  }

  return (
    <div className='guess-root'>
      { hasStarted ? 
        <div className='game-wrapper'>
          <h1 className='title'>
            Guess a number bwtween 1 to 100
          </h1>
          <div className='input-wrapper'>
            <input 
              type='text' className='input' 
              onChange={ (e) => numberOnChange(e.target.value) }/>
            <button 
              className='guess' 
              onClick={ () => guessOnClick() } 
              disabled={ !number }>Guess!</button>
          </div>
          <h1 className='hint'>
            {
              (() => {
                switch (status) {
                  case 'smaller':
                    return 'Smaller';
                  case 'bigger':
                    return 'Bigger';
                  default:
                    return null;
                }
              })()
            }
          </h1>
        </div>
        :
        <button className='start' onClick={ () => hasStartedOnClick() }>
          start game
        </button>
      }
      
    </div>
  );
}

export default App;
