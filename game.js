
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

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

    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI) => {
            const emoji = emojis[col];
            const posX = (elementSize ) * (colI + 1.1);
            const posY = (elementSize ) * (rowI + 0.85);
            game.fillText(emoji,posX,posY);
        });
    });    


    // for (let row = 1; row <= 10; row++) {
        
    //     for (let col = 1; col <= 10; col++) {

    //         game.fillText(emojis[mapRowCols[row - 1][col -1]]
    //             ,elementSize * col+5,elementSize * row-10);

    //     }
    // }

}

