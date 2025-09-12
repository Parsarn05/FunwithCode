function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

const COOKIE_NAME = "todos_ex03";
let todos = [];

const $listEl = $("#ft_list");
const $newBtn = $("#newBtn");
const $emptyHint = $("#emptyHint");

function render() {
  $listEl.empty();

  if (todos.length === 0) {
    $emptyHint.prop("hidden", false);
    return;
  }

  $emptyHint.prop("hidden", true);

  todos.forEach((t) => {
    const $div = $("<div>")
      .addClass("todo")
      .attr("data-id", t.id)
      .attr("title", "Click to remove")
      .text(t.text)
      .on("click", () => {
        if (confirm("Do you want to remove that TO DO?")) {
          todos = todos.filter((x) => x.id !== t.id);
          persist();
          render();
        }
      });

    $listEl.prepend($div);
  });
}

function persist() {
  setCookie(COOKIE_NAME, JSON.stringify(todos));
}

(function bootstrap() {
  try {
    const raw = getCookie(COOKIE_NAME);
    if (raw) todos = JSON.parse(decodeURIComponent(raw));
  } catch {
    todos = [];
  }
  render();
})();

$newBtn.on("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text === null) return;
  const trimmed = text.trim();
  if (!trimmed) return;

  const todo = {
    id: String(Date.now()) + Math.random().toString(36).slice(2),
    text: trimmed,
  };
  todos.unshift(todo);
  persist();
  render();
});