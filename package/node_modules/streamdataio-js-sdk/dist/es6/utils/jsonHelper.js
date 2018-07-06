var JsonHelper = (function () {
    function JsonHelper() {
    }
    JsonHelper.validate = function (stringObj) {
        try {
            JsonHelper.parse(stringObj);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    JsonHelper.parse = function (stringObj) {
        try {
            return JSON.parse(stringObj);
        }
        catch (err) {
            return stringObj;
        }
    };
    JsonHelper.stringify = function (obj) {
        return obj ? JSON.stringify(obj) : 'undefined';
    };
    return JsonHelper;
}());
export { JsonHelper };
//# sourceMappingURL=jsonHelper.js.map