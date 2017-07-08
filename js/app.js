'use strict';

const Dice = {};

/*
* STRUCTURE
* 
* |field
* |- editable
* |-- itemsWrap
* |--- items
* 
*/

Dice.roll_btn = document.querySelectorAll('.j-roll');
Dice.add_field_btn = document.querySelectorAll('.j-add-field');
Dice.prefixID = 'in_';
Dice.startIndex = 1;

Dice.data = {
    [Dice.prefixID + Dice.startIndex]      : ['Диван', 'Стол', 'Стул', 'Ванная', 'Пол'],
    [Dice.prefixID + (Dice.startIndex + 1)]: ['Собачки', 'Сверху', 'Бочком', 'Снизу', 'Новая']
};

console.log(Dice.data);
// id unique number use in Dice.addField()
Dice.count = (() => {
    let index = Dice.startIndex;
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
        randomNum = $$.randomNum(0, Dice.data[key].length - 1);
        roll_input.value = Dice.data[key][randomNum];
    }
};


/*
 * MANAGE FIELDS
 */


// add new input field to list
Dice.addField = () => {
    let formLayout = document.querySelector('.l-fields'),
        fieldID = Dice.prefixID + Dice.count(),
        fieldClass = 'b-field j-field',
        fieldContent;

    fieldContent  = '<input type="text" class="j-roll-input">';
    fieldContent += '<button type="button" class="j-del-field">Del field</button>';
    fieldContent += '<button type="button" class="j-edit-field">Edit field</button>';

    $$.appendEl({
        elCreate: 'div',
        elParent: formLayout,
        elClass: fieldClass,
        elId: fieldID,
        elContent: fieldContent
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
        fieldID = parentElement.id,
        editableClass = 'b-field__edit',
        editable = document.getElementsByClassName(editableClass),
        editableConent;

    editableConent  = '<input type="text" class="b-field__edit-input">';
    editableConent += '<button type="button" class="j-add-item">Add item</button>';
    editableConent += '<button type="button" class="j-close-edit">Close</button>';

    if (!editable.length) {

        $$.appendEl({
            elCreate: 'div',
            elParent: parentElement,
            elClass: editableClass,
            elContent: editableConent
        });

        // like repeat item in items
        Dice.renderItemsList(parentElement.querySelector('.' + editableClass), fieldID);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// add items in DOM
Dice.renderItemsList = (editable, fieldID) => {
    let itemsWrapClass = 'l-field__edit-preview-wrap',
        itemsWrap = editable.querySelector('.' + itemsWrapClass);

    if (itemsWrap) {
        $$.delEl(itemsWrap);
    }

    // create empty wrap for rolled items
    $$.appendEl({
        elCreate: 'div',
        elParent: editable,
        elClass: itemsWrapClass
    });

    if (Dice.data[fieldID]) {
        Dice.data[fieldID].forEach(function(itemValue) {
            let itemClass = 'b-field__edit-preview',
                item = editable.querySelector('.' + itemsWrapClass),
                itemContent;

            itemContent  = '<span class="b-field__edit-item">'+ itemValue +'</span>';
            itemContent += '<button type="button" class="j-del-item">Del item</button>';

            $$.appendEl({
                elCreate: 'div',
                elParent: item,
                elClass: itemClass,
                elContent: itemContent
            });
        });
    }
};


// funciton, wich add items in Dice.data
Dice.addItem = function() {
    let parentElement = this.parentNode,
        additionValue = parentElement.querySelector('.b-field__edit-input').value,
        fieldID = parentElement.parentNode.id;

    if (!Dice.data[fieldID]) Dice.data[fieldID] = [];

    if (additionValue.length) {
        Dice.data[fieldID].push(additionValue);

        // add items into view from Dice.data
        Dice.renderItemsList(parentElement, fieldID);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// close editable tools
Dice.deleteEditable = function() {
    $$.delEl(this.parentNode);
};


// remove roll item
Dice.deleteItem = function() {
    let parentElement = this.parentNode,
        fieldID = parentElement.parentNode.parentNode.parentNode.id,
        itemValue = parentElement.querySelector('.b-field__edit-item').textContent,
        itemIndex = Dice.data[fieldID].indexOf(itemValue);

    if (itemIndex > -1) {
        Dice.data[fieldID].splice(itemIndex, 1);
    }

    // add items into view from Dice.data
    Dice.renderItemsList(parentElement.parentNode.parentNode, fieldID);

    // initiate listeners to new editable field
    Dice.initListeners();
};


/*
 * END EDITADLE TOOLS
 */


// initiate listeners
Dice.initListeners = () => {
    console.log('init');
    $$.addListeners(document.querySelectorAll('.j-del-field'), Dice.deleteField);
    $$.addListeners(document.querySelectorAll('.j-edit-field'), Dice.addEditable);
    $$.addListeners(document.querySelectorAll('.j-close-edit'), Dice.deleteEditable);
    $$.addListeners(document.querySelectorAll('.j-add-item'), Dice.addItem);
    $$.addListeners(document.querySelectorAll('.j-del-item'), Dice.deleteItem);
};


$$.addListeners(Dice.roll_btn, Dice.roll);

$$.addListeners(Dice.add_field_btn, Dice.addField);

Dice.initListeners();