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


// generate random numbers
$$.randomNum = (min, max) => {
    let rand;

    rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};


$$.appendEl = (elCreate = 'div', elParent, elClass = '', elId = '', elContent = '') => {
    if (!elParent) return false;

    let element = document.createElement(elCreate);

    element.id = elId;
    element.className = elClass;
    element.innerHTML = elContent;

    elParent.appendChild(element);
};


$$.delEl = (element) => {
    element.remove();
};