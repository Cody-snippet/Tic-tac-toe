const click = new Audio("Click.mp3");
const winning = new Audio("Winning.mp3");
const draw = new Audio("draw.wav");
const reset = new Audio ("reset.wav");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const gif = document.querySelector(".gif");
const gif2 = document.querySelector(".gif2");
const msg = document.querySelector("#msg");

let currentPlayer = "X";
let gameOver = false;

const resetGame = () => {
    boxes.forEach(box => {
        box.classList.remove('winning-box');
    });
    currentPlayer = "X";
    gameOver = false;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        reset.play();
    });
    msgContainer.classList.add("hide");
    gif.classList.add("hidden");
  gif2.classList.add("hiddenn");
};

const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

const checkWin = () => {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText;
    });
};

const checkDraw = () => {
    return Array.from(boxes).every(box => box.innerText !== "");
};

const computerMove = () => {
    const availableCells = Array.from(boxes).filter(box => box.innerText === "");

    if (availableCells.length > 0 && !gameOver) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const randomCell = availableCells[randomIndex];
        randomCell.innerText = currentPlayer;

        if (checkWin(winPatterns)) { 
            winPatterns.forEach(pattern => { 
                const [a, b, c] = pattern;
        if (boxes[a].innerText === currentPlayer &&
            boxes[b].innerText === currentPlayer &&
            boxes[c].innerText === currentPlayer) {
                pattern.forEach(pos => { 
                    boxes[pos].classList.add('winning-box');
                });
            }
            });
            msg.innerText = "Congratulations, the winner is " + currentPlayer;
            msgContainer.classList.remove("hide");
            gif.classList.remove("hidden");
            gameOver = true;
            winning.play();

        } else if (checkDraw()) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
            gif2.classList.remove("hiddenn");
            gameOver = true;
            draw.play();
            
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!box.innerText && !gameOver) {
            box.innerText = currentPlayer;
            click.play();

            if (checkWin(winPatterns)) { 
                winPatterns.forEach(pattern => {
                    const [a, b, c] = pattern;
        if (boxes[a].innerText === currentPlayer &&
            boxes[b].innerText === currentPlayer &&
            boxes[c].innerText === currentPlayer) { 
                    pattern.forEach(pos => { 
                        boxes[pos].classList.add('winning-box');
                    });
                }
                });
                msg.innerText = "Congratulations, the winner is " + currentPlayer;
                msgContainer.classList.remove("hide");
                gif.classList.remove("hidden");
                gameOver = true;
                winning.play();

            } else if (checkDraw()) {
                msg.innerText = "It's a draw!";
                msgContainer.classList.remove("hide");
                gif2.classList.remove("hiddenn");
                gameOver = true;
                draw.play();

            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                setTimeout(computerMove, 300); 
            }
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
