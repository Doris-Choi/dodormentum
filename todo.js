const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
const DONE_CN = 'done';

let toDos = [];

function toggleToDo(e) {
  const li = e.target.parentNode;
  toDos = toDos.map((toDo) => {
    const that = {
      ...toDo,
      done: toDo.id === li.id * 1 ? !toDo.done : toDo.done,
    };
    console.log(that);
    return that;
  });
  e.target.classList.toggle(DONE_CN);
  e.target.nextSibling.classList.toggle(DONE_CN);
  saveToDos();
}
function deleteToDo(e) {
  const li = e.target.parentNode;
  toDoList.removeChild(li);
  toDos = toDos.filter((toDo) => toDo.id !== li.id * 1);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, done) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  const newId = Date.now() + toDos.length;
  div.classList.toggle(DONE_CN, done);
  div.addEventListener('click', toggleToDo);
  span.innerText = text;
  span.classList.toggle(DONE_CN, done);
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteToDo);
  li.appendChild(div);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.append(li);
  toDos.push({
    done,
    text,
    id: newId,
  });
  saveToDos();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, false);
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => paintToDo(toDo.text, toDo.done));
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
