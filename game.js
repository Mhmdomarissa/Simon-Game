const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0

document.addEventListener('keypress', () => {

    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence();
        started = true
    }
})

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener('click', function() {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    document.querySelector(`#${randomChosenColor}`).classList.add("flash");
    setTimeout(() => {
        document.querySelector(`#${randomChosenColor}`).classList.remove("flash");
    }, 100);

    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    let button = document.querySelector(`#${currentColor}`);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}