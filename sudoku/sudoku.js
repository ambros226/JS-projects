const start = document.getElementById('start-button');
const dif = document.querySelectorAll('.dif-button');
const game_container = document.getElementById('game-container');
let size = null
let container_size
start.addEventListener('click', () => {
    if (size !== null) {
        let answer_table = createArrayTable(size);
        let task_table_arr = createTaskTable(answer_table);
        let task_table=task_table_arr[0]
        let empty_fields=task_table_arr[1]
        table_output(task_table);
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
                        console.log("back on the line:", index_cont + 1)
                        break
                    } else if (index_cont === 2) {
                        arr_table[index_cont] = []
                        index_cont = index_cont - 1
                        console.log("back on the line:", index_cont + 1)
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

function table_output(arr_table) {
    const setUp_cont =document.getElementById("setUp-container");
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
    let totalSeconds = 0;
    const timerInterval = setInterval(() => {
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
        setUp_cont.innerHTML = `
        <div id="setUp-difficulty">
        <button class="dif-button" value="4">Easy</button>
        <button class="dif-button" value="9">Medium</button>
        <button class="dif-button" value="16">Hard</button>
    </div>
    <button id="start-button">Start</button>`;
        document.getElementById('start-button').addEventListener('click', () => {
            if (size !== null) {
                let answer_table = createArrayTable(size);
                let task_table_arr = createTaskTable(answer_table);
                let task_table=task_table_arr[0]
                table_output(task_table);
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

        container_arr.forEach(num_arr => {
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
            }
            else{
                num= document.createElement("input");
                num.classList.add("sudoku_input");

                num.type = "text";
                num.style.textAlign = "center";
                num.style.width = `${size_px}px`;
                num.style.height = `${size_px}px`;
                num.style.border = "1px solid #666";
                num.style.background="#eae9e9";
                num.style.fontSize = "20px";
                num.addEventListener("change", (e) => {
                    console.log(e.target.value);
                });
                num.addEventListener("input", inputCheck)
            }
           

            container.appendChild(num);
        });

        box.appendChild(container);
    }
    game_container.innerHTML = ""
    game_container.appendChild(box);
    
}


function createTaskTable(arr_table) {
    let empty_fields_count
        if (size ===16){
            empty_fields_count=Math.floor((size ** 2) * (2 / 10))
        }
    else {
            empty_fields_count=Math.floor((size ** 2) * (6 / 10))
        }
    let empty_fields_indexes = []
    for (let i = 0; i < empty_fields_count; i++) {
        let random_container = Math.floor(Math.random() * size) + 1;
        let random_num = Math.floor(Math.random() * size);
        if(empty_fields_indexes.includes([random_container, random_num])) {
            i--
        }
        else{
            arr_table[random_container][random_num] = "N";
            empty_fields_indexes.push([random_container, random_num]);
        }
    }
    return [arr_table, empty_fields_indexes];
}

function inputCheck(e){
    const value = e.target.value;
    if(!(Number(value)>0 && Number(value)<=size)){
        e.target.value = "";
    }
}


