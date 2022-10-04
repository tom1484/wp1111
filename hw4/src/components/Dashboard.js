/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"

let timeIntervalId = null;
let count = 0;

export default function Dashboard({ remainFlagNum, gameOver }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (gameOver) {
            clearInterval(timeIntervalId);
        } else {
            count = 0;
            setTime(0);
            timeIntervalId = setInterval(() => {
                count += 1;
                setTime(count);
            }, 1000);
        }
    }, [gameOver]);

    return (
        <div className="dashBoard" >
            <div id='dashBoard_col1' >
                <div className='dashBoard_col'>
                    <p className='icon'>🚩</p>
                    {remainFlagNum}
                </div>
            </div>
            <div id='dashBoard_col2' >
                <div className='dashBoard_col'>
                    <p className='icon'>⏰</p>
                    {time}
                </div>
            </div>
        </div>
    );
}
