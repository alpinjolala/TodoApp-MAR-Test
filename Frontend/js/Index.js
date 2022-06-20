const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const activeInput = document.querySelector(".input-active");
const activeButton = document.querySelector(".active-button");
const tabButton = document.querySelector(".tab-button");
const todoList = document.querySelector(".todo-list");
const activeList = document.querySelector(".todo-list-active");
const completedList = document.querySelector(".todo-completed-list");
const deleteCompletedButton = document.querySelector(".delete-all");
const activeTab = document.querySelector("#active-tab");
const completedTab = document.querySelector("#completed-tab");
const allTab = document.querySelector("#all-tab");
let todo = [];

window.onload = function () {
  load();
  displayList();
};

activeButton.addEventListener("click", function (e) {
  if (activeInput.value != "") {
    todo.push({
      id: todo.length + 1,
      value: activeInput.value,
      Checked: false,
    });
    newTodo(activeInput.value);
    activeInput.value = "";
    activeTab.click();
  } else {
    alert("Add todo details...");
  }
  save();
});

todoButton.addEventListener("click", function (e) {
  if (todoInput.value != "") {
    todo.push({ id: todo.length + 1, value: todoInput.value, Checked: false });
    newTodo(todoInput.value);

    save();

    todoInput.value = "";
  } else {
    alert("Add todo details");
  }
});

todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (todoInput.value != "") {
      todo.push({
        id: todo.length + 1,
        value: todoInput.value,
        Checked: false,
      });
      newTodo(todoInput.value);

      save();

      todoInput.value = "";
    } else {
      alert("Add todo details");
    }
  }
});
activeInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (activeInput.value != "") {
      todo.push({
        id: todo.length + 1,
        value: activeInput.value,
        Checked: false,
      });
      newTodo(activeInput.value);

      save();
      activeTab.click();
      activeInput.value = "";
    } else {
      alert("Add todo details");
    }
  }
});

deleteCompletedButton.addEventListener("click", function () {
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].Checked == true) {
      todo.splice(todo.indexOf(todo[i]), 1);
      displayList();
      i--;
    }
  }
  completedList.innerHTML = "";

  save();
});

completedTab.addEventListener("click", function (e) {
  completedList.innerHTML = "";
  for (const task of todo.filter((task) => task.Checked === true)) {
    const tasks = document.createElement("div");
    const todoCheckBox = document.createElement("input");
    const item = document.createElement("li");
    const todoDelete = document.createElement("button");

    item.textContent = task.value;
    item.style.textDecoration = "line-through";
    todoCheckBox.type = "checkbox";
    todoCheckBox.name = "checkbox";
    todoCheckBox.checked = true;

    todoCheckBox.addEventListener("click", function (e) {
      if (!todoCheckBox.checked) {
        tasks.remove();
        task.Checked = false;
        displayList();

        save();
      }
    });

    todoDelete.innerHTML = `
        <i class="fa fa-trash"></i>
        `;
    todoDelete.addEventListener("click", function (e) {
      e.target.parentElement.remove();

      todo.splice(todo.indexOf(task), 1);
      displayList();

      save();
    });

    tasks.classList.add("todo");
    todoDelete.classList.add("trash-button");

    todoDelete.classList.add("delete");

    tasks.appendChild(todoCheckBox);
    tasks.appendChild(item);
    tasks.appendChild(todoDelete);

    completedList.appendChild(tasks);
  }
  save();
});

activeTab.addEventListener("click", function () {
  activeList.innerHTML = "";
  for (const task of todo.filter((task) => task.Checked === false)) {
    const tasks = document.createElement("div");
    const todoCheckBox = document.createElement("input");
    const item = document.createElement("li");

    item.textContent = task.value;
    todoCheckBox.type = "checkbox";
    todoCheckBox.name = "checkbox";

    todoCheckBox.addEventListener("click", function (e) {
      if (todoCheckBox.checked) {
        task.Checked = true;
        tasks.remove();
        displayList();
        save();
      }
    });

    tasks.classList.add("todo");

    tasks.appendChild(todoCheckBox);
    tasks.appendChild(item);

    activeList.appendChild(tasks);
  }
  save();
});

function newTodo(value) {
  const tasks = document.createElement("div");
  const todoCheckBox = document.createElement("input");
  const item = document.createElement("li");
  let obj = todo.find((t) => t.value === value && t.id == todo.length);

  item.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.name = "checkbox";

  todoCheckBox.addEventListener("click", function (e) {
    if (todoCheckBox.checked) {
      todoCheckBox.checked = true;
      item.style.textDecoration = "line-through";
      obj.Checked = true;
    } else {
      obj.Checked = false;

      todoCheckBox.checked = false;
      item.style.textDecoration = "none";
    }
  });

  tasks.classList.add("todo");

  tasks.appendChild(todoCheckBox);
  tasks.appendChild(item);

  todoList.appendChild(tasks);
}

function displayList() {
  todoList.innerHTML = "";

  for (const task of todo) {
    const tasks = document.createElement("div");
    const todoCheckBox = document.createElement("input");
    const item = document.createElement("li");

    item.textContent = task.value;
    todoCheckBox.type = "checkbox";
    todoCheckBox.name = "checkbox";

    if (task.Checked === true) {
      todoCheckBox.checked = true;
      item.style.textDecoration = "line-through";
    }

    todoCheckBox.addEventListener("click", function (e) {
      if (todoCheckBox.checked) {
        task.Checked = true;
        todoCheckBox.checked = true;
        item.style.textDecoration = "line-through";
        save();
      } else {
        task.Checked = false;
        todoCheckBox.checked = false;
        item.style.textDecoration = "none";
      }
    });

    tasks.classList.add("todo");

    tasks.appendChild(todoCheckBox);
    tasks.appendChild(item);

    todoList.appendChild(tasks);
  }
}

function save() {
  let stringified = JSON.stringify(todo);
  localStorage.setItem("todoList", stringified);
}

function load() {
  let retrieveData = localStorage.getItem("todoList");
  let localStorageTodoList = JSON.parse(retrieveData);

  for (let i = 0; i < localStorageTodoList.length; i++) {
    if (!todo.includes(localStorageTodoList[i])) {
      todo.push(localStorageTodoList[i]);
    }
  }
}

//tabs
function setupTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const navBar = button.parentElement;
      const tabsContainer = navBar.parentElement;
      const tabState = button.dataset.tab;
      const tabToActive = tabsContainer.querySelector(
        `.tab[data-tab="${tabState}"]`
      );

      navBar.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.remove("button-active");
      });

      tabsContainer.querySelectorAll(".tab").forEach((button) => {
        button.classList.remove("tab-active");
      });

      button.classList.add("button-active");
      tabToActive.classList.add("tab-active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();

  document.querySelectorAll(".tabs").forEach((tabsContainer) => {
    tabsContainer.querySelector(".nav .tab-button").click();
  });
});
