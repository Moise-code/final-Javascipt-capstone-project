import nutrients from './food.js';

const foodApi = 'https://themealdb.com/api/json/v1/1/search.php?s';

const apiId = 'HJ3nJrQxKFWMKnh6RtwV';
const commentLink = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}/comments`;

const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}/likes`;
const mealApiObj = [];

nutrients.forEach((food) => {
  mealApiObj.push(`${foodApi}=${food}`);
});

export { mealApiObj, commentLink, likeUrl };
