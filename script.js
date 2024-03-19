"use strict";

const addModal = document.getElementById("addModal");
const overlay = document.getElementById("overlay");
const addForm = document.getElementById("addForm");
const Deadline = document.getElementById("Deadline");

const storagedToDos = "To Dos";

const toDos = JSON.parse(localStorage.getItem(storagedToDos)) || [];

function showAddModal() {
  addModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeAddModal() {
  addModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function addDataToLocalStorage(event) {
  event.preventDefault();
  const { taskName, priority, deadline } = event.target;
  const toDo = {
    taskName: taskName.value,
    priority: priority.value,
    status: "To Do",
    deadline: deadline.value,
  };
  toDos.push(toDo);
  localStorage.setItem(storagedToDos, JSON.stringify(toDos));
}

jalaliDatepicker.startWatch({
  minDate: "attr",
});

Deadline.addEventListener("click", () => {
  jalaliDatepicker.show(Deadline);
});

addForm.addEventListener("submit", addDataToLocalStorage);
