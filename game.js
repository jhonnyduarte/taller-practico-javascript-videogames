
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x: undefined,
    y: undefined,
}
let enemyPosition = [];

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize() {

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else{
        canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10);

    starGame();
}

function starGame(){

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if(!map){
        gameWin();
        return;
    }
    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime,1000);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows,mapRowCols});

    showLives();

    enemyPosition = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI) => {
            const emoji = emojis[col];
            const posX = elementSize  * (colI + 1.2);
            const posY = elementSize  * (rowI + 0.85);

            if(col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col == 'X'){
                enemyPosition.push({
                    x: posX,
                    y: posY,
                });
            }          

            game.fillText(emoji,posX,posY);
        });
    });    

    movePlayer();
}

function movePlayer(){
    const giftColisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftColisiony = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftColision = giftColisionX && giftColisiony;

    if(giftColision){
        levelWin();
    }

    const enemyCollision = enemyPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY
    });

    if(enemyCollision){
        levelFail();
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);

}

function levelWin(){
    console.log('Subiste de Nivel!!');
    level++;
    starGame();
}

function levelFail(){
    console.log('Pisaste una bomba!!');
    lives--;

    console.log(lives);

    if(lives <= 0){
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    starGame();
}

function gameWin(){
    console.log('Ganaste el Juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if(recordTime){
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time',playerTime);
            pResult.innerHTML = ('Superaste el Record!!');
        } else{
            console.log('No superaste el actual Record!!');
        }
    } else {
        localStorage.setItem('record_time',playerTime);
        pResult.innerHTML = 'Primera vez!!'
    }
    console.log({recordTime,playerTime});

}

function showLives(){

    const heartsArray = Array(lives).fill(emojis['HEART'])
    console.log(heartsArray);

    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');

}

window.addEventListener('keydown',moveByKeys);
btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);

function moveByKeys(event){
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();   
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}

function moveUp(){
    
    console.log('Mequiero mover hacia arriba');
    if((playerPosition.y - elementSize) < 0){
        console.log('Out!!!');
    }else{
        playerPosition.y -= elementSize;
        starGame();
    }
    console.log(playerPosition.y);
    console.log(elementSize);
    
}
function moveLeft(){
    console.log('Mequiero mover hacia la izquierda');
    if(playerPosition.x - elementSize < elementSize){
        console.log('Out!!!');
    } else {
        playerPosition.x -= elementSize;
        starGame();
    }
}
function moveRight(){
    console.log('Mequiero mover hacia la derecha');
    if(playerPosition.x + elementSize > canvasSize + elementSize){
        console.log('Out!!');
    } else{
        playerPosition.x += elementSize;
    starGame();
    }
    
}
function moveDown(){
    console.log('Mequiero mover hacia abajo');
    if(playerPosition.y + elementSize > canvasSize){
        console.log('Out!!');
    } else {
        playerPosition.y += elementSize;
        starGame();
    }
    
}




