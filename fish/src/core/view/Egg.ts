class Egg extends eui.Component {
    private line: egret.Shape;
    private isCatch: boolean;
    private zeroX: number;
    private zeroY: number;
    private catchID: number = -1;
    private catched: egret.DisplayObjectContainer;

    private h: number = 540;
    private r: number = 70;
    private go: boolean = false;
    private speed: number = 3;

    public constructor() {
        super();
        this.skinName = "EggSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        this.zeroX = this.x;
        this.zeroY = this.y;

        this.line = new egret.Shape();
        this.parent.addChild(this.line);

        this.prepareStart();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catchIt, this);
    }

    /**抓到东西*/
    public catchIt(sth: Fish): void {
        this.tw2.setPaused(true);
        this.catched = sth;
        this.catched.x = (40 - sth.width) / 2;
        this.catched.y = 36;
        this.catchID = sth.vo.id;
        sth.clear();
        this.addChild(sth);
        var time: number = this.getTime(this.getDistance(this.x, this.y));
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        this.tw2.to({ x: this.zeroX, y: this.zeroY }, time).call(this.setScore, this);
    }

    private tw1: egret.Tween;
    private tw2: egret.Tween;
    private prepareStart(): void {
        this.isCatch = false;
        this.tw1 = egret.Tween.get(this, { loop: true });
        this.rotation = this.r;
        this.tw1.to({ rotation: -this.r }, 1500).wait(10).to({ rotation: this.r }, 1500);
    }

    private getTime(dis: number): number {
        var a: number = dis * 20 / this.speed;
        return a - a % 100;
    }

    private getDistance(x: number, y: number): number {
        var a: number = Math.abs(this.zeroX - x);
        var b: number = Math.abs(this.zeroY - y);
        var c: number = Math.pow(a, 2) + Math.pow(b, 2);
        return Math.sqrt(c);
    }

    /**点击伸出去抓*/
    public start(): void {
        if (this.isCatch || this.tw1 == null) {
            return;
        }
        this.tw1.setPaused(true);
        this.isCatch = true;

        this.tw2 = null;
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });

        this.line.visible = true;

        var r: number = this.rotation;
        var hudu: number = r * Math.PI / 180;
        var tag: number = Math.tan(hudu);
        var w = tag * this.h;
        var tarX: number = this.zeroX - w;
        var tarY: number = this.h;
        if (tarX < 50) {
            tarX = 50;
            tarY = GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        else if (tarX > GameLogic.getInstance().GameStage_width - 50) {
            tarX = GameLogic.getInstance().GameStage_width - 50;
            tarY = -GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        var time: number = this.getTime(this.getDistance(tarX, tarY));
        this.tw2.to({ x: tarX, y: tarY }, time).wait(100).call(this.goBack, this);
    }

    private goBack(): void {
        this.catched = new egret.DisplayObjectContainer();
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        var time: number = this.getTime(this.getDistance(this.x, this.y));
        this.tw2.to({ x: this.zeroX, y: this.zeroY }, time).call(this.setScore, this);
    }

    private changeline(): void {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0x000000);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x, this.y);
        this.line.graphics.endFill();

        if (GameLogic.getInstance().game != null && this.catched == null) {
            GameLogic.getInstance().game.chectCatch();
        }
    }

    private setScore(): void {
        if (this.catched != null && this.catched.parent != null) {
            this.catched.parent.removeChild(this.catched);
            GameLogic.getInstance().game.addFish(this.catchID);

            GameLogic.getInstance().game.setScore((this.catched as Fish).vo.score);
        }
        else {
            this.goOn();
        }
        this.line.visible = false;
        this.catched = null;
    }

    public goOn(): void {
        this.isCatch = false;
        this.tw1.setPaused(false);
    }

    public clear(): void {
        egret.Tween.removeTweens(this);
        this.tw1 = null;
        this.tw2 = null;
        this.isCatch = false;
    }
}