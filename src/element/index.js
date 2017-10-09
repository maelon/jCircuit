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
}

export default Element;
