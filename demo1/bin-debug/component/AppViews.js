var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    var app; // 存放单例
    /**
     * 应用的视图管理类
     */
    var AppViews = (function () {
        function AppViews() {
        }
        /**
         * 初始化
         */
        AppViews.prototype.init = function () {
            var self = this;
            var clzz = AppViews;
            clzz.stage.removeChildren();
            self.$panelLevel = self.addLevel('panel');
            self.$dialogLevel = self.addLevel('dialog');
            self.$topLevel = self.addLevel('top');
            // 回调
            var datas = clzz.callData;
            datas && self.excuteCall(datas[0], datas[1]);
            clzz.callData = null;
        };
        Object.defineProperty(AppViews, "stage", {
            /**
             * 获取舞台
             */
            get: function () {
                return egret.sys.$TempStage; // egret.MainContext.instance.stage
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppViews.prototype, "panelLevel", {
            /**
             * 获取面板层
             */
            get: function () {
                return this.$panelLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppViews.prototype, "dialogLevel", {
            /**
             * 获取对话框层
             */
            get: function () {
                return this.$dialogLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppViews.prototype, "topLevel", {
            /**
             * 获取最顶层，注：顶层的东西随便加，记得清理
             */
            get: function () {
                return this.$topLevel;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加层
         * @param name 名称
         */
        AppViews.prototype.addLevel = function (name) {
            var stage = AppViews.stage;
            var container = new egret.DisplayObjectContainer;
            container.name = name;
            container.width = stage.stageWidth;
            container.height = stage.stageHeight;
            stage.addChild(container);
            return container;
        };
        /**
         * 获取层
         */
        AppViews.prototype.getLevel = function (name) {
            return AppViews.stage.getChildByName(name);
        };
        /**
         * 执行回调
         */
        AppViews.prototype.excuteCall = function (call, thisObj) {
            call && call.call(thisObj);
        };
        /**
         * 获取视图管理类单例
         */
        AppViews.app = function () {
            if (!app) {
                app = new AppViews;
                app.init();
            }
            return app;
        };
        /**
         * 添加初始化后回调，如果已经初始化，则立即执行
         */
        AppViews.addInitCall = function (call, thisObj) {
            if (app)
                app.excuteCall(call, thisObj);
            else
                AppViews.callData = [call, thisObj];
        };
        // 重点，层及控制管理体现
        /**
         * 插入一个控件，并居中
         * @param attr AppViews对象的属性名
         * @param clzz 需要添加的对象类
         */
        AppViews.pushChild = function (attr, clzz, data) {
            var self = AppViews;
            var child = new clzz(data);
            var panel = self.app()[attr];
            panel.addChild(child);
            self.setInCenter(child);
            // // 隐藏
            // var num = panel.numChildren - 2;
            // num > -1 && (<UIComponent>panel.getChildAt(num)).onHide();
            return child;
        };
        /**
         * 移除层里的控件
         * @param attr AppViews对象的属性名
         * @param clzz 需要移除的对象类
         */
        AppViews.removeChild = function (attr, clzz) {
            var panel = AppViews.app()[attr];
            var num = panel.numChildren;
            if (num > 0) {
                var top_1 = panel.getChildAt(num - 1);
                for (var i = 0; i < num; i++) {
                    var child = panel.getChildAt(i);
                    if (child instanceof clzz) {
                        panel.removeChildAt(i);
                        i--;
                        num--;
                    }
                }
                // 如果移出的是最上面的面板，则下一级面板刷新
                // if (top instanceof clzz) {
                // 	let num = panel.numChildren - 1;
                // 	num > -1 && (<UIComponent>panel.getChildAt(num)).onShow();
                // }
            }
        };
        /**
         * top层里的数据
         * @param attr	AppViews对象的属性名
         * @param clzz 需要添加的bitmap
         */
        AppViews.addBitmap = function (attr, clzz, data) {
            var self = AppViews;
            var child = clzz;
            var top = self.app()[attr];
            top.addChild(child);
            return child;
        };
        /**
         * 移除clzz其上面的面板，clzz不传参时则返回上一级
         */
        AppViews.backChild = function (attr, clzz) {
            var self = AppViews;
            var panel = self.app()[attr];
            var num = panel.numChildren;
            if (!clzz) {
                panel.removeChildAt(--num);
                num && panel.getChildAt(num - 1).onShow();
            }
            else {
                for (var i = 0; i < num; i++) {
                    var child = panel.getChildAt(i);
                    if (child instanceof clzz) {
                        i++;
                        for (var j = i; j < num; j++)
                            panel.removeChildAt(i);
                        child.onShow();
                        break;
                    }
                }
            }
        };
        /**
         * 将子控件设置在父控件中心点
         */
        AppViews.setInCenter = function (child) {
            var stage = AppViews.stage;
            child.x = (stage.stageWidth - child.width) / 2;
            child.y = (stage.stageHeight - child.height) / 2;
        };
        /**
         * 新建一个面板并放入
         */
        AppViews.pushPanel = function (clzz, data) {
            return AppViews.pushChild('panelLevel', clzz, data);
        };
        /**
         * 新建一个对话框并放入
         */
        AppViews.pushDialog = function (clzz, data) {
            return AppViews.pushChild('dialogLevel', clzz, data);
        };
        /**
         * 移除面板
         */
        AppViews.removePanel = function (clzz) {
            AppViews.removeChild('panelLevel', clzz);
        };
        /**
         * 移除对话框
         */
        AppViews.removeDialog = function (clzz) {
            AppViews.removeChild('dialogLevel', clzz);
        };
        /**
         * 移除clzz其上面的面板，clzz不传参时则返回上一面板
         */
        AppViews.backPanel = function (clzz) {
            AppViews.backChild('panelLevel', clzz);
        };
        /**
         * 获取最顶层，注：顶层的东西随便加，记得清理
         */
        // public static getTopLevel(): egret.DisplayObjectContainer {
        // 	return app.$topLevel;
        // }
        /**
        * 新建一个顶层
                */
        AppViews.pushTop = function (clzz, data) {
            return AppViews.pushChild('topLevel', clzz, data);
        };
        //移除
        AppViews.removeTop = function (clzz) {
            AppViews.removeChild('topLevel', clzz);
        };
        //pushTop无法用于bitmap
        /**在顶层添加数据 */
        AppViews.pushTopBitmap = function (clzz, data) {
            return AppViews.addBitmap('topLevel', clzz, data);
        };
        /**
         * 移除面板
         */
        AppViews.removeTopBitmap = function () {
            var panel = AppViews.app()['topLevel'];
            var num = panel.numChildren;
            if (num > 0) {
                for (var i = 0; i < num; i++) {
                    var child = panel.getChildAt(i);
                    if (child instanceof egret.Bitmap) {
                        panel.removeChildAt(i);
                        i--;
                        num--;
                    }
                }
            }
        };
        return AppViews;
    }());
    lie.AppViews = AppViews;
    __reflect(AppViews.prototype, "lie.AppViews");
})(lie || (lie = {}));
//# sourceMappingURL=AppViews.js.map