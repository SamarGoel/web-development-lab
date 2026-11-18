var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    var taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        toggleComplete(li, checkbox);
    });

    var span = document.createElement("span");
    span.textContent = taskText;

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
        deleteTask(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
}

function toggleComplete(li, checkbox) {
    if (checkbox.checked) {
        li.classList.add("completed");
    } else {
        li.classList.remove("completed");
    }
}

function deleteTask(li) {
    taskList.removeChild(li);
}