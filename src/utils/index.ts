/*
 * @Author: Salt
 * @Date: 2022-07-23 15:26:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 17:04:50
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\utils\index.ts
 */
export { read, write, readAndListen } from './storage'
export { addScript, addStyleUrl, setStyle } from './resource'
export {
  docReady,
  docReadyAsync,
  extend,
  offset,
  scrollYToEl,
  handleChildren,
  randomChoice,
} from './utils'
