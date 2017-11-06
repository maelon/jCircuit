/*===================================================================
#    FileName: element/interface.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-05 11:43
# Description: interface for element
===================================================================*/

/**
 * The base unit of a circuit.
 * It's composed of input, output and process, like a electrical element.
 * One element only contains one input, and one output, and one process.
 * The input starts process.
 * The output is called by process when it is done.
 * @class
 */
class Interface {

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
}

export default Interface;
