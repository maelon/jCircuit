const assert = require('assert');

const jCircuit = require('../dist/main.min').default;

describe('test sync element', function() {

    //class template
    class TSyncElement extends jCircuit.Element {
        constructor(name) {
            super(name);
        }
        input(data) {
            this.saveInputData(1);
            return true;
        }
        process() {
            const data = this.getInputData();
            const result = data + 1;
            this.saveProcessData(result);
        }
        output() {
        }
    }

    const el = new TSyncElement('test');
    el.input(1);

    //elementName
    it('elementName should return "test", when constructor with param "test"', function() {
        assert.strictEqual(el.elementName, 'test');
    });

    //getInputData
    it('getInputData should return 1, when input width param 1', function() {
        assert.strictEqual(el.getInputData(), 1);
    });

    //getProcessData
    it('getProcessData should return 2, when process to be executed', function() {
        el.process();
        assert.strictEqual(el.getProcessData(), 2);
    });

    //getOutputData
    it('getOutputData should throw ERROR_SIGNAL, when output does not call function saveOutputData', function() {
        assert.throws(el.getOutputData.bind(el), new RegExp(jCircuit.ERROR_SIGNAL.GETDATA_OUTPUT_ERROR));
    });
});

describe('test async element', function() {

    //class template
    class TAsyncElement extends jCircuit.Element {
        constructor(name) {
            super(name);
        }
        input(data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.saveInputData(1);
                    resolve(true);
                }, 1000);
            });
        }
        process() {
            const data = this.getInputData();
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const result = data + 1;
                    this.saveProcessData(result);
                    resolve();
                }, 1000);
            });
        }
        output() {
        }
    }

    const el = new TAsyncElement('test');

    //elementName
    it('elementName should return "test", when constructor with param "test"', function() {
        assert.strictEqual(el.elementName, 'test');
    });

    //getInputData
    const input_promise = el.input(1);
    it('getInputData should return 1, when input width param 1', function(done) {
        input_promise.then(() => {
            assert.strictEqual(el.getInputData(), 1);
            done();
        });
    });

    //getProcessData
    it('getProcessData should return 2, when process to be executed', function(done) {
        input_promise.then(() => {
            el.process().then(() => {
                assert.strictEqual(el.getProcessData(), 2);
                done();
            });
        });
    });

    //getOutputData
    it('getOutputData should throw ERROR_SIGNAL, when output does not call function saveOutputData', function() {
        assert.throws(el.getOutputData.bind(el), new RegExp(jCircuit.ERROR_SIGNAL.GETDATA_OUTPUT_ERROR));
    });
});
