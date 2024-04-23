document.addEventListener("DOMContentLoaded", function() {
  const contextMenu = document.getElementById("contextMenu");
  let activeInputElement; // Store the active input element

  // Show context menu on right click for input fields only
  document.addEventListener("contextmenu", (event) => {
      const target = event.target;
      if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
          event.preventDefault(); // Prevent default context menu
          contextMenu.style.display = "block";
          contextMenu.style.left = event.pageX + "px";
          contextMenu.style.top = event.pageY + "px";
          activeInputElement = target; // Store the active input element
      }
  });

  // Hide context menu when clicking outside
  document.addEventListener("click", (event) => {
      if (!contextMenu.contains(event.target)) {
          contextMenu.style.display = "none";
      }
  });

  // Handle paste option 1
  document.getElementById("pasteOption1").addEventListener("click", () => {
      if (activeInputElement) {
          pasteCustomText("Pasted option 1", activeInputElement);
      }
  });

  // Handle paste option 2
  document.getElementById("pasteOption2").addEventListener("click", () => {
      if (activeInputElement) {
          pasteCustomText("Pasted option 2", activeInputElement);
      }
  });

  // Handle paste option 3
  document.getElementById("pasteOption3").addEventListener("click", () => {
      if (activeInputElement) {
          pasteCustomText("Pasted option 3", activeInputElement);
      }
  });

  // Function to paste custom text into the active input field
  function pasteCustomText(customText, inputElement) {
      const selectionStart = inputElement.selectionStart || 0;
      const selectionEnd = inputElement.selectionEnd || 0;

      // Insert the custom text at the current caret position
      inputElement.value = inputElement.value.substring(0, selectionStart) +
          customText +
          inputElement.value.substring(selectionEnd);

      // Update the selection range to include the pasted text
      inputElement.setSelectionRange(selectionStart + customText.length, selectionStart + customText.length);
  }
});
-----------------------------------------------------------------------------------------------------------------------------------
chrome.runtime.onInstalled.addListener(() => {
  console.log("created")
  chrome.contextMenus.create({
    id: "pasteOption1",
    title: "Hämta datorn",
    contexts: ["editable"]
  });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("listener", info, tab)
  if (info.menuItemId === "pasteOption1" && tab) { // Check if tab is defined
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: pasteCustomText,
    })
      .then(() => console.log("Script executed successfully"))
      .catch(error => console.error("Error executing script:", error));
  }
});


function pasteCustomText() {

  const activeElement = document.activeElement;
  console.log(activeElement)
  
  console.log("Active element",activeElement.tagName.toLowerCase())
    // Check if the active element or any of its ancestors have a Shadow DOM
    let elementWithShadowRoot = activeElement;
    while (elementWithShadowRoot && elementWithShadowRoot !== document.body) {
      if (elementWithShadowRoot.shadowRoot) {
        // If a Shadow DOM is found, check if the active element is within it
        if (elementWithShadowRoot.shadowRoot.contains(activeElement)) {
          console.log('Active element is within a Shadow DOM.');
          return true; // Active element is within a Shadow DOM
        }
      }
      // Move up the DOM tree
      elementWithShadowRoot = elementWithShadowRoot.parentNode;
    }
    console.log('Active element is not within a Shadow DOM.');
    return false; // Active element is not within a Shadow DOM
  

  
  
  activeElement.value += " Hi! We will put the goods in a locker. An email with pick-up information will be sent separately."

}

