import nutrients from './food.js';

const foodApi = 'https://themealdb.com/api/json/v1/1/search.php?s';

const mealApiObj = [];

nutrients.forEach((food) => {
  mealApiObj.push(`${foodApi}=${food}`);
});

export default mealApiObj;
