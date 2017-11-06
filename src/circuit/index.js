/*===================================================================
#    FileName: index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-06 10:33
# Description: The base class of circuit.
===================================================================*/

import Element from 'element/index';

/**
* The base circuit class.
* Circuit extends Element.
*/
class Circuit extends Element {
    /**
    * @constructor
    */
    constructor() {
        super();

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
}

export default Circuit;
