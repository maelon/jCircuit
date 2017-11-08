/*===================================================================
#    FileName: error.js
#      Author: Maelon.J
#       Email: maelon.j@gmail.com
#  CreateTime: 2017-11-07 10:19
# Description: The enum of errors
===================================================================*/

class ErrorEnum {

    static get GETDATA_INPUT_ERROR() {
        return 'you should call function saveInputData in function input first!';
    }

    static get GETDATA_PROCESS_ERROR() {
        return 'you should call function saveProcessData in function process first!';
    }

    static get GETDATA_OUTPUT_ERROR() {
        return 'you should call function saveOutputData in function output first!';
    }

    static get ELEMENT_ERROR() {
        return 'when execute element, error happened!';
    }

    static get PARALLELCIRCUIT_INPUT_DATA_ARRAY_TYPE() {
        return 'error type of parallel circuit input data, it should be an array!';
    }

    static get PARALLELCIRCUIT_INPUT_DATA_ARRAY_LENGTH() {
        return 'error length of parallel circuit input data, it equals length of elements!';
    }

    static get PARALLELCIRCUIT_PROCESS_DATA_ARRAY_TYPE() {
        return 'error type of parallel circuit process data, it should be an array!';
    }

    static get PARALLELCIRCUIT_PROCESS_DATA_ARRAY_LENGTH() {
        return 'error length of parallel circuit process data, it equals length of elements!';
    }

    static get PARALLELCIRCUIT_OUTPUT_DATA_ARRAY_TYPE() {
        return 'error type of parallel circuit output data, it should be an array!';
    }

    static get PARALLELCIRCUIT_OUTPUT_DATA_ARRAY_LENGTH() {
        return 'error length of parallel circuit output data, it equals length of elements!';
    }

    static get LINE_EXECUTE_ERROR() {
        return 'when execute line, error happened';
    }
}

export default ErrorEnum;
