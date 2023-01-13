// arrays
let insertedCells = [];
let bombIndex = [];

// flags
let gameOver = false;
let cellsCreated = false;
let playerScore = 0;
let playerHighScore = 0;
let remainingCells;
// selectors
const gridContainer = document.getElementById('grid-container');
const startGame = document.getElementById('start-game');
const resetGame = document.getElementById('reset-game');
const score = document.getElementById('score-text');
const highScore = document.getElementById('high-score');
let selectedDifficulty;

startGame.addEventListener ('click',
    function(){
        if (!cellsCreated) {

            let numberOfCells;
            selectedDifficulty = document.getElementById('difficulty-selector').value;

            if (selectedDifficulty === "placeholder") {
                alert("Please select a difficulty!");
                return;
            }
            else if (selectedDifficulty === "Easy") {
                numberOfCells = 100;
            } else if (selectedDifficulty === "Normal") {
                numberOfCells = 81;
            } else if (selectedDifficulty === "Hard") {
                numberOfCells = 49;
            }

            for (let i = 0; i < numberOfCells; i++) {

                const newCell = createNewCell(i);
                
                gridContainer.append(newCell);
            }
            
            // adding bombs to random cells
            while (bombIndex.length < 16) {
                let randomIndex = Math.floor(Math.random() * numberOfCells )
                if(!bombIndex.includes(randomIndex)){
                    bombIndex.push(randomIndex);
                }
            }
            for (let i = 0; i < bombIndex.length; i++) {
                insertedCells[bombIndex[i]].classList.add('Bomb');
            }
            remainingCells = insertedCells.length - bombIndex.length;
            console.log(remainingCells);
            cellsCreated = true;
            resetGame.style.display = "block";
            startGame.style.display = "none";
        }
    }
);
console.log(insertedCells);
console.log(bombIndex);

function createNewCell(number) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    if (selectedDifficulty === "Easy") {
        cell.classList.add('Easy');
    } else if (selectedDifficulty === "Normal") {
        cell.classList.add('Normal');
    } else if (selectedDifficulty === "Hard") {
        cell.classList.add('Hard');
    }
    cell.innerHTML = number + 1; 

    cell.addEventListener('click',
        function () {
            console.log("cell " + this.innerText);
            
            if (gameOver == true) {
                return;
            }
            while (!this.classList.contains('clicked')){
                this.classList.add('clicked');
                if (this.classList.contains(('Bomb'))) {
                    score.innerHTML = "Score : " + playerScore;
                }else{
                    playerScore = playerScore + 1;
                    remainingCells--;
                    score.innerHTML = "Score : " + playerScore;
                    console.log(remainingCells);
                }
            }

            if (this.classList.contains('Bomb')) {
                score.innerHTML = "You lost!" + `<span class ="text-danger"> Total score: ${playerScore} </span>` + `<span class ="small-txt"> Press reset on top right to try again! </span>`;
                gameOver = true;
                
                // show every bomb cell
                let bombs = document.querySelectorAll('.Bomb');
                for (let i = 0; i < bombs.length; i++) {
                    bombs[i].classList.add("clicked");
                }
            }

            if (remainingCells === 0) {
                score.innerHTML = "Congratulations, you won!" + `<span class ="text-success"> Total score: ${playerScore} </span>`;
                gameOver = true;
            }

            if (playerScore > playerHighScore) {
                playerHighScore = playerScore;
                highScore.innerText = "Highscore: " + playerHighScore;
            }
        }
    );
    insertedCells.push(cell);
    return cell;
}

resetGame.addEventListener ('click',
    function () {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        cellsCreated = false;

        const cells = document.getElementsByClassName('cell');

        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('Easy', 'Normal', 'Hard', 'Bomb');
        }       

        // reset for insertedCells  bombindex Arrays
        insertedCells = [];
        bombIndex = [];
        // reset game over value
        gameOver = false;
        playerScore = 0;
        score.innerHTML = "";

        // buttons
        resetGame.style.display = "none";
        startGame.style.display = "block";
    }
);

