import { likeUrl, mealApiObj } from './APIs.js';
import Likes from './likes.js';
import getss from './getComment.js';
import comment from './postComment.js';

const main = document.querySelector('main');
const popup = document.querySelector('#showComments');
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

        btn.addEventListener('click', () => {
          const pop = () => {
            popup.innerHTML = `
            <div class="container">
              <div class ="flex pop column">
               <span class="close-popup">&times;</span>
               <div class="image_container">
                  <img class="popImage" src="${item.strMealThumb}" alt="asdf">
                </div>
                <p class="popMeal">Name: ${item.strMeal}</p> 
                <p> Location: ${item.strArea}</p>
                <p> Category: ${item.strCategory}</p>
                <p class="instructions">${item.strInstructions}<p>
                <div class="comment_count">
                </div>
                <button class="refresh_comment">Refresh Comments</button>
                <div class="pop_comment">
                
                </div>
                <div id ="commentContainer"></div>
                  <h3 class="add-comment">Add a comment</h3>
                <div class="input_comment">
                  <form class="form">
                    <input id="name"  type="text" name="user" required placeholder="Your Name"><br>
                    <textarea id="text" type="text" rows=6 name="text" required placeholder="Your insight"></textarea><br>
                    <div>
                    <button class="submit-btn" type="submit">Comment</button>
                  </div>
                  </form>
                </div>
              </div>
              </div>`;
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          };
          pop();

          const name = document.querySelector('#name');
          const text = document.querySelector('#text');
          const clearInput = () => {
            name.value = '';
            text.value = '';
          };
          getss(item.idMeal);
          const form = document.querySelector('.form');

          form.addEventListener('submit', (e) => {
            e.preventDefault();
            const namess = document.querySelector('#name').value;
            const textss = document.querySelector('#text').value;
            comment(namess, textss, item.idMeal);
            clearInput();
            getss(item.idMeal);
          });

          const close = document.querySelector('.close-popup');
          close.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
          });

          const refreshComments = document.querySelector('.refresh_comment');
          refreshComments.addEventListener('click', () => {
            getss(item.idMeal);
          });
        });
      });
    } catch (err) {
      main.innerHTML = 'err';
    }
  });
};

export default { display };