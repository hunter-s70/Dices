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


Dice.randomNum = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};


Dice.roll = function() {
    var placeNum = Dice.randomNum(0, Dice.default.place.length-1),
        actionNum = Dice.randomNum(0, Dice.default.action.length-1);

    Dice.place_input.value = Dice.default.place[placeNum];
    Dice.action_input.value = Dice.default.action[actionNum];
};


Dice.deleteField = function() {
    this.parentNode.remove()
};


Dice.addField = function() {
    var fieldBlock = document.querySelector('.b-field').cloneNode(true),
        formLayout = document.querySelector('.l-fields');

    formLayout.appendChild(fieldBlock);

    Dice.initListeners();
};


Dice.addEditable = function() {

};


Dice.addListeners = function(elements, callback) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', callback);
    }
};


Dice.initListeners = function() {
    console.log('init');
    Dice.addListeners(document.querySelectorAll('.j-edit-field'), Dice.addEditable);
    Dice.addListeners(document.querySelectorAll('.j-del-field'), Dice.deleteField);
};


Dice.addListeners(Dice.roll_btn, Dice.roll);

Dice.addListeners(Dice.add_field_btn, Dice.addField);

Dice.initListeners();