var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    /**
     * 存放和获取一些本地变量名，属于应用级别上的存储
     */
    var LocalData = (function () {
        function LocalData() {
        }
        /**
         * 设置Item
         */
        LocalData.setItem = function (key, value) {
            return egret.localStorage.setItem(key, value);
        };
        /**
         * 获取Item的值
         */
        LocalData.getItem = function (key) {
            return egret.localStorage.getItem(key);
        };
        /**
         * 注意value必须是对象，否则会出现奇怪的现象
         */
        LocalData.setObject = function (key, value) {
            return LocalData.setItem(key, JSON.stringify(value));
        };
        /**
         * 获取一个对象
         */
        LocalData.getObject = function (key) {
            var value = LocalData.getItem(key);
            return value && JSON.parse(value);
        };
        return LocalData;
    }());
    lie.LocalData = LocalData;
    __reflect(LocalData.prototype, "lie.LocalData");
})(lie || (lie = {}));
//# sourceMappingURL=LocalData.js.map