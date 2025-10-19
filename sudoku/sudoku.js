const start = document.getElementById('start-button');
const dif = document.querySelectorAll('.dif-button');
const game_container = document.getElementById('game-container');
const mistake_container = document.getElementById('mistake-container');
let size = null
let container_size
let score = 0
let timerInterval;
let totalSeconds = 0;
let correctStreak
let mistakeStreak
let task_table

start.addEventListener('click', () => {
    if (size !== null) {
        correctStreak = 0
        mistakeStreak = 0
        let answer_table = createArrayTable(size);
        let task_table_arr = createTaskTable(answer_table);
        task_table = task_table_arr[0]
        let empty_fields = task_table_arr[1]
        table_output(task_table, empty_fields);
    }
})
dif.forEach(button => {
    button.addEventListener('click', () => {
        size = Number(button.value);
        container_size = Math.sqrt(size);
        console.log(`Size:${size}x${size}
    Container size:${container_size}`);
    })
})

function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        let copy_i = array[i]
        array[i] = array[j];
        array[j] = copy_i;
    }
    return array;
}

function rawControl(arr_table, index, index_cont) {
    let pop_arr = [];
    let arr_index = [];// array of indexes that we will check in others sectors
    let startIndex = Math.floor((index) / container_size) * container_size;
    for (let i = startIndex; i < startIndex + container_size; i++) {
        arr_index.push(i);
    }
    //adding index for check
    let startIndexContainer = Math.floor((index_cont - 1) / container_size) * container_size;
    for (let indexOne = startIndexContainer + 1; indexOne <= startIndexContainer + container_size; indexOne++) {
        try {
            arr_index.forEach((indexTwo) => {
                pop_arr.push(arr_table[indexOne][indexTwo]);
            })
        } catch (err) {
            console.log(err);
        }
    }
    //check and adding numbers that will be filtred
    return pop_arr;
}

function collumnControl(arr_table, index, index_cont) {
    let pop_arr = [];
    let arr_index = [];
    let startIndex = index % container_size;
    for (let i = startIndex; i < size; i++) {
        arr_index.push(i);
        i = i + (container_size - 1);
    }
    for (let indexOne = index_cont % container_size; indexOne < size; indexOne++) {
        try {
            arr_index.forEach((indexTwo) => {
                pop_arr.push(arr_table[indexOne][indexTwo]);
            })
        } catch (err) {
        }
        indexOne = indexOne + (container_size - 1);
    }
    ;
    return pop_arr;
}

function createArrayTable(size) {
    let arr_table = {}

    for (let i = 1; i <= size; i++) {
        arr_table[i] = [];
    }
    let arr_num = []
    for (let i = 1; i <= size; i++) {
        arr_num.push(i)
    }
    arr_table["1"] = [...arr_num];
    shuffleArray(arr_table["1"])

    for (let index_cont = 2; index_cont <= size; index_cont++) {
        let container = arr_table[index_cont];
        let row_test = 0
        for (let index_arr = 0; index_arr < size; index_arr++) {
            if (row_test >= 3) {
                continue
            }
            let possible_arr_num = [...arr_num]
            possible_arr_num = possible_arr_num.filter(x => !container.includes(x))
            //container control
            let push_arr = rawControl(arr_table, index_arr, index_cont);
            possible_arr_num = possible_arr_num.filter(x => !push_arr.includes(x))
            //row control
            push_arr = collumnControl(arr_table, index_arr, index_cont);
            possible_arr_num = possible_arr_num.filter(x => !push_arr.includes(x))

            //column control

            if (possible_arr_num.length <= 0) {
                arr_table[index_cont] = [];
                index_arr = -1;
                row_test++
                if (row_test >= 3) {
                    if (index_cont > 2) {
                        arr_table[index_cont - 1] = []
                        index_cont = index_cont - 2
                        break
                    } else if (index_cont === 2) {
                        arr_table[index_cont] = []
                        index_cont = index_cont - 1
                        break
                    }
                }
                continue

            } else {
                let final_num = possible_arr_num[Math.floor((Math.random() * possible_arr_num.length))]
                container.push(final_num);
            }


        }
    }
    return arr_table;

}

