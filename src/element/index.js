/*===================================================================
#    FileName: element/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:21
# Description: The base unit of jCircuit.
===================================================================*/

import IElement from 'element/interface';

import MSG_SIGNAL from 'const/index';
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
        this._data_input = MSG_SIGNAL.NO_VALUE;
        this._data_process = MSG_SIGNAL.NO_VALUE;
        this._data_output = MSG_SIGNAL.NO_VALUE;
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

    /**
    * @param {Object} data - The data to be saved.
    * @description At the last of input, should call this to save treated data.
    */
    saveInputData(data) {
        this._data_input = data;
    }

    /**
    * @return {Object} data - Return the treated input data.
    */
    getInputData() {
        if(this._data_input === MSG_SIGNAL.NO_VALUE) {
            throw new Error(ERROR_SIGNAL.GETDATA_INPUT_ERROR);
        }
        return utils.clone(this._data_input);
    }

    /**
    * @param {Object} data - The data to be saved.
    * @description At the last of process, should call this to save treated process data.
    */
    saveProcessData(data) {
        this._data_process = data;
    }

    /**
    * @return {Object} data - Return the treated process data.
    */
    getProcessData() {
        if(this._data_process === MSG_SIGNAL.NO_VALUE) {
            throw new Error(ERROR_SIGNAL.GETDATA_PROCESS_ERROR);
        }
        return utils.clone(this._data_process);
    }

    /**
    * @param {Object} data - The data to be saved.
    * @description At the last of output, should call this to save treated output data.
    */
    saveOutputData(data) {
        this._data_output = data;
    }

    /**
    * @return {Object} data - Return the treated output data.
    */
    getOutputData() {
        if(this._data_output === MSG_SIGNAL.NO_VALUE) {
            throw new Error(ERROR_SIGNAL.GETDATA_OUTPUT_ERROR);
        }
        return utils.clone(this._data_output);
    }
}

export default Element;
