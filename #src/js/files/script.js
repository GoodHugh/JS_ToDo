let arr = [];
let ListDel = [];
let ListCompl = [];
let ListNotCompl = [];
let ListDelComlited = [];
const buttonEvent = document.getElementById('add-batton');
const textareaEvent = document.getElementById('ToDo_value');
const completedEvent = document.getElementById('comlp-button');
const not_completedEvent = document.getElementById('ncompl-button');
const checkAllEvent = document.getElementById('action-check');
const removeEvent = document.getElementById('remove-button');

buttonEvent.addEventListener('click', innerDiv());
textareaEvent.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        document.getElementById('add-batton').click();
    }
})
completedEvent.addEventListener('click', listToDoCompleted);
not_completedEvent.addEventListener('click', listToDoNotCompleted);
checkAllEvent.addEventListener('input', checkAllToDo);
removeEvent.addEventListener('click', listToDoRemove);

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

function listToDoRemove() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let elem_check = elem.querySelector('.checkbox').checked;
        if (elem_check) {
            ListDel.push(elem);
            elem.remove();
        }
    })
    not_checkAllToDo();
}

function listToDoRemoveCompleted(){
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let elem_data = elem.dataset.status;
        if (elem_data == "completed") {
            ListDelComlited.push(elem);
            elem.remove();
        }
    })
}

function listToDoCompleted() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let elem_check = elem.querySelector('.checkbox').checked;
        if (elem_check) {
            ListCompl.push(elem);
            elem.style.border = "1px solid #00ff22";
            elem.setAttribute('data-status', 'completed');
            elem.querySelector('.checkbox').checked = false;
        }
    })
    not_checkAllToDo();
}

function listToDoNotCompleted() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let elem_check = elem.querySelector('.checkbox').checked;
        if (elem_check) {
            ListNotCompl.push(elem);
            elem.style.border = "1px solid #ff0000 ";
            elem.setAttribute('data-status', 'not_completed');
            elem.querySelector('.checkbox').checked = false;
        }
    })
    not_checkAllToDo();
}

function not_checkAllToDo() {
    const ToDoList = document.querySelectorAll('.List');
    const globalCheck = document.getElementById('action-check').checked;
    if (globalCheck) {
        document.getElementById('action-check').checked = false;
        ToDoList.forEach((elem) => {
            elem.querySelector('.checkbox').checked = false;
        })
    }
}

function checkAllToDo() {
    const ToDoList = document.querySelectorAll('.List');
    const globalCheck = document.getElementById('action-check').checked;
    if (globalCheck) {
        ToDoList.forEach((elem) => {
            elem.querySelector('.checkbox').checked = true;
        })
    }
    else {
        ToDoList.forEach((elem) => {
            elem.querySelector('.checkbox').checked = false;
        })
    }
}

function countToDo(){
    const ToDoComdleted = document.querySelectorAll('[data-status="completed"]');
    console.log(ToDoComdleted);
}

function ToDoAllList(){
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem)=>{
        elem.style.display = "flex";
    })
}

function ToDoComplitedList(){
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem)=>{
        let status = elem.dataset.status;
        if (status == "not_completed" || status == undefined) {
            elem.style.display = "none";
        }else  elem.style.display = "flex";
    })
}

function ToDoActiveList(){
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem)=>{
        let status = elem.dataset.status;
        if (status == "not_completed" || status == "completed") {
            elem.style.display = "none";
        } else  elem.style.display = "flex";
    })
}