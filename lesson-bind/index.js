//Задача. свою функцию bind

this.age = 10;

let people1 = {
    name: 'Антон',
    age: 22,
    getAge: function (yearOfBirthday) { return this.age + yearOfBirthday; }
}

let getAge = people1.getAge;

console.log(getAge(1980)); //выведется 1990

let myBind = (objectForBind, functionForBind, ...args) => (functionForBind.apply(objectForBind, args));

console.log(myBind(people1, getAge, 1980)); //выведется 2002