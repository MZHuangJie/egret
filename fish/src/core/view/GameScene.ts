/**
 *
 * @author 
 *
 */
class GameScene extends eui.Component {
    private egg: Egg;
    private fishArr: Fish[];
    private score_txt: eui.Label;
    private total_score_txt: eui.Label;
    private score: number = 0;
    private left_time: eui.Label;
    private time: number = 30;

    public constructor() {
        super();
        this.skinName = "GameSceneSkin";
    }
    private static _instance: GameScene;
    public static getInstance(): GameScene {
        if (this._instance == null) {
            this._instance = new GameScene();
        }
        return this._instance;
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        this.fishArr = [];
        this.score_txt.visible = false;
        this.initFishs();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    }

    private initFishs(): void {
        this.removeFishs();

        var arr: FishVO[] = GameLogic.getInstance().data;
        if (arr != null) {
            for (var i: number = 0; i < arr.length; i++) {
                var m: Fish = new Fish(arr[i]);
                this.addChild(m);
                m.y = 140;
                this.fishArr.push(m);
            }
        }
        this.fishStart();
    }

    public setScore(n: number): void {
        this.score_txt.text = n.toString();
        this.score_txt.visible = true;
        this.score += n;
        egret.Tween.get(this.score_txt).to({ x: this.total_score_txt.x, y: this.total_score_txt.y }, 1000).call(this.clearScore, this);
    }

    private clearScore(): void {
        this.total_score_txt.text = this.score.toString();
        this.score_txt.visible = false;
        this.score_txt.y = 100;
        this.score_txt.alpha = 1;
        this.egg.goOn();
    }

    public addFish(id: number): void {
        var vo: FishVO = GameLogic.getInstance().getFishVOByID(id);
        if (vo != null) {
            var m: Fish = new Fish(vo);
            this.addChild(m);
            m.y = 140;
            this.fishArr.push(m);
            m.start();
        }
    }

    private fishStart(): void {
        for (var i: number = 0; i < this.fishArr.length; i++) {
            this.fishArr[i].start();
        }
    }


    public chectCatch(): void {
        for (var i: number = 0; i < this.fishArr.length; i++) {
            if (ViewUtil.hitTest(this.fishArr[i], this.egg)) {
                this.egg.catchIt(this.fishArr[i]);
                this.fishArr.splice(i, 1);
                break;
            }
        }
    }


    private start(): void {
        this.egg.start();
    }

    private removeFishs(): void {
        for (var i: number = 0; i < this.fishArr.length; i++) {
            if (this.fishArr[i] != null && this.fishArr[i].parent != null) {
                this.fishArr[i].parent.removeChild(this.fishArr[i]);
                this.fishArr[i].clear();
                this.fishArr[i] = null;
            }
        }
        this.fishArr = [];
    }

    private gameOver(): void {
        GameLogic.getInstance().startMain();
    }


}
