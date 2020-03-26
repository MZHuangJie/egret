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
    var single;
    var confirm;
    /**
     * 对话框，注意onDestroy加了点东西
     */
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dialog.prototype.onCreate = function () {
            this.initObscure();
            Dialog.showing = true;
        };
        /**
         * 初始化朦层
         */
        Dialog.prototype.initObscure = function () {
            var self = this;
            var stage = self.stage;
            var rect = self.obscure = new eui.Rect;
            rect.width = stage.stageWidth;
            rect.height = stage.stageHeight;
            rect.horizontalCenter = rect.verticalCenter = 0;
            self.addChildAt(rect, 0);
            self.setObscureAlpha(0.5);
        };
        /**
         * 设置朦层的透明度
         */
        Dialog.prototype.setObscureAlpha = function (alpha) {
            this.obscure.alpha = alpha;
        };
        /**
         * 添加朦层监听，点击关闭
         */
        Dialog.prototype.addOCloseEvent = function () {
            var self = this;
            lie.EventUtils.addTouchTapListener(self.obscure, self.onClose, self);
        };
        /**
         * 关闭窗口
         */
        Dialog.prototype.onClose = function (event) {
            event.stopImmediatePropagation();
            this.removeFromParent();
        };
        Dialog.prototype.onDestroy = function () {
            lie.EventUtils.removeEventListener(this.obscure);
            Dialog.showing = false;
        };
        /**
         * 显示单一的对话框，对话框样式固定
         * @param 内容
         * @param 点击确定的回调
         * @param 回调所属对象
         */
        Dialog.showSingleDialog = function (content, call, thisObj) {
            if (!single) {
                single = lie.AppViews.pushDialog(SignleDialog, 'SingleDialogSkin');
            }
            single.setText(content);
            call && single.addCall(call, thisObj);
            return single;
        };
        /**
         * 隐藏单一对话框
         */
        Dialog.hideSingleDialog = function () {
            if (single) {
                single.visible = false;
                single.clearCall();
            }
        };
        /**
         * 移除单一对话框
         */
        Dialog.removeSingDialog = function () {
            if (single) {
                single.removeFromParent();
                single = null;
            }
        };
        /**
         * 移除确认对话框
         */
        Dialog.removeConfirmDialog = function () {
            if (confirm) {
                confirm.removeFromParent();
                confirm = null;
            }
        };
        /**
         * 显示确认的对话框，对话框样式固定
         * @param 内容
         * @param 点击确定的回调
         * @param 点击取消的回调
         * @param 回调所属对象
         */
        Dialog.showConfirmDialog = function (content, call, callCancel, thisObj) {
            if (!confirm) {
                confirm = lie.AppViews.pushDialog(ConfirmDialog, 'ConfirmDialogSkin');
            }
            confirm.setText(content);
            confirm.setOk(call);
            confirm.setCancel(callCancel);
            // callCancel && confirm.addCall(callCancel, thisObj);
            return confirm;
        };
        Dialog.showing = false;
        return Dialog;
    }(lie.AppComponent));
    lie.Dialog = Dialog;
    __reflect(Dialog.prototype, "lie.Dialog");
    /**
     * 只允许弹出一个的对话框，也可以称为通用对话框
     */
    var SignleDialog = (function (_super) {
        __extends(SignleDialog, _super);
        function SignleDialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SignleDialog.prototype.onCreate = function () {
            _super.prototype.onCreate.call(this);
            lie.EventUtils.addTouchTapScaleListener(this.m_btnClose, Dialog.removeSingDialog);
            lie.EventUtils.addTouchTapScaleListener(this.m_btnOk, Dialog.removeSingDialog);
        };
        SignleDialog.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            lie.EventUtils.removeEventListener(self.m_btnClose);
            lie.EventUtils.removeEventListener(self.m_btnOk);
            // 执行回调
            var call = self.$call;
            if (call) {
                call.call(self.$thisObje);
                self.clearCall();
            }
        };
        /**
         * 设置文本
         */
        SignleDialog.prototype.setText = function (text) {
            this.m_lblText.text = text;
        };
        /**
         * 添加监听
         */
        SignleDialog.prototype.addCall = function (call, thisObje) {
            var self = this;
            self.$call = call;
            self.$thisObje = thisObje;
        };
        /**
         * 清除回调
         */
        SignleDialog.prototype.clearCall = function () {
            var self = this;
            self.$call = self.$thisObje = null;
        };
        return SignleDialog;
    }(Dialog));
    __reflect(SignleDialog.prototype, "SignleDialog");
    /**
     * 确认对话框，有确认和取消按钮
     */
    var ConfirmDialog = (function (_super) {
        __extends(ConfirmDialog, _super);
        function ConfirmDialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConfirmDialog.prototype.onCreate = function () {
            _super.prototype.onCreate.call(this);
            lie.EventUtils.addTouchTapScaleListener(this.m_btnClose, Dialog.removeConfirmDialog);
            // EventUtils.addTouchTapScaleListener(this.m_btnCancel, Dialog.removeConfirmDialog);
        };
        ConfirmDialog.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            lie.EventUtils.removeEventListener(self.m_btnClose);
            // 执行回调
            var call = self.$call;
            if (call) {
                call.call(self.$thisObje);
                self.clearCall();
            }
        };
        /**
         * 设置文本
         */
        ConfirmDialog.prototype.setText = function (text) {
            this.m_lblText.text = text;
        };
        /**
         * 添加监听
         */
        ConfirmDialog.prototype.addCall = function (call, thisObje) {
            var self = this;
            self.$call = call;
            self.$thisObje = thisObje;
        };
        /**
         * 清除回调
         */
        ConfirmDialog.prototype.clearCall = function () {
            var self = this;
            self.$call = self.$thisObje = null;
        };
        /**
         * 点击确认回调
         */
        ConfirmDialog.prototype.setOk = function (cb) {
            lie.EventUtils.addTouchTapScaleListener(this.m_btnOk, cb);
        };
        /*
        *点击取消回调
        */
        ConfirmDialog.prototype.setCancel = function (cb) {
            lie.EventUtils.addTouchTapScaleListener(this.m_btnCancel, cb);
        };
        return ConfirmDialog;
    }(Dialog));
    __reflect(ConfirmDialog.prototype, "ConfirmDialog");
})(lie || (lie = {}));
//# sourceMappingURL=Dialog.js.map