import { nutrients } from './food.js';

const foodApi = 'https://themealdb.com/api/json/v1/1/search.php?s';

const foodApiObj = [];

nutrients.forEach((food) => {
  foodApiObj.push(`${foodApi}=${food}`);
});

export {foodApiObj };