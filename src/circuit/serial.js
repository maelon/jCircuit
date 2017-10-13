/*===================================================================
#    FileName: serial.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-10-13 12:21
===================================================================*/

import Circuit from 'circuit/index';

class SerialCircuit extends Circuit {
    constructor() {
        super();
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

export default SerialCircuit;
