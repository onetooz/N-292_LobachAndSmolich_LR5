import { initRouter } from './router.js';
import { initSearch } from './components/search.js';
import { renderBreadcrumbs } from './components/breadcrumbs.js';

window.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initRouter();
  renderBreadcrumbs();
});