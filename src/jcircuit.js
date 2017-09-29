'use strict';

const func = () => 'hello, world';

class Animal {
    constructor() {
    }

    eat() {
        console.log('eat');
    }
}

class Dog extends Animal {
    constructor() {
        super();
    }

    bark() {
        console.log('bark');
    }
}

console.log(Dog instanceof Animal);

export default func;
