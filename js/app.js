'use strict'

var gBoard
const LIFE = '🤍';
const WIN = '😎';
const BLOWN = '🤯'
const LOOSE = '😭';
const START_SMILEY = '😃';
const EMPTY = ' ';
const MINE = '💣';
const FLAG = '🚩';
const clickedCellColor = '#172b5c'
var elFinishModal = document.querySelector('.finish-modal')
var elSmiley = document.querySelector('.smiley')
var elHeart = document.querySelector('.heart')
var gLives = 3


var cell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true,
}

var gLevel = {
    SIZE: 4,
    MINES: 2,
};

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    interval: 0,
    startTime: 0,
}

function initGame() {
    gBoard = buildBoard()
    console.table(gBoard)
    gGame.startTime = new Date();
    gLives = 3
    renderBoard()
    setLives()
    renderSmiley()
    checkGameOver()
}

function setLives() {
    var strHTML = '<div class="lives">';
    for (var i = 0; i < gLives; i++) {
        strHTML += `<span class="hearts">${LIFE}</span>`;
    }
    strHTML += `</div>`
    var elLives = document.querySelector('.lives');
    elLives.innerHTML = strHTML;
}

//i didnt press on the mines , and all the other cells are shown
function setVictory() {
    elSmiley.innerText = WIN;
    elFinishModal.innerText = 'You win'
    elFinishModal.style.display = 'block'
    clearInterval(gGame.interval);
}

// Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {
    if (gLives === 0) {
        clearInterval(gGame.interval);
        elFinishModal.style.display = 'block'
        elFinishModal.innerText = 'Game over!'
    } else elFinishModal.style.display = 'none'
}

function gameLevel(button) {
    var level = button.innerText
    if (level === 'Beginner') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
    }
    if (level === 'Advanced') {
        gLevel.SIZE = 8
        gLevel.MINES = 12
    }
    if (level === 'Expert') {
        gLevel.SIZE = 12
        gLevel.MINES = 30
    }
    gGame.interval = setInterval(renderTimer, 1000);
    initGame()
}

