/*
 * @Author: Salt
 * @Date: 2022-08-20 14:20:57
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-20 19:02:43
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltSkinPreviewer\skin.d.ts
 */
interface Window {
  skinview3d: {
    WalkingAnimation: new (option?: PlayerAnimation) => WalkingAnimation
    IdleAnimation: new (option?: PlayerAnimation) => IdleAnimation
    SkinViewer: new (option?: SkinViewerOptions) => SkinViewer
  }
}
