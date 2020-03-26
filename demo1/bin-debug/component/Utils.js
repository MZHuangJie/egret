var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lie;
(function (lie) {
    /**
     * 工具类，存放一些常用的且不好归类的方法
     */
    var Utils = (function () {
        function Utils() {
        }
        // 工具私有变量，请勿乱动
        /**
         * 初始化一个长度为length，值全为value的数组
         * 注意，由于数组公用一个value，因此，value适用于基础类型，对于对象类的，请用memset2方法
         */
        Utils.memset = function (length, value) {
            return Array.apply(null, Array(length)).map(function () { return value; });
        };
        /**
         * 初始化一个长度为length，值通过getValue函数获取，注意getValue第一个参数是没用，第二个参数是当前数组的下标，即你返回的数据将存放在数组的该下标
         */
        Utils.memset2 = function (length, getValue) {
            return Array.apply(null, Array(length)).map(getValue);
        };
        /**
         * 创建一个定时器
         * @param listener 定时回调
         * @param thisObject 回调所属对象
         * @param second 回调间隔，单位秒，默认一秒
         * @param repeat 循环次数，默认一直重复
         */
        Utils.createTimer = function (listener, thisObject, second, repeat) {
            if (second === void 0) { second = 1; }
            var timer = new egret.Timer(second * 1000, repeat);
            timer.addEventListener(egret.TimerEvent.TIMER, listener, thisObject);
            timer.start();
            return timer;
        };
        /**
         * 移除一个定时器
         * @param timer 被移除的定时器
         * @param listener 监听函数
         * @param thisObject 函数所属对象
         */
        Utils.removeTimer = function (timer, listener, thisObject) {
            timer.stop();
            timer.removeEventListener(egret.TimerEvent.TIMER, listener, thisObject);
        };
        /**
         * 获取网页参数
         */
        Utils.getQueryString = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var ret = window.location.search.substr(1).match(reg);
            return ret ? decodeURIComponent(ret[2]) : '';
        };
        /**
         * 获取cr1位于cr0的方向
         * 注：0为上，顺时针开始数，共八个方向
         */
        Utils.getDistance = function (col0, row0, col1, row1) {
            var row, col, c = 2, xs = 1;
            if (row0 < row1)
                row = -1;
            else if (row0 > row1)
                row = 1;
            else
                row = 0;
            if (col0 > col1) {
                c = 6;
                xs = -1;
            }
            else if (col0 == col1)
                xs = 2;
            return c - row * xs;
        };
        /**
         * 关闭web版游戏
         */
        Utils.closeWebGame = function () {
            var history = window.history;
            lie.Dispatch.clear();
            AppConfig.onClose();
            if (history.length > 1)
                history.back();
            else
                window.close();
        };
        /**
         * 自定义格式化字符串
         * @param reg 正则
         * @param str 字符串
         * @param args 填充参数
         */
        Utils.formatStringReg = function (reg, str, args) {
            for (var i in args) {
                var arg = args[i];
                if (reg.test(str))
                    str = str.replace(reg, args[i]);
                else
                    break;
            }
            return str;
        };
        /**
         * 格式化字符串
         */
        Utils.formatString = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            str = str.replace(/%%/g, '%'); // 有些识别问题出现两个%号
            return Utils.formatStringReg(/%d|%s/i, str, args); // 忽略大小写
        };
        /**
         * 偏移整型数组
         * @param array 需要偏移的数组
         * @param offset 偏移量，对应array长度，没有值时默认0
         */
        Utils.offsetArray = function (array) {
            var offset = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                offset[_i - 1] = arguments[_i];
            }
            for (var i in array)
                array[i] += (offset[i] || 0);
            return array;
        };
        /**
         * 加载资源
         */
        Utils.loadResByUrl = function (url, type) {
            if (type === void 0) { type = 'image'; }
            return new Promise(function (resolve, reject) {
                var loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, function (event) {
                    var imageLoader = event.currentTarget;
                    var texture = new egret.Texture();
                    texture._setBitmapData(imageLoader.data);
                    resolve(texture);
                }, null);
                loader.load(url);
            });
        };
        /**
         * 获取四个方向，优先上右下左0-3
         */
        Utils.getDistance4 = function (startX, startY, nextX, nextY) {
            var dis;
            var disy = startY - nextY; // 平面坐标系跟白鹭y轴相反
            var disx = nextX - startX;
            // 上下
            var isb = disy < 0;
            if (disx == 0)
                return disy ? (isb ? 2 : 0) : void 0;
            var atan = Math.atan(disy / disx) * 180 / Math.PI;
            if (disx < 0)
                atan += 180;
            else if (isb)
                atan += 360;
            var top = 40, left = 90 + top;
            if (atan >= 90 - top && atan < left)
                dis = 0;
            else if (atan >= left && atan < 225)
                dis = 3;
            else if (atan >= 225 && atan < 315)
                dis = 2;
            else
                dis = 1;
            return dis;
        };
        /**
         * 获取三个方向，优先右下左1-3
         */
        Utils.getDistance3 = function (startX, startY, nextX, nextY) {
            var dis;
            var disy = startY - nextY; // 平面坐标系跟白鹭y轴相反
            var disx = nextX - startX;
            // 上下
            var abs = Math.abs;
            var isb = disy < 0;
            // IOS有向左滑4像素的机制
            if (abs(disx) < 5 && abs(disy) < 5)
                return;
            if (disx == 0)
                return isb && 2;
            var atan = Math.atan(disy / disx) * 180 / Math.PI;
            if (disx < 0)
                atan += 180;
            else if (isb)
                atan += 360;
            var bottom = 70;
            var leftM = 270 - bottom / 2;
            if (atan >= 90 && atan < leftM)
                dis = 3;
            else if (atan >= leftM && atan < leftM + bottom)
                dis = 2;
            else
                dis = 1;
            return dis;
        };
        /**
         * 二次延迟
         */
        Utils.callLater = function (call, thisObj) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            var later = egret.callLater;
            later(function () {
                later(function () {
                    call.apply(thisObj, params);
                }, null);
            }, null);
        };
        /**
         * 格式化时间
         * @param
         */
        Utils.formatTime = function (msec) {
            if (msec < 0) {
                return "0:00";
            }
            var sec = 0;
            var min = 0;
            // var sec = floor(msec / 1000);
            // var min = floor(sec / 60);
            // sec %= 60;
            // if (sec < 10)
            //     sec = <any>'0' + sec;
            return min + ":" + sec;
        };
        /**
         * 计算击败全国玩家百分比,比如55.6表示百分之55.6
         */
        Utils.hitPercent = function (X) {
            var percent;
            if (X < 0) {
                percent = 0.0;
            }
            else if (X < 5000) {
                percent = X / 100;
            }
            else if (X < 10000) {
                percent = (X / 100 - 50) / 50 * 30 + 50;
            }
            else if (X < 15000) {
                percent = (X / 100 - 100) / 50 * 13 + 80;
            }
            else if (X < 20000) {
                percent = (X / 100 - 150) / 50 * 3 + 93;
            }
            else if (X < 30000) {
                percent = (X / 100 - 200) / 100 * 2 + 96;
            }
            else if (X < 50000) {
                percent = (X / 100 - 300) / 200 * 2 + 98;
            }
            else if (X > 50000) {
                percent = 99.99;
            }
            return percent >= 99.99 ? percent : percent.toFixed(1);
        };
        /**
         * 设置egret wing组动画播放
         */
        Utils.playTweenGroup = function (tweenGroup, isLoop, callBack, thisObject, argArray) {
            if (isLoop === void 0) { isLoop = false; }
            if (isLoop) {
                for (var key in tweenGroup.items) {
                    tweenGroup.items[key].props = { loop: true };
                }
            }
            if (callBack) {
                tweenGroup.addEventListener('complete', function (event) {
                    callBack.apply(thisObject, argArray);
                }, thisObject);
            }
            tweenGroup.play();
        };
        /**范围内获取整数随机数*/
        Utils.getRandomInt = function (min, max) {
            var Range = max - min;
            var Rand = Math.random();
            return (min + Math.round(Rand * Range));
        };
        Utils.getTimestamp = function () {
            return Date.parse(new Date().toString());
        };
        Utils.errorToast = function (message) {
            pfUtils.showToast(message);
        };
        return Utils;
    }());
    lie.Utils = Utils;
    __reflect(Utils.prototype, "lie.Utils");
})(lie || (lie = {}));
//# sourceMappingURL=Utils.js.map