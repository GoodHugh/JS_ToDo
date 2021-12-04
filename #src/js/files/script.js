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
const removeComletedEvent = document.getElementById('remove-button-completed');
const allListEvent = document.getElementById('all-info');
const activeListEvent = document.getElementById('active-info');
const complitedListEvent = document.getElementById('complited-info');

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
removeComletedEvent.addEventListener('click', listToDoRemoveCompleted);
allListEvent.addEventListener('click', ToDoAllList);
activeListEvent.addEventListener('click', ToDoActiveList);
complitedListEvent.addEventListener('click', ToDoComplitedList);
allListEvent.click();
checkAllToDo();

function innerDiv() {
    let count = 0;
    return function () {
        let taskToDO = document.getElementById('ToDo_value').value;
        if (taskToDO) {
            let newDev = document.createElement('div');
            newDev.setAttribute('id', 'row' + count);
            newDev.setAttribute('class', 'List');
            newDev.setAttribute('data-status', 'active');
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
            countToDo();
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
    countToDo();
}

function listToDoRemoveCompleted() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let elem_data = elem.dataset.status;
        if (elem_data == "completed") {
            ListDelComlited.push(elem);
            elem.remove();
        }
    })
    countToDo();
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
    countToDo();
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
    const actionButtonSet = document.querySelectorAll('.ection__button');
    console.log(actionButtonSet);
    if (globalCheck) {
        actionButtonSet.forEach(function a (elem){
            elem.removeAttribute('disabled');
        })
        ToDoList.forEach(function b (elem) {
            elem.querySelector('.checkbox').checked = true;
        })
    }
    else {
        actionButtonSet.forEach(function c (elem){
            elem.setAttribute('disabled', 'disabled');
        })
        ToDoList.forEach(function d (elem){
            elem.querySelector('.checkbox').checked = false;
        })
    }
}

function countToDo() {
    const infoItemsList = document.querySelectorAll('.info__item');
    const allCount = document.getElementById('all-count');
    const activeCount = document.getElementById('active-count');
    const CompletedCount = document.getElementById('complited-count');
    allCount.innerHTML = '';
    activeCount.innerHTML = '';
    CompletedCount.innerHTML = '';
    infoItemsList.forEach((elem, i) => {
        if (i == 0 && elem.classList.contains('active')) {
            const ToDoList = document.querySelectorAll('.List');
            allCount.innerHTML = ToDoList.length;
        }
        if (i == 1 && elem.classList.contains('active')) {
            const ToDoActive = document.querySelectorAll('[data-status="active"]');
            activeCount.innerHTML = ToDoActive.length;
        }
        if (i == 2 && elem.classList.contains('active')){
            const ToDoCompleted = document.querySelectorAll('[data-status="completed"]');
            CompletedCount.innerHTML = ToDoCompleted.length;
        }
    })
}
function removeClassActive() {
    const infoItemsList = document.querySelectorAll('.info__item');
    infoItemsList.forEach((elem) => {
        elem.classList.remove('active');
    })
}

function ToDoAllList() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        elem.style.display = "flex";
    })
    removeClassActive();
    allListEvent.classList.add('active');
    countToDo();
}

function ToDoComplitedList() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let status = elem.dataset.status;
        if (status == "not_completed" || status == "active" || status == undefined) {
            elem.style.display = "none";
        } else elem.style.display = "flex";
    })
    removeClassActive();
    complitedListEvent.classList.add('active');
    countToDo();
}

function ToDoActiveList() {
    const ToDoList = document.querySelectorAll('.List');
    ToDoList.forEach((elem) => {
        let status = elem.dataset.status;
        if (status == "not_completed" || status == "completed") {
            elem.style.display = "none";
        } else elem.style.display = "flex";
    })
    removeClassActive();
    activeListEvent.classList.add('active');
    countToDo();
}