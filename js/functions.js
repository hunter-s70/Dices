/**
 * Created by hunter_s70 on 17.06.2017.
 */
$$ = {};

// factory add listeners to selectors list
$$.addListeners = (elements, callback) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', callback);
    }
};

$$.appendEl = (elCreate = 'div', elParent, elClass = '', elContent = '') => {
    if (!elParent) return false;

    let element = document.createElement(elCreate);

    element.className = elClass;
    element.innerHTML = elContent;

    elParent.appendChild(element);
};

$$.delEl = (element) => {
    element.remove();
};