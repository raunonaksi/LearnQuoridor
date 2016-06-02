//grid width and height
var bw = 450;
var bh = 450;

//padding around grid
var p = 10;

//size of canvas - change later if needed
var cw = bw;
var ch = bh;

var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo('.Game');
var ctx = canvas.get(0).getContext("2d");

//pawn settings
var pawnRadius = 10;
var pawnX = cw/2;
var pawnY = ch/2;

//arrows used
var rightPressed = false;
var leftPressed = false
var downPressed = false;
var upPressed = false;

//Grid elements
var RowCount = 9;
var ColumnCount = 9;
var gWidth = bw/ColumnCount;
var gHeight = bh/RowCount;

var gridE = [];
for(c=0; c<ColumnCount; c++) {
    gridE[c] = [];
    for(r=0; r<RowCount; r++) {
        gridE[c][r] = { x: 0, y: 0};
    }
}

//walls
var walls = [];
for(c=0; c<ColumnCount*2-1; c++) {
    walls[c] = [];
    if ((c % 2) == 1) {
        rows= RowCount;
    } else {
        rows = RowCount - 1;
    }
    for(r=0; r<rows; r++) {
        walls[c][r] = { x: 0, y: 0 , active: false};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false); //for walls
document.addEventListener("mousedown", mousedownHandler, false); //for walls
document.addEventListener("mouseover", mouseOverHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }        
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }  
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX;
    var relativeY = e.clientY;

}

function mousedownHandler(e) {
    //TODO Moving Pawn and Activing wall
}

function mouseOverHandler(e) {
    //TODO Highlight the wall
}


function drawPawn() {
    ctx.beginPath();
    ctx.arc(pawnX, pawnY, pawnRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function activateWall(){
    //TODO
  
}

function drawWalls() {
    for(c=0; c<ColumnCount*2-1; c++) {
        if ((c % 2) == 1) {
            rows = RowCount;
        } else {
            rows = RowCount - 1;
        }    
        for(r=0; r<rows; r++) {
            if ((c % 2) == 1) {
                var wX = ((c+1)*(gWidth)-4)/2;
                var wY = (r*(gHeight));
            } else {
                var wX = (c*gWidth)/2;
                var wY = ((r+1)*gHeight-4);
            }
            if (walls[c][r].active){
                walls[c][r].x = wX;
                walls[c][r].y = wY;
                ctx.beginPath();
                if ((c % 2) == 1) {
                    ctx.rect(wX, wY, 8, gHeight);
                } else {
                    ctx.rect(wX, wY, gWidth, 8);
                }         
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBoard(){
    for(c=0; c<ColumnCount; c++) {
        for(r=0; r<RowCount; r++) {
            var gX = (c*(gWidth));
            var gY = (r*(gHeight));
            gridE[c][r].x = gX;
            gridE[c][r].y = gY;
            ctx.beginPath();
            ctx.lineWidth="2";
            ctx.strokeStyle="black";
            ctx.rect(gX, gY, gWidth, gHeight);
            ctx.stroke();
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
	drawBoard();
    drawWalls();
    drawPawn();

    if(rightPressed && pawnX < cw - pawnRadius) {
        pawnX += 1;
    }
    else if(leftPressed && pawnX - pawnRadius > 0) {
        pawnX -= 1;
    }
    else if(upPressed && pawnY - pawnRadius > 0) {
        pawnY -= 1;
    }
    else if(downPressed && pawnY < ch - pawnRadius) {
        pawnY += 1;
    }


    requestAnimationFrame(draw);
}

draw();
