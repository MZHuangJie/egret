var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    // 记录平台通用接口以及方法
    var PlatformUtils = (function () {
        function PlatformUtils() {
        }
        /**
         * 播放音效——可能平台播放音效有差异，暂放这里
         */
        PlatformUtils.playEffect = function (res, loop) {
            if (loop === void 0) { loop = 1; }
            return AppConfig.isOpenMusic() && RES.getRes(res).play(0, loop);
        };
        return PlatformUtils;
    }());
    lie.PlatformUtils = PlatformUtils;
    __reflect(PlatformUtils.prototype, "lie.PlatformUtils");
})(lie || (lie = {}));
//# sourceMappingURL=PlatformUtils.js.map