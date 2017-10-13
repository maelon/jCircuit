/*===================================================================
#    FileName: paralel.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-10-13 12:19
===================================================================*/

import Circuit from 'circuit/index';

class ParalelCircuit extends Circuit {
    constructor() {
        super();

        this._elements = undefined;
    }

    input(data) {
        throw new Error('must be implemented by subclass!');
    }

    process() {
    }

    output() {
        throw new Error('must be implemented by subclass!');
    }

    append(elements) {
    }
}

export default ParalelCircuit;
