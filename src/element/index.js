/*===================================================================
#    FileName: element/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:21
# Description: The base unit of jCircuit.
===================================================================*/

'use strict';

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
    }

    /**
     * @abstract
     * @param {*} data - The input data.
     * @return {boolean} - Return true will enter next process or not will break.
     * @description The entry of the element.
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
     * @return {*} data - The output data.
     */
    output() {
        throw new Error('must be implemented by subclass!');
    }

    _run() {
        return {
            'next': () => {
                if(this._next === 'input') {
                    const whether = this.input(...arguments);
                    this._next = whether ? 'process' : 'done';
                    return { 'value': undefined, 'done': whether }
                } else if(this._next === 'process') {
                    this._next = 'output';
                    return { 'value': this.input(), 'done': false }
                } else if(this._next === 'output') {
                    this._state = 'done';
                    return { 'value': this.output(), 'done': true }
                } else if(this._state === 'done') {
                    return { 'value': undefined, 'done': true }
                }
            }
        };
    }
}

export default Element;
