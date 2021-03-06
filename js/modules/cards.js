// & ======================= Классы для карточек =======================

import { getResource } from '../services/servises';

function cards() {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH(); //^ Вызываем метод для конвертации, который запишет данные в this.price
        }

        // Метод конвертации валют из $ в грн
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Рендерим код на странице
        render() {
            const element = document.createElement('div'); //^ Создаём div для добавления вёрстки

            // Условие для автоматической установки класса element
            if (this.classes.length === 0) {
                this.element = 'menu__item'; //^ Создаём класс на будущее
                element.classList.add(this.element); //^ Добавляем автоматический класс элементу
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            // Формирование вёрстки для карточки
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
            this.parent.append(element); //^ Добавляем верстку в родителя
        }
    }



    // Создание карточки на основании данных с сервера
    // * С использованием классов
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });



    // * Ручной метод создание каточки, без использования сервера
    // new MenuCard( //^ Создаём карточку
    //     "img/tabs/vegy.jpg", //^ src
    //     "vegy", //^ alt
    //     `Меню "Фитнес"`, //^ title
    //     `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
    //     овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
    //     ценой и высоким качеством!`, //^ descr
    //     9, //^ price в $
    //     '.menu .container', //^ parentSelector
    // ).render(); //^ Применяем метод для добавления карточки на страницу




    // * Без использования классов
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

}

export default cards;