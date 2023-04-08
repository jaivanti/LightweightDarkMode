const toggleDarkMode = document.getElementById("toggleDarkMode");

chrome.storage.sync.get("darkMode", (result) => {
  toggleDarkMode.checked = result.darkMode || false;
});

toggleDarkMode.addEventListener("change", (e) => {
  const enabled = e.target.checked;
  chrome.storage.sync.set({ darkMode: enabled });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
      sendMessageToContentScript(tabs[0].id, { action: "toggleDarkMode" });
    }
  });
});

function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message, (response) => {
    if (chrome.runtime.lastError) {
      setTimeout(() => {
        sendMessageToContentScript(tabId, message);
      }, 200);
    }
  });
}
