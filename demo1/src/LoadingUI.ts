//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

// class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

//     public constructor() {
//         super();
//         this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
//         // this.createView();
//     }

//     private textField: egret.TextField;

//     private createView(): void {
//         this.textField = new egret.TextField();
//         this.addChild(this.textField);
//         this.textField.y = 300;
//         this.textField.width = 480;
//         this.textField.height = 100;
//         this.textField.textAlign = "center";
//     }

//     public onProgress(current: number, total: number): void {
//         this.textField.text = `Loading...${current}/${total}`;
//     }
// }
class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
        //this.createView();
    }

    //
    private textField: egret.TextField;
    //位图文件
    private Bg: egret.Bitmap;//背景
    private BGimage: egret.Bitmap;//小背景图片
    private loadingImage: egret.Bitmap;//loading图标
    private async createView() {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;

        //加载大背景
        this.Bg = new egret.Bitmap();
        this.Bg.texture = RES.getRes('load_bg_jpg');
        this.Bg.width = this.width;
        this.Bg.height = this.height;
        this.addChild(this.Bg);

        // loading图标
        this.loadingImage = new egret.Bitmap()
        this.loadingImage.texture = RES.getRes('load_tex_png')
        //设置锚点
        this.loadingImage.anchorOffsetX = this.loadingImage.width / 2
        this.loadingImage.anchorOffsetY = this.loadingImage.height / 2
        this.loadingImage.x = this.width / 2
        this.loadingImage.y = this.height / 2 - 100
        this.addChild(this.loadingImage)

        //文本
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 20;
        this.textField.x = (this.width - this.textField.width) / 2;
        this.textField.y = (this.height - this.textField.height) /1.4;
        this.textField.size = 40;
        this.textField.textColor = 0x808080
        this.textField.textAlign = "center";
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    }

    private onFrame() {
        // if (this.loadingImage) {
        //     this.loadingImage.rotation += 5;
        // }
    }


    public onProgress(current: number, total: number): void {
        if (this.textField) {
            this.textField.text = `${Math.ceil(current/total * 100)}%`;
        }

    }
}