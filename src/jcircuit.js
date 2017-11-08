/*===================================================================
#    FileName: jcircuit.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-09-02 11:13
# Description: jCircuit main class.
===================================================================*/

import IElement from 'element/interface';
import Element from 'element/index';

import ICircuit from 'circuit/interface';
import Circuit from 'circuit/index';
import ParallelCircuit from 'circuit/parallel';
import SerialCircuit from 'circuit/serial';

import ILine from 'line/interface';
import Line from 'line/index';

import MSG_SIGNAL from 'const/index';
import ERROR_SIGNAL from 'const/error';

/**
* jCircuit is a simple javascript framework.
* It works like circuit.
*/
class JCircuit {
    static get IElement() {
        return IElement;
    }

    static get Element() {
        return Element;
    }

    static get ICircuit() {
        return ICircuit;
    }

    static get Circuit() {
        return Circuit;
    }

    static get ParallelCircuit() {
        return ParallelCircuit;
    }

    static get SerialCircuit() {
        return SerialCircuit;
    }

    static get ILine() {
        return ILine;
    }

    static get Line() {
        return Line;
    }

    static get MSG_SIGNAL() {
        return MSG_SIGNAL;
    }

    static get ERROR_SIGNAL() {
        return ERROR_SIGNAL;
    }
}

export default JCircuit;
