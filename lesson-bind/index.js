//Задача. свою функцию bind

this.age = 10;

let people1 = {
    name: 'Антон',
    age: 22,
    getAge: function (yearOfBirthday) { return this.age + yearOfBirthday; }
}

let getAge = people1.getAge;

console.log(getAge()); //выведется 10

let boundGetCurrentYear = (objectForBind, functionForBind, ...args) => (functionForBind.apply(objectForBind, args));

console.log(boundGetCurrentYear(people1, getAge, 1980)); //выведется 2002