import { getQueryParams } from '../router.js';

export async function renderComments(searchTerm = '') {
  const params = getQueryParams();
  const postId = params.get('postId');
  
  const res = await fetch('https://jsonplaceholder.typicode.com/comments');
  const comments = await res.json();

  let filteredComments = comments;
  let postInfo = '';
  
  if (postId) {
    filteredComments = comments.filter(comment => comment.postId == postId);
    
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());
    const post = posts.find(p => p.id == postId);
    postInfo = post ? ` к посту "${post.title.substring(0, 50)}${post.title.length > 50 ? '...' : ''}"` : '';
  }

  const filtered = filteredComments.filter(comment =>
    comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const html = filtered.map(comment => `
    <div class="comment">
      <strong>${comment.name}</strong>
      <p>${comment.body}</p>
      <small>Email: ${comment.email}</small>
    </div>
  `).join('');

  const title = postId ? `Комментарии${postInfo}` : 'Все комментарии к постам';
  
  document.getElementById('app').innerHTML = `
    <h2>${title}</h2>
    ${postId ? `<p><a href="#users/posts">← Назад к постам</a></p>` : ''}
    ${html || '<p>Комментарии не найдены</p>'}
  `;
}