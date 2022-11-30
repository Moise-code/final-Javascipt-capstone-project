import { commentLink } from './APIs.js';

const comment = async (username, comment, id) => {
  const comments = new Comment(username, comment, id);
  const response = await fetch(commentLink, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(comments),
  });
  const data = response;
  return data;
};

export default comment;