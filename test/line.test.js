const assert = require('assert');

const jCircuit = require('../dist/main.min').default;

describe('test line', function() {

    //class template
    class TLine extends jCircuit.Line {
        constructor(name) {
            super(name);
        }
        input(data) {
            this.saveInputData(data);
            return true;
        }
    }

    class TPCircuit extends jCircuit.ParallelCircuit {
        constructor() {
            super('pcircuit');
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

    class TSCircuit extends jCircuit.SerialCircuit {
        constructor() {
            super('scircuit');
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
        constructor(name) {
            super(name || 'add');
        }
        input(data) {
            this.saveInputData(data);
            return true;
        }
        process() {
            const ipt_data = this.getInputData();
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.saveProcessData(ipt_data.reduce((a, b) => a + b));
                    resolve();
                }, 1000);
            });
        }
        output() {
            return this.getProcessData();
        }
    }

    class TMultiElement extends jCircuit.Element {
        constructor(name) {
            super(name || 'multi');
        }
        input(data) {
            this.saveInputData(data);
            return true;
        }
        process() {
            const ipt_data = this.getInputData();
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.saveProcessData(ipt_data.reduce((a, b) => a * b));
                    resolve();
                }, 1000);
            });
        }
        output() {
            return this.getProcessData();
        }
    }

    //switch on
    it('getOutputData should return [5, 8], when add 1 and multi 2 process overs.', function(done) {
        const line = new TLine('test');
        const s = new TSCircuit();
        s.append([new TAddElement('s_add'), new TAddElement('s_multi')]);
        const p = new TPCircuit();
        p.append([new TAddElement('p_add'), new TAddElement('p_multi')]);
        line.append([s, p]);
        line.switch('on', 1);
        setTimeout(() => {
            assert.deepEqual(line.output(), [5, 8]);
        });
    });

    //switch off
    //it('getInputData should return 1, when input width param 1', function() {
        //assert.strictEqual(el.getInputData(), 1);
    //});
});
