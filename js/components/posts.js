import { getQueryParams } from '../router.js';

export async function renderPosts(searchTerm = '') {
  const params = getQueryParams();
  const userId = params.get('userId');
  
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  let filteredPosts = posts;
  let userInfo = '';
  
  if (userId) {
    filteredPosts = posts.filter(post => post.userId == userId);
    
    const allUsers = await fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json());
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    const user = [...allUsers, ...localUsers].find(u => u.id == userId || u.id === userId);
    userInfo = user ? ` пользователя ${user.name}` : '';
  }

  const filtered = filteredPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const html = filtered.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <small><a href="#users/posts/comments?postId=${post.id}">Комментарии</a></small>
    </div>
  `).join('');

  const title = userId ? `Посты${userInfo}` : 'Все посты пользователей';
  
  document.getElementById('app').innerHTML = `
    <h2>${title}</h2>
    ${userId ? `<p><a href="#users">← Назад к пользователям</a></p>` : ''}
    ${html || '<p>Посты не найдены</p>'}
  `;
}