var assert = require('assert');

var jcircuit = require('../dist/jCircuit').default;

describe('jcircuit', function() {
    describe('hello', function() {
        it('should return \'hello, world\' when the value is not present', function() {
            assert.equal('hello, world', jcircuit());
        });
    });
});
