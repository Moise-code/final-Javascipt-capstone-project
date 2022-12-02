import './main.css';
import display from './modules/displayfood.js';
import Showsection from './modules/spa.js';
import { mealApiObj } from './modules/APIs.js';

const itemCounter = document.querySelector('.item_count');

itemCounter.innerHTML = `Total Items: ${mealApiObj.length + 1}`;

Showsection.showList(); // switch to list section as default.
document.getElementById('home-nav').addEventListener('click', () => {
  Showsection.showList(); // switch to list section.
});
document.getElementById('contact-nav').addEventListener('click', () => {
  Showsection.showcontact(); // switch to contact section.
});
document.getElementById('about-nav').addEventListener('click', () => {
  Showsection.showabout(); // switch about section.
});

display();
