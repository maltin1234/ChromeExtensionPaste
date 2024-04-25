document.addEventListener('DOMContentLoaded', function () {
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const list = document.getElementById("context-list");
const form = document.getElementById("context-form");
const pasteid = document.getElementById("paste-id");
const content = document.getElementById("content-text")

function renderTodos() {
  todos.forEach((todo) => {
      renderTodo(todo);
  });
}

function renderTodo(todo) {
  list.innerHTML += `
    <li>
      ${todo.id}
      ${todo.text}
    </li>
  `;
}
function addTodo(todo) {
  todos.push({
    id: todo.id,
    text: todo.text,
    
  });
 

  // render that todo to the DOM
  renderTodo(todo);
}
// Send a single todo to the background script when a todo item is clicked

function addTodosToStorage(todos) {
  // Store the todos in chrome storage
  chrome.storage.local.set({ "todos": todos }, () => {
    console.log("Todos added to storage:", todos);
  });
}

// listen for form to be submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo({
    id: pasteid.value,
    text: content.value,
  });
   addTodosToStorage(todos)
  // reset value of input field
  pasteid.value = "";
  content.value = "";
});
renderTodos()
// Sending the object to the background script
// Function to handle pasting custom text based on todo


});
