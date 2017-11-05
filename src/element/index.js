/*===================================================================
#    FileName: element/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:21
# Description: The base unit of jCircuit.
===================================================================*/

/**
 * The base unit of a circuit.
 * It's composed of input, output and process, like a electrical element.
 * One element only contains one input, and one output, and one process.
 * The input starts process.
 * The output is called by process when it is done.
 * @class
 */
class Element {
    /**
     * Create an element.
     * @constructor
     */
    constructor() {
        this._next = 'input';

        this._data_source = undefined;
        this._data_result = undefined;
    }

    /**
     * @abstract
     * @param {*} data - The input data.
     * @return {Promise|boolean} - Return true will enter next process or not will break or a promise.
     * @description The entry of the element.
     * return Element;
     */
    input(data) {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * @abstract
     * @return {Promise|undefined} - Return a promise object for asynchronous process or undefined for synchronous.
     */
    process() {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * @abstract
     * @return {Promise|*} data - Return the output data.
     */
    output() {
        throw new Error('must be implemented by subclass!');
    }

    set dataSource(data) {
        this._data_source = data;
    }

    get dataSource() {
        return this._data_source;
    }

    set dataResult(data) {
        this._data_result = data;
    }

    get dataResult() {
        return this._data_result;
    }

    _run() {
        return {
            'next': () => {
                if(this._next === 'input') {
                    const ret = this.input(...arguments);
                    return new Promise((resolve, reject) => {
                        Promise.resolve(ret).then(ipt => {
                            this._next = whether ? 'process' : 'done';
                            resolve({ 'value': ipt, 'done': !whether });
                        });
                    });
                } else if(this._next === 'process') {
                    const ret = this.process();
                    return new Promise((resolve, reject) => {
                        Promise.resolve(ret).then(() => {
                            this._next = 'output';
                            resolve({ 'value': undefined, 'done': false });
                        });
                    });
                } else if(this._next === 'output') {
                    const ret = this.output();
                    return new Promise((resolve, reject) => {
                        Promise.resolve(ret).then(opt => {
                            this._next = 'done';
                            resolve({ 'value': opt, 'done': true });
                        });
                    });
                }
                return Promise.resolve({ 'value': undefined, 'done': true });
            }
        };
    }
}

export default Element;
