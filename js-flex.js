// // 7 Falsey values of JavaScript
// // null
// // NaN
// // undefined
// // 0
// // -0
// // "" '' ``
// // false

// Array.prototype.myEach = function(cb) {
// //     for (let i = 0; i < this.length; i ++) {
// //         callback(this[i]);
// //     }
// // }
// Array.prototype.myMap = function (cb) {
//     const mappedArray = [];

//     // this.myEach( (ele) => {
//     //     mappedArray.push(cb(ele));
//     // })

//     //     mappedArray.push(cb(ele));
//     // };

// //     // this.myEach(innerFunction);

// //     return mappedArray;
// // }
// function doubler (ele) {
//     return ele * 2;
// }

// const myArr = [1, 4, 7, 10, 20];

// myArr.myMap(doubler);


// [8, 0, 3, 7, 2]
// [8, 0, 3] [7, 2]
// [8, 0] [3] [2] [2]
// [8] [0] [3] [2] [2]
Array.prototype.mergeSort = function(cb) {
    if (this.length <= 1) return this;

    let midIdx = Math.floor(this.length / 2);

    let left = this.slice(0, midIdx);
    let right = this.slice(midIdx);

    left = left.mergeSort(cb);
    right = right.mergeSort(cb);

    return merge(left, right, cb);
}

function merge(left, right, cb) {
    const mergedArray = [];

    // while (left.length !== 0 && right.length !== 0) {
    while (left.length && right.length) {
        // console.log(left)
        debugger
        if (cb(left[0], right[0])) {
            mergedArray.push(left.shift());
        } else {
            mergedArray.push(right.shift());
        }
    }
    return mergedArray.concat(left, right);
    // return mergedArray
}

function compareNumbers(num1, num2) {
    if (num1 < num2) {
        return true;
    }   else {
        return false;
    }
}

// const arr = [8, 0, 3, 7, 2];

// console.log(`my answer: ${arr.mergeSort(compareNumbers)}`);

// console.log("Howdy");
// setTimeout(() => console.log("Howdy back atcha"), 0);
// console.log("Well thanks, yall have a splendid day");
// setTimeout(() => console.log("Well I just might!"), 0);

// const boundTick = tick.bind(this)

Function.prototype.myBind = function(ctx) {
    // this
    return () => this.apply(ctx);
}

Function.prototype.myBindNoFatArrow = function(ctx) {
    let that = this;
    // let banana = this;
    return function () {
        // console.log(this);
        return that.apply(ctx);
        // return banana.apply(ctx);
    }
}

Function.prototype.myBindWithArguments = function(ctx) {
    // let fn = this;
    let that = this;
    const bindArgs = Array.from(arguments).slice(1);
    return function() {
        const callArgs = Array.from(arguments);
        return that.apply(ctx, bindArgs.concat(callArgs));
    }
}

const carlos = {
    name: "carlos",
    age: 24,
    sayName: function () {
        console.log(this.name)
    },
    greet: function (...greetings) {
        const greetingsString = greetings.join(", ");
        return `${greetingsString} my name is ${this.name}`;
    }
}

const sandra = {
    name: "sandra",
    age: 30
}

// console.log(carlos.greet.myBindNoFatArrow(sandra, "Hello", "Bon Jour")("Hola", "Ciao"))
// console.log(carlos.greet.myBindWithArguments(sandra)("Hello", "Bon Jour", "Hola", "Ciao"))
// carlos.sayName.bind(sandra)();
// carlos.sayName.myBindNoFatArrow(sandra)();


// Surrogate Pattern!!
Function.prototype.inherits = function(Parent) {
    function Surrogate() {}
    Surrogate.prototype = Parent.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

// Cat.inherits(Animal);

function inherits(ParentClass, ChildClass) {
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
}

const sum = function(...args) {
    let total = 0; 
    for (let i = 0; i < args.length; i++) {
        total += args[i];
    }
    return total;
}

// console.log(sum(2, 5, -2, 3))

function currier(func, numArgs) {
    const args = [];

    return function _currier(ele) {
        args.push(ele);
        if (args.length === numArgs) {
            return func(...args);
        } else {
            return _currier;
        }
    }
}

// console.log(currier(sum, 4)(2)(5)(-2)(3));
// console.log(currier(sum, 4)(3));
// console.log(currier(sum, 4)(3)(5, 6, 7, 8)); => how

function superCurrier(func, numArgs) {
    const args = [];

    return function _superCurrier(...eles) {
        // args = args.concat(eles)
        args.push(...eles);
        if (args.length >= numArgs) {
            return func(...args.slice(0, numArgs));
        } else {
            return _superCurrier;
        }
    }
}

// console.log(superCurrier(sum, 4)(3)(5, 6, 7, 8, 9, 19, 23));

function superUltraCurrier(func, ctx, numArgs) {
    const args = [];

    return function _superUltraCurrier(...eles) {
        args.push(...eles);
        if (args.length >= numArgs) {
            return func.apply(ctx, args.slice(0, numArgs));
        } else {
            return _superUltraCurrier;
        }
    }
}

Function.prototype.myCurry = function (ctx, numArgs) {
    
}