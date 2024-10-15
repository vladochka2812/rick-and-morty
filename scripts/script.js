const menuCharacters = document.getElementById("menu_characters");
const menuEpisodes = document.getElementById("menu_episodes");
const menuLocations = document.getElementById("menu_locations");
const menuWatchList = document.getElementById("menu_watch_list");

menuCharacters.addEventListener("click", () => {
  const targetElement = document.getElementById("characters");
  const topPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: topPosition,
    behavior: "smooth",
  });
});

menuEpisodes.addEventListener("click", () => {
  const targetElement = document.getElementById("episodes");
  const topPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: topPosition,
    behavior: "smooth",
  });
});

menuLocations.addEventListener("click", () => {
  const targetElement = document.getElementById("locations");
  const topPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: topPosition,
    behavior: "smooth",
  });
});

menuWatchList.addEventListener("click", () => {
  const targetElement = document.getElementById("my_watch_list");
  const topPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: topPosition,
    behavior: "smooth",
  });
});
