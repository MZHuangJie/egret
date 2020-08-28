/**
 *
 * @author 
 *
 */
class FishVO {
	public constructor() {
	}
	public id:number;
	public image:string;
	/**当前屏幕出现的最多个数*/
	public max_num:number;
	/**从哪里出现 0左侧 1右侧 中间*/
	public left:number;
	/**纵向的位置 0中上 1底部*/
	public pos:number;
    /**运动轨迹 0正常移动  1随机停顿  2斜线*/
	public movetype:number;
	/**鱼冲左侧移动到右侧需要的时间*/
	public speedtime:number;
	/**重量，越重拉回来的速度越慢*/
	public weight:number;
	/**得分*/
	public score:number;
}
