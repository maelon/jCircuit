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
        assert.deepEqual({ value: true, done: false }, go.next());
    });
    it('test process', function() {
        assert.deepEqual({ value: undefined, done: false }, go.next());
    });
    it('test output', function() {
        assert.deepEqual({ value: undefined, done: true }, go.next());
    });
    it('test go on', function() {
        assert.deepEqual({ value: undefined, done: true }, go.next());
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
        assert.deepEqual({ value: false, done: true }, go.next());
    });
    it('test process', function() {
        assert.deepEqual({ value: undefined, done: true }, go.next());
    });
    it('test output', function() {
        assert.deepEqual({ value: undefined, done: true }, go.next());
    });
    it('test go on', function() {
        assert.deepEqual({ value: undefined, done: true }, go.next());
    });
});
