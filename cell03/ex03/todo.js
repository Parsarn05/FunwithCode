function saveTodos() {
  const todos = [];
  document.querySelectorAll("#ft_list div").forEach(div => {
    todos.push(div.textContent);
  });
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
  const match = document.cookie.match(/(^|;) ?todos=([^;]*)(;|$)/);
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[2]));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function addTodo(text, save = true) {
  const list = document.getElementById("ft_list");
  const div = document.createElement("div");
  div.textContent = text;

  div.addEventListener("click", () => {
    if (confirm("Do you really want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  });

  list.insertBefore(div, list.firstChild);

  if (save) saveTodos();
}

window.onload = () => {
  const newBtn = document.getElementById("newBtn");

  const saved = loadTodos();
  saved.forEach(todo => addTodo(todo, false));

  newBtn.addEventListener("click", () => {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim());
    }
  });
};
