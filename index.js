
let todos = JSON.parse(localStorage.getItem("todos")) || [];
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
  const todoObj = {
    id: Date.now(),
    isCompleted: false,
    createdAt: new Date(),
    todo: newTodo,
  }
  todos.push(todoObj);
  todoInput.value = "";
  updateTodo();
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTodo(key) {
  todos = todos.filter((todo, i) => i !== key);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateTodo();
}
function editTodo(index) {
  enterTodoSection.style.display = "block";
  todoInput.value = todos[index].todo;
  removeTodo(index);
}
function toggleCompletionStatus(index) {
  
  let todo = todos[index];
  todo.isCompleted = todo.isCompleted ? false: true;
  localStorage.setItem("todos", JSON.stringify(todos));
  updateTodo();
}
function renderTodos() {
  if(todos.length===0){
    todos.push({
      createdAt:Date.now(),
      id:1694012697590,
      isCompleted:false,
      todo:"Welcome to todo app. Start by creating a new todo! "
    });
  }
  const sortedTodos = todos.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt)?-1:1)
  sortedTodos.map(({ todo, isCompleted, createdAt }, index) => {
    let currentHTML = todosList.innerHTML;
    let newHTML = `
        <div class="todoItem" style="${isCompleted?"box-shadow: 5px 7px skyblue;":"box-shadow: 5px 7px white"};">
          <div>
           <p style="${isCompleted ? "text-decoration: line-through; font-style: italic":""}">${index + 1}. ${todo}</p>
           <small class="createdAt">${new Date(createdAt ? createdAt : updatedAt).toLocaleTimeString()}</small>
          </div>
          <div class="actions" title="${isCompleted?"Task completed":"Task not completed"}">
            <div class="taskCompletionStatus ${isCompleted ? "taskCompleted" : "taskNotCompleted"}" onClick="toggleCompletionStatus(${index})">
            <i class="fa-solid fa-check" style="${isCompleted ? "opacity:1;":"opacity:0;"}"></i>
            </div>
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
