(() => {
  "use strict";

  const dateElement = document.querySelector("#current-date");
  const shortDateElement = document.querySelector("#current-date-short");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");

  const now = new Date();
  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(now);
  }
  if (shortDateElement) {
    shortDateElement.textContent = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit", month: "short"
    }).format(now).replace(".", "");
  }

  themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
  });

  document.addEventListener("tasks:updated", (event) => {
    const count = Number(event.detail?.count ?? document.querySelector("#task-list")?.children.length ?? 0);
    ["#task-count", "#summary-task-count", "#sidebar-task-count"].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = String(count);
    });
    const emptyState = document.querySelector("#task-empty-state");
    const taskList = document.querySelector("#task-list");
    if (emptyState && taskList) emptyState.hidden = taskList.children.length > 0;
  });

  // Atualiza os contadores mesmo que a lista de tarefas ainda não tenha sido conectada.
  const taskList = document.querySelector("#task-list");
  if (taskList) {
    const count = taskList.children.length;
    ["#task-count", "#summary-task-count", "#sidebar-task-count"].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = String(count);
    });
  }
})();
