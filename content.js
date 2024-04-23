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
          </div>
        </li>
      `;
}
function addTodo(todo) {
  todos.push({
    id: todo.id,
    text: todo.text,
    
  });
  localStorage.setItem('todos', JSON.stringify(todos))

  // render that todo to the DOM
  renderTodo(todo);
}
// listen for form to be submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo({
    id: pasteid.value,
    text: content.value,
  });
   
  // reset value of input field
  pasteid.value = "";
  content.value = "";
});
renderTodos()
// Sending the object to the background script


})
