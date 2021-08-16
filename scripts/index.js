import {Card} from './card.js';

const dataCard1 = {header: 'Заголовок 1', url: 'Ссылка', content: 'content'};
const sectionElement = document.querySelector('.elements');

const card1 = new Card(sectionElement, dataCard1);