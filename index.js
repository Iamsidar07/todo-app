
let todos = ["try out adding a new todo."];
const todosList = document.getElementById("todos");
const todoInput = document.getElementById("todoInput");
const submitBtn = document.getElementById("addTodoBtn");
const enterTodoSection = document.getElementById("enterTodo");

submitBtn.addEventListener("click", addTodo);

function updateTodo() {
  todosList.innerHTML = "";
  renderTodos();
}

function addTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return;
  let newTodo = todoInput.value;
  todos.push(newTodo);
  todoInput.value = "";
  updateTodo();
}
function removeTodo(key) {
  todos = todos.filter((todo, i) => i !== key)
  updateTodo();
}
function editTodo(index) {
  todoInput.value = todos[index];
  removeTodo(index);
}
function renderTodos() {
  todos.reverse().map((todo, index) => {
    let currentHTML = todosList.innerHTML;
    let newHTML = `
        <div class="todoItem">
          <p>${index + 1}. ${todo}</p>
          <div class="actions">
            <i class="fa-solid fa-pen-nib icon editIcon" title="Edit todo" onClick="editTodo(${index})"></i>
            <i class="fa-solid fa-trash icon deleteIcon" title="Delete todo" onClick="removeTodo(${index})"></i>
          </div>
        </div>
        `;
    let appendHTML = currentHTML + newHTML;
    todosList.innerHTML = appendHTML;
  })
}

function createNewTodo() {
  enterTodoSection.style.display = "block";
}
renderTodos();
