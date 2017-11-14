/*===================================================================
#    FileName: utils/index.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-02 15:55
# Description: utils for jcircuit
===================================================================*/

const utils = {
    clone(obj) {
        if(typeof obj == "function" || Object(obj) !== obj) {
            return obj;
        }
        const res = new obj.constructor();
        for(let key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = this.clone(obj[key]);
            }
        }
        return res;
    },

    MixinInterface(cls, itf) {
        class MixinClass extends cls {
            constructor() {
                super(...arguments);
            }
        }
        const itf_protoKeys = Object.getOwnPropertyNames(itf.prototype);
        itf_protoKeys.forEach(key => {
            if(key !== 'constructor') {
                Object.defineProperty(MixinClass.prototype, key, Object.getOwnPropertyDescriptor(itf.prototype, key));
            }
        });
        return MixinClass;
    }
};

export default utils;
