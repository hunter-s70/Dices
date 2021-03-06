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

Dice.DiceWrap = document.querySelector('.j-dice');
Dice.prefixID = 'in_';
Dice.startIndex = 1;
Dice.fieldsOnStart = 2;

Dice.data = {
    [Dice.prefixID + Dice.startIndex]      : ['Диван', 'Стол', 'Стул', 'Ванная', 'Телевизер'],
    [Dice.prefixID + (Dice.startIndex + 1)]: ['Собака', 'Кот', 'Жираф', 'Крокодил', 'Тюлень']
};


// id unique number use in Dice.addField()
Dice.count = (() => {
    let index = Dice.startIndex;
    return function() {
        return index++;
    }
})();


// set random values in input
Dice.rollSetFields = (randomResults) => {
    for (let key in randomResults) {
        let roll_input,
            field = document.getElementById(key);

        if (!field) return false;

        roll_input = field.querySelector('.j-roll-input');
        roll_input.value = randomResults[key];
    }
};


// add random values from data
Dice.roll = () => {
    let randomResults = {};

    for (let key in Dice.data) {
        let randomNum,
            dataField = Dice.data[key],
            dataLength = dataField.length - 1;

        randomNum = $$.randomNum(0, dataLength);
        randomResults[key] = dataField[randomNum];
    }

    // view method, work with DOM
    Dice.rollSetFields(randomResults);
};


/*
 * MANAGE FIELDS
 */


// add new input field to list
Dice.addField = () => {
    let fieldID = Dice.prefixID + Dice.count(),
        fieldClass = 'b-field j-field',
        fieldContent;

    fieldContent  = '<input type="text" class="j-roll-input" disabled>';
    fieldContent += '<button type="button" class="j-del-field">Del field</button>';
    fieldContent += '<button type="button" class="j-edit-field">Edit field</button>';

    $$.appendEl({
        elCreate: 'div',
        elParent: Dice.DiceWrap,
        elClass: fieldClass,
        elId: fieldID,
        elContent: fieldContent
    });

    // initiate listeners to new input fields
    Dice.initListeners();
};


// delete field roll Data from Dice.data
Dice.deleteFieldData = fieldID => {
    delete Dice.data[fieldID];
};


// delete input from input list
Dice.deleteField = function() {
    $$.delEl(this.parentNode);
    Dice.deleteFieldData(this.parentNode.id);
};


// add few roll fields
Dice.addSeveralFields = fieldsNum => {
    for (let i = 0; i < fieldsNum; i+=1) {
        Dice.addField();
    }
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
        closeEditableBtn = document.querySelector('.j-close-edit'),
        editableContent;

    // close editable when click other
    if (closeEditableBtn) closeEditableBtn.click();

    editableContent  = '<input type="text" class="b-field__edit-input j-edit-input">';
    editableContent += '<button type="button" class="j-add-item">Add item</button>';
    editableContent += '<button type="button" class="j-close-edit">Close</button>';

    if (!editable.length) {

        $$.appendEl({
            elCreate: 'div',
            elParent: parentElement,
            elClass: editableClass,
            elContent: editableContent
        });

        document.querySelector('.j-edit-input').focus();

        // like repeat item in items
        Dice.renderItemsList(parentElement.querySelector('.' + editableClass), fieldID);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
};


// close editable tools
Dice.deleteEditable = function() {
    $$.delEl(this.parentNode);
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

// length and unique value validate
Dice.itemValidate = (additionValue, fieldID) => {
    if (!additionValue.length) return false;

    return Dice.data[fieldID].every(function(dataItem) {
        return dataItem !== additionValue;
    });
};


// funciton, wich add items in Dice.data
Dice.addItem = function() {
    let parentElement = this.parentNode || document.querySelector('.b-field__edit'),
        editable = parentElement.querySelector('.b-field__edit-input'),
        additionValue = editable.value,
        fieldID = parentElement.parentNode.id;

    if (!Dice.data[fieldID]) Dice.data[fieldID] = [];

    if (Dice.itemValidate(additionValue, fieldID)) {
        Dice.data[fieldID].push(additionValue);

        // clear editable input
        editable.value = '';

        // add items into view from Dice.data
        Dice.renderItemsList(parentElement, fieldID);

        // initiate listeners to new editable field
        Dice.initListeners();
    }
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


// add item function
Dice.addItemOnEnter = (e) => {
    if (e.keyCode === 13) {
        Dice.addItem();
    }
};


Dice.selectAllString = (e) => {
    e.target.setSelectionRange(0, e.target.value.length);
};


/*
 * END EDITADLE TOOLS
 */


// initiate listeners
Dice.initListeners = () => {
    $$.addListeners('click', document.querySelectorAll('.j-del-field'), Dice.deleteField);
    $$.addListeners('click', document.querySelectorAll('.j-edit-field'), Dice.addEditable);
    $$.addListeners('click', document.querySelectorAll('.j-close-edit'), Dice.deleteEditable);
    $$.addListeners('click', document.querySelectorAll('.j-add-item'), Dice.addItem);
    $$.addListeners('click', document.querySelectorAll('.j-del-item'), Dice.deleteItem);
    $$.addListeners('keypress', document.querySelectorAll('.j-edit-input'), Dice.addItemOnEnter);
    $$.addListeners('focus', document.querySelectorAll('.j-edit-input'), Dice.selectAllString);
};


// render Buttons panel on start
(() => {
    let btnPanelContent,
        btnPanelClass = 'btn-panel';

    btnPanelContent  = '<button type="button" class="j-add-field">Add field</button>';
    btnPanelContent += '<button type="button" class="j-roll">Roll</button>';
    btnPanelContent += '<button type="reset">Reset fields</button>';

    $$.appendEl({
        elCreate: 'div',
        elParent: Dice.DiceWrap,
        elClass: btnPanelClass,
        elContent: btnPanelContent
    });

    $$.addListeners('click', document.querySelectorAll('.j-roll'), Dice.roll);
    $$.addListeners('click', document.querySelectorAll('.j-add-field'), Dice.addField);

    Dice.addSeveralFields(Dice.fieldsOnStart);
})();

Dice.initListeners();