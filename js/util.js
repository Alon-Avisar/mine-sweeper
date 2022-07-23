function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function renderTimer() {
    var timeNow = new Date();
    var seconds = Math.floor((timeNow - gGame.startTime) / 1000);

    // make the timer alway 3 chars long
    if (seconds < 10) seconds = '00' + seconds;
    else if (seconds < 100) seconds = '0' + seconds;
    else if (seconds > 999) seconds = '999';

    var elTimer = document.querySelector('.timer');
    elTimer.innerText = seconds;
}