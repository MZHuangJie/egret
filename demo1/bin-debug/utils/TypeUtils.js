var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    /**
     * 类型检验工具类
     */
    var TypeUtils = (function () {
        function TypeUtils() {
        }
        /**
         * 检测是否是字符串类型，注意new String检测不通过的
         */
        TypeUtils.isString = function (obj) {
            return typeof obj === 'string' && obj.constructor === String;
        };
        /**
         * 检测是不是数组
         */
        TypeUtils.isArray = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
        /**
         * 检测是不是数字，注意new Number不算进来
         */
        TypeUtils.isNumber = function (obj) {
            return typeof obj === 'number' && !isNaN(obj); // type NaN === 'number' 所以要去掉
        };
        /**
         * 是不是对象，数组也是一种对象
         */
        TypeUtils.isObject = function (obj) {
            return typeof obj === 'object';
        };
        return TypeUtils;
    }());
    lie.TypeUtils = TypeUtils;
    __reflect(TypeUtils.prototype, "lie.TypeUtils");
})(lie || (lie = {}));
//# sourceMappingURL=TypeUtils.js.map