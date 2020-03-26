var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    /**
     * 控件监听工具类
     */
    var EventUtils = (function () {
        function EventUtils() {
        }
        /**
         * 移除控件上的所有监听，该方法也适用于没有通过addEventListener来添加的控件
         */
        EventUtils.removeEventListener = function (target) {
            var value = target.$EventDispatcher;
            var list = [].concat(value[1] || [], value[2] || []);
            var events = [];
            for (var i in list) {
                var item = list[i];
                for (var j in item) {
                    var datas = item[j];
                    for (var k in datas) {
                        var event_1 = datas[k];
                        target.removeEventListener(event_1.type, event_1.listener, event_1.thisObject, event_1.useCapture);
                    }
                }
            }
        };
        /**
         * 移除root往下所有的点击事件
         */
        EventUtils.removeEventListeners = function (root) {
            var self = EventUtils;
            if (root instanceof egret.DisplayObjectContainer)
                for (var i = 0, num = root.numChildren; i < num; i++)
                    self.removeEventListeners(root.getChildAt(i));
            else
                self.removeEventListener(root);
        };
        /**
         * 添加缩放监听，记得用removeEventListener来移除这个监听
         */
        EventUtils.addScaleListener = function (target, scale) {
            if (scale === void 0) { scale = 0.95; }
            var addE = function (type, call, thisObj) {
                target.addEventListener(type, call, thisObj);
            };
            var self = EventUtils;
            var clzz = egret.TouchEvent;
            target.$evtScale = scale;
            target.$bgScaleX = target.scaleX;
            target.$bgScaleY = target.scaleY;
            addE(clzz.TOUCH_BEGIN, self.onScleBegin, self);
            addE(clzz.TOUCH_END, self.onScaleEnd, self);
            addE(clzz.TOUCH_CANCEL, self.onScaleEnd, self);
            addE(clzz.TOUCH_RELEASE_OUTSIDE, self.onScaleEnd, self);
        };
        /**
         * 缩放开始
         */
        EventUtils.onScleBegin = function (event) {
            var target = event.currentTarget;
            var tween = egret.Tween;
            var scale = target.$evtScale;
            var scaleX = target.scaleX * scale;
            var scaleY = target.scaleY * scale;
            target.$hashBegin = true;
            tween.removeTweens(target);
            tween.get(target).to({ scaleX: scaleX, scaleY: scaleY }, EventUtils.$scaleTime);
        };
        /**
         * 缩放结束
         */
        EventUtils.onScaleEnd = function (event) {
            var target = event.currentTarget;
            var time = EventUtils.$scaleTime;
            var tween = egret.Tween;
            var scaleX = target.$bgScaleX;
            var scaleY = target.$bgScaleY;
            var bScaleX = scaleX * 1.1;
            var bScaleY = scaleY * 1.1;
            tween.removeTweens(target);
            target.$hashBegin && tween.get(target).to({ scaleX: bScaleX, scaleY: bScaleY }, time).to({ scaleX: scaleX, scaleY: scaleY }, time);
            target.$hashBegin = void 0;
        };
        // 常用的监听类型归类
        /**
         * 添加点击按下监听
         */
        EventUtils.addTouchBeginListener = function (target, call, thisObj) {
            target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, call, thisObj);
        };
        /**
         * 添加点击移动监听
         */
        EventUtils.addTouchMoveListener = function (target, call, thisObj) {
            target.addEventListener(egret.TouchEvent.TOUCH_MOVE, call, thisObj);
        };
        /**
         * 添加点击谈起监听
         */
        EventUtils.addTouchEndListener = function (target, call, thisObj) {
            target.addEventListener(egret.TouchEvent.TOUCH_END, call, thisObj);
        };
        /**
         * 添加TouchTap监听
         */
        EventUtils.addTouchTapListener = function (target, call, thisObj, useCapture) {
            target.addEventListener(egret.TouchEvent.TOUCH_TAP, call, thisObj, useCapture);
        };
        /**
         * 在TouchTap的基础上进行缩放
         */
        EventUtils.addTouchTapScaleListener = function (target, call, thisObj, scale, useCapture) {
            var self = EventUtils;
            self.addScaleListener(target, scale);
            if (call) {
                self.addTouchTapListener(target, call, thisObj, useCapture);
            }
        };
        /**
         * 添加监听结束监听
         */
        EventUtils.addTouchFinishListener = function (target, finish, thisObj) {
            var event = egret.TouchEvent;
            target.addEventListener(event.TOUCH_END, finish, thisObj);
            target.addEventListener(event.TOUCH_CANCEL, finish, thisObj);
            target.addEventListener(event.TOUCH_RELEASE_OUTSIDE, finish, thisObj);
        };
        /**
         * 添加按住监听
         * @param target
         * @param begin 按住时的回调
         * @param end 松手时的回调，会调用多次，请自己在end里判断
         */
        EventUtils.addTouchingListener = function (target, begin, end, thisObj) {
            var self = EventUtils;
            self.addTouchBeginListener(target, begin, thisObj);
            self.addTouchFinishListener(target, end, thisObj);
        };
        /**
         * 添加移动控件监听
         */
        EventUtils.addMoveingListener = function (target) {
            var self = EventUtils;
            var event = egret.TouchEvent;
            var touchX, touchY;
            self.addTouchBeginListener(target, function (e) {
                e.stopImmediatePropagation();
                touchX = e.stageX;
                touchY = e.stageY;
            });
            self.addTouchMoveListener(target, function (e) {
                e.stopImmediatePropagation();
                var newX = e.stageX, newY = e.stageY;
                target.x += newX - touchX;
                target.y += newY - touchY;
                touchX = newX;
                touchY = newY;
            });
        };
        /**
         * 添加点击滑动监听——优先执行顺序上右下左
         * @param target
         * @param distance 当滑动到该距离时才触发回调
         * @param call 回调函数，参数：0，1，2，3上右下左
         * @param finish 松开回调，参数为undefined时表示没有执行call，第二个参数表示是不是松开
         * @param thisObj 回调所属对象
         */
        EventUtils.addSlideListener = function (target, distances, call, finish, thisObj) {
            var self = EventUtils;
            var startX, startY, dis, odis, hasMove, void0 = void 0;
            var getd4 = lie.Utils.getDistance4;
            var curTime, abs = Math.abs;
            var getlen = function (x0, y0, x1, y1) {
                var dx = x0 - x1;
                var dy = y0 - y1;
                return Math.sqrt(dx * dx + dy * dy);
            };
            self.addTouchMoveListener(target, function (e) {
                e.stopImmediatePropagation();
                var newX = e.stageX, newY = e.stageY;
                // 兼容奇葩手机
                if (abs(startX - newX) < 6 && abs(startY - newY) < 6)
                    return;
                hasMove = true;
                dis = getd4(startX, startY, newX, newY);
                if (dis != void0 && getlen(startX, startY, newX, newY) >= distances[dis]) {
                    startX = newX;
                    startY = newY;
                    if (odis != void0) {
                        endc(odis, false, hasMove);
                    }
                    call.call(thisObj, dis);
                    odis = dis;
                }
            });
            var endc = function (dis, isEnd, hasMove, endDis) {
                finish.call(thisObj, dis, isEnd, hasMove, endDis);
            };
        };
        EventUtils.$scaleTime = 100; // 缩放动画时间
        return EventUtils;
    }());
    lie.EventUtils = EventUtils;
    __reflect(EventUtils.prototype, "lie.EventUtils");
})(lie || (lie = {}));
//# sourceMappingURL=EventUtils.js.map