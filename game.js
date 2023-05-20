
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

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows,mapRowCols});

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
        console.log('Subiste de Nivel!!');
    }

    const enemyCollision = enemyPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY
    });

    if(enemyCollision){
        console.log('Pisaste una Bomba!!');
    }

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




