/*===================================================================
#    FileName: circuit/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-06 10:33
# Description: The base class of circuit.
===================================================================*/

import Element from 'element/index';

import MSG_SIGNAL from 'const/index';
import ERROR_SIGNAL from 'const/error';

/**
* The base circuit class.
* Circuit extends Element.
*/
class Circuit extends Element {
    /**
    * @constructor
    */
    constructor(name) {
        super(name);

        this._elements = undefined;
    }

    /**
    * Append Elements.
    * @param {Element|Array<Element>} Elements needed to append.
    * @description You shoud append instance implements IElement, or return false.
    */
    append(elements) {
        if(this._checkElementExtended(elements)) {
            Array.isArray(elements) ? this._elements.push(...elements) : this._elements.push(elements);
            return true;
        }
        return false;
    }

    /**
    * @description The getter function to get stored elements.
    */
    get elements() {
        return this._elements;
    }

    _checkElementExtended(elements) {
        if(Array.isArray(elements)) {
            return elements.every(element => element instanceof Element);
        } else {
            return elements instanceof Element;
        }
    }

    _processElement(element, ipt_data) {
        return new Promise((resolve, reject) => {
            try {
                const ret_ipt = element.input(ipt_data);
                Promise.resolve(ret_ipt).then(ipt => {
                    if(ipt) {
                        const ret_pcs = element.process();
                        Promise.resolve(ret_pcs).then(() => {
                            const ret_opt = element.output();
                            Promise.resolve(ret_opt).then(opt => {
                                resolve(opt);
                            });
                        });
                    } else {
                        resolve(MSG_SIGNAL.ELEMENT_INPUT_REJECT);
                    }
                });
            } catch(e) {
                reject(ERROR_SIGNAL.ELEMENT_ERROR);
            }
        });
    }
}

export default Circuit;
