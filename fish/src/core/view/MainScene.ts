class MainScene extends eui.Component {
    public constructor() {
        super();
        GameLogic.getInstance().main = this;
        this.skinName = "MainSceneSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        RES.loadGroup("game");
        this.startPlay()
    }
    private startPlay(): void {
        GameLogic.getInstance().startGame();
    }
}