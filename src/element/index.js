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
     * @param {*} data - The input data
     * @description After this will enter next process.
    */
    input(data) {
    }

    process() {
    }
}

export default Element;
