import './main.css';
import display from './modules/displayfood.js';
import { mealApiObj } from './modules/APIs.js';

const itemCounter = document.querySelector('.item_count');

itemCounter.innerHTML = `Total Items: ${mealApiObj.length}`;

display();
