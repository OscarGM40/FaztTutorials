import {
  saveTask,
  getTask,
  onGetTasks,
  deleteTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  /* no quiero la snapshot porque no es en tiempo real */
  // const querySnapshot = await getTasks();

  /* vamos a suscribirnos a los cambios en la collection */
  onGetTasks((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      const id = doc.id;
      // console.log(id, "id");
      html += `
      <div class="card mb-3 text-center">
      <div class="card-body">
      <h3 class="h2 text-info">${task.title}</h3>
      <p class="text-muted h5 mb-4">Description: ${task.description}</p>
      <button data-id="${id}"  class='btn btn-warning btn-delete w-50 text-danger'>Delete</button>
      
      <button data-id="${id}" class='btn btn-secondary btn-edit w-50 mt-3 text-dark'>Edit</button>
      </div>
      </div>
      `;
    });
    tasksContainer.innerHTML = html;

    const deleteButtons = document.querySelectorAll(".btn-delete");

    const editButtons = document.querySelectorAll(".btn-edit");

    deleteButtons.forEach((btn, idx) => {
      btn.addEventListener("click", async (event) => {
        // console.log(btn.attributes[0].value);
        const taskId = event.target.dataset.id;
        await deleteTask(taskId);
      });
    });

    editButtons.forEach((btn, idx) => {
      btn.addEventListener("click", async (event) => {
        const taskId = event.target.dataset.id;
        const taskRef = await getTask(taskId);
        const task = taskRef.data();

        taskForm.querySelector("#task-title").value = task.title;
        taskForm.querySelector("#task-description").value = task.description;

        editStatus = true;
        id = taskId;

        taskForm.querySelector("#btn-task-save").innerText = "Update";
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"].value;
  const description = taskForm["task-description"].value;

  if (!editStatus) {
    await saveTask(title, description);
  } else {
    await updateTask(id, { title, description });
    editStatus = false;
    taskForm.querySelector("#btn-task-save").innerText = "Save";
  }

  taskForm.reset();
});
