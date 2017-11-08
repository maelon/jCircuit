/*===================================================================
#    FileName: line/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-08 10:12
===================================================================*/

import ILine from 'line/interface';

import ErrorEnum from 'const/error';

class Line extends ILine {

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
                if(this._switch_state === 'on') {
                    this._processElement(this, data).catch(error => {
                        if(error === ErrorEnum.ELEMENT_ERROR) {
                            console.log(ErrorEnum.LINE_EXECUTE_ERROR);
                        }
                    });
                }
                this._switch_state = flag;
                return true;
            }
        }
        return false;
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
                if(ret === MSGEnum.LINE_SWITCH_OFF || this._switch_state === 'off') {
                    return Promise.resolve(MSGEnum.LINE_SWITCH_OFF);
                }
                if(ret === MSGEnum.CIRCUIT_BREAK) {
                    return Promise.resolve(ret, name || elements[i].elementName);
                }
                return  this._processElement(elements[i], ret);
            });
        }
        return elements_promise;
    }
}

export default Line;
