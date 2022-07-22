const spots = document.querySelectorAll('td');

// Game Board
const gameBoard = (() => {
    'use strict';

    let board = Array(9);
    board.fill(undefined);

    spots.forEach(spot => {
        spot.addEventListener('click', () => {
            if(spot.innerText == "") {
                if(playerX.active) {
                    playerX.play(spot.dataset.index);
                    playerX.active = false;
                    playerO.active = true;
    
                    game.render();
                    game.checkWin();
                } else if(playerO.active) {
                    playerO.play(spot.dataset.index);
                    playerO.active = false;
                    playerX.active = true;
                    
                    game.render();
                    game.checkWin();
                }
            }
        }, {once: true});
    });

    return {board}
})();


// Game Control
const game = (() => {
    'use strict';

    const render = () => {
        gameBoard.board.forEach((item, index) => {
            if(item != undefined) {
                spots[index].innerText = item;
            }
        });
    }

    const checkWin = () => {
        const winConditions = [
            // Horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonal
            [0, 4, 8],
            [2, 4, 6]
        ];

        let board = gameBoard.board;
        let victory = false;
        for(let i = 0; i <= 7; i++) {
            let winCond = winConditions[i];
            let spot1 = winCond[0];
            let spot2 = winCond[1];
            let spot3 = winCond[2];

            if(board[spot1] == undefined || board[spot2] == undefined || board[spot3] == undefined) {
                continue;
            }
            if(board[spot1] == board[spot2] && board[spot2] == board[spot3]) {
                victory = true;

                spots[spot1].style.backgroundColor = 'rgb(161, 228, 161)';
                spots[spot2].style.backgroundColor = 'rgb(161, 228, 161)';
                spots[spot3].style.backgroundColor = 'rgb(161, 228, 161)';

                break;
            }
        }

        if(victory) {
            spots.forEach((spot) => {
                spot.classList.add('activated');
            });
        }
    }

    return {render, checkWin}
})();


// Player
const player = (mark) => {
    let active = true;

    const play = (spot) => {
        gameBoard.board[spot] = mark;
    }

    return {active, play};
}

const playerX = player('X');
const playerO = player('O');

playerO.active = false;

// test
// gameBoard.board[0] = 'X';
// gameBoard.board[4] = 'O';
// game.render();