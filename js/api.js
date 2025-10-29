export async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return await res.json();
}

export function getLocalUsers() {
  return JSON.parse(localStorage.getItem('localUsers') || '[]');
}

export function deleteUser(id) {
  const users = getLocalUsers().filter(u => u.id !== id);
  localStorage.setItem('localUsers', JSON.stringify(users));
  const userTodos = JSON.parse(localStorage.getItem('userTodos') || '{}');
  delete userTodos[id];
  localStorage.setItem('userTodos', JSON.stringify(userTodos));
  location.reload();
}

export function getUserTodos(userId) {
  const userTodos = JSON.parse(localStorage.getItem('userTodos') || '{}');
  return userTodos[userId] || [];
}