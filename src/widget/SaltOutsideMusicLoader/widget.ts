/*
 * @Author: Salt
 * @Date: 2022-07-23 15:38:31
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 16:41:45
 * @Description: SaltOutsideMusicLoader
 * @FilePath: \mcbbs-wiki-widget-repo\src\widget\SaltOutsideMusicLoader\widget.ts
 */
import { docReady } from 'Utils/utils'

docReady(() => {
  for (const d of Array.from(
    document.querySelectorAll('div[class*="163outchain"]')
  )) {
    const data = (d.textContent || '').split('SPLIT')
    if (!isNumber(data) || data.length < 4) {
      d.innerHTML =
        '<span style="color:crimson"><b><big>163外链加载器：参数错误</big></b></span>'
      continue
    }
    const src =
      '//music.163.com/outchain/player?type=2&id=' +
      parseInt(data[0]) +
      '&auto=' +
      parseInt(data[3]) +
      '&height=' +
      parseInt(data[2])
    console.log('网易云音乐加载器', src)
    const embed = document.createElement('embed')
    embed.width = data[1]
    embed.height = `${parseInt(data[2]) + 20}`
    embed.src = src
    d.replaceWith(embed)
  }
  //! 是否可以用parseInt传化为数字
  function isNumber(num: unknown) {
    if (typeof num == 'string') return !isNaN(parseInt(num))
    if (num instanceof Array)
      for (const n of num) if (isNaN(parseInt(n))) return false
    return true
  }
})
