'use strict';

const Dice = {};    

Dice.roll_btn = document.querySelectorAll('.j-roll');
Dice.add_field_btn = document.querySelectorAll('.j-add-field');

Dice.place_input = document.querySelector('.j-place');
Dice.action_input = document.querySelector('.j-action');

// Dice.editItemInput = '<input type="text" class="b-field__edit-input">';
// Dice.editItemInput += '<button type="button" class="j-add-item">Add item</button>';
// Dice.editItemInput += '<button type="button" class="j-close-edit">Close</button>';

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
        fieldName = this.parentNode.id;

    if (!editable.length) {
        let div = document.createElement('div');

        div.className = editableClassName;
        div.innerHTML =
            '<input type="text" class="b-field__edit-input">' +
            '<button type="button" class="j-add-item">Add item</button>' +
            '<button type="button" class="j-close-edit">Close</button>';

        this.parentNode.appendChild(div);

        // like repeat item in items
        Dice.renderItemsList(this.parentNode.querySelector('.' + editableClassName), fieldName);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// add items in DOM
Dice.renderItemsList = (fieldEditWrap, fieldName) => {
    let layout = fieldEditWrap.querySelector('.l-field__edit-preview-wrap'),
        itemLayout = document.createElement('div');

    if (layout) {
        layout.remove();
    }

    itemLayout.className = 'l-field__edit-preview-wrap';
    fieldEditWrap.appendChild(itemLayout);

    if (Dice.data[fieldName]) {
        Dice.data[fieldName].forEach(function(item) {
            let div = document.createElement('div'),
                layout = fieldEditWrap.querySelector('.l-field__edit-preview-wrap');

            div.className = 'b-field__edit-preview';
            div.innerHTML =
                '<span class="b-field__edit-item">'+ item +'</span>' +
                '<button type="button" class="j-del-item">Del item</button>';

            layout.appendChild(div);
        });
    }
};


// funciton, wich add items in Dice.data
Dice.addRollItem = function() {
    let parentElement = this.parentNode,
        additionValue = parentElement.querySelector('.b-field__edit-input').value,
        fieldName = this.parentNode.parentNode.id;

    if (!Dice.data[fieldName]) Dice.data[fieldName] = [];

    if (additionValue.length) {
        Dice.data[fieldName].push(additionValue);

        // add items into view from Dice.data
        Dice.renderItemsList(this.parentNode, fieldName);
    }
};


// close editable tools
Dice.closeEditable = function() {
    this.parentNode.remove();
};


/*
 * END EDITADLE TOOLS
 */


// initiate listeners
Dice.initListeners = () => {
    console.log('init');
    $$.addListeners(document.querySelectorAll('.j-edit-field'), Dice.addEditable);
    $$.addListeners(document.querySelectorAll('.j-add-item'), Dice.addRollItem);
    $$.addListeners(document.querySelectorAll('.j-close-edit'), Dice.closeEditable);
    $$.addListeners(document.querySelectorAll('.j-del-field'), Dice.deleteField);
};


$$.addListeners(Dice.roll_btn, Dice.roll);

$$.addListeners(Dice.add_field_btn, Dice.addField);

Dice.initListeners();