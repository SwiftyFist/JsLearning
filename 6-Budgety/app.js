/*jslint vars: true, plusplus: true, devel: true, maxerr: 50, browser: true*/
/*global define */

//--------------------------------------------------------------------------------
/*BUDGET-CONTROLLER*/
//--------------------------------------------------------------------------------

var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function (totalIncome) {
        if (totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100);
        else
            this.percentage = -1;
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (item) {
            sum += item.value;
        });
        data.totals[type] = sum;

    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            var itemArray = data.allItems[type];

            if (itemArray.length === 0)
                ID = 0;
            else
                ID = itemArray[data.allItems[type].length - 1].id + 1;

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            itemArray.push(newItem);

            data.totals[type] += newItem.value;
            return newItem;
        },
        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function () {
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0)
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            else
                data.percentage = -1;
        },
        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calculatePercentage(data.totals.inc);
            });
        },
        getPercentages: function () {
            var perc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return perc;
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
    };
})();

//--------------------------------------------------------------------------------
/*UI-CONTROLLER*/
//--------------------------------------------------------------------------------

var uiController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'

    };

    var formatNumber = function (num, type) {
        var numSplit;
        num = Math.abs(num);
        num = num.toFixed(2);
        if (type === 'inc')
            return ('+ ' + num);
        else if (type === 'exp')
            return ('- ' + num);
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function (obj, type) {
            var html, populatedHtml, container;

            if (type === 'inc') {
                container = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-' + obj.id + '"><div class="item__description">' + obj.description + '</div><div class="right clearfix"><div class="item__value">' + formatNumber(obj.value, 'inc') + '</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
            } else if (type === 'exp') {
                container = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-' + obj.id + '"><div class="item__description">' + obj.description + '</div><div class="right clearfix"><div class="item__value">' + formatNumber(obj.value, 'exp') + '</div><div class="item__percentage">' + obj.percentage + '</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            document.querySelector(container).insertAdjacentHTML('beforeend', html);
        },
        deleteListItem: function (selectorID) {
            var item = document.getElementById(selectorID);
            item.parentNode.removeChild(item);
        },
        clearFields: function () {
            var fields;
            fields = Array.prototype.slice.call(document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue));

            fields.forEach(function (current, index, array) {
                current.value = "";
            });

            fields[0].focus();
        },
        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget >= 0 ? 'inc' : 'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0)
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
            else
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        },
        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
                current.textContent = (percentages[index] > 0 ? percentages[index] : '---') + ' %';
            });
        },
        displayMonth: function () {
            var now, year, month;
            now = new Date();
            month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = month[now.getMonth()] + ' ' + year;
        },
        changeType: function () {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ', ' +
                DOMstrings.inputDescription + ', ' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

//--------------------------------------------------------------------------------
/*CONTROLLER*/
//--------------------------------------------------------------------------------

var controller = (function (budgetCtrl, uiCtrl) {

    var setupEventListener = function () {
        var DOM = uiCtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changeType);
    };

    var updatePercentages = function () {
        var percentages;
        budgetCtrl.calculatePercentages();
        percentages = budgetCtrl.getPercentages();
        uiCtrl.displayPercentages(percentages);
    };

    var updateBudget = function () {
        var budget;
        budgetCtrl.calculateBudget();
        budget = budgetCtrl.getBudget();
        uiCtrl.displayBudget(budget);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        input = uiCtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            uiCtrl.addListItem(newItem, input.type);
            uiCtrl.clearFields();

            updateBudget();

            updatePercentages();
        }
    };

    var ctrlDeleteItem = function (event) {
        var target;
        if (event.target.classList[0] === 'item__delete--btn')
            target = event.target.parentNode.parentNode.parentNode;
        else if (event.target.parentNode.classList[0] === 'item__delete--btn')
            target = event.target.parentNode.parentNode.parentNode.parentNode;

        if (target) {
            var itemID, splitID, type, id;
            itemID = target.id;
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, id);

            uiCtrl.deleteListItem(itemID);

            updateBudget();

            updatePercentages();
        }
    };

    return {
        init: function () {
            setupEventListener();
            uiCtrl.displayMonth();
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1

            });
        }
    };

})(budgetController, uiController);

controller.init();
