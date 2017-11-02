var assert = require('assert');

var jCircuit = require('../dist/main.min').default;

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    } 
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass, 
            enumerable: false, 
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

describe('_run normal', function() {
    class TElement extends jCircuit.Element {
        constructor() {
            super();
        }
        input(data) {
            return true;
        }
        process() {
        }
        output() {
        }
    }
    var o = new TElement();
    var go = o._run();
    it('test input', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: true, done: false }, value);
        });
    });
    it('test process', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: undefined, done: false }, value);
        });
    });
    it('test output', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: undefined, done: true }, value);
        });
    });
    it('test go on', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: undefined, done: true }, value);
        });
    });
});

describe('_run abnormal', function() {
    class TElement extends jCircuit.Element {
        constructor() {
            super();
        }
        input(data) {
            return false;
        }
        process() {
        }
        output() {
        }
    }
    var o = new TElement();
    var go = o._run();
    it('test input', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: false, done: true }, value);
        });
    });
    it('test process', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: undefined, done: true }, value);
        });
    });
    it('test output', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: undefined, done: true }, value);
        });
    });
    it('test go on', function() {
        go.next().then(function(value) {
            assert.deepEqual({ value: undefined, done: true }, value);
        });
    });
});
