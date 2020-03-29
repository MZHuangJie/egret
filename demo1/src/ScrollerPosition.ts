class ScrollerPosition extends eui.UILayer {
    private scroller: eui.Scroller;
    private scrollGroup: eui.Group;
    constructor() {
        super()
        var scroller = new eui.Scroller();
        scroller.height = 750;
        scroller.width = 1334;
        scroller.viewport = this.scrollGroup;
        this.addChild(scroller);
        this.scroller = scroller;
        //创建一个按钮，点击后改变 Scroller 滚动的位置
        var btn = new eui.Button();
        btn.x = 200;
        this.addChild(btn);
    }

}