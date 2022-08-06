/*
 * @Author: litwak913 litwak913@qq.com
 * @Date: 2022-08-06 22:12:41
 * @LastEditors: litwak913 litwak913@qq.com
 * @LastEditTime: 2022-08-06 22:40:33
 * @FilePath: /mcbbs-wiki-widget-repo/widget/ThemeLoader/widget.ts
 * @Description: 加载主题
 */
import { read } from 'Utils/storage'
import { docReady } from 'Utils/utils'
docReady(() => {
  console.log('[913ThemeLoader] 加载主题中')
  let theme = read('theme', 'summer')
  console.log(`[913ThemeLoader] 使用主题:${theme}`)
  const cssurl = `https://mcbbs.wiki/index.php?title=MediaWiki:Theme-${theme}.css&action=raw&ctype=text/css`
  console.log(`[913ThemeLoader] 将要引入的CSS:${cssurl}`)
  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.type = 'text/css'
  style.href = cssurl
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
  console.log('[913ThemeLoader] 引入CSS成功')
})
