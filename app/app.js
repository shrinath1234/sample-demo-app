const initialTasks = [
  { id: 1, title: 'Send the project update', category: 'Work', priority: 'High', completed: false },
  { id: 2, title: 'Pick up fresh flowers', category: 'Errands', priority: 'Normal', completed: false },
  { id: 3, title: 'Read a few pages', category: 'Personal', priority: 'Low', completed: true },
];

let tasks = initialTasks.map((task) => ({ ...task }));
let activeFilter = 'all';

const list = document.querySelector('[data-testid="task-list"]');
const form = document.querySelector('[data-testid="task-form"]');
const searchInput = document.querySelector('[data-testid="task-search"]');
const remainingCount = document.querySelector('[data-testid="remaining-count"]');
const emptyState = document.querySelector('[data-testid="empty-state"]');
const progressBar = document.querySelector('.progress-track span');

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    const matchesFilter = activeFilter === 'all'
      || (activeFilter === 'open' && !task.completed)
      || (activeFilter === 'completed' && task.completed);
    return matchesFilter && task.title.toLowerCase().includes(query);
  });

  list.replaceChildren();
  visibleTasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' is-complete' : ''}`;
    item.dataset.testid = 'task-item';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.className = 'task-toggle';
    toggle.checked = task.completed;
    toggle.setAttribute('aria-label', `${task.completed ? 'Mark to do' : 'Mark complete'}: ${task.title}`);
    toggle.addEventListener('change', () => {
      task.completed = toggle.checked;
      renderTasks();
    });

    const content = document.createElement('div');
    content.className = 'task-content';
    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;
    const meta = document.createElement('span');
    meta.className = 'task-meta';
    const priority = document.createElement('span');
    priority.className = `priority priority-${task.priority.toLowerCase()}`;
    priority.setAttribute('aria-hidden', 'true');
    const category = document.createElement('span');
    category.textContent = task.category;
    meta.append(priority, category, document.createTextNode(` · ${task.priority} priority`));
    content.append(title, meta);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete-button';
    remove.setAttribute('aria-label', `Delete ${task.title}`);
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      tasks = tasks.filter((itemToKeep) => itemToKeep.id !== task.id);
      renderTasks();
    });

    item.append(toggle, content, remove);
    list.append(item);
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  remainingCount.textContent = `${remaining} to do`;
  progressBar.style.width = `${tasks.length ? ((tasks.length - remaining) / tasks.length) * 100 : 0}%`;
  emptyState.hidden = visibleTasks.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  if (!title) return;

  tasks.unshift({
    id: Date.now(),
    title,
    category: formData.get('category').trim(),
    priority: formData.get('priority'),
    completed: false,
  });
  form.reset();
  activeFilter = 'all';
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  searchInput.value = '';
  renderTasks();
  document.querySelector('[data-testid="task-title"]').focus();
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle('is-active', selected);
      filterButton.setAttribute('aria-pressed', String(selected));
    });
    renderTasks();
  });
});

searchInput.addEventListener('input', renderTasks);
renderTasks();