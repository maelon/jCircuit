/*===================================================================
#    FileName: serial.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-10-13 12:21
# Description: Extend the base class of Circuit.
===================================================================*/

import Circuit from 'circuit/index';

import MSGEnum from 'const/index';

/**
* Serially process the stored elements.
* @class
*/
class SerialCircuit extends Circuit {

    /**
    * @constructor
    */
    constructor() {
        super();
    }

    /**
    * @description Process elements stored in serial.
    */
    process() {
        const elements = this.elements.slice();
        const data = this.getInputData();
        let elements_promise = Promise.resolve(data);
        for(let i = 0; i < elements.length; i++) {
            elements_promise = elements_promise.then((ret, name) => {
                if(ret === MSGEnum.ELEMENT_INPUT_REJECT) {
                    return Promise.resolve(ret, name || elements[i].elementName);
                }
                return  this._processElement(elements[i], ret);
            });
        }
        return elements_promise;
    }
}

export default SerialCircuit;
