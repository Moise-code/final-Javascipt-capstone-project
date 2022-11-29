import { nutrients } from './food.js';

const mealApi = 'www.themealdb.com/api/json/v1/1/search.php?s';

const apiId = 'PMbretgdfoefugbh';
const commentLink = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}/comments`;

const likeLink = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}/likes`;

const mealApiObj = [];

nutrients.forEach((meal) => {
  mealApiObj.push(`${mealApi}=${meal}`);
});

export default { mealApiObj, commentLink, likeLink };