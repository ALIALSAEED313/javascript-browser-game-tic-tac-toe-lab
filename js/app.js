/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const resetBtnEl = document.querySelector("#reset")
const messageEl = document.querySelector('#message')

console.log('squareEls')
console.log('resetBtnEl')
console.log('messageEl')

/*-------------------------------- Constants --------------------------------*/

let board = [
    '', '', '',
    '', '', '',
    '', '', '']

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let turn = "X"
let winner = false
let tie = false




/*-------------------------------- Functions --------------------------------*/
function render() {
    updateBoard()
    updateMessage()

}

function init() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    turn = "X"
    winner = false
    tie = false

    render()
}

init()

function updateBoard() {
    //loop through the board variable using foreach
    board.forEach((cell, index) => {
        squareEls[index].textContent = cell

    })
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `${turn}'s Turn`
    }
    else if (!winner && tie) {
        messageEl.textContent = "It's a Tie!"
    }
    else {
        messageEl.textContent = `${turn} Wins!`
    }
}

function handleClick(event) {
    const squareIndex = event.target.id

    if (board[squareIndex] !== "" || winner) {
        return
    }

    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function placePiece(index) {
    board[index] = turn
}

function checkForWinner() {
    winningCombos.forEach(combo => {
if (
    board[combo[0]] !== "" &&
    board[combo[0]] === board[combo[1]] &&
    board[combo[0]] === board[combo[2]]
) {
    winner = true
}
    })
}

function checkForTie() {
    if (winner) {
        return
    }

    if (!board.includes("")) {
        tie = true
    }


}

function switchPlayerTurn() {
    if (winner) {
        return
    }

    if (turn === "X") {
        turn = "O"
    } else {
        turn = "X"
    }
}
/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener("click", init);

squareEls.forEach(square => {
    square.addEventListener("click", handleClick);
});