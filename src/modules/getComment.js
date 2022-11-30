import { commentLink } from './APIs.js';
import showComments from './showComment.js';

const commentCount = document.querySelector('.comment_count');

const getss = async (id) => {
  const response = await fetch(`${commentLink}?item_id=${id}`);
  const data = await response.json();
  if (response.ok) {
    showComments(data);
    commentCount.innerHTML = `Comments: ${data.length}`;
  }
};

export default getss;