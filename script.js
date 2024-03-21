"use strict";

const addModal = document.getElementById("addModal");
const editModal = document.getElementById("editModal");
const overlay = document.getElementById("overlay");
const addForm = document.getElementById("addForm");
const editForm = document.getElementById("editForm");
const Deadline = document.getElementById("Deadline");
const tbody = document.querySelector("tbody");

const storagedToDos = "To Dos";
const idKey = "id";
let editedToDOIndex;

let id = JSON.parse(localStorage.getItem(idKey)) || 0;
const toDos = JSON.parse(localStorage.getItem(storagedToDos)) || [];

function showAddModal() {
  addModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function showEditModal() {
  editModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeAddModal() {
  addModal.classList.add("hidden");
  overlay.classList.add("hidden");
  addForm.reset();
}

function closeEditModal() {
  editModal.classList.add("hidden");
  overlay.classList.add("hidden");
  editForm.reset();
}

function addDataToLocalStorage(event) {
  event.preventDefault();

  ////////////////// first way to make an object with form fields
  const toDo = Object.fromEntries(new FormData(event.target));
  toDo.id = id;

  ////////////////// second way to make an object with form fields
  // const { taskName, priority, status, deadline } = event.target;
  // const toDo = {
  //   id,
  //   taskName: taskName.value,
  //   priority: priority.value,
  //   status: status.value,
  //   deadline: deadline.value,
  // };

  id++;
  toDos.push(toDo);
  localStorage.setItem(storagedToDos, JSON.stringify(toDos));
  localStorage.setItem(idKey, JSON.stringify(id));
  closeAddModal();
  renderRows();
}

function renderRows() {
  tbody.innerHTML = "";
  toDos.forEach((toDo) => {
    renderRow(toDo);
  });
}

function renderRow(toDo) {
  // create Task Name cell
  const taskNameTD = document.createElement("td");
  taskNameTD.classList.add("p-2", "border-2");
  taskNameTD.innerText = toDo.taskName;

  // create Priority cell
  const priorityDIV = document.createElement("div");
  priorityDIV.classList.add("rounded-2xl", "py-1", "px-3", "inline-block");
  switch (toDo.priority) {
    case "Low":
      priorityDIV.classList.add("bg-gray-300");
      break;
    case "Medium":
      priorityDIV.classList.add("bg-yellow-400");
      break;
    case "High":
      priorityDIV.classList.add("bg-red-500", "text-white");
      break;
  }
  priorityDIV.innerText = toDo.priority;

  const priorityTD = document.createElement("td");
  priorityTD.classList.add("p-2", "text-center", "border-2");
  priorityTD.append(priorityDIV);

  // create Status cell
  const statusDIV = document.createElement("div");
  statusDIV.classList.add("rounded-2xl", "py-1", "px-3", "inline-block");
  statusDIV.innerText = toDo.status;
  statusColor(statusDIV, toDo.status);

  const statusTD = document.createElement("td");
  statusTD.classList.add("p-2", "text-center", "border-2");
  statusTD.append(statusDIV);

  // create Deadline cell
  const deadlineDIV = document.createElement("div");
  deadlineDIV.classList.add(
    "border-2",
    "border-blue-400",
    "rounded-2xl",
    "py-1",
    "px-3",
    "inline-block",
    "font-yekan"
  );
  deadlineDIV.innerText = toDo.deadline;

  const deadlineTD = document.createElement("td");
  deadlineTD.classList.add("p-2", "text-center", "border-2");
  if (!toDo.deadline) {
    deadlineTD.append("No Deadline");
  } else {
    deadlineTD.append(deadlineDIV);
  }

  // create Actions cell
  const deleteBTN = document.createElement("input");
  deleteBTN.type = "image";
  deleteBTN.src = "./assets/icons/Delete 1.png";
  deleteBTN.classList.add(
    "bg-red-500",
    "py-0.5",
    "px-2",
    "m-1",
    "rounded",
    "shadow-lg",
    "hover:bg-red-700",
    "hover:shadow-red-400",
    "active:bg-red-900"
  );
  deleteBTN.addEventListener("click", (e) => deleteRow(toDo.id, e));

  const editBTN = document.createElement("input");
  editBTN.type = "image";
  editBTN.src = "./assets/icons/Edit 1.png";
  editBTN.classList.add(
    "bg-blue-500",
    "py-0.5",
    "px-2",
    "m-1",
    "rounded",
    "shadow-lg",
    "hover:bg-blue-700",
    "hover:shadow-blue-400",
    "active:bg-blue-900"
  );
  editBTN.addEventListener("click", () => editRow(toDo));

  const showBTN = document.createElement("input");
  showBTN.type = "image";
  showBTN.src = "./assets/icons/Show.png";
  showBTN.classList.add(
    "bg-gray-500",
    "py-0.5",
    "px-2",
    "m-1",
    "rounded",
    "shadow-lg",
    "hover:bg-gray-700",
    "hover:shadow-gray-400",
    "active:bg-gray-900"
  );

  const actionsTD = document.createElement("td");
  actionsTD.classList.add("p-2", "text-center", "border-2");
  actionsTD.append(deleteBTN, editBTN, showBTN);

  // append cells to Row
  const row = document.createElement("tr");
  row.append(taskNameTD, priorityTD, statusTD, deadlineTD, actionsTD);

  // append Row to tbody
  tbody.append(row);
}

function statusColor(statusDIV, status) {
  switch (status) {
    case "To Do":
      statusDIV.classList.remove("bg-yellow-400");
      statusDIV.classList.add("bg-red-500", "text-white");
      break;
    case "Doing":
      statusDIV.classList.remove("text-white");
      statusDIV.classList.add("bg-yellow-400", "text-black");
      break;
    case "Done":
      statusDIV.classList.remove("bg-yellow-400", "bg-red-500");
      statusDIV.classList.add("bg-green-600", "text-white");
      break;
  }
}

function deleteRow(rowID, event) {
  event.target.closest("tr").remove();
  toDos.forEach((toDo, index) => {
    if (rowID === toDo.id) {
      toDos.splice(index, 1);
      localStorage.setItem(storagedToDos, JSON.stringify(toDos));
    }
  });
}

function editRow(toDo) {
  showEditModal();
  editForm.taskName.value = toDo.taskName;
  editForm.priority.value = toDo.priority;
  editForm.status.value = toDo.status;
  editForm.deadline.value = toDo.deadline;
  editForm.id.value = toDo.id;
  editedToDOIndex = toDos.indexOf(toDo);
}

function editToDo(event) {
  event.preventDefault();
  const toDo = Object.fromEntries(new FormData(event.target));
  toDos[editedToDOIndex] = toDo;
  localStorage.setItem(storagedToDos, JSON.stringify(toDos));
  closeEditModal();
  renderRows();
}

jalaliDatepicker.startWatch({
  minDate: "attr",
});

Deadline.addEventListener("click", () => {
  jalaliDatepicker.show(Deadline);
});

addForm.addEventListener("submit", addDataToLocalStorage);
editForm.addEventListener("submit", editToDo);

renderRows();
