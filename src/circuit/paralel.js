/*===================================================================
#    FileName: paralel.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-10-13 12:19
# Description: Extend the base class Circuit.
===================================================================*/

import Circuit from 'circuit/index';

/**
* Parallelly process the stored elements.
* @class
*/
class ParallelCircuit extends Circuit {

    /**
    * @constructor
    */
    constructor() {
        super();
    }

    /**
    * @description Process elements stored in parallel.
    */
    process() {
        
    }

    _processElement(element) {
        const processor = element._run();
        //processor.next().then(ret => );
    }
}

export default ParallelCircuit;
