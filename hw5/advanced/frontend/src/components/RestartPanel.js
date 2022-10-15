import './RestartPanel.css';
import React, { useState } from 'react'


function StartPanel({ message, restartOnClick }) {

    return (
        <div className='restart-wrapper'>
            <h1 className='restart-msg'>
                { message }
            </h1>
            <button className='restart' onClick={() => restartOnClick()}>
                restart game
            </button>
        </div>
    );
}


export default StartPanel;