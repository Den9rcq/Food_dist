// Функция отправки данных на сервер
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST", //^ Устанавливаем метод
        headers: { //^ Указываем загаловки
            'Content-type': 'application/json'
        },
        body: data, //^ Отправляем данные на сервер
    });

    return await res.json();
};

// Функция получения данных с сервера
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); //^ throw - Выкидывает ошибку
    } else {
        return await res.json(); //^ Возвращаем объект полученный с сервера
    }
};


export { postData, getResource };