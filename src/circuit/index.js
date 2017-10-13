/*===================================================================
#    FileName: circuit/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-29 11:32
# Description: A circuit consist of some elements or circuits.
               It extends element, but has more features: serial and parallel flow.
               So, it has one input, output and process in the same way.
===================================================================*/

import Element from 'element/index';

class Circuit extends Element {
    constructor() {
        super();
    }

    input(data) {
        throw new Error('must be implemented by subclass!');
    }

    process() {
        throw new Error('must be implemented by subclass!');
    }

    output() {
        throw new Error('must be implemented by subclass!');
    }

    append(elements) {
        throw new Error('must be implemented by subclass!');
    }
}

export default Circuit;
