export function renderBreadcrumbs() {
  const container = document.getElementById('breadcrumbs');
  const hash = location.hash.slice(1).split('?')[0]; 
  const parts = hash.split('/').filter(Boolean);
  
  let path = '';
  const breadcrumbs = parts.map((part, i) => {
    path += `#${part}`;
    const displayName = getDisplayName(part);
    return `<a href="${path}">${displayName}</a>`;
  }).join(' › ');
  
  container.innerHTML = breadcrumbs || '<a href="#users">Пользователи</a>';
}

function getDisplayName(part) {
  const names = {
    'users': 'Пользователи',
    'todos': 'Задачи',
    'posts': 'Посты',
    'comments': 'Комментарии'
  };
  return names[part] || part;
}