function blurMatchingElements(keywords) {
  const lowerKeywords = keywords.map(k => k.toLowerCase());

  const allElements = document.body.querySelectorAll("*:not(script):not(style)");

  for (const el of allElements) {
    if (el.children.length === 0 && el.textContent) {
      const text = el.textContent.toLowerCase();
      if (lowerKeywords.some(k => text.includes(k))) {
        el.style.filter = "blur(6px)";
        el.style.transition = "filter 0.3s ease";
        el.setAttribute("data-blurred", "true");

        // Optional: click to toggle blur
        el.addEventListener("click", () => {
          if (el.style.filter === "blur(6px)") {
            el.style.filter = "none";
          } else {
            el.style.filter = "blur(6px)";
          }
        }, { once: true }); // Add only once
      }
    }
  }
}

function observeDomChanges(keywords) {
  const observer = new MutationObserver(() => {
    blurMatchingElements(keywords);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

chrome.storage.local.get("keywords", (data) => {
  const keywords = data.keywords || [];
  if (keywords.length > 0) {
    blurMatchingElements(keywords);
    observeDomChanges(keywords);
  }
});
