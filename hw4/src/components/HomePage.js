/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    const showPanelOnClick = () => {
        setShowPanel(!showPanel);
    }

    useEffect(() => {
        if (mineNum > boardSize * boardSize) {
            setError(true);
        } else {
            setError(false);
        }
    }, [mineNum, boardSize]);

    return (
        <div className='HomeWrapper'>
            <p className='title'>MineSweeper</p>
            <button className='btn' onClick={ error ? null : startGameOnClick }>Start Game</button>

            <div className='controlContainer'>
                <button className='btn' onClick={ showPanelOnClick }>Difficulty Adjustment</button>
                {
                    (!showPanel) ? null : (
                        <div className='controlWrapper'>
                            <div className='error'>{
                                error ? "ERROR: Mines number and board size are invalid!" : ""
                            }</div>
                            <div className='controlPanel'>
                                <div className='controlCol'>
                                    <p className='controlTitle'>Mines Number</p>
                                    <input 
                                        className='inputSlider' 
                                        type='range' min='1' max='324' defaultValue={ mineNum }
                                        onChange={ (e) => mineNumOnChange(e.target.value)}></input>
                                    <p className='controlNum' error={ error.toString() }>{ mineNum }</p>
                                </div>
                                <div className='controlCol'>
                                    <p className='controlTitle'>Board Size (n*n)</p>
                                    <input 
                                        className='inputSlider' 
                                        type='range' min='1' max='18' defaultValue={ boardSize }
                                        onChange={ (e) => boardSizeOnChange(e.target.value) }></input>
                                    <p className='controlNum' error={ error.toString() }>{ boardSize }</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );

}
export default HomePage;   