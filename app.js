const inputElement = document.getElementById("pr1-ip");
const divElement = document.getElementById("items");
const dateElement = document.getElementById("js-date");
const timeElement = document.getElementById("js-time");
const pendingCountElement = document.getElementById("pending-count");

let todoList;
try {
  todoList = JSON.parse(localStorage.getItem("list")) || [];
} catch (error) {
  todoList = [];
}

renderTodo();

function deleteAllTodos() {
  todoList = [];
  localStorage.setItem("list", JSON.stringify(todoList));
  renderTodo();
}

function addTodo() {
  const name = inputElement.value;
  const date = dateElement.value;
  const time = timeElement.value;
  todoList.push({ name, date, time });
  localStorage.setItem("list", JSON.stringify(todoList));
  inputElement.value = "";
  dateElement.value = "";
  timeElement.value = "";
  renderTodo();
}

function renderTodo() {
  let tlHTML = ``;
  todoList.forEach(function (todoObject, i) {
    const { name, date, time } = todoObject;
    const html = `
                    <div class="nd">${name}</div>
                    <div class="nd">${date}</div>
                    <div class="nd">${time}</div>
                    <button onClick="
                        todoList.splice(${i},1);
                        renderTodo();
                    " id="del-btn">Delete</button>
                `;
    tlHTML += html;
  });

  divElement.innerHTML = tlHTML;
  pendingCountElement.textContent = `Pending Tasks: ${todoList.length}`;
  localStorage.setItem("list", JSON.stringify(todoList));
}

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
    renderTodo();
    localStorage.setItem("list", JSON.stringify(todoList));
  }
});
