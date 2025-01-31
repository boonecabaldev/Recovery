chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked! Injecting content.js...");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  }).then(() => {
    console.log("content.js injected successfully.");
  }).catch((error) => {
    console.error("Error injecting content.js:", error);
  });
});
