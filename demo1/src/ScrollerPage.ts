class ScrollerPage extends eui.Component {
    constructor() {
        super()
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.slideEvent, this)
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.tabPage, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.tabPage, this)
        this.skinName = skins.Preslide
    }
    public slide: egret.tween.TweenGroup;
    protected createChildren() {
        super.createChildren();
        console.log("createChildren")
    }

    private onComplete(): void {
        console.log("onComplete");
        this.slide.play()
    }
    private startX;
    private slideLeft;
    private slideEvent(evt: egret.TouchEvent) {
        this.startX = evt.localX;
    }

    private tabPage(evt: egret.TouchEvent) {
        var currentX = evt.localX;
        if (currentX - this.startX < 0) {
            // this.anchorOffsetX -= 5;
            this.slideLeft = setInterval(() => {
                this.x -= 5
                if (this.x <= -1334) {
                    clearInterval(this.slideLeft);
                }
            }, 10)
        }
    }

    // private stopSlide(evt: egret.TouchEvent){
    //     var thisX = this.x;
    //     if(thisX<=-1334){
    //         clearInterval(this.slideLeft);
    //     }
    // }
}