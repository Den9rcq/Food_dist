// & ======================= Слайдер / Slider =======================

function slider({ container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field }) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        widthWrapper = window.getComputedStyle(slidesWrapper).width; //^ Получаем ширину окна

    let slideIndex = 1,
        offset = 0;

    // * Карусель
    // Отображение изначального счётчика на странице
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `0${slideIndex}`;
    }

    slidesField.style.width = 100 * slides.length + '%'; //^ Устанавливаем блоку ширину
    slidesField.style.display = 'flex'; //^ Выстраиваем блок по вертикали
    slidesField.style.transition = '0.5s all'; //^ Добавляем анимацию

    slidesWrapper.style.overflow = 'hidden'; //^ Скрываем контент вне wrapper

    slides.forEach(slide => { //^ Устанавливаем фиксированную ширину для слайда
        slide.style.width = widthWrapper;
    });

    // Dots / Навигация слайдера
    slider.style.position = 'relative'; //^ Добавляем для всего слайдера css стиль

    const indicators = document.createElement('ol'), //^ Создаём оболочку для точек
        dots = []; //^ Создаём массив для пуша точек
    indicators.classList.add('carousel-indicators'); //^ Добавляем класс из css
    slider.append(indicators); //^ Помещаем indicators в slider

    // Создаём точки
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); //^ Добавляем атрибут для li data-slide-to="i"
        dot.classList.add('dot');
        indicators.append(dot);
        dots.push(dot); //^ Пушим точки в новый массив для взаимодействия дальше по коду (Можно через document.querySelectorAll('.dot'))

        // Устанавливаем первой точке "класс активности"
        if (i == 0) {
            dot.style.opacity = 1;
        }
    }


    // Отображание текущего счётчика
    function showCurrentCounter() {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // Изменение "Класса активности" у dot
    function changeActivityClassDot() {
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    }

    // Удаление из строки всего кроме чисел
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        // Перелистованние слайдера и его цикличность
        //^ +widthWrapper.slice(0, widthWrapper.length - 2) === 650
        if (offset == deleteNotDigits(widthWrapper) * (slides.length - 1)) { //^ 1950
            offset = 0;
        } else {
            offset += deleteNotDigits(widthWrapper); //^ offset += 650;
        }

        slidesField.style.transform = `translateX(-${offset}px)`; //^ Устанавливаем значение

        // Изменение счётчика слайдера и его цикличность
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }


        showCurrentCounter();
        changeActivityClassDot();
    });

    prev.addEventListener('click', () => {
        // Перелистование слайдера и его цикличность
        if (offset == 0) {
            offset = deleteNotDigits(widthWrapper) * (slides.length - 1); //^ 1950
        } else {
            offset -= deleteNotDigits(widthWrapper); //^ offset -= 650;
        }
        slidesField.style.transform = `translateX(-${offset}px)`; //^ Устанавливаем значение

        // Изменение счётчика слайдера и его цикличность
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        showCurrentCounter();
        changeActivityClassDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); //^ Получаем атрибут в переменную //(1, 2, n);
            slideIndex = slideTo; //^ Устанавливаем slideIndex в позицию slideTo

            // Перемещение к слайду
            offset = deleteNotDigits(widthWrapper) * (slideTo - 1); //^ Вычесляем смещение
            slidesField.style.transform = `translateX(-${offset}px)`; //^ Производим смещение слайдера

            showCurrentCounter();
            changeActivityClassDot();
        });
    });




    // * Простой слайдер
    //     showSlides(slideIndex);
    //     // Условие для показа 0 перед однозначным символом
    //     if (slides.length < 10) {
    //         total.textContent = `0${slides.length}`;
    //     } else {
    //         total.textContent = slides.length;
    //     }

    //     function showSlides(n) {
    //         // Условие для закольцованности слайдера
    //         if (n > slides.length) {
    //             slideIndex = 1;
    //         }
    //         if (n < 1) {
    //             slideIndex = slides.length;
    //         }

    //         // Условие для показа 0 перед однозначным символом
    //         if (slideIndex < 10) {
    //             current.textContent = `0${slideIndex}`;
    //         } else {
    //             current.textContent = slideIndex;
    //         }

    //         // Скрываем все слайды
    //         slides.forEach((item) => {
    //             item.classList.remove('show', 'fade');
    //             item.classList.add('hide');
    //         });
    //         // Показываем нужный слайд
    //         slides[slideIndex - 1].classList.remove('hide');
    //         slides[slideIndex - 1].classList.add('show', 'fade');
    //     }

    //     // Создаём функцию помощник plusSlides()
    //     function plusSlides(n) {
    //         showSlides(slideIndex += n);
    //     }
    //     // Назначаем обработчики событий
    //     next.addEventListener('click', () => {
    //         plusSlides(1);
    //     });
    //     prev.addEventListener('click', () => {
    //         plusSlides(-1);
    //     });
}
export default slider;