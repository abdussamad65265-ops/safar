const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    this.classList.add("active");
    currentFilter = this.dataset.filter;
    renderTasks();
  });
});

clearCompletedBtn.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  renderTasks();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
      return !task.completed;
    } else if (currentFilter === "completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<li class="empty-message">No tasks found.</li>`;
  } else {
    filteredTasks.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "task-item";

      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
          <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
        </div>
        <div class="task-actions">
          <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;

      taskList.appendChild(li);
    });
  }

  updateStats();
}

function updateStats() {
  totalTasks.textContent = `Total: ${tasks.length}`;

  const completedCount = tasks.filter(function (task) {
    return task.completed;
  }).length;

  completedTasks.textContent = `Completed: ${completedCount}`;
}

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

function editTask(id) {
  const taskItem = document.querySelectorAll(".task-item");
  const taskData = tasks.find(function (task) {
    return task.id === id;
  });

  let selectedItem = null;

  taskItem.forEach(function (item) {
    const editButton = item.querySelector(".edit-btn");
    if (editButton && editButton.getAttribute("onclick") === `editTask(${id})`) {
      selectedItem = item;
    }
  });

  if (!selectedItem || !taskData) return;

  selectedItem.innerHTML = `
    <div class="task-left" style="width: 100%;">
      <input type="text" class="edit-input" id="editInput-${id}" value="${taskData.text}">
    </div>
    <div class="task-actions">
      <button class="save-btn" onclick="saveEditedTask(${id})">Save</button>
      <button class="cancel-btn" onclick="renderTasks()">Cancel</button>
    </div>
  `;
}

function saveEditedTask(id) {
  const editInput = document.getElementById(`editInput-${id}`);
  const updatedText = editInput.value.trim();

  if (updatedText === "") {
    alert("Task cannot be empty.");
    return;
  }

  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        text: updatedText
      };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

renderTasks();
