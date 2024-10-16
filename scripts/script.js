const menuCharacters = document.getElementById("menu_characters");
const menuEpisodes = document.getElementById("menu_episodes");
const menuLocations = document.getElementById("menu_locations");
const menuWatchList = document.getElementById("menu_watch_list");

const selectStyle = {
  position: "absolute",
  top: "-8px",
  fontSize: "14px",
  color: "white",
};

const inputStyleLabel = function (element, label) {
  const activeStyle = {
    position: "absolute",
    top: "-8px",
    fontSize: "14px",
    color: "white",
  };
  const noStyle = {
    position: "",
    top: "",
    fontSize: "",
    color: "",
  };
  element.addEventListener("click", () => {
    Object.assign(label.style, activeStyle);
  });
  element.addEventListener("blur", () => {
    if (!element.value) {
      Object.assign(label.style, noStyle);
    }
  });
};

const emptyMessage = function (container) {
  container.innerHTML = "";
  const message = document.createElement("div");
  message.className = "characters_selectors_wrapper";
  message.innerHTML = `<h4 class="empty_message">There is nothing to display</h4>`;
  container.append(message);
};

const scrollToMenu = function (menuItem, targetElementId) {
  menuItem.addEventListener("click", () => {
    const targetElement = document.getElementById(targetElementId);
    const topPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  });
};
scrollToMenu(menuCharacters, "characters");
scrollToMenu(menuEpisodes, "episodes");
scrollToMenu(menuLocations, "locations");
scrollToMenu(menuWatchList, "my_watch_list");
