document.addEventListener("DOMContentLoaded", () => {
  const currentPageId = document.body.dataset.page || "home";
  const pageContent = (siteContent.pages && siteContent.pages[currentPageId]) || siteContent.pages.home;

  renderPageTabs(currentPageId);
  renderPageContent(pageContent);
  setupOverlayMenu();
});

function renderPageTabs(currentPageId) {
  const tabsRoot = document.getElementById("page-tabs");
  if (!tabsRoot || !siteContent.navigation) {
    return;
  }

  tabsRoot.innerHTML = "";
  siteContent.navigation.forEach((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = item.href;
    link.textContent = item.label;
    link.className = "tab-link";

    if (item.id === currentPageId) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

    listItem.appendChild(link);
    tabsRoot.appendChild(listItem);
  });
}

function renderPageContent(pageContent) {
  const titleElement = document.getElementById("site-title");
  const descriptionElement = document.getElementById("site-description");
  const testMessageElement = document.getElementById("page-test-message");
  const footerElement = document.getElementById("site-footer");

  if (titleElement) {
    titleElement.textContent = pageContent.heading || "";
  }

  if (descriptionElement) {
    descriptionElement.textContent = pageContent.description || "";
  }

  if (testMessageElement) {
    testMessageElement.textContent = pageContent.testMessage || "";
  }

  if (footerElement) {
    footerElement.textContent = siteContent.footer || "";
  }
}

function setupOverlayMenu() {
  const menuButton = document.getElementById("menu-toggle");
  const menuPanel = document.getElementById("overlay-menu");
  const menuBackdrop = document.getElementById("menu-backdrop");

  if (!menuButton || !menuPanel || !menuBackdrop) {
    return;
  }

  const closeMenu = () => {
    document.body.classList.remove("is-menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    document.body.classList.add("is-menu-open");
    menuButton.setAttribute("aria-expanded", "true");
  };

  menuButton.addEventListener("click", () => {
    if (document.body.classList.contains("is-menu-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  menuBackdrop.addEventListener("click", closeMenu);
  menuPanel.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}