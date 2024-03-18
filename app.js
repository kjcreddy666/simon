let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let body = document.querySelector("body");
let heading = document.querySelector("h2");
let btns = document.querySelectorAll("button");

let btnColor = ["green","red","yellow","blue"];
let allBtns = {
    "green" : btns[0],
    "red" : btns[1],
    "yellow" : btns[2],
    "blue" : btns[3]
};

let game = function() {
    if(!started) {
        started = true;
        setTimeout(levelUp(),1500);
    }
}

document.addEventListener("keypress", game);

let levelUp = function() {
    userSeq = [];
    let btnIndex = Math.floor(Math.random()*4);
    gameSeq.push(btnColor[btnIndex]);
    console.log(gameSeq);
    let btn = allBtns[btnColor[btnIndex]];
    btnFlash(btn);
    heading.innerText = `Level ${++level}`;
}

let btnFlash = function(btn) {
    btn.classList.add("flash");
    setInterval(function () {
        btn.classList.remove("flash");
    }, 400);
}

for(let btn of btns) {
    btn.addEventListener("click",function() {
        if(started) {
            btnFlash(this);
            userSeq.push(this.getAttribute("id"));
            check(userSeq.length-1);
        }
    });
}

let check = function(index) {
    if(userSeq[index] == gameSeq[index]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,2000);
        }
    } else if(started){
        reset();
    }
}

function reset() {
    let text;
    if(highScore < level) {
        highScore = level;
        text = `Gameover! You achieved highest score ${highScore}`;
    } else {
        text = `Gameover! Your score is ${level} and high score is ${highScore}`;
    }
    heading.innerText = text;
    body.classList.add("red");
    setTimeout(function() {
        body.classList.remove("red");
    }, 250);

    started = false;
    gameSeq = [];
    level = 0;
}