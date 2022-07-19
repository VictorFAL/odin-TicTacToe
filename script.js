const spots = document.querySelectorAll('td');

// Game Board
const gameBoard = (() => {
    'use strict';

    let board = Array(9);

    spots.forEach(spot => {
        spot.addEventListener('click', () => {
            if(spot.innerText == "") {
                if(playerX.active) {
                    playerX.play(spot.dataset.index);
                    playerX.active = false;
                    playerO.active = true;

                    game.render();
                } 
                else if(playerO.active) {
                    playerO.play(spot.dataset.index);
                    playerO.active = false;
                    playerX.active = true;
                    
                    game.render();
                }
            }
        });
    });

    return {board}
})();


// Game Control
const game = (() => {
    'use strict';

    const render = () => {
        gameBoard.board.forEach((item, index) => {
            spots[index].innerText = item;
        });
    }

    const checkWin = (mark) => {
        const condition = [];
    }

    return {render}
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