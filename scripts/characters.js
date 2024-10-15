function openModal(content) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal_body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = content;
  modal.style.display = "block";

  window.document.body.style.overflowY = "hidden";
}

function closeModal() {
  window.document.body.style.overflowY = "scroll";
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

document.getElementById("modal").addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document
  .getElementById("close_modal")
  .addEventListener("click", () => closeModal());

function displayCharacters(characters) {
  const container = document.getElementById("characters_cards_wrapper");
  container.innerHTML = "";

  characters.forEach((character) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "character_card_wrapper";
    cardWrapper.style.position = "relative";

    const card = document.createElement("div");
    card.className = "character_card_img";
    card.style.backgroundImage = `url(${character.image})`;
    const hoverContent = document.createElement("div");
    hoverContent.className = "hover_character_card";
    hoverContent.style.display = "none";
    hoverContent.innerHTML = `<h3 class='character_name'>${character.name}</h3>
                            <p class='character_info'>Gender: ${character.gender}</p>
                            <p class='character_info'>Species: ${character.species}</p>
                            <p class='character_info'>Status: ${character.status}</p>
                            <p class='character_info'>Location: ${character.location.name}</p>`;

    cardWrapper.addEventListener("mouseenter", () => {
      hoverContent.style.display = "flex";
    });

    cardWrapper.addEventListener("mouseleave", () => {
      hoverContent.style.display = "none";
    });

    cardWrapper.addEventListener("click", () =>
      openModal(
        `<div class='character_modal_card'> 
            <div class='character_modal_image'>
                <img src=${character.image} alt=${character.name} />
            </div>
            <div class='character_info_wrapper'>
                <h1 class='character_name'>${character.name}</h1>
                <p class='character_info'>Gender: ${character.gender}</p>
                <p class='character_info'>Species: ${character.species}</p>
                <p class='character_info'>Status: ${character.status}</p>
                <p class='character_info'>Location: ${character.location?.name}</p>
                <p class='character_info'>Origin: ${character.origin.name}</p>

            </div>
        </div>`
      )
    );

    cardWrapper.append(card);
    cardWrapper.append(hoverContent);
    container.append(cardWrapper);
  });
}

async function getCharacters() {
  const apiUrl = `https://rickandmortyapi.com/api/character/?status=${selectStatus.value}&species=${selectSpecies.value}&gender=${selectGender.value}`;
  try {
    const response = await fetch(apiUrl);
    const container = document.getElementById("characters_cards_wrapper");
    if (!response.ok) {
      container.innerHTML = "";
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "characters_selectors_wrapper";
      emptyMessage.innerHTML = `<h4 class="empty_message">There is nothing to display</h4>`;
      container.append(emptyMessage);
    }
    const data = await response.json();
    if (data.results.length > 0) {
      displayCharacters(data.results);
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

const selectStyle = {
  position: "absolute",
  top: "-8px",
  fontSize: "14px",
  color: "white",
};

const selectStatus = document.getElementById("status");
const statusLabel = document.getElementById("status_label_holder");
selectStatus.addEventListener("click", function () {
  statusLabel.style.position = selectStyle.position;
  statusLabel.style.top = selectStyle.top;
  statusLabel.style.fontSize = selectStyle.fontSize;
  statusLabel.style.color = selectStyle.color;
});
selectStatus.addEventListener("focusout", function () {
  if (!selectStatus.value) {
    statusLabel.style.position = "";
    statusLabel.style.top = "";
    statusLabel.style.fontSize = "";
    statusLabel.style.color = "";
  }
});

const selectSpecies = document.getElementById("species");
const speciesLabel = document.getElementById("species_label_holder");
selectSpecies.addEventListener("click", function () {
  speciesLabel.style.position = selectStyle.position;
  speciesLabel.style.top = selectStyle.top;
  speciesLabel.style.fontSize = selectStyle.fontSize;
  speciesLabel.style.color = selectStyle.color;
});
selectSpecies.addEventListener("focusout", function () {
  if (!selectSpecies.value) {
    speciesLabel.style.position = "";
    speciesLabel.style.top = "";
    speciesLabel.style.fontSize = "";
    speciesLabel.style.color = "";
  }
});

const selectGender = document.getElementById("gender");
const genderLabel = document.getElementById("gender_label_holder");
selectGender.addEventListener("click", function () {
  genderLabel.style.position = selectStyle.position;
  genderLabel.style.top = selectStyle.top;
  genderLabel.style.fontSize = selectStyle.fontSize;
  genderLabel.style.color = selectStyle.color;
});
selectGender.addEventListener("focusout", function () {
  if (!selectGender.value) {
    genderLabel.style.position = "";
    genderLabel.style.top = "";
    genderLabel.style.fontSize = "";
    genderLabel.style.color = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  getCharacters();
});

selectStatus.addEventListener("change", () => {
  getCharacters();
});
selectSpecies.addEventListener("change", () => {
  getCharacters();
});
selectGender.addEventListener("change", () => {
  getCharacters();
});
