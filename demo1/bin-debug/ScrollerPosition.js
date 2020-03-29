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
var ScrollerPosition = (function (_super) {
    __extends(ScrollerPosition, _super);
    function ScrollerPosition() {
        var _this = _super.call(this) || this;
        var scroller = new eui.Scroller();
        scroller.height = 750;
        scroller.width = 1334;
        scroller.viewport = _this.scrollGroup;
        _this.addChild(scroller);
        _this.scroller = scroller;
        return _this;
        //创建一个按钮，点击后改变 Scroller 滚动的位置
        // var btn = new eui.Button();
        // btn.x = 200;
        // this.addChild(btn);
    }
    return ScrollerPosition;
}(eui.UILayer));
__reflect(ScrollerPosition.prototype, "ScrollerPosition");
//# sourceMappingURL=ScrollerPosition.js.map