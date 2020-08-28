class GameLogic {
    public constructor() {
    }

    private static _instance: GameLogic;
    public static getInstance(): GameLogic {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    }

    public GameStage: egret.Stage;
    public GameStage_width: number;
    public GameStage_height: number;

    public main: MainScene;
    public game: GameScene;
    private label: egret.TextField;
    private time: number = 30;

    public data: FishVO[];

    public startMain(): void {
        this.removeGame();
        if (this.main == null) {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
        this.countTime()
    }

    public removeMain(): void {
        if (this.main != null && this.main.parent != null) {
            this.main.parent.removeChild(this.main);
        }
    }

    public getFishVOByID(id: number): FishVO {
        for (var i: number = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                return this.data[i];
            }
        }
        return null;
    }

    public startGame(): void {
        this.removeMain();
        if (this.data == null) {
            this.data = [];
            var arr: Object[] = RES.getRes("mission_json");
            console.log("arr", arr)
            for (var i: number = 0; i < arr.length; i++) {
                var vo: FishVO = new FishVO();
                vo.id = parseInt(arr[i]['id']);
                vo.image = arr[i]['image'];
                vo.max_num = parseInt(arr[i]['max_num']);
                vo.left = parseInt(arr[i]['left']);
                vo.pos = parseInt(arr[i]['pos']);
                vo.movetype = parseInt(arr[i]['movetype']);
                vo.speedtime = parseInt(arr[i]['speedtime']);
                vo.score = parseInt(arr[i]['score']);
                console.log(vo)
                for (var j: number = 0; j < vo.max_num; j++) {
                    this.data.push(vo);
                }
            }
            console.log(this.data)
        }

        if (this.game == null) {
            this.game = new GameScene();
        }
        this.GameStage.addChild(this.game);
    }

    public removeGame(): void {
        if (this.game != null && this.game.parent != null) {
            this.game.parent.removeChild(this.game);
        }
    }
    public countTime(): void {
        this.label = new egret.TextField()
        this.label.text = "30"
        this.label.x = 173;
        this.label.y = 20;
        this.GameStage.addChild(this.label);
        this.timer(this.time)
    }

    private timer(time: number): void {
        let timer: egret.Timer = new egret.Timer(1000, time);
        timer.addEventListener(egret.TimerEvent.TIMER, this.gameBegin, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gamaOver, this);
        timer.start();
    }
    private gameBegin(): void {
        this.time--;
        this.label.text = this.time.toString();
    }
    private gamaOver(): void {
        console.log("game over")
        // this.GameStage.removeChild(this.label)
        // this.removeGame()
    }
}
