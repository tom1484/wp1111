/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        
        setBoard(newBoard.board);
        setNonMineCount(boardSize * boardSize - mineNum);
        setMineLocations(newBoard.mineLocations);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
        setRemainFlagNum(0);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        if (!board[x][y].revealed) {
            if (!board[x][y].flagged) {
                newFlagNum += 1;
            } else {
                newFlagNum -= 1;
            }
            newBoard[x][y].flagged = !newBoard[x][y].flagged;

            setBoard(newBoard);
            setRemainFlagNum(newFlagNum);
        }
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMineCount = 0;

        let result = revealed(newBoard, x, y, nonMineCount);
        newBoard = result.board;
        newNonMineCount = result.newNonMinesCount;
        setBoard(newBoard);
        setNonMineCount(newNonMineCount);

        if (newNonMineCount == nonMineCount) {
            setGameOver(true);
        }
        if (newNonMineCount == 0) {
            setWin(true);
        }
    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

                {
                    (!win && !gameOver) ? null : (
                        <Modal 
                            restartGame={ restartGame }
                            backToHome={ backToHome } 
                            win={ win }/>
                    )
                }

                <div className='boardContainer'>
                    <Dashboard remainFlagNum={ remainFlagNum } gameOver={ gameOver || win }/>
                    {
                        board.map((row, rowIdx) => {
                            let ID = "row" + rowIdx;
                            return (
                                <div id={ ID } style={ { display: "flex" } }>
                                    {
                                        row.map((detail, colIdx) => {
                                            return (
                                                <Cell 
                                                    rowIdx={ rowIdx }
                                                    colIdx={ colIdx }
                                                    detail={ detail }
                                                    updateFlag={ updateFlag }
                                                    revealCell={ revealCell }/>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
                
            </div>
        </div>
    );



}

export default Board