/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {
                    [...Array(5)].map((_, index) => {
                        const id = `${rowIdx}-${index}`;
                        if (index < curGuess.length) {
                            return (
                                <div className={`Row-wordbox filled`} id={id} key={id}>
                                    {curGuess[index]}
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className='Row-wordbox' id={id} key={id}></div>
                            );
                        }
                    })
                }
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
