import mealApiObj from './APIs.js';

const main = document.querySelector('main');
const popup = document.querySelector('#showComments');

/* eslint-disable */
export const display = async () => {
  /* eslint-enable */
  // let markup = '';

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
                <button class="button">Comments</button>
                <button class="button">Reservations</button>
            </section>`;
        const button = document.querySelector('.button');
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
        });
      });
    } catch (err) {
      main.innerHTML = 'err';
    }
  });
};