/**
 * Создает текстовые поля со строками TLE от 1 до 3.
 * @param {Array} arrTleLines -массив TLE содержащий элементы типа DataTle.
 * @param {String} idElement - id DOM элемента для рендеринга.
 */
export function renderTleTextareas(arrTleLines, idElement) {
    const fragment = document.createDocumentFragment();
    const dataDocument = document.createElement('div');
    dataDocument.classList.add('data-doc');

    arrTleLines.forEach(tle => {
        const textarea1 = document.createElement('textarea');
        textarea1.textContent = tle.NAIM;
        dataDocument.appendChild(textarea1);

        const textarea2 = document.createElement('textarea');
        textarea2.textContent = tle.TLE_LINE1;
        dataDocument.appendChild(textarea2);

        const textarea3 = document.createElement('textarea');
        textarea3.textContent = tle.TLE_LINE2;
        dataDocument.appendChild(textarea3);
    });

    fragment.appendChild(dataDocument);
    document.getElementById(idElement).appendChild(fragment);
}