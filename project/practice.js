function startGame() 
{
    snakeDirection();
    let lose = GameOver();
    if(lose)
    {
        document.body.addEventListener('keydown', playAgain);
        return;
    }
    backgroundcolor();
    checkeatbody();
    let win = YouWin();
    if(win)
    {
        document.body.addEventListener('keydown', playAgain);
        return;
    }
    drawBody();
    drawSnake();
    drawScore();
    setTimeout(startGame, 3000/speed);//重複上述內容
}

const canvas = document.getElementById('game');
//先從html裡抓到id為game的canvas(之前在W3School裡學過!)
const ctx = canvas.getContext('2d');
//設定他的context

class SnakePart
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

let speed = 8;

let MapCount = 20;//地圖大小
let MapSize = canvas.width / MapCount - 2;//繪製地圖方格，也就是蛇走的路徑

let headX = 15;
let headY = 8;
// 蛇的起始位置

const snakePart = [];

let BodyLen = 0;
//蛇身長度

let BodyX = 13;
let BodyY = 5;
// 身體的起始位置

let xV = 0;
let yV = 0;
//蛇的速度

let score = 0;
//起始分數

function snakeDirection()//蛇的方向 
{
    headX = headX + xV;
    headY = headY + yV;
    //蛇的新位置=舊位置+速度
}

function GameOver()
 {
    let Over = false;

    if(headX < 0 || headX == 20 || headY < 0 || headY == 20)
    {
        Over = true;
    }
    /*蛇撞上地圖邊界，觸發遊戲結束設定*/
    if(Over) //輸了之後顯示的文字
    {
        ctx.fillStyle = "white"; //顏色
        ctx.font = "50px Poppins"; //大小
        ctx.fillText("Game Over!", canvas.width/6.5, canvas.height /2); //顯示的字，以及位置
        ctx.font = "40px Poppins";
        ctx.fillText("再玩一次?", canvas.width/3.5, canvas.height /2 + 50 );
        ctx.font = "25px Poppins";
        ctx.fillText("按空白鍵", canvas.width/2.7, canvas.height /2 +100 );
    }

    return Over;
}

function playAgain(event) //在玩一次
{
    if(event.keyCode == 32)//32是空白鍵
    {
        location.reload();
    }
}

function backgroundcolor() //設定背景顏色
 {
    ctx.fillStyle= '#b6d7a8';
    ctx.fillRect(0, 0, 400, 400);
}

function checkeatbody()//確認玩家是否有接到身體
 {
    if(BodyX === headX && BodyY === headY)
    {
        BodyX = Math.floor(Math.random() * MapCount);
        BodyY = Math.floor(Math.random() * MapCount);
        BodyLen ++;
        score += 5;
    }
}

function YouWin()
 {
    let win = false;
    if(score == 100)
    {
        win = true;
    }
    if(win)
    {
        ctx.fillStyle = "black";
        ctx.font = "50px Poppins";
        ctx.fillText("你贏了!", canvas.width/3.3, canvas.height /2)
    }

    return win;
}

function drawBody() //繪製蛇的身體方塊
{
    ctx.fillStyle = "#ff0";
    ctx.fillRect(BodyX * MapCount, BodyY * MapCount, MapSize, MapSize);
}

function drawSnake() //蛇的身體加長
{
    
    ctx.fillStyle = "#ffe599";
    for(let i = 0; i< snakePart.length; i++)
    {
        let part = snakePart[i];
        ctx.fillRect(part.x * MapCount, part.y * MapCount, MapSize, MapSize);
    }

    snakePart.push( new SnakePart(headX, headY));
    if(snakePart.length > BodyLen)
    {
        snakePart.shift();
    }

    ctx.fillStyle = '#f1c232';
    ctx.fillRect(headX * MapCount, headY *MapCount, MapSize, MapSize);
}

function drawScore() 
{
    ctx.fillStyle = "black";
    ctx.font = "20px Poppins";
    ctx.fillText("Score: " + score, canvas.width-80, 30);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) //鍵盤函數!
{
    //這邊需參考keycode對照表!!
    if(event.keyCode== 38)//38是上鍵
    {
        if(yV == 1) 
            return;
        yV = -1;
        xV = 0;
    }

    if(event.keyCode == 40)//40是下鍵
    {
        if(yV == -1) 
            return;
        yV = 1;
        xV = 0;
    }

    if(event.keyCode == 37)//37是左鍵
    {
        if(xV == 1) 
            return;
        yV = 0;
        xV = -1;
    }

    if(event.keyCode == 39)//39是右 鍵
    {
        if(xV == -1) 
            return;
        yV = 0;
        xV = 1;
    }
}
function playAgain(event)
{
    //這邊需參考keycode對照表!!
    if(event.keyCode == 32)//32是空白鍵
    {
        location.reload();
    }
}

startGame();
