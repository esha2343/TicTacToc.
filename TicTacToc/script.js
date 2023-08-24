const boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector("[data-game-Player]");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
// gameInfo.innerText = `Current Player ${currentPlayer}`;
let gamegrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function initGame() {
    currentPlayer = "X";
    gamegrid = ["", "", "", "", "", "", "", "", ""];

    // UI par change empty show
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialise box with css properties again
        box.classList = `box box${index + 1}`;
    });

    gameInfo.innerText = `Current Player ${currentPlayer}`;
    newGameBtn.classList.remove("active");
}

initGame();


function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        if ((gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")
            && (gamegrid[position[0]] === gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])) {

            //check if wiiner is X
            if (gamegrid[position[0]] == "X") {
                answer = "X";
            } else {
                answer = "0";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now er konow winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when winner nhi mila to
    let fillCount = 0;

    gamegrid.forEach((box) => {
        if (box !== "") fillCount++;
    });

    //board if full
    if (fillCount === 9) {
        gameInfo.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }

}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    } else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player-${currentPlayer}`;
}

function handleClick(index) {

    if (gamegrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gamegrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check koi jeeta to nhi
        checkGameOver()
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);