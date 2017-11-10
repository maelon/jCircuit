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
        const itf_proto = {};
        const itf_protoKeys = Object.getOwnPropertyNames(itf.prototype);
        itf_protoKeys.forEach(key => {
            if(key !== 'constructor') {
                itf_proto[key] = itf.prototype[key];
            }
        });
        const cls_proto = {};
        const cls_protoKeys = Object.getOwnPropertyNames(cls.prototype);
        cls_protoKeys.forEach(key => {
            if(key !== 'constructor') {
                cls_proto[key] = cls.prototype[key];
            }
        });
        return Object.create(Object.assign({}, cls_proto, itf_proto));
    }
};

export default utils;
