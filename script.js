
const click = new Audio("Click.mp3");
const winning = new Audio("Winning.mp3");
const draw = new Audio("draw.wav");
const reset = new Audio("reset.wav");

const boxes = document.querySelectorAll(".box");
const resetbtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const gif = document.querySelector(".gif");
const gif2 = document.querySelector(".gif2");
const msg = document.querySelector("#msg");

let turnO = true;
let moves = 0;

const resetGame = () => {
    boxes.forEach(box => {
        box.classList.remove('winning-box');
    });
    turnO = true;
    moves = 0;
    reset.play();
    enableboxes();
    msgContainer.classList.add("hide");
    gif.classList.add("hidden");
    gif2.classList.add("hidden");
};

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableboxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enableboxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner, pattern) => {
    pattern.forEach(pos => {
        boxes[pos].classList.add('winning-box');
    });
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gif.classList.remove("hidden");
    disableboxes();
    winning.play();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val) {
                showWinner(pos1Val, pattern);
            }
        }
    }
};

const checkDraw = () => {
    if (moves === 9) {
        let noWinner = true;
        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val) {
                noWinner = false;
                break;
            }
        }

        if (noWinner) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
            gif2.classList.remove("hiddenn");
            disableboxes();
            draw.play();
        }
    }
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            moves++;
            click.play();
            checkWinner();
            checkDraw();
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
