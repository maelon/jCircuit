/*===================================================================
#    FileName: line/interface.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-07 10:57
# Description: work line with a switch consists of some elements or circuits.
===================================================================*/

import ICircuit from 'circuit/interface';

/**
* Line likes workflow, consists of some elements or circuits.
* @class
*/
class Line extends ICircuit {

    /**
    * @param {string} flag - 'on' will start to process the line, 'off' will stop the line immediately.
    * @param {Object} data - The initial data.
    */
    switch(flag, data) {
        throw new Error('must be implemented by subclass!');
    }
}

export default Line;
