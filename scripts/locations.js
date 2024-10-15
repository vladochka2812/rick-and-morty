function displayLocations(locations) {
  const container = document.getElementById("locations_table");
  container.innerHTML = `<tr class="table_title" >
                            <th style="width: 35%">Name</th>
                            <th style="width: 35%">Type</th>
                            <th style="width: 30%">Dimension</th>
                          </tr>`;

  locations.forEach((location) => {
    const locationRow = document.createElement("tr");
    locationRow.className = "episode_row";

    const locationName = document.createElement("td");
    locationName.innerText = location.name;
    locationName.style.width = "35%";
    locationRow.appendChild(locationName);

    const locationType = document.createElement("td");
    locationType.innerText = location.type;
    locationType.style.width = "35%";
    locationRow.appendChild(locationType);

    const episodeDimension = document.createElement("td");
    episodeDimension.innerText = location.dimension;
    episodeDimension.style.width = "30%";
    locationRow.appendChild(episodeDimension);

    container.appendChild(locationRow);
  });
}

async function getLocations() {
  const apiUrl = `https://rickandmortyapi.com/api/location?name=${locationName.value}&type=${locationType.value}&dimension=${locationDimension.value}`;
  try {
    const response = await fetch(apiUrl);
    const container = document.getElementById("locations_table");
    if (!response.ok) {
      container.innerHTML = "";
      container.style.display = "flex";
      container.style.flexDirection = "row";
      container.style.justifyContent = "center";
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "characters_selectors_wrapper";
      emptyMessage.innerHTML = `<h4 class="empty_message">There is nothing to display</h4>`;
      container.appendChild(emptyMessage);
    }
    const data = await response.json();
    if (data.results.length > 0) {
      container.style.flexDirection = "column";
      displayLocations(data.results);
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

const locationName = document.getElementById("autocomplete_name_input");
const locationType = document.getElementById("autocomplete_type_input");
const locationDimension = document.getElementById(
  "autocomplete_dimension_input"
);

document.addEventListener("DOMContentLoaded", () => {
  getLocations();
});

locationName.addEventListener("input", (event) => {
  const name = event.target.value.trim();
  if (name) {
    getLocations();
  }
});
locationType.addEventListener("input", (event) => {
  const type = event.target.value.trim();
  if (type) {
    getLocations();
  }
});
locationDimension.addEventListener("input", (event) => {
  const dimension = event.target.value.trim();
  if (dimension) {
    getLocations();
  }
});

const nameLabel = document.getElementById("name_label");
locationName.addEventListener("click", function () {
  nameLabel.style.position = selectStyle.position;
  nameLabel.style.top = selectStyle.top;
  nameLabel.style.fontSize = selectStyle.fontSize;
  nameLabel.style.color = selectStyle.color;
});
locationName.addEventListener("focusout", function () {
  if (!locationName.value) {
    nameLabel.style.position = "";
    nameLabel.style.top = "";
    nameLabel.style.fontSize = "";
    nameLabel.style.color = "";
  }
});

const typeLabel = document.getElementById("type_label");
locationType.addEventListener("click", function () {
  typeLabel.style.position = selectStyle.position;
  typeLabel.style.top = selectStyle.top;
  typeLabel.style.fontSize = selectStyle.fontSize;
  typeLabel.style.color = selectStyle.color;
});
locationType.addEventListener("focusout", function () {
  if (!locationType.value) {
    typeLabel.style.position = "";
    typeLabel.style.top = "";
    typeLabel.style.fontSize = "";
    typeLabel.style.color = "";
  }
});

const dimensionLabel = document.getElementById("dimension_label");
locationDimension.addEventListener("click", function () {
  dimensionLabel.style.position = selectStyle.position;
  dimensionLabel.style.top = selectStyle.top;
  dimensionLabel.style.fontSize = selectStyle.fontSize;
  dimensionLabel.style.color = selectStyle.color;
});
locationDimension.addEventListener("focusout", function () {
  if (!locationDimension.value) {
    dimensionLabel.style.position = "";
    dimensionLabel.style.top = "";
    dimensionLabel.style.fontSize = "";
    dimensionLabel.style.color = "";
  }
});
