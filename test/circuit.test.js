const assert = require('assert');

const jCircuit = require('../dist/main.min').default;

describe('test base circuit', function() {

    //class template
    class TCircuit extends jCircuit.Circuit {
        constructor(name) {
            super(name);
        }
    }

    const ct = new TCircuit('test');

    //append object not extend Element
    it('append should return false, when append object does not extend jCircuit.Element', function() {
        const el = {
            'input': () => {},
            'process': () => {},
            'output': () => {}
        };
        assert.strictEqual(ct.append(el), false);
    });

    //append object extend Element
    it('append should return true, when append object extends jCircuit.Element', function() {
        class TElement extends jCircuit.Element {
        }
        const el = new TElement();
        assert.strictEqual(ct.append(el), true);
    });
});

describe('test parallel circuit', function() {

    //class template
    class TCircuit extends jCircuit.ParallelCircuit {
        constructor() {
            super();
        }
        input() {
            this.saveInputData([[2, 3], [2, 3]]);
            return true;
        }
        process() {
            return new Promise((resolve, reject) => {
                super.process().then(result => {
                    this.saveProcessData(result);
                    resolve(result);
                });
            });
        }
        output() {
            return this.getProcessData();
        }
    }

    class TAddElement extends jCircuit.Element {
        constructor() {
            super('add');
        }
        input(data) {
            this.saveInputData(data);
            return true;
        }
        process() {
            const ipt_data = this.getInputData();
            this.saveProcessData(ipt_data.reduce((a, b) => a + b));
        }
        output() {
            return this.getProcessData();
        }
    }

    class TMultiElement extends jCircuit.Element {
        constructor() {
            super('multi');
        }
        input(data) {
            this.saveInputData(data);
            return true;
        }
        process() {
            const ipt_data = this.getInputData();
            this.saveProcessData(ipt_data.reduce((a, b) => a * b));
        }
        output() {
            return this.getProcessData();
        }
    }

    const circuit = new TCircuit();
    const addEl = new TAddElement();
    const multiEl = new TMultiElement();
    circuit.append([addEl, multiEl]);

    //append object extend Element
    circuit.input([[2, 3], [2, 3]]);
    it('output should return [5, 6], when append add and multi element width input [2, 3]', function(done) {
        circuit.process().then(() => {
            assert.deepEqual(circuit.output(), [5, 6]);
            done();
        });
    });
});
