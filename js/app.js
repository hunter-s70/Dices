'use strict';

var Dice = {};

Dice.roll_btn = document.querySelectorAll('.j-roll');
Dice.add_field_btn = document.querySelectorAll('.j-add-field');

Dice.place_input = document.querySelector('.j-place');
Dice.action_input = document.querySelector('.j-action');

Dice.data = {
    in_1 : ['Диван', 'Стол', 'Стул', 'Ванная', 'Пол'],
    in_2: ['Собачки', 'Сверху', 'Бочком', 'Снизу', 'Новая']
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
    let placeNum = Dice.randomNum(0, Dice.data.in_1.length-1),
        actionNum = Dice.randomNum(0, Dice.data.in_2.length-1);

    Dice.place_input.value = Dice.data.in_1[placeNum];
    Dice.action_input.value = Dice.data.in_2[actionNum];
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
    let editableClassName = 'b-field__edit',
        editable = document.getElementsByClassName(editableClassName),
        fieldId = this.parentNode.id;

    if (!editable.length) {
        let div = document.createElement('div');

        div.className = editableClassName;
        div.innerHTML =
            '<input type="text" class="b-field__edit-input">' +
            '<button type="button" class="j-add-item">Add item</button>' +
            '<button type="button" class="j-close-edit">Close</button>';

        this.parentNode.appendChild(div);

        // like repeat item in items
        Dice.renderItemsList(this.parentNode.querySelector('.' + editableClassName), fieldId);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// add items in DOM
Dice.renderItemsList = (fieldEditWrap, fieldId) => {
    if (Dice.data[fieldId]) {
        Dice.data[fieldId].forEach(function(item) {
            let div = document.createElement('div');

            div.className = 'b-field__edit-preview';
            div.innerHTML =
                '<span class="b-field__edit-item">'+ item +'</span>' +
                '<button type="button" class="j-del-item">Del item</button>';

            fieldEditWrap.appendChild(div);
        });
    }
};


// funciton, wich add items in Dice.data
Dice.addRollItem = function() {
    let parentElement = this.parentNode,
        additionValue = parentElement.querySelector('.b-field__edit-input').value,
        fieldId = this.parentNode.parentNode.id;

    if (!Dice.data[fieldId]) Dice.data[fieldId] = [];

    if (additionValue.length) {
        Dice.data[fieldId].push(additionValue);

        // add items into view from Dice.data
        Dice.renderItemsList(this.parentNode, fieldId);
    }
};


// close editable tools
Dice.closeEditable = function() {
    this.parentNode.remove();
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