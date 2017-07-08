'use strict';

const Dice = {};

Dice.roll_btn = document.querySelectorAll('.j-roll');
Dice.add_field_btn = document.querySelectorAll('.j-add-field');
Dice.uniquePrefixID = 'in_';

Dice.data = {
    [Dice.uniquePrefixID + 1]: ['Диван', 'Стол', 'Стул', 'Ванная', 'Пол'],
    [Dice.uniquePrefixID + 2]: ['Собачки', 'Сверху', 'Бочком', 'Снизу', 'Новая']
};


// id unique number use in Dice.addField()
Dice.count = (() => {
    let index = 1;
    return function() {
        return index++;
    }
})();


// set random values in input
Dice.roll = () => {
    let randomNum,
        roll_input;

    for (let key in Dice.data) {
        roll_input = document.getElementById(key).querySelector('.j-roll-input');
        randomNum = $$.randomNum(0, Dice.data[key].length-1);
        roll_input.value = Dice.data[key][randomNum];
    }
};


/*
 * MANAGE FIELDS
 */


// add new input field to list
Dice.addField = () => {
    let formLayout = document.querySelector('.l-fields'),
        fieldInputID = Dice.uniquePrefixID + Dice.count(),
        fieldInputClass = 'b-field j-field',
        fieldInput;

    fieldInput  = '<input type="text" class="j-roll-input">';
    fieldInput += '<button type="button" class="j-del-field">Del field</button>';
    fieldInput += '<button type="button" class="j-edit-field">Edit field</button>';

    $$.appendEl({
        elCreate: 'div',
        elParent: formLayout,
        elClass: fieldInputClass,
        elId: fieldInputID,
        elContent: fieldInput
    });

    // initiate listeners to new input fields
    Dice.initListeners();
};


// delete input from input list
Dice.deleteField = function() {
    $$.delEl(this.parentNode);
};


/*
 * END MANAGE FIELDS
 */


/*
 * EDITADLE TOOLS
 */


// add editable tools to input in list
Dice.addEditable = function() {
    let parentElement = this.parentNode,
        editableClassName = 'b-field__edit',
        editable = document.getElementsByClassName(editableClassName),
        fieldName = parentElement.id,
        editItemInput;

    editItemInput  = '<input type="text" class="b-field__edit-input">';
    editItemInput += '<button type="button" class="j-add-item">Add item</button>';
    editItemInput += '<button type="button" class="j-close-edit">Close</button>';

    if (!editable.length) {

        $$.appendEl({
            elCreate: 'div',
            elParent: parentElement,
            elClass: editableClassName,
            elContent: editItemInput
        });

        // like repeat item in items
        Dice.renderItemsList(parentElement.querySelector('.' + editableClassName), fieldName);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// add items in DOM
Dice.renderItemsList = (fieldEditWrap, fieldName) => {
    let layout = fieldEditWrap.querySelector('.l-field__edit-preview-wrap'),
        itemLayout = document.createElement('div');

    if (layout) {
        $$.delEl(layout);
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
        fieldName = parentElement.parentNode.id;

    if (!Dice.data[fieldName]) Dice.data[fieldName] = [];

    if (additionValue.length) {
        Dice.data[fieldName].push(additionValue);

        // add items into view from Dice.data
        Dice.renderItemsList(parentElement, fieldName);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// close editable tools
Dice.closeEditable = function() {
    $$.delEl(this.parentNode);
};


// remove roll item
Dice.deleteItem = function() {
    let parentElement = this.parentNode,
        itemValue = parentElement.querySelector('.b-field__edit-item').textContent,
        fieldName = parentElement.parentNode.parentNode.parentNode.id,
        itemIndex = Dice.data[fieldName].indexOf(itemValue);

    if (itemIndex > -1) {
        Dice.data[fieldName].splice(itemIndex, 1);
    }

    // add items into view from Dice.data
    Dice.renderItemsList(parentElement.parentNode.parentNode, fieldName);

    // initiate listeners to new editable field
    Dice.initListeners();
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
    $$.addListeners(document.querySelectorAll('.j-del-item'), Dice.deleteItem);
};


$$.addListeners(Dice.roll_btn, Dice.roll);

$$.addListeners(Dice.add_field_btn, Dice.addField);

Dice.initListeners();