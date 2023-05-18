
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined,
}

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

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows,mapRowCols});

    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI) => {
            const emoji = emojis[col];
            const posX = (elementSize ) * (colI + 1.2);
            const posY = (elementSize ) * (rowI + 0.85);

            if(col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }            

            game.fillText(emoji,posX,posY);
        });
    });    

    movePlayer();
}

function movePlayer(){
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
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
    playerPosition.y -= elementSize;
    starGame();
}
function moveLeft(){
    console.log('Mequiero mover hacia la izquierda');
    playerPosition.x -= elementSize;
    starGame();
}
function moveRight(){
    console.log('Mequiero mover hacia la derecha');
    playerPosition.x += elementSize;
    starGame();
}
function moveDown(){
    console.log('Mequiero mover hacia abajo');
    playerPosition.y += elementSize;
    starGame();
}




