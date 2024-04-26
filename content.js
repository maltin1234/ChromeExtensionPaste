document.addEventListener('DOMContentLoaded', function () {
  let todos = [];

  const list = document.getElementById("context-list");
  const form = document.getElementById("context-form");
  const pasteid = document.getElementById("paste-id");
  const content = document.getElementById("content-text");

  function renderTodos() {
    list.innerHTML = ""; // Clear the list before rendering todos
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  }

  function renderTodo(todo) {
    const listItem = document.createElement("li");
    listItem.textContent = `${todo.id} ${todo.text}`;
    listItem.addEventListener("dblclick", () => removeTodoFromStorage(todo.id));
    list.appendChild(listItem);
  }

  function addTodoToStorage(todo) {
    todos.push(todo);
    chrome.storage.local.set({ "todos": todos }, () => {
      console.log("Todo added to storage:", todo);
      renderTodos(); // Render todos after adding a new one
    });
  }

  function removeTodoFromStorage(id) {
    todos = todos.filter(todo => todo.id !== id);
    chrome.storage.local.set({ "todos": todos }, () => {
      console.log("Todo removed from storage:", id);
      renderTodos(); // Render todos after removing one
    });
  }

  // Retrieve todos from chrome storage on DOMContentLoaded
  chrome.storage.local.get("todos", ({ todos: storedTodos }) => {
    if (storedTodos) {
      todos = storedTodos;
      renderTodos();
    }
  });

  // Listen for form submit
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const todo = {
        id: pasteid.value,
        text: content.value,
      };

      addTodoToStorage(todo);

      pasteid.value = "";
      content.value = "";
    });
  }
});
