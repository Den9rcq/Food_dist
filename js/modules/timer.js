
// & ======================= Timer =======================


function timer(selector, deadline) {

    // 1) Создать функцию которая будет определять разницу между deadline и нашим веременем
    function getTimeRemaining(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date()), //^ Разница между входным значением и текущем временем
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //^ Получаем дни
            hours = Math.floor((t / (1000 * 60 * 60)) % 24), //^ Получаем часы, откидываем остаток по модулю
            minutes = Math.floor((t / (1000 * 60)) % 60), //^ Получаем минуты, откидываем остаток по модулю
            seconds = Math.floor((t / 1000) % 60); //^ Получаем секунды, откидываем остаток по модулю

        return {  //^ Возвращаем объект из функции
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }



    // 2) Написать функцию, которая будет устанавливать таймер на страницу
    function setClock(selector, endtime) {
        // Получить таймер со страницы, а так же дни, часы, минуты, секунды
        const timer = document.querySelector(selector), //^ Получаем селектор со страницы
            days = timer.querySelector('#days'), //^ Получаем селектор дни со страницы
            hours = timer.querySelector('#hours'), //^ Получаем селектор часы со страницы
            minutes = timer.querySelector('#minutes'), //^ Получаем селектор минуты со страницы
            seconds = timer.querySelector('#seconds'), //^ Получаем селектор секунды со страницы
            timeInterval = setInterval(updateClock, 1000); //^ Вызываем интервал у функции в 1с

        updateClock(); //^ Убираем задержку включения функции после обновления страницы

        // Создать функцию, которая будет обновлять таймер
        function updateClock() {
            // Расчитать время
            const t = getTimeRemaining(endtime); //^ Создаём переменную, с объектом из функции getTimeRemaining();

            days.textContent = getZero(t.days); //^ Помещаем ДНИ на страницу и добавляем функцию getZero
            hours.textContent = getZero(t.hours); //^ Помещаем ЧАСЫ на страницу и добавляем функцию getZero
            minutes.textContent = getZero(t.minutes); //^ Помещаем МИНУТЫ на страницу и добавляем функцию getZero
            seconds.textContent = getZero(t.seconds); //^ Помещаем СЕКУНДЫ на страницу и добавляем функцию getZero

            // Оставновить интервал
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // Создать функцию помощник, чтоб были двоичные цифры 01, 02, 03 и т.д
    function getZero(num) {
        if (num <= 9 && num >= 0) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //^ Запуск функции, в аргументы помещяем селектор и окончание цикла
    setClock(selector, deadline);
}

export default timer;