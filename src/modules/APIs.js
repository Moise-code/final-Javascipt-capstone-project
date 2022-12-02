import nutrients from './food.js';

const foodApi = 'https://themealdb.com/api/json/v1/1/search.php?s';

const commentLink = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HJ3nJrQxKFWMKnh6RtwV/comments';
const likeUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HJ3nJrQxKFWMKnh6RtwV/likes';
const mealApiObj = [];

nutrients.forEach((food) => {
  mealApiObj.push(`${foodApi}=${food}`);
});

export { likeUrl, mealApiObj, commentLink };

