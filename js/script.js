const gridContainer = document.getElementById('grid-container');
const startGame = document.getElementById('start-game');
const resetGame = document.getElementById('reset-game');
let cellsCreated = false;
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
            cellsCreated = true;
        }
    }
);


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

    cell.innerHTML = number + 1; // Add the progressive number

    cell.addEventListener('click',
        function () {
            console.log("cell " + this.innerText);

            if(this.classList.contains('clicked')){
                this.classList.remove('clicked');
            }
            else{
                this.classList.add('clicked');
            }
        }
    );
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
            cells[i].classList.remove('easy', 'normal', 'hard');
        }       

        selectedDifficulty = document.getElementById('difficulty-selector').value = "placeholder";
    }
);
