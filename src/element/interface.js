/*===================================================================
#    FileName: element/interface.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-06 09:51
# Description: The interface of element.
===================================================================*/

/**
 * The interface of element
 * @class
 */
class Interface {

    /**
     * @abstract
     * @param {*} data - The input data.
     * @return {Promise|boolean} - Return true will enter next process or not will break or a promise.
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
     * @return {Promise|*} - Return the output data.
     */
    output() {
        throw new Error('must be implemented by subclass!');
    }
}

export default Interface;
