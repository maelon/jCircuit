/*===================================================================
#    FileName: jcircuit.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-02 11:13
# Description: jCircuit主类
===================================================================*/
import 'babel-polyfill';

'use strict';

/**
* jCircuit is a simple javascript framework.
* It works like circuit.
*/
class JCircuit {

    /**
    * @construcor
    *
    */
    constructor() {
    }

    * _run() {
        yield 1;
        yield 2;
        yield 3;
    }
}

const a = new JCircuit();
const g = a._run();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

export default JCircuit;
