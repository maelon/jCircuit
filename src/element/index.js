/*===================================================================
#    FileName: element/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:21
# Description: The base unit of jCircuit.
===================================================================*/

import IElement from 'element/interface';
import utils from 'utils';

/**
 * The base unit of a circuit.
 * It's composed of input, output and process, like a electrical element.
 * One element only contains one input, and one output, and one process.
 * The input starts process.
 * The output is called by process when it is done.
 * @class
 */
class Element extends IElement {
    /**
     * Create an element.
     * @constructor
     */
    constructor(name) {
        super();

        this._name = name.toString();
        this._data_input = undefined;
        this._data_process = undefined;
        this._data_output = undefined;
    }

    /**
     * @param {*} data - The input data.
     * @return {Promise|boolean} - Return true will enter next process or not will break or a promise.
     * @description The entry of the element. At last, you should call setter function dataSource to save input data;
     */
    input(data) {
    }

    /**
     * @return {Promise|undefined} - Return a promise object for asynchronous process or undefined for synchronous.
     * @description In this, you can call getter function dataSource to get input data. At last, you should also call setter function dataResult to save processed data.
     */
    process() {
    }

    /**
     * @return {Promise|*} data - Return the output data.
     * @description In this, you can call getter function dataResult to get processed data. At last, you should return the filnal data.
     */
    output() {
    }

    /**
    * @return {string} - Return the name of the element.
    */
    get elementName() {
        return this._name;
    }

    saveInputData(data) {
        this._data_input = data;
    }

    getInputData() {
        return utils.clone(this._data_input);
    }

    saveProcessData(data) {
        this._data_process = data;
    }

    getProcessData() {
        return utils.clone(this._data_process);
    }

    saveOutputData(data) {
        this._data_output = data;
    }

    getOutputData() {
        return utils.clone(this._data_output);
    }
}

export default Element;
