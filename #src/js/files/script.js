

let arr = [];
let ListDel = [];
const buttonEvent = document.getElementById('add-batton');
const textareaEvent = document.getElementById('ToDo_value');


buttonEvent.addEventListener('click', innerDiv());
textareaEvent.addEventListener("keyup", function(event){
    if (event.code === "Enter") {
        document.getElementById('add-batton').click();
    }
})


function innerDiv() {
    let count = 0;
    return function () {
        let taskToDO = document.getElementById('ToDo_value').value;
        if (taskToDO) {
            let newDev = document.createElement('div');
            newDev.setAttribute('id', 'row' + count);
            newDev.setAttribute('class', 'List');
            document.getElementById('list_ToDo').append(newDev);
            newDev.innerText = taskToDO;
            let checkBox = document.createElement('input');
            checkBox.setAttribute('id', 'checkbox' + count);
            checkBox.setAttribute('class', 'checkbox');
            checkBox.setAttribute('type', 'checkbox');
            document.getElementById('row' + count).prepend(checkBox);
            arr.push(newDev);
            count++;
            document.getElementById('ToDo_value').value = '';
        }
    }
}

function listToDo() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let elem_check = elem.querySelector('.checkbox').checked;
        if (elem_check) {
            ListDel.push(elem);
            elem.remove();
        }
    })
}



