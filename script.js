var height = 6;     // number of guesses
var width = 5;      // length of the word

var row = 0;        // current guess (attempt #)
var col = 0;        // current letter for that attempt

var gameOver = false;

var options = ["FRUITS", "INTERNATIONAL PLACES", "NATIONAL PLACES"];

var fruits = ["APPLE", "MANGO", "GRAPE", "GUAVA", "DATES", "PEACH"];
var international_places = ["INDIA", "CHINA", "JAPAN", "FRANCE", "ITALY", "SPAIN", "PARIS", "TOKYO", "CHILE", "QATAR", "DUBAI", "NEPAL", "BHUTAN", "KENYA", "LIBYA", "SYRIA", "KOREA", "PERTH"];
var national_places = ["DELHI", "PATNA", "SURAT", "SHIMLA", "AJMER", "BIHAR", "BHOPAL", "JAMMU", "ASSAM"];

var word = fruits[Math.floor(Math.random() * fruits.length)];;

function randomWord(option) {
    switch (option) {
        case "FRUITS":
            word = fruits[Math.floor(Math.random() * fruits.length)];
            break;

        case "INTERNATIONAL PLACES":
            word = international_places[Math.floor(Math.random() * international_places.length)];
            break;

        case "NATIONAL PLACES":
            word = national_places[Math.floor(Math.random() * national_places.length)];
            break;
    }
}

window.onload = function () {

    var select = document.getElementById("dropdown");

    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    // Add event listener for 'change' event
    select.addEventListener('change', function() {
        randomWord(this.value);

        // Clear the game board
        var board = document.getElementById("board");
        board.innerHTML = '';

        // Reset game variables
        row = 0;
        col = 0;
        gameOver = false;

        // Initialize a new game board
        initialize();
    });

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col++;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width)
                col--;
            
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row++;      // start new row
            col = 0;    // start at 0 for new row
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }

    })

    initialize();
}

function initialize() {
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct++;
        }
        else if (word.includes(letter))
            // Is it in the word?
            currTile.classList.add("present");
        else
            // Not in the word
            currTile.classList.add("absent");

        if (correct == width)
            gameOver = true;
    }
}