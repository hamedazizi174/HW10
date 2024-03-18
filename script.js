"use strict";

jalaliDatepicker.startWatch({
  minDate: "attr",
});

let Deadline = document.getElementById("Deadline");
Deadline.addEventListener("click", () => {
  jalaliDatepicker.show(Deadline);
});
