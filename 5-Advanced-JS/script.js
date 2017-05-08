/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

//var Person = function(name, yearOfBirth, job) {
//    this.name = name;
//    this.yearOfBirth = yearOfBirth;
//    this.job = job;
//};
//Person.prototype.calculateAge = function() {
//        console.log(2016 - this.yearOfBirth);
//    };
//Person.prototype.lastName = 'Smith';
//
//var john = new Person('John', 1990, 'teacher');
//var jane = new Person('Jane', 1969, 'designer');
//var mark = new Person('Mark', 1948, 'retired');
//
//john.calculateAge();
//mark.calculateAge();
//jane.calculateAge();
//
//console.log(john.lastName);
//console.log(mark.lastName);
//console.log(jane.lastName);


/*var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth)
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1969},
    job: {value: 'designer'}
});*/


//var years = [1990, 1965, 1937, 2005, 1999];
//
//function arrayCalc(arr, fn) {
//    var arrRes = [];
//    for (var i = 0; i < arr.length; i++) {
//        arrRes.push(fn(arr[i]));
//    }
//    return arrRes;
//}
//
//function calculateAge(el) {
//    return 2016 - el;
//}
//
//function isFullAge(el) {
//    return el >= 18;
//}
//
//function maxHeartRate(el) {
//    if (el >= 18 && el <= 81)
//        return Math.round(206.9 - (0.67 * el));
//    else
//        return -1;
//}
//
//var ages = arrayCalc(years, calculateAge);
//var rates = arrayCalc(ages, maxHeartRate);
//
//console.log(ages);
//console.log(arrayCalc(ages, isFullAge));
//console.log(rates);

//
//function interviewQuestion(job) {
//    if (job === 'designer'){
//        return function(name){
//         console.log(name + ', can you please...');
//        }
//    } else if (job === 'teacher') {
//        return function(name) {
//            console.log(name + ', altro');
//        }
//    } else {
//        return function(name) {
//            console.log('Hello');
//        }
//    }
//}
//
//var teacherQuestion = interviewQuestion('teacher');
//
//teacherQuestion('John');

///////CLOSURES///////

/*function retirement(retirementAge) {
    var a = ' year left untile retirement.'
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
retirementUS(1990);

retirement(66)(1990);*/


/*var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('formal');
        } else if (style === 'friendly'){
            console.log('friendly');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation.call(emily, 'friendly', 'afternoon');

john.presentation.apply(emily, ['friendly', 'afternoon']);

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning')*/

var Question = function (question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
};

Question.prototype.showQuestion = function () {
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++)
        console.log(i + ') ' + this.answers[i]);
};

Question.prototype.verifyAnswer = function(answer) {
    return answer == this.correctAnswer;
};


function askQuestion () {
    (function (){

        var firstQ = new Question('Come va ?', ['annoiato', 'stanco', 'stufo', 'in ansia'], 2);
        var secondQ = new Question('Che devo scrivere', ['cagate', 'cagate pensate', 'cagate con del senso'], 2);

        var questions = [firstQ, secondQ];
        var currentQuestion = questions[Math.round(Math.random())];

        currentQuestion.showQuestion();

        var answer = prompt('Select the answer or write exit to exit');

        if (answer !== 'exit'){
            var result = currentQuestion.verifyAnswer(answer);
            console.log(result);
            askQuestion();
        }
    })();
}

askQuestion();

































