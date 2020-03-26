var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    /**
     * 事件分发工具类，异步操作用
     */
    var Dispatch = (function () {
        function Dispatch() {
        }
        /**
         * 注册对象
         * @param key 事件的唯一标志
         * @param obj 注册事件
         * @param replace 是否替换掉之前的回调
         */
        Dispatch.$register = function (key, obj, replace) {
            var self = Dispatch;
            var target = self.$targets[key];
            var isReg = !target || replace;
            isReg && (self.$targets[key] = obj);
            return isReg;
        };
        /**
         * 注册事件
         * @param key 事件的唯一标志
         * @param call 回调函数
         * @param thisObj 回调所属对象
         * @param replace 是否替换掉之前的回调
         */
        Dispatch.register = function (key, call, thisObj, replace) {
            return Dispatch.$register(key, [call, thisObj], replace);
        };
        /**
         * 通知，触发回调
         * @param key 事件标志
         * @param param 回调参数
         */
        Dispatch.notice = function (key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var target = Dispatch.$targets[key];
            target && target[0].apply(target[1], params);
        };
        /**
         * 移除事件
         */
        Dispatch.remove = function (key) {
            delete Dispatch.$targets[key];
        };
        /**
         * 是否注册了某个事件
         */
        Dispatch.hasRegister = function (key) {
            return !!Dispatch.$targets[key];
        };
        /**
         * 注册多个事件，统一回调，参数功能看register
         */
        Dispatch.registers = function (keys, call, thisObj, replace) {
            var obj = [call, thisObj];
            for (var i in keys) {
                var key = keys[i];
                Dispatch.$register(key, obj, replace);
            }
        };
        /**
         * 清除所有事件
         */
        Dispatch.clear = function () {
            Dispatch.$targets = {};
        };
        Dispatch.$targets = {}; // 存放所有回调函数
        return Dispatch;
    }());
    lie.Dispatch = Dispatch;
    __reflect(Dispatch.prototype, "lie.Dispatch");
})(lie || (lie = {}));
//# sourceMappingURL=Dispatch.js.map