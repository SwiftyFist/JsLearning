/*jslint vars: true, plusplus: true, devel: true, maxerr: 50, browser: true*/
/*global define */

var budgetController = (function () {

})();

//--------------------------------------------------------------------------------

var uiController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

//--------------------------------------------------------------------------------

var controller = (function (budgetCtrl, uiCtrl) {

    var setupEventListener = function () {
        var DOM = uiCtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                controlAddItem();
            }
        });
    };

    var controlAddItem = function () {
        //TODO Add Item control

        //1. Get the field input data
        var input = uiCtrl.getInput();

        //2. Add the item to the budget contorller
        //3. Add item to the UI
        //4. Calculate budget
        //5. Display the budget on the UI
    };

    return {
        init: function () {
            setupEventListener();
        }
    };

})(budgetController, uiController);

controller.init();
