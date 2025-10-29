import { renderUsers } from './components/users.js';
import { renderTodos } from './components/todos.js';
import { renderPosts } from './components/posts.js';
import { renderComments } from './components/comments.js';
import { renderBreadcrumbs } from './components/breadcrumbs.js';

const routes = {
  'users': renderUsers,
  'users/todos': renderTodos,
  'users/posts': renderPosts,
  'users/posts/comments': renderComments
};

export function initRouter() {
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

export function renderRoute() {
  const hash = location.hash.slice(1) || 'users';
  const searchTerm = document.getElementById('search').value.trim();
  
  // Определяем базовый маршрут без query параметров
  const baseRoute = hash.split('?')[0];
  
  const renderFunction = routes[baseRoute] || renderUsers;
  renderFunction(searchTerm);
  renderBreadcrumbs();
}

// Функция для получения query параметров
export function getQueryParams() {
  const hash = location.hash.slice(1);
  const queryString = hash.split('?')[1];
  return new URLSearchParams(queryString || '');
}