import { nutrients } from './food.js';

const commentApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const commentkey = 'jUTHHFhjhjmbJGYTMBJgyj';
const commentUrl = `${commentApi}/apps/:${commentkey}/comments/`;

const likeapi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const likekey = 'ahggGFtfjsuJHUTHhfyFHJ';
const likeurl = `${likeapi}/apps/:${likekey}/likes/`;

const mealApi = 'www.themealdb.com/api/json/v1/1/search.php?s';

const mealApiObj = [];

nutrients.forEach((meal) => {
  mealApiObj.push(`${mealApi}=${meal}`);
});

export { commentUrl, likeurl, mealApiObj };