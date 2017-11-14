/*===================================================================
#    FileName: line/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-08 10:12
===================================================================*/

import Circuit from 'circuit/index';
import ILine from 'line/interface';

import MSG_SIGNAL from 'const/index';
import ERROR_SIGNAL from 'const/error';
import utils from 'utils/index';

class Line extends utils.MixinInterface(Circuit, ILine) {

    /**
    * @constructor
    */
    constructor(name) {
        super(name);

        this._switch_state = 'off';
    }

    switch(flag, data) {
        if(['on', 'off'].includes(flag)) {
            if(flag != this._switch_state) {
                if(flag === 'on') {
                    this._processElement(this, data).then(ret => {
                        console.log('line over', ret);
                        this.saveProcessData(ret);
                    }).catch(error => {
                        if(error === ERROR_SIGNAL.ELEMENT_ERROR) {
                            console.log(ERROR_SIGNAL.LINE_EXECUTE_ERROR);
                        }
                    });
                }
                this._switch_state = flag;
                return true;
            }
        }
        return false;
    }

    append(elements) {
        return super.append(elements);
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
                console.log('line process',i , ret, name);
                if(ret === MSG_SIGNAL.LINE_SWITCH_OFF || this._switch_state === 'off') {
                    return Promise.resolve(MSG_SIGNAL.LINE_SWITCH_OFF);
                }
                if(ret === MSG_SIGNAL.CIRCUIT_BREAK) {
                    return Promise.resolve(ret, name || elements[i].elementName);
                }
                return  this._processElement(elements[i], ret);
            });
        }
        return elements_promise;
    }
}

export default Line;
