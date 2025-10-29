import { getUsers, getLocalUsers, deleteUser } from '../api.js';
import { renderRoute } from '../router.js';

export async function renderUsers(searchTerm = '') {
  const apiUsers = await getUsers();
  const localUsers = getLocalUsers();
  const allUsers = [...apiUsers, ...localUsers];

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const html = filtered.map(u => `
    <div class="user" data-user-id="${u.id}">
      <strong>${u.name}</strong> (${u.email})
      ${u.local ? `
        <button class="delete-user-btn" data-user-id="${u.id}">Удалить</button>
        <button class="add-todo-btn" data-user-id="${u.id}">Добавить задачу</button>
      ` : ''}
      <div>
        <a href="#users/todos?userId=${u.id}">Задачи</a> |
        <a href="#users/posts?userId=${u.id}">Посты</a>
      </div>
    </div>
  `).join('');

  document.getElementById('app').innerHTML = `
    <h2>Пользователи</h2>
    <form id="addUserForm">
      <input name="name" placeholder="Имя" required />
      <input name="email" placeholder="Email" required />
      <button type="submit">Добавить пользователя</button>
    </form>
    <div id="users-list">${html}</div>
    <div style="margin-top: 20px;">
      <a href="#users/todos">Посмотреть все задачи</a> | 
      <a href="#users/posts">Посмотреть все посты</a>
    </div>
  `;

  // Обработчик формы
  document.getElementById('addUserForm').onsubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    const user = {
      id: Date.now().toString(),
      name: form.name.value,
      email: form.email.value,
      local: true
    };
    const users = getLocalUsers();
    users.push(user);
    localStorage.setItem('localUsers', JSON.stringify(users));
    renderRoute();
  };

  document.getElementById('users-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-user-btn')) {
      const userId = e.target.getAttribute('data-user-id');
      if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        deleteUser(userId);
      }
    }
    
    if (e.target.classList.contains('add-todo-btn')) {
      const userId = e.target.getAttribute('data-user-id');
      addTodoToUser(userId);
    }
  });
}

function addTodoToUser(userId) {
  const title = prompt('Введите задачу:');
  if (title) {
    const userTodos = JSON.parse(localStorage.getItem('userTodos') || '{}');
    if (!userTodos[userId]) userTodos[userId] = [];
    
    userTodos[userId].push({
      id: Date.now().toString(),
      title: title,
      completed: false,
      userId: userId,
      local: true
    });
    
    localStorage.setItem('userTodos', JSON.stringify(userTodos));
    alert('Задача добавлена!');
    renderRoute();
  }
}