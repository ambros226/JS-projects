
let cubes = []

const dots= {
    1: ".",
    2: "..",
    3: "...",
    4: "..<br>..",
    5: "..<br>.<br>..",
    6: "...<br>...",

}


const decrease = document.getElementById('dec');
const increase = document.getElementById('inc');
const reset = document.getElementById('res');
const roll = document.getElementById('roll');
const placeholder = document.getElementById('cube-placeholder')


function createCube() {
    const btn = document.createElement('button');
    btn.className = 'cube';
    btn.innerHTML = dots[1];
    btn.addEventListener("click", () => {
        ran_num= Math.floor(Math.random()* 6) + 1
        btn.innerHTML = dots[ran_num];
    });
    return btn;
}

function write() {
    placeholder.innerHTML = "";
    cubes.forEach(cube => placeholder.appendChild(cube));
}

increase.addEventListener('click', (e) => {
    if(cubes.length <= 10){
        cubes.push(createCube());
        write();
    }
})

decrease.addEventListener('click', (e) => {
    if(cubes.length > 0){
        cubes.pop()
        write();
    }
})
reset.addEventListener('click', (e) => {
    cubes=[]
    write();
})

roll.addEventListener('click', (e) => {
    cubes.forEach(cube => {
        ran_num= Math.floor(Math.random()* 6) + 1
        cube.innerHTML = dots[ran_num];
    })
})
