

let arr = [];
let ListDel = [];

document.getElementById('add-batton').addEventListener('click', innerDiv());

function innerDiv() {
    let count = 0;
    return function () {
        let taskToDO = document.getElementById('ToDo_value').value;
        let newDev = document.createElement('div');
        newDev.setAttribute('id', 'row' + count);
        newDev.setAttribute('class', 'List');
        document.getElementById('list_ToDo').append(newDev); 
        newDev.innerText = taskToDO;
        document.getElementById('ToDo_value').value = '';
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
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem)=> {
        let elem_check = elem.querySelector('.checkbox').checked;
        if (elem_check) {
            ListDel.push(elem);
            elem.remove();
        }
    })
}



