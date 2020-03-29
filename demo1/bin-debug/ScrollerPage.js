var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ScrollerPage = (function (_super) {
    __extends(ScrollerPage, _super);
    function ScrollerPage() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.slideEvent, _this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.tabPage, this)
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.tabPage, _this);
        _this.skinName = skins.Preslide;
        return _this;
    }
    ScrollerPage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("createChildren");
    };
    ScrollerPage.prototype.onComplete = function () {
        console.log("onComplete");
        this.slide.play();
    };
    ScrollerPage.prototype.slideEvent = function (evt) {
        this.startX = evt.localX;
    };
    ScrollerPage.prototype.tabPage = function (evt) {
        var _this = this;
        var currentX = evt.localX;
        if (currentX - this.startX < 0) {
            // this.anchorOffsetX -= 5;
            this.slideLeft = setInterval(function () {
                _this.x -= 5;
                if (_this.x <= -1334) {
                    clearInterval(_this.slideLeft);
                }
            }, 10);
        }
    };
    return ScrollerPage;
}(eui.Component));
__reflect(ScrollerPage.prototype, "ScrollerPage");
//# sourceMappingURL=ScrollerPage.js.map