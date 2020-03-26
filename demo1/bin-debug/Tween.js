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
/// 代码段 A
var Tween = (function (_super) {
    __extends(Tween, _super);
    function Tween() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Tween.prototype.onAddToStage = function (event) {
        // loading图标
        this.loadingImage = new egret.Bitmap();
        this.loadingImage.texture = RES.getRes('load_tex_png');
        //设置锚点
        this.loadingImage.anchorOffsetX = this.loadingImage.width / 2;
        this.loadingImage.anchorOffsetY = this.loadingImage.height / 2;
        this.loadingImage.x = this.width / 2;
        this.loadingImage.y = this.height / 2 - 100;
        this.addChild(this.loadingImage);
        // var tw = egret.Tween.get(  );
        // tw.to( {x:150}, 1000 );
    };
    return Tween;
}(egret.DisplayObjectContainer));
__reflect(Tween.prototype, "Tween");
//# sourceMappingURL=Tween.js.map