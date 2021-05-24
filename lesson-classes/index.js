/*
    Домашнее задание. Напишите
    примеры SOLID на JavaScript
*/
/************************************************************************************************************** */
//1. S - single responsibility. Все методы и поля класса должны служить единой общей цели.
class AdditionSIncorrect {
    add(a, b) {
        return a + b;
    }
    addAndPrint(a, b) {
        console.log(add(a, b));
    }
}
/*
класс Addition нарушает этот принцип так как печать сложения уже не должна быть его зоной ответственности. 
Этот класс следует разбить на два
*/
    class AdditionS {
        add(a, b) {
            return a + b;
        }
    }

    class PrintS {
        print (a) {
            console.log(a);
        }
    }

    let addition = new AdditionS();
    let logger = new PrintS();
    logger.print(addition.add(4, 9)); //13
//*************************************************************************************************************************** */
//2. O - Open-closed. Возможности класса можно расширить, но нельзя модифицировать исходные возможности (кроме исправления дефектов).

class AdditionOIncorrect {
    a = 0;
    b = 0;
}

class SubtractionOIncorrect {
    a = 0;
    b = 0;
}

class OperationIncorrect {
    calculate (operation) {
        if (operation instanceof AdditionOIncorrect) {
            return operation.a + operation.b;
        }
        if (operation instanceof SubtractionOIncorrect) {
            return operation.a - operation.b;
        }
    }
}
/*
класс OperationIncorrect не соответствует принципу O, ведь если появится еще класс MultipleOIncorrect, то его понадобится изменять.
Правильно будет выделить общий метод интерфейса для классов AdditionOIncorrect и SubtractionOIncorrect и вызывать его в OperationIncorrect
*/
class AdditionO { 
    a = 0;
    b = 0;
    operate() {
        return a + b;
    }
}

class SubtractionO {
    a = 0;
    b = 0;
    operate() {
        return a - b;
    }
}

class OperationO {
    calculate (operation) {
        return operation.operate;
    }
}
/****************************************************************************************************************************** */
//3. L - Liskov Substitution. Производный и родительский классы должны быть взаимозаменяемы. 
class Operation {
    getAdditionalOperation (a, b) {
        return function (a, b) {
            return a + b;
        }
    }
}

class AdditionOperation extends Operation {
    getAdditionalOperation (a, b) {
        return a + b;
    }
}
//Класс AdditionOperation нарушает принцип подстановки Лисков так как возвращает другой тип в методе getAdditionalOperation

/***************************************************************************************************************************** */
/*
4 I - Interface Segregation. Похож на принцип единой ответственности и требует разбиения сложных интерфейсов на более мелкие, 
которые лучше подходят для потребностей клиентов этих интерфейсов
*/
class lock {
    isOpened = false;
    inputKey(key) {
        console.log("Определите метод inputKey");
    }
    ternRigth() {
        console.log("Определите метод ternRigth");
    }
    ternLeft() {
        console.log("Определите метод");
    }
    isOpen() {
        return this.isOpened;
    }
}

class magnetLock  extends lock{
    code;
    constructor (code) {
        this.code = code;
    }
    inputKey(key) {
        if (key === code) {
            this.isOpened = true;
        } else {
            this.isOpened = false;
        }
    }
    ternRigth() {
        //do nothing
    }
    ternLeft() {
        //do nothing
    }
}

/*
тут мы видим, что классу magnetLock не нужны методы ternRigth и ternLeft, поэтому приходится их делать пустыми чтобы не было ошибок.
Это нарушает принцип разделения.
Правильное решение (для TypeScript):
interface TernLeftAble {
    ternLeft();
}
interface TernRightAble {
    ternRight();
}
interface Lock {
    inputKey(key);
    isOpen();
}
/********************************************************************************************************************************* */
/*
5. D - Dependency Inversion. Более высокоуровенвые классы не должны зависить от низкоуровенвых. Все должно зависить от абстракций.
*/
//создаем абстракцию
function AbstractLock() {
	//
}
AbstractLock.prototype = {
	inputKey: function(key) {
		throw new TypeError("Method not implemented");
	},

	isOpen: function() {
		throw new TypeError("Method not implemented");	
	}
}

// Какая либо стратегия наследования
AbstractLock.extend = function(prototypeProperties) {
	return {...this, prototypeProperties};
}

//реализация для магнитного замка
var Lock = AbstractLock.extend({
	insertKey: function(key) {
		//реализация
	},

	isOpen: function() {
		//реализация
	}
});

//использование
class Door {
    lock;
    constructor (lock) {
        this.lock = lock;
    }
    openDoor(key) {
        lock.insertKey(key);
        if (lock.isOpened) {
            open;
        }
    }
    open() {
        //реализация
    }
}

/*если нам понадобится сделать замок с ключем таблеткой - 
нужно будет только сделать новую реализацию для методов AbstractLock и подать ее в конструктор класса дверь
*/