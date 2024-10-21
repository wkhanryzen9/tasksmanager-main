const alertMessage = document.querySelector('.alert');
const noneInputsContainer = document.querySelector('.filter-section');

const addTask = document.getElementById("addTask");
const clearAllButton = document.getElementById("clear-btn");

const dateInput = document.getElementById("taskDueDate");
const addTaskName = document.getElementById("taskName");

const allTasksButton = document.getElementById("allTasks");
const activeTasksButton = document.getElementById("activeTasks");
const completedTasksButton = document.getElementById("completedTasks");

const taskList = document.getElementById("tasksListing");
const tableRows = taskList.getElementsByTagName("tr");

addTask.addEventListener("click", () => {
    if (validateTaskInput()) {
        addTaskToTable();
        noneInputsContainer.classList.remove("hidden");
    } else {
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
            alertMessage.classList.add("hidden");
        }, 2500);
    }
});

clearAllButton.addEventListener("click", () => {
    clearAllTasks();
});

let taskName;
let dueDate;
let priority;
let taskRow;

function validateTaskInput() {
    taskName = addTaskName.value;
    dueDate = dateInput.value;
    priority = document.getElementById("priority").value;
    return taskName.trim() !== "" && dueDate !== "" && priority !== "";
}

function addTaskToTable() {
    taskName = addTaskName.value;
    dueDate = dateInput.value;
    priority = document.getElementById("priority").value;

    if (taskName) {
        taskRow = createTaskRow(taskName, dueDate, priority);
        taskList.appendChild(taskRow);
        addTaskName.value = "";
        dateInput.value = "";
        document.getElementById("priority").selectedIndex = 0;

        const isEmpty = taskList.getElementsByTagName("tr").length === 0;
        clearAllButton.classList.toggle("hidden", isEmpty);
        allTasksButton.click();
    }
}

function createTaskRow(taskName, dueDate, priority) {
    const taskRow = document.createElement("tr");

    const statusCell = document.createElement("td");
    statusCell.textContent = "Active";
    statusCell.classList.add("font-bold");

    const taskDescription = document.createElement("td");
    taskDescription.textContent = taskName;

    const priorityCell = document.createElement("td");
    priorityCell.textContent = priority;
    priorityCell.classList.add("font-semibold");

    if (priority === "High Priority") {
        priorityCell.style.color = "#ff0000";
    } else if (priority === "Low Priority") {
        priorityCell.style.color = "#FFD700";
    }

    const dueDateCell = document.createElement("td");
    const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
    });
    dueDateCell.textContent = formattedDate;

    const actionsCell = document.createElement("td");
    actionsCell.appendChild(createActionButtons(taskDescription, statusCell, taskRow));

    taskRow.appendChild(statusCell);
    taskRow.appendChild(taskDescription);
    taskRow.appendChild(priorityCell);
    taskRow.appendChild(dueDateCell);
    taskRow.appendChild(actionsCell);

    return taskRow;
}

function createActionButtons(taskDescription, statusCell, taskRow) {
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    editButton.classList.add("mr-2");
    editButton.addEventListener("click", () => {
        taskDescription.setAttribute("contenteditable", "true");
        taskDescription.focus();
    });
    taskDescription.addEventListener("blur", () => {
        taskDescription.removeAttribute("contenteditable");
    });

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.classList.add("mr-2");
    completeButton.addEventListener("click", () => {
        statusCell.textContent = "Completed";
        taskDescription.classList.add("line-through", "text-green-500", "font-bold");
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("mr-2");
    deleteButton.addEventListener("click", () => {
        taskRow.remove();
        const remainingTasks = taskList.getElementsByTagName("tr").length;

        if (remainingTasks === 0) {
            noneInputsContainer.classList.add("hidden");
            clearAllButton.classList.add("hidden");
        }
    });

    const container = document.createElement("div");
    container.appendChild(editButton);
    container.appendChild(completeButton);
    container.appendChild(deleteButton);

    return container;
}

function clearAllTasks() {
    const tableRows = taskList.getElementsByTagName("tr");
    for (let i = tableRows.length - 1; i >= 0; i--) {
        tableRows[i].remove();
    }
    noneInputsContainer.classList.add("hidden");
    clearAllButton.classList.add("hidden");
}
