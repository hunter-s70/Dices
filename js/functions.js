/**
 * Created by hunter_s70 on 17.06.2017.
 */
const $$ = {

    // factory add listeners to selectors list
    addListeners: (event, elements, callback) => {
        if (typeof callback !== 'function') return false;

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener(event, callback);
        }
    },


    // generate random numbers
    randomNum: (min, max) => {
        let rand;

        rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    },

    // append new element in DOM
    appendEl: (args) => {
        if (!args) return false;

        let element = document.createElement(args.elCreate);

        for (let key in args) {

            if (!args.hasOwnProperty(key)) continue;

            if (key === 'elId') {
                element.id = args.elId;
            }

            if (key === 'elClass') {
                element.className = args.elClass;
            }

            if (key === 'elContent') {
                element.innerHTML = args.elContent;
            }

        }

        args.elParent.appendChild(element);
    },

    // delete element
    delEl: (element) => {
        element.remove();
    }
};