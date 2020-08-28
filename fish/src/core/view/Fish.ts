/**
 *
 * @author 
 *
 */
class Fish extends egret.Sprite
{
    private bg: egret.Bitmap;

    public vo: FishVO;
    private birthX: number;
    private birthY: number;
    private tarX: number;
    private tarY: number;

    public constructor(vo: FishVO)
    {
        super();
        this.vo = vo;

        this.init();
    }

    private init(): void
    {
        this.bg = new egret.Bitmap(RES.getRes(this.vo.image));
        this.addChild(this.bg);
        
        this.visible = false;
        this.play();
    }

    private play(): void
    {
        var tw = egret.Tween.get(this.bg);
        tw.to({ y: -5 }, 1000).wait(200).to({ y: 5 }, 1000).call(this.play, this);
    }

    public start(): void
    {
        this.birthX = 0;
        this.birthY = Math.random() * 400 + 140;
        this.tarX = GameLogic.getInstance().GameStage_width;
        this.tarY = this.birthY;
        this.x = this.birthX;
        this.y = this.birthY;

        this.visible = true;

        var tw = egret.Tween.get(this);
        tw.to({ x: this.tarX, y: this.tarY }, this.vo.speedtime).call(this.moveOver, this);
    }

    private moveOver(): void
    {
        this.start();
    }

    public clear(): void
    {
        egret.Tween.removeTweens(this);
    }
}
