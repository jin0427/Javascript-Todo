const createBtn = document.getElementById("creat-btn");
const list = document.getElementById("list");

let todos = [{id:323 ,text:'', complete: false}];


createBtn.addEventListener("click", createNewTodo);

// 새로고침을 눌러도 데이터가 저장되게끔 하는 것
function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    localStorage.setItem('my_todos', data);
}

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }
    // 배열 처음에 새로운 아이템 추가
    todos.unshift(item);

    // 요소 함수 호출
    const {
        itemEl,
        inputEl,
        editBtnEl,
        removeBtnEl
    } = createTodoElement(item)

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가(가장 첫번째 요소 추가)
    list.prepend(itemEl);

    inputEl.removeAttribute('disabled');

    inputEl.focus();

    saveToLocalStorage();

}
// 요소 생성하기
function createTodoElement(item) {
    const itemEl = documnet.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.calssList.add("complete")
    }
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.calue = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circle';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('input', (e) => {
        item.text = inputEl.value; // e.target.value;랑 똑같다 inputEl.value
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id!==item.id ) // t: 배열 안에 있는 하나의 값

        itemEl.remove();
        saveToLocalStorage();
    })

    actionsEl.appendChild(editBtnEl);
    actionsEl.appendChild(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {
        itemEl: itemEl,
        inputEl: inputEl,
        editBtnEl: editBtnEl,
        removeBtnEl: removeBtnEl,
    }
}

// 저장된 로컬스토리지 가져오기
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if(data) {
        todos = JSON.parse(data);
    }
}

// 가져온 데이터 보여지게 하기
function displayTodos() {
    loadFromLocalStorage();

    for(let i=0; i<todos.length; i++) {
        const item = todos[i];

        const {itemEl} = createTodoElement(item);
        list.append(itemEl)
    }
}

displayTodos();