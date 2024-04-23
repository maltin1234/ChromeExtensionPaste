chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.contextMenus.create({
    id: "pasteOption1",
    title: "Hämta datorn",
    contexts: ["editable"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu clicked:", info, tab);
  if (info.menuItemId === "pasteOption1" && tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: pasteCustomText,
    })
    .then(() => console.log("Script executed successfully"))
    .catch(error => console.error("Error executing script:", error));
  }
});

function pasteCustomText() {
  const targetElement = document.activeElement;
  console.log("Target element:", targetElement);
  
  const tagName = targetElement.tagName.toLowerCase();
  console.log(tagName)
  if (tagName === "textarea" || tagName === "input") {
    // For textarea and input elements, modify the value property
    targetElement.value += " Hi! We will put the goods in a locker. An email with pick-up information will be sent separately.";
  } else if (targetElement.isContentEditable) {
    console.log("isEditable")
    // For contentEditable elements, use textContent
    targetElement.textContent += " Hi! We will put the goods in a locker. An email with pick-up information will be sent separately.";
  } else {
    console.error("Unsupported input type:", tagName);
    const el = targetElement;
    el.focus();
    document.execCommand('insertText', false, 'new text');
  }
}
