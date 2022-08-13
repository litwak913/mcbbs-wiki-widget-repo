/*
 * @Author: Salt
 * @Date: 2022-07-23 16:53:23
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 16:45:50
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\utils\resource.ts
 */
/** 根据URL添加脚本，可以根据key防止重复添加 */
export function addScript(url: string, asynchronous = false, key?: string) {
  if (key && document.getElementById(key)) return
  const scr = document.createElement('script')
  scr.src = url
  scr.async = asynchronous
  if (key) scr.id = key
  document.head.appendChild(scr)
}
/** 根据URL添加样式表，可以通过key来更新样式 */
export function addStyleUrl(url: string, key?: string) {
  let style: HTMLLinkElement
  if (key && document.getElementById(key) instanceof HTMLLinkElement) {
    style = document.getElementById(key) as HTMLLinkElement
  } else {
    style = document.createElement('link')
    style.rel = 'stylesheet'
    style.type = 'text/css'
    if (key) style.id = key
  }
  style.href = url
  document.head.appendChild(style)
}
/** 添加样式表 */
export function addStyle(css: string) {
  const style = document.createElement('style')
  style.textContent = css
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

export function loadWikiScript(page: string) {
  addScript(
    `https://mcbbs.wiki/index.php?title=${page}&action=raw&ctype=text/javascript`
  )
}
export function loadWikiStyle(page: string, key?: string) {
  addStyleUrl(
    `https://mcbbs.wiki/index.php?title=${page}&action=raw&ctype=text/css`,
    key
  )
}
