// & ======================= Modal / Модальное окно =======================

// Создаём функцию по открытию модального окна
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show'); //^ Показываем модальное окно
    modal.classList.remove('hide'); //^ Удаляем класс
    //* modal.classList.toggle('show');  Альтернативыный вариант
    document.body.style.overflow = 'hidden'; //^ Запрящает скролить страницу при открытом модальном окне

    if (modalTimerId) {
        clearInterval(modalTimerId); //^ Убирает автоматическое открытие окна
    }
}

// Создаём функцию по закрытию модального окна
// ! Если участок кода повторяется мы всегда создаём функцию 
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide'); //^ Закрываем модальное окно
    modal.classList.remove('show'); //^ Удаляем класс
    //* modal.classList.toggle('show');  Алтернативный вариант
    document.body.style.overflow = ''; //^ Устанавливает overflow в дефолтное состояние(которое было)
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => { //^ Перебираем все кнопки
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //^ Вешаем обработчик событий при клике
        //!                           () => Оборачивает openModal чтоб она не вызывалась сразу после загрузки страницы
    });

    // Закрываем модальное окно кликом на подложку
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //^ Без условия нажатие на .modal__dialog так же приведёт к закрытию
            closeModal(modalSelector);     //^ e.target.getAttribute() == '' - Делегирование. Новосозданные элементы на странице будут закрывать окно
        }
    });

    // Закрываем модальное окно с помощью нажатия клавиши Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { //^ contains - проверяет если данный класс
            closeModal(modalSelector);
        }
    });


    // При достижении конца сайта, открываем модальное окно
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //^ Удаляем обработчик событий после первого раза
        }
    }
    window.addEventListener('scroll', showModalByScroll); //^ Открываем окно при достижении конца сайта

}

export default modal;
export { closeModal, openModal };