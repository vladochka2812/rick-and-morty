function displayEpisodes(episodes) {
  const container = document.getElementById("episodes_table");
  container.innerHTML = `<tr class="table_title" >
                          <th style="width: 20%" >Episode</th>
                          <th style="width: 60%" >Name</th>
                          <th style="width: 20%" >Date</th>
                        </tr>`;
  episodes.forEach((episode) => {
    const episodeRow = document.createElement("tr");
    episodeRow.className = "episode_row";

    const episodeNum = document.createElement("td");
    episodeNum.innerText = episode.episode;
    episodeNum.style.width = "20%";
    episodeRow.append(episodeNum);

    const episodeName = document.createElement("td");
    episodeName.innerText = episode.name;
    episodeName.style.width = "60%";
    episodeRow.append(episodeName);

    const episodeDate = document.createElement("td");
    episodeDate.innerText = episode.air_date;
    episodeDate.style.width = "20%";
    episodeRow.append(episodeDate);

    container.append(episodeRow);
  });
}

async function getEpisodes() {
  const apiUrl = `https://rickandmortyapi.com/api/episode?name=${episodeName.value}`;
  try {
    const container = document.getElementById("episodes_table");
    const response = await fetch(apiUrl);
    if (!response.ok) {
      container.style.display = "flex";
      container.style.flexDirection = "row";
      container.style.justifyContent = "center";
      emptyMessage(container);
    }
    const data = await response.json();
    if (data.results.length > 0) {
      container.style.flexDirection = "column";
      displayEpisodes(data.results);
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

const episodeName = document.getElementById("episode_input_name");
document.addEventListener("DOMContentLoaded", () => {
  getEpisodes();
});

episodeName.addEventListener("input", (event) => {
  const name = event.target.value.trim();
  if (name) {
    getEpisodes();
  }
});