function table_output(arr_table, empty_fields) {
    console.log("TO:", empty_fields);
    const setUp_cont = document.getElementById("setUp-container");
    setUp_cont.innerHTML = "";


    const timer = document.createElement("p");
    timer.id = "timer";
    timer.innerHTML = `00:00`;
    timer.style.textAlign = "center";
    timer.style.fontSize = "40px";
    timer.style.color = "white";
    timer.style.fontFamily = "arial";
    timer.style.fontWeight = "bold";
    setUp_cont.appendChild(timer);

    totalSeconds = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        totalSeconds++;
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        timer.innerHTML = `${minutes}:${seconds}`;
    }, 1000);

    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "center";

    const end_btn = document.createElement("button");
    end_btn.id = "end_btn";
    end_btn.textContent = "END";
    end_btn.style.textAlign = "center";
    end_btn.style.fontSize = "30px";
    end_btn.style.color = "#454545";
    end_btn.style.backgroundColor = "white";
    end_btn.style.fontFamily = "arial";
    end_btn.style.border = "none";
    end_btn.style.borderRadius = "5px";
    end_btn.style.marginTop = "10px";

    end_btn.addEventListener("click", () => {
        clearInterval(timerInterval);
        location.reload(true);
    });

    btnContainer.appendChild(end_btn);
    setUp_cont.appendChild(btnContainer);


    console.log(arr_table)
    let size_px
    switch (Number(size)) {
        case 4:
            size_px = 80;
            break;
        case 9:
            size_px = 60;
            break;
        case 16:
            size_px = 40;
            break;
    }
    const box = document.createElement("div");
    box.classList.add("sudoku");
    box.style.width = "fit-content";
    box.style.display = "grid";
    box.style.gap = "3px";
    box.style.gridTemplateColumns = `repeat(${container_size}, auto)`;

    for (let i = 1; i <= size; i++) {
        const container_arr = arr_table[i];
        const container = document.createElement("div");
        container.classList.add("sudoku_container");
        container.style.display = "grid";
        container.style.border = "2px solid black";
        container.style.gap = "1px";

        container.style.gridTemplateColumns = `repeat(${container_size}, ${size_px}px)`;

        for (let j = 0; j < size; j++) {
            let num_arr = container_arr[j];
            let num
            if (typeof num_arr === "number") {
                num = document.createElement("span");
                num.classList.add("sudoku_num");
                num.innerHTML = num_arr.toString();
                num.style.display = "flex";
                num.style.alignItems = "center";
                num.style.justifyContent = "center";
                num.style.width = `${size_px}px`;
                num.style.height = `${size_px}px`;
                num.style.border = "1px solid #666";
                num.style.fontSize = "20px";
            } else {
                num = document.createElement("input");
                num.classList.add("sudoku_input");
                num.dataset.containerIndex = i;
                num.dataset.numIndex = j;
                num.type = "text";
                num.style.textAlign = "center";
                num.style.width = `${size_px}px`;
                num.style.height = `${size_px}px`;
                num.style.border = "1px solid #666";
                num.style.background = "#eae9e9";
                num.style.fontSize = "20px";
                num.addEventListener("change", (e) => {
                    if (e.target.value) {
                        controlTable(empty_fields, e.target);
                    }
                });
                num.addEventListener("input", inputCheck)
            }


            container.appendChild(num);
        }

        box.appendChild(container);
    }
    game_container.innerHTML = ""
    game_container.appendChild(box);

}


function createTaskTable(arr_table) {
    console.log(`createTaskTable()`);
    let empty_fields_count;
    switch (size) {
        case 4:
            empty_fields_count = Math.floor((size ** 2) * (5 / 10));
            break;
        case 9:
            empty_fields_count = Math.floor((size ** 2) * (4 / 10));
            break;
        case 16:
            empty_fields_count = Math.floor((size ** 2) * (2 / 10));
            break;
    }

    let empty_fields_indexes = [];

    for (let i = 0; i < empty_fields_count; i++) {
        let random_container = Math.floor(Math.random() * size) + 1;
        let random_num = Math.floor(Math.random() * size);
        let exists = empty_fields_indexes.some(([c, n]) => c === random_container && n === random_num);
        if (exists) {
            i--;
        } else {
            arr_table[random_container][random_num] = "N";
            empty_fields_indexes.push([random_container, random_num]);
        }
    }

    empty_fields_indexes.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });

    if (!Array.isArray(empty_fields_indexes)) {
        console.error("Error: empty_fields_indexes není pole!");
        empty_fields_indexes = [];
    }

    return [arr_table, empty_fields_indexes];
}

