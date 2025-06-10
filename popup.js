const textarea = document.getElementById("keywords");
const saveBtn = document.getElementById("save");
const newKeywordInput = document.getElementById("newKeyword");
const addBtn = document.getElementById("addBtn");

// Load existing keywords
chrome.storage.local.get("keywords", (data) => {
  textarea.value = (data.keywords || []).join("\n");
});

// Save all from textarea
saveBtn.addEventListener("click", () => {
  const keywords = textarea.value
    .split("\n")
    .map(k => k.trim())
    .filter(k => k.length > 0);

  chrome.storage.local.set({ keywords }, () => {
    saveBtn.textContent = "Saved!";
    setTimeout(() => saveBtn.textContent = "Save All", 1000);
  });
});

// Add new keyword from input
addBtn.addEventListener("click", () => {
  const newKeyword = newKeywordInput.value.trim();
  if (newKeyword.length === 0) return;

  const lines = textarea.value.split("\n");
  lines.push(newKeyword);
  textarea.value = lines.join("\n");

  newKeywordInput.value = "";

  // Optionally save automatically
  saveBtn.click();
});
