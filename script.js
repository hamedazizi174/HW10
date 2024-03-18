"use strict";

const addModal = document.getElementById("addModal");
const overlay = document.getElementById("overlay");

function showAddModal() {
  addModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  addModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

jalaliDatepicker.startWatch({
  minDate: "attr",
});

const Deadline = document.getElementById("Deadline");

Deadline.addEventListener("click", () => {
  jalaliDatepicker.show(Deadline);
});
