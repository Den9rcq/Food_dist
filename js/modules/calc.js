// & ======================= Calc / Калькулятор ======================= 

function calc() {

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    // Установка и запись данных в Local Storage
    if (localStorage.getItem('sex')) {
        sex = localStorage.sex;
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.ratio;
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    // Добавление классов активности с учётом данных в Local Storage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            // Изменение класса активности
            elem.classList.remove(activeClass); //^ Удаляем класс активности

            if (elem.getAttribute('id') === localStorage.getItem('sex')) { //^ Если у элемента атрибут id совпадает с данными в Local Storage
                elem.classList.add(activeClass); //^ Добавляем класс активности
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { //^ Если у элемента атрибуд data-ratio совпадает с данными в Local Storage
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // Функция общего расчёта
    function calcTotal() {
        // Проверка наличия данных в перемменых
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Нет данных'; //^ Замена контента
            return; //^ Остановка функции
        }

        // Рассчёты для Женщин и мужчин
        if (sex === 'female') {
            result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio));
        } else {
            result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));
        }
    }
    calcTotal(); //^ Запускаем функцию, для замены контента

    // Получение статической информации со страницы и изменение класса активности (Blocks)
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Получение данных при клике на блок
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); //^ Записываем данные из атрибута (см. вёрстку)
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id'); //^ Записываем данные из id (см. вёрстку)
                    localStorage.setItem('sex', sex);
                }

                // Изменение класса активности
                elements.forEach(elem => { //^ Удаляем у всех элементов класс активности
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass); //^ Добавляем класс активности к цели

                calcTotal(); //^ Запускаем функцию при каждом переключении блока
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    // Получение динамической информации со страницы (Inputs)
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // Оповещение пользователя, когда он вводит некорректные данные
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }

            switch (input.getAttribute('id')) { //^ Если у input атрибут, это уникальный индификатор
                case 'height': //^ id="height"
                    height = +input.value; //^ Записываем данные из поля ввода в переменную
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal(); //^ Запускаем функцию при каждом изменении инпута
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}
export default calc;