/*
这个类里面的东西基本都需要玩家根据当前游戏
来修改，下面标※的都是要改的，不标的话可不改
标#的则是游戏专用，其他游戏用不到就删掉
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏配置，由每个游戏自己定义
 */
var AppConfig = (function () {
    function AppConfig() {
    }
    /**
     * 进入失败※
     */
    AppConfig.onEnterError = function () {
        // Utils.closeWebGame();
    };
    /**
     * 连接了服务器
     */
    AppConfig.onLogin = function (call) {
        // 推送玩家数据
        var clzz = AppConfig;
        clzz.getUserInfo().then(function (info) {
            // let post = clzz.postMessage;
            console.log("user errMsg:" + info.errMsg);
            console.log("user rawData:" + info.rawData);
            console.log("user encryptedData:" + info.encryptedData);
            console.log("user iv:" + info.iv);
            var array = new Array();
            array.push(info.encryptedData);
            array.push(info.iv);
            if (call) {
                call.call(this, array);
            }
            // let data = /*AppConfig.userInfo = */{
            // 	nickname: info.nickName,
            // 	avatarUrl: info.avatarUrl,
            // 	openid: Server.openid
            // };
            // console.log("user:"+data.nickname);
            // console.log("user:"+data.avatarUrl);
            // console.log("user:"+info);
            // post('user', data);
            // post('init');	// 可以初始化好友	数据了
            // Service.reqEnterGame(info);
        });
    };
    /**
     * 开始游戏※
     */
    AppConfig.onStartGame = function (resp) {
        var self = AppConfig;
        var self = AppConfig;
        var scores = resp.scores;
        var times = resp.times;
        // if (!scores) {
        // 	scores = Utils.memset(self.modelNum, 0).join(',');
        // 	times = Utils.memset(self.modelNum, 0).join(',');
        // }
        self.scores = scores.split(',').map(function (v) { return Number(v); });
        self.times = times.split(',').map(function (v) { return Number(v); });
        self.scKey = resp.scKey;
        self.saveKVData();
        self.onBuyProp(resp, true); // 该返回值包含金币道具
    };
    /**
     * 游戏结束※
     */
    AppConfig.onFinishGame = function (resp) {
        AppConfig.onStartGame(resp);
    };
    /**
     * 购买道具回调※
     */
    AppConfig.onBuyProp = function (resp, unShow) {
        // var self = AppConfig;
        // var clzz = Dispatch;
        // self.gold = resp.gold;
        // self.propNum = resp.prop;
        // clzz.notice(self.UPDATE_GOLD);
        // clzz.notice(self.UPDATE_PROP);
        // !unShow && Dialog.showSingleDialog("购买道具成功");
    };
    /**
     * 使用道具回调※
     */
    AppConfig.onUseProp = function (resp) {
        var self = AppConfig;
        self.propNum = resp.prop;
        // Dispatch.notice(self.USED_PROP);
    };
    /**
     * 购买金币回调※
     */
    AppConfig.onBuyGold = function (resp) {
        var self = AppConfig;
        self.gold = resp.gold;
        // Dispatch.notice(self.UPDATE_GOLD);
        // Dialog.showSingleDialog('购买金币成功');
    };
    /**
     * 错误编码※
     */
    AppConfig.onErrorCode = function (errorCode, info) {
        // var msg = info.msg;
        // var clzz = lie.ErrorCode;
        // if (errorCode == clzz.E_BALANCE)
        // 	Dialog.showConfirmDialog(msg, function () {
        // 		Dialog.removeConfirmDialog();
        // 		AppConfig.requestPayment(1);
        // 	});
        // else if (errorCode == clzz.E_LOGIN) {
        // 	Dialog.showSingleDialog(msg, pfUtils.loginGame)
        // }
        // else if (msg)
        // 	Dialog.showSingleDialog(msg);
    };
    /**
     * 关闭游戏回调，请填上需要清除的东西※
     */
    AppConfig.onClose = function () {
    };
    // 其他应用方法
    /**
     * 获取skins下的皮肤
     */
    AppConfig.getSkin = function (name) {
        return 'resource/eui_skins/' + name + '.exml';
    };
    /**
     * 保存PK数据
     */
    AppConfig.saveKVData = function () {
        pfUtils.setUserInfo().then(function (bool) {
            bool && AppConfig.postMessage('update');
        }).catch(function () {
            // Dialog.showSingleDialog('该版本暂不支持保存用户信息，请升级到最新版！');
        });
    };
    /**
     * 是否打开音效
     */
    AppConfig.isOpenMusic = function () {
        // return LocalData.getObject<boolean>(AppConfig.cacheMusic) !== false;
        return true;
    };
    /**
     *是否是首次进入，如果是，打开新手指引
     */
    AppConfig.needGuide = function () {
        // return LocalData.getObject<boolean>("needGuide") !== false;
        return true;
    };
    /**
     * 取消指引
     */
    AppConfig.setGuideExpired = function () {
        // LocalData.setObject("needGuide", false);
    };
    /**
     * 是否按键模式,默认按键
     */
    AppConfig.isKeyModel = function () {
        // let result = LocalData.getObject<boolean>("isKeyModel");
        // return !!result;
        return false;
    };
    /**
     * 请求支付
     * @param money 金钱，单位元
     */
    AppConfig.requestPayment = function (money) {
        if (money === void 0) { money = 1; }
        // pfUtils.requestPaymemts(money).then(function (bool) {
        // 	bool && Service.reqBuyGold(money);
        // }).catch(function () {
        // 	Dialog.showSingleDialog('该系统暂不支持虚拟支付');
        // });
    };
    /**
     * 发送离屏数据
     */
    AppConfig.postMessage = function (action, data) {
        pfUtils.postMessage(action, data);
    };
    /**
     * 设置分享票据
     */
    AppConfig.setTicket = function (rankData) {
        var clzz = AppConfig;
        var oldt = clzz.ticket;
        var ticket = rankData.ticket, type = rankData.type;
        clzz.ticket = ticket;
        clzz.type = type;
        // 打开排行榜
        // if (ticket && oldt != ticket)
        // 	AppViews.addInitCall(function () {
        // 		AppViews.pushDialog(RankDialog, rankData);
        // 	});
    };
    /**
     * 获取玩家数据
     */
    AppConfig.getUserInfo = function () {
        return pfUtils.getUserInfo();
    };
    /*
    *获取玩家是否授权
    */
    AppConfig.getAuthorize = function () {
        return pfUtils.getAuthorize();
    };
    /**
     * 切换音乐状态
     * @returns 返回当前音乐开关状态
     */
    AppConfig.switchMusic = function () {
        var self = AppConfig;
        var isOpen = !self.isOpenMusic();
        var bgMusic = self.bgMusic;
        // LocalData.setObject<boolean>(self.cacheMusic, isOpen);
        isOpen ? bgMusic.play() : bgMusic.pause(); // 背景音乐永久伴随
        return isOpen;
    };
    /**
     * 播放背景音乐
     */
    AppConfig.playBgMusic = function (volumn) {
        if (volumn === void 0) { volumn = 0.6; }
        var bgMusic = AppConfig.bgMusic;
        if (bgMusic) {
            volumn && (bgMusic.volume = volumn);
            if (AppConfig.isOpenMusic()) {
                bgMusic.play();
            }
        }
    };
    /**
     * 暂停背景音乐
     */
    AppConfig.pauseBgMusic = function () {
        if (AppConfig.bgMusic) {
            AppConfig.bgMusic.pause();
        }
    };
    AppConfig.getPhoneInfo = function () {
        var that = this;
        pfUtils.getPhoneInfo().then(function (info) {
            console.log("info.model:" + info.model);
            if (info.model.toString().indexOf('iPhone X') >= 0) {
                that.fringe = true;
            }
            else {
                that.fringe = false;
            }
        }).catch(function (err) {
            that.fringe = false;
        });
    };
    AppConfig.UPDATE_GOLD = 'updateGold'; // 通讯消息，刷新金币
    AppConfig.UPDATE_PROP = 'updateProp'; // 通讯消息，刷新道具
    AppConfig.USED_PROP = 'usedProp'; // 通讯消息，使用道具
    AppConfig.SHOW_GUIDE = "SHOW_GUIDE";
    AppConfig.INDEX_SHARE = "INDEX_SHARE";
    AppConfig.TURN_SHARE = "TURN_SHARE";
    AppConfig.GAME_SHARE = "GAME_SHARE";
    AppConfig.TIME_DIFFER = "TIME_DIFFER";
    AppConfig.USER_TOKEN = 'user_token'; //用户token
    AppConfig.TOKEN = 'token'; //签名token
    AppConfig.USER_TOKEN_KEY = '050ce4c7c0042b40'; //用户token kye
    AppConfig.TOKEN_KEY = "J050ce4c7c0042b4"; //接口sign key
    AppConfig.PEN_PROP_GOLD = 5; //划线道具 5金币
    AppConfig.REVIVAL_PROP_GOLD = 15; //复活道具 15金币
    AppConfig.PEN_PROP_NAME = "LINEATION"; //画笔道具标识
    AppConfig.REVIVAL_PROP_NAME = "REVIVECARD"; //复活道具标识
    AppConfig.CODE_1012 = 1012; //用户token 过期。此时需要重新获取token
    AppConfig.CODE_1015 = 1015; //sign 失效
    AppConfig.honorCfg = []; //等级说明数组
    AppConfig.modelNum = 3; // 游戏模式种类
    AppConfig.scores = []; // 玩家的分数
    AppConfig.times = []; // 玩家的时间
    AppConfig.gold = 0; // 玩家的金币
    AppConfig.propNum = 0; // 玩家的道具
    // 存放本地缓存
    AppConfig.cacheMusic = "music"; // 音乐缓存
    AppConfig.fringe = false; // 是否是刘海屏
    AppConfig.socoreArray = [[5, 3, 1],
        [10, 5, 3], [10, 5, 3], [10, 5, 3], [10, 5, 3], [10, 5, 3],
        [20, 10, 5], [20, 10, 5], [20, 10, 5], [20, 10, 5], [20, 10, 5],
        [40, 20, 10], [40, 20, 10], [40, 20, 10], [40, 20, 10], [40, 20, 10],
        [80, 40, 20], [80, 40, 20]]; //画线得分配置数组
    AppConfig.levelFirstScopeStart = 2;
    AppConfig.levelFirstScopeEnd = 18;
    AppConfig.levelSecondScopeStart = 19;
    AppConfig.levelSecondScopeEnd = 20;
    AppConfig.prizeNumDay = 5; //每天抽奖次数
    AppConfig.TWO_MINUTE = 2 * 60 * 1000;
    AppConfig.userId = 0;
    return AppConfig;
}());
__reflect(AppConfig.prototype, "AppConfig");
//# sourceMappingURL=AppConfig.js.map