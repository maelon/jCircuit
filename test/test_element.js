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

describe('jcircuit', function() {
    describe('_run', function() {
        var TestElement = function() { };
        TestElement.prototype.input = function() {
            console.log('input');
        };
        TestElement.prototype.process = function() {
            console.log('process');
        };
        TestElement.prototype.output = function() {
            console.log('output');
        };
        _inherits(TestElement, jCircuit.Element);
        var o = new TestElement();
        var go = o._run();
        it('should return \'hello, world\' when the value is not present', function() {
            assert.equal('hello, world', jcircuit());
        });
    });
});
