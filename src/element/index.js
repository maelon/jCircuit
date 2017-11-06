/*===================================================================
#    FileName: element/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:21
# Description: The base unit of jCircuit.
===================================================================*/

import IElement from 'element/interface';

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
    constructor() {
        this._next = 'input';

        this._data_source = undefined;
        this._data_result = undefined;
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
                            this._next = ret ? 'process' : 'done';
                            resolve({ 'value': ipt, 'done': !ret });
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
