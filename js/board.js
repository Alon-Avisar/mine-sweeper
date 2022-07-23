
'use strict'
var negsCount = 0

function buildMat(SIZE) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = '';
        }
    }
    return board;
}
function buildBoard() {
    console.log(gLevel.SIZE)
    gBoard = buildMat(gLevel.SIZE)
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                location: { i: i, j: j }
            };
            gBoard[i][j] = cell;
        }
    }
    placeMinesRandomly(0, gLevel.SIZE, gLevel.MINES)
    renderBoard(gBoard, '.game-board', );
    return gBoard;
}


function placeMinesRandomly(min, max, mines) {
    if (max > gLevel.SIZE) {
        max = gLevel.SIZE
    }
    if (min < 0) {
        min = 0
    }
    for (var i = 0; i < mines; i++) {
        console.log('gBoard:', gBoard)

        gBoard[getRandomIntInclusive(min, max - 1)][getRandomIntInclusive(min, max - 1)].isMine = true
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderBoard() {
    //Render the board as a <table> to the page
    setMinesNegsCount()
    var strHTML = `<table><tbody>`;
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j];
            var className = `cell cell-${i}-${j}`;
            strHTML += `<td class="${className}" onclick="cellClicked(this ,${i}, ${j}, event)" oncontextmenu="toggleFlag(this, event)"></td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = strHTML;
    console.log('gBoard:', gBoard)

}

// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {

    var cellContent = EMPTY
    gBoard[i][j].isShown = true
    elCell.style.background = clickedCellColor
    if (gBoard[i][j].minesAroundCount > 0) {
        cellContent = gBoard[i][j].minesAroundCount
    }
    if (gBoard[i][j].isMine){
     
        gLives--
        if (gLives === 0) {
            checkGameOver()
        }
        renderSmiley()
        setLives()
        cellContent = MINE;
    }
    if (cellContent === EMPTY) {
        expandShown(i, j)
    }
    elCell.innerText = cellContent
    checkBoard();
}

function checkBoard() {
    var clickedCells = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) continue;
            if (gBoard[i][j].isShown) clickedCells++
        }
    }
    if (clickedCells === gLevel.SIZE * gLevel.SIZE - gLevel.MINES) setVictory()
}

function toggleFlag(elCell, event) {
    event.preventDefault();
    if (elCell.innerText === FLAG) {
        elCell.innerText = EMPTY
    } else {
        elCell.innerText = FLAG
    }
}
//maybe help for the bonus ?

function expandShown(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            var neighbor = document.querySelector(`.cell-${i}-${j}`)
            gBoard[i][j].isShown = true
            neighbor.innerText = gBoard[i][j].minesAroundCount
            neighbor.style.background = clickedCellColor

            if (gBoard[i][j].minesAroundCount > 0) {
                neighbor.innerText = gBoard[i][j].minesAroundCount
            } else {
                neighbor.innerText = EMPTY
            }
        }
    }
}

// i am checking all the cells without a mine and than
// send the other function and put it into  - cell.minesAroundCount.

// Count mines around each cell and set the cell's minesAroundCount.

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) continue;
            gBoard[i][j].minesAroundCount = countMineNegs(i, j)
        }

    }
}

// the neighbours loop
function countMineNegs(cellI, cellJ) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMarked) continue;
            if (gBoard[i][j].isShown) continue;
            if (gBoard[i][j].isMine)
                negsCount++
        }
    }
    return negsCount;
}

function renderSmiley() {
    switch (gLives) {
        case 0:
            elSmiley.innerText = LOOSE
            break;
        case 2:
            elSmiley.innerText = BLOWN
            break;
        case 3:
            elSmiley.innerText = START_SMILEY;
            break;
    }
}
