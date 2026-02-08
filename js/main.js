document.addEventListener("DOMContentLoaded", () => {
  const titleElement = document.getElementById("site-title");
  const descriptionElement = document.getElementById("site-description");
  const gameListElement = document.getElementById("game-list");
  const footerElement = document.getElementById("site-footer");

  if (!titleElement || !descriptionElement || !gameListElement || !footerElement) {
    return;
  }

  titleElement.textContent = siteContent.title;
  descriptionElement.innerHTML = siteContent.descriptionHtml;

  gameListElement.innerHTML = "";
  siteContent.gameTags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "game-tag";
    tagElement.textContent = tag;
    gameListElement.appendChild(tagElement);
  });

  footerElement.textContent = siteContent.footer;
});