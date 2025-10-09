const start = document.getElementById('start-button');
const dif = document.querySelectorAll('.dif-button');
let size = null
let container_size
start.addEventListener('click', () => {
    if (size !== null) {
        createArrayTable(size);
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
    for (let indexOne = index_cont; indexOne < size; indexOne++) {
        try {
            arr_index.forEach((indexTwo) => {
                pop_arr.push(arr_table[indexOne][indexTwo]);
            })
        } catch (err) {
            console.log(err);
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
        console.log(index_cont + "index:" + container)
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
                console.log("problem")
                if (row_test >= 3) {
                    if (index_cont > 2) {
                        arr_table[index_cont - 1] = []
                        index_cont = index_cont - 2
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
    console.log(arr_table);

}


