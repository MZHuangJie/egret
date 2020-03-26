var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    //日志打印
    var LogUtil = (function () {
        function LogUtil() {
        }
        LogUtil.log = function (message, content) {
            if (!this.debug) {
                return;
            }
            content ? console.log(message, content) : console.log(message);
        };
        LogUtil.debug = true;
        return LogUtil;
    }());
    lie.LogUtil = LogUtil;
    __reflect(LogUtil.prototype, "lie.LogUtil");
})(lie || (lie = {}));
//# sourceMappingURL=LogUtil.js.map