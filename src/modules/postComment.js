import { commentLink } from './APIs.js';

const comment = async (user, text, id) => {
  const comments = {
    username: user,
    comment: text,
    item_id: id,
  };
  // const commentLink = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vbuwtrOwhf86BMRTHUN/comments/';
  const response = await fetch(commentLink, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(comments),
  });
  const data = await response.text;
  return data;
};

export default comment;