import { mealApiObj, commentLink } from './APIs.js';

const main = document.querySelector('main');
const popup = document.querySelector('#showComments');

export const display = async () => {
  mealApiObj.forEach(async (item) => {
    try {
      const response = await fetch(item);
      const data = await response.json();
      if (!response.ok) {
        main.innerHTML = 'Server Down';
      }

      data.meals.forEach((item) => {
        main.innerHTML += `
            <section class="food_items flex">
              <div class="">
                <span class="" id=${item.idMeal}>
                </span>
              </div>
              <div class="meal_image">
                <img class="meal_image" src="${item.strMealThumb}" alt="asdf">
              </div>
              <div class="flex actions_name">
                <p class="meal">${item.strMeal}</p>
                <div>
                  <i class="fa-solid fa-heart"></i>
                  <span>
                    <p>2 likes</p>
                  </span>
                </div>
              </div>
              <div class="column flex">
                <button class="button" id="btn">Comments</button>
                <button class="button">Reservations</button>
            </section>`;

        const button = document.getElementById('btn');
        button.addEventListener('click', () => {
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

          const commentCount = document.querySelector('.comment_count');
          const commentShow = document.querySelector('.pop_comment');

          const comment = async (username, comment) => {
            const comments = [];
            comments.username = username;
            comments.comment = comment;
            comments.item_id = item.idMeal;
            const response = await fetch(commentLink, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(comments) });
            const data = response;
            return data;
          };
          const showComments = async (data) => {
            commentShow.innerHTML = '';
            const displayScores = data.map((list) => `<div class="new_list">

            <p> ${list.creation_date} </p>
                                                              
            <p> ${list.username} </p>
                                                              
            <p> ${list.comment} </p>
                                                            
            </div>`).join('');
            commentShow.innerHTML = displayScores;
          };

          const getss = async (id) => {
            const response = await fetch(`${commentLink}?item_id=${id}`);
            const data = await response.json();
            if (response.ok) {
              showComments(data);
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
            clearInput();
            getss(item.idMeal);
          });
          form.addEventListener('focusout', () => {
            getss(item.idMeal);
          });
          window.addEventListener('mouseover', () => {
            getss(item.idMeal);
          });
          const close = document.querySelector('.close-popup');
          close.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
          });
          getss(item.idMeal);
          const viewMore = document.querySelector('.refresh_comment');
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