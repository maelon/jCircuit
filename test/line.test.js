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
        process() {
            return super.process().then(result => {
                this.saveProcessData(result);
            });
        }
        output() {
            return this.getProcessData();
        }
    }

    class TPCircuit extends jCircuit.ParallelCircuit {
        constructor() {
            super('pcircuit');
        }
        input(data) {
            this.saveInputData([data, data]);
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
            this.saveInputData([data, 1]);
            return true;
        }
        process() {
            const ipt_data = this.getInputData();
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.saveProcessData(ipt_data.reduce((a, b) => a + b));
                    resolve();
                }, 200);
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
            this.saveInputData([data, 2]);
            return true;
        }
        process() {
            const ipt_data = this.getInputData();
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.saveProcessData(ipt_data.reduce((a, b) => a * b));
                    resolve();
                }, 300);
            });
        }
        output() {
            return this.getProcessData();
        }
    }

    /***
    |----------------------------------------------------------------line----------------------------------------------------------------|
                 |-----------------------------serial---------------------------------|-----------------parallel------------------|
                           |-------------------process---------------------|                    |-------process--------|
    switch input | input---|(input process output)---(input process output)|---output | input---|(input process output)|---output | output
                                                                                                |(input process output)|
    ***/
    //switch on
    it('output should return [5, 8], when add 1 and multi 2 process overs.', function(done) {
        const line = new TLine('test');
        const s = new TSCircuit();
        s.append([new TAddElement('s_add'), new TMultiElement('s_multi')]);
        const p = new TPCircuit();
        p.append([new TAddElement('p_add'), new TMultiElement('p_multi')]);
        line.append([s, p]);
        line.switch('on', 1);
        setTimeout(() => {
            assert.deepEqual(line.output(), [5, 8]);
            done();
        }, 1500);
    });

    //switch off
    it('output should return MSG_SIGNAL.LINE_SWITCH_OFF, when switch off', function() {
        const line = new TLine('test');
        const s = new TSCircuit();
        s.append([new TAddElement('s_add'), new TMultiElement('s_multi')]);
        const p = new TPCircuit();
        p.append([new TAddElement('p_add'), new TMultiElement('p_multi')]);
        line.append([s, p]);
        line.switch('on', 1);
        setTimeout(() => {
            line.switch('off');
            assert.deepEqual(line.output(), jCircuit.MSG_SIGNAL.LINE_SWITCH_OFF);
            done();
        }, 500);
    });
});
