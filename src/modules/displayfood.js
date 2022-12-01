import { likeUrl, mealApiObj } from './APIs.js';
import Likes from './likes.js';

const main = document.querySelector('main');

const display = async () => {
  mealApiObj.forEach(async (item) => {
    try {
      const response = await fetch(item);
      const data = await response.json();
      if (!response.ok) {
        main.innerHTML = 'Server Down';
      }

      data.meals.forEach((item) => {
        const section = document.createElement('section');
        const div = document.createElement('div');
        const buttons = document.createElement('div');
        const btn = document.createElement('button');
        const btn2 = document.createElement('button');
        const threeDiv = document.createElement('div');
        const likeIcon = document.createElement('i');
        const likeCounts = document.createElement('p');

        section.innerHTML += `
              <div class="">
                <span class="" id=${item.idMeal}>
                </span>
              </div>
              <div class="meal_image-cover">
                <img class="meal_image" src="${item.strMealThumb}" alt="asdf">
                <div class = "middle">
                <div class = "text"> This is the amazing meal you have ever tasted</div>
                </div>
              </div>
            
               <p class="meal">${item.strMeal}</p>
              `;

        btn.innerText = 'Comments';
        btn2.innerText = 'Reservations';
        section.classList = 'food_items flex';
        buttons.classList = 'buttons';
        div.classList = 'column flex';
        btn.classList = 'button';
        btn2.classList = 'button';
        threeDiv.classList = 'flex actions_name';
        likeIcon.classList = 'fa-solid fa-heart like';
        likeCounts.classList = 'like_count';
        likeCounts.innerText = '0';
        threeDiv.append(likeIcon, likeCounts);
        buttons.append(btn, btn2);
        div.append(buttons);
        section.append(threeDiv, div);
        main.append(section);

        const kisplay = async (gameData) => {
          likeCounts.innerHTML = '';
          const displayScores = gameData.map((list) => `<div class="new_list">
                                                                  <p> ${list.likes} </p>
                                                                  
                                                                </div>`).join('');
          likeCounts.innerHTML = displayScores;
        };
        const lik = async () => {
          const like = new Likes(item.idMeal);
          const response = await fetch(likeUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(like) });
          const data = response;
          return data;
        };

        const get = async (id) => {
          const response = await fetch(`${likeUrl}?item_id=${id}`);
          const data = await response.json(id);
          const idss = data.filter((ids) => ids.item_id === id);
          if (response.ok) {
            kisplay(idss);
          }
        };

        get(item.idMeal);
        threeDiv.addEventListener('click', () => {
          lik();
          get(item.idMeal);
        });
      });
    } catch (err) {
      main.innerHTML = 'err';
    }
  });
};
export default display;