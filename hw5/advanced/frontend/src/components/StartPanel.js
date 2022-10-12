import './StartPanel.css';
import React, { useState } from 'react'


function StartPanel({ message, startOnClick }) {

    return (
        <div className='start-wrapper'>
            <h1 className='start-msg'>
                { message }
            </h1>
            <button className='start' onClick={ startOnClick }>
                start game
            </button>
        </div>
    );
}


export default StartPanel;