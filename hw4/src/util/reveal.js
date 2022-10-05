/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    if (board[x][y].value == '💣') {
        board[x][y].revealed = true;
        return { board, newNonMinesCount };
    }

    let visit = [];
    for (let i = 0; i < board.length; i++) {
        visit.push(new Array(board[0].length).fill(false));
    }

    let queue = [[x, y]];
    while (queue.length != 0) {
        let curr = queue[0];
        let cx = curr[0], cy = curr[1];
        queue.splice(0, 1);

        if (visit[cx][cy]) {
            continue;
        }
        visit[cx][cy] = true;

        board[cx][cy].revealed = true;
        newNonMinesCount--;

        if (board[cx][cy].value == 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let sx = cx + i, sy = cy + j;
                    if (checkValidity(board, sx, sy) && !visit[sx][sy]) {
                        queue.push([sx, sy]);
                    }
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
        && !board[x][y].revealed && !board[x][y].flagged
    );
}

// const 