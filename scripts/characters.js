const selectStatus = document.getElementById("status");
const statusLabel = document.getElementById("status_label_holder");
const selectSpecies = document.getElementById("species");
const speciesLabel = document.getElementById("species_label_holder");
const selectGender = document.getElementById("gender");
const genderLabel = document.getElementById("gender_label_holder");

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
    const { name, image, gender, species, status, location, origin } =
      character;
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "character_card_wrapper";
    cardWrapper.style.position = "relative";

    const card = document.createElement("div");
    card.className = "character_card_img";
    card.style.backgroundImage = `url(${image})`;
    const hoverContent = document.createElement("div");
    hoverContent.className = "hover_character_card";
    hoverContent.style.display = "none";
    hoverContent.innerHTML = `<h3 class='character_name'>${name}</h3>
                            <p class='character_info'>Gender: ${gender}</p>
                            <p class='character_info'>Species: ${species}</p>
                            <p class='character_info'>Status: ${status}</p>
                            <p class='character_info'>Location: ${location.name}</p>`;

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
                <img src=${image} alt=${name} />
            </div>
            <div class='character_info_wrapper'>
                <h1 class='character_name'>${name}</h1>
                <p class='character_info'>Gender: ${gender}</p>
                <p class='character_info'>Species: ${species}</p>
                <p class='character_info'>Status: ${status}</p>
                <p class='character_info'>Location: ${location.name}</p>
                <p class='character_info'>Origin: ${origin.name}</p>

            </div>
        </div>`
      )
    );

    cardWrapper.append(card, hoverContent);
    container.append(cardWrapper);
  });
}


async function getCharacters() {
  const apiUrl = `https://rickandmortyapi.com/api/character/?status=${selectStatus.value}&species=${selectSpecies.value}&gender=${selectGender.value}`;
  try {
    const response = await fetch(apiUrl);
    const container = document.getElementById("characters_cards_wrapper");
    if (!response.ok) {
      emptyMessage(container);
    }
    const data = await response.json();
    if (data.results) {
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

inputStyleLabel(selectStatus, statusLabel);
inputStyleLabel(selectGender, genderLabel);
inputStyleLabel(selectSpecies, speciesLabel);

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
