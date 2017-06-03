'use strict';

var Dice = {};

Dice.roll_btn = document.querySelector('.j-roll');
Dice.add_field_btn = document.querySelector('.j-add-field');
Dice.del_field_btn = document.querySelector('.j-del-field');
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


Dice.roll_btn.addEventListener('click', function() {
    var placeNum = Dice.randomNum(0, Dice.default.place.length-1),
        actionNum = Dice.randomNum(0, Dice.default.action.length-1);

    Dice.place_input.value = Dice.default.place[placeNum];
    Dice.action_input.value = Dice.default.action[actionNum];
});

