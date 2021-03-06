"use strict";
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    // Вызываем модальное окно через время
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 60000); //! Создаём переменную, чтоб была возможность её сбросить

    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-03-08');
});