// Function to create context menu items for todos
function createContextMenuForTodos(todos) {
  // Remove existing context menu items
  chrome.contextMenus.removeAll(() => {
    console.log("Context menu items removed.");

    // Create new context menu items for todos
    todos.forEach(todo => {
      chrome.contextMenus.create({
        id: todo.id,
        title: todo.text, // Use todo.text as the title
        contexts: ["editable"]
      });
    });

    console.log("Context menu items created for todos.");
  });
}

// Listen for extension installation or when new todos are added
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");

  // Retrieve todos from storage
  chrome.storage.local.get("todos", ({ todos }) => {
    if (todos) {
      // Create context menu items for todos
      createContextMenuForTodos(todos);
    }
  });
});

// Listen for changes in storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.todos) {
    // Retrieve updated todos
    const updatedTodos = changes.todos.newValue;

    // Update context menu items with the new todos
    createContextMenuForTodos(updatedTodos);
  }
});
// Listen for context menu clicks
// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu clicked:", info, tab);

  // Retrieve todos from local storage
  chrome.storage.local.get("todos", ({ todos }) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    // Check if todos exist and the clicked menu item ID matches any todo ID
    if (todos && todos.length > 0) {
      todos.forEach(todo => {
        if (info.menuItemId === todo.id) {
          // Execute the pasteCustomText function in the content script
          chrome.scripting.executeScript({
            target: { tabId: tab.id , allFrames: true},
            function: pasteCustomText,
            args: [todo.text] // Pass the todo text as an argument
          })
          .then(() => console.log("Script executed successfully"))
          .catch(error => console.error("Error executing script:", error));
        }
      });
    } else {
      console.log("No todos found in storage.");
    }
  });
});

// Function to paste custom text
function pasteCustomText(todoText) {
  const targetElement = document.activeElement;
  console.log("Target element:", targetElement);

  const tagName = targetElement.tagName.toLowerCase();
  console.log(tagName);
  if (tagName === "textarea" || tagName === "input") {
    // For textarea and input elements, modify the value property
    targetElement.value += ` ${todoText}`;
  } else if (targetElement.isContentEditable) {
    console.log("isEditable");
    // For contentEditable elements, use textContent
    targetElement.textContent += ` ${todoText}`;
  } else {
    console.error("Unsupported input type:", tagName);
    const el = targetElement;
    el.focus();
    document.execCommand('insertText', false, todoText);
  }
}