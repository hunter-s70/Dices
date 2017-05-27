$(document).ready(function(){
    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    $('.j-roll').on('click', function() {
        var place = ['Диван', 'Стол', 'Стул', 'Ванная', 'Пол'],
            action = ['Собачки', 'Сверху', 'Бочком', 'Снизу', 'Новая'],
            placeNum = randomInteger(0, place.length-1),
            actionNum = randomInteger(0, action.length-1);

        $('.j-place').val(place[placeNum]);
        $('.j-action').val(action[actionNum]);
    });
});

