let episodesList = [];

const autocompleteInput = document.getElementById("episode_autocomplete_input");
const episodesSuggestionContainer = document.getElementById(
  "episodes_suggestion"
);
const episodeLabel = document.getElementById("episodes_autocomplete_label");
const addToWatchListButton = document.getElementById("add_to_watch_list");

async function getEpisodesNameList() {
  try {
    let episodesData = [];
    const episodePageAmount = 3;
    for (let i = 1; i <= episodePageAmount; i++) {
      const apiUrl = `https://rickandmortyapi.com/api/episode?page=${i}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results.length > 0) {
        episodesData = [...episodesData, ...data.results];
      }
    }
    episodesList = episodesData.map((episode) => episode.name);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

const colorWatched = {
  true: "linear-gradient(135deg, rgb(0, 255, 240) 0%, rgb(128, 255, 83) 100%)",
  false: "linear-gradient(135deg, rgb(17, 17, 17) 0%, rgb(42, 42, 42) 100%)",
};
const noEpisodesMessage = function (container) {
  container.innerHTML = ``;
  const message = document.createElement("h5");
  message.textContent = "You don't have any episodes to watch later";
  container.append(message);
};
function showWatchList() {
  let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  const watchListContainer = document.getElementById("watch_list");
  watchListContainer.innerHTML = ``;
  if (watchList.length === 0) {
    noEpisodesMessage(watchListContainer);
  }

  watchList.forEach((episode) => {
    const watchListItem = createItem(episode, watchList, watchListContainer);
    watchListContainer.append(watchListItem);
  });
}

function createItem({ id, name, watched }, watchList, watchListContainer) {
  const watchListItem = document.createElement("div");
  watchListItem.id = id;

  const watchCheckBox = document.createElement("span");
  watchCheckBox.className = "watch";
  watchCheckBox.style.background = watched
    ? colorWatched.true
    : colorWatched.false;
  watchCheckBox.addEventListener("click", () =>
    toggleState(id, watchList, watchCheckBox)
  );

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa fa-trash-o"></i>`;
  deleteButton.addEventListener("click", () =>
    handleDeleteItem(id, watchListContainer, watchListItem)
  );

  const episodeName = document.createElement("span");
  episodeName.textContent = name;

  watchListItem.append(deleteButton, episodeName, watchCheckBox);
  return watchListItem;
}

function toggleState(id, watchList, checkBox) {
  const updatedWatchList = watchList.map((item) => {
    if (item.id === id) {
      item.watched = !item.watched;
      checkBox.style.background = item.watched
        ? colorWatched.true
        : colorWatched.false;
    }
    return item;
  });
  localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
}

function handleDeleteItem(id, container, listItem) {
  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  const updatedWatchList = watchList.filter((item) => item.id !== id);
  if (updatedWatchList.length === 0) {
    noEpisodesMessage(container);
  }
  localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
  container.removeChild(listItem);
}

document.addEventListener("DOMContentLoaded", () => {
  getEpisodesNameList();
  showWatchList();
});

autocompleteInput.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim();
  episodesSuggestionContainer.innerHTML = ``;

  const filteredSuggestions = episodesList.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );
  filteredSuggestions.forEach((suggestion) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.textContent = suggestion;

    suggestionItem.addEventListener("click", function () {
      autocompleteInput.value = suggestion;
      episodesSuggestionContainer.innerHTML = "";
      inputStyleLabel(autocompleteInput, episodeLabel);

      episodeLabel.style.position = selectStyle.position;
      episodeLabel.style.top = selectStyle.top;
      episodeLabel.style.fontSize = selectStyle.fontSize;
      episodeLabel.style.color = selectStyle.color;
    });
    episodesSuggestionContainer.append(suggestionItem);
  });
});

document.addEventListener("click", function (event) {
  if (event.target !== autocompleteInput) {
    episodesSuggestionContainer.innerHTML = "";
  }
});

inputStyleLabel(autocompleteInput, episodeLabel);

addToWatchListButton.addEventListener("click", () => {
  if (autocompleteInput.value.length != 0) {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    let isPresent = watchList.filter(
      (item) => item.name === autocompleteInput.value
    );
    if (isPresent.length === 0) {
      let data = {
        name: autocompleteInput.value,
        id: Math.floor(1000 + Math.random() * 9000),
        watched: false,
      };
      watchList.push(data);
      localStorage.setItem("watchList", JSON.stringify(watchList));
    }
    autocompleteInput.value = "";
    episodeLabel.style.position = "";
    episodeLabel.style.top = "";
    episodeLabel.style.fontSize = "";
    episodeLabel.style.color = "";
  }
  showWatchList();
});
