let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let turnO = true;
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#winMsg");
let playGame = document.querySelector(".playGame");
let head = document.querySelector(".header");
let playAgain = document.querySelector(".playAgain");
let playAgain2 = document.querySelector(".playAgain2");
let turn = document.querySelector(".turn");
let ting = new Audio("./Resources/ting.wav");
let gameOver = new Audio("./Resources/winSound.mp3");
let drawSound = new Audio("./Resources/gameover.mp3");
let drawCnt = 0;
let draw = false;
let drawMsg = document.querySelector(".drawMsg");
let win = false;

drawMsg.style.display = "none";
turn.innerText = "O's Turn";


let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const resetB = () => {
    turnO = true;
    drawCnt = 0;
    drawMsg.style.display = "none";
    ting.play();
    enableBoxes();
    msgContainer.classList.add("hide");
    turn.style.display = "contents";
    for(let box of boxes) {
        box.innerText = "";
    }
}

const shoWinner = (winner) => {
    turn.style.display = "none";
    drawMsg.style.display = "none";
    gameOver.play();
    msgContainer.classList.remove("hide");
    msg.innerText = `${winner} Won the game`;
}


// Checks the winner 
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                win = true;
                shoWinner(pos1Val);
                disableBoxes();
            }
        }
    }
}

const begin = () => {
    enableBoxes();
    ting.play();
    for(let box of boxes) {
        box.style.backgroundColor = "rgba(188, 108, 37, 1)"
        box.style.border = "2px solid rgba(40, 54, 24, 1)"
    }
    head.style.display = "none";
    turn.style.display = "contents";
    resetBtn.style.display = "initial";
}

const drawFun = () => {
    drawSound.play();
    drawMsg.style.display = "contents";
    turn.style.display = "none";
    playAgain2.addEventListener('click', resetB);
}

// Inputs X / O in box
boxes.forEach((box) => {
    
    resetBtn.style.display = "none";
    disableBoxes();
    turn.style.display = "none";
    playGame.addEventListener('click', begin)

    box.addEventListener("click", () => {

        drawCnt++;
        ting.play();

        if(drawCnt == 9) {
            drawFun();
        }
        
        if(turnO) {
            turn.innerText = "X's Turn";
            box.innerText = "O";
            turnO = false;
        }
        else {
            turn.innerText = "O's Turn";
            box.innerText = "X";
            turnO = true;
        }
        checkWinner();
        
        box.disabled = true;
    } )
});

resetBtn.addEventListener("click", resetB);
playAgain.addEventListener("click", resetB);