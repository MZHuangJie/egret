/// 代码段 A
class Tween extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private loadingImage: egret.Bitmap;//loading图标
    private onAddToStage(event: egret.Event) {
        // loading图标
        this.loadingImage = new egret.Bitmap()
        this.loadingImage.texture = RES.getRes('load_tex_png')
        //设置锚点
        this.loadingImage.anchorOffsetX = this.loadingImage.width / 2
        this.loadingImage.anchorOffsetY = this.loadingImage.height / 2
        this.loadingImage.x = this.width / 2
        this.loadingImage.y = this.height / 2 - 100
        this.addChild(this.loadingImage)
        // var tw = egret.Tween.get(  );
        // tw.to( {x:150}, 1000 );
    }
}