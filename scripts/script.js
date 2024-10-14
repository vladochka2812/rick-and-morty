export function openModal(content) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal_body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = content;
  modal.style.display = "flex";
  window.document.body.style.overflowY = "hidden";
}

export function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  window.document.body.style.overflowY = "scroll";
}

document.getElementById("modal").addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document
  .getElementById("close_modal")
  .addEventListener("click", () => closeModal());
