const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const listEl = document.getElementById("todo-list");
const messageEl = document.getElementById("message");
const loadBtn = document.getElementById("load-btn");
const form = document.getElementById("todos");

function showMessage(text) {
  messageEl.textContent = text;
}

function createTodoItem(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.todoId = String(todo.id);

  const title = document.createElement("span");
  title.className = "todo-title";
  title.textContent = `#${todo.id} (user ${todo.userId}) - ${todo.title}`;

  if (todo.completed) {
    title.classList.add("todo-completed");
  }

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const doneBtn = document.createElement("button");
  doneBtn.type = "button";
  doneBtn.textContent = "Termine";
  doneBtn.disabled = todo.completed;
  doneBtn.addEventListener("click", async () => {
    await markAsDone(todo, title, doneBtn);
  });

  actions.appendChild(doneBtn);
  li.appendChild(title);
  li.appendChild(actions);
  return li;
}

async function loadTodos() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  listEl.innerHTML = "";
  data.forEach((todo) => {
    listEl.appendChild(createTodoItem(todo));
  });
}

async function markAsDone(todo, titleEl, buttonEl) {
  const response = await fetch(`${apiUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...todo, completed: true }),
  });

  if (!response.ok) {
    showMessage("Erreur: mise a jour impossible");
    return;
  }

  titleEl.classList.add("todo-completed");
  buttonEl.disabled = true;
  showMessage("Tache mise a jour: completed = true");
}

async function createTodo(newTodo) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    showMessage("Erreur: creation impossible");
    return;
  }

  const createdTodo = await response.json();
  listEl.prepend(createTodoItem(createdTodo));
  showMessage("Tache creee avec succes");
}

loadBtn.addEventListener("click", () => {
  loadTodos();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userId = Number(document.getElementById("userId").value);
  const title = document.getElementById("title").value.trim();
  const completed = document.getElementById("completed").value === "true";

  const newTodo = { userId, title, completed };
  await createTodo(newTodo);
  form.reset();
});
