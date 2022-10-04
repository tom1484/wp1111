/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    if (board[x][y].value != 0) {
        board[x][y].revealed = true;
        if (board[x][y].value != '💣') {
            newNonMinesCount--;
        }
    }

    let queue = [[x, y]];
    while (queue.length != 0) {
        let curr = queue[0];
        let cx = curr[0], cy = curr[1];
        // console.log(board[cx][cy]);
        queue.splice(0, 1);
        if (!checkValidity(board, cx, cy)) {
            continue;
        }

        board[cx][cy].revealed = true;
        newNonMinesCount--;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let sx = cx + i, sy = cy + j;
                if (checkValidity(board, sx, sy)) {
                    queue.push([sx, sy]);
                }
            }
        }
    }

    return { board, newNonMinesCount };
};

const checkValidity = (board, x, y) => {
    return (
        0 <= x && x < board.length
        && 0 <= y && y < board[0].length 
        && board[x][y].value == 0 && !board[x][y].revealed && !board[x][y].flagged
    );
}