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
var lie;
(function (lie) {
    /**
     * 自带清理方法的控件
     */
    var UIComponent = (function (_super) {
        __extends(UIComponent, _super);
        function UIComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.onLoad();
        };
        UIComponent.prototype.childrenCreated = function () {
            this.onCreate();
        };
        UIComponent.prototype.$onRemoveFromStage = function () {
            this.isDestroy = true;
            this.onDestroy();
            _super.prototype.$onRemoveFromStage.call(this);
        };
        /**
         * 仅在组件第一次添加到舞台时回调一次
         */
        UIComponent.prototype.onLoad = function () {
        };
        /**
         * 控件进入场景时回调
         */
        UIComponent.prototype.onCreate = function () {
        };
        /**
         * 控件离开场景时回调——onRemoveFromStage实际意义上应该是私有函数，如果没有
         * 写上super.XXX，它没办法有效移除，为避免出错，才有该函数存在
         */
        UIComponent.prototype.onDestroy = function () {
        };
        /**
         * 从父控件移除
         */
        UIComponent.prototype.removeFromParent = function () {
            var self = this;
            var parent = self.parent;
            parent && parent.removeChild(self);
        };
        /**
         * 层级变化——被覆盖，AppViews
         */
        UIComponent.prototype.onHide = function () {
        };
        /**
         * 层级变化——显示，AppViews
         */
        UIComponent.prototype.onShow = function () {
        };
        return UIComponent;
    }(eui.Component));
    lie.UIComponent = UIComponent;
    __reflect(UIComponent.prototype, "lie.UIComponent");
    /**
     * 锚点在中心的图片
     */
    var CenImage = (function (_super) {
        __extends(CenImage, _super);
        function CenImage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CenImage.prototype.$setTexture = function (texture) {
            var width = 0, height = 0;
            if (texture) {
                width = texture.textureWidth;
                height = texture.textureHeight;
            }
            this.anchorOffsetX = width / 2;
            this.anchorOffsetY = height / 2;
            return _super.prototype.$setTexture.call(this, texture);
        };
        return CenImage;
    }(eui.Image));
    lie.CenImage = CenImage;
    __reflect(CenImage.prototype, "lie.CenImage");
    /**
     * App的视图
     */
    var AppComponent = (function (_super) {
        __extends(AppComponent, _super);
        function AppComponent(skinName) {
            var _this = _super.call(this) || this;
            skinName && (_this.skinName = AppConfig.getSkin(skinName));
            return _this;
        }
        return AppComponent;
    }(UIComponent));
    lie.AppComponent = AppComponent;
    __reflect(AppComponent.prototype, "lie.AppComponent");
})(lie || (lie = {}));
//# sourceMappingURL=UIComponent.js.map