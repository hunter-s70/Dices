'use strict';

var Dice = {};

Dice.field_block = document.querySelectorAll('.j-field');

Dice.roll_btn = document.querySelectorAll('.j-roll');
Dice.add_field_btn = document.querySelectorAll('.j-add-field');

Dice.place_input = document.querySelector('.j-place');
Dice.action_input = document.querySelector('.j-action');

Dice.default = {
    place : ['Диван', 'Стол', 'Стул', 'Ванная', 'Пол'],
    action: ['Собачки', 'Сверху', 'Бочком', 'Снизу', 'Новая']
};


// generate random numbers
Dice.randomNum = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};


// set random values in input
Dice.roll = () => {
    var placeNum = Dice.randomNum(0, Dice.default.place.length-1),
        actionNum = Dice.randomNum(0, Dice.default.action.length-1);

    Dice.place_input.value = Dice.default.place[placeNum];
    Dice.action_input.value = Dice.default.action[actionNum];
};


// delete input from input list
Dice.deleteField = function() {
    this.parentNode.remove()
};


// add new input field to list
Dice.addField = () => {
    var fieldBlock = document.querySelector('.b-field').cloneNode(true),
        formLayout = document.querySelector('.l-fields');

    formLayout.appendChild(fieldBlock);

    // initiate listeners to new input fields
    Dice.initListeners();
};


// add editable tools to input in list
Dice.addEditable = function() {
    var editableClassName = 'b-field__edit',
        editable = document.getElementsByClassName(editableClassName);

    if (!editable.length) {
        let div = document.createElement('div');

        div.className = editableClassName;
        div.innerHTML =
            '<input type="text">' +
            '<button type="button" class="j-add-item">Add item</button>' +
            '<button type="button" class="j-close-edit">Close</button>';

        this.parentNode.appendChild(div);
    }
};


// factory add listeners to selectors list
Dice.addListeners = (elements, callback) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', callback);
    }
};


// initiate listeners
Dice.initListeners = () => {
    console.log('init');
    Dice.addListeners(document.querySelectorAll('.j-edit-field'), Dice.addEditable);
    Dice.addListeners(document.querySelectorAll('.j-del-field'), Dice.deleteField);
};


Dice.addListeners(Dice.roll_btn, Dice.roll);

Dice.addListeners(Dice.add_field_btn, Dice.addField);

Dice.initListeners();