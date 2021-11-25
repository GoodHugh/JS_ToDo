

let arr = [];


function innerDiv() {
    let count = 0;
    return function () {
        let newDev = document.createElement('div');
        newDev.setAttribute('id', 'row' + count);
        newDev.setAttribute('class', 'List');
        document.getElementById('test').append(newDev); 
        newDev.innerText = 'text';
        let checkBox = document.createElement('input');
        checkBox.setAttribute('id', 'checkbox' + count);
        checkBox.setAttribute('class', 'checkbox');
        checkBox.setAttribute('type', 'checkbox');
        document.getElementById('row'+ count).append(checkBox);
        arr.push(newDev);
        count++;
    }
}

function listToDo(){
    let a = document.querySelectorAll('.checkbox');
    let d = document.querySelectorAll('.List');
    a.forEach((elem, i)=> {
        let b = elem.checked;
        console.log(b);
        if (b) {
            elem.remove();
        }
    })
}


let inner = innerDiv();


