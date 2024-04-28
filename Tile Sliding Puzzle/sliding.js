const board = document.querySelector(".board");
const tiles = [
    "../Tile Sliding Puzzle/img/1.png",
    "../Tile Sliding Puzzle/img/2.png",
    "../Tile Sliding Puzzle/img/3.png",
    "../Tile Sliding Puzzle/img/4.png",
    "../Tile Sliding Puzzle/img/5.png",
    "../Tile Sliding Puzzle/img/6.png",
    "../Tile Sliding Puzzle/img/7.png",
    "../Tile Sliding Puzzle/img/8.png",
];
const Wmsg = document.querySelector(".winning-message");
const msg = document.querySelector(".msg");
let moves = 0;
const mov_var = document.querySelector(".moves");
mov_var.textContent = moves;
let emptyTile;
const cells = board.querySelectorAll('.cell');

shuffleImages();
board.addEventListener("click", moveTile);

function shuffleImages() {
    let currentIndex = tiles.length;
    while (currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        let temp = tiles[randomIndex];
        tiles[randomIndex] = tiles[currentIndex];
        tiles[currentIndex] = temp;
    }
    generateImages();
}

function generateImages() {
    let x = 0;
    cells.forEach((cell, index) => {
        if (tiles[index]) {
            cell.innerHTML = `<img src="${tiles[index]}" class="image" data-no="${x}"> </img>`;
            x++;
        } else {
            cell.innerHTML = '';
        }
    });
    updateEmptyTile();
}


function updateEmptyTile() {
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].querySelector("img")) {
            emptyTile = i;
            return;
        }
    }
}

function moveTile(event) {
    const clickedCell = event.target.closest('.cell');
    if (!clickedCell) return; // Ignore clicks outside cells
    const clickedIndex = Array.from(cells).indexOf(clickedCell);
    const clickedRow = Math.floor(clickedIndex / 3) + 1; // Convert to 1-based indexing
    const clickedCol = (clickedIndex % 3) + 1; // Convert to 1-based indexing
    const emptyRow = Math.floor(emptyTile / 3) + 1; // Convert to 1-based indexing
    const emptyCol = (emptyTile % 3) + 1; // Convert to 1-based indexing

    if ((Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
        (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)) {
        // Swap the clicked tile with the empty tile
        const temp = tiles[clickedIndex];
        tiles[clickedIndex] = tiles[emptyTile];
        tiles[emptyTile] = temp;

        // Update the board
        generateImages();

        // Increment moves count
        moves++;
        mov_var.textContent = moves;

        // Check for win condition
        if (isWon()) {
            console.log("we won");
            Wmsg.classList.add("show");
            msg.textContent = `You Won in ${mov_var.textContent} moves!`;
            board.removeEventListener("click", moveTile); // Disable further moves
        }
    }
}

function isWon() {
    for (let i = 0; i < cells.length-1; i++) {
        const imgSrc = cells[i].querySelector("img") ? parseInt(cells[i].querySelector("img").dataset.no) : '';
        if (imgSrc !== i) {
            console.log("nope");
            return false;
        }
    }
    return true;
}

const restart = document.querySelector("#restartButton");
restart.addEventListener("click", () => {
    setTimeout(() => {
        location.reload();
    }, 90);
});
