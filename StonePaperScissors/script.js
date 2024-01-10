let userScore = 0;
let compScore = 0;

let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector(".resetBtn");
let usersc = document.querySelector("#user");
let compsc = document.querySelector("#comp");
let dispUserCh = document.querySelector("#userCh");
let dispCompCh = document.querySelector("#compCh");
const choices = document.querySelectorAll(".choice");
let gameOver = new Audio("./music/gameOver1.mp3");
let victory = new Audio("./music/victory.mp3");
let draw = new Audio("./music/gameover.mp3");


const genCompCh = () => {

    let options = ["stone", "paper", "scissors"];
    let ranIndex = Math.floor(Math.random() * 3);

    return options[ranIndex];

}

let gameDraw = (userChoice, compChoice) => {

    draw.play();
    msgContainer.style.backgroundColor = "blue";
    msg.innerText = "Its a DRAW";

}

let Winner = (userChoice, compChoice) => {
    if((userChoice==="stone" && compChoice==="paper") || (userChoice==="paper" && compChoice==="scissors") || (userChoice==="scissors" && compChoice==="stone")) {
        compScore += 1;
        compsc.innerText = compScore;
        gameOver.play();
        msgContainer.style.backgroundColor = "red";
        msg.innerText = `OOPS, Computer Won! ${compChoice} beats your ${userChoice}`;
    }

    if((userChoice==="paper" && compChoice==="stone") || (userChoice==="scissors" && compChoice==="paper") || (userChoice==="stone" && compChoice==="scissors")) {
        userScore += 1;
        usersc.innerText = userScore;
        victory.play();
        msgContainer.style.backgroundColor = "green";
        msg.innerText = `CONGRATS, You Won! your ${userChoice} beats ${compChoice}`;
    }
}

const playGame = (userChoice) => {

    let compChoice = genCompCh();

    if(userChoice === compChoice) {
        gameDraw(userChoice, compChoice);
    }
    Winner(userChoice, compChoice);

}

resetBtn.addEventListener("click", () => {

    userScore = 0;
    compScore = 0;
    usersc.innerText = userScore;
    compsc.innerText = compScore;
    msgContainer.style.backgroundColor = "black";
    msg.innerText = "Play your move";
    // dispUserCh.innerText = "You: ";
    // dispCompCh.innerText = "Computer: ";

})

choices.forEach((choice) => {

    choice.addEventListener("click", () => {
        let userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })

})