import { renderRoute } from '../router.js';

export function initSearch() {
  const input = document.getElementById('search');
  input.addEventListener('input', () => renderRoute());
}
