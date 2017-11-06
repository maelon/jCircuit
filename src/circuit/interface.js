/*===================================================================
#    FileName: circuit/interface.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:32
# Description: A circuit consist of some elements or circuits.
               It extends interface of element, but has more features: append.
               So, it has one input, output and process in the same way.
===================================================================*/

import IElement from 'element/interface';

/**
 * Composed by somes IElement.
 * @class
*/
class Interface extends IElement {
    /**
    * @abstract
    * @param {Element|Array<Element>} The appended elements;
    * @return {boolean} Whether elements appended is successful.
    */
    append(elements) {
        throw new Error('must be implemented by subclass!');
    }
}

export default Interface;
