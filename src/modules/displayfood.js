import { mealApiObj, commentLink, likeUrl } from './APIs.js';
import Likes from './likes.js';

import Comment from './comment.js';

const main = document.querySelector('.main');

const popup = document.querySelector('#modalDisplay');

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
        const btn = document.createElement('button');
        const btn2 = document.createElement('button');
        const twoDiv = document.createElement('div');
        const threeDiv = document.createElement('div');
        const likeIcon = document.createElement('i');
        const likeCounts = document.createElement('p');

        section.innerHTML = `
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
            `;
        twoDiv.innerHTML = `
        <p class="meal">${item.strMeal}</p>
        `;
        btn.innerText = 'Comments';
        btn2.innerText = 'Reservations';
        section.classList = 'food_items flex';
        div.classList = 'column flex';
        btn.classList = 'button';
        btn2.classList = 'button';
        twoDiv.classList = 'flex actions_name';
        likeIcon.classList = 'fa-solid fa-heart like';
        likeCounts.classList = 'like_count';
        likeCounts.innerText = '0';
        threeDiv.append(likeIcon, likeCounts);
        twoDiv.append(threeDiv);
        div.append(btn, btn2);
        section.append(twoDiv, div);
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
            <div class="popIt">
              <div class ="flex pop column">
               <span class="close-button">&times;</span>
               <div class="popup_image">
                  <img class="pop_image" src="${item.strMealThumb}" alt="asdf">
                </div>
                <p class="pop_meal">Name: ${item.strMeal}</p> 
                <p> Location: ${item.strArea}</p>
                <p class="instructions">${item.strInstructions}<p>
                <p> Category: ${item.strCategory}</p>
                <div class="comment_count">
                </div>
                <button class="view_more">Refresh Comments</button>
                <div class="pop_comment">
                
                </div>
                <div id ="commentList"></div>
                  <h3 class="add-comm">Add a comment</h3>
                <div class="inputDiv">
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
          const commentCount = document.querySelector('.comment_count');
          const commentPop = document.querySelector('.pop_comment');

          const comment = async (username, comment) => {
            const comments = new Comment(username, comment, item.idMeal);
            const response = await fetch(commentLink, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(comments) });
            const data = response;
            return data;
          };
          const bisplay = async (gameData) => {
            commentPop.innerHTML = '';
            const displayScores = gameData.map((list) => `<div class="new_list">
                                                              <p> ${list.creation_date} </p>
                                                              <p> ${list.username} </p>
                                                              <p> ${list.comment} </p>
                                                            </div>`).join('');
            commentPop.innerHTML = displayScores;
          };

          const getss = async (id) => {
            const response = await fetch(`${commentLink}?item_id=${id}`);
            const data = await response.json();
            if (response.ok) {
              bisplay(data);
              commentCount.innerHTML = `Comments: ${data.length}`;
            }
          };

          const name = document.querySelector('#name');
          const text = document.querySelector('#text');
          const clearInput = () => {
            name.value = '';
            text.value = '';
          };

          const form = document.querySelector('.form');

          form.addEventListener('submit', (e) => {
            e.preventDefault();
            const namess = document.querySelector('#name').value;
            const textss = document.querySelector('#text').value;
            comment(namess, textss);
            getss(item.idMeal);
            clearInput();
            getss(item.idMeal);
          });

          const close = document.querySelector('.close-button');
          close.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
          });
          getss(item.idMeal);
          const viewMore = document.querySelector('.view_more');
          viewMore.addEventListener('click', () => {
            getss(item.idMeal);
          });
        });
      });
    } catch (err) {
      main.innerHTML = 'err';
    }
  });
};

export default display;