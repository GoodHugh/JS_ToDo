

let arr = [];


function innerDiv() {
    let count = 0;
    return function () {
        let newDev = document.createElement('div');
        newDev.setAttribute('id', 'row' + count);
        newDev.setAttribute('class', 'List');
        document.getElementById('test').append(newDev); 
        newDev.innerText = 'text';
        arr.push(newDev);
        count++;
    }
}


let inner = innerDiv();


