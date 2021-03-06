
// & ======================= Табы / Tabs =======================


function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    //! Классы - show, hide, fade

    // 1) Создать функцию скрывающую ненужные табы и оставить только активный.
    function hideTabsContent() {

        tabsContent.forEach(item => { //^ Удаляем с помощью добовления класса hide контент со страницы
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => { //^ Удаляем класс активности
            item.classList.remove(activeClass);
        });

    }
    hideTabsContent();

    // 2) Создать функцию для показывания табов
    function showTabContent(i = 0) { //^ i = 0 - Функция по умолчанию (чтоб вызывать функцию без аргумента)

        tabsContent[i].classList.add('show', 'fade'); //^ Добавляем с помощью добавления класса show контент на страницу
        tabsContent[i].classList.remove('hide'); //^ Удаляем класс hide

        tabs[i].classList.add(activeClass); //^ Добовляем класс активности
    }
    showTabContent();

    // 3) Использовав делегирование событий, назначить обработчик события клика
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) { //^ - Определенный клик в цель
            tabs.forEach((item, i) => {
                if (target == item) { //^ Если target(элемент на который нажали) будет совпадать с элементом который мы перебираем 
                    hideTabsContent(); //^ - Скрываем все элементы
                    showTabContent(i); //^ - Показываем таб который совпал с кликом пользователя
                }
            });
        }
    });
}

export default tabs; //^ Экспортируем функцию