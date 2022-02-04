let arr = [];
let ListDel = [];
let ListCompl = [];
let ListNotCompl = [];
let ListDelComlited = [];
const buttonEvent = document.getElementById('add-batton');
const buttonEdirEvent = document.getElementById('edit-batton');
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
buttonEdirEvent.addEventListener('click', writeEditToDoItems)
allListEvent.click();
checkAllToDo();
document.addEventListener('input', ((elem) => {
    let dataTarget = elem.target;
    if (dataTarget.className == 'checkbox') {
        if (dataTarget.checked) {
            checkeOneToDO(dataTarget.checked);
        } else checkeOneToDO(dataTarget.checked);
    }
})
)

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
            let checkBox = document.createElement('input');
            checkBox.setAttribute('id', 'checkbox' + count);
            checkBox.setAttribute('class', 'checkbox');
            checkBox.setAttribute('type', 'checkbox');
            document.getElementById('row' + count).prepend(checkBox);
            let textBox = document.createElement('p');
            textBox.setAttribute('id', 'boxValue' + count);
            textBox.setAttribute('class', 'List-text');
            document.getElementById('row' + count).append(textBox);
            textBox.innerText = taskToDO;
            arr.push(newDev);
            count++;
            textareaEvent.value = '';
            countToDo();
            checkAllToDo();
        }
    }
}

document.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('List')) {
        editToDoItem();
    }

    function editToDoItem() {
        let editItem = e.target;
        if (editItem.className == 'List' && editItem.getAttribute('data-status') == 'active') {
            let contentEditItem = editItem.textContent;
            textareaEvent.value = contentEditItem;
            editItem.style.border = "1px solid #e5ff00";
            editItem.setAttribute('data-status', 'edit');
            buttonEvent.style.pointerEvents = "none";
            buttonEvent.setAttribute('disabled', 'disabled');
            buttonEdirEvent.style.display = 'inline-block';
            const ToDoList = document.querySelectorAll('.List');
            ToDoList.forEach((elem) => {
                elem.style.pointerEvents = "none";
            })
        }
    }
});

function writeEditToDoItems() {
    const ToDoList = document.querySelectorAll('.List');
    if (textareaEvent.value == "") {
        textareaEvent.style.border = "1px solid red";
    } else if (textareaEvent.value != "") {
        ToDoList.forEach((elem) => {
            if (elem.dataset.status == "edit") {
                let List_value = elem.querySelector('.List-text');
                List_value.innerText = textareaEvent.value;
                elem.removeAttribute('style', 'border');
                elem.setAttribute('data-status', 'active');
            }
            elem.removeAttribute('style', 'pointer-events');
        })
        buttonEdirEvent.style.display = 'none';
        textareaEvent.style.border = "1px solid #000000";
        textareaEvent.value = '';
        buttonEvent.removeAttribute('disabled', 'disabled');
        buttonEvent.removeAttribute('style', 'pointer-events');
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

function checkeOneToDO(event) {
    const actionButtonSet = document.querySelectorAll('.ection__button');
    if (event) {
        actionButtonSet.forEach((elem, i) => {
            if ((actionButtonSet.length - 1) != i) {
                elem.removeAttribute('disabled');
                elem.style.pointerEvents = 'auto';
            }
        })
    }
    else {
        actionButtonSet.forEach((elem, i) => {
            if ((actionButtonSet.length - 1) != i) {
                elem.setAttribute('disabled', 'disabled');
                elem.style.pointerEvents = 'none';
            }
        })
    }
}

function checkAllToDo() {
    const ToDoList = document.querySelectorAll('.List');
    const globalCheck = document.getElementById('action-check');
    if (ToDoList.length == 0) {
        globalCheck.setAttribute('disabled', 'disabled');
    } else globalCheck.removeAttribute('disabled');

    if (globalCheck.checked) {
        checkeOneToDO(globalCheck.checked)
        ToDoList.forEach((elem) => {
            elem.querySelector('.checkbox').checked = true;
        })
    }
    else {
        checkeOneToDO(globalCheck.checked);
        ToDoList.forEach((elem) => {
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
        if (i == 2 && elem.classList.contains('active')) {
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

//пагинация------------------------------------------------------------------

function AddLast_List_ToDo() {
    const ToDoList = document.querySelectorAll('.List');
    let count = 0;
    console.log(count);
    return function () {
        if ((ToDoList.length % 12) < count) {
            console.log("Создаем");
            count++;
        }
        // if ((ToDoList.length % 12) > count && count > 1) {
        //     console.log("Удаляем");
        //     count--;
        // }
    }
}




// if (ToDoList.length % 12) {
//     count_newPage++;
//     let newPage = document.createElement('div');
//     newPage.setAttribute('class', 'page__paginations-todo');
//     newPage.setAttribute('data-status', 'active-on');
//     document.getElementById('paginations-page').append(newPage);
// }