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
        input(data) {
            this.saveInputData(data);
            return true;
        }
        process() {
            return super.process().then(result => {
                this.saveProcessData(result);
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

    class TMultiBreakElement extends jCircuit.Element {
        constructor() {
            super('multi_break');
        }
        input(data) {
            return false;
        }
        process() {
            const ipt_data = this.getInputData();
            this.saveProcessData(ipt_data.reduce((a, b) => a * b));
        }
        output() {
            return this.getProcessData();
        }
    }

    //append all executed elements
    it('output should return [5, 6], when append add and multi element width input [2, 3]', function(done) {
        const circuit = new TCircuit();
        const addEl = new TAddElement();
        const multiEl = new TMultiElement();
        circuit.append([addEl, multiEl]);
        circuit.input([[2, 3], [2, 3]]);
        circuit.process().then(() => {
            assert.deepEqual(circuit.output(), [5, 6]);
            done();
        });
    });

    //append break element
    it('output should return [5, MSG_SIGNAL.ELEMENT_INPUT_REJECT], when append add and break multi element width input [2, 3]', function(done) {
        const circuit = new TCircuit();
        const addEl = new TAddElement();
        const multiEl = new TMultiBreakElement();
        circuit.append([addEl, multiEl]);
        circuit.input([[2, 3], [2, 3]]);
        circuit.process().then(() => {
            assert.deepEqual(circuit.output(), [5, jCircuit.MSG_SIGNAL.ELEMENT_INPUT_REJECT]);
            done();
        });
    });
});

describe('test serial circuit', function() {

    //class template
    class TCircuit extends jCircuit.SerialCircuit {
        constructor() {
            super();
        }
        input(data) {
            this.saveInputData(data);
            return true;
        }
        process() {
            return super.process().then(result => {
                this.saveProcessData(result);
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
            this.saveProcessData(ipt_data + 1);
        }
        output() {
            return this.getProcessData();
        }
    }

    class TAddBreakElement extends jCircuit.Element {
        constructor() {
            super('add');
        }
        input(data) {
            return false;
        }
        process() {
            const ipt_data = this.getInputData();
            this.saveProcessData(ipt_data + 1);
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
            this.saveProcessData(ipt_data * 2);
        }
        output() {
            return this.getProcessData();
        }
    }

    class TMultiBreakElement extends jCircuit.Element {
        constructor() {
            super('multi_break');
        }
        input(data) {
            return false;
        }
        process() {
            const ipt_data = this.getInputData();
            this.saveProcessData(ipt_data * 2);
        }
        output() {
            return this.getProcessData();
        }
    }

    //append all executed elements
    it('output should return 12, when append add 1 and multi 2 element width input 5', function(done) {
        const circuit = new TCircuit();
        const addEl = new TAddElement();
        const multiEl = new TMultiElement();
        circuit.append([addEl, multiEl]);
        circuit.input(5);
        circuit.process().then(() => {
            assert.strictEqual(circuit.output(), 12);
            done();
        });
    });

    //append break element
    it('output should return MSG_SIGNAL.ELEMENT_INPUT_REJECT, when append break add 1 and multi 2 element width input 5', function(done) {
        const circuit = new TCircuit();
        const addEl = new TAddBreakElement();
        const multiEl = new TMultiElement();
        circuit.append([addEl, multiEl]);
        circuit.input(5);
        circuit.process().then(() => {
            assert.strictEqual(circuit.output(), jCircuit.MSG_SIGNAL.ELEMENT_INPUT_REJECT);
            done();
        });
    });
});

