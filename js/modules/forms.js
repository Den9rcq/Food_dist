// & ======================= Forms / Формы =======================

import { closeModal, openModal } from './modal';
import { postData } from '../services/servises';

function forms(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector),

        message = {
            loading: 'icons/spinner.svg', //^ Прописывем путь к spinner.svg
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
        };

    // Перебрать формы 
    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        // Событие отправки
        form.addEventListener('submit', (e) => { //^ Навешиваем обработчик событий
            e.preventDefault(); //^ Отменяем стандартное поведение браузера

            const statusMessage = document.createElement('img'); //^ Создаём элемент img
            statusMessage.src = message.loading; //^ Создаём атрибут src
            // form.append(statusMessage); //^ Помещаем элемент на страницу в форму
            form.insertAdjacentElement('afterend', statusMessage); //^ Помещаем элемент на страницу после формы
            //^ Добавдяем стили
            statusMessage.style.cssText = `
                margin: 0 auto;
                display: block;
            `;
            // & fetch - Запрос на сервер (Актуальный метод)

            // ! В вёрстке должен быть атрибут name=""
            const formData = new FormData(form); //^ Создаём переменную, на основе данных собранных с формы - FromData();

            // ! Нужно для JSON
            // * Старый способ
            // const object = {};
            // formData.forEach((value, key) => { //^ Перебираем данные и добавляем их в объект
            //     object[key] = value;
            // });

            // * Актуальный способ
            // ^         <- JSON     <- Класический объект  <- Массив с массивами <- Данные с формы (объект)
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json) //^ Отправка данных на сервер
                // .then(data => data.text()) //^ Получаем от сервера данные в текстовом формате
                .then(data => { //^ Обрабатываем ПОЛОЖИТЕЛЬНЫЙ исход запроса
                    console.log(data);
                    showThanksModal(message.success); //^ Показываем окно при успехе
                    statusMessage.remove(); //^ Удаляет спинер
                })
                .catch(() => { //^ Обрабатываем ОТРИЦАТЕЛЬНЫЙ исход запроса
                    showThanksModal(message.failure); //^ Показываем окно ошибки
                })
                .finally(() => {
                    form.reset(); //^ Очищаем форму
                });


            /*() // & XMLHttpRequest - Запрос на сервер(Устаревший метод) 
            const request = new XMLHttpRequest(); //^ Cоздаём переменную на основе объекта XMLHttpRequest
            request.open('POST', 'server.php'); //^ Настраиваем отправку запроса
        
            // ! Не нужен для php
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //^ Заголовок нужен для JSON
        
            // ! В вёрстке должен быть атрибут name=""
            const formData = new FormData(form); //^ Создаём переменную, на основе FromData();
        
            // ! Нужно для JSON
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
        
            const json = JSON.stringify(object);
            request.send(json);
        
        
            // request.send(formData); //^ Отправляем запрос
        
            request.addEventListener('load', () => { //^ Обработчик событий сработает, когда запрос загрузится
                if (request.status === 200) { //^ Проверяем код ответа
                    console.log(request.response);
                    showThanksModal(message.success); //^ Показываем окно при успехе
                    form.reset(); //^ Очищаем форму
                    statusMessage.remove(); //^ Удаляет спинер
                } else {
                    showThanksModal(message.failure); //^ Показываем окно ошибки
                }
            }); */



        });

        //* Добавляем блоки с оповещением пользователя
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.add('hide'); //^ Скрываем предыдущий контент с помощью класса 'hide'
            openModal('.modal', modalTimerId); //^ Открываем модальное окно с помощью функции

            const thanksModal = document.createElement('div'); //^ Создаём новый элемент
            thanksModal.classList.add('modal__dialog'); //^ Добавляем классы
            thanksModal.innerHTML = ` //^ Формируем вёрстку
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                <div>    
            `;
            document.querySelector('.modal').append(thanksModal); //^ Помещаем элемент на страницу

            // Убираем окно и возвращем контент и закрываем модальное окно
            setTimeout(() => {
                thanksModal.remove(); //^ Убираем окно
                prevModalDialog.classList.remove('hide'); //^ Удаляем класс скрытия с формы
                prevModalDialog.classList.add('show'); //^ Показываем окно формы
                closeModal('.modal'); //^ Закрываем модальное окно
            }, 4000);
        }
    }

}
export default forms;