'use strict';

var Dice = {};

Dice.roll_btn = document.querySelectorAll('.j-roll');
Dice.add_field_btn = document.querySelectorAll('.j-add-field');

Dice.place_input = document.querySelector('.j-place');
Dice.action_input = document.querySelector('.j-action');

Dice.data = {
    place : ['Диван', 'Стол', 'Стул', 'Ванная', 'Пол'],
    action: ['Собачки', 'Сверху', 'Бочком', 'Снизу', 'Новая']
};


// generate random numbers
Dice.randomNum = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};


// id unique number use in Dice.addField()
Dice.count = (() => {
    let index = 3;
    return function() {
        return index++;
    }
})();


// set random values in input
Dice.roll = () => {
    let placeNum = Dice.randomNum(0, Dice.data.place.length-1),
        actionNum = Dice.randomNum(0, Dice.data.action.length-1);

    Dice.place_input.value = Dice.data.place[placeNum];
    Dice.action_input.value = Dice.data.action[actionNum];
};


/*
 * MANAGE FIELDS
 */


// add new input field to list
Dice.addField = () => {
    let fieldBlock = document.querySelector('.b-field').cloneNode(true),
        formLayout = document.querySelector('.l-fields');

    fieldBlock.id = 'in_' + Dice.count();
    formLayout.appendChild(fieldBlock);

    // initiate listeners to new input fields
    Dice.initListeners();
};


// delete input from input list
Dice.deleteField = function() {
    this.parentNode.remove()
};


/*
 * END MANAGE FIELDS
 */


/*
 * EDITADLE TOOLS
 */


// add editable tools to input in list
Dice.addEditable = function() {
    var editableClassName = 'b-field__edit',
        editable = document.getElementsByClassName(editableClassName);

    if (!editable.length) {
        let div = document.createElement('div');

        div.className = editableClassName;
        div.innerHTML =
            '<input type="text" class="b-field__edit-input">' +
            '<button type="button" class="j-add-item">Add item</button>' +
            '<button type="button" class="j-close-edit">Close</button>';

        this.parentNode.appendChild(div);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


Dice.addRollItem = function() {
    let parentElement = this.parentNode,
        additionValue = parentElement.querySelector('.b-field__edit-input').value;
    console.log(additionValue.length);

    if (additionValue.length) {
        let div = document.createElement('div');

        div.className = 'b-field__edit-preview';
        div.innerHTML =
            '<span class="b-field__edit-item">'+ additionValue +'</span>' +
            '<button type="button" class="j-del-item">Del item</button>';

        this.parentNode.appendChild(div);
    }
};


// close editable tools
Dice.closeEditable = () => {
    console.log('close');
};


/*
 * END EDITADLE TOOLS
 */


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
    Dice.addListeners(document.querySelectorAll('.j-add-item'), Dice.addRollItem);
    Dice.addListeners(document.querySelectorAll('.j-close-edit'), Dice.closeEditable);
    Dice.addListeners(document.querySelectorAll('.j-del-field'), Dice.deleteField);
};


Dice.addListeners(Dice.roll_btn, Dice.roll);

Dice.addListeners(Dice.add_field_btn, Dice.addField);

Dice.initListeners();