let num_arr = [];
let del_mode=false

const num_add = document.querySelectorAll(".num");
const act_add = document.querySelectorAll(".act");
const result = document.getElementById("result");
const del = document.getElementById("delete");
const eql = document.getElementById("equal");

function write_res() {
    result.textContent = num_arr.join(""); 
}

num_add.forEach(btn => {
    btn.addEventListener("click", () => {
        if(del_mode){
           num_arr=[]
           del_mode=false 
        }
            num_arr.push(btn.value);
            write_res();
           
    });
});
act_add.forEach(btn => {
    btn.addEventListener("click", () => {
        const last = num_arr[num_arr.length - 1];
        if (num_arr.length !== 0 && !["+", "-", "*", "/"].includes(last)) {
            num_arr.push(btn.value);
            write_res();
        }
    });
});

del.onclick = () => {
    if (num_arr.length !== 0) {
        num_arr.pop(num_arr[num_arr.length -1])
        write_res();
    }
}
eql.onclick = () => {
    if (num_arr.length !== 0) {
        let result_num=Function("return " + num_arr.join(''))()
        console.log("ahoj");
        if(isNaN(result_num)){
            result.textContent = "Error"
        }
        else{
            result.textContent = result_num;
            num_arr=[result_num]
            del_mode=true
            
        }
    }
}