/*
 * @Author: Salt
 * @Date: 2022-07-23 16:53:23
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 10:38:33
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\utils\resource.ts
 */
/** 根据URL添加脚本 */
export function addScript(url: string, asynchronous = false, key?: string) {
  if (key && document.getElementById(key)) return
  let scr = document.createElement('script')
  scr.src = url
  scr.async = asynchronous
  document.head.appendChild(scr)
}
/** 根据URL添加样式表 */
export function addStyleUrl(url: string) {
  var style = document.createElement('link')
  style.href = url
  style.rel = 'stylesheet'
  style.type = 'text/css'
  document.head.appendChild(style)
}
/** 根据key添加或更新样式表 */
export function setStyle(css: string, key: string) {
  let el = document.getElementById(key)
  if (!el) {
    el = document.createElement('style')
    el.id = key
  }
  el.textContent = css
  document.head.appendChild(el)
}