function inputCheck(e) {
    const value = e.target.value;
    if (!(Number(value) > 0 && Number(value) <= size)) {
        e.target.value = "";
    }
}

function controlTable(empty_fields, input) {
    if (!Array.isArray(empty_fields)) {
        console.error("Error controlTable: empty_fields není pole! Hodnota:", empty_fields);
        return;
    }
    let contIndex = Number(input.dataset.containerIndex);
    let numIndex = Number(input.dataset.numIndex);
    let copyTaskTable = JSON.parse(JSON.stringify(task_table));
    let possible_num = [Number(input.value)];

    let container = copyTaskTable[contIndex].filter(x => x !== 'N');
    console.log("Container:", container);
    possible_num = possible_num.filter(x => !container.includes(x));

    let row = rawControlFin(copyTaskTable, numIndex, contIndex).filter(x => x !== 'N');
    console.log("Row:", row);
    possible_num = possible_num.filter(x => !row.includes(x))

    let column = collumnControlFin(copyTaskTable, numIndex, contIndex).filter(x => x !== 'N');
    console.log("Column:", column);
    possible_num = possible_num.filter(x => !column.includes(x))
    if (possible_num.length <= 0) {
        mistakeOutPut(input);
        return;
    } else {
        copyTaskTable[contIndex][numIndex] = input.value;
    }
    if (size === 4) {
        empty_fields.shift()
        task_table[contIndex][numIndex] = Number(input.value)
        correctOutPut(input, empty_fields);
        return;
    }
    let boardCorrect = transformArray(copyTaskTable)

    if (solveSudoku(boardCorrect)) {
        console.log("vyřešeno");
        empty_fields.shift()
        task_table[contIndex][numIndex] = Number(input.value)
        correctOutPut(input, empty_fields);
        return;
    } else {
        console.log(`${name} nelze vyřešit.`);
        mistakeOutPut(input);
        return;
    }

}

function rawControlFin(arr_table, index, index_cont) {
    let pop_arr = [];
    let startContainerRow = Math.floor((index_cont - 1) / container_size) * container_size + 1;
    let startContainerCol = Math.floor(index / container_size) * container_size;

    for (let c = startContainerRow; c < startContainerRow + container_size; c++) {
        for (let j = startContainerCol; j < startContainerCol + container_size; j++) {
            try {
                pop_arr.push(arr_table[c][j]);
            } catch (err) {
                console.log(err);
            }
        }
    }
    return pop_arr;
}

function collumnControlFin(arr_table, index, index_cont) {
    let pop_arr = [];
    let startColBlock = index % container_size;
    let startRowBlock = (index_cont - 1) % container_size;

    for (let r = startRowBlock; r < size; r += container_size) {
        for (let c = startColBlock; c < size; c += container_size) {
            try {
                pop_arr.push(arr_table[r + 1][c]);
            } catch (err) {
            }
        }
    }
    return pop_arr;
}

function isSafe(board, row, col, num, N, blockSize) {
    for (let x = 0; x < N; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
    }

    let startRow = row - (row % blockSize);
    let startCol = col - (col % blockSize);
    for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }

    return true;
}

