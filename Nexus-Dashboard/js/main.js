(() => {
  "use strict";

  const STORAGE_KEY = "nexus-dashboard-tasks-v1";
  const dateElement = document.querySelector("#current-date");
  const shortDateElement = document.querySelector("#current-date-short");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const taskForm = document.querySelector("#task-form");
  const taskInput = document.querySelector("#task-input");
  const taskDateInput = document.querySelector("#task-date");
  const taskTimeInput = document.querySelector("#task-time");
  const taskList = document.querySelector("#task-list");

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

  // Mantém a preferência de tema entre as visitas.
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("nexus-dashboard-theme");
  } catch (error) {
    console.warn("[Nexus-Dashboard] Não foi possível ler o tema salvo.", error);
  }
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeIcon) themeIcon.textContent = "☀";
    themeToggle?.setAttribute("aria-label", "Ativar tema claro");
  }

  themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
    try {
      localStorage.setItem("nexus-dashboard-theme", isDark ? "dark" : "light");
    } catch (error) {
      console.warn("[Nexus-Dashboard] Não foi possível salvar o tema.", error);
    }
  });

  let tasks = [];
  let activeFilter = "all";

  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved
        .filter((task) => task && typeof task.text === "string")
        .map((task) => ({
          id: String(task.id || `${Date.now()}-${Math.random()}`),
          text: task.text.slice(0, 160),
          completed: Boolean(task.completed),
          createdAt: Number(task.createdAt) || Date.now(),
          dueDate: /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate || "") ? task.dueDate : "",
          dueTime: /^\d{2}:\d{2}$/.test(task.dueTime || "") ? task.dueTime : ""
        }));
    } catch (error) {
      console.warn("[Nexus-Dashboard] Não foi possível recuperar as tarefas.", error);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("[Nexus-Dashboard] Não foi possível salvar as tarefas.", error);
      announce("Não foi possível salvar as tarefas neste navegador.");
    }
  }

  function announce(message) {
    const liveRegion = document.querySelector("#task-announcement");
    if (liveRegion) liveRegion.textContent = message;
  }

  // Organiza por data e horário escolhidos; tarefas sem data ficam no fim, por ordem de criação.
  function dueStamp(task) {
    if (!task.dueDate) return Infinity;
    return new Date(`${task.dueDate}T${task.dueTime || "23:59"}`).getTime();
  }

  function compareTasks(a, b) {
    const diff = dueStamp(a) - dueStamp(b);
    if (diff !== 0 && !Number.isNaN(diff)) return diff;
    return a.createdAt - b.createdAt;
  }

  function createTaskElement(task) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;
    item.dataset.taskId = task.id;

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "task-check";
    completeButton.dataset.action = "toggle";
    completeButton.setAttribute("aria-label", task.completed ? "Marcar tarefa como pendente" : "Concluir tarefa");
    completeButton.setAttribute("aria-pressed", String(task.completed));
    completeButton.textContent = task.completed ? "✓" : "";

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const date = document.createElement("span");
    date.className = "task-date";
    const dateLabel = task.dueDate
      ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" })
          .format(new Date(`${task.dueDate}T00:00:00`))
      : new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" })
          .format(new Date(task.createdAt));
    const addInfo = (label, value) => {
      const part = document.createElement("span");
      part.className = "task-date-part";
      const name = document.createElement("b");
      name.textContent = `${label}:`;
      part.append(name, ` ${value}`);
      date.append(part);
    };
    addInfo("Data", dateLabel);
    if (task.dueTime) addInfo("Hora", task.dueTime);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "task-delete";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Excluir tarefa: ${task.text}`);
    deleteButton.title = "Excluir tarefa";
    deleteButton.textContent = "×";

    const content = document.createElement("div");
    content.className = "task-content";
    content.append(text, date);

    item.append(completeButton, content, deleteButton);
    return item;
  }

  function renderTasks() {
    if (!taskList) return;

    const filteredTasks = tasks.filter((task) => {
      if (activeFilter === "pending") return !task.completed;
      if (activeFilter === "completed") return task.completed;
      return true;
    });

    taskList.replaceChildren();
    filteredTasks.forEach((task) => taskList.appendChild(createTaskElement(task)));

    const emptyState = document.querySelector("#task-empty-state");
    if (emptyState) {
      emptyState.hidden = filteredTasks.length > 0;
      const message = emptyState.querySelector("span:last-child");
      if (message) {
        message.textContent = tasks.length === 0
          ? "Adicione uma tarefa acima para organizar seu dia."
          : activeFilter === "pending"
            ? "Não há tarefas pendentes neste momento."
            : activeFilter === "completed"
              ? "As tarefas concluídas aparecerão aqui."
              : "Nenhuma tarefa encontrada.";
      }
    }

    updateDashboard();
  }

  function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    ["#task-count", "#summary-task-count", "#sidebar-task-count", "#analytics-total"]
      .forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = String(total);
      });

    const completedElement = document.querySelector("#completed-count");
    const pendingElement = document.querySelector("#pending-count");
    const percentElement = document.querySelector("#progress-percent");
    const ring = document.querySelector("#progress-ring");
    if (completedElement) completedElement.textContent = String(completed);
    if (pendingElement) pendingElement.textContent = String(pending);
    if (percentElement) percentElement.textContent = `${percent}%`;
    if (ring) {
      ring.style.setProperty("--progress", `${percent}%`);
      ring.setAttribute("aria-label", `${percent}% das tarefas concluídas`);
    }

    const completedValue = document.querySelector("#chart-completed-value");
    const pendingValue = document.querySelector("#chart-pending-value");
    const completedBar = document.querySelector("#chart-completed-bar");
    const pendingBar = document.querySelector("#chart-pending-bar");
    const chartEmpty = document.querySelector("#chart-empty");
    const chartSummary = document.querySelector("#chart-summary");

    if (completedValue) completedValue.textContent = String(completed);
    if (pendingValue) pendingValue.textContent = String(pending);
    if (completedBar) completedBar.style.width = `${total ? (completed / total) * 100 : 0}%`;
    if (pendingBar) pendingBar.style.width = `${total ? (pending / total) * 100 : 0}%`;
    if (chartEmpty) chartEmpty.hidden = total > 0;
    if (chartSummary) {
      chartSummary.textContent = total
        ? `${completed} de ${total} tarefa${total === 1 ? "" : "s"} concluída${completed === 1 ? "" : "s"}`
        : "Nenhuma tarefa cadastrada";
    }

    document.dispatchEvent(new CustomEvent("tasks:updated", { detail: { count: total, completed, pending, percent } }));
  }

  taskForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = taskInput?.value.trim() || "";
    if (!text) {
      taskInput?.focus();
      announce("Digite uma tarefa antes de adicionar.");
      return;
    }

    tasks.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      completed: false,
      createdAt: Date.now(),
      dueDate: taskDateInput?.value || "",
      dueTime: taskTimeInput?.value || ""
    });
    tasks.sort(compareTasks);
    saveTasks();
    renderTasks();
    taskForm.reset();
    taskInput?.focus();
    announce("Tarefa adicionada com sucesso.");
  });

  taskList?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = button.closest("[data-task-id]");
    const task = tasks.find((entry) => entry.id === item?.dataset.taskId);
    if (!task) return;

    if (button.dataset.action === "toggle") {
      task.completed = !task.completed;
      announce(task.completed ? "Tarefa concluída." : "Tarefa marcada como pendente.");
    } else if (button.dataset.action === "delete") {
      tasks = tasks.filter((entry) => entry.id !== task.id);
      announce("Tarefa excluída.");
    }

    saveTasks();
    renderTasks();
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((filterButton) => {
        const selected = filterButton === button;
        filterButton.classList.toggle("active", selected);
        filterButton.setAttribute("aria-pressed", String(selected));
      });
      renderTasks();
    });
  });

  // Carrega as tarefas e atualiza todos os indicadores ao abrir a página.
  tasks = loadTasks().sort(compareTasks);
  renderTasks();
})();