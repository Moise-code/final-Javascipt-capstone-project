import { nutrients } from './food.js';

const mealApi = 'www.themealdb.com/api/json/v1/1/search.php?s';

const mealApiObj = [];

nutrients.forEach((meal) => {
  mealApiObj.push(`${mealApi}=${meal}`);
});

export default { mealApiObj };