function solveSudoku(board) {
    const N = board.length;
    // pokud √N není celé číslo, nepodporujeme
    const sqrt = Math.sqrt(N);
    if (sqrt % 1 !== 0) {
        console.log("Nepodporovaná velikost Sudoku:", N);
        return false;
    }
    const blockSize = sqrt;

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= N; num++) {
                    if (isSafe(board, row, col, num, N, blockSize)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0; // zpět (backtrack)
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function transformArray(array, size) {
    array = Object.values(array)
    array = array.map(num_raw =>
        num_raw.map(num => num === "N" ? 0 : num)
    );
    let finalArray = [];
    for (let row = 0; row < size; row++) {
        finalArray.push([]);
    }
    let copyArray = [...array];

    for (let i = 0; i < size; i++) {
        for (let j = Math.floor(i / Math.sqrt(size)) * Math.sqrt(size); j <= (Math.floor(i / Math.sqrt(size)) * Math.sqrt(size)) + (Math.sqrt(size) - 1); j++) {
            for (let k = 0; k < Math.sqrt(size); k++) {
                let num = copyArray[i].shift()
                finalArray[j].push(num);
            }
        }
    }
    console.log(finalArray);

    return finalArray;
}

function correctOutPut(input, emptyFields) {
    mistakeStreak = 0
    correctStreak++
    score += (100 + (50 * correctStreak) <= 1000) ? 100 + (50 * correctStreak) : 1000;
    input.disabled = true;
    console.log("correct");
    console.log("Score:", score);
    mistake_container.innerHTML = `<p data-answ='correct'>+${(100 + (50 * correctStreak) <= 1000) ? (100 + (50 * correctStreak)) : 1000} pts correct ${correctStreak >= 2 ? `,streak:${correctStreak}` : ""}</p>`;
    if (emptyFields.length <= 0) {
        win()
        return;
    }
}

function mistakeOutPut(input) {
    input.value = ""
    console.log("mistake");
    correctStreak = 0
    mistakeStreak++
    score -= (100 * mistakeStreak <= 1000) ? (100 + (50 * mistakeStreak)) : 1000;
    console.log("Score:", score);
    mistake_container.innerHTML = `<p data-answ='miss'>-${(100 * mistakeStreak <= 1000) ? (100 + (50 * mistakeStreak)) : 1000} pts mistake ${mistakeStreak >= 2 ? `,streak:${mistakeStreak}` : ""}</p>`;
}

function win() {
    clearInterval(timerInterval);
    console.log(totalSeconds)
    let maxSec
    let difficulty
    switch (size) {
        case 4:
            maxSec = 300;
            difficulty = "easy";
            break;
        case 9:
            maxSec = 900;
            difficulty = "medium";
            break;
        case 16:
            maxSec = 1500;
            difficulty = "hard";
            break;
    }
    let timeScore = 10000 - ((Math.floor(10000 / maxSec)) * totalSeconds) < 0 ? 0 : 10000 - ((Math.floor(10000 / maxSec)) * totalSeconds);
    let finalScore = score + timeScore < 0 ? 0 : score + timeScore;
    const setUp_cont = document.getElementById("setUp-container");
    setUp_cont.innerHTML = `
        <div id="setUp-difficulty">
        <button class="dif-button" value="4" disabled >Easy</button>
        <button class="dif-button" value="9" disabled >Medium</button>
        <button class="dif-button" value="16" disabled>Hard</button>
    </div>
    <button id="start-button" disabled>Start</button>`;
    document.getElementById('start-button').addEventListener('click', () => {
        if (size !== null) {
            let answer_table = createArrayTable(size);
            let task_table_arr = createTaskTable(answer_table);
            let task_table = task_table_arr[0]
            let empty_fields = task_table_arr[1]
            table_output(task_table, empty_fields);
        }
    });

    document.querySelectorAll('.dif-button').forEach(button => {
        button.addEventListener('click', () => {
            size = Number(button.value);
            container_size = Math.sqrt(size);
            console.log(`Size:${size}x${size} Container size:${container_size}`);
        });
    });
    game_container.innerHTML = "";
    game_container.innerHTML +=
        `<div id="win-container">
            <h2>WIN</h2>
            <p id="size">${size}x${size}</p>
            <p id="score-sentence">Score:<span id="score">${finalScore}</span></p>
            <p id="win-sentence">Push your score on to rankings</p>
           <div id="win-form">
            <label for="name">Name</label>
            <input type="text" id="name" maxlength="20" name="name">
            <button  id="ranking-btn" class="btn-liquid liquid"><span>Push</span></button>
           </div>
        </div>`
    const rankBtn = document.getElementById("ranking-btn");
    rankBtn.addEventListener("click", function () {
        const data = {
            name: document.getElementById("name").value,
            score: Number(finalScore),
            difficulty: difficulty
        };

        // posíláme přes fetch
        fetch("insert-db.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.error(err));
            location.reload(true);
    });
    const scoreEffect = document.getElementById('score')
    animateValue(scoreEffect, 0, finalScore, 3000);
    
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor((progress * (end - start) + start) / 10) * 10;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
