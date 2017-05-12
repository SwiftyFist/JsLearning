/*jslint vars: true, plusplus: true, devel: true, maxerr: 50, browser: true, esversion: 6*/
/*global define */

//const question = new Map();
//
//question.set('question', 'What is the official name of the latest major Javascript version ?');
//question.set(1, 'ES5');
//question.set(2, 'ES6');
//question.set(3, 'ES2015');
//question.set(4, 'ES7');
//question.set('correct', 3);
//
//question.set(true, 'Correct answer');
//question.set(false, 'Wrong answer');
//
//console.log(question.get('question'));
//console.log(question.size);
//
////if (question.has(4))
////    question.delete(4);
//
////question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));
//
//for (let [key, value] of question.entries()) {
//    if (typeof(key) === 'number') {
//        console.log(`Answer ${key}: ${value}`);
//    }
//}
//
//const ans = parseInt(prompt('Write the correct answer'));
//
//console.log(question.get(ans === question.get('correct')));

//ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
};

var john5 = new Person5('John', 1990, 'teahcer');


//ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
}

const john6 = new Person6('John', 1990, 'teacher');










