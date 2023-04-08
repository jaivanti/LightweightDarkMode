chrome.storage.sync.get("darkMode", (result) => {
  if (result.darkMode) {
    document.documentElement.classList.add("lightweight-dark-mode");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    document.documentElement.classList.toggle("lightweight-dark-mode");
  }
});
